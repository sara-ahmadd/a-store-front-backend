/* Replace with your SQL commands */
CREATE TABLE users ( 
    id SERIAL PRIMARY KEY,
    email VARCHAR (255) NOT NULL UNIQUE,
    firstName VARCHAR (255) NOT NULL,
    lastName VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL
); 