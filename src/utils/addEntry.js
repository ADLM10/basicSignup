
export default function addEntry(entry) {
    const localData = JSON.parse(localStorage.getItem("users"));
    localData.push(entry);
    localStorage.setItem("users", JSON.stringify(localData));
    return JSON.parse(localStorage.getItem("users"));
}