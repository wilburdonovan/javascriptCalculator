// FUNCTIONALITY FOR CALCULATOR
function calcFunctionality() {
    //Variables
    var dispValue = document.getElementById("dispValue"),      
        dispValue2 = document.getElementById("dispValue2"), secondaryDispVal = "", primaryDispVal = "", calcButtons = document.getElementsByClassName("calcButton"), i;

    //Basic calculator object
    var calcObject = {
        primaryDisplay: "0",
        secondaryDisplay: "0",
        updateDisplay: function (m , n) {
           if (m == null) {
                this.primaryDisplay = primaryDispVal;
            } else {
                this.primaryDisplay = m;
            }
            if (n == null) {
                this.secondaryDisplay = secondaryDispVal;
            } else {
                this.secondaryDisplay = n;
            }  
        }
    };
    
    //Updates the object & the DOM
    function updateDisplay() {
        calcObject.updateDisplay();
        dispValue.innerHTML = calcObject.primaryDisplay;
        dispValue2.innerHTML = calcObject.secondaryDisplay;
    }
   
    //Adds the buttons value to the dispValue strings and updates display
    function buttonClick() {
        var hold = this.innerHTML;
        if (hold == "0" || hold == "1" || hold == "2" || hold == "3" || hold == "4" || hold == "5" || hold == "6" || hold == "7" || hold == "8" || hold == "9" || hold == ".") {
            if (primaryDispVal != "0") {
                primaryDispVal += hold;
            } else {
                primaryDispVal = hold;
            }
        } 
        if (hold == "+" || hold == "-" || hold == "/" || hold == "*") {
            primaryDispVal = "0";
            secondaryDispVal += " " + hold + " ";
        } else if (hold == "=") {
            // Calculate answers here
            primaryDispVal = +eval(secondaryDispVal).toFixed(5);
            secondaryDispVal += " =";
        } else {
            secondaryDispVal += hold;
        }
        
        updateDisplay();
    }
    
    //Clears screen when CE is clicked
    function CEClick() {
        secondaryDispVal = "";
        primaryDispVal = "0";
        calcObject.updateDisplay("0", " ");
        updateDisplay();
    }
    
    //Deletes last character in display
    function delClick() {
        primaryDispVal = primaryDispVal.substring(0, primaryDispVal.length-1);
        secondaryDispVal = secondaryDispVal.substring(0, secondaryDispVal.length-1);
        updateDisplay();
    }
    
    //Clears primary display when C is clicked
    function CClick () {
        secondaryDispVal = secondaryDispVal.substring(0, secondaryDispVal.length-primaryDispVal.length);
        primaryDispVal = "0";
        updateDisplay();
    }
    
    // Negative sign converts number
    function posnegClick () {
        secondaryDispVal = secondaryDispVal.substring(0, secondaryDispVal.length-primaryDispVal.length);
        primaryDispVal = parseFloat(primaryDispVal);
        primaryDispVal *= -1;
        primaryDispVal = primaryDispVal.toString();
        secondaryDispVal += primaryDispVal;
        updateDisplay();
    }
    
    
    //Initial Dom Update
    dispValue.innerHTML = calcObject.primaryDisplay;
    
    //Add event listeners to the buttons
    for (i = 0; i < calcButtons.length; i++) {
        if (calcButtons[i].innerHTML == "CE") {
            calcButtons[i].addEventListener("click", CEClick);
        } else if (calcButtons[i].innerHTML == "Del") {
            calcButtons[i].addEventListener("click", delClick);
        } else if (calcButtons[i].innerHTML == "C") {
            calcButtons[i].addEventListener("click", CClick);
        } else if (calcButtons[i].innerHTML == "+/-") {
            calcButtons[i].addEventListener("click", posnegClick);
        } else {
            calcButtons[i].addEventListener("click", buttonClick);
        }
    }
}


// FUNCTIONALITY FOR FACTORS WIDGET
function factorFunctionality() {
    var factorInputButton = document.getElementById("factorInputButton");
    var factorResetButton = document.getElementById("factorResetButton");
    var factorInput = document.getElementById("factorInput");
    var factorOutput = document.getElementById("factorOutput");
    var inputArray = [];
    var outputString = "";
    var temp = 0;
    
    // Function that will calculate the actual factor
    function getFactors() {
        temp = parseInt(factorInput.value);
        inputArray.push(temp);
        
        for (var i = 0; i < inputArray.length; i++) {
            outputString += "- The factors for " + inputArray[i] + " are: ";
            for (var j = 1; j < inputArray[i]; j++) {
                if (inputArray[i] % j == 0) {
                    outputString += " " + j + " ";
                }
            }
            outputString += "and " + inputArray[i] +"<br><br>";
            factorOutput.innerHTML = outputString;
        }
    }
    
    // Function that resets the utility
    function resetFactors() {
        inputArray = [];
        outputString = "";
        factorOutput.innerHTML = outputString;
    }
    
    /* 
     * When the "Add" button is clicked:
     * Clear ouputString
     * Prevent button sending data to server
     * Run getFactors function
     */
    factorInputButton.addEventListener("click", function(event) {
        outputString = "";
        event.preventDefault();
        getFactors();
    });
    
    // Resets utility when Reset button is clicked
    factorResetButton.addEventListener("click", function(event) {
        event.preventDefault();
        resetFactors();
    });
}


// FUNCTIONALITY FOR MENU BAR
function menuFunctionality() {
    var allWidgets = document.getElementsByClassName("widgetDiv");
    var basicCalc = document.getElementById("basicCalc");
    var factorsCalc = document.getElementById("factorsCalc");
    
    // Hides all the Divs except for the menu and wrapper
    function hideAll() {
        for (var i = 0; i < allWidgets.length; i++) {
            allWidgets[i].style.display = "none";
        }
    }
    
    // Functions to show each div
    function showBasicCalc() {
        hideAll();
        basicCalc.style.display = "block";
    }
    
    function showFactorsCalc() {
        hideAll();
        factorsCalc.style.display = "block";
    }
    
    // Attach functions to buttons
    document.getElementById("menuCalc").addEventListener("click", showBasicCalc);
    document.getElementById("menuFactors").addEventListener("click", showFactorsCalc);

}


// FUNCTION CALLS ALL OTHER FUNCTION TO BE PARSED WHEN WINDOW IS LOADED
function main() {
    calcFunctionality();
    menuFunctionality();
    factorFunctionality();
}

// Call main onload
window.onload = main;
