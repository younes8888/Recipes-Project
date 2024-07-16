// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';


// const secretKey = process.env.SECRET_KEY;

const userControllers = {
        getAllUsers: async (req, res) => {
        try{ 
        const getAllUsersQuery = (`
        SELECT * 
        FROM users`);
        const allUsers = await query(getAllUsersQuery);
        
        if(allUsers.length> 0) {

            res.status(200).json({success: true, users: allUsers});
        } else {
            res.status(401).json({success: false, message: 'Not found'})
        } 
    }catch (error) {
            res.status(500).json({success: false, error: error.message})
        }
    },
        getOneUser: async (req, res) => {
        const {id} = req.params;

        try{
            const getOneUserQuery = `
            SELECT * 
            FROM Users
            WHERE id=?
            `;
            const result = await query(getOneUserQuery,[id])
            if( result.length> 0){
                res.status(200).json({success: true, user: result})
            } else {
                res.status(401).json({success: false, message: 'User Not found'})
            }

        }catch (error){
            console.error(error);
        }
    },
    register: async (req, res) => {
        try {
            const {email, password} = req.body;

        // validate email
        if(!validateEmail(email)){
            return res.status(400).send({error: 'Invalid email'})
        }
        //validate password

        if(!validatePassword(password)){
            return res.status(400).send({error:"invalid password"})
        }
        //check if user already exists
        const checkUserQuery = `
        SELECT *
        FROM users 
        WHERE email= ?
        `
        const findExistingUser = await query(checkUserQuery, [email])
         if(findExistingUser.length>0) {
               return res.status(400).send("User already exists")
            }

        // hash password
        const hashedPassword = hashPassword(password);
        
       //register user query
       const postUserQuery = `
        INSERT INTO Users (email, password)
        VALUES(?,?)
        `
        const result = await query (postUserQuery,[email, hashedPassword])
        res.status(201).json({success: true, newAddedUser: result});

    } catch (error) {
        console.error(error);
        res.status(500).send({error: 'Failed to register'});
    }},

    login: async (req, res) => {
        try{
            const {email, password} = req.body;

            //Finder user by email in the database
       
        const findUserQuery = `
        SELECT * 
        FROM Users 
        WHERE email= ?
        `
        const findUser = await query(findUserQuery, [email]);

         if(findUser.length === 0) {
               return res.status(400).send("Wrong email or password")
            };

            const user = findUser[0];
            
            //compare password

            const passwordMatch = await matchPasswords(password, user.password);
           
            if(passwordMatch){
                const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '1h'})
               res.cookie('token', token, {
                httpOnly: true,
                maxAge: 8000000 })
                return res.status(200).json({message: 'Logged in successfully', token})
            }   else {
                return res.status(401).send({error: 'Invalid email or password'});
            }
        } catch (error){
            console.error(error);
            return res.status(500).send({error: 'Login  failed'});
        }
    },

    logout: async (req, res) => {
        
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if(!token) { 
               return res.status(401).send({message: 'No token provided'});
            }
            // verify token

            jwt.verify(token,secretKey);
            
            return res.status(200).send({message: " logged out successfully"})

       } catch (error) {
            console.error(error)
            res.status(401).send({message: 'Invalid token'})
       }
    },
};


export default userControllers;
