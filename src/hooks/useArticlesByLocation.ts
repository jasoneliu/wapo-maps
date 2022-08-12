import { useState, useEffect } from 'react';
import { Article } from '../types';
import { Location } from 'src/types';

const getLocalityState = (location: Location) => {
  if (!location) {
    return 'Unknown Location';
  }

  let locationString = '';
  if (location.locality) {
    locationString += location.locality + ' ';
  }
  if (location.state) {
    locationString += location.state + ' ';
  }

  if (locationString === '') {
    return 'Unknown Location';
  }
  return `${locationString.slice(0, -1)}`;
};

const getLocalityCountry = (location: Location) => {
  if (!location) {
    return 'Unknown Location';
  }

  let locationString = '';
  if (location.locality) {
    locationString += location.locality + ' ';
  }
  if (location.country) {
    locationString += location.country + ' ';
  }

  if (locationString === '') {
    return 'Unknown Location';
  }
  return `${locationString.slice(0, -1)}`;
};

const getState = (location: Location) => {
  if (!location) {
    return 'Unknown Location';
  }

  let locationString = '';
  if (location.state) {
    locationString += location.state + ' ';
  }

  if (locationString === '') {
    return 'Unknown Location';
  }
  return `${locationString.slice(0, -1)}`;
};

const getCountry = (location: Location) => {
  if (!location) {
    return 'Unknown Location';
  }

  let locationString = '';
  if (location.country) {
    locationString += location.country + ' ';
  }

  if (locationString === '') {
    return 'Unknown Location';
  }
  return `${locationString.slice(0, -1)}`;
};

const getSection = (contenturl: string) => {
  return contenturl
    .replace('https://www.washingtonpost.com/', '')
    .split('/')[0];
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  let hour = date.getHours();
  const min = date.getMinutes();
  const period = hour < 12 ? 'AM' : 'PM';

  // convert to 12-hour
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  const formattedDate = `${month} ${day}, ${year} at ${hour}:${
    min < 10 ? '0' + min : min
  } ${period} EST`;
  return formattedDate;
};

export default function useArticlesByLocation(location: Location): Article[] {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function articlesByLocation(location: Location): Promise<void> {
      let documents: any[] = [];
      const response = await fetch(
        `https://proxy-wapo-maps.herokuapp.com/https://tabletapi.washingtonpost.com/apps-data-service/native-search.json?query=${
          location.country === 'United States'
            ? getLocalityState(location)
            : getLocalityCountry(location)
        }`
      );
      const data = await response.json();
      documents = data.results.documents;

      if (documents.length < 3) {
        const response = await fetch(
          `https://proxy-wapo-maps.herokuapp.com/https://tabletapi.washingtonpost.com/apps-data-service/native-search.json?query=${getState(
            location
          )}`
        );
        const data = await response.json();
        documents = data.results.documents;
      }

      if (documents.length < 3) {
        const response = await fetch(
          `https://proxy-wapo-maps.herokuapp.com/https://tabletapi.washingtonpost.com/apps-data-service/native-search.json?query=${getCountry(
            location
          )}`
        );
        const data = await response.json();
        documents = data.results.documents;
      }

      if (documents.length === 0) {
        setArticles([]);
        return;
      }

      const result: Article[] = [];
      documents.forEach((document) => {
        const article: Article = {
          headline: document.headline,
          section: getSection(document.contenturl),
          subhead: document.blurb,
          byline: document.byline,
          date: formatDate(document.displaydatetime),
          imageUrl: document.smallthumburl,
          articleUrl: document.contenturl,
        };
        result.push(article);
      });

      setArticles(result);
    }

    articlesByLocation(location);
  }, [location]);

  return articles;
}
