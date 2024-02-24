import React, {useState} from "react";
import {Button, Collapse} from "reactstrap";
import {CaretDown, CaretDownFill, CaretUp, CaretUpFill} from "react-bootstrap-icons";

export default function JobDetails({job, collapse}) {
    const [showDescription, setShowDescription] = useState(!collapse);
    const toggle = () => setShowDescription(!showDescription);
    return (
        <div>
            <h4><a href={job.original_url}>{job.position}</a></h4>
            <h5 className="text-body-secondary mb-3">
                <a className="link-secondary" href={job.employer.website_url}>
                    {job.employer.name}
                </a>
            </h5>
            <div className="card mb-3">
                <div className="card-header" style={{display: "flex", alignItems: "center"}}>
                    <div style={{flexGrow: "1"}}>
                        <small>Description</small>
                    </div>
                    {collapse && <button className="btn btn-primary" onClick={toggle}>
                        {showDescription ? <CaretUpFill/> : <CaretDownFill/>}
                    </button>}
                </div>
                <Collapse isOpen={showDescription}>
                    <div className="card-body" style={{whiteSpace: "pre-line"}}>
                        {job.description}
                    </div>
                </Collapse>
            </div>

        </div>
    );
}