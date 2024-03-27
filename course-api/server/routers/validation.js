//const Joi = require('joi');
import Joi from "joi";

//Validation function
export function validateCourse(course){
    //applying validation
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        code: Joi.string().min(6).max(6).required()
    });
    return schema.validate(course);
}
//module.exports = validateCourse;
export default { validateCourse };