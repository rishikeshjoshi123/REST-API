const express = require('express');

const router = express.Router();


const Subscriber = require('../models/subscriber');


// '/' endpoint handling
router.route('/').get(async(req, res) => {

    try {

        const subscribers = await Subscriber.find();
        res.json(subscribers);

    } catch (error) {
        res.status(500).json({ "Error Message": error.message });
    }


}).post(async(req, res) => {

    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {

        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ "ErrorMessage": err.message });
    }
});


// '/growth' endpoint handling
router.route('/growth').get((req, res) => {
    res.send(`Welcome to '/subscribers/growth' endpoint. This is get endpoint`);
}).post((req, res) => {
    res.send(`Welcome to '/subscribers/growth' endpoint. This is post endpoint`);
});


// '/:id' endpoint handling
router.route('/:id').get(getSubscriber, (req, res) => {
    res.json(res.subscriber);

}).patch(getSubscriber, async(req, res) => {

    if (req.body.name != null)
        res.subscriber.name = req.body.name;
    if (req.body.subscribedToChannel != null)
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;

    try {
        await res.subscriber.save();
        res.send('Patched Successfully');
    } catch (err) {
        res.json({ "Error Message": err.message });
    }

}).delete(getSubscriber, async(req, res) => {

    try {
        await Subscriber.deleteOne(res.subscriber);
        res.json(`Deleted Succesfully!`);
    } catch (err) {
        res.status(500).json({ Message: err.message });
    }
});

//middleware 
async function getSubscriber(req, res, next) {

    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null)
            return res.status(404).json({ message: 'Cannot find subscriber in records.' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.subscriber = subscriber;
    next();

}

module.exports = router;