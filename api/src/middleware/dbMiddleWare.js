const db = require("../config/db")

const attachDbConnection = async (req, res, next) => {
    try {
        const connection = await db.getConnection();
        req.db = connection;
        next();
    } catch (error) {
        console.error("Error establishing database connection: ", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = attachDbConnection