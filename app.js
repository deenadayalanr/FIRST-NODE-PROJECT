const express=require('express');
const bodyparser=require('body-parser');
const db=require('./model/databse');
const nodemailer=require('nodemailer');
const path=require('path');

const app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/gettingrequest',(req,res,next) => {
    res.json("Getting the data from browser");
});



app.post('/post_data',async(req,res,next) => {
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const mobile_number=req.body.number;
    console.log(name);
    await db.execute('insert into registeration (name,email,password,number) values(?,?,?,?)',[name,email,password,mobile_number]);
    
    let transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'nodeproject712@gmail.com',
            pass:'Nodeproject@1'
        }
    });
    

    let mail={
        from:"nodeproject712@gmail.com",
        to:`${email}`,
        subject:'#Regarding Internship Registeration',
        html:'<h2>You have been successfully registered for our internship series</h2>'
    };

    transport.sendMail(mail,(error,info) => {
        if(error)
        {
            console.log(error);
        }
        else{
            console.log(info.response);
        }
    });

    
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

app.get('/file',(req,res,next) => {
    console.log(path.join(__dirname));
    res.sendFile(path.join(__dirname,"app.js"));
})



app.listen(9000);
