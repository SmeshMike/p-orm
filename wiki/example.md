# Here you can check example how to use package

```js
const { PgObj, compileModelsByScripts, PgUtils } = require("./porm");
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

  Users = new PgObj("users", db, users);
  Requests = new PgObj("requests", db, requests);

  console.log(
    await Users.select(PgUtils.count(PgUtils.distinct(Users.user_id)))
      .fullJoin(Requests, ["user_id", "user_id"])
      .limit(1)
      .exec()
  );
}

main();
```

I have table creation scripts(user and request) in directory "scripts" in my project. So, first of all, they would be parsed into models
`models = compileModelsByScripts("./scripts");`.
After that I create connection to my DB and than create objects of tables in that DB.

```js
Users = new PgObj("users", db, users);
Requests = new PgObj("requests", db, requests);
```

Finally, I create request to my DB and execute it. Response recieves as Array[Object]
