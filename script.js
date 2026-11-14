/* =========================================================
   SkinGuide - External JavaScript file (script.js)
   This file is linked from all 4 pages with:
   <script type="text/javascript" src="script.js"></script>
   ========================================================= */


/* ---------------------------------------------------------
   GLOBAL VARIABLES
   The arrays below keep the data of the 5 skin types.
   Index 0 in every array is "Oily", index 1 is "Dry", ...
   --------------------------------------------------------- */
var skinNames  = ["Oily", "Dry", "Combination", "Normal", "Sensitive"];

var skinImages = ["images/skin-oily.png", "images/skin-dry.png", "images/skin-combination.png",
                  "images/skin-normal.png", "images/skin-sensitive.png"];

var skinTexts  = [
    "Oily skin looks shiny and has large pores. It can get pimples easily.",
    "Dry skin feels tight and rough, and it can have small flaky areas.",
    "Combination skin is oily on the forehead, nose and chin, but normal or dry on the cheeks.",
    "Normal skin is balanced: not too oily and not too dry.",
    "Sensitive skin becomes red or itchy easily, especially with perfumed products."
];

var skinTips   = [
    "Suggestion: Gentle Foam Cleanser + Purifying Clay Mask once a week.",
    "Suggestion: Hydrating Serum + Soothing Cream every night.",
    "Suggestion: Balancing Toner + a light moisturizer.",
    "Suggestion: a simple routine: cleanser, moisturizer and sunscreen.",
    "Suggestion: Soothing Cream and fragrance-free products only."
];

var productNames = ["Gentle Foam Cleanser", "Hydrating Serum", "Soothing Cream",
                    "Daily Sunscreen SPF 50", "Balancing Toner", "Purifying Clay Mask"];

var routine = [];        // the products the user adds to "My Routine"


/* =========================================================
   1. DYNAMIC PICTURE & TEXT  (Home page)
   Called when the user clicks one of the 5 skin type buttons.
   ========================================================= */
function showSkinType(index) {
    // change the picture
    document.getElementById("skinPicture").src = skinImages[index];
    document.getElementById("skinPicture").alt = skinNames[index] + " skin";

    // change the text
    document.getElementById("skinTitle").innerHTML = skinNames[index] + " Skin";
    document.getElementById("skinText").innerHTML  = skinTexts[index];
    document.getElementById("skinTip").innerHTML   = skinTips[index];

    // colour the clicked button pink and the other buttons white (for loop)
    for (var i = 0; i < skinNames.length; i++) {
        if (i == index) {
            document.getElementById("skinBtn" + i).style.backgroundColor = "#c97b84";
            document.getElementById("skinBtn" + i).style.color = "white";
        } else {
            document.getElementById("skinBtn" + i).style.backgroundColor = "white";
            document.getElementById("skinBtn" + i).style.color = "#6b4f4b";
        }
    }
}


/* =========================================================
   2. DYNAMIC ELEMENTS: "My Routine" list  (Home page)
   ========================================================= */

/* adds a product to the list */
function addToRoutine(index) {
    var name = productNames[index];

    // do not add the same product twice (for loop + if)
    for (var i = 0; i < routine.length; i++) {
        if (routine[i] == name) {
            alert(name + " is already in your routine.");
            return;
        }
    }

    routine[routine.length] = name;          // add at the end of the array
    drawRoutine();
}

/* removes the last product from the list */
function removeLastProduct() {
    if (routine.length == 0) {
        alert("Your routine is already empty.");
    } else {
        routine.length = routine.length - 1;
        drawRoutine();
    }
}

/* creates the <li> elements of the list again (while loop) */
function drawRoutine() {
    var html = "";
    var i = 0;

    while (i < routine.length) {
        html = html + "<li>" + routine[i] + "</li>";
        i++;
    }

    if (routine.length == 0) {
        html = "<li>Your routine is empty. Add products from the cards above.</li>";
    }

    document.getElementById("routineList").innerHTML = html;
    document.getElementById("routineCount").innerHTML = routine.length;
}


/* =========================================================
   3. HELPER FUNCTIONS FOR FORM VALIDATION
   ========================================================= */

/* returns true if the text has a number (0 - 9) in it */
function hasNumber(text) {
    for (var i = 0; i < text.length; i++) {
        if (text.charAt(i) >= "0" && text.charAt(i) <= "9") {
            return true;
        }
    }
    return false;
}

/* returns true if the e-mail looks correct, for example sara@mail.com
   rules: no spaces, exactly one "@", at least one character before "@",
   a "." after "@" (not right after it), and at least 2 characters after the last "." */
function isValidEmail(email) {
    var atCount    = 0;      // how many "@" characters
    var atPosition = -1;     // where the "@" is
    var dotPosition = -1;    // where the last "." after the "@" is

    for (var i = 0; i < email.length; i++) {
        var ch = email.charAt(i);

        if (ch == " ") {
            return false;                // spaces are not allowed
        }
        if (ch == "@") {
            atCount++;
            atPosition = i;
        }
        if (ch == "." && atCount == 1) {
            dotPosition = i;             // a "." after the "@"
        }
    }

    if (atCount != 1) {
        return false;                    // must have exactly one "@"
    }
    if (atPosition == 0) {
        return false;                    // must have a name before "@"
    }
    if (dotPosition == -1 || dotPosition == atPosition + 1) {
        return false;                    // must have a "." after "@", not right after it
    }
    if (dotPosition > email.length - 3) {
        return false;                    // must have at least 2 letters after the "."
    }
    return true;
}

/* shows an error message under a field and makes its border red */
function setError(fieldId, message) {
    document.getElementById(fieldId + "Error").innerHTML = message;
    document.getElementById(fieldId).style.borderColor = "#c0392b";
}

/* removes the error message and makes the border green */
function setValid(fieldId) {
    document.getElementById(fieldId + "Error").innerHTML = "";
    document.getElementById(fieldId).style.borderColor = "#7d9a78";
}

/* clears the error message and returns the normal border */
function clearField(fieldId) {
    document.getElementById(fieldId + "Error").innerHTML = "";
    document.getElementById(fieldId).style.borderColor = "#f0dcd6";
}

/* shows a green (success) or red (error) message box */
function showMessage(boxId, text, success) {
    var box = document.getElementById(boxId);
    box.innerHTML = text;
    box.style.display = "block";

    if (success == true) {
        box.style.backgroundColor = "#e6f0e2";
        box.style.color = "#3f6b3a";
    } else {
        box.style.backgroundColor = "#fde2e1";
        box.style.color = "#c0392b";
    }
}


/* =========================================================
   4. LOGIN FORM  (login.html)
   ========================================================= */
function validateLogin() {
    var email    = document.forms["loginForm"]["email"].value;
    var password = document.forms["loginForm"]["password"].value;
    var valid    = true;

    // check the e-mail
    if (email == "") {
        setError("email", "Please enter your e-mail.");
        valid = false;
    } else if (isValidEmail(email) == false) {
        setError("email", "This e-mail is not valid. Example: sara@mail.com");
        valid = false;
    } else {
        setValid("email");
    }

    // check the password
    if (password == "") {
        setError("password", "Please enter your password.");
        valid = false;
    } else if (password.length < 8) {
        setError("password", "Password must be at least 8 characters.");
        valid = false;
    } else {
        setValid("password");
    }

    // show the result
    if (valid == false) {
        showMessage("loginMessage", "Login failed. Please correct the fields in red.", false);
    } else {
        showMessage("loginMessage", "Your information has been validated successfully!", true);
    }

    return false;    // stop the form from reloading the page (no server)
}

/* runs when the user clicks Reset (onreset event) */
function resetLogin() {
    clearField("email");
    clearField("password");
    document.getElementById("loginMessage").style.display = "none";
}


/* =========================================================
   5. SIGN-UP FORM  (signup.html)
   ========================================================= */
function validateSignup() {
    var form     = document.forms["signupForm"];
    var fullName = form["fullName"].value;
    var email    = form["email"].value;
    var password = form["password"].value;
    var confirm  = form["confirmPassword"].value;
    var skinType = form["skinType"].value;
    var valid    = true;

    // 1. full name: at least 3 characters and no numbers
    if (fullName.length < 3) {
        setError("fullName", "Full name must be at least 3 characters.");
        valid = false;
    } else if (hasNumber(fullName)) {
        setError("fullName", "Full name must not contain numbers.");
        valid = false;
    } else {
        setValid("fullName");
    }

    // 2. e-mail
    if (email == "") {
        setError("email", "Please enter your e-mail.");
        valid = false;
    } else if (isValidEmail(email) == false) {
        setError("email", "This e-mail is not valid. Example: sara@mail.com");
        valid = false;
    } else {
        setValid("email");
    }

    // 3. password: at least 8 characters with at least one number
    if (password.length < 8) {
        setError("password", "Password must be at least 8 characters.");
        valid = false;
    } else if (hasNumber(password) == false) {
        setError("password", "Password must contain at least one number.");
        valid = false;
    } else {
        setValid("password");
    }

    // 4. confirm password must be the same
    if (confirm == "") {
        setError("confirmPassword", "Please confirm your password.");
        valid = false;
    } else if (confirm != password) {
        setError("confirmPassword", "Passwords do not match.");
        valid = false;
    } else {
        setValid("confirmPassword");
    }

    // 5. skin type must be selected
    if (skinType == "") {
        setError("skinType", "Please select your skin type.");
        valid = false;
    } else {
        setValid("skinType");
    }

    // show the result
    if (valid == false) {
        showMessage("signupMessage", "Please correct the fields in red.", false);
        return false;
    }

    // choose a first product for the selected skin type (switch)
    var product;
    switch (skinType) {
        case "oily":
            product = "Gentle Foam Cleanser";
            break;
        case "dry":
            product = "Hydrating Serum";
            break;
        case "combination":
            product = "Balancing Toner";
            break;
        case "sensitive":
            product = "Soothing Cream";
            break;
        default:
            product = "Daily Sunscreen SPF 50";
    }

    showMessage("signupMessage", "Welcome to SkinGuide, " + fullName + "! Your information has been validated successfully. " +
                "We suggest you start with: <b>" + product + "</b>.", true);
    return false;    // stop the form from reloading the page (no server)
}

/* runs when the user clicks Reset (onreset event) */
function resetSignup() {
    var fields = ["fullName", "email", "password", "confirmPassword", "skinType"];

    for (var i = 0; i < fields.length; i++) {
        clearField(fields[i]);
    }
    document.getElementById("signupMessage").style.display = "none";
}
