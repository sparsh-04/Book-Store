import booksRoute from './routes/booksroute.js' 
import express, { response } from 'express';
import { PORT,MONGO_URI } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookmodel.js';
import cors from 'cors';

const app = express();
// Middleware for parsing a request body
app.use(express.json());

// Middleware for CORS policy 
app.use(cors());

// app.use(cors(
//     {
//         origin:'http://localhost:5555',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     }
// ));

app.use('/books', booksRoute);

app.get('/', (req, res) => {
    console.log(req);
    res.status(243).send('Hello World');
    });


// // Save a new Book
// app.post('/books', async (req, res) => {
//     try {
//         if(!req.body.title || !req.body.author || !req.body.publishYear) {
//             return res.status(400).send('Title, author and publishYear are required');
//         }
//         const newbook = {
//             title: req.body.title,
//             author: req.body.author,
//             publishYear: req.body.publishYear,
//         };
//         const book = await Book.create(newbook);
//         return res.status(201).send(book);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }
   
// });


// // Route to get all books in database
// app.get('/books', async (req,res)=> {
//     try {
//         const books = await Book.find({});
//         return res.status(201).json({
//             count:books.length,
//             data:books

//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }
// });

// // Route to get one book in database
// app.get('/books/:id', async (req,res)=> {
//     try {
//         const {id} = req.params;

//         const books = await Book.findById(id);
//         return res.status(200).json({
//             books

//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }
// });

// // Route to update one book in database
// app.put('/books/:id', async (req,res) => {
//     try {
//         if(!req.body.title || !req.body.author || !req.body.publishYear) {
//             return res.status(400).send('Title, author and publishYear are required');
//         }
//         const {id} = req.params;
//         const result = await Book.findByIdAndUpdate(id, req.body);
//         if(!result) {
//             return res.status(404).send('Book not found');
//         }

//         return res.status(200).send('Book updated');
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }
// });

// // Route to delete one book in database
// app.delete('/books/:id', async (req,res) => {
//     try {
//         const {id} = req.params;
//         const result = await Book.findByIdAndDelete(id);
//         if(!result) {
//             return res.status(404).send('Book not found');
//         }
//         return res.status(200).send('Book deleted');
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }
// });

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    }).catch((error) => {
        console.log('Error connecting to MongoDB');
        console.error(error);
    });