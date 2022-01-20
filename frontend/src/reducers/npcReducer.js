export default function npcReducer(
    state = { npcs: [], requesting: false},
    action
) {
    switch (action.type) {
        case 'START_LOADING_NPCS_REQUEST':
            return {
                ...state,
                npcs: [...state.npcs],
                requesting: true,
            };
        case 'LOAD_NPCS':
            return {
                ...state,
                npcs: action.npcs,
                requesting: false,
            };
        default: 
            return state;
    }
}