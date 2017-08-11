console.log('Loaded!');
alert('Hi I\'m a JavaScript');
// change the text 
var element = document.getElementById('main-text');
element.innerHTML = "New Content from Java Script";
var img = document.getElementById('madi');
var marginLeft = 0;
img.onclick = function() {
    function moveRight(){
        marginLeft = marginLeft + 5;
        img.style.marginLeft = marginLeft + 'px';
        
    }
    var interval = setInterval(moveRight, 50);
    
};