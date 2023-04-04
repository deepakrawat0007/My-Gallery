const router = require("express").Router()
const Image = require("../Modals/ImageModal");

router.post("/add",async(req,res)=>{ // for adding the New Image
    // console.log(req.user);
    
    try{
        const {label , image} = req.body
        const PostImage = new Image({
            label:label,
            image:image,
            user:req.user
        })
       const response = await PostImage.save()
        res.status(201).json({
            status : "success",
            data:response
        });
    }
    catch(e){
        res.status(406).json({
            status:"Failed",
            message:e.message,
        })
    }
})

router.get("/allImage", async (req, res) => { // for getting all iMages
    // console.log(req)
    try {
        const images = await Image.find({user: req.user}).sort({_id:-1})
        res.status(200).json({
            status: "sucess",
            Images: images
        })
    } catch (e) {
        res.status(400).send("Failed")
    }
});
router.delete("/delete/:id" , async(req ,res)=>{ // for deleting the Image
    try{
        const _id = req.params.id
        await Image.findByIdAndDelete(_id)

        return res.status(200).json({
            message:"success"
        })

    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
})



module.exports = router