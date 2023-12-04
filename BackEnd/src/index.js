const dotenv = require("dotenv").config();
const { swaggerDocs } = require("./swagger");

const app = require("./app");
require("./database");

var port = process.env.PORT;
app.set("port", port);

app.listen(app.get("port"), () => {
  console.log(`[Running] - PORT: ${app.get("port")}`);
  console.log("[Link]    " + "http://localhost:4000");
  swaggerDocs(app, port);
});
