const router = require("express").Router()
const Image = require("../Modals/ImageModal");

router.post("/add",async(req,res)=>{
    // console.log(req.user);

    try{
    const Data = await Image.create({user:req.user, ...req.body});
        res.status(201).json({
            status : "success",
            data:Data
        });
    }
    catch(e){
        res.status(406).json({
            status:"Failed",
            message:e.message,
        })
    }
})

router.get("/allImage", async (req, res) => {
    // console.log(req)
    try {
        const images = await Image.find({user: req.user})
        res.status(200).json({
            status: "sucess",
            Images: images
        })
    } catch (e) {
        res.status(400).send("Failed")
    }
});


module.exports = router