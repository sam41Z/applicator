import "./App.css";
import Jobs from "./jobs/Jobs";
import ContentCard from "./ContentCard";
import {Route, BrowserRouter, Routes, Link} from "react-router-dom";
import JobOverview from "./JobOverview";
import ApplicationForm from "./applications/./ApplicationForm";
import AddJob from "./jobs/AddJob";
import EditJob from "./jobs/EditJob";
import Apply from "./jobs/Apply";
import EditApplication from "./applications/EditApplication";
import ActionModal from "./modals/ActionModal";
import {InfoModalContext} from "./modals/InfoModalContext";
import InfoModal from "./modals/InfoModal";
import {BriefcaseFill, PlusLg} from "react-bootstrap-icons";
import React from "react";

function App() {

    return (
        <div className="App">
            <InfoModal>
                <ActionModal>

                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <ContentCard title="Jobs">
                                    <Jobs/>
                                </ContentCard>
                            }/>
                            <Route path="/jobs/:id" element={
                                <ContentCard title="Job Overview">
                                    <JobOverview/>
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
                </ActionModal>
            </InfoModal>
        </div>
    );
}

export default App;
