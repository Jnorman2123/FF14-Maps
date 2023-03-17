import { createSlice } from '@reduxjs/toolkit';

export interface DataStoreState {
  classes: object[],
  questTypes: object[],
  questLevels: object[],
  insideZoneNames: string[],
  outsideZoneNames: string[],
  laNosceaZoneNames: string[],
  theBlackShroudZoneNames: string[],
  thanalanZoneNames: string[],
  regionNames: string[],
  zones: string[],
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
    'Limsa Lominsa Upper Decks', 'Limsa Lominsa Lower Decks', 'New Gridania','Old Gridania', "Ul'dah - Steps of Nald", 
    "Ul'dah - Steps of Thal", 'Hustings Strip', 'The Gold Saucer', 'Foundation', 'The Pillars', 'Idyllshire', "Rhalgr's Reach",  
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
  ],
  laNosceaZoneNames: [
    'Limsa Lominsa Upper Decks', 'Limsa Lominsa Lower Decks', 'Middle La Noscea', 'Lower La Noscea', 'Eastern La Noscea', 
    'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea'
  ],
  theBlackShroudZoneNames: [
    'New Gridania', 'Old Gridania', 'Central Shroud', 'East Shroud', 'South Shroud', 'North Shroud'
  ],
  thanalanZoneNames: [
    "Ul'dah - Steps of Nald", "Ul'dah - Steps of Thal", 'Hustings Strip', 'Western Thanalan', 'Eastern Thanalan', 
    'Central Thanalan', 'Southern Thanalan', 'Northern Thanalan'
  ],
  regionNames: [
    'La Noscea', 'The Black Shroud', 'Thanalan', 'Heavensward', 'Stormblood', 'Shadowbringers', 'Endwalker'
  ],
  zones: [
    'Limsa Lominsa Upper Decks (La Noscea)', 'Limsa Lominsa Lower Decks (La Noscea)', 'Middle La Noscea (La Noscea)', 
    'Lower La Noscea (La Noscea)', 'Eastern La Noscea (La Noscea)', 'Western La Noscea (La Noscea)', 'Upper La Noscea (La Noscea)', 
    'Outer La Noscea (La Noscea)', 'New Gridania (The Black Shroud)', 'Old Gridania (The Black Shroud)', 
    'Central Shroud (The Black Shroud)', 'East Shroud (The Black Shroud)', 'South Shroud (The Black Shroud)', 
    'North Shroud (The Black Shroud)', "Ul'dah - Steps of Nald (Thanalan)", "Ul'dah - Steps of Thal (Thanalan)", 
    'Hustings Strip (Thanalan)', 'The Gold Saucer (Thanalan)', 'Western Thanalan (Thanalan)', 'Eastern Thanalan (Thanalan)', 
    'Central Thanalan (Thanalan)', 'Southern Thanalan (Thanalan)', 'Northern Thanalan (Thanalan)', 'Foundation (Coerthas)', 
    'The Pillars (Coerthas)', 'Coerthas Central Highlands (Coerthas)', 'Coerthas Western Highlands (Coerthas)', 
    'Mor Dhona (Mor Dhona)', "The Sea of Clouds (Abalathia's Spine)", "Azys Lla (Abalathia's Spine)", 'Idyllshire (Dravania)', 
    'The Dravanian Forelands (Dravania)', 'The Dravanian Hinterlands (Dravania)', 'The Churning Mists (Dravania)', 
    "Rhalgr's Reach (Gyr Abania)", 'The Fringes (Gyr Abania)', 'The Peaks (Gyr Abania)', 'The Lochs (Gyr Abania)', 
    'Kugane (Hingashi)', 'The Ruby Sea (Othard)', 'Yanxia (Othard)', 'The Azim Steppe (Othard)', 
    'Crystarium (Norvandt)', 'Lakeland (Norvandt)', 'Eulmore (Norvandt)', 'Kholusia (Norvandt)', 'Amh Araeng (Norvandt)', 
    'Il Mheg (Norvandt)', "The Rak'tika Greatwood (Norvandt)", 'The Tempest (Norvandt)', 'Old Sharlayan (The Northern Empty)', 
    'Labyrinthos (The Northern Empty)', 'Garlemald (Ilsabard)', 'Radz-at-Han (Ilsabard)', 'Thavnair (Ilsabard)', 
    'Mare Lamentorum (The Sea of Stars)', 'Ultima Thule (The Sea of Stars)', 'Elpis (The World Unsundered)'
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
export const getLaNosceaZoneNamesState = (state: { dataStore: DataStoreState }) => state.dataStore.laNosceaZoneNames
export const getTheBlackShroudZoneNamesState = (state: { dataStore: DataStoreState }) => state.dataStore.theBlackShroudZoneNames
export const getThanalanZoneNamesState = (state: { dataStore: DataStoreState }) => state.dataStore.thanalanZoneNames
export const getRegionNamesState = (state: { dataStore: DataStoreState }) => state.dataStore.regionNames
export const getZonesState = (state: { dataStore: DataStoreState }) => state.dataStore.zones

export default dataStoreSlice.reducer