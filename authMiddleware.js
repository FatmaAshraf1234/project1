const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    //  ناخد التوكن من الهيدر
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    //  نشيل كلمة Bearer
    const token = authHeader.split(" ")[1];
    try {
        //  نفك التوكن
        const decoded = jwt.verify(token, "MY_SECRET_KEY");
        //  نخزن بيانات المستخدم في req
        req.user = decoded;
        //  نكمّل على الروت
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
