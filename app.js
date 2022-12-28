// 0226af3c00fb855f85a8acabb9fcc7db-us17
// 8db7895aa1. list
const express = require("express");
const bodyparser = require("body-parser");
const request   = require("request");
const https =require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  console.log("accepted");
 res.sendFile(__dirname +"/signup.html")
})

app.post("/",function(req,res){
  var fName=req.body.fname;
  var lName=req.body.lname;
  var email=req.body.email;

  var data = {
    member : [
      {
        email_adress : email,
        status : "subscribed",
        merge_fields:{
          FNAME:fName,
          LNAME:lName
        }
      }
    ]
  };

   const jsonData=JSON.stringify(data);

   const url="https://us17.api.mailchimp.com/3.0/lists/8db7895aa1"

   const options = {
    method : "POST",
    auth : "niraj1:0226af3c00fb855f85a8acabb9fcc7db-us17"
   }

   const request = https.request(url,options,function(response){
 
    if(response.statusCode===200){
      // res.send("yes");
        res.sendFile(__dirname + "/sucess.html")
    }
    else{
      // res.send("yes");
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
   })
   request.write(jsonData);
   request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("running on port 3000");
})