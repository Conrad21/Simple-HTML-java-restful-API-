var apiUrl = "http://127.0.0.1:8081/listalldata"; //The URL of the server request
//This is a string so your code should create different URL via with strings
fetch(apiUrl, {
  method: "GET", //This should match the method type in the server.js
  Origin: "http://localhost:3000",
})
  .then((response) => response.json()) //grab the body of the server request and convert to Json
  .then((data) => name = data.data1.name)   //data.name should print out the name from data1
  .then((data) => console.log("This is your data", data)); //show the response in the console log
  console.log("This right here", name); 
var output = document.getElementById('output');      //set the var to what was call "output" in the HTML part 
output.innerHTML = name;

console.log("This is the output:" , output) ; 