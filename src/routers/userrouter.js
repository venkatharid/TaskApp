const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router= new express.Router()

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.gernerateUserToken();
        res.status(201).send({user , token})
    }catch (e){
        res.status(400).send(e)
    }
    
    // promise syntax
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

router.get('/users/me',auth , async (req,res)=>{
    
    res.send(req.user) //to get the authenticated user details
    
    //to find all users
    // try{
    //     const users =await User.find({})
    //     res.send(users)
    // }catch(e){
    //     res.status(500).send(e)
    // }

     // promise syntax
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdates = ["name","password","age","email"]
    const isvalidate = updates.every((updates)=> allowUpdates.includes(updates))
    if(!isvalidate){
        return res.status(400).send('Invalide operator');
    }

    try{
        updates.forEach((updates)=> req.user[updates] = req.body[updates])
        await req.user.save();
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/me',auth,async (req,res)=>{
    try{

        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     return res.status(400).send()
        // }

        await req.user.remove();
        res.send(req.user);
    } catch(e){
        res.status(500).send(e)
    }
})


router.post('/user/login', async (req , res)=>{
    try{
        const user = await User.finduserbyCredential(req.body.email , req.body.password);
        const token = await user.gernerateUserToken();
        res.send({user , token })
    }catch{
        res.status(400).send()
    }
})


router.post('/user/logout', auth , async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();
        res.send("Logout Successful")
    } catch (e){
        res.status(500).send()
    }
})

router.post('/user/logoutAll',auth ,async(req,res)=>{
    try{
        req.user.tokens=[];
        await req.user.save()
        res.status(200).send("Logut from all the devices")
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    limit: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("please upload a image document"))
        }
        cb(undefined, true)
    }
})

router.post('/user/me/avatar' ,auth,upload.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width: 400 , height: 400}).png().toBuffer() 
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send(error.message)
})


router.delete('/user/me/avatar' , auth , async(req,res)=>{
    try{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}catch(e){
    res.status(400).send()
}
})

router.get('/user/:id/avatar',async (req,res)=>{
    try{
    const user = await User.findById(req.params.id)
    if(!user || !user.avatar){
        throw new Error()
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)
}catch(e){
    res.status(400).send()
}
})





module.exports= router;



//to Get user by Id
// router.get('/users/:id',async (req,res)=>{
//     const _id = req.params.id
//         try{
//             const users = await User.findById({_id})
//             if(!users){
//                 return res.status(404).send()
//             }
//             res.send(users)
//         }catch(e){
//             res.status(500).send(e)
//         }

//          // promise syntax
//     // User.findById({_id}).then((users)=>{
//     //     if(!users){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(users)
//     // }).catch((e)=>{
//     //     res.status(500).send(e)
//     // })
// })