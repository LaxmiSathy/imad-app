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