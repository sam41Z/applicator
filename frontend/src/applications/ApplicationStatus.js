import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {EnvelopeFill, EnvelopePlusFill, Pencil, PencilFill, SendFill, SendXFill} from "react-bootstrap-icons";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {getApplicationByJobId, putApplication} from "./ApplicationAPI";
import {states, statusColor, statusIcon, statusText} from "./ApplicationStatusUtils";

export default function ApplicationStatus({jobId}) {
    const [application, setApplication] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        getApplicationByJobId(jobId)
            .then((d) => {
                if (d.length > 0) {
                    setApplication(d[0]);
                }
                setIsLoading(false);
            });
    }, []);

    const handleStatusChange = (newStatus) => {
        const newApplication = {...application};
        newApplication.status = newStatus;
        putApplication(newApplication)
            .then((d) => setApplication(d));
    };

    const dropDownItems = states.map(status => {
        return (
            <DropdownItem className={"text-" + statusColor(status)}
                          onClick={() => handleStatusChange(status)}>
                {statusIcon(status)} {statusText(status)}
            </DropdownItem>
        );
    });

    return (
        <div>
            {!isLoading && application &&
                <Dropdown isOpen={isDropdownOpen} toggle={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <DropdownToggle color={statusColor(application.status)} className="d-flex w-75">
                        <div>{statusIcon(application.status)}</div>
                        <div className="flex-fill text-start ms-3">{statusText(application.status)}</div>
                    </DropdownToggle>
                    <DropdownMenu>
                        {dropDownItems}
                    </DropdownMenu>
                </Dropdown>}

            {!isLoading && !application &&
                <Link to={"/jobs/" + jobId + "/apply"} className="btn btn-primary d-flex w-75">
                    <div><SendFill/></div>
                    <div className="flex-fill text-start ms-3">Apply</div>
                </Link>}
        </div>
    );
}