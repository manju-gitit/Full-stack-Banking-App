var express = require('express');
var app     = express();
const path = require('path');
var cors    = require('cors');
var dal     = require('./dal.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// used to serve static files from public directory
app.use(express.static(path.join(__dirname, 'frontend')));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'BetterBank API',
            version: '1.0.0',
            description: 'API for Better Bank',
        },
    },
    apis: [path.join(__dirname, 'api.js')],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// For the root url
/**
 * @swagger
 * /:
 *   get:
 *     summary: Express up
 *     responses:
 *       '200':
 *         description: Express is up!
 */
app.get('/', function(req,res) {
    res.send('Express!')
    console.log("Express route here!")
})
// create user account
/**
 * @swagger
 * /account/create/{name}/{email}/{password}:
 *   get:
 *     summary: Create a new account
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         type: string
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Account created successfully
 */
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {
            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists')
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }
        });
});
/**
 * @swagger
 * /account/create/{name}/{email}/{password}/:role:
 *   get:
 *     summary: Create a new admin account
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         type: string
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Admin Account created successfully
 */
// create admin account
app.get('/account/createAdmin/:name/:email/:password/:role', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {
            console.log("users"+JSON.stringify(users))
            // if user exists, return error message
            if(users.length > 1 && users.role === 'admin' ){
                console.log('Admin already in exists')
                res.send('Admin already in exists');    
            }
            else{
                // else create admin user
                dal.createAdmin(req.params.name,req.params.email,req.params.password,req.params.role).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});

// Login to an account
/**
 * @swagger
 * /account/login/{email}/{password}:
 *   get:
 *     summary: Log in to an account
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Login successful
 */
// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// balance for an account
/**
 * @openapi
 * /account/update/:email/:amount:
 *   get:
 *     summary: Get the balance for an account
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *       - name: amount
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: Balance received successfully
 */
// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// For all data in the database
/**
 * @openapi
 * /account/all:
 *   get:
 *     summary: Get all data in the database
 *     responses:
 *       '200':
 *         description: All Data received successfully
 */
// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

module.exports = app;

app.listen(3001, function () {
    console.log('Server Running on port 3001!');
});