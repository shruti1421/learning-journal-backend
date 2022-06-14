const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require("../middleware/auth");
const Journal = require('../models/Journal');


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
   
    if (req.body.shared_email == null)
        res.send('Fields cannot be null');

    try {
        //to check if we already have this user
        const user = await User.findOne({
            email: req.body.shared_email
        })

        console.log(user);
        if (user)
        {
            const journal = await Journal.findOne({
                _id: journalId
            })
            console.log(journal.user+" "+user._id)
            if (journal.user.equals(user._id)) {
                res.send("shared ID cannot be same as author ID");
            } else {
                const sharedUsers = journal.sharedWith;
                //console.log(sharedUsers)
                if (!sharedUsers.includes(user._id)) {
                    sharedUsers.push(user._id)
                    journal.save()
                    // console.log(journal)
                    // console.log(user)
                    res.send("Succesfully shared the journal with requested user!")
                } else
                    res.send("Journal already shared with the requested user")

            }
        }
        else {
            res.send("User to share does not exists")
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


})
module.exports = router;