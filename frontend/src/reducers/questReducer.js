export default function questReducer(
    state = { quests: [], requesting: false},
    action
) {
    switch (action.type) {
        case 'START_LOADING_QUESTS_REQUEST':
            return {
                ...state,
                quests: [...state.quests],
                requesting: true,
            };
        case 'LOAD_QUESTS':
            return {
                ...state,
                quests: action.quests,
                requesting: false,
            }
        default: 
            return state;
    }
}