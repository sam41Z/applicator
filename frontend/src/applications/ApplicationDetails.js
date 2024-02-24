import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {PencilFill, SendFill, Trash3Fill} from "react-bootstrap-icons";
import {ActionModalContext} from "../modals/ActionModalContext";
import {InfoModalContext} from "../modals/InfoModalContext";
import {deleteApplication, getApplicationByJobId} from "./ApplicationAPI";

export default function ApplicationDetails({application}) {
        return (
            <div>
                <div className="card mb-3">
                    <div className="card-header" style={{display: "flex", alignItems: "center"}}>
                        <div style={{flexGrow: "1"}}>
                            <small>Cover Letter</small>
                        </div>
                    </div>
                    <div className="card-body" style={{whiteSpace: "pre-line"}}>
                        {application.cover_letter}
                    </div>
                </div>
            </div>
        );
}