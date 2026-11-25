// Errors I found and fixed (line numbers match this corrected code):
// Error 1 (grade.html, Line 13): Added "return" before checkMark() so the page stops reloading and the result stays.
// Error 2 (grade.html, Line 28): Changed showtable() to showTable() because JavaScript is case-sensitive.
// Error 3 (grade.html, Line 32): Changed grades.js to grade.js so the page loads the right file.
// Error 4 (grade.js, Line 19): Changed = to == because one = sets a value instead of comparing it.
// Error 5 (grade.js, Line 31): Changed isNan to isNaN, which is the correct spelling.
// Error 6 (grade.js, Line 39): Changed && to || because a mark can't be below 0 and above 100 at the same time.
// Error 7 (grade.js, Line 56): Changed getElementByID to getElementById (small "d").
// Error 8 (grade.js, Line 61): Changed style.colour to style.color, the spelling CSS uses.
// Error 9 (grade.js, Line 72): Changed return true to return false so the form doesn't submit and clear the result.
// Error 10 (grade.js, Line 88): Started the loop at i = 0 instead of 1 so grade A shows in the table.
// Error 11 (grade.js, Line 93): Changed innerHtml to innerHTML so the table appears.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Check for an empty name
    if (name == "") {
        alert("Name must be filled out.");
        return false;
    }

    // NEW: check for an empty mark (must come before isNaN, because isNaN("") is false)
    if (mark == "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check for a non-numeric mark
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Check the range 0-100
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Work out the grade
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    let result = document.getElementById("result");
    result.innerHTML = name + " got grade " + grade;

    // NEW: colour depends on the grade (green A/B, orange C, red F)
    if (grade == "A" || grade == "B") {
        result.style.color = "green";
    } else if (grade == "C") {
        result.style.color = "orange";
    } else {
        result.style.color = "red";
    }

    // NEW: show when the grade was checked
    document.getElementById("checkedOn").innerHTML = "Checked on: " + Date();

    // Return false so the form does not reload the page
    return false;
}

// NEW: put a random whole number from 0 to 100 into the mark field
function randomMark() {
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

// Build the grade table with a for loop
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // NEW: header row for styling
    let tableHTML = "<table><tr><th>Grade</th><th>Mark Range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
