import React, { useState, ChangeEvent } from 'react';
import { Unwell } from 'types/safety';
import {
  People,
  Add,
  Block,
  DeleteOutline,
  AddCircleOutline
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'common/components';
import { Network } from 'types/network';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { IconButton, TextField } from '@material-ui/core';
import { SubmitConfirmation } from 'common/components';
import {
  suggestSafetyPlan,
  deleteSuggestionFromList
} from 'slices/suggestion/action';
import { Suggestion } from 'types/suggestion';
import { selectSuggestedItems } from 'selectors/safety';

const useStyles = makeStyles(() => ({
  values: {
    width: '85%'
  },
  value: {
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
  dontDoText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#B50000'
  },
  support: {
    paddingLeft: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  supportText: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '23px',
    color: '#C57D7D',
    marginRight: '5px'
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
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    margin: '10px 0',
    flexGrow: 1
  }
}));

type Props = {
  dontDo: Unwell[];
  collapse: boolean;
};

export const DontDo: React.FC<Props> = ({ dontDo, collapse }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const networks: Network[] = useSelector(
    (state: RootState) => state.network.networks
  );

  const suggestedValues: Suggestion[] = useSelector((state: RootState) =>
    selectSuggestedItems(state, 'UnwellNotHappen')
  );

  const [addClicked, setAddClicked] = useState(false);
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInput(event.target.value);
  };

  const addToSuggestedValues = () => {
    if (input.length > 4) {
      dispatch(suggestSafetyPlan(input, 'UnwellNotHappen', ''));
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
    <div style={{ margin: '5px 0' }}>
      {collapse && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '5px 0'
          }}>
          <Block style={{ fill: '#B50000', marginRight: '5px' }} />
          <span className={classes.dontDoText}>Don't do</span>
        </div>
      )}
      {collapse && (
        <div>
          {dontDo.map((item, index) => {
            return (
              <div key={index} className={classes.values}>
                <div className={classes.value}>{item.Name}</div>
                <div className={classes.support}>
                  <People style={{ fill: '#C57D7D', marginRight: '10px' }} />
                  <span className={classes.supportText}>
                    {
                      networks.find(
                        network =>
                          network.Id === item.NetworkContactIdResponsible
                      )?.Name
                    }
                  </span>
                </div>
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
      {open && (
        <SubmitConfirmation
          open={open}
          close={closeDialog}
          action={addToSuggestedValues}
          donRedirect>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            suggest this unwell?
          </span>
        </SubmitConfirmation>
      )}
    </div>
  );
};

export default DontDo;
