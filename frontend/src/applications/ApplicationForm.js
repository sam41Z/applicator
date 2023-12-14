import {useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import changeByPath from "../utils";

export default function ApplicationForm({jobId, application}) {
    const initialApplication = application ? application : {
        job: "",
        cover_letter: ""
    };
    initialApplication.job = jobId;
    const navigate = useNavigate();
    const [currentApplication, setApplication] = useState(initialApplication);

    const saveApplication = (event) => {
        event.preventDefault();
        const method = application ? "PUT" : "POST";
        const suffix = application ? "/" + application.id : "";
        const requestOptions = {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(currentApplication)
        };
        fetch("http://localhost:3000/applications" + suffix, requestOptions)
            .then((res) => res.json())
            .then(res => navigate("/applications/" + res.id + "/edit"));
    };

    const handleOnChange = (e) => {
        const newApplication = {...currentApplication};
        changeByPath(e.target.name, newApplication, e.target.value);
        console.log(newApplication)
        setApplication(newApplication);
    };

    return (
        <form onSubmit={saveApplication} acceptCharset="utf-8">
            <div className="mb-3">
                <label className="form-label">Cover Letter</label>
                <textarea name="cover_letter" value={currentApplication.cover_letter}
                          onChange={handleOnChange}
                          className="form-control" rows="15"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
}