import React from 'react';

export type CardProps = {
  headline: string;
  subhead: string;
  section: string;
  byline: string;
  date: string;
  imageUrl: string;
  articleUrl: string;
};

const Card = ({
  headline,
  subhead,
  section,
  byline,
  date,
  imageUrl,
  articleUrl,
}: CardProps) => {
  return (
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
};

export default Card;
