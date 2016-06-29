/* =======================================================
              GLOBAL/ RECYCLABLE FUNCTIONS
   =====================================================*/

/* This function removes the "selected" class from 
   all buttons of a input array 
 * @param inputArr: an array of elements
 */
function removeSelectedClass(inputArr) {
    for (i = 0; i < inputArr.length; i++) {
        inputArr[i].classList.remove("selected");
    }
}
    
/* Attach eventListeners so that when an input element is 
   clicked, the selected class is removed from related 
   elements and added to the clicked element
 * @param inputArr: an array of elements
 */
function addSelectedClassWithEventListeners(inputArr) {
   for (i = 0; i < inputArr.length; i++) {
        inputArr[i].addEventListener("click", function(event) {
            removeSelectedClass(inputArr);
            this.classList.add("selected");
        });
    }
}

//Console.log function for debugging
function print (anything) {
    console.log(anything);
}


/* =======================================================
            FUNCTIONALITY FOR BASIC CALCULATOR
   =====================================================*/
function calcFunctionality() {
    //Local calculator variables
    var dispValue = document.getElementById("dispValue"),      
        dispValue2 = document.getElementById("dispValue2"),
        secondaryDispVal = "", primaryDispVal = "",
        calcButtons = document.getElementsByClassName("calcButton"),
        i, prevKey;
        var radixIsActive = false;
        var tempDigit = "";

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
    
    
    //Returns the last integer stored in secondaryDispVal
    function getLastVal() {
        var temp = "";
        var strLength = secondaryDispVal.length;
        var max = secondaryDispVal.lastIndexOf("+");
        
        if (secondaryDispVal.lastIndexOf("-") > max) {
            if (secondaryDispVal.charAt(secondaryDispVal.lastIndexOf("-") + 1) == " ") {
                max = secondaryDispVal.lastIndexOf("-");
            }
        } else if (secondaryDispVal.lastIndexOf("*") > max) {
            max = secondaryDispVal.lastIndexOf("*");
        } else if (secondaryDispVal.lastIndexOf("/") > max) {
            max = secondaryDispVal.lastIndexOf("/");
        }
        
        for (var i = max + 1; i < strLength; i++) {
            temp += secondaryDispVal.charAt(i);
        }
        
        if (temp.length == 0 || temp == " ") {
            temp = null;
        }
        
        return temp;
    }
    
     //Resets the calculator
    function CClick() {
        secondaryDispVal = "";
        primaryDispVal = "0";
        calcObject.updateDisplay("0", " ");
        updateDisplay();
        tempDigit = "";
        radixIsActive = false;
    }
   
    //Adds the buttons value to the dispValue strings and updates display
    function buttonClick() {
        var hold = this.innerHTML;
        var isHoldANumber = hold == "0" || hold == "1" || hold == "2" || hold == "3" || hold == "4" || hold == "5" || hold == "6" || hold == "7" || hold == "8" || hold == "9" || hold == ".";
        
        
        //If the previous key pressed was "=", reset calc
        if (prevKey == "=") {
            CClick();
        } 
        
        /* If the squareroot button is clicked, keep all the digits succeeding
         it until a operator or equal sign is clicked. */
        if (hold == "\u221A"){ 
            radixIsActive = true;
            primaryDispVal = "\u221A";
            updateDisplay();
            prevKey = hold;
            return;
        } else if (radixIsActive) {
            if (isHoldANumber && radixIsActive) {
                primaryDispVal += hold;
                tempDigit += hold;
                updateDisplay();
                prevKey = hold;
                return;
            } else {
                radixIsActive = false;
                tempDigit = Math.sqrt(parseFloat(tempDigit));
                secondaryDispVal += tempDigit.toString();
            }
            
        }
            
        
        //Logic to build the calculation screen
        if (isHoldANumber) {
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
            // Answers are calculated here when "=" is pressed.
            primaryDispVal = +eval(secondaryDispVal).toFixed(5);
            secondaryDispVal += " =";
        } else {
            if (!radixIsActive) {
                secondaryDispVal += hold;                
            }   
        }
        
        //Save response to prevKey variable
        prevKey = hold;
        
        //Update the calculator display
        updateDisplay();
    }
    
   
    //Clears primary display when CE is clicked
    function CEClick () {
        secondaryDispVal = secondaryDispVal.substring(0, secondaryDispVal.length-primaryDispVal.length);
        primaryDispVal = "0";
        updateDisplay();
    }
    
    
    /* 
     * If the length of primaryDispVal is 1, primaryDispVal 
     * becomes 0, the last character in secondaryDispVal is
     * removed. Else, remove the last character from both displays
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
    
 
    // Converts the last digit entered to negative value
    function posnegClick () {
        secondaryDispVal = secondaryDispVal.substring(0, secondaryDispVal.length-primaryDispVal.length);
        primaryDispVal = parseFloat(primaryDispVal);
        primaryDispVal *= -1;
        primaryDispVal = primaryDispVal.toString();
        secondaryDispVal += primaryDispVal;
        updateDisplay();
    }
    
    
    // Squares the input integer
    function squareIt () {
        var lastVal = getLastVal();
        secondaryDispVal += " * " + lastVal;
        updateDisplay();
    }
    
    //Initial Dom Update
    dispValue.innerHTML = calcObject.primaryDisplay;
    
    /* Attaches a function to a button so that
       the function runs when the button is clicked */
    function runWhenClicked (button, func) {
        button.addEventListener("click", func);
    }
    
    
    function getSquareRoot () {
        primaryDispVal = "\u221A";
    }
    
    //Add event listeners to the calculators' buttons
    for (i = 0; i < calcButtons.length; i++) {
        var buttonSelected = calcButtons[i];
        var buttonText = buttonSelected.innerHTML;
        
        if (buttonText == "CE") {
            runWhenClicked(buttonSelected, CEClick);
        } else if (buttonText == "Del") {
            runWhenClicked(buttonSelected, delClick);
        } else if (buttonText == "C") {
            runWhenClicked(buttonSelected, CClick);
        } else if (buttonText == "+/-") {
            runWhenClicked(buttonSelected, posnegClick);
        } else if (buttonText == "x^2") {
            runWhenClicked(buttonSelected, squareIt);
        } else {
            runWhenClicked(buttonSelected, buttonClick);
        }
    }
} //End basic calculator functionality


/* =======================================================
            FUNCTIONALITY FOR FACTORS WIDGET
   =====================================================*/
function factorFunctionality() {
    // Functions variables
    var factorInputButton = document.getElementById("factorInputButton");
    var factorResetButton = document.getElementById("factorResetButton");
    var factorInput = document.getElementById("factorInput");
    var factorOutput = document.getElementById("factorOutput");
    var inputArray = [];
    var outputString = "";
    var temp = 0;
    
    // Function that will calculate the actual factors
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
    
    /* When the "Add" button is clicked:
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


/* =======================================================
              FUNCTIONALITY FOR BASE CONVERSION
   =====================================================*/
function baseConversionFunctionality() {
    var inputSelectorButtons = document.querySelectorAll("#inputBaseOption button");
    var outputSelectorButtons = document.querySelectorAll("#outputBaseOption button");
    var convertButton = document.getElementById("baseConversionConvert");
    var baseConversionOutput = document.getElementById("baseConversionOutput");
    var outputArr, temp;
    
    
    //Add the selected class to buttons
    addSelectedClassWithEventListeners(inputSelectorButtons);
    addSelectedClassWithEventListeners(outputSelectorButtons);
    
   /* Function to run if input is decimal
    * @param inputValue: a decimal value to be converted
    * @param base: the base you want as an output
    * @return a string value = to the inputValue in specified base
    */
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
        
        //Logic for hexadecimal-only values
        for (var i = 0; i < outputArr.length; i++) {
            switch (outputArr[i]) {
                    case 10:
                        outputArr[i] = "A";
                        break;
                    case 11:
                        outputArr[i] = "B";
                        break;
                    case 12:
                        outputArr[i] = "C";
                        break;
                    case 13:
                        outputArr[i] = "D";
                        break;
                    case 14:
                        outputArr[i] = "E";
                        break;
                    case 15:
                        outputArr[i] = "F";
                        break;
                    default: // Do nothing
                        break;
            }
        }
        
        return outputArr.join("");
    }
    
   /* Function to run if input is binary
    * @param inputValue: a binary value to be converted
    * @param base: the base you want as an output
    * @return a string value = to the inputValue in specified base
    */
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
    
   /* Function to run if input is octal
    * @param inputValue: a octal value to be converted (string)
    * @param base: the base you want as an output
    * @return a string value = to the inputValue in specified base
    */
    function convertIntegerFromOctal(inputInteger, base) {
        outputArr = [];
        temp = 0;
        
        //Store string recieved in an array
        outputArr = inputInteger.split("");
        
        //Convert each index of the array into Binary
        for (var i = outputArr.length; i > 0; i--) {
            temp = parseInt(outputArr[i-1]).toString(2);
            
            //Add leading 0's to binary string so length = 3 chars
            if (temp.length == 1) {
                outputArr[i-1] = "00" + temp;
            } else if (temp.length == 2) {
                outputArr[i-1] = "0" + temp;
            } else {
                outputArr[i-1] = temp;
            }
        }
        
        //Reform the string in binary
        temp = outputArr.join("");
        
        //Return the binary code passed into convertIntegerFromBinary
        return convertIntegerFromBinary(temp, base);
    }
    
   /* Function to run if input is hexaDecimal
    * @param inputValue: a hexaDecimal value to be converted
    * @param base: the base you want as an output
    * @return a string value = to the inputValue in specified base
    */
    function convertIntegerFromHexadecimal(inputInteger, base) {
        outputArr = [];
        temp = 0;
        
        //Store string recieved in an array
        outputArr = inputInteger.split("");
        
        //Convert each index of the array into Binary
        for (var i = outputArr.length; i > 0; i--) {
    
            //Convert base 16 A-F to decimal forms
            switch (outputArr[i-1]) {
                case "A":
                    outputArr[i-1] = 10;
                    break;
                case "B":
                    outputArr[i-1] = 11;
                    break;
                case "C":
                    outputArr[i-1] = 12;
                    break;
                case "D":
                    outputArr[i-1] = 13;
                    break;
                case "E":
                    outputArr[i-1] = 14;
                    break;
                case "F":
                    outputArr[i-1] = 15;
                    break;
                default:
                   
            }
          
            //Convert each index of the array to binary and store in temp
            temp = parseInt(outputArr[i-1]).toString(2);
        
            //Add leading 0's to binary string so length = 4 chars
            if (temp.length == 1) {
                outputArr[i-1] = "000" + temp;
            } else if (temp.length == 2) {
                outputArr[i-1] = "00" + temp;
            } else if (temp.length == 3) {
                outputArr[i-1] = "0" + temp;
            } else {
                outputArr[i-1] = temp;
            }
        }
       
        //Re-form the string in binary
        temp = outputArr.join("");
        
        //Return the binary code passed into convertIntegerFromBinary
        return convertIntegerFromBinary(temp, base);
    }
    
    
    //The main function to run when the convert button is clicked
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
        
        //Store the selected base
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
                baseConversionOutput.innerHTML = "The value of <b>" + baseConversionInput + "</b> in <b>" + inputButtonWithSelectedClass + "</b> form is equal to <b>" + convertIntegerFromOctal(baseConversionInput, outputBase) + "</b> in <b>" + outputButtonWithSelectedClass + "</b> form.";
                break;
            case "HexaDecimal":
                baseConversionOutput.innerHTML = "The value of <b>" + baseConversionInput + "</b> in <b>" + inputButtonWithSelectedClass + "</b> form is equal to <b>" + convertIntegerFromHexadecimal(baseConversionInput, outputBase) + "</b> in <b>" + outputButtonWithSelectedClass + "</b> form.";
                break;
            default:
                console.log("Invalid Input");
        }
   
    } //End of convertBetweenBases function
    
    
    //Attach event listener to "convert" button
    convertButton.addEventListener("click", convertBetweenBases);
    
} //End Base Conversion Functionality


/* =======================================================
                FUNCTIONALITY FOR MENU BAR
   =====================================================*/
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
    
    // Hides all divs, show calculator
    function showBasicCalc() {
        hideAll();
        basicCalc.style.display = "block";
    }
    
    // Hides all divs, show factors widget
    function showFactorsCalc() {
        hideAll();
        factorsCalc.style.display = "block";
    }
    
    // Hides all divs, show base conversion widgets
    function showBaseConversionCalc() {
        hideAll();
        baseConversionCalc.style.display = "block";
    }
    
    // Attach functions to buttons
    document.getElementById("menuCalc").addEventListener("click", showBasicCalc);
    document.getElementById("menuFactors").addEventListener("click", showFactorsCalc);
    document.getElementById("menuBaseConversion").addEventListener("click", showBaseConversionCalc);      
} //End functionality for menu bar


/* =====================================================
                        MAIN FUNCTION
 * Calls all the other functions
   ===================================================*/
function main() {
    calcFunctionality();
    menuFunctionality();
    factorFunctionality();
    baseConversionFunctionality();
}

// Call main onload
window.onload = main;
