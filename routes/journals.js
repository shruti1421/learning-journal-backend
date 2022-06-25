const express = require('express');
const moment=require('moment')
const router = express.Router();
const Journal=require("../models/Journal");
const User = require('../models/User');
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator');


// @route  GET  api/journals
// @desc   Get all user journals
// @acess  Private
router.get('/', auth, async (req,res)=>{
    
      try {
         //To get all journals of an user with userID req.user.id
          const foundJournal = await Journal.find({user: req.user.id}).sort({data: -1});
          res.send(foundJournal);
      } catch (error) {
          console.log(error.message);
          res.status(500).send('Server Error');
      }
});

// @route  POST  api/journals
// @desc   Add new journal
// @acess  Private
router.post('/',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('content','Content is empty').not().isEmpty()
]], async (req,res)=>{

    //get an array of errors if some check is not valid 
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const newJournal=new Journal({
            title:req.body.title,
            content:req.body.content,
            dateCreated:req.body.dateCreated,
            lastCreated:req.body.lastCreated,
            category:req.body.category,
            isFavorites:req.body.isFavorites,
            user: req.user.id
        });

        const journal = await newJournal.save();
        res.send("Successfully created Journal!");

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT  api/journals/:id
// @desc   Update journal
// @acess  Private
router.put('/:id', auth, async (req,res) =>{
    const { title,content,category, isFavorites } = req.body;

    //Build Contact object
    const journalFields = {};
    if(title) journalFields.title = title;
    if(content) journalFields.content = content;
    if(category) journalFields.category = category;
    if(isFavorites) journalFields.isFavorites = isFavorites;
    journalFields.lastModified=moment().format('MMMM Do YYYY, h:mm:ss a');

    try {
        let journal = await Journal.findById(req.params.id);

        if(!journal) return res.status(404).json({ msg: `Cannot Update journal with ${req.params.id}. Maybe user not found!` });

        //Make sure user owns contact
        if(journal.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'});
        }
        
        journal = await Journal.findByIdAndUpdate(req.params.id,{
            $set: journalFields
        },
        { new: true});

        res.json(journal);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error Update journal information");
    }
});

// @route  DELETE  api/journals/:id
// @desc   delete journal
// @acess  Private
router.delete('/:id', auth, async (req,res) =>{
    try {
        let journal = await Journal.findById(req.params.id);

        if(!journal) return res.status(404).json({ msg: `Cannot delete journal with ${req.params.id}. Maybe user not found!` });

        //Make sure user owns contact
        if(journal.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'});
        }
        
        await Journal.findByIdAndRemove(req.params.id);

        res.json({msg: "Successfully deleted specific journal"});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;