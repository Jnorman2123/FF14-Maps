export function fetchJobs() {
    return (dispatch) => {
        dispatch({type: "START_LOADING_JOBS_REQUEST"});
        fetch("http://127.0.0.1:8000/jobs/")
            .then((resp) => resp.json())
            .then((jobs) => 
                dispatch({type: "LOAD_JOBS", jobs})
            );
    };
}