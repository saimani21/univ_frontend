const apiUrl = "https://universityproject-6895f270ba97.herokuapp.com"; // Update this if your backend URL is different
let token = '';

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${apiUrl}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            username,
            password
        })
    });

    if (response.ok) {
        const data = await response.json();
        token = data.access_token;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
    } else {
        alert('Login failed');
    }
});

function showAddUser() {
    const form = `
        <h2>Add User</h2>
        <form id="add-user-form">
            <input type="text" id="new-username" placeholder="Username" required>
            <input type="password" id="new-password" placeholder="Password" required>
            <input type="text" id="role" placeholder="Role (student/admin/instructor)" required>
            <button type="submit">Add User</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = '';
    document.getElementById('add-user-form').addEventListener('submit', addUser);
}

async function addUser(e) {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('role').value;
    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role })
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert('Error adding user');
    }
}

function showRegisterStudent() {
    const form = `
        <h2>Register Student</h2>
        <form id="register-student-form">
            <input type="number" id="student-id" placeholder="Student ID" required>
            <input type="text" id="first-name" placeholder="First Name" required>
            <input type="text" id="last-name" placeholder="Last Name" required>
            <input type="email" id="email" placeholder="Email" required>
            <input type="text" id="department" placeholder="Department" required>
            <button type="submit">Register Student</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = '';
    document.getElementById('register-student-form').addEventListener('submit', registerStudent);
}

async function registerStudent(e) {
    e.preventDefault();
    document.getElementById('output-section').innerHTML = '';
    const studentData = {
        student_id: parseInt(document.getElementById('student-id').value),
        first_name: document.getElementById('first-name').value,
        last_name: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value
    };

    const response = await fetch(`${apiUrl}/students`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert('Error registering student');
    }
}

function showAddInstructor() {
    const form = `
        <h2>Add Instructor</h2>
        <form id="add-instructor-form">
            <input type="text" id="instructor-id" placeholder="Instructor ID" required>
            <input type="text" id="instructor-first-name" placeholder="First Name" required>
            <input type="text" id="instructor-last-name" placeholder="Last Name" required>
            <input type="email" id="instructor-email" placeholder="Email" required>
            <input type="text" id="instructor-department" placeholder="Department" required>
            <button type="submit">Add Instructor</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = '';
    document.getElementById('add-instructor-form').addEventListener('submit', addInstructor);
}

async function addInstructor(e) {
    e.preventDefault();
    const instructorData = {
        instructor_id: document.getElementById('instructor-id').value,
        first_name: document.getElementById('instructor-first-name').value,
        last_name: document.getElementById('instructor-last-name').value,
        email: document.getElementById('instructor-email').value,
        department: document.getElementById('instructor-department').value
    };

    const response = await fetch(`${apiUrl}/instructors`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instructorData)
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert('Error adding instructor');
    }
}

function showAddCourse() {
    document.getElementById('output-section').innerHTML = '';
    const form = `
        <h2>Add Course</h2>
        <form id="add-course-form">
            <input type="number" id="course-id" placeholder="Course ID" required>
            <input type="text" id="course-name" placeholder="Course Name" required>
            <input type="text" id="description" placeholder="Description" required>
            <input type="number" id="credits" placeholder="Credits" required>
            <input type="text" id="department" placeholder="Department" required>
            <input type="number" id="fee-per-course" placeholder="Fee per Course" required>
            <input type="text" id="instructor-id" placeholder="Instructor ID" required>
            <button type="submit">Add Course</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = '';
    document.getElementById('add-course-form').addEventListener('submit', addCourse);
}

async function addCourse(e) {
    e.preventDefault();
    const courseData = {
        course_id: parseInt(document.getElementById('course-id').value),
        course_name: document.getElementById('course-name').value,
        description: document.getElementById('description').value,
        credits: parseInt(document.getElementById('credits').value),
        department: document.getElementById('department').value,
        fee_per_course: parseFloat(document.getElementById('fee-per-course').value),
        instructor_id: document.getElementById('instructor-id').value
    };
    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/courses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert('Error adding course');
    }
}

async function showGetStudents() {
    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/students`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const students = await response.json();
    displayOutput(students, ['student_id', 'first_name', 'last_name', 'email', 'department']);
}

async function showGetCourses() {
    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/courses`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const courses = await response.json();
    displayOutput(courses, ['course_id', 'course_name', 'description', 'credits', 'department', 'fee_per_course']);
}

function displayOutput(data, headers) {
    let output = '<table><tr>';
    headers.forEach(header => output += `<th>${header}</th>`);
    output += '</tr>';
    data.forEach(item => {
        output += '<tr>';
        headers.forEach(header => output += `<td>${item[header]}</td>`);
        output += '</tr>';
    });
    output += '</table>';
    document.getElementById('output-section').innerHTML = output;
}

function showEnroll() {
    const form = `
        <h2>Enroll/Drop Course</h2>
        <form id="enroll-form">
            <input type="number" id="enroll-student-id" placeholder="Student ID" required>
            <input type="number" id="enroll-course-id" placeholder="Course ID" required>
            <button type="submit">Enroll</button>
        </form>
        <form id="drop-form">
            <input type="number" id="drop-student-id" placeholder="Student ID" required>
            <input type="number" id="drop-course-id" placeholder="Course ID" required>
            <button type="submit">Drop</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = '';
    document.getElementById('enroll-form').addEventListener('submit', enrollCourse);
    document.getElementById('drop-form').addEventListener('submit', dropCourse);
}

async function enrollCourse(e) {
    e.preventDefault();
    const studentId = parseInt(document.getElementById('enroll-student-id').value);
    const courseId = parseInt(document.getElementById('enroll-course-id').value);

    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/students/enroll?student_id=${studentId}&course_id=${courseId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert('Error enrolling course');
    }
}

async function dropCourse(e) {
    e.preventDefault();
    const studentId = parseInt(document.getElementById('drop-student-id').value);
    const courseId = parseInt(document.getElementById('drop-course-id').value);
    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/students/drop?student_id=${studentId}&course_id=${courseId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert('Error dropping course');
    }
}


function showGetStudentsInCourse() {
    const form = `
        <h2>Get Students in Course</h2>
        <form id="get-students-form">
            <input type="number" id="course-id-student" placeholder="Course ID" required>
            <button type="submit">Get Students in Course</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = ''; // Clear previous output
    document.getElementById('get-students-form').addEventListener('submit', getStudentsInCourse);
}

async function getStudentsInCourse(e) {
    e.preventDefault();
    document.getElementById('output-section').innerHTML = '';
    const courseId = parseInt(document.getElementById('course-id-student').value);

    const response = await fetch(`${apiUrl}/courses/${courseId}/students`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const students = await response.json();
    displayOutput(students, ['student_id', 'first_name', 'last_name', 'email', 'department']);
}




function showAwardScholarship() {
    const form = `
        <h2>Award Scholarship</h2>
        <form id="award-scholarship-form">
            <input type="number" id="scholarship-student-id" placeholder="Student ID" required>
            <input type="number" id="amount-awarded" placeholder="Amount Awarded" required>
            <button type="submit">Award Scholarship</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = '';
    document.getElementById('award-scholarship-form').addEventListener('submit', awardScholarship);
}

async function awardScholarship(e) {
    e.preventDefault();
    const scholarshipData = {
        student_id: parseInt(document.getElementById('scholarship-student-id').value),
        amount_awarded: parseInt(document.getElementById('amount-awarded').value)
    };
    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/scholarships`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scholarshipData)
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert('Error awarding scholarship');
    }
}

function showGetFeeInfo() {
    const form = `
        <h2>Get Fee Info</h2>
        <form id="get-fee-info-form">
            <input type="number" id="fee-info-student-id" placeholder="Student ID" required>
            <button type="submit">Get Fee Info</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = '';
    document.getElementById('get-fee-info-form').addEventListener('submit', getFeeInfo);
}

async function getFeeInfo(e) {
    e.preventDefault();
    const studentId = parseInt(document.getElementById('fee-info-student-id').value);
    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/students/${studentId}/fee`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        displayOutput([data], ['student_id', 'total_fee', 'scholarship awarded', 'net_fee']);
    } else {
        alert('Error fetching fee info');
    }
}

function showPayFee() {
    const form = `
        <h2>Pay Fee</h2>
        <form id="pay-fee-form">
            <input type="number" id="pay-fee-student-id" placeholder="Student ID" required>
            <button type="submit">Pay Fee</button>
        </form>
    `;
    document.getElementById('form-section').innerHTML = form;
    document.getElementById('output-section').innerHTML = '';
    document.getElementById('pay-fee-form').addEventListener('submit', payFee);
}

async function payFee(e) {
    e.preventDefault();
    const studentId = parseInt(document.getElementById('pay-fee-student-id').value);

    document.getElementById('output-section').innerHTML = '';
    const response = await fetch(`${apiUrl}/students/${studentId}/pay_fee`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        alert(data.message);
    } else {
        alert('Error paying fee');
    }
}
