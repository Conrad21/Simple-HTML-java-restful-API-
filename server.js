//Conrad Ptasznik

//make sure you have ExpressJS install
//https://expressjs.com/en/starter/installing.html
var express = require("express");
const bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

//--------------------------------------------------------

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//------------THREE HTTP GET EXAMPLES--------------------//

//EX 1
//These lines of code will read the JSON file and put in a var called data
// and and parse though it and put it in var allDataThatsParse
//It will then display it on the browser and on the console log
app.get("/listalldata", function (req, res) {
  // <------| /listalldata is like a function and you can call in the browser
  fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
    var allDataThatsParse = JSON.parse(data);
    console.log(allDataThatsParse); //Display all the contents of data in console
    res.end(data); // End the data at the end
  });
});
// Look up local host 3000 in your browser with the extension /listalldata.
// http://127.0.0.1:3000//listalldata
//This should read the file  in the same folder as the server.js

// //EX 2-1
// //Look up local host 3000 in your browser with the extension /index.
// // http://127.0.0.1:3000/id/(index number here) , Example: http://127.0.0.1:3000/3
// //Should read the file  in the same folder as the server.js

app.get("/id/:id", function (req, res) {
  fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    var s1 = req.params.id.toString();
    var s2 = "data" + s1;
    var user = data[s2];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

// //EX 2-2
//Same as example 2-1 but you can also use to get other elements as well
//You can use this to element from that data entry. Here it will take the name of date 1
app.get("/name/:id", function (req, res) {
  fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    var s1 = req.params.id.toString();
    var s2 = "data" + s1;
    var user = data[s2];
    console.log(user.name);
    res.end(JSON.stringify(user.name));
  });
});

//-----------------HTTP POST EXAMPLE-------------------//
//Post example wont just work with the link alone you need to send the method used in the HTML project
var user = {
  data5: {
    name: "Conrad",
    password: ";)",
    profession: "Bum",
    id: 5,
  },
};

app.post("/addUser", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data["data5"] = user["data5"]; //Set the new pointer to the end of the json list and input data4
    console.log(data);
    let data2 = JSON.stringify(data);
    console.log(data2);
    fs.writeFileSync(__dirname + "/" + "data.json", data2);
    //fs.writeFile(__dirname + "/" + "users.json", data2);
    res.end(JSON.stringify(data));
  });
});

//------------------Send thing over--------------------//
//Work in progress 
app.get("/process_get", function (req, res) {
  // Prepare output in JSON format
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

//----------------------Server-------------------------//
//Server part You can change the 3000 to any number to be you local host
app.use(bodyParser.json());
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  //Display example in console, Control+click on link to access
  console.log("Example app listening at http://127.0.0.1:%s", port);
  console.log("Example 1 listalldata at http://127.0.0.1:%s/listalldata", port);
  console.log(
    "Example 2-1 using id to get data at http://127.0.0.1:%s/id/1  |  http://127.0.0.1:%s/id/2  |  http://127.0.0.1:%s/id/3",
    port,
    port,
    port
  );
  console.log(
    "Example 2-1 using id to get data at http://127.0.0.1:%s/id/1  |  http://127.0.0.1:%s/id/2  |  http://127.0.0.1:%s/id/3",
    port,
    port,
    port
  );

  console.log(
    "Example 2-2 using id to get data at http://127.0.0.1:%s/name/1  |  http://127.0.0.1:%s/name/2  |  http://127.0.0.1:%s/name/3",
    port,
    port,
    port
  );

  console.log("Example 3 listalldata at http://127.0.0.1:%s/addUser", port);
});

//To look at your sever with no request go to http://127.0.0.1:3000
//
