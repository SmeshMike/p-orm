# porm
Node js ORM for PostgreSQL database. The whole perpose of that package is to make sql requests easier to write with JS, 
to create "SELECT someStaff FROM staffWareHouse" by writing 
```js
 staffWareHouse.select('someStaff')
``` 
etc.

## How to use it?

So what do we have? 

```js
{PgConnecter, PgObj, compileModelsByScripts, pgUtils} = require("porm")
```

Lets understand what is that and how to use it.

### PgConnecter

PgConnecter is a class that will help you to create connection with your Postgres DataBase. 
```js
 let pgConnecter = new PgConnecter()
 await pgConnecter.connect(connectionParameters);
```

You can use declare ```connectionParameters``` in several ways:

With configuration object 
```js
const connectionObj = {
    host: 'localhost',
    port: 5432,
    database: 'my-database-name',
    user: 'user-name',
    password: 'user-password',
    max: 30

await pgConnecter.connect(connectionObj);
```

or with connection string 

```js
const connectionStr = 'postgres://john:pass123@localhost:5432/products'

await pgConnecter.connect(connectionStr);
```
You will need it later, to execute your requests to database
This class exists only because of [pg-promise](https://github.com/vitaly-t/pg-promise), so  lets say thanks to it creator and visit 
his repo for more information.

### PgObj

PgObj is a class that implements table object. To creater it you will need name of able in your database, db connecter(pgConnecter) and model of your table

```js

await pgConnecter.connect(connectionStr);
tableObj = new PgObj('table', pgConnecter, tableModel)

```

That might be clear. But what is model in parameters? Model is dictionary where keys are the names of columns and values are their default values.
For example:

```js
  let userModel = {id: null, gender: null, isHeOrSheAwesome: true}
```

### compileModelsByScripts

Another way to create model is to create it by table creation script.
Here ```compileModelsByScripts()``` goes.

Imgine that you have a file with sql script like this in ```./scripts``` directory:

```SQL
CREATE TABLE IF NOT EXISTS public.user
(
	id SERIAL,
    another_id integer NOT NULL,
	mode VARCHAR DEFAULT 'unauthorized',
	eyes_nubmer integer DEFAULT 2,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_user_id_key UNIQUE (user_id, bot_instance)
);
```

than if you write

```js
models = compileModelsByScripts('./scripts')

//model - {user : {model}}

yourScriptModel = models['user']

//yourScriptModel - {another_id: null, creationScript: theWholeScriptText, eyes_nubmer:2, mode:'unauthorized'}

```

Using this modules you can make things easily

```js
 {PgConnecter, PgObj, compileModelsByScripts, pgUtils} = require("porm")

 models = compileModelsByScripts('./scripts')

 let pgConnecter = new PgConnecter()
 const connectionStr = 'postgres://john:pass123@localhost:5432/products'
 await pgConnecter.connect(connectionStr);

 let userModel = models['user']


 User = new PgObj('user', pgConnecter, userModel)
```

### PgUtils

PgUtils is a class to add SQL functions to your code
For examle

```js
 Users.select(PgUtils.count('another_id')).where(Users.eyes_nubmer.eq(2)).toStr()
 //returns: SELECT * FROM users WHERE users.eyes_nubmer=2;
 Users.select(PgUtils.count('another_id')).where(Users.eyes_nubmer.eq(2)).exec()
 //executes this request
```

To see more functions check PgUtils file. Good luck!
