import React from 'react';
import { Card } from './Card';

export const CardList = ({ cards }) => {
  return (
    <div className='h-full w-full grid grid-cols-3 grid-rows-3 gap-4 p-4'>
      {cards.map(card => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          image={card.image}
        />
      ))}
    </div>
  );
};
