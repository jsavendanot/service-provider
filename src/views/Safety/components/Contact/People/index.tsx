import React, { useState, ChangeEvent } from 'react';
import { Network } from 'types/network';
import { makeStyles } from '@material-ui/styles';
import {
  Phone,
  Add,
  DeleteOutline,
  AddCircleOutline,
  People as PeopleIcon
} from '@material-ui/icons';
import { Button, NetworkList } from 'common/components';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  TextField,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { SubmitConfirmation } from 'common/components';
import {
  suggestSafetyPlan,
  deleteSuggestionFromList
} from 'slices/suggestion/action';
import { Suggestion } from 'types/suggestion';
import { RootState } from 'reducer';
import { selectSuggestedItems } from 'selectors/safety';

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
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  phone: {
    paddingLeft: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  phoneText: {
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
  },
  support: {
    paddingLeft: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  selectedNetworkName: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '23px',
    color: '#FCC501',
    marginRight: '5px'
  }
}));

type Props = {
  people: Network[];
};

export const People: React.FC<Props> = ({ people }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const suggestedValues: Suggestion[] = useSelector((state: RootState) =>
    selectSuggestedItems(state, 'WhenUnwellNotice').filter(item =>
      item.ExtraInfo.includes('person')
    )
  );

  const myContacts: Network[] = useSelector(
    (state: RootState) => state.network.mycontacts
  );

  const [addClicked, setAddClicked] = useState(false);
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInput(event.target.value);
  };

  const addToSuggestedValues = () => {
    if (input.length > 4 && selectedNetwork) {
      dispatch(
        suggestSafetyPlan(
          selectedNetwork.Id,
          'WhenUnwellNotice',
          selectedNetwork.Name + ',' + selectedNetwork.Phone + ',person'
        )
      );
      setInput('');
      setSelectedNetwork(undefined);
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

  //Network List Dialog
  const [selectedNetwork, setSelectedNetwork] = useState<Network>();
  const [openNetworkList, setOpenNetworkList] = useState(false);

  const openNetworkListDialog = () => {
    setOpenNetworkList(true);
  };

  const closeNetworkListDialog = () => {
    setOpenNetworkList(false);
  };

  const handleNetworkCallBack = (networks: Network[]) => {
    networks.length > 0 && setAddClicked(true);
    setSelectedNetwork(networks.pop());
  };

  const networkListDialog = (
    <Dialog open={openNetworkList} keepMounted onClose={closeNetworkListDialog}>
      <DialogContent>
        <NetworkList
          close={closeNetworkListDialog}
          callback={networks => handleNetworkCallBack(networks)}
          title="Suggest contacts"
        />
      </DialogContent>
    </Dialog>
  );

  const confirmDialog = (
    <SubmitConfirmation
      open={open}
      close={closeDialog}
      action={addToSuggestedValues}
      donRedirect>
      <span className={classes.title}>
        Are you sure you want to
        <br />
        suggest this contact?
      </span>
    </SubmitConfirmation>
  );

  return (
    <>
      <span className={classes.descText}>
        People or services who I can contact for support if I need immediate
        help.
      </span>
      <div style={{ margin: '10px 0 5px' }}>
        <span className={classes.subTitle}>People</span>
      </div>
      {people.map((item, index) => {
        return (
          <div key={index} className={classes.values}>
            <div className={classes.value}>{item.Name}</div>
            <div className={classes.phone}>
              <Phone style={{ fill: '#C57D7D', marginRight: '10px' }} />
              <span className={classes.phoneText}>{item.Phone},</span>
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
              <span className={classes.valueText}>
                {myContacts.find(item => item.Id === value.Name)?.Name}
              </span>
            </div>
            <div style={{ height: '30px' }}>
              <IconButton
                onClick={() => removeFromSuggestedValues(value.SuggestionId)}
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
        <div style={{ marginTop: '20px' }}>
          {selectedNetwork && (
            <div className={classes.support}>
              <PeopleIcon style={{ fill: '#FCC501', marginRight: '10px' }} />
              <span className={classes.selectedNetworkName}>
                {selectedNetwork.Name}
              </span>
            </div>
          )}
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
        </div>
      )}
      <div className={classes.action}>
        <div style={{ width: '91px', marginRight: '20px' }}>
          <Button type="primarySmall" click={openNetworkListDialog}>
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
      {open && confirmDialog}
      {openNetworkList && networkListDialog}
    </>
  );
};

export default People;
