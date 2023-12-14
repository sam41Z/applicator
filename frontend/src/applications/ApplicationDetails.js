import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PencilFill, SendFill} from "react-bootstrap-icons";

export default function ApplicationDetails({jobId}) {
    const url = "http://localhost:3000/applications?jobId=" + jobId;
    const [application, setApplication] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const fetchApplication = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                if (d.length > 0) {
                    setApplication(d[0]);
                }
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchApplication();
    }, []);
    if (!isLoading && application) {
        return (
            <div>
                <div className="card mb-3">
                    <div className="card-header" style={{display: "flex", alignItems: "center"}}>
                        <div style={{flexGrow: "1"}}>
                            <small>Cover Letter</small>
                        </div>
                    </div>
                    <div className="card-body" style={{whiteSpace: "pre-line"}}>
                        {application.cover_letter}
                    </div>
                </div>
                <Link to={"/applications/" + application.id + "/edit"} className="btn btn-outline-primary">
                    <PencilFill/> Application
                </Link>
            </div>
        );
    } else if (!isLoading) {
        return (
            <Link to={"/jobs/" + jobId + "/apply"} className="btn btn-primary"><SendFill/> Apply</Link>
        );
    } else {
        return (
            <div className="placeholder-glow">
                <div className="card">
                    <div className="card-header">
                        <small>Cover Letter</small>
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