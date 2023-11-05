const { Idea} = require('../models/idea');
const { errorHandler } = require('../helpers/dbErrorHandler');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { NODE_MAILER_EMAIL, PASSWORD } = require('../config/keys');
const User = require('../models/user');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: NODE_MAILER_EMAIL,
        pass: PASSWORD
    }
})



exports.create = async (req, res) => {
    try {
        req.body.idea.user = req.profile;
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
        let history = [];
        history.push({
            _id: savedIdea._id,
            name: req.body.idea.name,
            description: req.body.idea.description,
            response: JSON.stringify(apiResponse.data),
            created: savedIdea.created
        });
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.profile._id },
            { $push: { history: history } },
            { new: true }
        );
        return res.status(200).json(apiResponse.data);
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

exports.purchaseHistory = (req, res) => {
    Idea.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};






