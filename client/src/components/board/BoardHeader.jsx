import React from 'react';

export const BoardHeader = ({ title, description, img, info }) => {
  return (
    <div>
      <div>
        <img src={img} alt={title + '-logo'} />
      </div>
      <div>{title}</div>
      <div>{description}</div>
      <div>info: {info}</div>
    </div>
  );
};
