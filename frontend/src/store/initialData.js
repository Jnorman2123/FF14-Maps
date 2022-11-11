import { CLASSES, QUEST_TYPES, QUEST_LEVELS, INSIDE_ZONE_NAMES, OUTSIDE_ZONE_NAMES, REGION_NAMES,
        ZONES, ORIGINAL_REGIONS, HEAVENSWARD_REGIONS, STORMBLOOD_REGIONS, ENDWALKER_REGIONS, 
        SHADOWBRINGERS_REGIONS, ZONE_ATTRIBUTES, WORLD_MAP_ATTRIBUTES, LA_NOSCEA_MAP_ATTRIBUTES,
        THE_BLACK_SHROUD_MAP_ATTRIBUTES, THANALAN_MAP_ATTRIBUTES, LEGEND_ICON_ATTRIBUTES} from "./dataTypes";

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
        {name: '21-25', active: false}, {name: '26-30', active: false}, {name: '31-35', active: false}, {name: '36-40', active: false}, 
        {name: '41-45', active: false}, {name: '46-50', active: false}, {name: '51-55', active: false}, {name: '56-60', active: false}, 
        {name: '61-65', active: false}, {name: '66-70', active: false}, {name: '71-75', active: false}, {name: '76-80', active: false}, 
        {name: '81-85', active: false}, {name: '86-90', active: false}
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
    [ZONE_ATTRIBUTES] : [
        [
            {
                polygon: [
                    [8.2, 15.1], [7.7, 13.5], [9.4, 12.9], 
                    [11.2, 14.0], [13.3, 16.0], [15.9, 16.6], 
                    [17.3, 18.9], [19.1, 19.4], [19.5, 20.0],
                    [17.9, 21.8], [15.9, 20.9], [13.8, 19.6],
                    [13.0, 18.4], [11.0, 20.8], [11.1, 20.8],
                    [10.8, 23.3], [8.3, 23.5], [7.8, 23.0],
                    [8.6, 22.1], [8.6, 20.4], [9.9, 19.9],
                    [10.5, 20.4], [12.5, 17.9], [10.2, 17.6],
                    [9.9, 15.5]                
                ],
                name: 'Western La Noscea',
                popupPos: [11, -9],
                popupNamePos: [10.75, -9]
            },
            {
                polygon: [
                    [15.5, 12.8], [15.6, 12.3], [16.1, 12.0], 
                    [16.9, 12.4], [18.3, 12.2], [18.6, 12.5], 
                    [18.9, 13.5], [23.5, 13.7], [22.8, 13.4],
                    [22.9, 12.9], [23.2, 12.0], [23.2, 11.1],
                    [23.7, 10.7], [24.8, 11.3], [24.9, 12.3],
                    [25.9, 12.8], [26.1, 13.3], [27.1, 13.2],
                    [27.8, 13.9], [27.8, 14.5], [26.2, 14.7],
                    [23.1, 15.0], [22.8, 14.7], [23.4, 14.1],
                    [18.8, 14.1], [17.5, 15.3], [16.4, 13.6]
                ],
                name: 'Upper La Noscea',
                popupPos: [10, -26],
                popupNamePos: [9.75, -26]
            },
            {
                polygon: [
                    [17.8, 11.0], [18.0, 10.0], [17.4, 9.6], 
                    [17.3, 9.1], [18.0, 8.3], [18.1, 7.4], 
                    [18.1, 6.9], [19.0, 6.5], [19.0, 8.7],
                    [20.7, 8.7], [21.2, 8.0], [20.8, 6.2],
                    [20.9, 4.7], [23.8, 4.6], [24.2, 6.1],
                    [22.2, 9.2], [22.9, 9.0], [23.5, 9.6],
                    [22.8, 10.9], [21.3, 10.6], [19.1, 10.6],
                    [18.8, 11.4]
                ],
                name: 'Outer La Noscea',
                popupPos: [3, -22],
                popupNamePos: [2.75, -22]
            },
            {
                polygon: [
                    [26.1, 19.1], [27.1, 17.2], [28.1, 16.3], 
                    [33.4, 16.5], [36.3, 20.1], [36.1, 21.9], 
                    [35.3, 23.8], [33.3, 24.8], [31.3, 25.1],
                    [27.9, 24.3], [25.9, 21.5]
                ],
                name: 'Eastern La Noscea',
                popupPos: [15, -32],
                popupNamePos: [14.75, -32]
            },
            {
                polygon: [
                    [23.2, 19.9], [23.2, 21.2], [22.8, 21.9], 
                    [23.0, 22.5], [24.3, 22.1], [24.3,22.9],
                    [26.0, 23.4], [26.7, 24.2], [25.6, 25.6],
                    [26.1, 27.0], [26.0, 29.1], [25.0, 29.1],
                    [24.5, 28.8], [23.2, 27.8], [22.0, 26.0],
                    [22.0, 25.2], [21.4, 24.8], [21.0, 23.8],
                    [20.4, 24.4], [18.7, 23.9], [19.5, 22.8],
                    [20.4, 22.9], [20.8, 20.9], [22.6, 19.6]
                ],
                name: 'Middle La Noscea',
                popupPos: [18, -22],
                popupNamePos: [17.75, -22]
            },
            {
                polygon: [
                    [27.1, 28.6], [30.3, 27.0], [31.5, 28.1], 
                    [31.9, 29.5], [30.5, 31.7], [27.7, 32.7], 
                    [28.0, 33.7], [25.7, 36.0], [27.6, 36.1],
                    [28.7, 37.1], [26.4, 39.8], [24.1, 39.0],
                    [22.8, 37.3], [25.7, 33.4], [24.6, 32.5],
                    [26.2, 31.2], [27.6, 31.2], [26.8, 29.2]
                ],
                name: 'Lower La Noscea',
                popupPos: [25, -30],
                popupNamePos: [24.75, -30]
            },
            {
                polygon: [
                    [17.5, 27.8], [20.2, 27.3], [20.2, 29.9], 
                    [19.5, 30.0], [18.3, 29.5], [17.4, 28.5]
                ],
                name: 'Limsa Lominsa Lower Decks',
                popupPos: [25, -19],
                popupNamePos: [24.75, -19]
            },
            {
                polygon: [
                    [20.1, 26.3], [21.0, 25.3], [21.4, 25.5], 
                    [22.0, 28.2], [21.9, 29.0], [20.7, 29.7],
                    [20.6, 26.9], [20.2, 26.5]
                ],
                name: 'Limsa Lominsa Upper Decks',
                popupPos: [25, -21],
                popupNamePos: [24.75, -21]
            },
        ],
        [
            {
                polygon: [
                    [16.8, 16.7], [16.8, 15.9], [17.1, 15.6], 
                    [17.6, 15.5], [18.0, 15.6], [18.4, 15.8], 
                    [18.7, 15.8], [19.1, 16.3], [19.4, 16.0],
                    [19.9, 15.9], [19.9, 16.2], [19.6, 16.6],
                    [18.8, 16.6], [19.2, 17.0], [19.2, 17.3],
                    [18.9, 17.3], [17.9, 17.1]
                ],
                name: 'New Gridania',
                popupPos: [13.5, -18],
                popupNamePos: [13.25, -18]
            },
            {
                polygon: [
                    [16.9, 15.5], [17.0, 15.0], [17.4, 15.2], 
                    [18.0, 15.1], [18.6, 15.3], [19.0, 15.7], 
                    [19.3, 15.7], [19.8, 13.7], [19.4, 13.4],
                    [18.8, 13.1], [18.1, 12.7], [16.1, 13.9],
                    [15.8, 13.8], [15.0, 13.8], [14.9, 14.2],
                    [15.5, 15.6], [16.1, 16.1], [16.6, 16.0]
                ],
                name: 'Old Gridania',
                popupPos: [11.5, -18],
                popupNamePos: [11.25, -18]
            },
            {
                polygon: [
                    [13.9, 14.0], [13.4, 12.9], [13.6, 11.7], 
                    [13.5, 11.2], [12.9, 10.8], [12.4, 10.9], 
                    [11.7, 11.6], [9.3, 10.6], [8.3, 11.0],
                    [8.2, 11.8], [9.6, 12.4], [9.3, 13.2],
                    [6.8, 13.4], [6.3, 13.8], [6.9, 14.8],
                    [7.0, 16.6], [7.6, 16.6], [9.9, 16.7],
                    [13.0, 15.5]
                ],
                name: 'North Shroud',
                popupPos: [9, -10],
                popupNamePos: [8.75, -10]
            },
            {
                polygon: [
                    [14.2, 18.0], [13.2, 19.5], [13.5, 22.1], 
                    [17.9, 25.5], [19.9, 25.9], [21.9, 24.9], 
                    [23.1, 21.1], [23.1, 20.4], [21.8, 17.9],
                    [20.8, 17.9], [19.2, 18.4]
                ],
                name: 'Central Shroud',
                popupPos: [18, -19],
                popupNamePos: [17.75, -19]
            },
            {
                polygon: [
                    [23.1, 17.0], [25.9, 18.6], [28.8, 18.9], 
                    [28.8, 17.9], [28.1, 17.0], [30.2, 16.3], 
                    [30.4, 15.8], [32.9, 14.8], [33.0, 14.5],
                    [32.3, 13.8], [30.8, 13.9], [32.6, 11.9],
                    [32.7, 11.0], [31.5, 10.0], [29.2, 9.5],
                    [27.0, 9.6], [22.6, 14.8], [22.3, 15.5]
                ],
                name: 'East Shroud',
                popupPos: [9, -30],
                popupNamePos: [8.75, -30]
            },
            {
                polygon: [
                    [20.6, 26.6], [26.1, 26.6], [29.3, 29.6], 
                    [28.3, 31.1], [25.2, 30.6], [21.3, 35.1], 
                    [20.4, 34.4], [20.3, 32.9], [20.2, 27.0]
                ],
                name: 'South Shroud',
                popupPos: [26, -23],
                popupNamePos: [25.75, -23]
            },
        ],
        [
            {
                polygon: [
                    [18.3, 26.7], [18.5, 26.4], [18.3, 26.3], 
                    [18.4, 25.9], [18.5, 25.5], [19.0, 25.6], 
                    [19.4, 25.4], [19.7, 25.2], [19.9, 25.1],
                    [20.3, 24.7], [19.9, 24.3], [18.2, 24.2],
                    [18.0, 24.4], [17.9, 25.7], [17.9, 25.7],
                    [17.2, 26.4]
                ],
                name: `Ul'dah - Steps of Nald`,
                popupPos: [21.5, -18],
                popupNamePos: [21.25, -18]
            },
            {
                polygon: [
                    [18.4, 27.0], [18.8, 25.6], [19.1, 25.6], 
                    [19.2, 25.4], [20.1, 25.4], [20.1, 25.8], 
                    [19.8, 26.2], [19.5, 26.2], [19.3, 26.6]
                ],
                name: 'The Hustings Strip',
                popupPos: [21.5, -19],
                popupNamePos: [21.25, -19]
            },
            {
                polygon: [
                    [19.2, 27.0], [19.2, 27.3], [19.6, 27.4], 
                    [20.2, 26.9], [20.7, 26.9], [20.9, 26.6], 
                    [20.9, 26.1], [20.8, 25.4], [20.4, 24.7],
                    [20.0, 25.2], [20.3, 25.6], [20.3, 26.0],
                    [20.1, 26.3], [19.9, 26.5], [19.5, 26.6],
                    [19.6, 26.9]
                ],
                name: `Ul'dah - Steps of Thal`,
                popupPos: [21.5, -20],
                popupNamePos: [21.25, -20]
            },
            {
                polygon: [
                    [18.2, 21.9], [19.9, 22.1], [19.7, 23.4], 
                    [21.3, 24.0], [21.6, 25.5], [21.7, 26.6], 
                    [22.4, 27.0], [23.7, 26.8], [24.3, 24.7],
                    [23.2, 23.2], [25.7, 19.9], [25.6, 19.1],
                    [22.5, 16.9], [21.4, 16.4], [19.5, 16.6],
                    [18.8, 17.8], [18.0, 21.4]
                ],
                name: 'Central Thanalan',
                popupPos: [16, -21],
                popupNamePos: [15.75, -21]
            },
            {
                polygon: [
                    [7.0, 17.0], [8.8, 17.2], [10.9, 17.5], 
                    [12.0, 18.0], [12.0, 18.5], [10.5, 19.2], 
                    [11.3, 20.7], [16.2, 22.0], [17.2, 25.2],
                    [17.3, 25.8], [17.0, 26.2], [13.9, 27.7],
                    [10.6, 28.5], [10.2, 27.5], [9.9, 23.1],
                    [8.3, 21.8], [6.9, 17.6]    
                ],
                name: 'Western Thanalan',
                popupPos: [19, -12],
                popupNamePos: [18.75, -12]
            },
            {
                polygon: [
                    [18.3, 8.5], [20.2, 7.9], [20.7, 8.4], 
                    [21.2, 10.0], [23.1, 10.9], [23.6, 11.9], 
                    [23.4, 12.6], [22.6, 13.7], [21.9, 15.8],
                    [21.4, 16.2], [20.7, 16.0], [20.5, 15.4],
                    [20.1, 13.7], [18.1, 10.5]
                ],
                name: 'Northern Thanalan',
                popupPos: [6, -20.5],
                popupNamePos: [5.75, -20.5]
            },
            {
                polygon: [
                    [25.6, 13.2], [27.2, 13.1], [28.5, 13.6], 
                    [28.9, 14.9], [31.6, 14.4], [32.3, 12.6], 
                    [34.2, 13.1], [34.5, 14.2], [33.8, 15.6],
                    [34.9, 16.8], [35.4, 18.1], [34.7, 18.6],
                    [29.3, 20.2], [25.8, 18.9]
                ],
                name: 'Eastern Thanalan',
                popupPos: [13, -30],
                popupNamePos: [12.75, -30]
            },
            {
                polygon: [
                    [24.5, 27.0], [27.3, 23.9], [28.6, 23.7], 
                    [30.3, 24.5], [30.5, 26.7], [29.7, 28.1], 
                    [33.2, 28.7], [34.7, 29.5], [34.7, 30.0],
                    [30.5, 32.2], [32.1, 36.1], [30.6, 38.9],
                    [25.3, 38.8], [24.7, 38.0], [24.3, 35.0],
                    [24.3, 30.8]
                ],
                name: 'Southern Thanalan',
                popupPos: [22, -28],
                popupNamePos: [21.75, -28]
            }
        ],
    ],
    [WORLD_MAP_ATTRIBUTES] : {
        la_noscea_legend_pos: [-32, 9],
        thanalan_legend_pos: [-31, 29.5],
        the_black_shroud_legend_pos: [-18, 36],
    },
    [LA_NOSCEA_MAP_ATTRIBUTES] : {
        la_noscea_name_pos: [0,10],
        limsa_lominsa_upper_decks_legend_pos: [-30, 5.5],
        limsa_lominsa_lower_decks_legend_pos: [-36, 15],
        middle_la_noscea_legend_pos: [-17.75, 25.25],
        lower_la_noscea_legend_pos: [-30, 36.5],
        eastern_la_noscea_legend_pos: [-12, 34],
        western_la_noscea_legend_pos: [-23.5, 10.5],
        upper_la_noscea_legend_pos: [-13, 12],
        outer_la_noscea_legend_pos: [-6, 11.5],
    },
    [THE_BLACK_SHROUD_MAP_ATTRIBUTES] : {
        the_black_shroud_name_pos: [0,0],
        old_gridania_legend_pos: [-13.5, 17.25],
        new_gridania_legend_pos: [-19.75, 25.25],
        east_shroud_legend_pos: [-25, 35.5],
        north_shroud_legend_pos: [-21, 8.5],
        central_shroud_legend_pos: [-28.5, 14],
        south_shroud_legend_pos: [-38, 27],
    },
    [THANALAN_MAP_ATTRIBUTES] : {
        thanalan_name_pos: [0,0],
        uldah_steps_of_nald_legend_pos: [-33, 10],
        uldah_steps_of_thal_legend_pos: [-32, 24],
        hustings_strip_legend_pos: [-37.5, 17],
        western_thanalan_legend_pos: [-18, 12.5],
        eastern_thanalan_legend_pos: [-10.5, 32.5],
        central_thanalan_legend_pos: [-23.5, 27],
        southern_thanalan_legend_pos: [-32.5, 38],
        northern_thanalan_legend_pos: [-12, 18.5],
    },
    [LEGEND_ICON_ATTRIBUTES] : {
        legend_size: [121.5, 90.5],
        vert_arrow_size: [59.5, 42.5],
        hor_arrow_size: [42.5, 59.5],
        legend_num_size: [30.5, 25],
        legend_z_offset: 250,
        arrow_z_offset: 100,
        legend_num_z_offset: 500,
        vert_arrow_offset: 2.5,
        hor_arrow_offset: 3.5,
        top_num_offset: 0.9,
        bot_num_offset: -0.75,
        left_num_offset: -0.5,
        right_num_offset: 1.75
    }
}

