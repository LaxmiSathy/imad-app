console.log('Loaded!');
alert('Hi I\'m a JavaScript');
// change the text 
var element = document.getElementById('main-text');
element.innerHTML = "New Content from Java Script";
var img = document.getElementById('madi');
img.onclick = function() {
    img.style.marginLeft='100px';
    
};