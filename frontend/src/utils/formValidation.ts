export const getTitleValidateAlertMessage = (title: string) => {
    if (title.length < 4) {
        return "Your title is too short!!";
    }
    else if (title.length > 40) {
        return "Your title is too long!!";
    }
    else {
        return "";
    }
}

export const validateTitle = (title: string) => {
    if (title.length < 4) {
        return false;
    }
    else if (title.length > 40) {
        return false;
    }
    else {
        return true;
    }
}

export const getTagValidateAlertMessage = (tagName: string) => {
    if (tagName.length < 2){
        return "Your tag name is too short!!";
    }
    else if (tagName.length > 15) {
        return "Your tag name is too long!!";
    }
    else {
        return "";
    }
}

export const validateTag = (tagName: string) => {
    if (tagName.length < 2){
        return false;
    }
    else if (tagName.length > 15) {
        return false;
    }
    else {
        return true;
    }
}

export const checkImageFile = (type: string) => {
    if (type === "image/png") {
        return true;
    }
    else if (type === "image/jpeg") {
        return true;
    }
    else {
        return false;
    }
}

export const checkIsPDFFile = (type: string) => {
    if (type === "application/pdf") {
        return true;
    }
    else {
        return false;
    }
}

export const checkIsSingleFile = (length: number) => {
    if (length === 1) {
        return true;
    }
    else {
        return false;
    }
}