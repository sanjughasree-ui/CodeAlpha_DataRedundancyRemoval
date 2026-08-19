const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const message = document.getElementById("message");

// Store student records
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display existing records
displayStudents();

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const email = document.getElementById("email").value.trim();

    // Check for duplicate Student ID or Email
    const duplicate = students.some(
        student =>
            student.studentId.toLowerCase() === studentId.toLowerCase() ||
            student.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicate) {
        showMessage(
            "❌ Duplicate data detected! Student record was not added.",
            "error"
        );
        return;
    }

    // Add unique student
    const newStudent = {
        studentId,
        studentName,
        email
    };

    students.push(newStudent);

    // Save data
    localStorage.setItem("students", JSON.stringify(students));

    showMessage(
        "✅ Verified! Unique student data added successfully.",
        "success"
    );

    studentForm.reset();

    displayStudents();
});

function displayStudents() {
    studentTable.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.studentName}</td>
            <td>${student.email}</td>
        `;

        studentTable.appendChild(row);
    });
}

function showMessage(text, type) {
    message.textContent = text;

    if (type === "error") {
        message.style.background = "#fee2e2";
        message.style.color = "#b91c1c";
    } else {
        message.style.background = "#dcfce7";
        message.style.color = "#166534";
    }
}