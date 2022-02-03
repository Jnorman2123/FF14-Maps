export function fetchNpcs() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_NPCS_REQUEST"});
        fetch("http://127.0.0.1:8000/npcs/")
            .then((resp) => resp.json())
            .then((npcs) => 
                dispatch({type: "LOAD_NPCS", npcs})
            );
    };
}