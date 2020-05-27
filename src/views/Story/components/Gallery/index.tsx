import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Theme } from '@material-ui/core';
import { ArrowBackIos, CameraEnhance } from '@material-ui/icons';
import { Image } from 'types/gallery';
import { Story } from 'types/story';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  imageEmptyContainer: {
    position: 'relative',
    height: '279px',
    width: '100%',
    backgroundColor: '#EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0'
  },
  backBigArrow: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    }
  },
  backBigArrowInactive: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: 'rgba(255, 255, 255, 0.4)'
  },
  nextBigArrow: {
    fontSize: '32px',
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    }
  },
  nextBigArrowInactive: {
    fontSize: '32px',
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: 'rgba(255, 255, 255, 0.4)'
  },
  backArrowActive: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: '#FFFFFF'
  },
  backArrowInActive: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: 'rgba(255, 255, 255, 0.4)'
  },
  nextArrowActive: {
    fontSize: '32px',
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: '#FFFFFF'
  },
  nextArrowInActive: {
    fontSize: '32px',
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: 'rgba(255, 255, 255, 0.4)'
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '258px',
    width: '100%',
    objectFit: 'cover'
  }
}));

type Props = {
  story: Story;
};

export const Images: React.FC<Props> = () => {
  const classes = useStyles();

  const images: Image[] = useSelector(
    (state: RootState) => state.gallery.images
  );

  const [index, setIndex] = useState(0);

  const next = () => {
    const nextIndex = index < images.length - 1 ? index + 1 : index;
    setIndex(nextIndex);
  };

  const back = () => {
    const nextIndex = index > 0 ? index - 1 : 0;
    setIndex(nextIndex);
  };

  return (
    <>
      <Grid container spacing={2} justify="center">
        {images.length > 0 ? (
          <Grid item xs={12} sm={8} md={7} className={classes.flexItem}>
            <IconButton
              style={{ padding: '0', marginRight: '20px' }}
              onClick={back}>
              <ArrowBackIos
                fontSize="large"
                className={clsx(
                  index > 0 && classes.backBigArrow,
                  index === 0 && classes.backBigArrowInactive
                )}
              />
            </IconButton>
            <img
              src={images[index].ImageUrl}
              alt=""
              className={classes.image}
            />
            <IconButton
              style={{ padding: '0', marginLeft: '20px' }}
              onClick={next}>
              <ArrowBackIos
                fontSize="large"
                className={clsx(
                  index < images.length && classes.nextBigArrow,
                  index === images.length - 1 && classes.nextBigArrowInactive
                )}
              />
            </IconButton>
          </Grid>
        ) : (
          <Grid item xs={12} sm={8} md={7} className={classes.flexItem}>
            <div className={classes.imageEmptyContainer}>
              <div>
                <IconButton>
                  <CameraEnhance fontSize="large" />
                </IconButton>
              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Images;
