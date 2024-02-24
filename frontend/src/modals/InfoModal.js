import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {CheckLg, XLg} from "react-bootstrap-icons";
import React, {useState} from "react";
import {ActionModalContext} from "./ActionModalContext";
import {InfoModalContext} from "./InfoModalContext";

export default function InfoModal({children}) {
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("Header");
    const [body, setBody] = useState("Some body");
    const [buttonText, setButtonText] = useState("OK")

    const showModal = (header, body, buttonText) => {
        setHeader(header);
        setBody(body);
        setButtonText(buttonText)
        setShow(true);
    };

    const showToggle = () => {
        setShow(!show);
    };

    return (
        <div>
            <Modal isOpen={show} toggle={showToggle}>
                <ModalHeader>{header}</ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={showToggle}>
                        <CheckLg/> {buttonText}
                    </Button>
                </ModalFooter>
            </Modal>
            <InfoModalContext.Provider value={showModal}>
                {children}
            </InfoModalContext.Provider>
        </div>
    );
}