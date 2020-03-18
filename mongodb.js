const mongodb=require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

mongoClient.connect(connectionUrl,{ useNewUrlParser:true }, (error, client)=>{
    if(error){
        return console.log("Unable to connect database")
    }
    const db = client.db(databaseName)
    // db.collection('user').insertOne({
    //     name: 'Venkat',
    //     age: '24'
    // })
    // db.collection('task').insertMany([
    //     {
    //         discription: 'book of my life',
    //         completed: true
    //     },
    //     {
    //         discription: 'confidence',
    //         completed: true
    //     },
    //     {
    //         discription: 'book nodejs',
    //         completed: false
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert')
    //     }
    //     console.log(result.ops)
        
    // })
})