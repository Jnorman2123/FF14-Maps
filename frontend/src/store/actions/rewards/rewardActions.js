export function fetchRewards() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_REWARDS_REQUEST"});
        fetch("https://api.helperquest.com/rewards/")
            .then((resp) => resp.json())
            .then((rewards) => 
                dispatch({type: "LOAD_REWARDS", rewards})
            );
    };
}