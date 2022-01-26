export function fetchItems() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_ITEMS_REQUEST"});
        fetch("http://127.0.0.1:8000/api/items/")
            .then((resp) => resp.json())
            .then((items) => 
                dispatch({type: "LOAD_ITEMS", items})
            );
    };
}