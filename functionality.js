/* Main Function- will load javascript in head when window
 * is fully loaded.
 */
function main() {
    //Variables
    var dispValue = document.getElementById("dispValue"), valueToDisplay = "", calcButtons = document.getElementsByClassName("calcButton"), i;

    //Basic calculator object
    var calcObject = {
        currentlyDisplayed: "0",
        updateDisplay: function () {
            this.currentlyDisplayed = valueToDisplay;
        }
    };
    
    //Updates the object & the DOM
    function updateDisplay() {
        calcObject.updateDisplay();
        dispValue.innerHTML = calcObject.currentlyDisplayed;
    }
   
    function buttonClick() {
        valueToDisplay += this.innerHTML;
        updateDisplay();
    }
    
    
    //Initial Dom Update
    dispValue.innerHTML = calcObject.currentlyDisplayed;
    
    //Add event listeners to the buttons
    for (i = 0; i < calcButtons.length; i++) {
        calcButtons[i].addEventListener("click", buttonClick);
    }
}


window.onload = main;