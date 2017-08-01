var mongoose = require("mongoose"),
    Campground = require("./models/parks"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Mount Rainier",
        image: "https://farm7.staticflickr.com/6046/6331265673_873a932f55.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Mount Si",
        image: "https://farm8.staticflickr.com/7015/6555411599_dff17ca3d2.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Lake Serene",
        image: "https://farm4.staticflickr.com/3278/2546747308_4f4576bbe2.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Steel Lake",
        image: "https://farm7.staticflickr.com/6101/6332080610_63c8bb37b3.jpg",
        description: "Blah blah blah"
    }
]

function seedDB () {
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("removed parks!")
        
        data.forEach(function(seed){
        Campground.create(seed, function(err, park){
            if (err) {
                console.log("there was an error")
            } else {
                console.log("success")
                Comment.create(
                    {
                        text: "This place is great!",
                        author: "Homer"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("added a comment")
                            park.comments.push(comment)
                            park.save()
                        }
                    }
                )
            }
        })
    })
    });

}

module.exports = seedDB;