# Nodepop API


![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYrnMZSLhIMSnI-eY54gTfYjgIolAITNrP1rnugcd0RvxH_4FjIg)

**Practical Exercise JS/Node.js/MongoDB - KeepCoding Bootcamp Web IV**

Backend to support an application for selling second-hand items on IOS or Android platforms.A Mongo database will be used in which ads and registered users will be uploaded. The user registration will be carried out with json web token. Each announcement will show the following data:

   * Item name
   * If the item is posted for its sell or it is being searched for buy it
   * Price. It will be the price of the item if it is a sale offer. In case it is a 'wanted' ad it will be the price that the 	
     applicant would be willing to pay.
   * Item image. 
   * Item Tags.It may contain one or several of these four: work, lifestyle, motor and mobile.
    
 The API will be runned at ***localhost:3000*** and the mongo database in the ***default port (27017).***

## Installation

### Minimum Requirements:

- Node >= 4.0
- MongoDB
- Git

### Getting the application
 ```Bash
	$ git clone https://github.com/noemenend/Nodepop.git
	$ cd nodepop
	$ npm install
```

### Previous to running application

You can install the default data:
```Bash
	$ npm run installDB
```
The default data loaded into the database is several adverts and a user for the API Authentication.

   * Name:Administrador
   * email:noeliamm@gmail.com
   * password:1234 (This key will be stored encrypted with a hash.)
	
	
### Run the application

- On Development mode:
```Bash
	$ npm run dev
```

- On Production mode:
```Bash
	$ npm start
```

Once running, copy .env.example to .env and review the values.

## EsLint
```Bash
	$ npm run eslint
```

## Test (Supertest & Mocha)
```Bash
	$ npm run test
```

## Routes - Web Application

**Index route**: http://localhost:3000 (Home Page)

**Login Route**: http://localhost:3000/login

**Logout Route**: http://localhost:3000/logout

**Advertisements list page**: http://localhost:3000/adverts/ (Demo Page) -- Privated you have to login to can see the demo


## Routes - API

**API basic route**: http://localhost:3000/api/v1/advertisements

**API JWT authentication**: http://localhost/api/v1/users/authenticate

## Internationalization

The Nodepop web is multi-language. The available languages are English (EN) and Spanish (ES).
The user can change the language whith a multi-language selector available in the Web menu.

## Detailed Documentation
For more information see the project [wiki] (https://github.com/noemenend/Nodepop/wiki) 

## API Methods
The API provides the following services:

- [**List of advertisements** (paginated, with search filters)](https://github.com/noemenend/Nodepop/wiki/List-of-Advertisements)
- [**Create New Advertisements**](https://github.com/noemenend/Nodepop/wiki/Create-New-Advertisements)
- [**List of existing tags** (advertisement's categories)](https://github.com/noemenend/Nodepop/wiki/List-of-existing-tags)
- [**JWT Authentication** (jwt authentication for use the api)](https://github.com/noemenend/Nodepop/wiki/API-JWT-Authentication)


## Changelog

* 0.0.1: start
* 1.0.0: Adding Internationalization, JWT Authentication & background task to upload the thumbnails of the adverts images.


## Author

&copy; 2018 Noelia Muñiz Menéndez.
