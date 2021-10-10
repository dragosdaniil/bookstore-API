require('dotenv').config({path:'../.env'});
const authentication = (req,res,next)=>{
    const auth = req.headers.authorization;
    console.log(req.headers.authorization)
    if (!auth) {
        const err = new Error('You are not authenticated!');
        return res.status(401).json({error:err.message})
    }

    const authParams = Buffer.from(auth, 'base64').toString().split(':');
    console.log( Buffer.from(auth, 'base64').toString())
    const user = authParams[0];
    const pass = authParams[1];

    if(user === process.env.API_USER && pass === process.env.API_PASS){
        next()
    } else {
        const err = new Error('Invalid credentials!');
        return res.status(401).json({error:err.message})
    }
}

module.exports = authentication;