import { FC } from 'react';
import { Card } from './Card';

interface CardListProps {
  cards: any;
}

export const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <div className='h-full w-full grid grid-cols-3 grid-rows-3 gap-4 p-4'>
      {cards.map((card: any) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description || card.text}
          image={card.image}
          id={card.id}
        />
      ))}
    </div>
  );
};
