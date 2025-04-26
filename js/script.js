let users = [
    new User(1, 'Seif', 'seif@gmail.com', 123456, true),
    new User(2, 'Sama', 'sama@gmail.com', 123456, true),
    new User(3, 'Menna', 'menna@gmail.com', 123456, true),
    new User(4, 'Merehan', 'merehan@gmail.com', 123456, false),
    new User(5, 'Yassmen', 'yassmen@gmail.com', 123456, true)
];


class User {
    constructor(id, name, email, password, isAdmin){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin
    }
}

if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
}
document.getElementById('signUpForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('admin-signup').checked;

    const id = (users.length > 0) ? users[users.length - 1].id + 1 : 1;
    const user = new User(id, name, email, password, isAdmin);
    users.push(user)

    localStorage.setItem('users', JSON.stringify(users));
});


