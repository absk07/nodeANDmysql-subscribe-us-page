const express = require('express');
const path = require('path');
const faker = require('faker');
const mySql = require('mysql');
const app = express();


const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'join_us'
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

db.connect(function(err) {
    if (err) return console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

app.get('/', (req, res) => {
    const q1 = 'SELECT * FROM users';
    const q2 = 'SELECT COUNT(*) AS total_users FROM users';
    db.query(q2, (err, result) => {
        if(err) return res.send(err);
        // console.log(result);
        res.render('home', { count: result[0].total_users });
    });
});

app.post('/register', (req, res) => {
    const { email } = req.body;
    const user = { email };
    const q = 'INSERT INTO users SET ?';
    db.query(q, user, (err, result) => {
        if(err) {
            console.log(err);
            return res.redirect('/');
        } 
        res.redirect('back');
    });
});
 

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));