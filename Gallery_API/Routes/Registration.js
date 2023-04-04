const User = require("../Modals/UserModal");
const bcrypt = require("bcrypt");

const router = require("express").Router();

router.post("/registration", async(req , res)=>{
    try{
      const {name , email , password} = req.body
      const isUser = await User.findOne({ email: email })
      if(isUser){
        return res.status(400).send("User Alredy Exist With Given MAil-Id")
      }
     
    bcrypt.hash(password, 10, async function (err, hash) {
        if(err){
            return res.status(400).send(err.message)
        }
        const user = new User({
            name:name,
            email:email,
            password:hash
        })
        user.save().then(()=>{
            return res.status(200).json({
                "User" :user
            })
        })
    })
    }catch(e){
        return res.status(400).send(e.response)
    }
})

module.exports = router;