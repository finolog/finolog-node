# Finolog-node

> Official Node bindings to the Finolog API

## Installation

```bash
$ npm install --save finolog-node
```

## Testing

create .env file with params api_token=your_api_token

```bash
$ npm test
```

## Documentation

[Documentation by Finolog](https://api.finolog.ru/docs "Finolog API")


## Usage

```js
import Finolog from 'finolog-node';
const finolog = new Finolog('your api token key');

// or 

import { User, Contractor } from 'finolog-node';
const user = new User('your api token key');
const contractor = new Contractor('your api token key');

// or require

const Finolog = require('finolog-node');
const finolog = new Finolog.Client('your api token key');
```

### User
```js
// receives information about an authorized user
finolog.user.get().then(user => {
   // user is the response from the server.
});

// updates the information to an authorized user
finolog.user.update({first_name: 'first name', last_name: 'last name'}).then(user => {
   // user is the response from the server.
});
```

### Currency
```js
finolog.currency.all().then(currency => {
    // currency is the response from the server 
});
```

### Biz
```js
// get information about business
finolog.biz.get({ id: 1 }).then(biz => {
   // biz is the response from the server 
});

// get information about all business
finolog.biz.all().then(biz => {
   // biz is the response from the server 
});

// add new business
finolog.biz.add({name: 'new name', base_currency_id: 1 }).then(biz => {
   // biz is the response from the server 
});

// update business information
finolog.biz.update({ id: 1, name: 'name'}).then(biz => {
   // biz is the response from the server 
});

// delete business
finolog.biz.delete({ id: 1 }).then(biz => {
   // biz is the response from the server 
});
```

### Company 
```js
// get information about company
finolog.company.get({ biz_id: 1, id: 1 }).then(company => {
    // company is the response from the server 
});

// get information about all company from business
finolog.company.all({ biz_id: 1 }).then(company => {
    // company is the response from the server 
});

// add new company
finolog.company.add({ biz_id: 1, name: 'company name' }).then(company => {
    // company is the response from the server 
});

// update company information
finolog.company.update({ biz_id: 1, id: 1, name: 'new company name' }).then(company => {
    // company is the response from the server 
});

// delete company
finolog.company.delete({ biz_id: 1, id: 1 }).then(response => {
    // response {success: true}
})
```

### Account
```js
// get information about account
finolog.account.get({ biz_id: 1, id: 1 }).then(account => {
    // account is the response from the server 
});

// get information about all account
finolog.account.all({ biz_id: 1 }).then(accounts => {
    // accounts is the response from the server 
});

// add new account
finolog.account.add({ 
    biz_id: 1, 
    company_id: 1, 
    currency_id:1, 
    name: 'account name', 
    initial_balance: 1000
}).then(account => {
    // account is the response from the server 
});

// update account information
finolog.account.update({ biz_id: 1, id: 1, name: 'new name' }).then(account => {
    // account is the response from the server 
});

// delete account
finolog.account.delete({ biz_id: 1, id: 1 }).then(response => {
    // response {success: true}
});
```

### Transaction
```js
// get information about transaction
finolog.transaction.get({ biz_id: 1, id: 1 }).then(transaction => {
   // transaction is the response from the server 
});

// get information about all transactions
finolog.transaction.all({ biz_id: 1 }).then(transactions => {
   // transactions is the response from the server 
});

// add new transaction
finolog.transaction.add({
    biz_id: 1, 
    from_id: 1, 
    date: '2018-01-01', 
    value: 1000
}).then(transaction => {
    // transaction is the response from the server 
});

// update transaction information
finolog.transaction.update({ biz_id: 44, id: 344, value: 3440 }).then(transaction => {
    // transaction is the response from the server 
});

// delete transaction
finolog.transaction.delete({ biz_id: 1, id: 1 }).then(response => {
    // response {success: true}
});

// split transaction
finolog.transaction.split({
    biz_id: 1,
    id: 1, 
    items: [
        { value: 100 },
        { value: 200 }
    ]
}).then(transactions => {
    // transactions is the response from the server 
});

//cancel split transaction
finolog.transaction.cancel({ biz_id: 1, id: 1}).then(transaction => {
    // transaction is the response from the server 
});
```

### Category
```js
// get information about category
finolog.category.get({ biz_id:1, id: 1 }).then(category => {
    // category is the response from the server 
});

// get information about all categories
finolog.category.all({ biz_id: 1 }).then(categories => {
    // categories is the response from the server 
});

// add new category
finolog.category.add({ biz_id: 1, name: 'name', type: 'in' }).then(category => {
    // category is the response from the server 
});

// update category information
finolog.category.update({ biz_id:1, id: 3455, name: 'new name' }).then(category => {
    // category is the response from the server 
});

// delete category
finolog.category.delete({ biz_id: 1, id: 1 }).then(category => {
    // category is the response from the server 
});
```

### Project
```js
// get information about project
finolog.project.get({ biz_id: 1, id: 1 }).then(project => {
    // project is the response from the server 
});

// get information about all projects
finolog.project.all({ biz_id: 1 }).then(projects => {
    // projects is the response from the server 
});

// add new project
finolog.project.add({ biz_id: 1, currency_id: 1, name: 'name' }).then(project => {
    // project is the response from the server 
});

// update project information
finolog.project.update({ biz_id: 1, id: 1, name: 'new name' }).then(project => {
    // project is the response from the server 
});

// delete project
finolog.project.delete(project => {
   // project is the response from the server 
});
```

### Contractor
```js
// get information about contractor
finolog.contractor.get({ biz_id: 1, id: 1 }).then(contractor => {
    // contractor is the response from the server 
});

// get information about all contractors
finolog.contractor.all({ biz_id: 1 }).then(contractors => {
    // contractors is the response from the server 
});

// add new contractor
finolog.contractor.add({ biz_id: 1, name: 'name' }).then(contractor => {
    // contractor is the response from the server 
});

// update information contractor
finolog.contractor.update({ biz_id: 1, id: 1, name: 'new name' }).then(contractor => {
    // contractor is the response from the server 
});

// delete contractor
finolog.contractor.delete({ biz_id: 1, id: 1 }).then(contractor => {
    // contractor is the response from the server 
});
```

### Requisite
```js
// get information about requisite
finolog.requisite.get({ biz_id: 1, id: 1 }).then(requisite => {
     // requisite is the response from the server 
});

// get information about all requisites
finolog.requisite.all({ biz_id: 1 }).then(requisites => {
    // requisites is the response from the server 
});

// add new requisite
finolog.requisite.add({ biz_id: 1, contractor_id: 1, name: 'name' }).then(requisite => {
    // requisite is the response from the server 
});

// update requisite information
finolog.requisite.update({ biz_id: 1, id: 1, name: 'new name' }).then(requisite => {
    // requisite is the response from the server 
});

// delete requisite
finolog.requisite.delete({ biz_id: 1, id: 1 }).then(requisite => {
    // requisite is the response from the server 
});
```

### Request

```js
/**
 * method - example: 'get', 'post', 'put', 'delete',
 * url - example: '/user', '/biz', etc. Without prefix v1
 * payload - example: { id: 2, name: 'test' }
 */
finolog.request(method, url, payload).then(response => {
    // response from the server
});
```

## Examples

### Example 1
```js
import Finolog from 'finolog-node';

const finolog = new Finolog('your api token');

finolog.biz.all().then(biz => {
    finolog.contractor.add({ biz_id: biz[0].id, name: 'test contractor' }).then(contractor => {
        console.log(contractor);
    }).catch(error => {
        console.log(error);
    });
}).catch(error => {
    console.log(error);
});
```

### Example 2
```js
import Finolog from 'finolog-node';

const finolog = new Finolog('your api token', 5462); // 5462 - biz_id

// without biz_id, because biz_id = 5462
finolog.contractor.all().then(contractors => {
   console.log(contractors); 
}).catch(error => {
    console.log(error);
});
```

### Example 3
```js
import { User } from 'finolog-node';

const user = new User('your api token');

user.update({ first_name: 'New first name' }).then(user => {
   console.log(user); 
});
```
