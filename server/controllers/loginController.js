const pool = require('./../db/postgresModel');
const loginController = {};


loginController.verifyUser = async (req, res, next) => {
    try {
        // Deconstruct username and password
        const { given_name, family_name, email, sub } = req.body;
        // Check if either username or password fields are empty, if so throw an error 
        // if (username === '' || password === '') {
        //     return next({
        //         log: 'userController.createUser: Missing username or password',
        //         status: 400,
        //         message: { err: 'Mandatory field is missing' }
        //     });
        // };

        // Create a new user in our database
        console.log("this is request body", req.body);
        const text = `SELECT _id FROM users WHERE username = ($1);`
        const values = [email];
    
        const result = await pool.query(text, values);
        const user_id = result.rows[0];
        console.log('this is the query text', user_id);

        if (user_id === undefined) {
            // create a new user
            const createUserQuery = `INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING _id;`;
            const values2 = [given_name, family_name, email, sub];
            const poolResponse = await pool.query(createUserQuery, values2);

            console.log('created a user in our database', createUserQuery);
            const newUserId = poolResponse.rows[0];
            res.locals.userId = newUserId._id;
        }
        else {
            res.locals.userId = user_id._id;
        };
        next();
    }
    catch(err) {
        const errObj = {
            log: 'loginController.verifyUser Error',
            status: 404,
            message: { err: 'An error occurred' },
        };
        return next({ ...errObj });
    };
};


// loginController.verifyUser = (req, res, next) => {
//     // check if username and password matches what we have in our database
//     const { email, sub, family_name, given_name } = req.body;

//     const text = `SELECT users._id FROM users WHERE username = ${email};`
//     console.log('this is the query text', text);

//     res.locals.userId = 3;
//     return next();
// };



module.exports = loginController;