//Username Password login script
var username = document.getElementById('username').value;
function display() {
      var name = document.getElementById('guest');
      var bodyContent =document.getElementById('content');
      name.innerHTML = 'Welcome ' + username;
      var newContent = '<p> Check articles listing in <a href='/'>Home Page</a></p>';
      bodyContent.innerHTML = newContent;
                
  }
       
  
  //Create request object
  
  
  var request = new XMLHttpRequest();
    
    //capture the response and store it in variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200){
                alert('Logged in successfully');
                display();
                
            } else if (request.status===403){
                alert('Invalid username or password');
            } else if (request.status ===500){
                alert('Server error');
            }
        }
    };
    
  
  var submit = document.getElementById('login');
  submit.onclick = function(){
    
    
    var password = document.getElementById('password').value;
    
    request.open('POST', 'http://laxmisathy63.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username:username, password:password}));
  };
  
           
  //Username Password register script