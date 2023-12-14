import ApplicationForm from "../applications/ApplicationForm";
import {useParams} from "react-router-dom";

export default function Apply() {
    const {id} = useParams();
    return (
        <ApplicationForm jobId={id}/>
    );
}