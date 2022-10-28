// Andrew Lavina 
// 301226078
// COMP 229 SEC 401 
// MID-TERM

// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {

    // find all books in the books collection
    booksModel.find((err, books) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', book: books });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

res.render('index', { title: 'Add Book', page: 'books/add', books: {} });

}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

let newBook = booksModel({
    name: req.body.name,
    price: req.body.price,
    published: req.body.published,
    author: req.body.author,
    description: req.body.description
});

booksModel.create(newBook, (err, books) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.redirect('/books/list');
});

}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {
    let id = req.params.id;
    
    booksModel.findById(id, (err, books) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    
        // show the edit view
        res.render('index', { title: 'Edit Book', page: 'books/edit', book: books });
    });
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
        
        let id = req.params.id;
        
        let newBook = booksModel({
            _id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            published: req.body.published,
            author: req.body.author,
            description: req.body.description
        });
        
        booksModel.updateOne({_id: id}, newBook, (err, book) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
        
            res.redirect('/books/list');
        });
        
}

// GET - process the delete by user id
export function processDelete(req, res, next) {

let id = req.params.id;

booksModel.remove({_id: id}, (err) => {
    if (err) {
        console.error(err);
        res.end(err);
    }

    res.redirect('/books/list');
});

}