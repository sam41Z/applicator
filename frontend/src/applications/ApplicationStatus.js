import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {EnvelopeFill, EnvelopePlusFill, Pencil, PencilFill, SendFill, SendXFill} from "react-bootstrap-icons";

export default function ApplicationStatus({jobId}) {
    const url = "http://localhost:3000/applications?jobId=" + jobId;
    const states = ["DRAFT", "APPLIED", "INTERVIEWING", "OFFERED", "REJECTED", "DECLINED", "ACCEPTED"];
    const [application, setApplication] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const fetchApplication = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                if (d.length > 0) {
                    setApplication(d[0]);
                }
                setIsLoading(false);
            });
    };

    const saveApplication = (newApplication) => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newApplication)
        };
        fetch("http://localhost:3000/applications/" + application.id, requestOptions)
            .then((res) => res.json())
            .then((d) => setApplication(d));
    };

    useEffect(() => {
        fetchApplication();
    }, []);
    const bagdeColor = (status) => {
        switch (status) {
            case "ACCEPTED":
                return "text-bg-success";
            case "DECLINED":
            case "REJECTED":
                return "text-bg-danger";
            default:
                return "text-bg-warning";
        }
    };

    const options = states.map(status => {
        return <option key={status} value={status}>{status}</option>;
    });

    const onStatusChange = (newStatus) => {
        const newApplication = {...application};
        newApplication.status = newStatus;
        setApplication(newApplication);
        saveApplication(newApplication);
    };
    if (isLoading) {
        return (<div></div>);
    } else if (application) {
        return (
            <div className="col-6">
                <select
                    className={"form-select " + bagdeColor(application.status)}
                    value={application.status}
                    onChange={e => onStatusChange(e.target.value)}
                >
                    {options}
                </select>
            </div>
        );
    } else {
        return (
            <Link to={"/jobs/" + jobId + "/apply"} className="btn btn-primary col-6"><SendFill/> Apply</Link>
        );
    }
}