/* Main Function- will load javascript in head when window
 * is fully loaded.
 */
function main() {
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


window.onload = main;