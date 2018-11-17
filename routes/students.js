const router = require('express').Router();
const Student = require('../db/models/student')
const Test = require('../db/models/test')

router.get('/', async (req,res,next) => {
    try {
        const students = await Student.findAll();
        res.json(students)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const student = await Student.findById(req.params.id)
        if (student) res.json(student)
        else res.sendStatus(404)
        // distinction bet error and data isn't found; everything happening in the try block/.then() concludes with a response
        // everything in the catch block is an error that stops the app
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    const newStudent = await Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    })
    res.status(201).json(newStudent)

})

router.put('/:id', async (req,res,next) => {
    const [count, updateStudent] = await Student.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true,
    })





    // const updateStudent = await Student.findById(req.params.id)
    // updateStudent.update({
    //             firstName: req.body.firstName,
    //         })
    res.json(updateStudent)
})

router.delete('/:id', async (req,res,next)=>{
    const deleteStudent = await Student.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(204).json(deleteStudent)
})

module.exports = router;
