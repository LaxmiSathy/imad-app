var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user:'laxmisathy63',
    database:'laxmisathy63',
    host:'db.imad.hasura-app.io',
    post:'5432',
    password: process.env.DB_PASSWORD
    
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'RandomString',
    cookie: {maxAge: 1000*60*60*24*30}
}));

function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var comment = data.comment;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title} | Laxmi Sathy
            </title>
            <meta name="viewport" content="width=device-width, initial-scaled=1"  />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
                <hr/>
                <h3>
                   ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                    <div> 
                        <p> Enter your comments here..</p>
                        <input type="text" id="comment">
                        </input>
                        <input type="submit" value="Submit" id="submit_cmt">
                        </input>
                    </div>
                    
                    <div>
                    ${comment}
                    </div>
                    
                </div>
        </div>
    </body>
    </html>
    
    `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'register.html'));
});


function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return ["pbkdf2","10000",salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function(req,res){
   var hashedString = hash(req.params.input, 'some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function(req,res){
   //username password0
   var username= req.body.username;
   var password = req.body.password;
   
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   //insert valus in db table
   pool.query("INSERT INTO wp_user (username,password) VALUES ($1, $2)",[username, dbString],  function(err,result){
      if(err){
          res.status(500).send(err.toString());
      } else {
          res.send("User created successfully" + username);
      }
       
   });
});

app.post('/login', function(req,res){
   var username= req.body.username;
   var password = req.body.password;
   
   //check the username if exist in wp_user table
   pool.query("SELECT * FROM wp_user WHERE username=$1", [username],  function(err,result){
      if(err){
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length===0){
              res.status(403).send('Invalid Username or Password');
          } else {
              // username exist in the table, check if password matches
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password,salt);
              if (hashedPassword === dbString){
                  //password matches
                  //set cookies with session id
                  req.session.auth = {userId: result.rows[0].user_id};
                  //maps session id to object {auth:[userId]}
                  
                  res.send("Valid credentials. User logged in");
                  
              } else {
                  res.status(403).send("Invalid Password");
              }
          }
          
      }
       
   });
    
});

app.get('/check-login', function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       
       pool.query("SELECT username FROM wp_user WHERE user_id=$1", [req.session.auth.userId], function(err,result){
          if(err){
              res.status(500).send(err.toString());
          } else {
              if(result.rows.length===0){
                  res.send("Guest");
              }
              else {
                  res.send(result.rows[0].username);
              }
              
          }
           
       });
       
       // res.send('true' + req.session.auth.userId.toString());
   } else {
       res.send('Guest');
   }
});

app.get('/logout', function(req,res){
   delete req.session.auth; 
   res.send("You are logged out");
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
  // make a select request
  
  // send the response of the select query
  
  pool.query('Select * from article', function(err, result) {
      
    if(err) {
        res.status(500).send(err.toString());
    }  else {
        res.send(JSON.stringify(result.rows));
    }
      
  });

});




var counter=0;
app.get('/counter', function(req,res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var names=[];
// url query like submit-name?name=laxmi
app.get('/submit-name', function(req,res) {
    var name = req.query.name;
    
    names.push(name);
    //JSON - to stringify the objects
    res.send(JSON.stringify(names));
    
    
});

app.get('/articles/:articleName', function(req, res){
    
    pool.query("Select * from myarticle WHERE title=$1", [req.params.articleName], function(err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
                if(result.rows.length===0){
                res.status(404).send('Article Not found');
               }
               else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
                }
           }
                
    
        
    });
    
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/login.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
