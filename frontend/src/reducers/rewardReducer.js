export default function rewardReducer(
    state = { rewards: [], requesting: false},
    action
) {
    switch (action.type) {
        case 'START_LOADING_REWARDS_REQUEST':
            return {
                ...state,
                rewards: [...state.rewards],
                requesting: true,
            };
        case 'LOAD_REWARDS':
            return {
                ...state,
                rewards: action.rewards,
                requesting: false,
            }
        default: 
            return state;
    }
}