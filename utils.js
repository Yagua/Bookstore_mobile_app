export const trimText = (title, lenght) => {
    if(title.length > lenght) {
        let newTitle = title.substring(0, lenght);
        return `${newTitle}...`;
    }
    return title;
}

