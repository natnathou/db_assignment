import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FormValueState {
  valueSearch: string;
  valueFind: string;
}

const initialState: FormValueState = {
  valueSearch: '',
  valueFind: '',
};

const formValueSlice = createSlice({
  name: 'formValueSlice',
  initialState,

  reducers: {
    updateFormValueSearch(state, action: PayloadAction<string>) {
      return { ...state, valueSearch: action.payload };
    },
    updateFormValueFind(state, action: PayloadAction<string>) {
      return { ...state, valueFind: action.payload };
    },
  },
});

export const { updateFormValueSearch, updateFormValueFind } = formValueSlice.actions;
export default formValueSlice.reducer;
