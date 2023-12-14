import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {CheckLg, XLg} from "react-bootstrap-icons";
import React, {useState} from "react";
import {ActionModalContext} from "./ActionModalContext";

export default function ActionModal({children}) {
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("Header");
    const [body, setBody] = useState("Some body");
    const [cancelText, setCancelText] = useState("Cancel");
    const [confirmText, setConfirmText] = useState("Confirm");
    const [confirmData, setConfirmData] = useState("");
    const [confirmAction, setConfirmAction] = useState(() => (data) => {
    });

    const showModal = (header, body, cancelText, confirmText, confirmData, confirmAction) => {
        setHeader(header);
        setBody(body);
        setCancelText(cancelText);
        setConfirmText(confirmText);
        setConfirmData(confirmData);
        setConfirmAction((data) => confirmAction)
        setShow(true);
    };

    const showToggle = () => {
        setShow(!show);
    };
    const onConfirm = (data) => {
        confirmAction(data);
        setShow(false)
    };


    return (
        <div>
            <Modal isOpen={show} toggle={showToggle}>
                <ModalHeader>{header}</ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => onConfirm(confirmData)}>
                        <CheckLg/> {confirmText}
                    </Button>
                    <Button color="secondary" onClick={showToggle}>
                        <XLg/> {cancelText}
                    </Button>
                </ModalFooter>
            </Modal>
            <ActionModalContext.Provider value={showModal}>
                {children}
            </ActionModalContext.Provider>
        </div>
    );
}