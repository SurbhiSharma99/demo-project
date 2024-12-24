const express = require("express");
const routes = require("./routes/routes.js")
const middleware = require("./middlewares/validation.js")
const app = express();
const port=3000;

app.use(express.json());
app.use("/register" ,middleware.validatePostReqBody, routes.userRegister);
app.use("/login" ,middleware.validateQueryParam, routes.userLogin);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });