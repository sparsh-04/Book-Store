import express from 'express';
import {Book} from '../models/bookmodel.js';

const router = express.Router();


// Save a new Book
router.post('', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send('Title, author and publishYear are required');
        }
        const newbook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newbook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
   
});


// Route to get all books in database
router.get('', async (req,res)=> {
    try {
        const books = await Book.find({});
        return res.status(201).json({
            count:books.length,
            data:books

        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

// Route to get one book in database
router.get('/:id', async (req,res)=> {
    try {
        const {id} = req.params;

        const books = await Book.findById(id);
        return res.status(200).json({
            books

        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

// Route to update one book in database
router.put('/:id', async (req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send('Title, author and publishYear are required');
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result) {
            return res.status(404).send('Book not found');
        }

        return res.status(200).send('Book updated');
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

// Route to delete one book in database
router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return res.status(404).send('Book not found');
        }
        return res.status(200).send('Book deleted');
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});


export default router;