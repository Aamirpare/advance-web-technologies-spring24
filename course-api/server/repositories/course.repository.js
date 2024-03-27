import {v4 as uuid4} from "uuid";

class CourseRepository{
    courses = [
        {id : uuid4(), code : "CSC201", name : "System Programming"},
        {id : uuid4(), code : "CSC202", name : "Visual Programming" },
        {id : uuid4(), code : "CSC203", name : "Design Patterns"},
        {id : uuid4(), code : "CSC204", name : "Operating Systems"}
    ];
   get(){
       return this.courses;
   } 
   getById(id){
       return this.courses.find(c=> c.id === id);
   }
   getByName(name){
      return this.courses.find(c=> c.name === name);
   }
   add(course){
     const newCourse = {
         id : uuid4(),
         code: course.code,
         name : course.name
     };
     this.courses.push(newCourse);
     return newCourse;
   }
   update(course){
      const result = this.getById(course.id);
      result.code = course.code;
      result.name = course.name;
      return result;
   }
   delete(id){
       const course = this.getById(id);
       this.courses =  this.courses.filter(c => c.id !== id);
       return course;
   }
}
export { CourseRepository };