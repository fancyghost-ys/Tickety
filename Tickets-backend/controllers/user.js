const User = require('../models/user')


exports.userById =async(req,res,next) =>{
        await User.findById(req.params.id).then((user) =>{
            if(!user){
                return res.status(400).json({
                    error:'User not found'
                })
            }
            return res.status(200).json(user)
        
        }).catch((error) => {
            return res.status(400).json({
                error:error.message
            })
        })
}


exports.getAllUser = async(req,res) =>{
   await User.find({role:{$eq:1}}).select(['-hashed_password','-salt']).then((AllUsers) =>{
    if(!AllUsers){
        return res.status(400).json({
            error:'No Users'
        })
    }
        return res.status(200).json({AllUsers});
   }).catch((eror) =>{
    return res.status(404).json({
        error:error.message
    })
   })
}


exports.createNewCustomer= async (req,res) =>{
        const user = await new User(req.body);
        await user.save().then((user) => {
            if(!user){
                return res.status(400).json({
                    error:err.message
                })
            }
            return res.status(200).json(user);
        }).catch((error) =>{
            return res.status(400).json({
                error:error.message
            })
        })
}

exports.updateUser= async(req,res) =>{
    const userExist= await User.findById(req.params.id);
    if(!userExist){
        return res.status(404).json({error : 'The user with the given Id was not found'})
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
            req.body,
        {new:true}
    )
    if(!user){
        return res.status(400).json({error:'The user cannot be Updated!'})
    }
    res.status(200).json({user})    
}

exports.deleteUser=async(req,res) =>{
        await User.findByIdAndRemove(req.params.id).then((user) =>{
            if(!user){
                return res.status(404).json({error:'User not found!'})
            }
            else{
                return res.status(200).json({message:'The user is deleted!'})
            }
        }).catch((error)=>{
            return res.status(400).json({
                message:error.message
            })
        })
    }
    

exports.countUsers = async (req, res) => {
        const countUser = await User.countDocuments();
        if(!countUser){
            res.status(500).json({error:'Something wrong in query'})
        }
        res.json({countUser:countUser})
    }      