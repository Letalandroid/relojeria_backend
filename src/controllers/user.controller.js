import path from "path";

export const getHome = (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
}