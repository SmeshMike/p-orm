# porm

Node js ORM for PostgreSQL database. The whole perpose of that package is to make sql requests easier to write with JS,
to create "SELECT someStaff FROM staffWareHouse" by writing

```js
staffWareHouse.select("someStaff");
```

etc.

## How to use it?

So what do we have?

```js
{PgObj, compileModelsByScripts, PgUtils} = require("porm")
```

Lets understand what is that and how it works.

### PgObj

PgObj is a class that implements table object. To create it you will need a name of table in your database, db connecter(pgConnecter) and model of your table

now we don't have implementation of DB interfaces, so we use [pg-promise](https://github.com/vitaly-t/pg-promise). Btw, thanx to it's author.

```js
  let pgconnection = {
    host: "localhost",
    user: "postgres",
    database: "BotDb",
    password: "123",
    port: 5432,
    connectionTimeoutMillis: 20000,
  };

  const db = pgp(pgconnection);
tableObj = new PgObj("table", db, tableModel);
```

That might be clear. But what is model in parameters? Model is a dictionary where keys are the names of columns of real table and values are their types converted to Node.js types.
For example:

```js
let userModel = { id: Number, gender: String, isHeOrSheAwesome: Boolean };
```

### compileModelsByScripts

Another way to create model is to use table creation script.
Here `compileModelsByScripts()` goes.

Imagine that you have a file with sql script like this in `./scripts` directory:

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
models = compileModelsByScripts("./scripts");

//model - {user : {model}}

yourScriptModel = models["user"];

//yourScriptModel - {another_id: null, creationScript: theWholeScriptText, eyes_nubmer:2, mode:'unauthorized'}
```

Using this modules you can make things easily

```js
 { PgObj, compileModelsByScripts, PgUtils} = require("porm")

 models = compileModelsByScripts('./scripts')

 const connectionStr = 'postgres://john:pass123@localhost:5432/products'
 const db = pgp(connectionStr);

 let userModel = models['user']


 User = new PgObj('user', db, userModel)
```

### PgUtils

PgUtils is a class to add SQL functions to your code
For examle

```js
Users.select(PgUtils.count("another_id"))
  .where(Users.eyes_nubmer.eq(2))
  .toStr();
//returns: SELECT * FROM users WHERE users.eyes_nubmer=2;
Users.select(PgUtils.count("another_id")).where(Users.eyes_nubmer.eq(2)).exec();
//executes this request
```

To see more functions check PgUtils file. Good luck!
