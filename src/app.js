const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Defining paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewDirPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewDirPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

// Configuring routes
app.get("/help", (req,res) => {
    res.render("help", {
        title: "Help & Support",
        name: "Saad saiyed",
        helpText: "For help and support please don't try to contact us. We won't help you"
    })
})

app.get("/about", (req,res) => {
    res.render("about", {
        title: "About Me",
        name: "Saad saiyed"
    });
})

app.get("", (req,res) => {
    res.render("index", {
        title: "Weather Application",
        name: "Saad saiyed"
    })
})

app.get("/weather", (req,res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "Please provide an address!"
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (forecastError, weatherData) => {
            if(forecastError) {
                return res.send({forecastError});
            }

            res.send({
                forecast: weatherData,
                location,
                address,
            });
        })
    })
})

app.get("/help/*", (req,res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found!",
    })
})

app.get("*", (req,res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Saad saiyed"
    })
})

app.listen(port, () => {
    console.log("SERVER IS RUNNING ON PORT 3000")
});
