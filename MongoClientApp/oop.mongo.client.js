/*
    Author   : Aamir Parre
    Date     : 9th March, 2024
    Location : Home, G-11/4 Islamabad
    Summary  : The object oriented mongoclient implementation.
*/
const { MongoClient } = require("mongodb");

class StudentRepository{
    mongoUrl = "mongodb://127.0.0.1:27017";
    databaseName = "StudentDB";
    client = new MongoClient(this.mongoUrl);

    async connect() {
        try {
            await this.client.connect();
            console.log("Successfully connected to mongodb server.");
            //await insertManyFaculties(client);
            //await listAllFaculties(client);        
        }
        catch (e) {
            console.log(`The following error occured while connecting to mongodb server:`);
            console.log(e);
        }
    }

    async close() {
        await this.client.close();
        console.log("Mongodb server connection closed");
    }

    async listAllFaculties() {
        let cursor = this.client.db(this.databaseName).collection("Faculty").find();
        let results = cursor.toArray();

        console.log("The documents contained in the collection are listed under:");
        (await results).forEach(result => console.log(result));
    }

    async insertManyFaculties() {
        let result = await this.client.db(this.databaseName).collection("Faculty")
            .insertMany([
                { fullName: "Hajira2", Email: "Hajira2@gmail.com" },
                { fullName: "Aftab2", Email: "aftab2@hotmail.com" }]);

        console.log(result);
    }
}

module.exports = { StudentRepository }
