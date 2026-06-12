const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const noteModel = require('./models/task');
const { title } = require('process');

app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use(express.static(path.join(__dirname ,"public")));
app.set("view engine", "ejs");

app.get("/", async(req, res) => {
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
    // find the note by title (assuming title matches filename param)
    let title = await noteModel.findOne({title: req.params.title});
    res.render("Show", {title});
        
    }); 

app.post("/delete/:id", async (req, res) => {
    await noteModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/");
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});     

