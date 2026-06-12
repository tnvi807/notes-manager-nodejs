const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const noteModel = require('./models/task')

app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use(express.static(path.join(__dirname ,"public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    fs.readdir(`./files`,(err,files )=>{
    res.render("index", {files:files});
    });  

});

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details , (err) => {
        res.redirect("/");
    });
    });

app.get('/files/:filename', async (req, res) => {   

    let readUser = await noteModel.find();
        
        fs.readFile(`./files/${req.params.filename}`, "utf-8" ,(err,filedata)=>{
        
            res.render("Show", {
                    filename:req.params.filename,
                    filedata:filedata,
                    readUser
                   });
        })
    }); 

app.post("/delete", (req, res) => {
    fs.unlink(`./files/${req.body.filename}`, (err) => {
        res.redirect("/");
    });
    });
    
    


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});     

