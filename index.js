const express= require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

main()
.then(() => {
    console.log("connection successful");
})
.catch(err => {console.log(err)});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

//index route
app.get("/chats", async(req, res) => {
    let chats= await  chat.find();
  //  chats = chats.map (chat => {
       // chat.created_at = chat.created_at.toString();
       // return chat;
   // });
    console.log(chats);
    res.render("index.ejs", {chats});
});

//New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

let chat1= new chat ({
    from: "neha",
    to:"priya",
    msg: "send me your exam sheets",
    created_at:new Date()
});

chat1.save().then((res) => { //utc
    console.log(res);
});

app.get("/", (req, res) => {
    res.send("root is working");
});

app.listen(8080, ()=>{
console.log("server is listening on port 8080");
});