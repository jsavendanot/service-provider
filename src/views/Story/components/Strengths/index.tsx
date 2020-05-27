import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add, DeleteOutline, AddCircleOutline } from '@material-ui/icons';

import { Button } from 'common/components';
import { Strength } from 'types/story';
import uuid from 'uuid';
import { suggestStrength } from 'slices/suggestion/action';
import { SubmitConfirmation } from 'common/components';

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
  suggestedRow: {
    padding: '10px',
    background: '#FFFAE9',
    borderRadius: '4px',
    marginBottom: '20px',
    wordWrap: 'break-word'
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
  },
  suggestedRowContainer: {
    width: '100%',
    display: 'flex'
  }
}));

type Props = {
  strengths: Strength[];
};

export const Strengths: React.FC<Props> = ({ strengths }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [suggestedStrengths, setSuggestedStrengths] = useState<Strength[]>([]);
  const [addClicked, setAddClicked] = useState(false);
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInput(event.target.value);
  };

  const addToSuggestedStr = () => {
    if (input.length > 4) {
      setSuggestedStrengths(values => [
        ...values,
        {
          id: uuid(),
          name: input
        }
      ]);
      dispatch(suggestStrength(input));
      setInput('');
    }
  };

  const removeFromSuggestedStr = (id: string) => {
    const updatedSuggestedStr = suggestedStrengths.filter(
      item => item.id !== id
    );
    setSuggestedStrengths(updatedSuggestedStr);
  };

  /** Dialog */
  const [open, setOpen] = useState(false);

  function openDialog() {
    if (input.length > 4) {
      setOpen(true);
    }
  }

  function closeDialog() {
    setOpen(false);
  }

  return (
    <>
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
        <div>
          {suggestedStrengths.map(item => {
            return (
              <div key={item.id} className={classes.suggestedRowContainer}>
                <div className={classes.suggestedRow} style={{ width: '85%' }}>
                  <span className={classes.strengthText}>{item.name}</span>
                </div>
                <div style={{ height: '30px' }}>
                  <IconButton
                    onClick={() => removeFromSuggestedStr(item.id)}
                    style={{ padding: '5px', marginLeft: '11px' }}>
                    <DeleteOutline
                      style={{
                        fill: '#C57D7D'
                      }}
                      fontSize="large"
                    />
                  </IconButton>
                </div>
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
              multiline
              value={input}
              variant="outlined"
              className={classes.textField}
              onChange={handleInputChange}
              inputProps={{ maxLength: 500 }}
            />
            <div style={{ width: '50px' }}>
              <IconButton onClick={openDialog} style={{ padding: '5px' }}>
                <AddCircleOutline
                  style={{ fill: '#C57D7D', cursor: 'pointer' }}
                  fontSize="large"
                />
              </IconButton>
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
          {/* <div style={{ width: '155px' }}>
            <Button type="tertiarySmall">
              <img
                src="/images/safety/suggestion.svg"
                alt=""
                style={{ marginRight: '5px' }}
              />
              Suggestions
            </Button>
          </div> */}
        </div>
      </div>
      {open && (
        <SubmitConfirmation
          open={open}
          close={closeDialog}
          action={addToSuggestedStr}
          donRedirect>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            suggest this strength?
          </span>
        </SubmitConfirmation>
      )}
    </>
  );
};

export default Strengths;
