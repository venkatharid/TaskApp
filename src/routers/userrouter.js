const express = require('express')
const User = require('../models/user')
const router= new express.Router()

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
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

router.get('/users',async (req,res)=>{
    try{
        const users =await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }

     // promise syntax
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
        try{
            const users = await User.findById({_id})
            if(!users){
                return res.status(404).send()
            }
            res.send(users)
        }catch(e){
            res.status(500).send(e)
        }

         // promise syntax
    // User.findById({_id}).then((users)=>{
    //     if(!users){
    //         return res.status(404).send()
    //     }
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

router.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowUpdates = ["name","age","email"]
    const isvalidate = updates.every((updates)=> allowUpdates.includes(updates))
    if(!isvalidate){
        return res.status(400).send('Invalide operator');
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/:id',async (req,res)=>{
    try{

        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports= router;