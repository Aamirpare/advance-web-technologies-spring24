const {UserRepository, UserModel} = require("./userRepository");


(async function main(){
    const userRepo = new UserRepository();
    await userRepo.connect();
    //await userRepo.createUser("Aamir", "23213", ["user", "admin", "instructor"]);
    // var user = {
    //     userName: "Fatima",
    //     password: "kareem123",
    //     roles: ["user", "student"]
    // };
    //await userRepo.createUser(user);

    // var user = {
    //     userName: "Sabrina",
    //     password: "sabrina123",
    //     roles: ["user", "student"]
    // };
    //await userRepo.createUser(user);
    
    //await userRepo.listUsers();
    //await userRepo.deleteUserById("65f06030e60084cb0699cbeb");
    
    let userModel = await userRepo.findUserByName("Fatima");

    let isCorrect = await userModel.isPasswordCorrect("kareem123");
    
    console.log(`The password you entered is correct : ${isCorrect}`);
    
    let accessToken = await userModel.generateAccessToken();
    
    console.log(`The access token : ${accessToken}`);

    await userRepo.disconnect();
})();
