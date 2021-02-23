const { response } = require("express");
const pg = require("pg");
const dbCredentials =
  process.env.DATABASE_URL || require("./localenv").credentials;

class StorageHandler {
  constructor(credentials) {
    this.credentials = {
      connectionString: credentials,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  async insertUser(username, password) {
    const client = new pg.Client(this.credentials);
    let results = null;
    try {
      await client.connect();
      results = await client.query(
        'INSERT INTO "public"."user"("username", "password") VALUES($1, $2) RETURNING *;',
        [username, password]
      );
      results = results.rows[0].message;
      client.end();
    } catch (err) {
      client.end();
      console.log(err);
      results = err;
    }

    return results;
  }

  async insertItem(todo) {
    const client = new pg.Client(this.credentials);
    let results = null;
    try {
      await client.connect();
      results = await client.query(
        'INSERT INTO "public"."items"("itemName") VALUES($1) RETURNING *;',
        [todo]
      );
      results = results.rows[0].message;
      client.end();
    } catch (err) {
      client.end();
      console.log(err);
      results = err;
    }

    return results;
  }

  async checkUser(username) {
    const client = new pg.Client(this.credentials);
    let results = null;
    try {
      await client.connect();
      results = await client.query(
        "SELECT password FROM public.user WHERE username = $1;",
        [username]
      );
      results = results.rows[0].password;
      client.end();
    } catch (err) {
      client.end();
      console.log(err);
      results = err;
    }

    return results;
  }

  async getItem() {
    const client = new pg.Client(this.credentials);
    let results = null;
    try {
      await client.connect().then(() => console.log("connected"));
      results = await client.query('SELECT "itemName", "id" FROM public.items');
      console.log(results.rows);
      client.end();
    } catch (err) {
      client.end();
      console.log(err);
      results = err;
    }

    return results;
  }

  async delTodo(id) {
    const client = new pg.Client(this.credentials);
    let results = null;
    try {
      await client.connect();
      results = await client.query(
        'DELETE FROM "public"."items" WHERE id = $1',
        [id]
      );
      client.end();
      console.log(results);
      return results;
    } catch (err) {
      client.end();
      console.error(err);
      results = err;
    }
  };
}

module.exports = new StorageHandler(dbCredentials);
