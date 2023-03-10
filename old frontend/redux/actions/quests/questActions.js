export function fetchQuests() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_QUESTS_REQUEST"});
        fetch("https://api.helperquest.com/quests/")
            .then((resp) => resp.json())
            .then((quests) => 
                dispatch({type: "LOAD_QUESTS", quests})
            );
    };
}