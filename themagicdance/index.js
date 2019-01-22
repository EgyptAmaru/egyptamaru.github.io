//Create a global variable to keep track of the "page" of the story
var pageNumber = 0; 

//Create an array of strings to store the contents of each page
var pageContent = ["<p>Aris and Ony had to stay after-school for detention. Ony wrapped his fingers around his last unbroken crayon as he drew. But it was taken away from him, anyway, as soon as the accidental markings on the desk were noticed. When the time came for Ony to leave, he was not very happy.</p><p>Alone and bored out of his mind, Aris reached for the drawings left on the floor. He stared at the colorful drawing of a... clown? His eyes then wandered onto the white wall across from him to find that the clown had danced his way there. 'Wanna learn the rest of this story?' it asked.</p>",
"<p>He rubbed his eyes. When he opened them, the room was dark. He ran to the front door of the classroom he was in. The door was locked and had some words written on it with a crayon:</p> <p>To open this door, solve this: A match is to a flame as a needle is to a(n):</p>",
	'<p>Aris got the door unlocked and he swung the door open into the unlit school hallway. Just in front of the door was a man wearing a black tuxedo and a large black hat, shuffling cards in the air. He pulled one out of thin air and handed it to him. It read:</p><p>You have a jug full of water and a jug full of blood. You simultaneously empty both jugs into one large vat, yet the water remains separate from the blood. How could this happen?</p>',
	"The happy ending that never happens"]; 


//Store the element for the program button globally, since it will be accessed by various functions
var button = document.getElementById("NextButton");

var lastAnswer = 0; /*to count number of attempts for the last question*/

//Create a carousel style presentation of Notes2 content using a library
$('.Notes2').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 4
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});

//This function will be invoked fopr the second input text field, when the user presses "enter", and will check if the answer provided is suitable
function checkAnswer2() {
	var answerElement = document.getElementById("Answer");
	var answer = answerElement.value; //this line acceses the string value of the answer provided by the user
	
	if (answer.includes('solid') || answer.includes('ice') || answer.includes('frozen')) { //if one of the strings indicated is anywhere in the answer
		$("#MessageSpace").html("<div class = 'animated fadeIn'>" + "That's a match!" + "</div>"); //tell the user they have gotten the correct answer
		button.style.display = "block"; //make the button on the page visible again
	}

	else if (lastAnswer === 2) {
		$("#MessageSpace").html("<div class = 'animated fadeIn'>" + "Lets move forward" + "</div>");
		button.style.display = "block";

	}
	else {
		$("#MessageSpace").html("<div class = 'animated fadeIn'>" + "Hmm.. try again" + "</div>"); //if the user did not enter the right answer, display a message teling them to try again
		lastAnswer +=1; 
	}
}

//This function will be invoked for the first input text field, when the user presses "enter", and will check if the answer provided is suitable
function checkAnswer1() {
	var answerElement = document.getElementById("Answer"); 
	var answerSize = answerElement.value.length; //this line acceses the answer entered by the user and then evaluates its length

	if (answerSize === 6) { //if the length of the answer matches 6
		$("#MessageSpace").html("<div class = 'animated fadeIn'>" + "That's a match!" + "</div>"); //tell the user they have gotten the correct answer
		button.style.display = "block"; //make the button on the page visible again
	}
	else {
		$("#MessageSpace").html("<div class = 'animated fadeIn'>" + "Hmm.. try again" + "</div>"); //if the user did not enter the right answer, display a message teling them to try again
	}
}
//This function will return a string for an input text box or will return an empty string
function inputField() { 
	if (pageNumber === 1) { //if the pageNumber has an index of 0
		var actualInputField = '<form action = "javascript: checkAnswer1();"><input ID = "Answer" class = "animated fadeIn" name = "answer1" type = "text" autocomplete="off"></form>'; //Create an input text field. Autocomplete is used in order to get rid of the dropdown menu of the input element
		return actualInputField;
	}
	else if (pageNumber === 2) { //if the pageNumer has an index of 1
		var actualInputField = '<form action = "javascript: checkAnswer2();"><input ID = "Answer" name = "answer2" type = "text" autocomplete="off"></form>'; //Create an input text field. This second conditional was needed because the input text field will call a different function on this "page" of the story
		return actualInputField;
	}
	else {
		return ""; //return  an empty string if the value of pageNumber is neither 0 or 1.
	}
}

//This function will access the appropriate part of the array that holds the story and insert an animation from a library
function nextPage(){
	var fadeIn = "<div class = 'animated fadeIn'>" + pageContent[pageNumber] + "</div>";
	return fadeIn; //return FadeIn to the trigger() function
}


//This function will be called if the last index value for the pageContent array has been reached
function finalPage() {
	setTimeout(function(){ //execute the following code after .8 seconds
		$(".center").attr("style", "display: block"); //change the "style" attribute so that the content in the html is displayed
		$(".center").addClass("animated fadeIn"); //add an animation entrance using a library
	}, 800);
}

//This function will retrieve three HTML elements and change their values. It will also make the button invisible so that the user cannot skip ahead to the next part of the story
function trigger() {
	if (pageNumber == pageContent.length - 1) { //this conditional checks to see if the last index to be used has been reached
		$(".Notes1").addClass("animated fadeOut"); //the content of Notes1 is cleared using an exit animation from a library

		setTimeout(function(){  //execute the following code after .8 seconds
			$(".Notes1").html(""); //empty the content of .Notes1 to make sure you are clearing the div
		}, 800);

		finalPage(); //call the finalPage function instead of continuing with the following code
	}

	else {
		$("#MessageSpace").html("");//This will clear the MessageSpace tag so that the new "page" does not show the text messages from the previous page
		$("#Words").html(nextPage()); //This code takes the Words element and populates it with the string content returned by nextPage()
		$("#Input").html(inputField()); //This will set the value of the Input element to the return value of the function passed to it (inputField())
		button.style.display = "none"; //Make the button on the page disappear. Rather than removing the button, it will be hidden because it will need to reappear once the user answers the next question correctly
	}
}

function begin() {
	$("#Beginning").addClass("animated fadeOutDown"); //Take the element Beginning and add a class to give it an animated exit

	setTimeout(function(){ //execute the following code after .8 seconds
		$("#Beginning").html(""); //empty the content of the element 
	}, 800);

	setTimeout(function(){ //execute the following code after .8 seconds
		$(".Notes1").attr("style", "display: block"); //change the "style" attribute so that the content in the html is displayed
		$(".Notes1").addClass("animated fadeInDown"); //the content of Notes1 is cleared using an exit animation from a library
	}, 800);
}

function magic(whichJester) { //function gets invoked when the user clicks on one of the presented pictures
	$("#NextButton").prop("disabled", true); //the NextButton gets disabled through the execution of then code so that two codes aren't running at once (controlling the timing of animation)

	if (whichJester === "1") { //using the passed argument, determine which image was clicked
		$("#2").addClass("animated tada"); //if the image that passed the value "1" (representing the ID value of "1") was clicked, get the image tag with an ID of "2" and run an animation

		setTimeout(function(){  //execute the following code after 1.1 seconds
			$("#2").removeClass("animated tada"); //remove the class added to run the animation
				}, 1100);
	}

	else {
		$("#1").addClass("animated tada"); //if the image clicked was in the image of ID "2", access the image of ID "1" and add an entrance animation
		setTimeout(function(){ //execute the following code after 1.1 seconds
			$("#1").removeClass("animated tada"); //remove the class added to run the animation
				}, 1100);
	}

	if ($("#1").attr("src") === "Jester.jpg") { //if the current image file of the tag with an ID of "1" is "Jesters.jpg"
		setTimeout(function(){  //execute the following code after 1.1 seconds
			$("#1").attr("src", "JesterDrawing.jpg"); //swap the pictures in elements "1" and "2"
			$("#2").attr("src","Jester.jpg");
		}, 1100);
	}
	else { //otherwise
		setTimeout(function(){  //execute the following code after 1.1 seconds
			$("#1").attr("src", "Jester.jpg"); //swap the pictures in elements "1" and "2"
			$("#2").attr("src","JesterDrawing.jpg");
		}, 1100);
	}

	setTimeout(function(){ //after all the code runs, enable the NextButton again after 1.5 seconds
		$("#NextButton").prop("disabled", false);
			}, 1500);
}

function main() {
	if (pageNumber === 0) { //if the value of pageNumber is equal to zero
		var fadeIn = "<div class = 'animated fadeIn'>" + pageContent[pageNumber] + "</div>"; //access the appropriate item in the pageContent array and include a fadeIn animation

		$("#1").addClass("animated fadeOutLeft"); //removes jester pictures by adding exit animations
		$("#2").addClass("animated fadeOutRight");

		setTimeout(function(){  //execute the following code after .9 seconds
			$("#Words").html(fadeIn); //insert the value of fadeIn into the Words element 
		}, 900);

		pageNumber +=1; //increase the pageNumber for the next time main is called
	}

	else { //if the pageNumber was not equal to 0
		trigger(); //run the trigger function
		pageNumber +=1; //increase the pageNumber for the next time main is called
	}
}
