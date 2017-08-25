var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'laxmisathy63',
    database:'laxmisathy63',
    host:'db.imad.hasura-app.io',
    post:'5432',
    password: process.env.DB_PASSWORD
    
};


var app = express();
app.use(morgan('combined'));

var articles = { 
    'article-one': {
        title: 'Article One | Laxmi Sathy',
        heading: 'Article One Page',
        date: 'August 9, 2017',
        content: `<p>
                    Content for the Article One Page goes here. New content gets updated here.
              </p>`},
    'article-two': {
        title: 'Article Two | Laxmi Sathy',
        heading: 'Article Two Page',
        date: 'August 10, 2017',
        content: `<p>
                        Content for the Article Two Page goes here. New content gets updated here.
                  </p>`
    },
    'article-three': {
        title: 'Article Three | Laxmi Sathy',
        heading: 'Article Three Page',
        date: 'August 11, 2017',
    content: `<p>
                    Content for the Article One Page goes here.New content gets updated here.
              </p>`
    }
};

function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
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

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
  // make a select request
  
  // send the response of the select query
  
  pool.query('Select * from article', function(err, result) {
      
  if(err)
    { res.status(500).send(err.toString);}
  else
     { res.send(JSON.strigify.result()); }
      
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

app.get('/:articleName', function(req, res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
