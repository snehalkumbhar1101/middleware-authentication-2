const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) =>{
    res.json({
        message:"Welcome to the API"
    });
});
// middleware function call verifyToken
app.post('/api/posts',verifyToken,(req,res) =>{
    jwt.verify(req.token, 'secretkey' ,(err, authData) => {   // 11th step- req.token
            if(err) {
                res.sendStatus(403);
            } else {
                res.json({
                    message:"Posts is Created...",
                    
                    // also send authData 
                    authData
                });
            }
        });
    });
    

app.post('/api/login',(req,res) =>{
    // Mock User

    const user = {
        id : 1,
        username : 'snehal',
        email : 'snehal@gmail.com'
    }

    jwt.sign({user}, 'secretkey',(err, token) => {      // 1st step- we can call jwt sign() and next parameter is secretkey
        res.json({
            token                                       //2nd step- Send token
        });
    });
});


// FORMAT OF TOKEN
// Authorization: bearer <access_token>                 //5th step-



// verify Token (middleware function)
function verifyToken(req,res,next) {                    //3rd step- (create function) verifyToken-middleware function calll verifyToken 

    // Get auth header value
    const bearerHeader = req.headers['authorization'];  //4th step- bearerHeader --> is format of token


    // check if bearer is undefined
    if(typeof  bearerHeader !== "undefined")  {         //6th step- check condition
        
        // split at the space
        const bearer = bearerHeader.split(' ');         //8th step- 

        // Get token from array
        const bearerToken = bearer[1];                  //9th step- 

        // set the token    
        req.token = bearerToken;                        //10th step- 
        
        // nextmiddlewares
        next();                                         //8th step- 

    } else{
        // Forbidden
        res.sendStatus(403);                            //7th step-show Forbidden error 
    }
}


 
 
app.listen(5000, () => console.log("server started on port 5000") )