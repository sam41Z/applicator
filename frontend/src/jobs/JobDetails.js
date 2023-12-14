import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import ApplicationDetails from "../applications/ApplicationDetails";
import {PencilFill, Trash3Fill} from "react-bootstrap-icons";
import {ActionModalContext} from "../modals/ActionModalContext";
import {InfoModalContext} from "../modals/InfoModalContext";

export default function JobDetails() {
    const {id} = useParams();
    const url = "http://localhost:3000/jobs/" + id;
    const [job, setJob] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const showActionModal = useContext(ActionModalContext);
    const showInfoModal = useContext(InfoModalContext);
    const navigate = useNavigate();
    const fetchJob = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                setJob(d);
                setIsLoading(false);
            });
    };

    const fetchDeleteJob = (jobId) => {
        const requestOptions = {
            method: "DELETE",
        };
        fetch("http://localhost:3000/jobs/" + jobId, requestOptions)
            .then(res => res.ok ? Promise.resolve() : Promise.reject(res.statusText))
            .then(() => navigate("/"))
            .catch(error => showInfoModal("Error", error, "OK"));
    };

    useEffect(() => {
        fetchJob();
    }, []);

    if (job) {
        return (
            <div>
                <h4><a href={job.original_url}>{job.position}</a></h4>
                <h5 className="text-body-secondary mb-3"><a className="link-secondary"
                                                            href={job.employer.website_url}>{job.employer.name}</a></h5>
                <div className="card mb-3">
                    <div className="card-header" style={{display: "flex", alignItems: "center"}}>
                        <div style={{flexGrow: "1"}}>
                            <small>Description</small>
                        </div>
                    </div>
                    <div className="card-body" style={{whiteSpace: "pre-line"}}>
                        {job.description}
                    </div>
                </div>
                <div className=" mb-3">
                    <Link to="edit" className="btn btn-outline-primary me-3"><PencilFill/> Job</Link>
                    <button className="btn btn-outline-danger" onClick={() => showActionModal(
                        "Delete Job",
                        "Are you sure you want to remove \"" + job.position + "\" at \"" +
                        job.employer.name + "\"?",
                        "No no!",
                        "Yes, Im sure!",
                        job.id,
                        fetchDeleteJob)}>
                        <Trash3Fill/>
                    </button>
                </div>
                <div><ApplicationDetails jobId={job.id}/></div>
            </div>
        );
    } else {
        return (
            <div className="placeholder-glow">
                <h4><span className="placeholder col-4"></span></h4>
                <h5><span className="placeholder col-3"></span></h5>
                <div style={{height: "0.5rem"}}></div>

                <div className="card">
                    <div className="card-header">
                        <small>Description</small>
                    </div>
                    <div className="card-body">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-6"></span>
                    </div>
                </div>
            </div>
        );
    }
}