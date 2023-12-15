import {Link} from "react-router-dom";
import {BriefcaseFill, HouseDoor, HouseDoorFill, PlusLg} from "react-bootstrap-icons";
import React from "react";

export default function ContentCard({children, title}) {
    return (
        <div className="mb-3">
            <Link to="/" className="btn btn-primary col-1 mb-3 me-3"><HouseDoorFill/></Link>
            <div className="card" style={{width: "1200px"}}>
                <div className="card-header">{title}</div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
};