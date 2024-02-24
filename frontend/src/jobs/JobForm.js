import {useContext, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import changeByPath from "../utils";
import {DiscFill, Save2Fill, SaveFill} from "react-bootstrap-icons";
import {InfoModalContext} from "../modals/InfoModalContext";
import FloppyFill from "../FloppyFill";
import Floppy from "../Floppy";
import {Button} from "reactstrap";

export default function JobForm({job}) {
    const initialJob = job ? {...job} : {
        position: "",
        description: "",
        original_url: "",
        employer: {
            name: "",
            website_url: ""
        }
    };
    const [currentJob, setJob] = useState(initialJob);

    const navigate = useNavigate();
    const showInfoModal = useContext(InfoModalContext);
    const saveJob = (event) => {
        event.preventDefault();
        const method = job ? "PUT" : "POST";
        const suffix = job ? "/" + job.id : "";
        const requestOptions = {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(currentJob)
        };
        fetch("http://localhost:3000/jobs" + suffix, requestOptions)
            .then((res) => (res.ok) ? res.json() : Promise.reject(res.statusText))
            .catch(error => showInfoModal("Error", error, "OK"))
            .then(d => navigate(-1));
    };

    const handleOnChange = e => {
        const newJob = {...currentJob};
        changeByPath(e.target.name, newJob, e.target.value);
        setJob(newJob);
    };

    return (
        <form onSubmit={saveJob}>
            <div className="input-group mb-3">
                <span className="input-group-text">Employer</span>
                <input type="text" className="form-control"
                       name="employer.name"
                       value={currentJob.employer.name}
                       onChange={handleOnChange}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Website</span>
                <input type="text" className="form-control"
                       name="employer.website_url"
                       value={currentJob.employer.website_url}
                       onChange={handleOnChange}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Position</span>
                <input type="text" className="form-control"
                       name="position"
                       value={currentJob.position}
                       onChange={handleOnChange}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Original</span>
                <input type="text" className="form-control"
                       name="original_url"
                       value={currentJob.original_url}
                       onChange={handleOnChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="15"
                          name="description"
                          value={currentJob.description}
                          onChange={handleOnChange}></textarea>
            </div>
            <Button type="submit" color="primary"><FloppyFill/> Save</Button>
        </form>
    );

}