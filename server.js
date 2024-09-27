const http = require('http');
const { v4: uuidv4 } = require('uuid'); 
const url = require('url');

const books = [];


const respondJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};


const parseRequestBody = (req, callback) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    callback(JSON.parse(body));
  });
};


const validateBook = (book) => {
  const { title, author, publisher, publishedDate, isbn } = book;
  if (!title || !author || !publisher || !publishedDate || !isbn) {
    return false;
  }
  if (isNaN(isbn)) {
    return false;
  }
  return true;
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  
  if (req.method === 'GET' && pathname === '/books') {
    respondJSON(res, 200, books);
  } else if (req.method === 'GET' && pathname.startsWith('/books/')) {
    const isbn = pathname.split('/')[2];
    const book = books.find((b) => b.isbn === isbn);
    if (book) {
      respondJSON(res, 200, book);
    } else {
      respondJSON(res, 404, { error: 'Book not found' });
    }


  } else if (req.method === 'POST' && pathname === '/books') {
    parseRequestBody(req, (book) => {
      if (validateBook(book)) {
        book.id = uuidv4(); // Assign a unique ID
        books.push(book);
        respondJSON(res, 201, { message: 'Book added successfully', book });
      } else {
        respondJSON(res, 400, { error: 'Invalid book data' });
      }
    });

  
  } else if ((req.method === 'PUT' || req.method === 'PATCH') && pathname.startsWith('/books/')) {
    const isbn = pathname.split('/')[2];
    const index = books.findIndex((b) => b.isbn === isbn);

    if (index !== -1) {
      parseRequestBody(req, (updatedBook) => {
        if (validateBook(updatedBook)) {
          books[index] = { ...books[index], ...updatedBook };
          respondJSON(res, 200, { message: 'Book updated successfully', book: books[index] });
        } else {
          respondJSON(res, 400, { error: 'Invalid book data' });
        }
      });
    } else {
      respondJSON(res, 404, { error: 'Book not found' });
    }

  
  } else if (req.method === 'DELETE' && pathname.startsWith('/books/')) {
    const isbn = pathname.split('/')[2];
    const index = books.findIndex((b) => b.isbn === isbn);

    if (index !== -1) {
      books.splice(index, 1);
      respondJSON(res, 200, { message: 'Book deleted successfully' });
    } else {
      respondJSON(res, 404, { error: 'Book not found' });
    }

  } else {
    respondJSON(res, 404, { error: 'Endpoint not found' });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
