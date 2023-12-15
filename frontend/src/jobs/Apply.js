import ApplicationForm from "../applications/ApplicationForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getJob} from "./JobAPI";
import JobDetails from "./JobDetails";

export default function Apply() {
    const {id} = useParams();
    const [job, setJob] = useState(undefined);

    useEffect(() => {
        getJob(id).then(job => setJob(job));
    }, []);
    return (
        <div>
            {job && <JobDetails job={job} collapse={true}/>}
            <ApplicationForm jobId={id}/>
        </div>
    );
}