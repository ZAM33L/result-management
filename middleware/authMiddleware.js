const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ message: "Access Denied", success: false });
    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.body.facultyID = decoded.facultyID;
        next();
    } catch (error) {
        return res.status(500).send({ message: "Access Denied, Invalid Token", success: false });
    }
}