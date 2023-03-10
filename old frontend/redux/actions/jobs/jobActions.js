export function fetchJobs() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_JOBS_REQUEST"});
        fetch("https://api.helperquest.com/jobs/")
            .then((resp) => resp.json())
            .then((jobs) => 
                dispatch({type: "LOAD_JOBS", jobs})
            );
    };
}