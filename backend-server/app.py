import os
import requests
from flask import Flask, jsonify, request
from werkzeug.middleware.dispatcher import DispatcherMiddleware
import locationtagger
import nltk
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


@app.route('/')
def index():
    return '', 200

@app.route('/locations')
def search_entities():
    topic = request.args.get('topic')
    response = requests.get(f'https://tabletapi.washingtonpost.com/apps-data-service/native-search.json?query={topic}&count=5')
    results = response.json()["results"]
    limit = request.args.get('limit')
    upper_bound = len(results)
    try:
        limit = int(limit)
        upper_bound = limit
    except TypeError:
        print('wrong type')
    output = {'cities': set()}

    for document in results["documents"][:upper_bound]:
        content_url = document["contenturl"]
        content_response = requests.get(f'https://rainbowapi-a.wpdigital.net/rainbow-data-service/rainbow/content-by-url.json?platform=iphoneclassic&url={content_url}')
        try:
            items = content_response.json()["items"]
            paragraphs = [x["content"] for x in items if x["type"] == "sanitized_html" or x["type"] == "title"]
            entities = locationtagger.find_locations(text='\n'.join(paragraphs))
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

    run_simple(host, port, dispatcher, use_reloader=use_reloader, use_debugger=use_debugger, use_evalex=use_evalex)
