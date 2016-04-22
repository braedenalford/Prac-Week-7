/*
 * Morse Code receiver app information:
 *
 * Function: messageFinished(): stops the capturing process
 *
 *     You can call this function to let the app know that the 
 *     end-of-transmission signal has been received.
 *
 * -------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *     This will be a textarea element where you can display
 *     the recieved message for the user.
 * 
 * -------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *     This is a button element.  When clicked this should 
 *     cause your app t
 o reset its state and begin recieving
 *     a new message.
 *
 */

/*
* Purpose: This file is to decode an android camera's image and
*  determine whether it is mainly red or blue.
*  It also finds the amount of time units that the mainly red or
*  blue image has been shown and deciphers it into dots and dashes. These
*  dots and dashes are then translating using the lookup table into letters,
*  numbers, punctuation or prosigns for the Qabros.
* Team: 095
* Author: Braeden Alford, Cameron Johns, Janice Wong, Connor Rate
* Last Modified: 10 April 2016
* Version: 1.4.1
*/


// ADD YOUR ADDITIONAL FUNCTIONS AND GLOBAL VARIABLES HERE
var messageFieldRef = document.getElementById("messageField");
var redCount = 0;
var blueCount = 0;
var message = "";
var braeden = "awesome";
var connor = "super";
var cameron = "not here";

document.getElementById("restartButton").addEventListener("click", restart); //this method attaches a click event that resets the code after 
                                                                             //messageFinish() has been called
/*
 * This function is called once per unit of time with camera image data.
 * 
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *         Each pixel is representing by four consecutive integer values for 
 *         the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *         instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is 
 *         an 'on' (red) signal.
 */

function decodeCameraImage(data)
{
    red = 0;
    blue = 0;
    for (var i = 0; i < data.length; i += 4) //increments by 4 until it has reached the complete range of the data's values.
                                             //This goes through each of the pixels so you can look into the red and blue
                                             //components and compare them
    {
        if (data[i] > data[i+2]) //if there is more red (data[i]) than blue (data[i+2]) in the image, then add 1 to the variable counter, red
        {
            red++;
        }
        else if (data[i+2] > data[i]) // if there is more blue (data[i+2]) than red (data[i]) in the image, then add 1 to the variable counter,
                                      //blue
        {
            blue++;
        }
        
        else if (red > data.length/2 || blue > data.length/2) //if the amount of mainly red or blue pixels is greater than half the pixels,
                                                              //end the for loop as the image being red or blue has already been determined
        {
            break;
        }
    }
    
    if (red > blue) //if the image is more red, then add 1 to the redCount variable to determine dots and dashes, run the function space()
                    //to apply spaces, assign blueCount to the initial state of 0 and return true
    {
        redCount++
        space();
        blueCount = 0;
        return true;
    }
    
    else if (blue > red) //if the image is more blue, then add 1 to the blueCount variable to determine inter-element, characte and word spaces  
                         //, run the function character()to apply dots and dashes, assign redCount to the initial state of 0 and return false
    {
        blueCount++
        character();
        redCount = 0;
        return false;
    }
}

//This function is called by the function decodeCameraImage when it finds that the 
//image shown is mainly red, using the variable counters red and blue. This will then 
//look at the amount of time units that the previous mainly blue images have been shown
//before the mainly red image. Using the amount of time units of the previous blue images
//it will output a letter or a letter and a space using the string, message

function space()
{
    if (message != "") //this makes sure that the variable message has dots and dashes to
                       //prevent an initial undefined message from checking the lookup table 
                       //for an empty string
    {
		if (blueCount <=6 && blueCount >= 3) //if blue has been shown for 3-6 time units, add the letter associated with the dots and dashes
                                             //in the lookup table, morseTable
        {
            messageFieldRef.innerHTML += morseTable[message];
            message = "";   //resets the message string so it can take new dots and dashes for a new letter
        }
        
        else if(blueCount >= 7) //if blue has been shown for 7 or more time units, add the letter associated with the dots and dashes
                                //in the look up table and followed by a space
        {
            messageFieldRef.innerHTML += morseTable[message] + " ";   
            message = "";   //resets the message string so it can take new dots and dashes for a new letter
        }
    }
}

//This function is called by the function decodeCameraImage when it finds that the
//image shown is mainly blue, using the variable counters red and blue. This will then
//look at the amount of time units that the previous mainly red images have been shown
//before the mainly blue image. Using the amount of time units of the previous red images
//it will assign a dot or a dash to the string, message, or if the message is equal to the
//string "...-.-", it will run the messageFinished() to end the process.

function character()
{
    if (message === "...-.-") //if the message string is the same as "...-.-", it will run the function messageFinished which will let the app
                              //know the transmission is complete
    {
        messageFinished();
    }
    
    else if (redCount <= 2 && redCount >= 1) //if red has been shown for 1-2 time units, it will add a dot to the message string
    {
        message += ".";
    }
    
    else if (redCount >= 3) //if red has ben shown for 3 or more time units, it will add a dash to the message string
    {
        message += "-";
    }
    
}

//This function will reset all the variables and message text area back to their initial states

function restart()
{
    redCount = 0;
    blueCount = 0;
    messageFieldRef.innerHTML = "";
    message = "";
}

//lookup table for all the necessary dots and dashes combinations

var morseTable = 
{
    //LETTERS
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    //NUMBERS
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    //PUNCTUATION
    ".----.": "\"",
    "-.--.": "(",
    "-.--.-": ")",
    ".-..-.": '"',
    "........-..-": "$",
    ".----.": "'",
    "-..-.": "/",
    ".-.-.": "+",
    "---...": ":",
    ".-.-.-": ".",
    "--..--": ",",
    "..--..": "?",
    "-....-": "-",
    ".--.-.": "@",
    "-...-": "=",
    "..--.": "_",
    "---.---.": "!",
    //PROSIGNS
    ".-.-": "\n",
};

