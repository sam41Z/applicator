const baseUrl = "http://localhost:3000/applications";

export function getApplicationByJobId(jobId) {
    const url = baseUrl + "?jobId=" + jobId;
    return fetch(url)
        .then((res) => res.json());
}

export function getApplication(id) {
    const url = baseUrl + "/" + id;
    return fetch(url)
        .then((res) => res.json());
}

export function putApplication(application) {
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(application)
    };
    return fetch(baseUrl + "/" + application.id, requestOptions)
        .then((res) => res.json());
}

export function deleteApplication(id) {
    const requestOptions = {
        method: "DELETE",
    };
    return fetch(baseUrl + "/" + id, requestOptions)
        .then(res => res.ok ? Promise.resolve() : Promise.reject(res.statusText));
}