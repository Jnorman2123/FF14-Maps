export type TypeQuest = {
    id: number,
    quest_name: string,
    previous_quest: string,
    quest_level: number,
    quest_type: string,
    quest_class: number[],
    next_quest: string,
    quest_npcs: number[],
    quest_reward: number
};
export type TypeReward = {
    id: number, 
    questName: string,
    experience: number,
    gil: number,
    items: number[],
    other: string
};
export type TypeItem = {
    id: number,
    name: string,
    quantity: number,
    optional: boolean
};
export type TypeNpc = {
    id: number,
    name: string,
    type: string,
    zone: string,
    locationX: string,
    locationY: string,
    soldItems: number[]
};
export type TypeStep = {
    id: number,
    description: string,
    quest: number,
    npc: number
};
export type TypeJob = {
    id: number,
    name: string
};
export type TypeClass = {
    name: string, 
    active: boolean,
    hovered: boolean
};
export type TypeQuestType = {
    name: string,
    active: boolean,
    hovered: boolean
};
export type TypeQuestLevel = {
    name: string,
    active: boolean,
    hovered: boolean
};
export type TypeInsideZoneName = string;
export type TypeOutsideZoneName = string;
export type TypeLaNosceaName = string;
export type TypeTheBlackShroudName = string;
export type TypeThanalanName = string;
export type TypeRegionName = string;
export type TypeZone = string;
export type TypeOriginalRegion = string;
export type TypeWorldMapAttributes = {
    laNosceaLegendPos: number[];
    thanalanLegendPos: number[];
    theBlackShroudLegendPos: number[];
};
export type TypeLaNosceaMapAttributes = {
    laNosceaNamePos: number[],
    limsaLominsaUpperDecksAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    limsaLominsaLowersDecksAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    middleLaNosceaAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    lowerLaNosceaAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    easternLaNosceaAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    westernLaNosceaAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    upperLaNosceaAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    outerLaNosceaAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    }
};
export type TypeTheBlackShroudMapAttributes = {
    theBlackShroudNamePos: number[],
    oldGridaniaAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    newGridaniaAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    eastShroudAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    northShroudAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    centralShroudAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    southShroudAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    }
};
export type TypeThanalanMapAttributes = {
    thanalanNamePos: number[];
    uldatStepsOfNaldAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    uldahStepsOfThalAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    hustingsStripAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    westernThanalanAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    easternThanalanAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    centralThanalanAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    southernThanalanAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    },
    northernThanalanAttributes: {
        legendPos: number[],
        arrowIcon: string,
        arrowSize: number[],
        arrowPos: number[],
        higlightPos: number[],
        highlightSize: number[]
    }
};
export type TypeLegendIconAttributes = {
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
    rightNumOffset: number
};
export type TypeIconBgColors = string[];
export type TypeSeoMessages = string[];