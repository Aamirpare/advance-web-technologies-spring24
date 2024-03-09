const { MongoClient } = require("mongodb");
const mongoUrl = "mongodb://127.0.0.1:27017";
const databaseName = "StudentDB";
const client = new MongoClient(mongoUrl);

async function connect(){
    try{
        await client.connect();
        console.log("Successfully connected to mongodb server.");
        //await insertManyFaculties(client);
        //await listAllFaculties(client);        
    }
    catch(e){
        console.log(`The following error occured while connecting to mongodb server:`);
        console.log(e);
    }
}

async function close(){
    await client.close();
    console.log("Mongodb server connection closed");
}

async function listAllFaculties(){
    let cursor = client.db(databaseName).collection("Faculty").find();

    let results = cursor.toArray();

    console.log("The documents contained in the collection are listed under:");
    (await results).forEach(result => console.log(result));
}

async function insertManyFaculties(){
    let result = await client.db(databaseName).collection("Faculty")
        .insertMany([
            { fullName : "Hajira2", Email: "Hajira2@gmail.com"},
            { fullName: "Aftab2", Email: "aftab2@hotmail.com"}]);
        
     console.log(result);
}

module.exports = {connect, close, listAllFaculties, insertManyFaculties};

