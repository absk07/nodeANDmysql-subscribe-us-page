const mySql = require('mysql');
const faker = require('faker');

const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'join_us'
});

db.connect(function(err) {
    if (err) return console.error('error connecting: ' + err.stack);
    console.log('connected to database');
});


const data = [];
for(let i = 0; i < 500; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}


const q = 'INSERT INTO users (email, created_at) VALUES ?';

db.query(q, [data], function(err, result) {
    if(err) return console.log(err);
    console.log(result);
});

db.end();
console.log('Insertion done');