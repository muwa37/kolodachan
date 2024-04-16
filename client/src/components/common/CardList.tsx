import { Board, Thread } from '@/types';
import { FC } from 'react';
import { Card } from './Card';

interface CardListProps {
  threadCards?: Thread[];
  boardCards?: Board[];
}

export const CardList: FC<CardListProps> = ({ threadCards, boardCards }) => {
  return (
    <div className='h-full w-full grid grid-cols-3 grid-rows-3 gap-4 p-4'>
      {threadCards &&
        threadCards.map(card => (
          <Card
            key={card.id}
            title={card.title}
            description={card.text}
            image={card.attachments[0].link}
            id={card.id}
          />
        ))}
      {boardCards &&
        boardCards.map(card => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            id={card.id}
          />
        ))}
    </div>
  );
};
