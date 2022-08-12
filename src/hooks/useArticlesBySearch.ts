import { useState, useEffect } from 'react';
import { Article } from '../types';

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

export default function useArticlesBySearch(search: string): Article[] {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function articlesBySearch(search: string): Promise<void> {
      let documents: any[] = [];
      const response = await fetch(
        `https://proxy-wapo-maps.herokuapp.com/https://tabletapi.washingtonpost.com/apps-data-service/native-search.json?query=${search}`
      );
      const data = await response.json();
      documents = data.results.documents;

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

    articlesBySearch(search);
  }, [search]);

  return articles;
}
