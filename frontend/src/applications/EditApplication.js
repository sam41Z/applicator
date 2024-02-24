import JobForm from "../jobs/JobForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ApplicationForm from "./ApplicationForm";
import JobDetails from "../jobs/JobDetails";
import {getApplication} from "./ApplicationAPI";
import {getJob} from "../jobs/JobAPI";

export default function EditApplication() {
    const {id} = useParams();
    const [application, setApplication] = useState(undefined);
    const [job, setJob] = useState(undefined);

    useEffect(() => {
        getApplication(id)
            .then(d => {
                setApplication(d);
                return d;
            })
            .then(d => getJob(d.job))
            .then(d => setJob(d));
    }, []);

    return (
        <div>
            {job && <JobDetails job={job} collapse={true}/>}
            {application && <ApplicationForm jobId={application.job} application={application}/>}
        </div>);
}