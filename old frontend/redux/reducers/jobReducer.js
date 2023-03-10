export default function jobReducer(
    state = { jobs: [], requesting: false},
    action
) {
    switch (action.type) {
        case 'START_LOADING_JOBS_REQUEST':
            return {
                ...state,
                jobs: [...state.jobs],
                requesting: true,
            };
        case 'LOAD_JOBS':
            return {
                ...state,
                jobs: action.jobs,
                requesting: false,
            };
        default: 
            return state;
    }
}