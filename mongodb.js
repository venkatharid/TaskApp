// const mongodb=require('mongodb')
// const mongoClient = mongodb.MongoClient

const {MongoClient, ObjectID} = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID;
console.log(id.toHexString().length);

var createDatabase = (client)=>{
    var db = client.db(databaseName);
    console.log('Database Created');
    return db;
}

var insertData = (db)=>{
     db.collection('user').insertOne({
        name: 'hari',
        age: '20'
    })
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
    
}

var findDocument = (db)=>{
    db.collection('task').findOne({discription : "book nodejs"},(error,task)=>{
        if(error){
            return error;
        }
        console.log(task);
    })

    db.collection('task').find({completed : true}).toArray((error,task)=>{
        console.log(task)
    }
)
}

var updateField= (db) =>{

    // db.collection('user').updateOne({name:'Venkat'},{
    //     $set: {
    //         name: "VenkatHari"
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log("error")
    // })

    db.collection('task').updateMany({completed: true},{
        $set:{
            completed: false
        }
    }).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log(error)
        })
}

var deleteFeild= (db) =>{

    db.collection('user').deleteOne({name:'hari'}
    ).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error)
    })

    // db.collection('user').deleteMany(
    //     {
    //         age: '24'
    //     }
    // ).then((result)=>{
    //         console.log(result);
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
}


MongoClient.connect(connectionUrl,{ useNewUrlParser:true }, (error, client)=>{
    if(error){
        return console.log("Unable to connect database")
    }
    //1. Create Database
    db = createDatabase(client);

    //2. InsertIntoData
    //insertData(db);

    //3.Read Form Data base
    //findDocument(db);

    //4. Update a field in Document
     //updateField(db);

    //5. delete the feild
    deleteFeild(db);
   
})