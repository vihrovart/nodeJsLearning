// Соединение с базой данных nodejs (на Postgres) по средствам модуля pg

var pg = require("pg");

var connectionString = "postgres://postgres:1q2w3e$R@localhost/nodejs";

var poolConfig = {
    user: "postgres",
    database: "nodejs",
    password: "1q2w3e$R",
    port: 5432
}

var pool = new pg.Pool(poolConfig);

pool.connect(function(err, client, done){
    client.query("SELECT $1::varchar AS trololo", ['nodejs'], function(err, res){
        done();

        if(err){
            return console.error("execute query error", err);
        }

        console.log(res.rows[0]);
        process.exit(0);
    });
});