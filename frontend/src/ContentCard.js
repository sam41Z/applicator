import {Link} from "react-router-dom";

export default function ContentCard({children, title}) {
    return (
        <div className="mb-3">
            <Link to="/" className="btn btn-outline-primary mb-3">Home</Link>
            <div className="card" style={{width: "1200px"}}>
                <div className="card-header">{title}</div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
};