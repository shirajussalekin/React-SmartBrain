const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const db = knex({
    client:'pg',
    connection: {
        host: '',
        user: '',
        password: '',
        database: ''
    }
});


app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if(email && password) {
        db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid) {
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('Wrong credentials');
            }
        })
        .catch(err => res.status(400).json('Wrong credentials'))
    } else {
        res.status(400).json('Enter valid input');
    }
    
})

app.post('/register', (req, res) => {
    const {email, name, password } = req.body;
    
    if(email && name && password) {
        const hash = bcrypt.hashSync(password);
        if(db.select('email', 'name').from('login')
        .where('email', '!=', email, 'AND', 'name', '!=', name)){
        
            db.transaction(trx => {
                trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
                })
                .catch(err => {
                    res.status(400).json('Use alternate email');
                })
            } else {
                res.status(400).json('Use alternate email');
            }
    } else {
        res.json('');
    }
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length) {
                res.json(user[0]);
            } else {
                res.status(404).json('Not found');
            }
        
    })
    .catch(err => res.status(404).json('Error not getting user'));
});

app.put('/image', (req, res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Something unexpected happen'));
});

app.listen(3001, () => {
    console.log('app is running at port 3001');
}) 





