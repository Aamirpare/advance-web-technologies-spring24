//const validateCourse = require('../validation');
import express from "express";
import  {validateCourse}  from "./validation.js";
import { CourseRepository } from "../repositories/course.repository.js";

//Global Declarations
const courseRouter = express.Router();
const courseRepository = new CourseRepository();


// middleware that is specific to this router
courseRouter.use(function timeLog (req, res, next) {
    console.log(`Date: ${Date()}`);
    next();
});

//ReSTful courseRouter
courseRouter.get('/', (req, res)=>{
    
    res.send('<h1>Welcome to the Courses API</h1><p>The course api for UniTubeCore</p>');
    
    //Test course manager by adding a course
    const course = {code: "MGT400", name: "Management Information Systems"};
    if(!courseRepository.getByName(course.name)){
        courseRepository.add(course);
    }    
    
    console.log("Showing all the courses.");
    console.log(courseRepository.get());
});

courseRouter.get('/courses', (req, res)=>{
    const courses = courseRepository.get();
    res.send(courses);
});

courseRouter.get('/courses/:id', (req, res)=>{
    const course = courseRepository.getById(req.params.id);
    if(!course) return res.status(404).send(`The course with the id=${req.params.id} wasn't found.`)
    res.send(course);
});

courseRouter.post('/courses', (req, res)=>{
   
    //Course already exists check
    const course = courseRepository.getByName(req.body.name);
    if(course) return res.send('This course exists already.');

    const {error} = validateCourse(req.body);
    //If error then send 404 response, with error results
    if(error) return res.status(404).send(error);

    //Create a new course 
    const newCourse = courseRepository.add(req.body);

    console.log(`New course added successfully.`)

    //Send newly added course back in the response
    res.send(newCourse);
});

courseRouter.put("/courses/:id", (req, res) => {
    
    const course = courseRepository.getById(req.params.id);
 
    if(!course) return res.status(404).send(`The course with id=${req.params.id} was not found.`);

    if(course.name === req.body.name) return res.send(`The course name "${course.name}" already exists`);
    
    //using object destructing notation to get the error property from the validation result which is complex object
    const {error} = validateCourse(req.body);
    //If error then send 404 response, with error results
    if(error) return res.status(404).send(error.details[0].message);
    
    //Using spread operator add id property to the object
    const courseWithId = {...req.body, id:course.id }
    courseRepository.update(courseWithId);

    console.log("Course updated successfully.");
    
    res.send(course);    
});

courseRouter.delete("/courses/:id", (req, res) => {
    const course = courseRepository.getById(req.params.id);
    if(!course) return res.status(404).send(`The course with id=${req.params.id} was not found.`);
    
    courseRepository.delete(course.id);

    console.log("Course deleted successfully.");

    res.send(course);
});

export default courseRouter;