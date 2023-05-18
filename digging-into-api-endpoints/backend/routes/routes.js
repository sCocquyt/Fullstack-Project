const express = require('express')
const router = express.Router()
const memberSchema = require('../models/member.js')
const presentationSchema = require('../models/presentation.js')
const execMeetingSchema = require('../models/exec-meeting.js')
const headsMeetingSchema = require('../models/heads-meeting.js')

const { Schema } = require('mongoose')

// member routes
router.get('/members', (req, res) => {
    memberSchema.find({
    })
    .then(members => {
      console.log("succesfully got entire member db!")
      res.json(members)
    })
    .catch(err => {
      console.error(err)
    })
})

router.get('/member/:id', (req, res) => {
  memberSchema.findById(req.params.id)
  .then(members => {
    console.log("succesfully got entire member db!")
    res.json(members)
  })
  .catch(err => {
    console.error(err)
  })
})

router.post('/add-member', (req, res) => {
  const newMember = new memberSchema(req.body);
  newMember.save()
  .then(member =>{
    console.log("member added to db!")
    res.json("member added to db!")
  })
  .catch(err => {
    console.error(err);
  })
})

router.put('/member/:email', (req, res) => {
  memberSchema.findOneAndUpdate({email:req.params.email}, req.body)
  .then(member => {
    console.log("member successfully updated!")
    res.json("member successfully updated!")
  })
  .catch(err => {
    console.error(err);
  })
})

router.delete('/member/:email', (req, res) => {
  memberSchema.findOneAndDelete({email:req.params.email}, req.body)
  .then(member => {
    console.log("member successfully deleted!")
    res.json("member successfully deleted!")
  })
  .catch(err => {
    console.error(err);
  })
})

// presentation routes
router.get('/presentations', (req, res) => {
  presentationSchema.find({
  })
  .then(presentation => {
    console.log("succesfully got entire presentation db!")
    res.json(presentation)
  })
  .catch(err => {
    console.error(err)
  })
})

router.post('/add-presentation', (req, res) => {
const newPresentation = new presentationSchema(req.body);
newPresentation.save()
.then(presentation =>{
  console.log("presentation added to db!")
  res.json("presentation added to db!")
})
.catch(err => {
  console.error(err);
})
})

router.put('/presentation/:title', (req, res) => {
presentationSchema.findOneAndUpdate({email:req.params.title}, req.body)
.then(presentation => {
  console.log("presentation successfully updated!")
  res.json("presentation successfully updated!")
})
.catch(err => {
  console.error(err);
})
})

router.delete('/presentation/:title', (req, res) => {
presentationSchema.findOneAndDelete({email:req.params.email}, req.body)
.then(presentation => {
  console.log("presentation successfully deleted!")
  res.json("presentation successfully deleted!")
})
.catch(err => {
  console.error(err);
})
})

// exec meeting routes
router.get('/exec-meetings', (req, res) => {
  execMeetingSchema.find({
  })
  .then(execMeeting => {
    console.log("succesfully got entire exec meeting db!")
    res.json(execMeeting)
  })
  .catch(err => {
    console.error(err)
  })
})

router.post('/add-exec-meeting', (req, res) => {
const newExecMeeting = new execMeetingSchema(req.body);
newExecMeeting.save()
.then(execMeeting =>{
  console.log("exec meeting added to db!")
  res.json("exec meeting added to db!")
})
.catch(err => {
  console.error(err);
})
})

router.put('/exec-meeting/:date', (req, res) => {
execMeetingSchema.findOneAndUpdate({email:req.params.date}, req.body)
.then(execMeeting => {
  console.log("exec meeting successfully updated!")
  res.json("exec meeting successfully updated!")
})
.catch(err => {
  console.error(err);
})
})

router.delete('/exec-meeting/:date', (req, res) => {
execMeetingSchema.findOneAndDelete({email:req.params.date}, req.body)
.then(execMeeting => {
  console.log("exec meeting successfully deleted!")
  res.json("exec meeting successfully deleted!")
})
.catch(err => {
  console.error(err);
})
})

// heads meeting routes
router.get('/heads-meetings', (req, res) => {
  headsMeetingSchema.find({
  })
  .then(headsMeeting => {
    console.log("succesfully got entire heads meeting db!")
    res.json(headsMeeting)
  })
  .catch(err => {
    console.error(err)
  })
})

router.post('/add-heads-meeting', (req, res) => {
const newHeadsMeeting = new headsMeetingSchema(req.body);
newHeadsMeeting.save()
.then(headsMeeting =>{
  console.log("heads meeting added to db!")
  res.json("heads meeting added to db!")
})
.catch(err => {
  console.error(err);
})
})

router.put('/heads-meeting/:date', (req, res) => {
headsMeetingSchema.findOneAndUpdate({email:req.params.date}, req.body)
.then(headsMeeting => {
  console.log("heads meeting successfully updated!")
  res.json("heads meeting successfully updated!")
})
.catch(err => {
  console.error(err);
})
})

router.delete('/heads-meeting/:date', (req, res) => {
headsMeetingSchema.findOneAndDelete({email:req.params.date}, req.body)
.then(headsMeeting => {
  console.log("heads meeting successfully deleted!")
  res.json("heads meeting successfully deleted!")
})
.catch(err => {
  console.error(err);
})
})

module.exports = router
