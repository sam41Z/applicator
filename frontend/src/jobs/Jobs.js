import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ApplicationStatus from "../applications/ApplicationStatus";
import {Trash3Fill} from "react-bootstrap-icons";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function Jobs() {
    const url = "http://localhost:3000/jobs";
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [deleteJob, setDeleteJob] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchJobs = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setJobs(d));
    };

    const fetchDeleteJob = (jobId) => {
        const requestOptions = {
            method: "DELETE",
        };
        fetch("http://localhost:3000/jobs/" + jobId, requestOptions)
            .then(fetchJobs)
            .catch(error => alert(error));
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const closeDeleteModal = () => setShowDeleteModal(false);
    const handleDeleteDelete = (e) => {
        let id = e.target.value;
        closeDeleteModal();
        fetchDeleteJob(id);
    };
    const openDeleteModal = (e) => {
        let id = e.target.value;
        let job = jobs.find(job => job.id === id);
        setDeleteJob(job);
        setShowDeleteModal(true);
    };

    const listItems = jobs
        .map(job => {
            const application = applications.find(application => application.job === job.id);
            return (
                <tr key={job.id}>
                    <td onClick={() => navigate("jobs/" + job.id)}>{job.employer.name}</td>
                    <td onClick={() => navigate("jobs/" + job.id)}> {job.position}</td>
                    <td><ApplicationStatus jobId={job.id}/></td>
                    <td>
                        <button className="btn btn-danger" value={job.id} onClick={openDeleteModal}>
                            <Trash3Fill/>
                        </button>
                    </td>
                </tr>
            );
        });

    const modal = () => {
        if (deleteJob) {
            return (
                <Modal isOpen={showDeleteModal} toggle={closeDeleteModal}>
                    <ModalHeader>Delete Job</ModalHeader>
                    <ModalBody>
                        Are you sure you want to remove {deleteJob.position} at {deleteJob.employer.name}?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" value={deleteJob.id} onClick={handleDeleteDelete}>

                            Yes, Im sure!
                        </Button>{" "}
                        <Button color="secondary" onClick={closeDeleteModal}>
                            No no...
                        </Button>
                    </ModalFooter>
                </Modal>);
        } else {
            return "";
        }
    };

    return (
        <div>
            {modal()}
            <Link to={"jobs/add"} className="btn btn-primary">Add Job</Link>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col" className="col-4">Employer</th>
                    <th scope="col" className="col-5">Position</th>
                    <th scope="col" className="col-sm-3">Status</th>
                    <th scope="col" className="col-sm-1"></th>
                </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </table>
        </div>
    );
}