
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");



const app = express();
const port = process.env.PORT || 3000;

// Define express configuration paths  
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views" );
const partialsPath = path.join(__dirname, "../templates/partials");



// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirPath));


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Modie"
    });
});

app.get("/about", (req,res) => {
    res.render("about", {
        title: "About me",
        name: "Modie"
    });
});

app.get("/help", (req, res) =>{
    res.render("help", {
        title: "Help page",
        status: "just trying to help",
        name: "Modie"
    });
});

app.get("/forecast", (req, res) =>{
    
    if(!req.query.address){
        return res.send({
            error: "An address must be provided."
        });
    }

    geocode.getGeoCode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error: error
            });
        }
        
        forecast.getForecast(latitude, longitude, (error, data) =>{
            if(error){
                return res.send({
                    error: error
                });
            }

            res.send({
                weatherInfo: data,
                location: location
            });
        });
        
    });
});



app.get("/help/*", (req, res) =>{
    res.render("404", {
        title: "404 Page",
        status: "404",
        name: "Modie",
        message: "Help article not found."
    })
});

app.get("*", (req, res) =>{
    res.render("404", {
        title: "404 Page",
        status: "404",
        name: "Modie",
        message: "Page not found."
    })
});


app.listen(port, () => {
    console.log("Litening on port 3000");
});