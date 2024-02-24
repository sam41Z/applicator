import {Link} from "react-router-dom";
import {HouseDoor, HouseDoorFill} from "react-bootstrap-icons";

export default function ContentCard({children, title}) {
    return (
        <div className="mb-3">
            <Link to="/" className="btn btn-outline-primary mb-3"><HouseDoorFill/></Link>
            <div className="card" style={{width: "1200px"}}>
                <div className="card-header">{title}</div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
};