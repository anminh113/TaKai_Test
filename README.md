# TaKai_Test

## Technologies

* NodeJS
* Express Framework
* BD: Mongodb

## Setup

Setup your local
- Download the repository

- Create .env file based on .env.local file

- Install dependencies
```
npm install
```
- Run the project
```
npm start
```
- Import takai-test.postman_collection.json file to Postman
- About API transfer transaction data to database by CSV file please add "x-access-token" key and "token" value from login API to header

Finally, navigate to `http://localhost:3000` and you should see the template being served.

## Structure

```
├── src
│   ├── middleware
│   │   └── auth.js
│   │
│   ├── controllers
|   |   ├── TransactionController.js
│   │   └── UserController.js
│   │
│   ├── models
│   │   ├── transaction.js
│   │   └── user.js
│   │
│   ├── routes
│   │   ├── transaction.js
│   │   └── user.js
│   │
│   └── app.js
│
├── .gitignore
├── .env
├── .env.local
├── package.json
├── takai-test.postman_collection.json
└── README.md

```
## Features
* API register user
* APT login and get token access to transfer data
* API transfer transaction data to database by CSV file

## Contact
Created by [DuyHuynh](https://github.com/anminh113)