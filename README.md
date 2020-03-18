# Fullstackopen Course: Part-3

This repository contains code for exercises of part-3, 4 and 5 of the fullstack course from https://fullstackopen.com/en/ 
These parts include creating and running an express server, deploying the fullstack app to Heroku, adding a MongoDB database to the application, linting using ESlint, testing express server and api using jest and supertest, user authentication using jsonwebtokens and so on.

**Different branches correspond to different Parts of the course**

### Branch:'master'
Exercises for part 3a and 3b, where a simple fullstack app is built that can show, add, delete and append phone numbers. Database hasn't been added yet. The app is deployed to Heroku. 

**Learning Outcomes**
```
  REST Api, express server, middlewares, handling http requests
  HTTP request and response types, 
  Testing api calls using POSTMAN and VS Code Rest client
  Running Morgan midddleware to display requests in the server,
  Deploying simple front and backend to Heroku
  
```
*Screenshot:*

![GitHub Logo](https://github.com/Prashanga/Images-For-Web/blob/master/3.1.png)



### Branch:with-mongoose

This branch contains exercises for parts 3c and 3d from the course. It intorduces MOngoDB as the application's database. The queries to the database is handled by Mongoose and the database is stored in MongoDB Atlas. It also covers handling of errors in the backend and when connecting to and quering the database using a separate middleware for error handling. The database is connected to the app deployed in Heroku. Finally, ESLint is added to the application.

**Learning Outcomes**
```
MongoDB, mongoose, database queries
Handling asynchronous requests and responses to and from the databases
Linting using ESlint
Error handling

```

## Part 4: Branch 'Part-4'
This part covers testing of backend applications. Jest is used to test the backend helper functions and Supertest is used to test backend APIs. The application also contains login system that can authenticate username and passwordhash stored in the database.

**Learning Outcomes**
```

Testing helper functions and APIs with jest and supertest
Authentication with web tokens using json-web-tokens package
Handling asynchronous requests with async/await
Defining and using mongoose schema
Creating and authenticating users: creating a login system
Hashing password using bcrypt
Better error handling

```
*Screenshot:*

![GitHub Logo](https://github.com/Prashanga/Images-For-Web/blob/master/4.1.png)

The screenshot is after the frontend has been implemented in part 5
