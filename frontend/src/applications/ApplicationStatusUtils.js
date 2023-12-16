import {
    ChatDotsFill,
    CheckLg,
    HeartFill,
    PencilFill,
    SendCheckFill, SignDoNotEnterFill,
    XLg
} from "react-bootstrap-icons";

export const states = [
    "DRAFT",
    "APPLIED",
    "INTERVIEWING",
    "OFFERED",
    "REJECTED",
    "DECLINED",
    "ACCEPTED"
];

const icons = {
    DRAFT: <PencilFill/>,
    APPLIED: <SendCheckFill/>,
    INTERVIEWING: <ChatDotsFill/>,
    OFFERED: <HeartFill/>,
    REJECTED: <SignDoNotEnterFill/>,
    DECLINED: <XLg/>,
    ACCEPTED: <CheckLg/>
};

const colors = {
    DRAFT: "info",
    APPLIED: "info",
    INTERVIEWING: "info",
    OFFERED: "success",
    REJECTED: "danger",
    DECLINED: "danger",
    ACCEPTED: "success"
};

export function statusColor(status) {
    return colors[status];
}

export function statusIcon(status) {
    return icons[status];
}

export function statusText(status) {
    return status[0] + status.toLowerCase().slice(1);
}