import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ApplicationStatus from "../applications/ApplicationStatus";
import {BriefcaseFill, PlusLg, Trash3Fill} from "react-bootstrap-icons";

export default function Jobs() {
    const url = "http://localhost:3000/jobs";
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    const fetchJobs = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setJobs(d));
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const listItems = jobs
        .map(job => {
            return (
                <tr key={job.id}>
                    <td onClick={() => navigate("jobs/" + job.id)}>{job.employer.name}</td>
                    <td onClick={() => navigate("jobs/" + job.id)}> {job.position}</td>
                    <td><ApplicationStatus jobId={job.id}/></td>
                </tr>
            );
        });

    return (
        <div>
            <Link to={"jobs/add"} className="btn btn-primary mb-3"><PlusLg/> <BriefcaseFill/></Link>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col" className="col-4">Employer</th>
                    <th scope="col" className="col-6">Position</th>
                    <th scope="col" className="col-2">Status</th>
                </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </table>
        </div>
    );
}