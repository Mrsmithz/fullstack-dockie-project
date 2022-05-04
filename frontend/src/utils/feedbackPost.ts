export const checkComment = (comment: string) => {
    if (comment === "") {
        return "Please fill input";
    }
    else if (comment === " ") {
        return "Please fill input";
    }
    else {
        return "";
    }
}

