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
    reward_quest_name: string,
    reward_experience: number,
    reward_gil: number,
    reward_items: number[],
    reward_other: string
};
export type TypeItem = {
    id: number,
    item_name: string,
    item_quantity: number,
    item_optional: boolean
};
export type TypeNpc = {
    id: number,
    npc_name: string,
    npc_type: string,
    npc_zone: string,
    npc_location_x: string,
    npc_location_y: string,
    npc_sold_items: number[]
};
export type TypeStep = {
    id: number,
    step_description: string,
    quest_step: number,
    step_npc: number
};
export type TypeJob = {
    id: number,
    job_name: string
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
export type TypeQuestDetail = {
    quest: TypeQuest,
    questBgColor: string,
    stepContainerIcon: string,
    activeStepContainerIcon: string,
    questBgColorIcon: string,
    questTypeIcon: string,
    activeQuestTypeIcon: string,
    questSteps: {
        stepIcon: string,
        activeStepIcon: string,
        npcPosition: number[],
        npcZone: string,
        tooltipDetails: {
            npcName: string,
            questName: string,
            stepDescription: string
        },
    }[]
};
export type TypeMarkerObject = {
    quest: TypeQuest;
    questBgColorIcon: string,
    stepContainerIcon: string,
    activeStepContainerIcon: string,
    questTypeIcon: string,
    activeQuestTypeIcon: string,
    stepIcon: string,
    activeStepIcon: string,
    npcPosition: number[],
    npcZone: string,
    npcName: string,
    questName: string,
    stepDescription: string
};
export type TypeHoverOverlay = {
    map: string,
    mapNameIcon: {
        mapNameIconUrl: string,
        mapNameIconPos: number[],
        mapNameIconSize: number[],
    }, 
    highlightedMapIcon: {
        highlightedMapIconUrl: string,
        highlightedMapIconPos: number[],
        highlightedMapIconSize: number[],
    },
    legendOverlayIcon: {
        legendOverlayIconUrl: string,
        legendOverlayIconPos: number[],
        legendOverlayIconSize: number[],
    }
    mapLinkUrl: string,
}
export type TypeLegend = {
    legendIcon: {
        legendIconUrl: string,
        legendIconPos: number[],
        legendIconSize: number[],
        legendIconZOffset: number,
    },
    arrowIcon: {
        arrowIconUrl: string,
        arrowIconPos: number[],
        arrowIconSize: number[],
        arrowIconZOffset: number,
    },
    mainQuestNumberIcon: {
        mainQuestNumberIconUrl: string,
        mainQuestNumberIconPos: number[],
        mainQuestNumberIconSize: number[],
    },
    classQuestNumberIcon: {
        classQuestNumberIconUrl: string,
        classQuestNumberIconPos: number[],
        classQuestNumberIconSize: number[],
    },
    sideQuestNumberIcon: {
        sideQuestNumberIconUrl: string,
        sideQuestNumberIconPos: number[],
        sideQuestNumberIconSize: number[],
    },
    huntingLogQuestNumberIcon: {
        huntingLogQuestNumberIconUrl: string,
        huntingLogQuestNumberIconPos: number[],
        huntingLogQuestNumberIconSize: number[],
    }
}
