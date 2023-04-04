const User = require("../Modals/UserModal")
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secret = "HelloUser";
const bcrypt = require("bcrypt")

router.post("/login" , async(req,res)=>{
    try{
        const {email , password} = req.body
        const isUser = await User.findOne({email:email})
        if(!isUser){
            return res.status(400).send("No User Exist With Given MAil-Id")
        }
        bcrypt.compare(req.body.password, isUser.password, function (err, result) {
            if(err){
                return res.status(400).send(e.message)
            }
             if (result) {
                        const token = jwt.sign({             //pwd crrct creating jwt
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: isUser._id
                        }, secret);
                        return res.status(200).json({
                            "Message":"User Login SuccessFully",
                            "token": token,
                            "name":isUser.name
                        })
                    }else{
                        return res.status(400).send("Invalid Credentials")
                    }
                  
        })

    }
    catch(e){
        return res.status(400).send(e.message)
    }
})


module.exports = router;