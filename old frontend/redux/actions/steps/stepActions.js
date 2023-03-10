export function fetchSteps() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_STEPS_REQUEST"});
        fetch("https://api.helperquest.com/steps/")
            .then((resp) => resp.json())
            .then((steps) => 
                dispatch({type: "LOAD_STEPS", steps})
            );
    };
}