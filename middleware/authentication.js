const authentication = (req,res,next)=>{
    const auth = req.headers.authorization;
    
    if (!auth) {
        const err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({error:err.message})
    }

    const authParams = new Buffer.from(auth.split(' ')[1],
    'base64').toString().split(':');
    const user = authParams[0];
    const pass = authParams[1];

    if(user === 'DragosDaniil' && pass === '18dec1997'){
        next()
    } else {
        const err = new Error('Invalid credentials!');
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({error:err.message})
    }
}

module.exports = authentication;