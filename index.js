const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(session({
//   secret: 'your secret key',
//   resave: false,
//   saveUninitialized: true,
// }));

app.set('view engine', 'ejs');

let dash_username=undefined;
let dash_password=undefined;
let users={};

app.get('/', (req,res) => {
    res.render('index', {msg:''});
});
app.post('/', (req, res)=> {
    username = req.body.username;
    password=req.body.password;
    if (users[username] && users[username]==password) {
        dash_username=username;
        dash_password=password;
        res.redirect(`/dashboard?username=${username}`);
    }else{
        res.render('index', {msg:'incorrect credentials'});
    }
})
app.get('/dashboard', (req,res)=>{
    // console.log(req.query);
    // req.query looks like {username: mahajansamanyu@gmail.com}
    res.render('dashboard', req.query);
})

app.get('/signup', (req,res)=>{
    res.render('signup', {msg:''});
})
app.post('/signup',(req,res) => {
    username = req.body.username;
    password=req.body.password;
    if (username=='' || password=='') {
        res.render('signup', {msg:'empty username or password'});
    }else if (users[username]){
        res.render('signup', {msg:'username taken'});
    }else{
        res.render('index', {msg:'account created'});
        users[username]=password;
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


