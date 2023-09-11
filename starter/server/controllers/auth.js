const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;
const {User} = require('../models/user');
const bcrypt = require("bcryptjs");


const createToken = (username, id) => {
    return jwt.sign(
        {
            username,
            id
        },
        SECRET,
        {
            expiresIn: '2 days'
        }
    );
};


//  async allow us to perform asynchronous actions in the function using the await keyword.

module.exports = {
    login: async (req, res) => {        
        try{
            let {username, password} = req.body;

            // find one is sequelize method and the object adds a WHERE clause to our query and looks for usernames matching the one coming from req.body.
            let foundUser = await User.findOne({WHERE: {username: username}})

            if(foundUser) {
                // First, we’ll check to see if the username and password match what’s stored in the database. 
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass);
                // will check if isAuthenticated is truthy.
                if(isAuthenticated) {
                    // this makes a new token for our new user passing in the username and id
                    let token = createToken(foundUser.dataValues.username, foundUser.dataValues.id);

                    // make our own expiration time since the JWT sign method only returns the actual token.
                    const exp = Date.now() + 1000 * 60 * 60 * 48;

                    // I created an object that holds all of the new user data so that I may send this to the front end
                    const userData = {
                    username: foundUser.dataValues.username,
                    userId: foundUser.dataValues.id,
                    token: token,
                    exp: exp
                    };
                
                    console.log(userData);
                    res.status(200).send(userData);
                } else {
                    res.status(400).send('Password is incorrect!');
                }

            }else {
                res.status(400).send('User does not exist!');
            }
        } catch(err) {
            console.error(err);
            res.status(400).send(err);
        };
    },
    register: async (req, res) => {
        try{
            let {username, password} = req.body;
            // find one is sequelize method and the object adds a WHERE clause to our query and looks for usernames matching the one coming from req.body.
            let foundUser = await User.findOne({WHERE: {username: username}})
            // if foundUser is true, that means we already have a user with that name in the database.
            if(foundUser) {
                res.status(400).send('Username is taken please, create a unique username!')
            }else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                // will create a new user, going into the user model and creates a new user setting the username and hashedpass columns to the input from the front end; saves the hashed pass.
                const newUser = await User.create({username: username, hashedPass: hash});

                // this makes a new token for our new user passing in the username and id
                let token = createToken(newUser.dataValues.username, newUser.dataValues.id)

                // make our own expiration time since the JWT sign method only returns the actual token.
                const exp = Date.now() + 1000 * 60 * 60 * 48

                // I created an object that holds all of the new user data so that I may send this to the front end
                const newUserData = {
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token: token,
                    exp: exp
                    }
                
                console.log(newUser);
                res.status(200).send(newUserData);
            }
        }
        catch(err) {
            console.error(err);
            res.status(400).send(err);
        };
    },
}