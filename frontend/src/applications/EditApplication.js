import JobForm from "../jobs/JobForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ApplicationForm from "./ApplicationForm";

export default function EditApplication() {
    const {id} = useParams();
    const url = "http://localhost:3000/applications/" + id;
    const [application, setApplication] = useState(undefined);
    const fetchApplication = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setApplication(d));
    };
    useEffect(() => {
        fetchApplication();
    }, []);
    if (application) {
        return (
            <ApplicationForm jobId={application.job} application={application}/>
        );
    } else {
        return (<div></div>);
    }
}