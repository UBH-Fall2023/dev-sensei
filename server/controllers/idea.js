const { Idea} = require('../models/idea');
const { errorHandler } = require('../helpers/dbErrorHandler');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { NODE_MAILER_EMAIL, PASSWORD } = require('../config/keys');
var ObjectID = require('mongodb').ObjectID;

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: NODE_MAILER_EMAIL,
        pass: PASSWORD
    }
})



exports.create = async (req, res) => {


    try {
        console.log('Idea: ', req.body);
        req.body.idea.user = req.profile;
        const idea = new Idea(req.body.idea);
        const savedIdea = await idea.save();


        try {
            const data = req.body.idea.description; // Assuming you have JSON data in the request body
            const prompt = "prompt";
            const prefix = "";
            console.log(prompt);

            const apiResponse = await axios.post('http://127.0.0.1:5000/design', {
            "prompt" :data
            }, { headers: {},});

            // const plan_json = apiResponse.data.choices[0].message.content;
            req.body.idea.response = JSON.stringify(apiResponse.data);
            const idea = new Idea(req.body.idea);
            const savedIdea = await idea.save();
            return res.status(200).json(savedIdea);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error'); // Handle errors appropriately
        }
    }
    catch(error) {
        return res.status(400).json({
            error: errorHandler(error)
        });
    }

}

exports.listIdeas = async (req, res) => {
    try
    {
        const foundIdeas = await Idea.find()
            .populate('user', '_id name email')
            .sort('-createdAt')
            .exec();
        res.json(foundIdeas);
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
};







