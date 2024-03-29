const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let port = process.env.PORT || 3000;
let app = express();
hbs.registerPartials(__dirname+"/views/partials")
app.set('view engine','hbs')
app.use((req,res,next)=> {
    let now =   new Date().toString();
    let log = `now : ${now}  method : ${req.method}  url : ${ req.url} \n`
    console.log(log);
    fs.appendFile("server.log",log,(err)=> {
        if(err) console.log("unable to append  logs");
    })
    // console.log(Object.keys(req));
    next();
});
// app.use((req,res,next)=> {
//     res.render("mantainance.hbs")
// })
app.use(express.static(__dirname+"/public"))
hbs.registerHelper("getCurrentYear",()=> {
    return new Date().getFullYear(); // whatever yyou return from ththis functionn  will be availabel to  where ever you call  getCurrentDate
});
hbs.registerHelper("headingCapitalizer",(text)=> {
    return text.toUpperCase();
});
hbs.registerHelper('headingCapitalizer2',(text)=> {
    return text.toUpperCase();
})
app.get("/",(req,res)=> {
    // res.send(`<h1> hello express !!</h1> <p> this a express web </p>`)
    // res.send({name : "usman" , age : 44 , likes : ["batmn','superman','flash"]})
    res.render("home.hbs",{pageTitle : "home page" })
});
app.get("/about",(req,res)=> {
    // res.send(`<h1> this  is my about page</h1>`)
    res.render('about.hbs',{pageTitle : "about Page"}) // lets you render templates with hbs extension
})
app.get("/bad",(req,res)=> {
    res.send("something went wrong")
})
app.get('/project',(req,res)=> {
    res.render('project.hbs',{pageTitle : "projects"});
})
app.listen(port,()=> {
    console.log(`the server is up at port ${port}`);
})