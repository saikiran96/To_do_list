const express = require('express');
const body_parser = require('body-parser');
const http = require ("http")
const mongoose = require("mongoose");
const today = require(__dirname+"/date.js");

console.log(today.getdate());


mongoose.connect("mongodb://localhost:27017/TasksDB",{ useUnifiedTopology: true ,useNewUrlParser: true });

const app = express();
app.use (body_parser.urlencoded({extended :true}));
app.use(express.static("public"))
app.set ("view engine","ejs");


const ListSchema = new mongoose.Schema(
{
  name : {
    type: String,
    required :[true,"Should add a task"]
  }
});

const Task = mongoose.model("Task",ListSchema);

const sleeping = new Task(
  {
    name : "sleeping"
  }
)

const Clothes = new Task(
  {
    name : "Clothes"
  }
)


//
// Task.insertMany(myCollections,function (err) {
//   if(err){console.log(err);}
//   else{console.log("Succesfully inserted into DB");}
// });



app.get("/",function (request,response) {

  let day = new Date();
  let options = {
     weekday: 'long',
     year: 'numeric', month: 'long', day: 'numeric'
  }



let verify = day.toLocaleDateString('en-us', options);

Task.find({},function(err,results){
  if(err){console.log(err);}
  else{
    response.render ("list",{day:verify,items:results})
  }
});


});

app.post ("/checkbox",function (req,res) {

  let check_box = req.body.check_box;

  Task.findOneAndDelete({_id : check_box}, function (err) {
    if(!err){
     res.redirect("/");
    }
    else {
      console.log(err);
    }
  }) ;

})

app.post("/",function(req,res){
  let new_do_list = req.body.new_do_value;


  new_do_list = new_do_list[0].toUpperCase()+new_do_list.slice(1).toLowerCase();

   const new_item = new Task({
     name : new_do_list
   });

   new_item.save();
  res.redirect("/");
});



app.listen(3000,function (req,res) {
  console.log();
})
