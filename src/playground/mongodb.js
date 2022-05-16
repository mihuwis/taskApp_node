const {MongoClient, ObjectId} = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) =>{
    if(error){
        return console.log('unable to conect to db. MW')
    }

    const db = client.db(databaseName)
    
        //================== insertOne ============================================================
    // db.collection('users').insertOne({
    //     name: "Mihu",
    //     age : 98
    // }, (error, result) => {
    //     if(error){
    //         return console.log
    //     }
    // })

    //===================== insertMany =====================================================

    // db.collection('tasks').insertMany([
    //     { description: 'Climbing', completed: true},
    //     { description: 'House keeping', completed: false},
    //     { description: 'Cooking', completed: true},
    // ])

    //=================countDocuments========================================================

    // db.collection('users').countDocuments((error, results) => {
    //     if(error){
    //         console.log('Error in counting')
    //     }
    //     console.log("Number of entries: " + results)
    // })

    //================== findOne ========================================================

    // db.collection('users').findOne({_id: new ObjectId('62762d673b028bc76fc17e22')}, (error, user) =>{
    //     if(error){
    //         return console.log("Unable to find. MW")
    //     }
    //     console.log(user.age)
    //     console.log(user)
    // })

    //=================== find =========================================================

    // db.collection('users').find({ age: 28}).toArray((err, users) => {
    //     if(err){
    //         return console.log('No data found')
    //     }
    //     console.log(users)
    // })

    //===================== find =============================================================

    // db.collection('users').find({ age: 28}).count((err, number) => {
    //     if(err){
    //         return console.log('No data found')
    //     }
    //     console.log(number)
    // })

    //====================== updateOne ====================================================
    //== we need to use update operators starting with $ 

    // db.collection('users').updateOne(
    //     { _id: new ObjectId('62762e7cf3dbd21be7c526cc')}, 
    //     { $set: {name: '003'}})
    //     .then((result) => {console.log(result + result.name)})
    //     .catch((err) => {console.log(err)})

    //====================== updateMany ====================================================

    // db.collection('users').updateMany(
    //     {age: 35},
    //     {$inc: {age: 2}})
    //     .then((result) => console.log(result))
    //     .catch((err) => {console.log(err)})

    //====================== deleteOne ====================================================

    db.collection('users').deleteOne(
        {name: 'Iga'})
        .then((result) => console.log(result))
        .catch(err => console.log(err))


})