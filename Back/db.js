const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./produtos.db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS produtos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            categoria TEXT,
            preco REAL,
            quantidade INTEGER
        )
    `);

});

module.exports = db;