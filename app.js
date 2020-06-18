//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); //or could be said as lower dash!

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = []; //here we have selected an empty array that will take the input from the user and it will store the values that they have given and then show it whereever we want to get that!

app.get("/", function(req,res){
  res.render("home", {
    homeStartingContent, //the first para that we see in out home page is due to this!
    posts: posts }); //this will push the posts array into the posts function inside the home.ejs file!
    //here the first posts is the array

});

app.get("/about", function(req,res){
  res.render("about", { aboutContent });
});

app.get("/contact", function(req,res){
  res.render("contact", { contactContent });
});

app.get("/compose", function(req,res){
  res.render("compose");
});


app.post("/compose", function(req, res){
  const post = {
    title: req.body.posttitle,
    content: req.body.postbody //it is basically a javascript code that will give the value at the place where we wnat to store these values to!
  };

  posts.push(post); //it will push the data in the post present above to the posts array!
  res.redirect("/"); //it will help us to redirect whatever is happening at the above to the route we have selected inside here i.e. homeroute!
  //it will take us to homeroute!
});


//it is used when we want to get the input from any form to be displayed on our console.log and req.body.inputtaken is the parameter that we use here


app.get("/posts/:postname", function(req, res){ //it will work like localhost:3000/posts/anything we want so that hyper will type anything at the terminal.
  const requestedtitle = _.lowerCase(req.params.postname); //this is taken from the express. and this _.lowe.. is taken from lodash.com that help us to not distinguish between the upper case and the lower case. only when a blog is already present on our homepage.

  posts.forEach(function(post){ //it will run a for loop for post to put the values inside the posts array
    const storedtitle = post.title;

    if(storedtitle === requestedtitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      }); //used to print in hyper whether a match is found or not to us!
    }

  });
});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
