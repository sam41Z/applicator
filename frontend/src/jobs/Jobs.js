import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ApplicationStatus from "../applications/ApplicationStatus";
import {BriefcaseFill, PlusLg, Trash3Fill} from "react-bootstrap-icons";
import {Table} from "reactstrap";

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
            <Table hover>
                <thead>
                <tr>
                    <th className="w-40">Employer</th>
                    <th className="w-50">Position</th>
                    <th className="w-10">Status</th>
                </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </Table>
        </div>
    );
}