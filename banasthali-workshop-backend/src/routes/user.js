import express from 'express';
import database from '../services/database.js';
import common from '../utils/common.js';

const router = express.Router();

router.post('/register', async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const saveUser = {
            name,
            email: email.toLowerCase(),
            password
        };
        const existingUser = await database.getUserByEmail(saveUser.email);
        if(existingUser){
            return res.status(409).json({message: 'User already exists'});
        }
        const data = await database.createUser(saveUser);
        delete data.password;
        res.status(201).json({message: 'User created successfully', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.post('/login', async (req, res)=>{
    try{
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        const data = await database.getUserByEmail(email);
        if(!data){
            return res.status(404).json({message: 'User not found'});
        }
        const isPasswordValid = common.comparePassword(password, data.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = common.signPayload({id: data.id, email: data.email});
        res.status(201).json({message: 'User logged in successfully', token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.get('/profile', async (req, res)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: 'Authorization header missing'});
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'Token missing'});
        }
        const decoded = common.verifyToken(token);
        console.log('Decoded token:', decoded);
        const data = await database.getUserByEmail(decoded.email);
        if(!data){
            return res.status(404).json({message: 'User not found'});
        }
        delete data.password;
        res.status(200).json({message: 'User profile fetched successfully', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

export default router;