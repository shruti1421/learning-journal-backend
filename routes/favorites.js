const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const Journal = require('../models/Journal');

// @route  PUT api/journals/favorites/:id
// @desc   mark/unmark journal as favorites
// @acess  Private

router.put('/:id', auth, async (req, res) => {
    try {
        let journal = await Journal.findById(req.params.id);

        if(!journal) return res.status(404).json({ msg: `Cannot find journal with ${req.params.id}` });
        const currValue=journal.isFavorites
        //console.log(typeof currValue)
        journal.isFavorites=!currValue
        journal.save()
        res.json(journal);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error Updating Favorites");
    }
})
module.exports = router;