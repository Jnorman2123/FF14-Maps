import { createSlice } from '@reduxjs/toolkit';

export interface QuestTypesState {
  array: object[]
}

const initialState: QuestTypesState = {
  array: [
    {name: 'MainStory', active: false}, {name: 'Class', active: false}, {name: 'Side', active: false}, 
        {name: 'HuntingLog', active: false},  
  ],
}

export const questTypesSlice = createSlice({
  name: 'questTypes',
  initialState,
  reducers: {},
})


export const getQuestTypesState = (state: { questTypes: QuestTypesState }) => state.questTypes.array

export default questTypesSlice.reducer