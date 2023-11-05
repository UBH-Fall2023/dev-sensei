const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { JWT_SECRET,GOOGLE_CLIENT_ID } = require('../config/keys');
const nodemailer = require('nodemailer');
const { NODE_MAILER_EMAIL, PASSWORD } = require('../config/keys');
const { OAuth2Client } = require('google-auth-library');


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: NODE_MAILER_EMAIL,
        pass: PASSWORD
    }
})

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};


exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.signup = async(req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);
    try
    {
        let savedUser = await user.save();
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            savedUser
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            // error: errorHandler(err)
            error: 'Email is already taken'
        });
    }
};

exports.signin = async (req, res) => {
    // find the user based on email
    try
    {
        let { email, password } = req.body;
        let foundUser = await User.findOne({email});
        if (!foundUser) {
            return res.status(400).json({
                error: 'User with this email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!foundUser.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password does not match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: foundUser._id },JWT_SECRET);

        const timestamp = new Date().getTime(); // current time
        const exp = timestamp + (60 * 60 * 24 * 1000 * 7)

        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: exp });

        // return response with user object and a token to frontend client
        // const user ={ _id:foundUser._id, name:foundUser.first_name,last_name:foundUser.last_name, email:foundUser.email, role:foundUser.role } ;
        const user ={ _id:foundUser._id, name:foundUser.name, email:foundUser.email, role:foundUser.role } ;


        return res.json({ token, user });

    }
    catch (err) {
        return res.status(400).json({
            error: ' There is some error please contact the administrator.'

        });
    }
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: JWT_SECRET,
    userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};


//wheeeveruser request forgot password 
//a jwt token is created with userid and name

const client = new OAuth2Client(GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
    const { idToken } = req.body;
    client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID }).then(response => {
        console.log('GOOGLE LOGIN RESPONSE',response)
        const { email_verified, name, email } = response.payload;
        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
                    const { _id, email, name, role } = user;
                    return res.json({
                        token,
                        user: { _id, email, name, role }
                    });
                } else {
                    let password = email + JWT_SECRET;
                    user = new User({ name, email, password });
                    user.save((err, user) => {
                        if (err) {
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                            return res.status(400).json({
                                error: 'User signup failed with google'
                            });
                        }
                        user.salt = undefined;
                        user.hashed_password = undefined;
                        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
                        // persist the token as 't' in cookie with expiry date
                        res.cookie('t', token, { expire: new Date() + 9999 });
                        // return response with user and token to frontend client
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        });
                    });
                }
            });
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again'
            });
        }
    }).catch(err=>{
        console.log("error in google sign in",err)
    });
};
