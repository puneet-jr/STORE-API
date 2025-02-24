# Store API

## Description
Store API is a Node.js and Express.js application that provides a RESTful API for managing product data. It connects to a MongoDB database and supports features like sorting, filtering, pagination, and data population.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variable management
- express-async-errors for handling async errors
- Nodemon for development

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd store-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   mongo_url=<your-mongodb-connection-string>
   ```

### Running the Application
Start the server with:
```sh
npm start
```
The server runs on `http://localhost:5000` by default.

## API Endpoints

### Base URL
```
http://localhost:5000/api/v1/products
```

### Routes

#### Home Route
- `GET /`
  - Returns a simple message confirming the API is running.

#### Products Routes
- `GET /api/v1/products/static`
  - Returns a static list of products.
- `GET /api/v1/products/allproducts`
  - Returns a filtered list of products based on query parameters.
  - Query Parameters:
    - `featured` (Boolean) – Filters products by featured status.
    - `company` (String) – Filters products by company.
    - `name` (String) – Searches for a product by name.
    - `sort` (String) – Sorts products by a specified field.
    - `limit` (Number) – Limits the number of products returned.
    - `page` (Number) – Specifies pagination.

Example usage:
```
GET /api/v1/products/allproducts?company=google&sort=price&limit=2&page=1
```

## Database Connection
The application connects to MongoDB using Mongoose. The connection is established in `db/connect.js` using the `mongo_url` from the `.env` file.

## Populating the Database
To populate the database with sample products, run:
```sh
node populate.js
```
This script connects to the database, clears existing data, and inserts sample products from `products.json`.

## Error Handling
- Routes not found are handled by `middlewares/notfound.js`.
- General errors are handled by `middlewares/error.js`.

## Project Structure
```
store-api/
│── db/
│   ├── connect.js
│── middlewares/
│   ├── error.js
│   ├── notfound.js
│── models/
│   ├── product.js
│── routes/
│   ├── product.js
│── controllers/
│   ├── product.js
│── products.json
│── populate.js
│── app.js
│── package.json
│── .env.example
```

## Future Enhancements
- Implement authentication and authorization.
- Improve validation and input sanitization.
- Add more query options for filtering and sorting.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

