import { CLASSES, QUEST_TYPES, QUEST_LEVELS, INSIDE_ZONE_NAMES, OUTSIDE_ZONE_NAMES, REGION_NAMES,
        LA_NOSCEA_ZONE_NAMES, THE_BLACK_SHROUD_ZONE_NAMES, THANALAN_ZONE_NAMES, ZONES, ORIGINAL_REGIONS, HEAVENSWARD_REGIONS, 
        STORMBLOOD_REGIONS, ENDWALKER_REGIONS, SHADOWBRINGERS_REGIONS, WORLD_MAP_ATTRIBUTES, LA_NOSCEA_MAP_ATTRIBUTES,
        THE_BLACK_SHROUD_MAP_ATTRIBUTES, THANALAN_MAP_ATTRIBUTES, LEGEND_ICON_ATTRIBUTES, QUEST_ICON_BG_COLORS} from "./dataTypes";

export const initialData = {
    [CLASSES] : [
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
    [QUEST_TYPES] : [
        {name: 'Main Story', active: false}, {name: 'Class', active: false}, {name: 'Side', active: false}, 
        {name: 'Hunting Log', active: false},
    ],
    [QUEST_LEVELS] : [
        {name: '1-5', active: false}, {name: '6-10', active: false}, {name: '11-15', active: false}, {name: '16-20', active: false}, 
        {name: '21-25', active: false}, {name: '26-30', active: false}, 
        // {name: '31-35', active: false}, {name: '36-40', active: false}, 
        // {name: '41-45', active: false}, {name: '46-50', active: false}, {name: '51-55', active: false}, {name: '56-60', active: false}, 
        // {name: '61-65', active: false}, {name: '66-70', active: false}, {name: '71-75', active: false}, {name: '76-80', active: false}, 
        // {name: '81-85', active: false}, {name: '86-90', active: false}
    ],
    [INSIDE_ZONE_NAMES] : [
        'Limsa Lominsa Upper Decks', 'Limsa Lominsa Lower Decks',  
        'New Gridania','Old Gridania', "Ul'dah - Steps of Nald", "Ul'dah - Steps of Thal", 'Hustings Strip',  
        'The Gold Saucer', 'Foundation', 'The Pillars', 'Idyllshire', "Rhalgr's Reach",  
        'Kugane', 'Crystarium', 'Old Sharlayan', 'Labyrinthos', 'Radz-at-Han',  
    ],
    [OUTSIDE_ZONE_NAMES] : [
        'Middle La Noscea', 'Lower La Noscea', 'Eastern La Noscea', 'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea',
        'Central Shroud', 'East Shroud', 'South Shroud', 'North Shroud', 'Western Thanalan', 'Eastern Thanalan', 
        'Central Thanalan', 'Southern Thanalan', 'Northern Thanalan', 'Coerthas Central Highlands', 'Coerthas Western Highlands', 
        'Mor Dhona', "The Sea of Clouds", "Azys Lla", 'The Dravanian Forelands', 'The Dravanian Hinterlands', 'The Churning Mists',
        'The Fringes', 'The Peaks', 'The Lochs', 'The Ruby Sea', 'Yanxia', 'The Azim Steppe', 'Lakeland', 'Eulmore', 'Kholusia', 
        'Amh Araeng', 'Il Mheg', "The Rak'tika Greatwood", 'The Tempest', 'Garlemald', 'Thavnair', 'Mare Lamentorum', 'Ultima Thule', 
        'Elpis'
    ],
    [LA_NOSCEA_ZONE_NAMES] : ['Limsa Lominsa Upper Decks', 'Limsa Lominsa Lower Decks', 'Middle La Noscea', 'Lower La Noscea', 
        'Eastern La Noscea', 'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea'],
    [THE_BLACK_SHROUD_ZONE_NAMES] : ['New Gridania', 'Old Gridania', 'Central Shroud', 'East Shroud', 'South Shroud', 
        'North Shroud'],
    [THANALAN_ZONE_NAMES] : ["Ul'dah - Steps of Nald", "Ul'dah - Steps of Thal", 'Hustings Strip', 'Western Thanalan', 
        'Eastern Thanalan', 'Central Thanalan', 'Southern Thanalan', 'Northern Thanalan'],
    [REGION_NAMES] : [
        'La Noscea', 'The Black Shroud', 'Thanalan', 'Heavensward', 'Stormblood', 'Shadowbringers', 'Endwalker'
    ],
    [ZONES] : ['Limsa Lominsa Upper Decks (La Noscea)', 'Limsa Lominsa Lower Decks (La Noscea)', 'Middle La Noscea (La Noscea)', 
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
    [ORIGINAL_REGIONS] : [
        "La Noscea", "The Black Shroud", "Thanalan"
    ],
    [HEAVENSWARD_REGIONS] : [
        "Coerthas", "Mor Dhona", "Abalathia's Spine", "Dravania"
    ],
    [STORMBLOOD_REGIONS] : [
        "Gyr Abania", "Hingashi", "Othard"
    ],
    [SHADOWBRINGERS_REGIONS] : [
        "Norvandt"
    ],
    [ENDWALKER_REGIONS] : [
        "The Northern Empty", "Ilsabard", "The Sea of Stars", "The World Unsundered"
    ],
    [WORLD_MAP_ATTRIBUTES] : {
        la_noscea_legend_pos: [-32, 9],
        thanalan_legend_pos: [-31, 29.5],
        the_black_shroud_legend_pos: [-18, 36],
    },
    [LA_NOSCEA_MAP_ATTRIBUTES] : {
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
    [THE_BLACK_SHROUD_MAP_ATTRIBUTES] : {
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
    [THANALAN_MAP_ATTRIBUTES] : {
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
    [LEGEND_ICON_ATTRIBUTES] : {
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
    [QUEST_ICON_BG_COLORS] : [
        'Blue', 'Cyan', 'Red', 'Yellow', 'Green', 'Orange', 'Purple', 'Pink', 'Brown', 'Dark Cyan', 'Dark Red', 'Violet', 
        'Magenta', 'Light Yellow', 'Lime Green', 'Dark Blue', 'Light Magenta', 'Vivid Orange', 'Vivid Cyan',
        'Pale Yellow', 'Dark Pink', 'Dark Green', 'Vivid Violet', 'Light Pink', 'Forest Green', 'Black', 'White' 
    ]
}

