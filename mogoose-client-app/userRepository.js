const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: String,
    roles: []
}, 
{
    versionKey: false,
    timestamps: true
});

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function(){
    return bcrypt.hash("aamir", 10);
}

const UserModel = mongoose.model("User", UserSchema);

class UserRepository {
    connect = async () => {
        try {
            const db = await mongoose.connect("mongodb://127.0.0.1:27017/MedicalDB");
            //await createUser("Malaika2", "23213", ["user"]);
            //await listUsers();
            //await deleteUser();
            //await deleteUserByName("Aamir");
        }
        catch (error) {
            console.log("Error: couldn't connect to the mongodb server.");
        }
    }
    disconnect = async ()=>{
        await mongoose.disconnect();
    }
    
    createUser = async (username, password, roles) => {
        const newUser = new UserModel({
            userName: username,
            password: password,
            roles: roles
        });

        const result = await newUser.save();
        console.log(result);
    }

    createUser = async (newUser)=> {
        let userModel = new UserModel(newUser);
        let result = await userModel.save();
        console.log("The result: ");
        console.log(result);
    }

    listUsers = async () => {
        const result = await UserModel.find();
        console.log("The result: ");
        console.log(result);
    }

    findUserByName = async (username) =>{
        return await UserModel.findOne({ userName: username});
    }

    deleteUserById = async (id) => {
        const result = await UserModel.findByIdAndDelete(id);
        console.log("The result: ");
        console.log(result);
    }

    deleteUserByName = async (username) => {
        const result = await UserModel.findOneAndDelete({ userName: username });
        console.log("The result: ");
        console.log(result);
    }

}

module.exports = { UserRepository, UserModel };