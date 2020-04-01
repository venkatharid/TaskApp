require('../src/db/mongoose')
const Users = require('../src/models/user')

// Users.findByIdAnUpdate('5e7ee7608d2892359c806ec7',{age:1}).then(()=>{
//     return Users.countDocuments({
//         age: 1
//     })
// }).then((result)=>{
//    console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const user = async(id,age)=>{
    const _id= await  Users.findByIdAndUpdate(id,{age});
    const count = await Users.countDocuments({age})
    return count;
}

user('5e804b89c059591564c78775',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})