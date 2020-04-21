import React, { useState, ChangeEvent } from 'react';
import clsx from 'clsx';

import { TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowUp, Add } from '@material-ui/icons';

import { Button } from 'common/components';
import { Value } from 'types/safety';

const useStyles = makeStyles(() => ({
  root: {
    padding: '15px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '2px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    margin: '10px 0',
    flexGrow: 1
  },
  descText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45',
    margin: '10px 0'
  },
  values: {
    display: 'flex',
    flexDirection: 'column'
  },
  value: {
    width: '80%',
    padding: '10px',
    backgroundColor: '#FFFAE9',
    borderRadius: '4px',
    margin: '10px 0'
  },
  action: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  collapseArrow: {
    transform: 'rotate(180deg)'
  },
  itemsText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#B7B7B8'
  },
  textFieldContainer: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    width: '80%',
    background: '#FFFAE9',
    marginRight: '10px'
  }
}));

type Props = {
  id: number;
  title: string;
  description: string;
  values: Value[];
  collapse: boolean;
  change: () => void;
};

export const SafetyCard: React.FC<Props> = ({
  id,
  title,
  description,
  values,
  collapse,
  change
}) => {
  const classes = useStyles();

  /** Handle Fields */
  const [addClicked, setAddClicked] = useState(false);
  const [input, setInput] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInput(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div className={classes.title}>{`${id}. ${title}`}</div>
        <IconButton onClick={change}>
          <KeyboardArrowUp
            fontSize="large"
            style={{ fill: '#C57D7D' }}
            className={clsx(collapse && classes.collapseArrow)}
          />
        </IconButton>
      </div>
      {!collapse && (
        <span className={classes.itemsText}>{`${values.length} items`}</span>
      )}
      {collapse && (
        <div>
          <span className={classes.descText}>{description}</span>
          <div className={classes.values}>
            {values.map(value => {
              return (
                <div key={value.id} className={classes.value}>
                  {value.name}
                </div>
              );
            })}
          </div>
          {addClicked && (
            <div className={classes.textFieldContainer}>
              <TextField
                fullWidth
                label="Type here..."
                name="input"
                autoComplete="off"
                value={input}
                variant="outlined"
                className={classes.textField}
                onChange={handleChange}
              />
              <div style={{ width: '50px' }}>
                <Button type="primarySmall">Add</Button>
              </div>
            </div>
          )}
          <div className={classes.action}>
            <div style={{ width: '91px', marginRight: '20px' }}>
              <Button type="primarySmall" click={() => setAddClicked(true)}>
                <Add style={{ marginRight: '5px' }} />
                Add
              </Button>
            </div>
            <div style={{ width: '155px' }}>
              <Button type="tertiarySmall">
                <img
                  src="/images/safety/suggestion.svg"
                  alt=""
                  style={{ marginRight: '5px' }}
                />
                Suggestions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyCard;
