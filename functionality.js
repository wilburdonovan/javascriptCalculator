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
    
     //Function to run when an invalid mathematical operation is attempted
    function invalidOperation () {
        primaryDispVal = "Invalid";
        updateDisplay();
        prevKey = "=";
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
    
    //Removes the last integer from secondaryDispVal
    function removeLastInteger () {
        secondaryDispVal = secondaryDispVal.substring(0, secondaryDispVal.length-primaryDispVal.length);
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
   
    //If the previous button was "=", reset calc
    function checkPreviousButton () {
        if (prevKey == "=") {
            CClick();
        } 
    }
    
    //Adds the buttons value to the dispValue strings and updates display
    function buttonClick() {
        var hold = this.innerHTML;
        var isHoldANumber = hold == "0" || hold == "1" || hold == "2" || hold == "3" || hold == "4" || hold == "5" || hold == "6" || hold == "7" || hold == "8" || hold == "9" || hold == ".";
        
        checkPreviousButton();
        
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
        
        // Divide by 0 prevention
        if (prevKey == "/" && hold == "0") {
            invalidOperation();
            return;
        }
        
        // Prevents double non number values
        if (!isHoldANumber && isNaN(prevKey)) {
            invalidOperation();
            return;
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
        removeLastInteger();
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
        checkPreviousButton();
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
    
    //Work with Pi
    function insertPi () {
        checkPreviousButton();
        
        //Check to see if last value entered is a number
        if (!isNaN(prevKey)) {
            secondaryDispVal += " * 3.1416";
        } else {
            secondaryDispVal += "3.1416";
        }
        
        
        primaryDispVal = "3.14159";
        updateDisplay();
        prevKey = "3.14159";
    }
      
    //Functionality for the factorial button
    function calcFactorial () {
    
        var lastDigit = parseInt(getLastVal());
        var answer = 1;
        
        for (i = lastDigit; i > 0; i--) {
            answer *= i;
        }
    
        if (isNaN(lastDigit)) {
            invalidOperation();
        } else {
            removeLastInteger();
            primaryDispVal = lastDigit + "!";
            secondaryDispVal += answer;
            updateDisplay();
            prevKey = "!";
        }
        
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
        } else if (buttonText == "\u03C0") {
            runWhenClicked(buttonSelected, insertPi);
        } else if (buttonText == "n!") {
            runWhenClicked(buttonSelected, calcFactorial);
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
        
        // Validation for input
        if (isNaN(temp)) {
            alert("Invalid Number Entered in text field. Please enter a valid integer.");
            return;
        } else if (temp == 0) {
            alert("All real numbers are factors of 0.");
            return;
        } else if (temp > 20000) {
            alert("That integer is too large. Please try a smaller value.");
            return;
        } else if (temp < 0) {
            alert("Please enter a natural number.");
            return;
        } else {
            inputArray.push(temp);
        }
        
        
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
             FUNCTIONALITY FOR SCRIBBLEPAD
   =====================================================*/
function scribbleFunctionality() {
    var c = document.getElementById("scribbleCanvas");
    var cDiv = document.getElementById("scribbleDiv");
    var ctx = c.getContext("2d");
    var scribble = false, isDragging = false;
    var clearButton = document.getElementById("clearCanvas");
    var colorSelector = document.getElementById("colorSelector");
    var x, y, prevX, prevY;
    var bRect, offsetLeft, offsetTop;
    var blackColor = "#000000", blueColor = "#202dd1", redColor = "#be1d1d", greenColor = "#236911",
        yellowColor = "#e7ce28", purpleColor = "#7c28c8", pinkColor = "#cb23be";
    var penColor = blackColor;
    
    // Insert scribblepad title within canvas
    function insertTitle () {
        ctx.font = "15px Arial";
        ctx.fillStyle = "#008eff";
        ctx.fillText("ScribblePad",305,390);
    }
    
    // Sets x and y coordinates
    function setCords (event) {
        x = event.clientX - offsetLeft;
        y = event.clientY - offsetTop;
    }
    
    // Calculates offsets
    function setOffsets () {
        bRect = c.getBoundingClientRect();
        offsetLeft = bRect.left;
        offsetTop = bRect.top;
    }
    
    /* Takes in an event as a parameter, calculates
    the mouse position, draws a very small rectangle
    at that position, and if dragged, draws a line 
    between the new rectangle and old rectangle */
    function draw (event) {
        setCords(event);
        ctx.fillStyle = penColor;
        ctx.strokeStyle = penColor;
        ctx.fillRect(x,y,.01,.01);
        
        if (prevX != null && isDragging) {
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(x,y);
            ctx.lineTo(prevX, prevY);
            ctx.closePath();
            ctx.stroke(); 
        }
        
        prevX = x;
        prevY = y;
    }
    
    // Clears the canvas
    function clearCanvas () {
        ctx.clearRect(0, 0, c.width, c.height);
        insertTitle();
    }
    
    // Change the pens color
    function changePenColor () {
        var selectedOption = colorSelector.value;

        switch (selectedOption) {
            case "blue":
                penColor = blueColor;
                break;
            case "black":
                penColor = blackColor;
                break;
            case "red":
                penColor = redColor;
                break;
            case "green":
                penColor = greenColor;
                break;
            case "pink":
                penColor = pinkColor;
                break;
            case "purple":
                penColor = purpleColor;
                break;
            case "yellow":
                penColor = yellowColor;
                break;
            default:
                penColor = blackColor;
        }
    }
    
    insertTitle(); //Initial call
    
    // Attach functions to events
    clearButton.addEventListener("click", clearCanvas);
    
    colorSelector.addEventListener("change", changePenColor);
    
    c.addEventListener("mousedown", function (event) {
        setOffsets(); //In case of window resize, scrollbar appearance etc
        scribble = true;
        draw(event);
    });
    
    c.addEventListener("mousemove", function (event) {
        if (scribble) {
            isDragging = true;
            draw(event);
        }
    });
    
    c.addEventListener("mouseup", function () {
        scribble = false;
        isDragging = false;
    });
    
    c.addEventListener("mouseenter", function () {
        c.style.cursor = "crosshair";
    });
    
    c.addEventListener("mouseleave", function () {
        c.style.cursor = "default";
    });
    
    
    
} //End functionality for scribble widget


/* =======================================================
             FUNCTIONALITY FOR FRACTIONS
   =====================================================*/
function fractionsFunctionality() {

    var outputPara = document.getElementById("fractionOutput");
    var calculateButton = document.getElementById("fractionsCalcBtn");
    var operatorButtons = document.getElementsByClassName("fracBtn");
    var selectedOperator, ansNumerator, ansDenominator, fracAnswer, temp, isNegative = false;
    
    // Add selected class to operators
    addSelectedClassWithEventListeners(operatorButtons);
    
    // Check which operator was selected
    function checkOperators () {
        for (var i = 0; i < operatorButtons.length; i++) {
            if (operatorButtons[i].classList.contains("selected")) {
                selectedOperator = operatorButtons[i].innerHTML;
            }
        }
    }
    
    // Find the largest common factor of two numbers
    function greatestFactor (a, b) {
        for (var i = a; i > 0; i--) {
            if (a % i == 0 && b % i == 0) {
                return i;
            }
        } 
    }
    
    //Simplifies a fraction
    function simplifyFrac () {
        temp = greatestFactor(ansNumerator, ansDenominator);
        ansDenominator /= temp;
        ansNumerator /= temp;
    }
    
    // Adds or subtracts 2 fractions
    function calculateFractionsAnswer (num1, denom1, num2, denom2, operation) {
        ansDenominator = denom1 * denom2;
        
        if (operation.toLowerCase() == "add") {
            ansNumerator = (denom2 * num1) + (denom1 * num2);
        } else if (operation.toLowerCase() == "subtract") {
            ansNumerator = (denom2 * num1) - (denom1 * num2);
        } else if (operation.toLowerCase() == "multiply") {
            ansNumerator = num1 * num2;
        } else if (operation.toLowerCase() == "divide") {
            ansDenominator = num2 * denom1;
            ansNumerator = num1 * denom2;
        } else {
            alert("Error occured in calculating fraction");
        }
        
        // Logic if numerator or denominator for answer is negative
        if (ansDenominator < 0 || ansNumerator < 0) {
            if (ansDenominator < 0) {
                ansDenominator *= -1;
            }
            if (ansNumerator < 0) {
                ansNumerator *= -1;
            }
            isNegative = true;
        }
        
        simplifyFrac();
    }
    
    function calculateAnswer () {
        var input1 = document.getElementById("fraction1").value;
        var input2 = document.getElementById("fraction2").value;
        
        input1 = input1.split("/");
        input2 = input2.split("/");
        
        // Validate input
        if (input1[0] > 1000 || input1[1] > 1000 || input2[0] > 1000 || input2[1] > 1000) {
            alert("Input contains a large fraction. Maybe factor some of the input and try again");
            return;
        }
        
        checkOperators();
        
        switch (selectedOperator) {
            case "+":
                calculateFractionsAnswer(input1[0], input1[1], input2[0], input2[1], "add");
                break;
            case "-":
                calculateFractionsAnswer(input1[0], input1[1], input2[0], input2[1], "subtract");
                break;
            case "*":
                calculateFractionsAnswer(input1[0], input1[1], input2[0], input2[1], "multiply");
                break;
            case "/":
                calculateFractionsAnswer(input1[0], input1[1], input2[0], input2[1], "divide");
                break;
            default:
                alert("ERROR: PLEASE REFRESH");
        }
        
        if (ansDenominator == ansNumerator) {
            outputPara.innerHTML = "1";
            return;
        } else if (ansDenominator == 0) {
            outputPara.innerHTML = "Invalid Input";
            return;
        } else if (ansNumerator % ansDenominator == 0) {
            outputPara.innerHTML = (ansNumerator / ansDenominator).toString();
            return;
        }
        else { // Add a negative sign if answer is negative
            if (isNegative) {
                fracAnswer = "-";
                isNegative = false;
            } else {
                fracAnswer = "";
            }
            fracAnswer += ansNumerator.toString() + "&frasl;" + ansDenominator;
            outputPara.innerHTML = fracAnswer;
        }
    }
    
    calculateButton.addEventListener("click", calculateAnswer);
    
} // End functionality for fractions


/* =======================================================
             FUNCTIONALITY FOR INTEREST
   =====================================================*/
function interestFunctionality() {
    // Variables for interest widget as a whole
    var interestButtons = document.querySelectorAll("#interestType button");
    var simpleInterestDiv = document.getElementById("simpleInterestDiv");
    var compoundInterestDiv = document.getElementById("compoundInterestDiv");
    var compoundingPeriodBtns = document.querySelectorAll("#compoundingPeriod .BUTTON");
    var temp;
    
    // Variables for simple interest functionality
    var sInterestCalcBtn = document.getElementById("sInterestCalcBtn");
    var sInterestOutput = document.getElementById("sInterestOutput");
    var sTotalInterest;
    var sTotalRepayment, sRepaymentPerMonth, sRepaymentPerWeek, sRepaymentPerYear;
    var sInterestOutputString = "";
    
    // Variables for compound interest functionality
    var cInterestCalcBtn = document.getElementById("cInterestCalcBtn");
    var cInterestOutput = document.getElementById("cInterestOutput");
    var cTotalInterest;
    var cTotalRepayment, cRepaymentPerMonth, cRepaymentPerWeek, cRepaymentPerYear;
    var cInterestOutputString = "";
    
    // Function that calculates simple interest
    function calcSimpleInterest () {
        // Get Input and store in variables
        var sInterestRate = document.getElementById("sInterestRate").value;
        var sInterestTime = parseInt(document.getElementById("sInterestTime").value);
        var sInterestPrincipal = parseInt(document.getElementById("sInterestPrincipal").value);
        // Validate input
        if (isNaN(sInterestRate) || isNaN(sInterestTime) || isNaN(sInterestPrincipal)) {
            alert("One or more fields are blank OR invalid input. Please try again.");
            return;
        }
        if (sInterestPrincipal < 1 || sInterestRate <= 0 || sInterestTime <= 0) {
            alert("One of your values is 0 or negative. Please retry.");
            return;
        }
        // Reset output string
        sInterestOutputString = "";
        // Make calculations
        temp = parseFloat(sInterestRate) / 100;
        sTotalInterest = sInterestPrincipal * temp * sInterestTime;
        sTotalRepayment = sTotalInterest + sInterestPrincipal;
        sRepaymentPerYear = sTotalRepayment / sInterestTime;
        sRepaymentPerMonth = sRepaymentPerYear / 12;
        sRepaymentPerWeek = sRepaymentPerYear / 52;
        // Build the output string
        sInterestOutputString += "<ul class='noBullets noPadding'><li class='bold'>The total interest you will pay back is: $" + sTotalInterest.toFixed(2) + "</li>";
        sInterestOutputString += "<li>-----------------------------------------</li>";
        sInterestOutputString += "<li class='bold'>Total repayable: $" + sTotalRepayment.toFixed(2) + "<li>";
        sInterestOutputString += "<li>Yearly repayment: $" + sRepaymentPerYear.toFixed(2) + "</li>";
        sInterestOutputString += "<li>Monthly repayment: $" + sRepaymentPerMonth.toFixed(2) + "</li>";
        sInterestOutputString += "<li>Weekly repayment: $" + sRepaymentPerWeek.toFixed(2) + "</li></ul>";
        // Display output string on output para
        sInterestOutput.innerHTML = sInterestOutputString;
        // Reset output string
        sInterestOutputString = "";
    }
    
    
    // Function that calculates compound interest
    function calcCompoundInterest () {
        // Get input and store in variables
        var cInterestRate = parseFloat(document.getElementById("cInterestRate").value);
        var cInterestTime = parseInt(document.getElementById("cInterestTime").value);
        var cInterestPrincipal = parseInt(document.getElementById("cInterestPrincipal").value);
        var compoundingPeriod;
        // Validate input
        if (isNaN(cInterestRate) || isNaN(cInterestTime) || isNaN(cInterestPrincipal)) {
            alert("One or more fields are blank OR invalid input. Please try again.");
            return;
        }
        if (cInterestPrincipal < 1 || cInterestRate <= 0 || cInterestTime <= 0) {
            alert("One of your values is 0 or negative. Please retry.");
            return;
        }
        // Reset output string
        cInterestOutputString = "";
        // Get the compounding period
        for (let button of compoundingPeriodBtns) {
            if (button.classList.contains("selected")){
               compoundingPeriod = button.value; 
            }
        }
        // Set interest rate
        if (compoundingPeriod == "monthly") {
            temp = cInterestRate / 1200;
        } else {
            temp = cInterestRate / 100;
        }
        temp += 1;
        // Make calculation
        cTotalRepayment = cInterestPrincipal * Math.pow(temp, cInterestTime);
        cTotalInterest = cTotalRepayment - cInterestPrincipal;
        if (compoundingPeriod == "monthly"){
            cRepaymentPerYear = cTotalRepayment / (cInterestTime/12);
        } else {
            cRepaymentPerYear = cTotalRepayment / cInterestTime;
        }
        cRepaymentPerMonth = cRepaymentPerYear / 12;
        cRepaymentPerWeek = cRepaymentPerYear / 52;
        // Build output string
        cInterestOutputString += "<ul class='noBullets noPadding'><li class='bold'>The total interest you will pay back is: $" + cTotalInterest.toFixed(2) + "</li>";
        cInterestOutputString += "<li>-----------------------------------------</li>";
        cInterestOutputString += "<li class='bold'>Total repayable: $" + cTotalRepayment.toFixed(2) + "<li>";
        cInterestOutputString += "<li>Yearly repayment: $" + cRepaymentPerYear.toFixed(2) + "</li>";
        cInterestOutputString += "<li>Monthly repayment: $" + cRepaymentPerMonth.toFixed(2) + "</li>";
        cInterestOutputString += "<li>Weekly repayment: $" + cRepaymentPerWeek.toFixed(2) + "</li></ul>";
        // Attach output string to output div
        cInterestOutput.innerHTML = cInterestOutputString;
    }
    
    // Add selected class to relevant groups of buttons on toggle
    addSelectedClassWithEventListeners(interestButtons);
    addSelectedClassWithEventListeners(compoundingPeriodBtns);
    
    // Add event listeners to relevant functions to run on calculate
    sInterestCalcBtn.addEventListener("click", calcSimpleInterest);
    cInterestCalcBtn.addEventListener("click", calcCompoundInterest);
    
    // Add event listeners to hide and show divs
    for (var i = 0; i < interestButtons.length; i++) {
        interestButtons[i].addEventListener("click", function (event) {
            if (event.target.value == "simple") {
                simpleInterestDiv.style.display = "block";
                compoundInterestDiv.style.display = "none";
            } else if (event.target.value == "compound") {
                simpleInterestDiv.style.display = "none";
                compoundInterestDiv.style.display = "block";
            } else {
                alert("Something went wrong. Please refresh and try again.");
            }
        }); 
    }
    
    // Hide the compound interest div on initial load
    compoundInterestDiv.style.display = "none";
    
    // Add selected classlist initially to simple interest button
    interestButtons[0].classList.add("selected");
}


/* =======================================================
           FUNCTIONALITY FOR TRIGONOMETRY
   =====================================================*/
function trigonometryFunctionality() {
    //Necessary Variables
    var trigBtns = document.querySelectorAll(".trigBtn");
    var doneBtns = document.querySelectorAll(".doneBtn");
    var trigSections = document.querySelectorAll(".trigSection");
    
    // Hide all trigSections
    function hideTrigSections () {
        for (let section of trigSections) {
            section.style.display = "none";
        }
    }
    
    // Displays the correct trigSection when trigBtn is clicked
    function showRelevantSection () {
        var selected;
        // find the selected button
        for (let btn of trigBtns) {
            if (btn.classList.contains("selected")) {
                selected = btn;
            }
        }
        // hide all the trigSections
        hideTrigSections();
        // find the relevant div and display
        switch (selected.innerHTML) {
            case "Deg/Rad Conversion":
                document.getElementById("degRadConvert").style.display = "block";
                break;
            default:
                alert("Something went wrong. Please try again.");
                return;
        } 
    }
    
    // Initial call to hide all the trigSections
    hideTrigSections();
    
    // Make all the doneBtns hide all the trigSections
    for (let btn of doneBtns) {
        btn.addEventListener("click", hideTrigSections);
        btn.addEventListener("click", function () {
           removeSelectedClass(trigBtns); 
        });
    }
    
    addSelectedClassWithEventListeners(trigBtns); 
    
    // Attach showRelevantSection to all the trigBtns
    for (let btn of trigBtns) {
        btn.addEventListener("click", showRelevantSection);
    }
    
} // End functionality for trigonometry


/* =======================================================
                FUNCTIONALITY FOR MENU BAR
   =====================================================*/
function menuFunctionality() {
    var allWidgets = document.getElementsByClassName("widgetDiv");
    var basicCalc = document.getElementById("basicCalc");
    var factorsCalc = document.getElementById("factorsCalc");
    var baseConversionCalc = document.getElementById("baseConversionCalc");
    var fractionsCalc = document.getElementById("fractionsCalc");
    var interestCalc = document.getElementById("interestCalc");
    var trigonometryCalc = document.getElementById("trigonometryCalc");
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
    
    // Hides all divs, show fractions widget
    function showFractions() {
        hideAll();
        fractionsCalc.style.display = "block";
    }
    
    // Hides all divs, show interest widget
    function showInterest() {
        hideAll();
        interestCalc.style.display = "block";
    }
    
    // Hides all divs, show trigonometry widget
    function showTrigonometry() {
        hideAll();
        trigonometryCalc.style.display = "block";
    }
    
    // Attach functions to buttons
    document.getElementById("menuCalc").addEventListener("click", showBasicCalc);
    document.getElementById("menuFactors").addEventListener("click", showFactorsCalc);
    document.getElementById("menuBaseConversion").addEventListener("click", showBaseConversionCalc);
    document.getElementById("menuFractions").addEventListener("click", showFractions);
    document.getElementById("menuInterest").addEventListener("click", showInterest);
    document.getElementById("menuTrigonometry").addEventListener("click", showTrigonometry);
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
    scribbleFunctionality();
    fractionsFunctionality();
    interestFunctionality();
    trigonometryFunctionality();
}

// Call main onload
window.onload = main;
