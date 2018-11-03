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
    
 La API will be runned at ***localhost:3000*** and the mongo database in the ***default port (27017).***

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

## Routes

**Index route**: http://localhost:3000

**Advertisements list page**: http://localhost:3000/adverts/

**API basic route**: http://localhost:3000/api/v1/advertisements


## Detailed Documentation
For more information see the project [wiki] (https://github.com/noemenend/Nodepop/wiki) 

## API Methods
The API provides the following services:

- [**List of advertisements** (paginated, with search filters)](https://github.com/noemenend/Nodepop/wiki/List-of-Advertisements)
- [**Create New Advertisements**](https://github.com/noemenend/Nodepop/wiki/Create-New-Advertisements)
- [**List of existing tags** (advertisement's categories)](https://github.com/noemenend/Nodepop/wiki/List-of-existing-tags)

## Changelog

* 0.0.1: start


## Author

&copy; 2018 Noelia Muñiz Menéndez.
