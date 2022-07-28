import os
import requests
from flask import Flask, jsonify, request
from werkzeug.middleware.dispatcher import DispatcherMiddleware
import locationtagger
import nltk
import spacy
from flask_cors import CORS, cross_origin

from api import app as api

models_loaded = False
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

@app.route('/')
def index():
    return '', 404


@app.route('/favicon.ico')
def favicon():
    return '', 404

# /location and /topic
# ?country=United%20States&state=California
# we'll give them a dropdown for different states
@app.route('/search')
def search_entities():
    query = request.args.get("query")
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