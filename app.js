//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const  mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL);

const itemSchema={
  name:String
}

const Item=mongoose.model("Item",itemSchema)

const item1=new Item({
  name:"welcome to Tosolist"
})
const item2=new Item({
  name:"Hit + button to add"
})
const item3=new Item({
  name:"Hit delete to delete"
})

const defaultItem=[item1,item2,item3]
// Item.insertMany(defaultItem).then(()=>console.log("success")).catch((err)=>console.log(err))


app.get("/", function(req, res) {

  Item.find({}).then((foundItem)=>{
    if(foundItem.length===0){
Item.insertMany(defaultItem).then(()=>console.log("success")).catch((err)=>console.log(err))
res.redirect("/")
    }else{
      res.render("list", {listTitle: day, newListItems: foundItem})
    }
  })
  
const day = date.getDate();


});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const itemName=new Item({
    name:item
  })
  itemName.save()
  res.redirect("/")
});

app.post("/delete",(req,res)=>{
  const box=req.body.worngBox;
  Item.findOneAndRemove(box).then(()=>console.log("worked")).catch((err)=>console.log(err))
  res.redirect("/")
})


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

const PORT=process.env.PORT

app.listen(PORT|| 3000, function() {
  console.log("Server started on port 3000");
});
