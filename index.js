const express = require("express");
const app = express();
app.use(express.json());
const authRoute = require("./routes/authRoute");
app.use("/auth",authRoute);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
