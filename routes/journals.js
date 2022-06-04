const express = require('express');
const router = express.Router();

// @route  POST  api/contacts
// @desc   Get all users contacts
// @acess  Private
router.get('/',(req,res)=>{
    res.send('Get all Journals');
});

// @route  POST  api/contacts
// @desc   Add new contact
// @acess  Private
router.post('/',(req,res)=>{
    res.send('Add Journal');
});

// @route  PUT  api/contacts/:id
// @desc   Update contact
// @acess  Private
router.put('/:id',(req,res)=>{
    res.send('Update Journal');
});

// @route  DELETE  api/contacts/:id
// @desc   delete contact
// @acess  Private
router.delete('/:id',(req,res)=>{
    res.send('Delete Journal');
});
module.exports = router;