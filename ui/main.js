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
  
  //check user or guest
  
  function guest(){
      
      // create request object
      var request = new XMLHttpRequest();
      
      //capture response
      request.onreadystatechange = function(){
          if(request.readyState=== XMLHTTPRequest.DONE){
              //get the user name from check login
              if(request.status===200){
                  var name1 = request.responseText;
                  var display = document.getElementById('guestname');
                  display.innerHTML = name1;
              }
          }
      }
      
      
      
      //request to the check-login end point
      request.open('GET', 'http://laxmisathy63.imad.hasura-app.io/check-login', true);
      request.send(null);
      
  }
  