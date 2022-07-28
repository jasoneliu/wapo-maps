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
latest_stories = []
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

class Article:
    def __init__(self, title, url, countries=None, regions=None, cities=None):
        self.title = title
        self.url = url
        self.countries = countries
        self.regions = regions
        self.cities = cities

def top_stories():
    fusion = requests.get('https://jsonapp1.washingtonpost.com/fusion_prod/v2/')
    links_list = find_values('link', json.dumps(fusion.json()))
    seen = set()
    out = []
    for link in links_list:
        if link['url'] not in seen:
            seen.add(link['url'])
            out.append(link)
    return list(out)

@app.route('/')
def index():
    return '', 404


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

@app.route('/city')
def search_cities():
    latest_stories = top_stories()
    print(latest_stories)
    # name = request.args.get('name')
    out = []
    for article in latest_stories[:10]:
        content_url = article['url']
        content_response = requests.get(
            f'https://rainbowapi-a.wpdigital.net/rainbow-data-service/rainbow/content-by-url.json?platform=iphoneclassic&url={content_url}')
        try:
            items = content_response.json()["items"]
            paragraphs = [x['content'] for x in items if 'content' in x and 'type' in x and x['type'] == 'sanitized_html' or x['type'] == 'title']
            entities = locationtagger.find_locations(text='\n'.join(paragraphs))
            if len(entities.cities) > 0:
                out.append(Article(None, content_url, entities.countries, entities.regions, entities.cities))
        except KeyError:
            print("No items")
            continue
        except TypeError:
            print("nothing")
            continue

    return jsonify({'articles': [{'title': x.title, 'url': x.url, 'countries': x.countries, 'regions': x.regions, 'cities': x.cities} for x in out]})

@app.route('/search')
def search_entities():
    name = requests.args.get('name')
    country = request.args.get('country')
    region = request.args.get('region')
    response = requests.get(f'https://tabletapi.washingtonpost.com/apps-data-service/native-search.json?query={query}')
    results = response.json()["results"]
    output = []
    for document in results["documents"]:
        content_url = document["contenturl"]
        # going to make it collect all articles when the server starts, and it will periodically update the information
        content_response = requests.get(f'https://rainbowapi-a.wpdigital.net/rainbow-data-service/rainbow/content-by-url.json?platform=iphoneclassic&url={content_url}')
        try:
            items = content_response.json()["items"]
            paragraphs = [x["content"] for x in items if x["type"] == "sanitized_html" or x["type"] == "title"]
            entities = locationtagger.find_locations(text='\n'.join(paragraphs))
            output.append({"headline": document["headline"], "content_url": content_url, "entities": entities.countries})
        except KeyError:
            print("No items")
        except TypeError:
            print("nothing")

    end_result = jsonify(results)
    end_result.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify({"output": output})


dispatcher = DispatcherMiddleware(app, {
    '/api/v1': api,
})

if __name__ == "__main__":

    from werkzeug.serving import run_simple
    host = os.getenv('API_HOST', '0.0.0.0')
    port = int(os.getenv('API_PORT', 5000))
    use_reloader = use_debugger = 'DEBUG_WITH_IDE' not in os.environ
    use_evalex = 'DONT_USE_EVALEX' not in os.environ

    latest_stories = top_stories()
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