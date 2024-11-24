const express = require("express");
const engine = require("express-handlebars");

const app = express();

//handlebars as default engine setup
app.engine(
  "handlebars",
  engine.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", "./views");

const port = process.env.PORT || 3000;

//set the static folder middleware
app.use(express.static(__dirname + "/public"))

const fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
  ]

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render("about", {fortune: randomFortune});
});

app.get("/test", (req, res) => {
  res.type("text/plain");
  res.send("testing");
});

app.get("/u", (req, res) => {
  res.send("working");
})

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}` +
      ` press Ctrl - C to terminate.`
  )
);
