# RSVP Web Application 
## Warning: Some of this README is still in editorial phase, as I am currently learning how to convert this application over to ORM style.


This is a mock RSVP web application built with MySQL and Node.js.

To access the frontend repository, visit [Frontend Repository URL](https://github.com/ragnar1n/rsvp-front/tree/master).
THIS IS ORM VERSION of the backend. FOR non-orm backend, please choose a branch named non-orm.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

### Fork or Clone

To clone this repository, use the following command:

```bash
git clone https://github.com/HasieEST/Mock-RSVP-backend.git

```

You can also use <> CODE dropdown menu at the top and choose to download a zip file, which you can extract anywhere within your system.

### Node Modules Installation

Navigate to the project directory (replace `path/to/project` with the actual folder or drive path where your project is located) and install the required Node.js modules:

```bash
cd path/to/project/RSVP-Web-Application
npm install
```
### Environment Variables

To run this application, you need to set up the following environment variables:

- `DB_HOST`: The host name or IP address of your MySQL database.
- `DB_USER`: The username to access the MySQL database.
- `DB_PASSWORD`: The password for the specified user.
- `DB_NAME`: The name of the MySQL database.
- `JWT_KEY`: Secret key for JSON Web Token (JWT) encryption.

You can set these environment variables by different methods:

#### Method 1: Using a `.env` File

Create a `.env` file in the root directory of your project and add the following content:
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_KEY=your_jwt_secret_key

Replace `your_db_host`, `your_db_user`, `your_db_password`, `your_db_name`, and `your_jwt_secret_key` with your actual database and JWT key details.

#### Method 2: Command Line

Set the environment variables using the command line:

```bash
export DB_HOST=your_db_host
export DB_USER=your_db_user
export DB_PASSWORD=your_db_password
export DB_NAME=your_db_name
export JWT_KEY=your_jwt_secret_key
```

### Databse setup

This version of backend autogenerates all tables and associations itself upon inital launch, therefor you do not have to do anything beyond confirming that you have created .env file and filled every required key with correct values.

## Usage

Start the server using the following command: 

```Bash
npm start
```

This will run the server, allowing you to access the RSVP web application. Port by default is 3006, which can be changed in [server.js](server.js) near at the start of the file.


## License 

This project is licensed under the [MIT License](https://opensource.org/license/mit/). 
