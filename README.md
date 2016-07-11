# Javascript Math Assistant
## Written by: Wilbur Donovan

## HOW TO USE
CALCULATOR: Key in any valid calculation using the calculator
buttons and hit "="

FACTORS: Enter a valid integer in the text field provided and
press "Add" to calculate all the factors of the number entered

BASE CONVERSION:
1. Insert valid number in text field
2. Select what number base the input is
3. Select what number base the required output should be
4. Hit convert to generate output

SCRIBBLE: The scribblepad remains next to the utility and will 
follow the page down when scrolling. Click and drag to write
or draw. Click clear to clear the canvas. Click erase, then 
click and drag unwanted input to erase. Click pen to return
to write capability.

FRACTIONS: Input both fractions, chose an operation, click on
calculate. No numerator or denominator can be above 1000.


### CALCULATOR


Major bugs known for functionality already implemented:

- ~~Pressing the "Del" button when primary display is
    a length of 1 will get rid of the div height for the
    primary display div.~~
    **Fixed 11/4/2016**
    
- ~~After a calculation has been made, CE has to be clicked
    to insert a new calculation. Add a conditional so that 
    if the "=" button is clicked, the next button click 
    automatically runs the CE function.~~ 
    **Fixed 11/4/2016**
    
- Multiplying two squareroots together gives some incorrect
    number
    

Ideas for future potential functionality:

- ~~Add additional buttons that perform additional functions
    or give additional values. e.g pi, squareroot, exponents,
    factorials.~~
- Make it so that if a operator is pressed after a operation,
    the operation is carried out on the previous answer.
- Add the ability to use the keyboard numberpad for input
- Add buttons for open and close brackets to organise calculations
- Add more "exception handling" for invalid calculations
  
  
### FACTORS

  
No bugs currently known.
  
Ideas for future potential functionality:

- Calculate the greatest common factor of all integers
    in the array.
    

### BASE CONVERSION


No known bugs.

Ideas for future potential functionality:

- Allow conversion of real numbers up to 10 digits from radix


### SCRIBBLE PAD

No known bugs.

Features currently in implementation:

- Erase functionality to erase unwanted writing

Ideas for future potential funtionality:

- ~~Allow coloured pens~~
- Allow highlighter capabilities
- Allow stored state of current writing


### FRACTIONS

No known bugs.

Ideas for future potential functionality:

- If a decimal value is entered in the first textfield,
    and the second field is blank, convert that into a 
    fraction.


### FUTURE WIDGETS

Future upgrades could include include:

- A trigonometric calculator.
- ~~Conversion between number bases- i.e. decimal, octal,
    hexadecimal and binary with fractional component.~~
    **Implemented 12/4/16 - 25/4/16**
- ~~Add a "Notebook" div similar to a paintboard to 
    squiggle on, draft etc.~~
    **Implemented 2/7/16**
- A graphing tool for functions.
- ~~A calculator that performs operations on fractions.~~
    **Implemented 11/7/16**
- GoogleAds styled to match the webapp.
- ~~Re-comment all function in javadoc-ish style.~~
    **Implemented 23/4/16**
- ~~Update READMe to include basic user guide.~~
  
  