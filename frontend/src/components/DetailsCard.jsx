import React from 'react';

const DetailsCard = ({videoData}) => {
    const { title, thumbnail, channel, views, likes, comments } = videoData;
  return <div>
    <h1>{channel}</h1>
    <img src={thumbnail} alt={title} />
    <p>{title}</p>
    <p>Views: {views}</p>
    <p>Total Likes: {likes}</p>
    <p>Total Comments: {comments}</p>
  </div>;
};

export default DetailsCard;
