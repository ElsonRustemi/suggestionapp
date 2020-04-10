//jshint esversion: 6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("images"));

app.get("/", function (req, res) {
    res.render("index.ejs");
});

app.post("/results.ejs", function (req, res) {
    const genreValue = req.body.genre;

    const key = "";
    const genreUrl = "https://api.themoviedb.org/3/discover/movie?with_genres=" + genreValue + "&api_key=" + key + "&language=en-US";

    if (!genreValue) {
        res.send("<h3>No genres were specified.</h3>");
    } else {
        https.get(genreUrl, function (response) {

            response.on("data", function (data) {
                const movieData = JSON.parse(data);
                const results = movieData.results;

                res.render("results", { allResults: results });

            });

        });
    }

});

app.listen(3000, function () {
    console.log("Server is running at port 3000.");
});