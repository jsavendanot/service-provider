import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PeopleRootType, Person } from 'types/people';

const initialState: PeopleRootType = {
  people: [],
  loading: false,
  errorMsg: ''
};

const peopleSlice = createSlice({
  name: 'people',
  initialState: initialState,
  reducers: {
    fetch(state, action: PayloadAction<{ people: Person[] }>) {
      const { people } = action.payload;
      state.people = people;
      state.loading = false;
    },
    addPerson(state, action: PayloadAction<{ person: Person }>) {
      const { person } = action.payload;
      state.people.push(person);
    },
    setErrorMsg(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload;
      state.errorMsg = message;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const {
  fetch,
  addPerson,
  startLoading,
  stopLoading,
  setErrorMsg
} = peopleSlice.actions;
export default peopleSlice.reducer;
