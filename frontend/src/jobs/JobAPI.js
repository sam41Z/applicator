export function getJob(id) {
    const url = "http://localhost:3000/jobs/" + id;
    return fetch(url)
        .then((res) => res.json());
}

export function deleteJob(jobId) {
    const requestOptions = {
        method: "DELETE",
    };
    return fetch("http://localhost:3000/jobs/" + jobId, requestOptions)
        .then(res => res.ok ? Promise.resolve() : Promise.reject(res.statusText));
}