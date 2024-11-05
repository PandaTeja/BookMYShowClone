const Event = require('../models/event');

exports.getAllEvents = async(req,res) => {
    try{
        const events = await Event.find();
        res.status(200).json(events);
    }catch(error){
        res.status(500).json({error:"Failed"});
    }
}

exports.createEvent = async (req,res) =>{
    try{
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    }catch(error){
        res.status(200).json({error:"Failed"});
    }
}