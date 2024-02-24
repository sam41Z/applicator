import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ApplicationStatus from "../applications/ApplicationStatus";
import app from "../App";
import ApplicationDetails from "../applications/ApplicationDetails";

export default function JobDetails() {
    const {id} = useParams();
    const url = "http://localhost:3000/jobs/" + id;
    const [job, setJob] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const fetchJob = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                setJob(d);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchJob();
    }, []);

    if (job) {
        return (
            <div>
                <h4><a href={job.original_url}>{job.position}</a></h4>
                <h5 className="text-body-secondary mb-3"><a className="link-secondary" href={job.employer.website_url}>{job.employer.name}</a></h5>
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
                <Link to="edit" className="btn btn-outline-primary mb-3">Edit Job</Link>
                <ApplicationDetails jobId={job.id}/>
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