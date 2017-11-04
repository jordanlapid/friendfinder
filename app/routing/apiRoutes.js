var path = require("path");

var friends = require("../data/friends");

var index = "";

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req,res){
  	friends.push(req.body);
  	// res.json(true);
  	friendMatcher();
  	res.send(JSON.stringify(friends[index]));
  });
 
};

function friendMatcher (){
	
	var array1 = friends[friends.length - 1].scores;
	var outerArray = [];

	for(var i = 0; i < friends.length -1; i++) {
		innerArray = [];

		for(var j = 0; j < friends[i].scores.length; j++){
			var difference = array1[i] - friends[i].scores[j];
			innerArray.push(Math.abs(difference));
		}

		outerArray.push(innerArray);
	}

  var finalArray = [];
  	for(var k = 0; k < outerArray.length; k++){
  		var sum = outerArray[k].reduce(function(a,b)	{
  			return a + b;
  		});
  		
  		finalArray.push(sum);
  		
  	}
  	console.log(finalArray);
  	indexOfMin(finalArray);
  	
}

function indexOfMin(arr) {
	index = 0;
	var value = arr[0];
	for (var i = 1; i < arr.length; i++) {
	  if (arr[i] < value) {
	    value = arr[i];
	    index = i;
	  }
	  
	}
	console.log(index);
}




