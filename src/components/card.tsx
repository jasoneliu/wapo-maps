import React from 'react';
import useWindowDimensions from 'src/hooks/useWindowDimensions';
import { Article } from 'src/types';

const Card = ({
  headline,
  subhead,
  section,
  byline,
  date,
  imageUrl,
  articleUrl,
}: Article) => {
  const dimensions = useWindowDimensions();

  const SmallCard = () => (
    <article className="single-result mt-sm pb-sm">
      <div className="content-sm flex flex-column">
        <div className="pa-xxxs pt-xxxs pb-xxxs antialiased flex align-items bc-gray-light">
          <div className="pr-xs flex flex-column justify-between w-100">
            <div>
              <div className="font-meta-text font-xxxxs bold mb-xs">
                {section}
              </div>
              <a
                className="font-sm font--magazine-headline font-bold mb-sm black"
                href={articleUrl}
                target="_blank"
              >
                {headline}
              </a>
            </div>
          </div>
          <div className="h-100 flex flex-column self-center">
            <a className="result-image-link" href={articleUrl} target="_blank">
              <figure className="relative result-image-md">
                <div
                  className="font-0 filter transition"
                  style={{
                    width: '118.67px',
                    height: '89px',
                    opacity: 1,
                    transition: 'opacity 400ms ease-in-out 0s',
                  }}
                >
                  <img
                    className="font-0"
                    alt={headline}
                    src={imageUrl}
                    loading="lazy"
                    style={{ backgroundSize: 'cover' }}
                    width="118.67"
                    height="89"
                  />
                </div>
              </figure>
            </a>
          </div>
        </div>
        <div className="mt-xs pa-xxxs pr-xxs flex flex-column justify-between w-100">
          <div>
            <div className="font-body mb-xxs font-light font-xxs antialiased gray-dark">
              {subhead}
            </div>
          </div>
          <div className="flex flex-column mt-sm">
            <div className="bold dib font-xxs">
              <span className="gray-darkest">{byline}</span>
            </div>
            <span className="flex nowrap font-light gray-dark italic font-xxxxs">
              {date}
            </span>
          </div>
        </div>
      </div>
    </article>
  );

  const BigCard = () => (
    <article className="single-result mt-sm pb-sm">
      <div className="content-lg pt-xxxs pb-xxxs antialiased flex align-items bc-gray-light">
        <div className="pr-sm flex flex-column justify-between w-100">
          <div>
            <div className="font-meta-text font-xxxxs bold mb-xs">
              {section}
            </div>
            <a
              className="font-md font--headline font-bold mb-sm black"
              href={articleUrl}
              target="_blank"
            >
              {headline}
            </a>
            <div className="font-body font-light font-xxs antialiased gray-dark lh-1 mt-sm mb-sm">
              {subhead}
            </div>
          </div>
          <div className="flex items-center">
            <div className="bold mr-md">
              <div className="flex items-center">By {byline}</div>
            </div>
            <span className="flex nowrap font-light gray-dark italic font-xxxxs">
              {date}
            </span>
          </div>
        </div>
        <div className="h-100 flex flex-column self-center">
          <a className="result-image-link" href={articleUrl} target="_blank">
            <figure className="relative result-image-lg">
              <div
                className="font-0 filter transition"
                style={{
                  width: '240px',
                  height: '180px',
                  opacity: 1,
                  transition: 'opacity 400ms ease-in-out 0s',
                }}
              >
                <img
                  className="font-0"
                  alt={headline}
                  src={imageUrl}
                  loading="lazy"
                  style={{ backgroundSize: 'cover' }}
                  width="240"
                  height="180"
                />
              </div>
            </figure>
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <>
      {dimensions &&
        (dimensions.width >= 768 / 0.45 ? <BigCard /> : <SmallCard />)}
    </>
  );
};

export default Card;
