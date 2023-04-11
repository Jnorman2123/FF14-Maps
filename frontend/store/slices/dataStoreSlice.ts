import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataStoreState {
  classes: {
    name: string,
    active: boolean,
    hovered: boolean
  }[],
  questTypes: {
    name: string,
    active: boolean,
    hovered: boolean
  }[],
  questLevels: {
    name: string,
    active: boolean,
    hovered: boolean
  }[],
  insideZoneNames: string[],
  outsideZoneNames: string[],
  laNosceaZoneNames: string[],
  theBlackShroudZoneNames: string[],
  thanalanZoneNames: string[],
  regionNames: string[],
  zones: string[],
  originalRegions: string[],
  worldMapAttributes: {
    laNosceaLegendPos: number[],
    thanalanLegendPos: number[],
    theBlackShroudLegendPos: number[],
  },
  laNosceaMapAttributes: {
    laNosceaNamePos: number[],
    limsaLominsaUpperDecksAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    limsaLominsaLowerDecksAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    middleLaNosceaAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    lowerLaNosceaAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    easternLaNosceaAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    westernLaNosceaAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    upperLaNosceaAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    outerLaNosceaAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    } 
  },
  theBlackShroudMapAttributes: {
    theBlackShroudNamePos: number[],
    oldGridaniaAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    newGridaniaAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    eastShroudAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    northShroudAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    centralShroudAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    southShroudAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    }
  },
  thanalanMapAttributes: {
    thanalanNamePos: number[],
    uldahStepsOfNaldAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    uldahStepsOfThalAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    hustingsStripAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    westernThanalanAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    easternThanalanAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    centralThanalanAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    southernThanalanAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },
    northernThanalanAttributes: {
      legendPos: number[],
      arrowIcon: string,
      arrowSize: number[],
      arrowPos: number[],
      highlightPos: number[],
      highlightSize: number[]
    },   
  },
  legendIconAttributes: {
    legendSize: number[],
    vertArrowSize: number[],
    horArrowSize: number[],
    legendNumSize: number[],
    legendZOffset: number,
    arrowZOffset: number,
    legendNumZOffset: number,
    vertArrowOffset: number,
    horArrowOffset: number,
    topNumOffset: number,
    botNumOffset: number,
    leftNumOffset: number,
    rightNumOffset:number
  },
  questIconBgColors: string[],
  seoMessages: string[],
}

const initialState: DataStoreState = {
  classes: [
    {name: 'Gladiator', active: false, hovered: false}, {name: 'Marauder', active: false, hovered: false}, 
    {name: 'Archer', active: false, hovered: false}, {name: 'Lancer', active: false, hovered: false}, 
    {name: 'Pugilist', active: false, hovered: false}, {name: 'Rogue', active: false, hovered: false}, 
    {name: 'Conjurer', active: false, hovered: false}, {name: 'Arcanist', active: false, hovered: false}, 
    {name: 'Thaumaturge', active: false, hovered: false},
    // {name: 'Paladin', active: false, hovered: false}, {name: 'Warrior', active: false, hovered: false}, 
    // {name: 'Dark Knight', active: false, hovered: false}, {name: 'Gunbreaker', active: false, hovered: false}, 
    // {name: 'White Mage', active: false, hovered: false}, {name: 'Scholar', active: false, hovered: false}, 
    // {name: 'Astrologian', active: false, hovered: false}, {name: 'Sage', active: false, hovered: false}, 
    // {name: 'Monk', active: false, hovered: false}, {name: 'Dragoon', active: false, hovered: false}, 
    // {name: 'Ninja', active: false, hovered: false}, {name: 'Samurai', active: false, hovered: false}, 
    // {name: 'Reaper', active: false, hovered: false}, {name: 'Bard', active: false, hovered: false}, 
    // {name: 'Machinist', active: false, hovered: false}, {name: 'Dancer', active: false, hovered: false}, 
    // {name: 'Black Mage', active: false, hovered: false}, {name: 'Summoner', active: false, hovered: false}, 
    // {name: 'Red Mage', active: false, hovered: false}, {name: 'Blue Mage', active: false, hovered: false}
  ],
  questTypes: [
    {name: 'MainStory', active: false, hovered: false}, {name: 'Class', active: false, hovered: false}, 
    {name: 'Side', active: false, hovered: false}, {name: 'HuntingLog', active: false, hovered: false},
  ],
  questLevels: [
    {name: '1-5', active: false, hovered: false}, {name: '6-10', active: false, hovered: false}, 
    {name: '11-15', active: false, hovered: false}, {name: '16-20', active: false, hovered: false}, 
    {name: '21-25', active: false, hovered: false}, {name: '26-30', active: false, hovered: false},
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
    laNosceaLegendPos: [-32, 9],
    thanalanLegendPos: [-31, 29.5],
    theBlackShroudLegendPos: [-18, 36],
  },
  laNosceaMapAttributes: {
    laNosceaNamePos: [0,10],
    limsaLominsaUpperDecksAttributes: {
        legendPos: [-36, 15],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-33.5, 15],
        highlightPos: [-29.05, 15.05],
        highlightSize: [92.04, 141.96]
    },
    limsaLominsaLowerDecksAttributes: {
        legendPos: [-30, 5.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-30, 9],
        highlightPos: [-30.6, 13.37],
        highlightSize: [138.06, 93.6]
    },
    middleLaNosceaAttributes: {
        legendPos: [-17.75, 25.25],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-20.25, 25.25],
        highlightPos: [-22.44, 21.255],
        highlightSize: [166.14, 193.44]
    },
    lowerLaNosceaAttributes: {
        legendPos: [-30, 36.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-30, 33],
        highlightPos: [-33.5, 27.47],
        highlightSize: [168.63, 243.32]
    },
    easternLaNosceaAttributes: {
        legendPos: [-12, 34],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-14.5, 34],
        highlightPos: [-19.32, 34.1],
        highlightSize: [227.075, 187.55]
    },
    westernLaNosceaAttributes: {
        legendPos: [-23.5, 10.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-21, 10.5],
        highlightPos: [-18.05, 9.05],
        highlightSize: [255.84, 210.6]
    },
    upperLaNosceaAttributes: {
        legendPos: [-13, 12],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-13, 15.5],
        highlightPos: [-12.39, 20.91],
        highlightSize: [198.66, 93.17]
    },
    outerLaNosceaAttributes: {
        legendPos: [-6, 11.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-6, 15],
        highlightPos: [-6.02, 19.2],
        highlightSize: [154.44, 137.28]
    } 
  },
  theBlackShroudMapAttributes: {
    theBlackShroudNamePos: [0,0],
    oldGridaniaAttributes: {
        legendPos: [-13.5, 17.25],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-13.5, 20.75],
        highlightPos: [-12.73, 24.88],
        highlightSize: [134.16, 92.82]
    },
    newGridaniaAttributes: {
        legendPos: [-19.75, 25.25],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-17.25, 25.25],
        highlightPos: [-15.37, 25.9],
        highlightSize: [95.16, 69.42]
    },
    eastShroudAttributes: {
        legendPos: [-25, 35.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-22.5, 35.5],
        highlightPos: [-16.49, 34.85],
        highlightSize: [217.62, 196.56]
    },
    northShroudAttributes: {
        legendPos: [-21, 8.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-18.5, 8.5],
        highlightPos: [-14.9, 9.9],
        highlightSize: [177.06, 133.38]
    },
    centralShroudAttributes: {
        legendPos: [-28.5, 14],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-26, 14],
        highlightPos: [-24.46, 18.5],
        highlightSize: [199.68, 167.7]
    },
    southShroudAttributes: {
        legendPos: [-38.5, 27],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-36, 27],
        highlightPos: [-35.78, 24.42],
        highlightSize: [201.24, 195.78]
    }
  },
  thanalanMapAttributes: {
    thanalanNamePos: [0,0],
    uldahStepsOfNaldAttributes: {
        legendPos: [-33, 10],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-33, 13.5],
        highlightPos: [-31.98, 16.875],
        highlightSize: [113.88, 91.26]
    },
    uldahStepsOfThalAttributes: {
        legendPos: [-32, 24],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-32, 20.5],
        highlightPos: [-31.85, 17.2],
        highlightSize: [113.88, 86.58]
    },
    hustingsStripAttributes: {
        legendPos: [-37.5, 17],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerUp.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-35, 17],
        highlightPos: [-31.91, 17.055],
        highlightSize: [118.56, 91.26]
    },
    westernThanalanAttributes: {
        legendPos: [-18, 12.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-18, 9],
        highlightPos: [-21.45, 8.67],
        highlightSize: [204.82, 217.14]
    },
    easternThanalanAttributes: {
        legendPos: [-10.5, 32.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerDown.png`,
        arrowSize: [59.5, 42.5],
        arrowPos: [-13, 32.5],
        highlightPos: [-16.27, 33.35],
        highlightSize: [212.16, 175.5]
    },
    centralThanalanAttributes: {
        legendPos: [-23.5, 27],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-23.5, 23.5],
        highlightPos: [-22.2, 21.25],
        highlightSize: [164.3, 216.225]
    },
    southernThanalanAttributes: {
        legendPos: [-32.5, 38],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerLeft.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-32.5, 34.5],
        highlightPos: [-30.7, 33],
        highlightSize: [219.325, 311.55]
    },
    northernThanalanAttributes: {
        legendPos: [-12, 18.5],
        arrowIcon: `./icons/quest_legend_icons/QuestTotalsBoxPointerRight.png`,
        arrowSize: [42.5, 59.5],
        arrowPos: [-12, 22],
        highlightPos: [-9.65, 24.275],
        highlightSize: [127.1, 203.825]
    },   
  },
  legendIconAttributes: {
    legendSize: [121.5, 90.5],
    vertArrowSize: [59.5, 42.5],
    horArrowSize: [42.5, 59.5],
    legendNumSize: [30.5, 25],
    legendZOffset: 500,
    arrowZOffset: 250,
    legendNumZOffset: 1000,
    vertArrowOffset: 2.5,
    horArrowOffset: 3.5,
    topNumOffset: 0.9,
    botNumOffset: -0.75,
    leftNumOffset: -0.5,
    rightNumOffset: 1.75
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
  reducers: {
    updateClassActiveByName(state, action) {
      const { name, active } = action.payload;
      const index = state.classes.findIndex((c) => c.name === name);
      if (index !== -1) {
        state.classes[index].active = active;
      }
    },
    updateClassHoveredByName(state, action) {
      const { name, hovered } = action.payload;
      const index = state.classes.findIndex((c) => c.name === name);
      if (index !== -1) {
        state.classes[index].hovered = hovered;
      }
    },
    updateQuestTypeActiveByName(state, action) {
      const { name, active } = action.payload;
      const index = state.questTypes.findIndex((qt) => qt.name === name);
      if (index !== -1) {
        state.questTypes[index].active = active;
      }
    },
    updateQuestTypeHoveredByName(state, action) {
      const { name, hovered } = action.payload;
      const index = state.questTypes.findIndex((qt) => qt.name === name);
      if (index !== -1) {
        state.questTypes[index].hovered = hovered;
      }
    },
    updateQuestLevelActiveByName(state, action) {
      const { name, active } = action.payload;
      const index = state.questLevels.findIndex((ql) => ql.name === name);
      if (index !== -1) {
        state.questLevels[index].active = active;
      }
    },
    updateQuestLevelHoveredByName(state, action) {
      const { name, hovered } = action.payload;
      const index = state.questLevels.findIndex((ql) => ql.name === name);
      if (index !== -1) {
        state.questLevels[index].hovered = hovered;
      }
    },
  },
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
// export const { updateClass, updateQuestType, updateQuestLevel } = dataStoreSlice.actions;
export const { updateClassActiveByName, updateClassHoveredByName, updateQuestTypeActiveByName,
updateQuestTypeHoveredByName, updateQuestLevelActiveByName, updateQuestLevelHoveredByName } = dataStoreSlice.actions;

export default dataStoreSlice.reducer