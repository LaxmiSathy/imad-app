//Username Password login script


//Create request object
  
  
  var request = new XMLHttpRequest();
    
    //capture the response and store it in variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200){
                alert('Logged in successfully');
                window.location = "/";
                
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
    
    request.open('POST', 'http://laxmisathy63.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username:username, password:password}));
  };
  
           
  //Username Password register script