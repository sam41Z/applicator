import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import ApplicationDetails from "./applications/ApplicationDetails";
import {PencilFill, SendFill, Trash3Fill} from "react-bootstrap-icons";
import {ActionModalContext} from "./modals/ActionModalContext";
import {InfoModalContext} from "./modals/InfoModalContext";
import {deleteJob, getJob} from "./jobs/JobAPI";
import JobDetails from "./jobs/JobDetails";
import {deleteApplication, getApplicationByJobId} from "./applications/ApplicationAPI";
import {Button} from "reactstrap";

export default function JobOverview() {
    const {id} = useParams();
    const [job, setJob] = useState(undefined);
    const [application, setApplication] = useState(undefined);
    const [showApplyButton, setShowApplyButton] = useState(false);
    const showActionModal = useContext(ActionModalContext);
    const showInfoModal = useContext(InfoModalContext);
    const navigate = useNavigate();

    const handleDeleteJob = (jobId) => {
        deleteJob(jobId)
            .then(() => navigate("/"))
            .catch(error => showInfoModal("Error", error, "OK"));
    };

    const handleDeleteApplication = (applicationId) => {
        deleteApplication(applicationId)
            .then(() => {
                setApplication(undefined)
                setShowApplyButton(true)
            })
            .catch(error => showInfoModal("Error", error, "OK"));
    };

    useEffect(() => {
        getJob(id).then(job => setJob(job));
        getApplicationByJobId(id)
            .then(applications => {
                if (applications.length === 1) {
                    setApplication(applications[0]);
                } else {
                    setShowApplyButton(true);
                }
            });
    }, []);

    return (
        <div>
            {job && <div><JobDetails job={job} collapse={false}/>
                <div className="mb-3">
                    <Link to="edit" className="btn btn-outline-primary me-3"><PencilFill/> Job</Link>
                    <Button color="danger" outline={true}  disabled={!showApplyButton} onClick={() => showActionModal(
                        "Delete Job",
                        "Are you sure you want to remove \"" + job.position + "\" at \"" +
                        job.employer.name + "\"?",
                        "No no!",
                        "Yes, Im sure!",
                        job.id,
                        handleDeleteJob)}>
                        <Trash3Fill/>
                    </Button>
                </div>
            </div>}
            {application && <div>
                <ApplicationDetails application={application}/>
                <div>
                    <Link to={"/applications/" + application.id + "/edit"} className="btn btn-outline-primary me-3">
                        <PencilFill/> Application
                    </Link>
                    <Button color="danger" outline={true} onClick={() => showActionModal(
                        "Delete Application",
                        "Are you sure you want to remove your application?",
                        "No no!",
                        "Yes, Im sure!",
                        application.id,
                        handleDeleteApplication)}>
                        <Trash3Fill/>
                    </Button>
                </div>
            </div>}
            {showApplyButton && <Link to={"/jobs/" + id + "/apply"} className="btn btn-primary">
                <SendFill/> Apply
            </Link>}
        </div>
    );
}