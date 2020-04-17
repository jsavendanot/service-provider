import React, { useState, ChangeEvent } from 'react';

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { Button } from 'common/components';
import { Strength } from 'types/story';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    marginBottom: '20px'
  },
  row: {
    padding: '10px',
    background: '#FFFAE9',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  strengthText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#323F45'
  },
  textFieldContainer: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    width: '85%',
    background: '#FFFAE9',
    marginRight: '10px'
  },
  action: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

type Props = {
  strengths: Strength[];
};

export const Strengths: React.FC<Props> = ({ strengths }) => {
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
      <span className={classes.title}>My strengths</span>
      <div style={{ width: '85%' }}>
        {strengths.map(item => {
          return (
            <div key={item.id} className={classes.row}>
              <span className={classes.strengthText}>{item.name}</span>
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
  );
};

export default Strengths;
