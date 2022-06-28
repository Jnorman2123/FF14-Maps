export function fetchItems() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_ITEMS_REQUEST"});
        fetch("https://api.helperquest.com/items/")
            .then((resp) => resp.json())
            .then((items) => 
                dispatch({type: "LOAD_ITEMS", items})
            );
    };
}