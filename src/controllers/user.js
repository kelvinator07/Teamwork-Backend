import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { isValidEmail, validatePassword, isEmpty } from '../helpers/validation';
import { errorMessage, successMessage, status } from '../helpers/status';
import { jwtSecretToken } from '../settings';
import Model from '../models/models';

dotenv.config();

const users = new Model('users');


exports.signup = async (req, res) => {

    const { email, firstname, lastname, password, gender, jobrole, department, address, avatarurl, userrole } = req.body;

    const createdat = moment(new Date());
    const updatedat = moment(new Date());
    

    if (isEmpty(email) || isEmpty(firstname) || isEmpty(lastname) || isEmpty(password)) {
        errorMessage.error = 'Email, password, first name and last name field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }
    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).send(errorMessage);
    }

    const saltRounds = 10;
    // Hash password
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    const columns = 'email, firstname, lastname, password, gender, jobrole, department, address, avatarurl, userrole, updatedat, createdat';
    const values = `'${email}', '${firstname}','${lastname}', '${hashedPassword}', '${gender}', '${jobrole}',
                    '${department}', '${address}', '${avatarurl}', '${userrole}', '${updatedat}', '${createdat}'`;


    try {
        // Check If Email Exists from DB
        const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await users.query(checkUserQuery, [email]);
        const dbResponse = rows[0];

        if (dbResponse) {
            errorMessage.error = 'Email Already Exist!';
            return res.status(status.bad).send(errorMessage);
        }

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }


    try {

        const { rows } = await users.insertWithReturnId(columns, values);        
        const dbResponse = rows[0];
        
        const token = jwt.sign(
            {userId: dbResponse.id},
            jwtSecretToken,
            {expiresIn: '24h'});
        delete dbResponse.password;
        
        successMessage.data = dbResponse;
        successMessage.data.message = "User account successfully create";
        successMessage.data.token = token;
        return res.status(status.created).send(successMessage);

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};


exports.signin = async (req, res) => {

    const { email, password } = req.body;

    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }

    const signinUserQuery = 'SELECT * FROM users WHERE email = $1';

    try {
        // Get User from DB
        const { rows } = await users.query(signinUserQuery, [email]);
        const dbResponse = rows[0];

        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.bad).send(errorMessage);
        }

        // compare password If user is found
        const valid = await bcrypt.compare(password, dbResponse.password);

        if (!valid) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }

        const token = jwt.sign(
            {userId: dbResponse.id},
            jwtSecretToken,
            {expiresIn: '24h'});
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);

    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};
