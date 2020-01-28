import React from 'react';

import { GridList, GridListTile, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  }
}));

export const Gallery: React.FC = () => {
  const classes = useStyles();
  const images = [
    {
      id: 1,
      url: 'images/story/gallery/picture_1.png'
    },
    {
      id: 2,
      url: 'images/story/gallery/picture_2.png'
    },
    {
      id: 3,
      url: 'images/story/gallery/picture_3.png'
    },
    {
      id: 4,
      url: 'images/story/gallery/picture_1.png'
    },
    {
      id: 5,
      url: 'images/story/gallery/picture_2.png'
    },
    {
      id: 6,
      url: 'images/story/gallery/picture_3.png'
    }
  ];
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {images.map(image => (
          <GridListTile key={image.id}>
            <img src={image.url} alt="" />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Gallery;
