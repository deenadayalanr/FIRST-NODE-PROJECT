const express=require('express');
const bodyparser=require('body-parser');
const db=require('./model/databse');

const app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/gettingrequest',(req,res,next) => {
    res.json("Getting the data from browser");
});

app.post('/post_data',async(req,res,next) => {
    const name=req.body.name;
    const email=req.body.email;
    console.log(name);
    await db.execute('insert into registeration (name,email) values(?,?)',[name,email]);
    return res.json("ok");
});

app.listen(9000);