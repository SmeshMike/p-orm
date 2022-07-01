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
  // db.any(Users.insert({user_id: 6, bot_instance: 'test'}).toStr()).finally(pgp.end);
  // let res1 = await Users.update({user_id: 2}).where(Users.user_id.eq(1), Users.bot_instance.eq('test'), Users.sex.eq('ochen')).exec()
  //   console.log(
  //     Users.S({ user_id: 2 })
  //       .where(
  //         Users.user_id.eq("1"),
  //         Users.bot_instance.eq("test"),
  //         Users.sex.eq("ochen")
  //       )
  //       .exec()
  //   );
  // let res2 = await Users.delete().where(Users.user_id.eq(2)).exec()
  let res3 = 2;
  // console.log(Users.select(PgUtils.count('another_id')).where(Users.eyes_nubmer.eq(2)).toStr())
  // let upDate = new Date(2000,0,4, 19, 30, 0, 0)
  // let downDate = new Date(2000,0,2, 15, 30, 0)
  // console.log(upDate.dbTime())

  // .where(Users.user_id.gt('2'), Users.faculty.ne(null), Requests.req_date.lt(upDate.dbDate()), Requests.req_date.gt(downDate.dbDate())).toStr())
}

// if (type === "where") {
//     req +=Object.values(args).map(value => ifStringOrDefault(value) ? "'" + value + "'" : value).join(" AND ") + " ";

//   } else

main();
