import os
import requests
from flask import Flask, jsonify, request
from werkzeug.middleware.dispatcher import DispatcherMiddleware
import locationtagger
import nltk
import spacy
from flask_cors import CORS, cross_origin
import json

from api import app as api

models_loaded = False
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


# https://stackoverflow.com/questions/14048948/how-to-find-a-particular-json-value-by-key
def find_values(id, json_repr):
    results = []

    def _decode_dict(a_dict):
        try:
            results.append(a_dict[id])
        except KeyError:
            pass
        return a_dict

    json.loads(json_repr, object_hook=_decode_dict)
    return results


with open('dummy.json') as file:
    latest_stories = json.load(file)
links_list = find_values('link', json.dumps(latest_stories))

class Article:
    def __init__(self, title, url, countries=None, regions=None, cities=None):
        self.title = title
        self.url = url
        self.countries = countries
        self.regions = regions
        self.cities = cities


@app.route('/')
def index():
    return '', 200


@app.route('/latest')
def latest():
    seen = set()
    out = []
    for link in links_list:
        if link['url'] not in seen:
            seen.add(link['url'])
            out.append(link)
    return jsonify({'articles': list(out)})


@app.route('/favicon.ico')
def favicon():
    return '', 404


@app.route('/country')
def search_articles_by_country():
    return '', 200


@app.route('/latest')
def get_latest():
    return jsonify({'links': top_stories()})

# /location and /topic
# ?country=United%20States&state=California
# we'll give them a dropdown for different states
# query name=
# locations for topic
# topics for location

# @app.route('/city')
# def search_cities():
#     latest_stories = top_stories()
#     print(latest_stories)
#     # name = request.args.get('name')
#     out = []
#     stories = find_values('headlines', json.dumps(latest_stories))
#     for article in latest_stories[:10]:
#         content_url = article['url']
#         content_response = requests.get(
#             f'https://rainbowapi-a.wpdigital.net/rainbow-data-service/rainbow/content-by-url.json?platform=iphoneclassic&url={content_url}')
#         try:
#             items = content_response.json()["items"]
#             paragraphs = [x['content'] for x in items if 'content' in x and 'type' in x and x['type'] == 'sanitized_html' or x['type'] == 'title']
#             entities = locationtagger.find_locations(text='\n'.join(paragraphs))
#             if len(entities.cities) > 0:
#                 out.append(Article(None, content_url, entities.countries, entities.regions, entities.cities))
#         except KeyError:
#             print("No items")
#             continue
#         except TypeError:
#             print("nothing")
#             continue
#
#     return jsonify({'articles': [{'title': x.title, 'url': x.url, 'countries': x.countries, 'regions': x.regions, 'cities': x.cities} for x in out]})

@app.route('/articles')
def search_articles():
    country = request.args.get('country')
    region = request.args.get('region')
    city = request.args.get('city')
    out = set()
    trove = filter(lambda a: 'type' in a and a['type'] == 'article', find_values('link', json.dumps(latest_stories)))
    for article in list(trove)[:10]:
        if article['url'] not in out:
            content_response = requests.get(f'https://rainbowapi-a.wpdigital.net/rainbow-data-service/rainbow/content-by-url.json?platform=iphoneclassic&url={article["url"]}')
            try:
                items = content_response.json()["items"]
                paragraphs = [x['content'] for x in items if
                              'content' in x and 'type' in x and x['type'] == 'sanitized_html' or x['type'] == 'title']
                print(paragraphs)
                entities = locationtagger.find_locations(text='\n'.join(paragraphs))
                lowercased_countries = map(lambda c: c.lower(), entities.countries)
                lowercased_regions = map(lambda c: c.lower(), entities.regions)
                lowercased_cities = map(lambda c: c.lower(), entities.cities)
                if str(country).lower() in lowercased_countries or str(region).lower() in lowercased_regions or str(city).lower() in lowercased_cities:
                    out.add(article['url'])
            except KeyError:
                print("No items")
                continue
            except TypeError:
                print("nothing")
                continue
    return jsonify({'links': list(out)})

@app.route('/locations')
def search_entities():
    topic = request.args.get('topic')
    response = requests.get(f'https://tabletapi.washingtonpost.com/apps-data-service/native-search.json?query={topic}')
    results = response.json()["results"]
    output = {'countries': set(), 'regions': set(), 'cities': set()}
    for document in results["documents"]:
        content_url = document["contenturl"]
        content_response = requests.get(f'https://rainbowapi-a.wpdigital.net/rainbow-data-service/rainbow/content-by-url.json?platform=iphoneclassic&url={content_url}')
        try:
            items = content_response.json()["items"]
            paragraphs = [x["content"] for x in items if x["type"] == "sanitized_html" or x["type"] == "title"]
            entities = locationtagger.find_locations(text='\n'.join(paragraphs))
            output['countries'] = output['countries'].union(entities.countries)
            output['regions'] = output['regions'].union(entities.regions)
            output['cities'] = output['cities'].union(entities.cities)
        except KeyError:
            print("No items")
        except TypeError:
            print("nothing")

    end_result = jsonify(results)
    end_result.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify({key: list(value) for key, value in output.items()})


dispatcher = DispatcherMiddleware(app, {
    '/api/v1': api,
})

if __name__ == "__main__":

    from werkzeug.serving import run_simple
    host = os.getenv('API_HOST', '0.0.0.0')
    port = int(os.getenv('API_PORT', 5000))
    use_reloader = use_debugger = 'DEBUG_WITH_IDE' not in os.environ
    use_evalex = 'DONT_USE_EVALEX' not in os.environ

    if not models_loaded:
        nltk.downloader.download('maxent_ne_chunker')
        nltk.downloader.download('words')
        nltk.downloader.download('treebank')
        nltk.downloader.download('maxent_treebank_pos_tagger')
        nltk.downloader.download('punkt')
        nltk.download('averaged_perceptron_tagger')
        models_loaded = True

    run_simple(
        host,
        port,
        dispatcher,
        use_reloader=use_reloader,
        use_debugger=use_debugger,
        use_evalex=use_evalex)