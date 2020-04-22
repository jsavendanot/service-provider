import React, { useState, ChangeEvent } from 'react';
import { Unwell, Value } from 'types/safety';
import {
  CheckCircle,
  People,
  Add,
  DeleteOutline,
  AddCircleOutline
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'common/components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Network } from 'types/network';
import uuid from 'uuid';
import { IconButton, TextField } from '@material-ui/core';
import Confirmation from 'common/components/Confirmation';

const useStyles = makeStyles(() => ({
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
  pleaseText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#41C04E'
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
  pleaseDo: Unwell[];
};

export const PleaseDo: React.FC<Props> = ({ pleaseDo }) => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.network.networks
  );

  const [suggestedValues, setSuggestedValues] = useState<Value[]>([]);
  const [addClicked, setAddClicked] = useState(false);
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInput(event.target.value);
  };

  const addToSuggestedValues = () => {
    if (input.length > 4) {
      setSuggestedValues(values => [
        ...values,
        {
          id: uuid(),
          name: input
        }
      ]);
      // dispatch(suggestStayWellStressWarning(input, 'StayWell', ''));
      setInput('');
    }
  };

  const removeFromSuggestedValues = (id: string) => {
    const updatedSuggestedStr = suggestedValues.filter(item => item.id !== id);
    setSuggestedValues(updatedSuggestedStr);
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
      <span className={classes.descText}>
        If I become unwell I would like these to happen or not happen.
      </span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 0 5px'
        }}>
        <CheckCircle style={{ fill: '#41C04E', marginRight: '5px' }} />
        <span className={classes.pleaseText}>Please do</span>
      </div>
      {pleaseDo.map((item, index) => {
        return (
          <div key={index} className={classes.values}>
            <div className={classes.value}>{item.Description}</div>
            <div className={classes.support}>
              <People style={{ fill: '#C57D7D', marginRight: '10px' }} />
              <span className={classes.supportText}>
                {
                  networks.find(
                    network => network.Id === item.NetworkContactIdResponsible
                  )?.Name
                }
                ,
              </span>
            </div>
          </div>
        );
      })}
      {suggestedValues.map(value => {
        return (
          <div key={value.id} className={classes.suggestedRowContainer}>
            <div className={classes.suggestedRow}>
              <span className={classes.valueText}>{value.name}</span>
            </div>
            <div style={{ height: '30px' }}>
              <IconButton
                onClick={() => removeFromSuggestedValues(value.id)}
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
      {open && (
        <Confirmation
          open={open}
          close={closeDialog}
          action={addToSuggestedValues}
          donRedirect>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            suggest this unwell?
          </span>
        </Confirmation>
      )}
    </>
  );
};

export default PleaseDo;
