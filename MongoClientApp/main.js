const {connect, close, listAllFaculties, insertManyFaculties} = require("./mongo.client");

const main = async () => {
    await connect().catch(console.log());
    await listAllFaculties();
    await close();
}

main();
