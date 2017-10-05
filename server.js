/**
 * Created by Brandon.Agbalog on 10/4/2017.
 */
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine", "hbs");


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log+"\n", (err) => {
        if(err) {
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// app.use((req, res, next)=> {
//     res.render("maintenance.hbs");
// });

hbs.registerHelper("currentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});
app.use(express.static(__dirname+"/public"));
app.get("/", (req, res) => {
    // res.send("<h1>Hello Express!</h1>");
    res.render("home.hbs", {
        welcomeMessage: "Welcome you",
        pageTitle: "Home Page"
    })
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.get("/projects", (req,res) => {
    res.render("projects.hbs", {
        pageTitle: "Projects Page"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Error handling this request"
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
