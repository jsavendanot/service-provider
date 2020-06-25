import React, { useState, ChangeEvent } from 'react';
import clsx from 'clsx';
import { isEqual } from 'lodash';

import { TextField, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  KeyboardArrowDown,
  Add,
  AddCircleOutline,
  DeleteOutline
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'common/components';
import { Value } from 'types/safety';
import { SubmitConfirmation } from 'common/components';
import {
  suggestSafetyPlan,
  deleteSuggestionFromList
} from 'slices/suggestion/action';
import { RootState } from 'reducer';
import { Suggestion } from 'types/suggestion';
import { selectSuggestedItems } from 'selectors/safety';

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
    margin: '5px 0'
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
    width: '85%',
    background: '#FFFAE9',
    marginRight: '10px'
  },
  suggestedRowContainer: {
    width: '100%',
    display: 'flex'
  },
  suggestedRow: {
    width: '85%',
    padding: '10px',
    background: '#FFFAE9',
    borderRadius: '4px',
    marginBottom: '20px',
    wordWrap: 'break-word'
  },
  row: {
    width: '85%',
    padding: '10px',
    background: '#FFFAE9',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  valueText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#323F45'
  }
}));

type Props = {
  id: number;
  collapse: boolean;
  change: () => void;
};

export const StayWell: React.FC<Props> = ({ id, collapse, change }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const values: Value[] = useSelector(
    (state: RootState) => state.safety.staywell,
    isEqual
  );

  const suggestedValues: Suggestion[] = useSelector((state: RootState) =>
    selectSuggestedItems(state, 'StayWell')
  );

  const [addClicked, setAddClicked] = useState(false);
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInput(event.target.value);
  };

  const addToSuggestedValues = () => {
    if (input.length > 4) {
      dispatch(suggestSafetyPlan(input, 'StayWell', ''));
      setInput('');
    }
  };

  const removeFromSuggestedValues = (id: string) => {
    dispatch(deleteSuggestionFromList(id));
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
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div
            className={classes.title}>{`${id}. Things I do to stay well`}</div>
          <IconButton onClick={change}>
            <KeyboardArrowDown
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
            <span className={classes.descText}>
              These are things that I can do to be and stay well.
            </span>
            <div className={classes.values}>
              {values.map(value => {
                return (
                  <div key={value.id} className={classes.row}>
                    <span className={classes.valueText}>{value.name}</span>
                  </div>
                );
              })}
              {suggestedValues.map(value => {
                return (
                  <div
                    key={value.SuggestionId}
                    className={classes.suggestedRowContainer}>
                    <div className={classes.suggestedRow}>
                      <span className={classes.valueText}>{value.Name}</span>
                    </div>
                    <div style={{ height: '30px' }}>
                      <IconButton
                        onClick={() =>
                          removeFromSuggestedValues(value.SuggestionId)
                        }
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
        )}
      </div>
      {open && (
        <SubmitConfirmation
          open={open}
          close={closeDialog}
          action={addToSuggestedValues}
          donRedirect>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            suggest this stay well?
          </span>
        </SubmitConfirmation>
      )}
    </>
  );
};

export default StayWell;
