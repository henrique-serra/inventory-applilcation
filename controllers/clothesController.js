import Database from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const db = new Database();

const validator = [

];

class ClothesController {
    async clothesGet(req, res) {
        const clothes = await db.getAllClothes();
        console.log(clothes);
        res.render('clothes', { title: 'Clothes', clothes });
    }

    async clothesCreateGET(req, res) {
        res.render('clothesCreate', { title: 'Create new clothing' });
    }

    async clothesCreatePOST(req, res) {
        console.log(req.body.description);
        res.render('clothesCreate', { title: 'Create new clothing' });
    }
}

const clothesController = new ClothesController();

export default clothesController;