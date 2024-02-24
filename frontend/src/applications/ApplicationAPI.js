export function getApplicationByJobId(jobId) {
    const url = "http://localhost:3000/applications?jobId=" + jobId;
    return fetch(url)
        .then((res) => res.json());
}

export function deleteApplication(id) {
    const requestOptions = {
        method: "DELETE",
    };
    return fetch("http://localhost:3000/applications/" + id, requestOptions)
        .then(res => res.ok ? Promise.resolve() : Promise.reject(res.statusText));
}