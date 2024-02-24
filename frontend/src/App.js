import "./App.css";
import Jobs from "./jobs/Jobs";
import ContentCard from "./ContentCard";
import {Route, BrowserRouter, Routes, Link} from "react-router-dom";
import JobDetails from "./jobs/JobDetails";
import ApplicationForm from "./applications/./ApplicationForm";
import AddJob from "./jobs/AddJob";
import EditJob from "./jobs/EditJob";
import Apply from "./jobs/Apply";
import EditApplication from "./applications/EditApplication";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ContentCard title="Jobs">
                            <Jobs/>
                        </ContentCard>
                    }/>
                    <Route path="/jobs/:id" element={
                        <ContentCard title="Job Details">
                            <JobDetails/>
                        </ContentCard>
                    }/>
                    <Route path="/jobs/add" element={
                        <ContentCard title="Add Job">
                            <AddJob/>
                        </ContentCard>
                    }/>
                    <Route path="/jobs/:id/edit" element={
                        <ContentCard title="Edit Job">
                            <EditJob/>
                        </ContentCard>
                    }/>
                    <Route path="/jobs/:id/apply" element={
                        <ContentCard title="Apply">
                            <Apply/>
                        </ContentCard>
                    }/>
                    <Route path="/applications/:id/edit" element={
                        <ContentCard title="Apply">
                            <EditApplication/>
                        </ContentCard>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
