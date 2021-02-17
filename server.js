const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const secret = process.env.hashSecret || require("./localenv").hashSecret;
const databaseHandler = require("./databaseHandler.js");
const { response } = require("express");
const { getItem } = require("./databaseHandler.js");
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendfile("start.html", { root: __dirname + "/public" });
});

let login = false;
const auth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res
      .append(
        "WWW-Authenticate",
        'Basic realm="User Visible Realm", charset="UTF-8"'
      )
      .status(401)
      .end();
  }
  const credentials = req.headers.authorization.split(" ")[1];
  const [username, password] = Buffer.from(credentials, "base64")
    .toString("UTF-8")
    .split(":");

  let data = await databaseHandler.checkUser(username);
  console.log(data);

  const cryptPassword = crypto
    .createHmac("sha256", secret)
    .update(password)
    .digest("hex");

  if (data === cryptPassword) {
    login = true;
  } else {
    login = false;
  }
  next();
};

app.post("/user", async (req, res) => {
  let username = req.body.user;
  let password = req.body.password;

  const cryptPassword = crypto
    .createHmac("sha256", secret)
    .update(password)
    .digest("hex");

  console.log(username);
  console.log(cryptPassword);

  databaseHandler.insertUser(username, cryptPassword);
});

app.post("/item", async (req, res) => {
  let todo = req.body.todo;

  console.log(todo);

  databaseHandler.insertItem(todo);
});

app.get("/login", auth, async (req, res) => {
  if (login) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

app.get("/todoItem", async (req, res) => {
  try{
    let response = await databaseHandler.getItem();
    res.status(200).json(response).end();
    console.table(response.row);
  }catch(error){
    console.error(error)
  }
  
});

app.post("/delTodo", async (req, res)=>{
  
})


app.listen(PORT, () => {
  console.log("Running on port: " + PORT);
});
