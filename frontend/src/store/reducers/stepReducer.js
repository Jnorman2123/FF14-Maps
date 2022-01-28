export default function stepReducer(
    state = { steps: [], requesting: false},
    action
) {
    switch (action.type) {
        case 'START_LOADING_STEPS_REQUEST':
            return {
                ...state,
                steps: [...state.steps],
                requesting: true,
            };
        case 'LOAD_STEPS':
            return {
                ...state,
                steps: action.steps,
                requesting: false,
            }
        default: 
            return state;
    }
}