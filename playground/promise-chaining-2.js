require('../src/db/mongoose')
const Tasks = require('../src/models/task')

// Tasks.findByIdAndDelete('5e7ee7608d2892359c806ec7').then(()=>{
//     return Tasks.countDocuments({
//         completed: true
//     })
// }).then((result)=>{
//    console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id)=>{
    const _id= await  Tasks.findByIdAndDelete(id)
    const count = await Tasks.countDocuments({completed: true})
    return count;
}

deleteTaskAndCount('5e804dbba2c0d7321cd010ad').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})