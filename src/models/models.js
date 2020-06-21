import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    console.log("Here query ", query);

    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturnId(columns, values) {

    const query = `
            INSERT INTO ${this.table}(${columns})
            VALUES (${values})
            RETURNING id, ${columns}
        `;

    console.log("Here query ", query);

    return this.pool.query(query);

  }

  /**
     * DB Query
     * @param {object} quertText
     * @param {object} params
     * @returns {object} object
     */
    async query(quertText, params) {
      return new Promise((resolve, reject) => {
          console.log("dbquery", quertText)
          console.log("params", params)
          pool.query(quertText, params)
              .then((res) => {
                  console.log("dbquery 2", res)
                  resolve(res);
              })
              .catch((err) => {
                  console.log("dbquery 3", err)
                  reject(err);
              });
      });
  }

}

export default Model;
