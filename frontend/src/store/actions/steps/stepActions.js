export function fetchSteps() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_STEPS_REQUEST"});
        fetch("http://127.0.0.1:8000/steps/")
            .then((resp) => resp.json())
            .then((steps) => 
                dispatch({type: "LOAD_STEPS", steps})
            );
    };
}