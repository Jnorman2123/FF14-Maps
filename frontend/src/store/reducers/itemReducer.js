export default function itemReducer(
    state = { items: [], requesting: false},
    action
) {
    switch (action.type) {
        case 'START_LOADING_ITEMS_REQUEST':
            return {
                ...state,
                items: [...state.items],
                requesting: true,
            };
        case 'LOAD_ITEMS':
            return {
                ...state,
                items: action.items,
                requesting: false,
            };
        default: 
            return state;
    }
}