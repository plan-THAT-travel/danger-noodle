const pool = require('./../db/postgresModel');
const loginController = {};


loginController.createUser = async (req, res, next) => {
    try {
        // Deconstruct username and password
        const { username, password } = req.body;
        // Check if either username or password fields are empty, if so throw an error 
        if (username === '' || password === '') {
            return next({
                log: 'userController.createUser: Missing username or password',
                status: 400,
                message: { err: 'An error occured' }
            });
        };

        
    }
    next();
};

loginController.getUser = (req, res, next) => {

    next();
};



module.exports = loginController;