import {useContext, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import changeByPath from "../utils";
import {Save2Fill} from "react-bootstrap-icons";
import {InfoModalContext} from "../modals/InfoModalContext";
import FloppyFill from "../FloppyFill";
import {Button} from "reactstrap";

export default function ApplicationForm({jobId, application}) {
    const initialApplication = application ? application : {
        job: "",
        cover_letter: ""
    };
    initialApplication.job = jobId;
    const navigate = useNavigate();
    const showInfoModal = useContext(InfoModalContext);
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
            .then((res) => (res.ok) ? res.json() : Promise.reject(res.statusText))
            .catch(error => showInfoModal("Error", error, "OK"))
            .then(res => navigate(-1));
    };

    const handleOnChange = (e) => {
        const newApplication = {...currentApplication};
        changeByPath(e.target.name, newApplication, e.target.value);
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
            <Button type="submit" color="primary"><FloppyFill/> Save</Button>
        </form>
    );
}