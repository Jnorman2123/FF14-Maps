export function fetchQuests() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_QUESTS_REQUEST"});
        fetch("http://127.0.0.1:8000/quests/")
            .then((resp) => resp.json())
            .then((quests) => 
                dispatch({type: "LOAD_QUESTS", quests})
            );
    };
}