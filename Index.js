const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const noteModel = require('./models/task');


app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use(express.static(path.join(__dirname ,"public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    let title = await noteModel.find();
    res.render("index", {title});
    });  



app.post("/create", async (req, res) => {
    let craetedNote = await noteModel.create({
      title: req.body.title,
      details: req.body.details
    })
        res.redirect("/")
    });

app.get('/read/:title', async (req, res) => {   
    let newt = await noteModel.findOne({title: req.params.title});
    res.render("Show", {title : newt});
        
    }); 

app.get("/delete/:id", async (req, res) => {
   let title = await noteModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/");
    });

app.get("/edit/:id", async (req,res) =>{
    let title = await noteModel.findOne({_id: req.params.id })
    res.render("edit", {title})
});

app.post("/update/:id" , async (req,res) =>{
    console.log("UPDATE ROUTE HIT");
    let {title , details} = req.body;
    let titles = await noteModel.findOneAndUpdate({_id: req.params.id }, {title , details},{new:true})
    res.redirect(`/read/${titles.title}`);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});     

