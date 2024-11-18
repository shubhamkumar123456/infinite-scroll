
let postCollection = require('../models/PostCollection')

const createPost = async(req, res)=>{
    const {title,description , file} = req.body;
    let id = req.user._id


   try {
    let post = await postCollection.create({
        title,
        description,
        file,
        userId:id
    })
    res.json({msg:"post created successfully",success:true,post})
   } catch (error) {
        res.json({msg:"error in creating post",success:false,error:error.message})
   }



    // res.send(req.user._id)
}
const getAllPost = async(req, res)=>{
    // res.send("get all post running good")
    let {limit,page} = req.query;
    console.log(req.query)

    let skip = (page-1)*limit;
    
    try {
        let post = await postCollection.find().skip(Number(skip)).limit(Number(limit)).populate({path:'userId',select:['name','profilePic']});
        const totalCount = await postCollection.countDocuments()
        console.log(totalCount)
    res.json({msg:"fetched successfully", success:true,post,totalPage:Math.ceil(totalCount/limit),totalItems:totalCount})
    } catch (error) {
        res.json({msg:"error in creating post",success:false,error:error.message})   
    }
}
const updatePost = async(req, res)=>{
    res.send("update post running good")
    
}
const deletePost = async(req, res)=>{
    res.send("delete post running good")
}


module.exports ={
    createPost,
    getAllPost,
    updatePost,
    deletePost
}