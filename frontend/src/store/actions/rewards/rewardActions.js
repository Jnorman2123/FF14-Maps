export function fetchRewards() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_REWARDS_REQUEST"});
        fetch("http://127.0.0.1:8000/rewards/")
            .then((resp) => resp.json())
            .then((rewards) => 
                dispatch({type: "LOAD_REWARDS", rewards})
            );
    };
}