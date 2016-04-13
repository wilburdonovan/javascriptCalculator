/* =================================================================
                GLOBAL/ RECYCLABLE FUNCTIONS
   ===============================================================*/

/* This function removes the "selected" class from 
       all buttons of a input array */
    function removeSelectedClass(inputArr) {
        for (i = 0; i < inputArr.length; i++) {
            inputArr[i].classList.remove("selected");
        }
    }
    
    /* Attach eventListeners to a button thats clicked from
     * an input array and adds "selected" class to 
     * the button that was clicked */
    function addSelectedClassWithEventListeners(inputArr) {
       for (i = 0; i < inputArr.length; i++) {
            inputArr[i].addEventListener("click", function(event) {
                removeSelectedClass(inputArr);
                this.classList.add("selected");
            });
        }
    }


/* =================================================================
                FUNCTIONALITY FOR BASIC CALCULATOR
   ===============================================================*/
function calcFunctionality() {
    //Variables
    var dispValue = document.getElementById("dispValue"),      
        dispValue2 = document.getElementById("dispValue2"), secondaryDispVal = "", primaryDispVal = "", calcButtons = document.getElementsByClassName("calcButton"), i, prevKey;

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
    
     //Clears screen when CE is clicked
    function CClick() {
        secondaryDispVal = "";
        primaryDispVal = "0";
        calcObject.updateDisplay("0", " ");
        updateDisplay();
    }
   
    //Adds the buttons value to the dispValue strings and updates display
    function buttonClick() {
        var hold = this.innerHTML;
        
        //If the previous key pressed was "=", reset calc
        if (prevKey == "=") {
            CClick();
        }
        
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
        
        prevKey = hold;
        
        updateDisplay();
    }
    
   
    //Clears primary display when C is clicked
    function CEClick () {
        secondaryDispVal = secondaryDispVal.substring(0, secondaryDispVal.length-primaryDispVal.length);
        primaryDispVal = "0";
        updateDisplay();
    }
    
    
    /* 
     * If the length of the primaryDispVal is 1, 
     * primaryDispVal becomes 0, the last character
     * in secondaryDispVal is removed.
     * Else, remove the
     * last character from both displays
     */
    function delClick() {
        if (primaryDispVal.length == 1) {
            CEClick();
        } else {
            primaryDispVal = primaryDispVal.substring(0, primaryDispVal.length-1);
            secondaryDispVal = secondaryDispVal.substring(0, secondaryDispVal.length-1);
            updateDisplay();
        }
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
} //End basic calculator functionality


/* =================================================================
                FUNCTIONALITY FOR FACTORS WIDGET
   ===============================================================*/
function factorFunctionality() {
    // Functions variables
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
} //End functionality for factors widget


/* =================================================================
             FUNCTIONALITY FOR NUMBER BASE CONVERSION
 * Converts up to a decimal value of 1,000,000
   ===============================================================*/
function baseConversionFunctionality() {
    var inputSelectorButtons = document.querySelectorAll("#inputBaseOption button");
    var outputSelectorButtons = document.querySelectorAll("#outputBaseOption button");
    var convertButton = document.getElementById("baseConversionConvert");
    var baseConversionOutput = document.getElementById("baseConversionOutput");
    var outputArr, temp;
    
    
    //Add the selected class to buttons
    addSelectedClassWithEventListeners(inputSelectorButtons);
    addSelectedClassWithEventListeners(outputSelectorButtons);
    
   //Function to run if input is decimal
    function convertIntegerFromDecimal(inputValue, base) {
        var inputInteger = parseInt(inputValue);
        outputArr = [];
        temp = 0;
        
        while(true) {
            if (inputInteger > 1) {
                temp = inputInteger % base;
                outputArr.unshift(temp);
                inputInteger = (inputInteger - temp) / base;
            } else if (inputInteger == 1) {
                outputArr.unshift(1);
                break;
            } else {
                break;
            }
        }
        
        return outputArr.join("");
    }
    
    //Function to run if input is binary
    function convertIntegerFromBinary(inputInteger, base) {
        var inputLength = inputInteger.length;
        outputArr = [];
        temp = 0;
        
        //Stores the string recieved in an array in reversed order
        for (var i = inputLength; i > 0; i--) {
            outputArr[temp] = inputInteger.charAt(i - 1);
            temp++;
        }
        
        temp = 0; //Reset temp
        
        //Convert from Binary to Decimal
        for (var i = 0; i < inputLength; i++) {
            if (outputArr[i] == "1") {
                temp += Math.pow(2, i);
            }
        }

        //Call convertIntegerFromDecimal to convert other bases
        if (base != 10) {
            temp = convertIntegerFromDecimal(temp, base);
        }
        
        return temp;
    }
    
    //Function to run when convert button is clicked
    function convertBetweenBases() {
        var inputButtonWithSelectedClass; //The selected button in "Input Base"
        var outputButtonWithSelectedClass; //The selected button in "output Base"
        var outputBase; //The output base integer
        var baseConversionInput = document.getElementById("baseConversionInput").value;
        
        //Find & store the selected input button
        for (var i = 0; i < inputSelectorButtons.length; i++) {
            if (inputSelectorButtons[i].classList.contains("selected")) {
                inputButtonWithSelectedClass = inputSelectorButtons[i].innerHTML;
            }
        }
        
        //Find & store the selected outoutput button
        for (var i = 0; i < outputSelectorButtons.length; i++) {
            if (outputSelectorButtons[i].classList.contains("selected")) {
                outputButtonWithSelectedClass = outputSelectorButtons[i].innerHTML;
            }
        }
        
        //Store the base needed
        switch (outputButtonWithSelectedClass) {
            case "Decimal":
                outputBase = 10;
                break;
            case "Octal":
                outputBase = 8;
                break;
            case "Binary":
                outputBase = 2;
                break;
            case "HexaDecimal":
                outputBase = 16;
                break;
            default:
                console.log("Invalid base input in base converter");
        }
        
        //Find the right conversion function to run
        switch (inputButtonWithSelectedClass) {
            case "Decimal":
                baseConversionOutput.innerHTML = "The value of <b>" + baseConversionInput + "</b> in <b>" + inputButtonWithSelectedClass + "</b> form is equal to <b>" + convertIntegerFromDecimal(baseConversionInput, outputBase) + "</b> in <b>" + outputButtonWithSelectedClass + "</b> form.";
                break;
            case "Binary":
                baseConversionOutput.innerHTML = "The value of <b>" + baseConversionInput + "</b> in <b>" + inputButtonWithSelectedClass + "</b> form is equal to <b>" + convertIntegerFromBinary(baseConversionInput, outputBase) + "</b> in <b>" + outputButtonWithSelectedClass + "</b> form.";
                break;
            case "Octal":
            case "HexaDecimal":
            default:
                console.log("Invalid input or functionality not yet implemented");
        }
   
    } //End of convertBetweenBases function
    
    
    //Attach event listener to "convert" button
    convertButton.addEventListener("click", convertBetweenBases);
    
} //End Base Conversion Functionality


/* =================================================================
                FUNCTIONALITY FOR MENU BAR
   ===============================================================*/
function menuFunctionality() {
    var allWidgets = document.getElementsByClassName("widgetDiv");
    var basicCalc = document.getElementById("basicCalc");
    var factorsCalc = document.getElementById("factorsCalc");
    var baseConversionCalc = document.getElementById("baseConversionCalc");
    var menuButtons = document.getElementsByClassName("menuButton");
    
    // Add "selected" class to menu buttons when div is active
    addSelectedClassWithEventListeners(menuButtons);
        
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
    
    function showBaseConversionCalc() {
        hideAll();
        baseConversionCalc.style.display = "block";
    }
    
    // Attach functions to buttons
    document.getElementById("menuCalc").addEventListener("click", showBasicCalc);
    document.getElementById("menuFactors").addEventListener("click", showFactorsCalc);
    document.getElementById("menuBaseConversion").addEventListener("click", showBaseConversionCalc);      
} //End functionality for menu bar


/* =================================================================
                        MAIN FUNCTION
 * Calls all the other functions
   ===============================================================*/
function main() {
    calcFunctionality();
    menuFunctionality();
    factorFunctionality();
    baseConversionFunctionality();
}

// Call main onload
window.onload = main;
