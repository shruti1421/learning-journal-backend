const express = require('express');
const router = express.Router();
const Journal=require("../models/Journal");
// @route  GET  api/journals
// @desc   Get all user journals
// @acess  Private
router.get('/',(req,res)=>{
    Journal.find(function(err,foundJournal){
        if(!err)
        res.send(foundJournal);
        else
        res.send(err);
     });
});

// @route  GET  api/journals/:id
// @desc   Get specific journal by id
// @acess  Private
router.get('/:id',(req,res)=>{
    const id=req.params.id;
    Journal.findOne(id,function(err,foundJournal){
        if(!err)
        res.send(foundJournal);
        else
        res.send("No Journal found");
     });
});

// @route  POST  api/journals
// @desc   Add new journal
// @acess  Private
router.post('/',(req,res)=>{
    const newJournal=new Journal({
        title:req.body.title,
        content:req.body.content,
        dateCreated:req.body.dateCreated,
        lastCreated:req.body.lastCreated,
        category:req.body.category,
        isFavorites:req.body.isFavorites
    })

    newJournal.save(function(err){
        if(!err){
            res.send("Successfully created Journal!");
        }
        else
        res.send(err);
    });
});

// @route  PUT  api/journals/:id
// @desc   Update journal
// @acess  Private
router.put('/:id',(req,res)=>{
    const id=req.params.id;
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    Journal.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update journal with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update journal information"})
        })
});

// @route  DELETE  api/journals/:id
// @desc   delete journal
// @acess  Private
router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    Journal.findByIdAndDelete(id,function(err){
        if(!err)
        res.send("Successfully deleted specific journal");
        else
        res.send(err);
    })
});
module.exports = router;