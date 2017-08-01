var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Park = require("./models/parks"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

    seedDB();
mongoose.connect("mongodb://localhost/yelp_parks", {useMongoClient: true})
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")


app.get("/", function(req, res){
    res.render("landing")
});

app.get("/parks", function(req, res){
    Park.find({}, function(err, allParks){
        if(err) {
            console.log(err)
        } else {
            res.render("parks", {parks:allParks})
        }
    })
});

app.get("/parks/new", function(req, res){
    res.render("new");
})

app.get("/parks/:id", function(req, res){
    Park.findById(req.params.id).populate("comments").exec(function(err, foundPark){
        if (err) {
            res.redirect("/parks")
        } else {
            res.render("show", {park:foundPark})
        }
    })
})

app.post("/parks", function(req, res){
    var newPark = req.body.park;
    Park.create(newPark, function(err, newlyCreated){
        if (err) {
            console.log(err)
        } else {
            res.redirect("/parks")
        }
    })
});

app.post("/parks/:id", function(req, res){
    Comment.create(req.body.comment, function(err, newComment){
        if (err) {
            res.redirect(req.originalUrl)
        } else {
            Park.findById(req.params.id, function(err, foundPark){
                foundPark.comments.push(newComment);
                foundPark.save();
                res.redirect("/parks/"+req.params.id)
            })
        }
    });

})

app.listen(3000, function(){
    console.log("Park Reviews has started!")
});