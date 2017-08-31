// counter code
var button = document.getElementById('counter');
button.onclick = function() {
    //Create request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
                
            }
        }
    };
    
    //Make request to the counter end point
    request.open('GET', 'http://laxmisathy63.imad.hasura-app.io/counter', true);
    request.send(null);
    
    
  };
  // Submit name script
  
  var submit = document.getElementById('submit_btn');
  submit.onclick = function() {
        //Create request object
        var request = new XMLHttpRequest();
    
        //capture the response and store it in variable
        request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if(request.status === 200){
                //Capture the response and render the list of names
                var names =request.responseText;
                //JSON to convert string to array
                names = JSON.parse(names);
                var list ='';
                for (var i=0; i<names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
                }
                var sub = document.getElementById('namelist');
                sub.innerHTML = list;
                
            }
        }
        };
    
    
    //Make request to the counter end point
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET', 'http://laxmisathy63.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
  };
  
  
  //Username Password login script
  
  //Create request object
  
  var request = new XMLHttpRequest();
    
    //capture the response and store it in variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200){
                alert('Logged in successfully');
            } else if (request.status===403){
                alert('Invalid username or password');
            } else if (request.status ===500){
                alert('Server error');
            }
        }
    };
    
  
  var submit = document.getElementById('login');
  submit.onclick = function(){
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    
    request.open('POST', 'http://laxmisathy63.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username:username, password:password}));
  };
  
  
  //Username Password register script