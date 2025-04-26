window.onload = function () {
    let fullname = document.getElementById('full-name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmpassword = document.getElementById('confirm-password');
    let button = document.getElementById('btn');
    let adminCheckbox = document.getElementById('admin signup');

    class User {
        constructor(id, fullname, email, password, isAdmin) {
            this.id = id;
            this.fullname = fullname;
            this.email = email;
            this.password = password;
            this.isAdmin = isAdmin;
        }
    }

    const defaultUsers = [
        new User('Seif', 'seif@gmail.com', '123456', true),
        new User('Sama', 'sama@gmail.com', '123456', true),
        new User('Menna', 'menna@gmail.com', '123456', true),
        new User('Merehan', 'merehan@gmail.com', '123456', false),
        new User('Yassmen', 'yassmen@gmail.com', '123456', true)
    ];

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        users = defaultUsers;
        localStorage.setItem('users', JSON.stringify(users));
    }

    fullname.value = localStorage.getItem('full-name') || '';
    email.value = localStorage.getItem('email') || '';
    password.value = localStorage.getItem('password') || '';
    confirmpassword.value = localStorage.getItem('confirm-password') || '';

    fullname.addEventListener('input', () => localStorage.setItem('full-name', fullname.value));
    email.addEventListener('input', () => localStorage.setItem('email', email.value));
    password.addEventListener('input', () => localStorage.setItem('password', password.value));
    confirmpassword.addEventListener('input', () => localStorage.setItem('confirm-password', confirmpassword.value));

    button.addEventListener('click', function (e) {
        e.preventDefault();

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        if (!fullname.value || !email.value || !password.value || !confirmpassword.value) {
            alert('Please fill out all fields.');
            return;
        }

        if (!validateEmail(email.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        function validatePassword(password) {
            const hasMinLength = password.length >= 8;
            const hasNumber = /\d/.test(password);
            return hasMinLength && hasNumber;
        }
        if (!validatePassword(password.value)) {
            alert('Password must be at least 8 characters long and include at least one number.');
            return;
        }
    

        if (password.value !== confirmpassword.value) {
            alert('Passwords do not match!');
            return;
        }

        const existingUser = users.find(user => user.email === email.value);

        if (existingUser) {
            if (existingUser.isAdmin) {
                alert('User already exists and is an admin.');
                window.location.href = '../admin.html';
            } else {
                alert('User already exists but is not an admin.');
                window.location.href = '../user.html';
            }
            return;
        }

        // New user creation
        let id = users[users.length-1].id + 1;
        const newUser = new User(id, fullname.value, email.value, password.value, adminCheckbox.checked);
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('userId', JSON.stringify(user.id));

        localStorage.removeItem('full-name');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('confirm-password');

        if (newUser.isAdmin ) {
            window.location.href = '../admin.html';
        } else {
            window.location.href = '../user.html';
        }
    });
};
