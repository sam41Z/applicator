import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ApplicationStatus from "../applications/ApplicationStatus";
import {BriefcaseFill, PlusLg, Trash3Fill} from "react-bootstrap-icons";
import {ActionModalContext} from "../modals/ActionModalContext";
import {InfoModalContext} from "../modals/InfoModalContext";

export default function Jobs() {
    const url = "http://localhost:3000/jobs";
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const showActionModal = useContext(ActionModalContext);
    const showInfoModal = useContext(InfoModalContext);

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
            .then(res => res.ok ? Promise.resolve() : Promise.reject(res.statusText))
            .then(fetchJobs)
            .catch(error => showInfoModal("Error", error, "OK"));
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const listItems = jobs
        .map(job => {
            const application = applications.find(application => application.job === job.id);
            return (
                <tr key={job.id}>
                    <td onClick={() => navigate("jobs/" + job.id)}>{job.employer.name}</td>
                    <td onClick={() => navigate("jobs/" + job.id)}> {job.position}</td>
                    <td><ApplicationStatus jobId={job.id}/></td>
                    <td>
                        <button className="btn btn-danger" onClick={() => showActionModal(
                            "Delete Job",
                            "Are you sure you want to remove \"" + job.position + "\" at \"" +
                            job.employer.name + "\"?",
                            "No no!",
                            "Yes, Im sure!",
                            job.id,
                            fetchDeleteJob)}>
                            <Trash3Fill/>
                        </button>
                    </td>
                </tr>
            );
        });

    return (
        <div>
            <Link to={"jobs/add"} className="btn btn-primary"><PlusLg/><BriefcaseFill/></Link>
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