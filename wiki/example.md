# Here you can check example how to use package

```js
const { PgObj, compileModelsByScripts, PgUtils } = require("postorm");
const pgp = require("pg-promise")();

async function main() {
  models = compileModelsByScripts("./scripts");

  let pgconnection = {
    host: "localhost",
    user: "postgres",
    database: "BotDb",
    password: "123",
    port: 5432,
    connectionTimeoutMillis: 20000,
  };

  const db = pgp(pgconnection);

  let users = models["user"];
  let requests = models["request"];

  let Users = new PgObj("users", db, users);
  let Requests = new PgObj("requests", db, requests);

  await Users.select(PgUtils.count(PgUtils.distinct(Users.user_id)))
    .fullJoin(Requests, ["user_id", "user_id"])
    .limit(1)
    .exec();
}

main();
```

I have table creation scripts(user and request) in directory "scripts" in my project. So, first of all, they would be parsed into models
`models = compileModelsByScripts("./scripts");`.
After that I create connection to my DB and than create objects of tables in that DB.

```js
let Users = new PgObj("users", db, users);
let Requests = new PgObj("requests", db, requests);
```

Finally, I create request to my DB and execute it. Response recieves as Array[Object]

```js
const { PgGlob, compileModelsByScripts, PgUtils } = require("postorm");
const pgp = require("pg-promise")();

async function main() {
  let pgconnection = {
    host: "localhost",
    user: "postgres",
    database: "BotDb",
    password: "123",
    port: 5432,
    connectionTimeoutMillis: 20000,
  };

  const db = pgp(pgconnection);

  let Glob = new PgGlob(db);
  let Users = new PgObj("users", db, users);
  let Requests = new PgObj("requests", db, requests);

  await Glob.select()
    .from(
      Users.select(PgUtils.count(PgUtils.distinct(Users.user_id)))
        .fullJoin(Requests, ["user_id", "user_id"])
        .limit(1)
    )
    .exec();
}

main();
```

This code looks like the previous, but Glob object gives you the possibility to write nested select. This script executes
`SELECT FROM (SELECT COUNT(DISTINCT users.user_id ) FROM users FULL JOIN requests ON users.user_id=requests.user_id LIMIT 1 ) t1 ;`
