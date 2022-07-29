import React from 'react';
import Card from './card';
import Divider from './divider';
import { Article } from 'src/types';
import { Box } from '@mui/material';

type CardListProps = {
  cards: Article[];
};

const CardList = ({ cards }: CardListProps) => {
  return (
    <div className={Math.random().toString()}>
      {cards.length === 0 && (
        <Box
          className="font-body mb-xxs font-light font-xxs antialiased gray-dark"
          sx={{ paddingTop: '1rem' }}
        >
          Sorry, no articles found.
        </Box>
      )}
      {cards.map((card, cardIdx) => (
        <React.Fragment key={cardIdx}>
          {cardIdx > 0 && <Divider />}
          <Card
            headline={card.headline}
            subhead={card.subhead}
            section={card.section}
            byline={`By ${card.byline}`}
            date={card.date}
            imageUrl={card.imageUrl}
            articleUrl={card.articleUrl}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardList;
