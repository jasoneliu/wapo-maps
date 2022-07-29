## Getting Started

First, install dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google Maps API

To run this Project, you need a `PERSONAL` google cloud platform key

Read [Google Cloud Setup](https://developers.google.com/maps/documentation/javascript/cloud-setup) to get started and create your key

## Backend Server

To enable local API requests, navigate to `./backend-server` in the repository. Then, run the following commands:

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```

Example requests:
- Recent articles in and around Seattle: http://localhost:5000/articles?city=seattle
- Locations of recent event coverage related to protests: http://localhost:5000/locations?topic=protest