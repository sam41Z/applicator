import JobForm from "./JobForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function EditJob() {
    const {id} = useParams();
    const url = "http://localhost:3000/jobs/" + id;
    const [job, setJob] = useState(undefined);
    const fetchJob = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setJob(d));
    };
    useEffect(() => {
        fetchJob();
    }, []);
    if (job) {
        return (
            <JobForm job={job}/>
        );
    } else {
        return (<div></div>);
    }
}