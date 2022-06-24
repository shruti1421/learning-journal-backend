const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require("../middleware/auth");
const Journal = require('../models/Journal');

function checkJournal(foundJournal)
{

}

/**
 get all journals which have userid present in sharedWith of a Journal
 */
router.get('/',auth, async (req,res) =>{

    Journal.find(function(err,foundJournal){
        if(!err)
        res.send(Object.values(foundJournal).filter(journal=>journal.sharedWith.includes(req.user.id)));
        else
        res.send(err);
     });
})

/**
 check if user email exists in User
 if yes ->extract _id
 add it our journal @ _id
 The shared user need not to be authenticated
 We just need to check the authentication of curr user.
 */


// @route  POST api/journals/share/:id
// @desc   push new shared user to journal
// @acess  Private

router.post('/:id', auth, async (req, res) => {
    const journalId = req.params.id;
   
    if (req.body.email === null)
        res.status(400).json({msg:'Fields cannot be null'});

    try {
        //to check if we already have this user
        const user = await User.findOne({
            email: req.body.email
        })

        if (user)
        {
            //console.log(user)
            let journal = await Journal.findById(req.params.id);

            if (journal.user.toString() === user.id) {
                 res.status(400).json({msg:"shared email cannot be same as author email"});
             } else
             {
                const sharedUsers = journal.sharedWith;
                if (!sharedUsers.includes(user.id)) {
                    sharedUsers.push(user.id)
                    journal.save()
                    res.json({msg:"Succesfully shared the journal with requested user!"})
                } else
                    res.status(400).json({msg: "Journal already shared with the requested user"})

            }
        }
        else {
            res.status(400).json({ msg: "User to share does not exists"})
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


})
module.exports = router;