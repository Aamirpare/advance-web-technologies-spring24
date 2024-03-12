const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName : String,
    email: String
}, {versionKey: false});

const StudentModel = mongoose.model("Student", studentSchema, "Student");


async function connect(){
    try
    {
        const db = await mongoose.connect("mongodb://127.0.0.1/StudentDB")
        console.log("Connected.");
        
        //await dropCollection();
        
        //Create new student
        //await createStudent("Noorul Hudda", "noor.ul.huda@gmail.com");
        await listStudents();
        //await deleteStudentByEmail("noor.ul.huda@gmail.com");
        //await deleteStudentById("65ed27f451356398d39afae4");
    }
    catch(error){
        console.log("Can't connect.");
        console.log(error);
    }
    finally{
        await mongoose.disconnect();
    }
} 

connect().catch((error)=> {});

//create new student method
const createStudent = async (fullname, emailAddress) =>{
    let newStudent  = new StudentModel({
        fullName: fullname,
        email: emailAddress
    });

    let result = await newStudent.save();
    console.log("New student has been saved to the database");
    console.log(result);
    return result;
} 

const listStudents = async ()=>{
    let students = await StudentModel.find();
    console.log(students);
    return students;
}

const deleteStudentById = async (id) => {
    //let id = new ObjectId('65ecc35fc10b544df1855300')
    let result = await StudentModel.findByIdAndDelete(id);
    console.log("The result of delete operation: ");
    console.log(result);
    return result;
}

const deleteStudentByEmail = async (email) => {
    let result = await StudentModel.findOneAndDelete({email: email});
    console.log("The result of delete operation:");
    console.log(result);
    return result;
}

const dropCollection = async () => {
    let result = await mongoose.connection.collections["Student"].drop();
    console.log("the drop collection result:");
    console.log(result);
    return result;
}
