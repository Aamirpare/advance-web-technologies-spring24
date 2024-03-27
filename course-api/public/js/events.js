//bind event listeners
document.getElementById("btn-get").addEventListener("click", ()=>{
    //Show all courses when this button is clicked
    getCourses();
});
document.getElementById("btn-add").addEventListener("click", ()=>{
    //Add new course when this button is clicked
    addCourse();
});
document.getElementById("btn-modify").addEventListener("click", ()=>{
    //Modify course when this button is clicked
    modifyCourse();
});
document.getElementById("btn-delete").addEventListener("click", ()=>{
    //Delete course when this button is clicked
    deleteCourse();
});