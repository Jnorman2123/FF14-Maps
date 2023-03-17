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
  originalRegions: string[],
  worldMapAttributes: object,
  laNosceaMapAttributes: object,
  theBlackShroudMapAttributes: object,
  thanalanMapAttributes: object,
  legendIconAttributes: object,
  questIconBgColors: string[],
  seoMessages: string[],
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
  ], 
  originalRegions: [
    "La Noscea", "The Black Shroud", "Thanalan"
  ],
  worldMapAttributes: {
    la_noscea_legend_pos: [-32, 9],
    thanalan_legend_pos: [-31, 29.5],
    the_black_shroud_legend_pos: [-18, 36],
  },
  laNosceaMapAttributes: {
    la_noscea_name_pos: [0,10],
    limsa_lominsa_upper_decks_attributes: {
        legend_pos: [-36, 15],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-33.5, 15],
        highlight_pos: [-29.05, 15.05],
        highlight_size: [92.04, 141.96]
    },
    limsa_lominsa_lower_decks_attributes: {
        legend_pos: [-30, 5.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-30, 9],
        highlight_pos: [-30.6, 13.37],
        highlight_size: [138.06, 93.6]
    },
    middle_la_noscea_attributes: {
        legend_pos: [-17.75, 25.25],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-20.25, 25.25],
        highlight_pos: [-22.44, 21.255],
        highlight_size: [166.14, 193.44]
    },
    lower_la_noscea_attributes: {
        legend_pos: [-30, 36.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-30, 33],
        highlight_pos: [-33.5, 27.47],
        highlight_size: [168.63, 243.32]
    },
    eastern_la_noscea_attributes: {
        legend_pos: [-12, 34],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-14.5, 34],
        highlight_pos: [-19.32, 34.1],
        highlight_size: [227.075, 187.55]
    },
    western_la_noscea_attributes: {
        legend_pos: [-23.5, 10.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-21, 10.5],
        highlight_pos: [-18.05, 9.05],
        highlight_size: [255.84, 210.6]
    },
    upper_la_noscea_attributes: {
        legend_pos: [-13, 12],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-13, 15.5],
        highlight_pos: [-12.39, 20.91],
        highlight_size: [198.66, 93.17]
    },
    outer_la_noscea_attributes: {
        legend_pos: [-6, 11.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-6, 15],
        highlight_pos: [-6.02, 19.2],
        highlight_size: [154.44, 137.28]
    } 
  },
  theBlackShroudMapAttributes: {
    the_black_shroud_name_pos: [0,0],
    old_gridania_attributes: {
        legend_pos: [-13.5, 17.25],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-13.5, 20.75],
        highlight_pos: [-12.73, 24.88],
        highlight_size: [134.16, 92.82]
    },
    new_gridania_attributes: {
        legend_pos: [-19.75, 25.25],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-17.25, 25.25],
        highlight_pos: [-15.37, 25.9],
        highlight_size: [95.16, 69.42]
    },
    east_shroud_attributes: {
        legend_pos: [-25, 35.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-22.5, 35.5],
        highlight_pos: [-16.49, 34.85],
        highlight_size: [217.62, 196.56]
    },
    north_shroud_attributes: {
        legend_pos: [-21, 8.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-18.5, 8.5],
        highlight_pos: [-14.9, 9.9],
        highlight_size: [177.06, 133.38]
    },
    central_shroud_attributes: {
        legend_pos: [-28.5, 14],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-26, 14],
        highlight_pos: [-24.46, 18.5],
        highlight_size: [199.68, 167.7]
    },
    south_shroud_attributes: {
        legend_pos: [-38.5, 27],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-36, 27],
        highlight_pos: [-35.78, 24.42],
        highlight_size: [201.24, 195.78]
    }
  },
  thanalanMapAttributes: {
    thanalan_name_pos: [0,0],
    uldah_steps_of_nald_attributes: {
        legend_pos: [-33, 10],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-33, 13.5],
        highlight_pos: [-31.98, 16.875],
        highlight_size: [113.88, 91.26]
    },
    uldah_steps_of_thal_attributes: {
        legend_pos: [-32, 24],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-32, 20.5],
        highlight_pos: [-31.85, 17.2],
        highlight_size: [113.88, 86.58]
    },
    hustings_strip_attributes: {
        legend_pos: [-37.5, 17],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-35, 17],
        highlight_pos: [-31.91, 17.055],
        highlight_size: [118.56, 91.26]
    },
    western_thanalan_attributes: {
        legend_pos: [-18, 12.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-18, 9],
        highlight_pos: [-21.45, 8.67],
        highlight_size: [204.82, 217.14]
    },
    eastern_thanalan_attributes: {
        legend_pos: [-10.5, 32.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`,
        arrow_size: [59.5, 42.5],
        arrow_pos: [-13, 32.5],
        highlight_pos: [-16.27, 33.35],
        highlight_size: [212.16, 175.5]
    },
    central_thanalan_attributes: {
        legend_pos: [-23.5, 27],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-23.5, 23.5],
        highlight_pos: [-22.2, 21.25],
        highlight_size: [164.3, 216.225]
    },
    southern_thanalan_attributes: {
        legend_pos: [-32.5, 38],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-32.5, 34.5],
        highlight_pos: [-30.7, 33],
        highlight_size: [219.325, 311.55]
    },
    northern_thanalan_attributes: {
        legend_pos: [-12, 18.5],
        arrow_icon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrow_size: [42.5, 59.5],
        arrow_pos: [-12, 22],
        highlight_pos: [-9.65, 24.275],
        highlight_size: [127.1, 203.825]
    },   
  },
  legendIconAttributes: {
    legend_size: [121.5, 90.5],
    vert_arrow_size: [59.5, 42.5],
    hor_arrow_size: [42.5, 59.5],
    legend_num_size: [30.5, 25],
    legend_z_offset: 500,
    arrow_z_offset: 250,
    legend_num_z_offset: 1000,
    vert_arrow_offset: 2.5,
    hor_arrow_offset: 3.5,
    top_num_offset: 0.9,
    bot_num_offset: -0.75,
    left_num_offset: -0.5,
    right_num_offset: 1.75
  },
  questIconBgColors: [
    'Aqua', 'Avocado', 'Burgundy', 'Canary', 'CandyAppleRed', 'DeepSaffron', 'ElectricBlue', 'ElectricGreen', 
    'ElectricIndigo', 'FashionFuschia', 'FieldDrab', 'Azure', 'MalachiteGreen', 'Folly', 'ImperialPurple', 
    'MediumSpring', 'FrenchPink', 'Arsenic', 'MetallicSunburst', 'MidnightGreen', 'Fuschia', 'PaleViolet', 'Red', 
    'Heliotrope', 'ResolutionBlue', 'ScreamingGreen', 'SeaGreen', 'PhilippineGray', 'SpringFrost', 'Sunny', 'SunsetOrange', 
    'Turquoise', 'VenetianRed', 'VioletBlue', 'Viridian', 'VividOrangePeel', 'LightYellow' 
  ],
  seoMessages: [
    'Quest smarter and level faster in Final Fantasy 14 Online. Find quests by level, class and type. See start points, steps, turn ins, NPCs, and rewards on maps.',
    'Find quest information on maps for Final Fantasy 14 Online with HelperQuest.com. Plan your gameplay and quest smarter with our easy-to-use guide.',
    'HelperQuest.com helps you find quests on maps for Final Fantasy 14 Online. No more confusing text guides. Plan and play smarter with our visual guide.',
    'Quest smarter with HelperQuest.com, a visual guide for Final Fantasy 14 Online. Find quests on maps and plan your gameplay with ease.',
    'Get help for Final Fantasy 14 Online with our easy-to-read maps. Find quests by level, class and type. See start points, steps, turn ins, NPCs, and rewards.',
    'Need help with Final Fantasy 14 Online? Find quest information like start points and turn ins on easy-to-read maps. Plan out your gameplay and quest smarter.',
    'HelperQuest.com is a quest guide for Final Fantasy 14 Online that provides quest information on maps. Find quests based on your level, class and type.',
    'HelperQuest.com: The ultimate quest guide for Final Fantasy 14 online. Find quests based on your level, class and type. See them visually on maps and plan your gameplay.',
    'Looking for a better way to complete quests in Final Fantasy 14 online? Try HelperQuest.com, the quest guide that shows you everything visually on maps. No more confusing text!',
    'With HelperQuest.com, you can find and complete quests in Final Fantasy 14 online faster and easier. Choose your level, class and type of quest and see them on maps with details.',
    'Find the best quests for your level and class in Final Fantasy 14 online with HelperQuest.com. The quest guide that lets you see quest locations, steps, descriptions and rewards on maps.',
    'No more wasting time on quests in Final Fantasy 14 online. Use HelperQuest.com to find quests that suit your level, class and type. See them on maps with all the information you need.',
    'HelperQuest.com is the ultimate tool for Final Fantasy 14 online players. It helps you find quests based on your preferences and shows you where to go and what to do on maps.',
    'Questing in Final Fantasy 14 online has never been easier with HelperQuest.com. The quest guide that shows you everything visually on maps. Choose your level, class and type of quest and start playing.',
    'Want to level up faster in Final Fantasy 14 online? Use HelperQuest.com to find the best quests for your level and class. See them on maps with detailed information and complete them efficiently.',
    'Don’t get lost or frustrated with quests in Final Fantasy 14 online. Use HelperQuest.com to find quests that match your level, class and type. See them visually on maps with all the details you need.',
    'HelperQuest.com is the best quest guide for Final Fantasy 14 online players. It helps you find quests based on your criteria and shows you where to go and what to do on maps.',
    'Questing in Final Fantasy 14 online can be fun and easy with HelperQuest.com. The quest guide that shows you everything visually on maps. Select your level, class and type of quest and enjoy playing.',
    'Level up faster in Final Fantasy 14 online with HelperQuest.com. The quest guide that helps you find the best quests for your level and class. See them on maps with detailed information and rewards.',
    'Don’t waste time or get confused with quests in Final Fantasy 14 online. Use HelperQuest.com to find quests that suit your preferences and see them visually on maps with all the information you need.',
    'HelperQuest.com is the ultimate solution for questing in Final Fantasy 14 online. It helps you find quests based on your level, class and type of quest and shows you where to go and what to do on maps.',
    'Find quests for Final Fantasy 14 Online with HelperQuest, a quest guide that shows you where to go and what to do on maps. Find quests by level, class and type!'
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
export const getOriginalRegionsState = (state: { dataStore: DataStoreState }) => state.dataStore.originalRegions
export const getWorldMapAttributesState = (state: { dataStore: DataStoreState }) => state.dataStore.worldMapAttributes
export const getLaNosceaMapAttributesState = (state: { dataStore: DataStoreState }) => state.dataStore.laNosceaMapAttributes
export const getTheBlackShroudMapAttributesState = (state: { dataStore: DataStoreState }) => state.dataStore.theBlackShroudMapAttributes
export const getThanalanMapAttributesState = (state: { dataStore: DataStoreState }) => state.dataStore.thanalanMapAttributes
export const getLegendIconAttributesState = (state: { dataStore: DataStoreState }) => state.dataStore.legendIconAttributes
export const getQuestIconBgColorsState = (state: { dataStore: DataStoreState }) => state.dataStore.questIconBgColors
export const getSeoMessagesState = (state: { dataStore: DataStoreState }) => state.dataStore.seoMessages

export default dataStoreSlice.reducer