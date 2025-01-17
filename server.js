const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config({path:'.env'})
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/assets", express.static(path.resolve(__dirname, "assets")));

app.get("/contactus.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "contactus.html"));
});

app.get("/js/scripts.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "js/scripts.js"));
});

app.get("/js/pleasewait.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "js/pleasewait.js"));
});

app.get("/js/jquery.pleasewait.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "js/jquery.pleasewait.js"));
});

app.get("/register.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "register.html"));
});

app.get("/css/styles.css", (req, res) => {
    res.sendFile(path.resolve(__dirname, "css/styles.css"));
});

app.get("/css/style.css", (req, res) => {
    res.sendFile(path.resolve(__dirname, "css/style.css"));
});
app.get("/css/pleasewait.css", (req, res) => {
    res.sendFile(path.resolve(__dirname, "css/pleasewait.css"));
});

app.get("/project-partnership.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "project-partnership.html"));
});

app.get("/co-Ownership.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "co-Ownership.html"));
});

app.get("/Joint-Venture.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Joint-Venture.html"));
});

app.get("/data/regddc.json", (req, res) => {
    res.sendFile(path.resolve(__dirname, "data/regddc.json"));
});

app.get("/services.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "service.html"));
});

app.get("/tp.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "tp.html"));
});


app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.post('/sendmail', async (req, res) =>{
    console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'segxy2708@hotmail.com',
          pass: 'se0103?2015gun'
        }
      });

      var messageBody = '<p><b>Name: </b>' + req.body.firstname + ' ' + req.body.othername  + ' ' + req.body.lastname + '<br />' +
      '<b>Email: </b>' + req.body.email + '<br />' +
      '<b>Do you have a personal computer: </b>' + req.body.pc + '<br />' +
      '<b>Message: </b>' + req.body.message + '</p>'
      
      var mailOptions = {
        from: 'segxy2708@hotmail.com',
        to: 'rotimi.akintola10@gmail.com',
        //to: 'segun@impartlab.com',
        subject: 'Immersion Registration: ' ,
        //text: JSON.stringify(req.body)
        html: messageBody
      };
      try{

      var response = [];
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).end(JSON.stringify(error));
        } else {
          console.log('Email sent: ' + info.response);
          const jsonContent = JSON.stringify('request successful');
          res.status(200).end(jsonContent);
        }
      });
    
    
      }catch{
        
      }
})

app.listen(process.env.PORT || 8000, () => console.log("Server is up and running..." + process.env.PORT));