# Book Directory API

A simple RESTful API built with Node.js that allows users to manage a directory of books. This API supports basic CRUD (Create, Read, Update, Delete) operations and validates the data for each book.

## Features

* GET: Retrieve a list of all books or a specific book by ISBN.
* POST: Add a new book to the directory.
* PUT/PATCH: Update details of an existing book.
* DELETE: Remove a book from the directory by ISBN.
* Uses JSON for data exchange.
* Basic validation and error handling are implemented.


## Prerequisites

To run this project, you need to have the following installed:

* [Node.js](https://nodejs.org/) (version 14.x or higher)
* [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup

Clone this repository or download the files:

bash
Copy code
git clone https://github.com/yourusername/book-directory.git
cd book-directory
Install the required dependencies:

bash
Copy code
npm install
The main dependency is:

uuid: Used to generate unique IDs for each book.

##Start the server:

bash
Copy code
node server.js
The server will start on http://localhost:3000.

Endpoints
GET /books
Retrieve a list of all books in the directory.

## Response:

json
Copy code
[
  {
    "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publisher": "Charles Scribner's Sons",
    "publishedDate": "1925",
    "isbn": "9780743273565"
  }
]
GET /books/
Retrieve a specific book by its ISBN.

## Response:

json
Copy code
{
  "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publisher": "Charles Scribner's Sons",
  "publishedDate": "1925",
  "isbn": "9780743273565"
}
POST /books
Add a new book to the directory.

Request Body:

json
Copy code
{
  "title": "1984",
  "author": "George Orwell",
  "publisher": "Secker & Warburg",
  "publishedDate": "1949",
  "isbn": "9780451524935"
}

## Response:

json
Copy code
{
  "message": "Book added successfully",
  "book": {
    "id": "e1f2g3h4-i5j6-7890-1234-56789abcdef0",
    "title": "1984",
    "author": "George Orwell",
    "publisher": "Secker & Warburg",
    "publishedDate": "1949",
    "isbn": "9780451524935"
  }
}
PUT /books/
Update the details of an existing book.

Request Body:

json
Copy code
{
  "title": "1984 (Updated Edition)",
  "author": "George Orwell",
  "publisher": "Secker & Warburg",
  "publishedDate": "1949",
  "isbn": "9780451524935"
}

## Response:

json
Copy code
{
  "message": "Book updated successfully",
  "book": {
    "id": "e1f2g3h4-i5j6-7890-1234-56789abcdef0",
    "title": "1984 (Updated Edition)",
    "author": "George Orwell",
    "publisher": "Secker & Warburg",
    "publishedDate": "1949",
    "isbn": "9780451524935"
  }
}
DELETE /books/
Remove a book from the directory by its ISBN.

## Response:

json
Copy code
{
  "message": "Book deleted successfully"
}

## Error Handling

The API provides meaningful HTTP status codes and error messages in response to invalid requests:

* 400 Bad Request: If the book data is missing or invalid (e.g., missing fields, non-numeric ISBN).
* 404 Not Found: If the requested book or endpoint does not exist.
* Book Data Structure
* Each book in the directory contains the following fields:

id (generated automatically, UUID format)
title (string, required)
author (string, required)
publisher (string, required)
publishedDate (string, required)
isbn (string, required, must be a valid number)
Example Usage
You can test the API using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/).

For example, to retrieve all books:

bash
Copy code
curl -X GET http://localhost:3000/books
To add a new book:

bash
Copy code
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{
  "title": "1984",
  "author": "George Orwell",
  "publisher": "Secker & Warburg",
  "publishedDate": "1949",
  "isbn": "9780451524935"
}'
