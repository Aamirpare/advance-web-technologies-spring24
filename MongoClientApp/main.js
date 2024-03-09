// const {connect, close, listAllFaculties, insertManyFaculties} = require("./mongo.client");

// (async () => {
    //     await connect().catch(error => console.log(error));
    //     await listAllFaculties();
    //     await close();
    // })();

    
const { StudentRepository } = require("./oop.mongo.client");
(async ()=> {
    const db = new StudentRepository();
    await db.connect().catch(error => console.log(error));
    await db.listAllFaculties();
    await db.close();
})();
