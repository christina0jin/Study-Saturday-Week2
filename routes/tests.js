const router = require('express').Router();
const Student = require('../db/models/student')
const Test = require('../db/models/test')


router.get('/', (req,res,next) => {
    Test.findAll()
        .then(result => res.json(result))
        .catch(err => next(err))
        // .catch(next)
})

router.get('/:id', (req,res,next) => {
    Test.findById(req.params.id)
    .then(result => {
        if (result) res.json(result)
        else res.sendStatus(404)
    })
    .catch(next)
})


router.post('/student/:studentId', (req,res,next) => {
    Test.create({
        studentId: req.params.studentId,
        subject: req.body.subject,
        grade: req.body.grade
    })
    .then(finalResult => {
        res.status(201).json(finalResult)
    })
    .catch(next)
})

router.delete('/:id', (req,res,next) => {
    Test.destroy({where:{id:req.params.id}})
    .then(result => res.status(204).json(result))
    .catch(next)
})

module.exports = router;
