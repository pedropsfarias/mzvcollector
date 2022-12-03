class GenericModel {

    constructor({ db, modelDefinition }) {

        this._db = db;
        this._modelDefinition = modelDefinition;
        this._name = modelDefinition.table;

        this._migrate();

    }

    get modelName() {
        return this._name;
    }

    get fields() {
        return this._modelDefinition.fields;
    }

    _migrate() {

        return new Promise((resolve, reject) => {

            const { table, fields } = this._modelDefinition;
            const sql = `CREATE TABLE IF NOT EXISTS ${table} (${fields.map(f => `${f.name} ${f.type}`).join(', ')})`;
            let tableResult = null;

            this._db.transaction(tx => {
                tx.executeSql(sql, [], (tx, rs) => {
                    tableResult = rs;
                }, (tx, err) => {
                    reject(err);
                });
            });

            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];

                if (field.hasMany) {
                    const { references, name, fk } = field;
                    const sql = `CREATE TABLE IF NOT EXISTS ${table}_${references} (${name} TEXT, ${table}_${fk} TEXT)`;
                    let tableResult = null;

                    this._db.transaction(tx => {
                        tx.executeSql(sql, [], (tx, rs) => {
                            tableResult = rs;
                        }, (tx, err) => {
                            reject(err);
                        });
                    });
                }

            }

        });


    }

    _validateData(data) {

        const { fields } = this._modelDefinition;
        const keys = Object.keys(data);
        const valid = keys.every(key => fields.some(f => f.name === key || key === 'id'));

        return valid;

    }

    _sanitizeData(data) {

        const { fields } = this._modelDefinition;
        const keys = Object.keys(data);
        const sanitized = {};

        keys.forEach(key => {
            const field = fields.find(f => f.name === key);
            if (field) {
                sanitized[key] = data[key];
            }
        });

        return sanitized;
    }

    create(data) {

        data.id = getUniqId();

        return new Promise((resolve, reject) => {

            if (!this._validateData(data)) reject('Invalid data');

            const { table } = this._modelDefinition;
            const sanitizedData = this._sanitizeData(data);
            const fields = Object.keys(sanitizedData);
            const sql = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map(f => '?').join(', ')})`;

            this._db.transaction(tx => {
                tx.executeSql(sql, Object.values(sanitizedData), (tx, rs) => {
                    resolve(rs);
                }, (tx, err) => {
                    reject(err);
                });
            });
        });

    }

    bulkCreate(data) {

        return new Promise((resolve, reject) => {

            const promises = data.map(d => this.create(d));
            Promise.all(promises).then(rs => {
                resolve(rs);
            }, err => {
                reject(err);
            });

        });

    }

    update(data) {

        return new Promise((resolve, reject) => {

            if (!this._validateData(data)) reject('Invalid data');

            const { table } = this._modelDefinition;
            const sanitizedData = this._sanitizeData(data);
            const fields = Object.keys(sanitizedData);
            const sql = `UPDATE ${table} SET ${fields.map(f => `${f}=?`).join(', ')} WHERE id=?`;

            this._db.transaction(tx => {
                tx.executeSql(sql, Object.values(sanitizedData).concat(data.id), (tx, rs) => {
                    resolve(rs);
                }, (tx, err) => {
                    reject(err);
                });
            });
        });

    }

    find(id) {

        return new Promise((resolve, reject) => {

            const { table } = this._modelDefinition;
            const sql = `SELECT * FROM ${table} WHERE id=?`;

            this._db.transaction(tx => {
                tx.executeSql(sql, [id], (tx, rs) => {
                    resolve(rs.rows);
                }, (tx, err) => {
                    reject(err);
                });
            });
        });

    }

    findAll() {

        return new Promise((resolve, reject) => {

            const { table } = this._modelDefinition;
            const sql = `SELECT * FROM ${table}`;

            this._db.transaction(tx => {
                tx.executeSql(sql, [], (tx, rs) => {
                    resolve(rs.rows);
                }, (tx, err) => {
                    reject(err);
                });
            });
        });

    }

    findPaginated({ page = 1, perPage = 10 }) {

        return new Promise((resolve, reject) => {

            const { table } = this._modelDefinition;
            const sql = `SELECT * FROM ${table} LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`;

            this._db.transaction(tx => {
                tx.executeSql(sql, [], (tx, rs) => {
                    resolve(rs.rows);
                }, (tx, err) => {
                    reject(err);
                });
            });
        });

    }


    delete(id) {

        return new Promise((resolve, reject) => {

            const { table } = this._modelDefinition;
            const sql = `DELETE FROM ${table} WHERE id=?`;

            this._db.transaction(tx => {
                tx.executeSql(sql, [id], (tx, rs) => {
                    resolve(rs);
                }, (tx, err) => {
                    reject(err);
                });
            });
        });

    }

}