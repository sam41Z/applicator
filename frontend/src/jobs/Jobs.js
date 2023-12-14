import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ApplicationStatus from "../applications/ApplicationStatus";

export default function Jobs() {
    const url = "http://localhost:3000/jobs";
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([])
    const navigate = useNavigate();

    const fetchJobs = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setJobs(d))
    }

    useEffect(() => {
        fetchJobs()
    }, [])
    const listItems = jobs
        .map(job => {
            const application = applications.find(application => application.job === job.id)
             return (
                <tr key={job.id}>
                    <td onClick={() => navigate("jobs/" + job.id)}>{job.employer.name}</td>
                    <td onClick={() => navigate("jobs/" + job.id)}> {job.position}</td>
                    <td><ApplicationStatus jobId={job.id} /></td>
                </tr>
            )
        });
    return (
        <div>
            <Link to={"jobs/add"} className="btn btn-primary">Add Job</Link>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Employer</th>
                    <th scope="col">Position</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>{listItems}</tbody>
            </table>
        </div>
    )
}