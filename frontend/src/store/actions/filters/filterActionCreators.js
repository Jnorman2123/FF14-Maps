import { CLASSES, QUEST_LEVELS, QUEST_TYPES } from "../../dataTypes";
import { UPDATE } from "./filterActions";

const createUpdateEvent = (dataType, payload) => {
    return {
        type: UPDATE,
        dataType: dataType,
        payload: payload
    }
}

export const updateClass = (classes) => {
    return createUpdateEvent(CLASSES, classes);
}

export const updateQuestLevel = (quest_levels) => {
    return createUpdateEvent(QUEST_LEVELS, quest_levels);
}

export const updateQuestType = (quest_types) => {
    return createUpdateEvent(QUEST_TYPES, quest_types)
}