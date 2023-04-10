const express = require('express')
const router = express.Router()
const NuevanSchema = require('../models/Nuevan.js')
const { Schema } = require('mongoose')

router.get('/', (req, res) => {
    NuevanSchema.find({
    })
    .then(nuevans => {
      console.log("succesfully got entire db!")
      console.log(nuevans)
      res.json(nuevans)
    })
    .catch(err => {
      console.error(err)
    })
})

router.get('/:id', (req, res) => {
    NuevanSchema.findById(req.params.id)
    .then(nuevan => {
      console.log("succesfully got one!")
      console.log(nuevan)
      res.json(nuevan)
    })
    .catch(err => {
      console.error(err)
    })
})

router.post('/add', (req, res) => {
  const newNuevan = new NuevanSchema(
    {
    name:req.body.name, 
    email:req.body.email, 
    role:req.body.role, 
    grade:req.body.grade
    }
  );
  newNuevan.save()
  .then(nuevan =>{
    console.log("added to db!!!!!")
    res.json("added to db")
  })
  .catch(err => {
    console.error(err);
  })
})

router.put('/:email', (req, res) => {
  NuevanSchema.findOneAndUpdate({email:req.params.email}, req.body)
  .then(nuevan => {
    console.log("successfully updated!")
    res.json("successfully updated!")
  })
  .catch(err => {
    console.error(err);
  })
})

//TODO: change '/' below to be by id
router.delete('/:email', (req, res) => {
  NuevanSchema.findOneAndDelete({email:req.params.email}, req.body)
  .then(nuevan => {
    console.log("successfully deleted!")
    res.json("successfully deleted!")
  })
  .catch(err => {
    console.error(err);
  })
})

module.exports = router
