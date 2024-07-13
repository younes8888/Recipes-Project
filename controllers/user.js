import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';
import pool from '../config/db.js';

const users = [];
const secretKey = 'Bearer 123';

const userControllers = {
    register: async (req, res) => {
        try {
            //Check User
            const {email, password} = req.body;
            const findUser = users.find((data) => email == data.email);
            if(findUser) {
                res.status(400).send("User already exists")
            }
            //Hash password
            users.push({email, password: hashPassword});
            console.log(users);
            res.status(201).send("Registered successfully")
        }catch (error) {
        
            res.status(500).send({error: 'failed to register'})
        }
    },

    login: async (req, res) => {
        try{
            const {email, password} = req.body;
            //Finder user
            const findUser = users.find((data)=> email == data.email);
            if(!findUser){
                res.status(400).send("wrong email or password");
            }
            
            const passwordMatch = await bcrypt.compare(password, matchPasswords(password, findUser.password))
            if(passwordMatch){
                res.status(200).send('Logged in successfully')
            }   else {
                res.status(401).send({error: 'Invalid email or password'});
            }
        } catch{
            res.status(500).send({error: 'Login  failed'})
        }
    },

    logout: async (req, res) => {
        
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) { 
            res.status(401).send({message: 'No token provided'});
        }
        try {
            jwt.verify(token,secretKey);
            res.status(200).send({message: " logged out successfully"})

       } catch {
            res.status(401).send({message: 'Invalid token'})
       }
    },
};


export default userControllers;
