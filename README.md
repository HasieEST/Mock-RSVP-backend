# RSVP Web Application 
##Warning: Some of this README is still in editorial phase, as I am currently learning how to convert this application over to ORM style.


This is a mock RSVP web application built with MySQL and Node.js.

To access the frontend repository, visit [Frontend Repository URL](URL).

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

Set up the MySQL database and import the necessary schema. Refer to [schema.sql](schema.sql) for the database schema.

To import the schema into your MySQL database:

1. Open your MySQL Client.
2. Create a new database (if not created already) using `CREATE DATABASE your_database_name;`.
3. Use the created database: `USE your_database_name;`.
4. Import the schema.sql file: `source /full/path/to/your/folder/schema.sql;` or `source schema.sql;` if schema file is in the current working directory of your MySQL session.

## Usage

Start the server using the following command: 

```Bash
npm start
```

This will run the server, allowing you to access the RSVP web application. Port by default is 3006, which can be changed in [server.js](server.js) near the end of the file.


## License 

This project is licensed under the [MIT License](https://opensource.org/license/mit/). 
