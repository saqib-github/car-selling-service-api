# Car Selling Request App

This is a simple application for submitting a request for a car-selling service. It allows users to submit their vehicle's information along with personal details, including car model, price, phone number, and city. Users can also upload pictures of their vehicle, with a maximum of 10 images allowed.

## Features

- User authentication using JWT tokens.
- Mobile responsive frontend built with Next.js and Bootstrap.
- The backend is built with Node.js, Express.js, and MongoDB.
- Image upload and storage using multer.
- RESTful APIs for communication between frontend and backend.

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saqib-github/car-selling-service-api.git
   ```

2. Install dependencies:

   ```bash
   cd car-selling-request-app
   npm install
   ```

3. Set environment variables:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
     PORT=4000
     JWT_SECRET=your_secret_key
     DATABASE_URL=mongodb://localhost:27017/car-selling-app
   ```

4. Seed the database:

   Run the seed script to populate the database with initial data:

   ```bash
   npm run seed
   ```

5. Seed the database:
Create an uploads folder in the parent directory before starting the server:

6. Start the server:

   ```bash
   npm start
   ```

7. Access the application at `http://localhost:4000`.

### Usage

Register or log in with the provided credentials.
2. Fill out the car selling request form with the required information.
3. Upload up to 10 pictures of your vehicle.
4. Submit the form to save the request.

## Deployment

Before deploying the application, make sure to set the `NODE_ENV` environment variable to `production` in the `.env` file.

To deploy the application to a hosting service like Heroku, follow these steps:

1. Create a Heroku account and install the Heroku CLI.
2. Login to Heroku from the CLI:

   ```bash
   heroku login
   ```

3. Create a new Heroku app:

   ```bash
   heroku create your-app-name
   ```

4. Set the `JWT_SECRET` environment variable:

   ```bash
   heroku config:set JWT_SECRET=your_secret_key
   ```

5. Deploy the application:

   ```bash
   git push heroku main
   ```

6. Open the deployed app in your browser:

   ```bash
   heroku open
   ```

## Contributing

Contributions are welcome!

## License

This project is licensed under the MIT License
