//Create a global variable to keep track of the "page" of the story
var pageNumber = 0; 

//Create an array of strings to store the contents of each page
var pageContent = ["<p class = 'Question'>Question 1</p><p>content 1</p>",
"<p class = 'Question'>Question 2</p><p>content2</p>",
"<p class = 'Question'>Question 3</p><p>content3</p>"];

//Store the element for the program button globally, since it will be accessed by various functions
var button = document.getElementById("NextButton");

function begin() {
	$("#Landing").addClass("animated fadeOutDown"); //Take the element Landing and add a class to give it an animated exit

	setTimeout(function(){ //execute the following code after .8 seconds
		$("#Landing").html(""); //empty the content of the element 
	}, 800);

	setTimeout(function(){ //execute the following code after .8 seconds
		$(".Container").attr("style", "display: block"); //change the "style" attribute so that the content in the html is displayed
		$(".Container").addClass("animated fadeInDown"); 
	}, 800);

	main();
}

//This function will retrieve three HTML elements and change their values. It will also make the button invisible so that the user cannot skip ahead to the next part of the story
function main() {
		if (pageNumber == pageContent.length) { //this conditional checks to see if the last index to be used has been reached
			finalPage(); //call the finalPage function
		}

		else {
			$("#MessageSpace").html("");//This will clear the MessageSpace tag so that the new "page" does not show the text messages from the previous page
			$("#Words").html(nextPage()); //This code takes the Words element and populates it with the string content returned by nextPage()
			$("#Input").html(inputField()); //This will create an input box 
			button.style.display = "none"; //Make the button on the page disappear. Rather than removing the button, it will be hidden because it will need to reappear once the user answers the next question correctly
		}

		pageNumber +=1; //increase the pageNumber for the next time main is called
}

//This function will access the appropriate part of the array that holds the story and insert an animation from a library
function nextPage(){
	var fadeIn = "<div class = 'animated fadeIn'>" + pageContent[pageNumber] + "</div>";
	return fadeIn; //return FadeIn to the main() function
}

//This function will return a string for an input text box or will return an empty string
function inputField() { 
		var actualInputField = '<form action = "javascript: checkAnswer();"><input ID = "Answer" class = "animated fadeIn" name = "answer" type = "text" autocomplete="off"></form>'; //Create an input text field. Autocomplete is used in order to get rid of the dropdown menu of the input element
		return actualInputField;
	}

//This function will be invoked for the first input text field, when the user presses "enter", and will check if the answer provided is suitable
function checkAnswer() {
	var answerElement = document.getElementById("Answer"); 
	var answer = answerElement.value; //this line acceses the string value of the answer provided by the user

	if (pageNumber === 1 && answer === "Answer1") {
			$("#MessageSpace").html("<div class = 'animated fadeIn'>" + "Correct!" + "</div>"); //tell the user they have gotten the correct answer
			button.style.display = "block"; //make the button on the page visible again
	}

	else if (pageNumber === 2 && answer === "Answer2") {
			$("#MessageSpace").html("<div class = 'animated fadeIn'>" + "Good job, Leoncito." + "</div>"); //tell the user they have gotten the correct answer
			button.style.display = "block"; //make the button on the page visible again
	}

	else if (pageNumber === 3 && answer === "Answer3") {
			$("#MessageSpace").html("<div class = 'animated fadeIn'>" + "100 point for Gryffindor!" + "</div>"); //tell the user they have gotten the correct answer
			button.style.display = "block"; //make the button on the page visible again
	}

	else {
		$("#MessageSpace").html("<div ID= 'Red' class = 'animated fadeIn'>" + "Hmm.. try again" + "</div>"); //if the user did not enter the right answer, display a message teling them to try again
	}
}

//This function will be called if the last index value for the pageContent array has been reached
function finalPage() {
	$(".Container").addClass("animated fadeOut"); //the content of Container is cleared using an exit animation from a library

	setTimeout(function(){ //execute the following code after .8 seconds (Not sure if this function does anything here)
		$(".Container").html(""); //empty the content of the element 
	}, 800);

	setTimeout(function(){ //execute the following code after .8 seconds
		$(".Paws").attr("style", "display: block"); //change the "style" attribute so that the content in the html is displayed
		$(".Paws").addClass("animated fadeIn"); //add an animation entrance using a library
	}, 800);
}
