//  Helper Functions 
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// SIGN UP 
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const msg = document.getElementById("message");

        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!name || !email || !password) {
            msg.textContent = "All fields are required.";
            msg.className = "error";
            return;
        }

        if (!emailRegex.test(email)) {
            msg.textContent = "Invalid email format.";
            msg.className = "error";
            return;
        }

        if (!passRegex.test(password)) {
            msg.textContent = "Password must be at least 6 chars with letters & numbers.";
            msg.className = "error";
            return;
        }

        const users = getUsers();
        if (users.find(u => u.email === email)) {
            msg.textContent = "Email already exists.";
            msg.className = "error";
            return;
        }

        users.push({ name, email, password });
        saveUsers(users);
        msg.textContent = "Success";
        msg.className = "success";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    });
}

// LOGIN 
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const msg = document.getElementById("message");

        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            msg.textContent = "Email not found.";
            msg.className = "error";
            return;
        }

        if (user.password !== password) {
            msg.textContent = "Incorrect password.";
            msg.className = "error";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        msg.textContent = "Login successful!";
        msg.className = "success";

        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);
    });
}

//  HOME PAGE 
const welcomeText = document.getElementById("welcome");
if (welcomeText) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "login.html";
    } else {
        welcomeText.textContent = `Welcome, ${user.name}`;
    }
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
}
