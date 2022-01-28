import { CLASSES, QUEST_TYPES, QUEST_LEVELS } from "./dataTypes";

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
}