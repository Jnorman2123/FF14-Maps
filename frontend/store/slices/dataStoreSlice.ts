import { createSlice } from '@reduxjs/toolkit';

export interface DataStoreState {
  classes: object[],
  questTypes: object[],
  questLevels: object[],
  insideZoneNames: string[],
  outsideZoneNames: string[],
}

const initialState: DataStoreState = {
  classes: [
    {name: 'Gladiator', active: false}, {name: 'Marauder', active: false}, {name: 'Archer', active: false},
    {name: 'Lancer', active: false}, {name: 'Pugilist', active: false}, {name: 'Rogue', active: false}, 
    {name: 'Conjurer', active: false}, {name: 'Arcanist', active: false}, {name: 'Thaumaturge', active: false},
    {name: 'Paladin', active: false}, {name: 'Warrior', active: false}, {name: 'Dark Knight', active: false}, 
    {name: 'Gunbreaker', active: false}, {name: 'White Mage', active: false}, {name: 'Scholar', active: false}, 
    {name: 'Astrologian', active: false}, {name: 'Sage', active: false}, {name: 'Monk', active: false}, 
    {name: 'Dragoon', active: false}, {name: 'Ninja', active: false}, {name: 'Samurai', active: false}, 
    {name: 'Reaper', active: false}, {name: 'Bard', active: false}, {name: 'Machinist', active: false}, 
    {name: 'Dancer', active: false}, {name: 'Black Mage', active: false}, {name: 'Summoner', active: false}, 
    {name: 'Red Mage', active: false}, {name: 'Blue Mage', active: false},  
  ],
  questTypes: [
    {name: 'MainStory', active: false}, {name: 'Class', active: false}, {name: 'Side', active: false}, 
    {name: 'HuntingLog', active: false},
  ],
  questLevels: [
    {name: '1-5', active: false}, {name: '6-10', active: false}, {name: '11-15', active: false}, {name: '16-20', active: false}, 
    {name: '21-25', active: false}, {name: '26-30', active: false},
  ],
  insideZoneNames: [
    'Limsa Lominsa Upper Decks', 'Limsa Lominsa Lower Decks',  
    'New Gridania','Old Gridania', "Ul'dah - Steps of Nald", "Ul'dah - Steps of Thal", 'Hustings Strip',  
    'The Gold Saucer', 'Foundation', 'The Pillars', 'Idyllshire', "Rhalgr's Reach",  
    'Kugane', 'Crystarium', 'Old Sharlayan', 'Labyrinthos', 'Radz-at-Han',
  ],
  outsideZoneNames: [
    'Middle La Noscea', 'Lower La Noscea', 'Eastern La Noscea', 'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea',
    'Central Shroud', 'East Shroud', 'South Shroud', 'North Shroud', 'Western Thanalan', 'Eastern Thanalan', 
    'Central Thanalan', 'Southern Thanalan', 'Northern Thanalan', 'Coerthas Central Highlands', 'Coerthas Western Highlands', 
    'Mor Dhona', "The Sea of Clouds", "Azys Lla", 'The Dravanian Forelands', 'The Dravanian Hinterlands', 'The Churning Mists',
    'The Fringes', 'The Peaks', 'The Lochs', 'The Ruby Sea', 'Yanxia', 'The Azim Steppe', 'Lakeland', 'Eulmore', 'Kholusia', 
    'Amh Araeng', 'Il Mheg', "The Rak'tika Greatwood", 'The Tempest', 'Garlemald', 'Thavnair', 'Mare Lamentorum', 'Ultima Thule', 
    'Elpis'
  ]
}

export const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState,
  reducers: {},
})


export const getClassesState = (state: { dataStore: DataStoreState }) => state.dataStore.classes
export const getQuestTypesState = (state: { dataStore: DataStoreState }) => state.dataStore.questTypes
export const getQuestLevelsState = (state: { dataStore: DataStoreState }) => state.dataStore.questLevels
export const getInsideZoneNamesState = (state: { dataStore: DataStoreState }) => state.dataStore.insideZoneNames
export const getOutsideZoneNamesState = (state: { dataStore: DataStoreState }) => state.dataStore.outsideZoneNames

export default dataStoreSlice.reducer