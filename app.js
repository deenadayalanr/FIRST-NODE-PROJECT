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

app.patch('/patch_data',async(req,res,next) => {
    const update_name=req.body.name;
    const email=req.body.email;
    const [data] =await db.execute('select email from registeration where email=?',[email]);
    if(data.length===1)
    {
        await db.execute('update registeration set name=? where email=?',[update_name,email]);
        return res.json({status:"ok"});
    }
    return res.json("User with email does not exist");
})

app.delete('/delete_data',async(req,res,next) => {
    const email=req.body.email;
    const [check]=await db.execute('select email from registeration where email=?',[email]);
    if(check.length===1)
    {
        await db.execute('delete from registeration where email=?',[email]);
        return res.json({status:"ok"});
    }
    return res.json("User cannot be deleted");
});



app.listen(9000);
