export function fetchNpcs() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_NPCS_REQUEST"});
        fetch("https://api.helperquest.com/npcs/")
            .then((resp) => resp.json())
            .then((npcs) => 
                dispatch({type: "LOAD_NPCS", npcs})
            );
    };
}