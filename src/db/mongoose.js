const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify : false
})



// const me = new User({
//     name: 'Venkat',
//     password: "Password",
//     email: 'hari@gmail.com',
//     age: 23
// });


// me.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//   console.log(error)
// })

// const Task = mongoose.model('Task',{
//     description: {
//         type: String,
//         trim : true,
//         required: true
//     },
//     completed :{
//         type: Boolean,
//         default : false
//     }
// })

// const task1 = new Task({
//     description: 'Task1',
//     completed: true
// });


// task1.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//   console.log(error)
// })


