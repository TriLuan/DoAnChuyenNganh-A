const URI = 'http://103.253.147.116:4000/';

function Login() {
    var email = String(document.getElementById('username').value.trim());
    if (email == "") {
        document.getElementById('notification').innerHTML = "Vui lòng nhập Email";
    }
    else {
        var URL = String(URI + "students/getpassword/" + email);
        axios.get(URL).then((response) => {
            var data = response.data;
            var password = String(renderPassword(data));
            console.log(password);
            checkPasswordStudent(password, email);
        });
    }
}

function renderPassword(data) {
    for (var password of data) {
        return password.Password;
    }
}

function checkPasswordStudent(pwd, email) {
    var password = String(document.getElementById('password').value);
    if (password == "") {
        document.getElementById('notification').innerHTML = "Vui lòng nhập Password";
    }
    else if (pwd == "undefined") {
        var URL = String(URI + "authors/getpassword/" + email);
        axios.get(URL).then((response) => {
            var data = response.data;
            var password = String(renderPassword(data));
            console.log(password)
            checkPasswordAuthor(password);
        });
    }
    else if (password != "" && password != pwd) {
        document.getElementById('notification').innerHTML = "Mật khẩu không hợp lệ.";
        document.getElementById('password').value = "";
    }
    else {
        // True Student
        var role = "Student";
        sessionStorage.setItem("Role",role);
        var email = String(document.getElementById('username').value.trim());
        var URL = String(URI + "students/getinformation/" + email);
        axios.get(URL).then((response) => {
            var data = response.data;
            console.log(data);
            var Student_id = String(renderStudentID(data));
            sessionStorage.setItem("Student_Id", Student_id);
            var Student_FullName = String(renderFullName(data));
            sessionStorage.setItem("Student_FullName", Student_FullName);
            clearForm();
            document.location = './page/home.html';
        });
    }
}

function checkPasswordAuthor(pwd) {
    var password = String(document.getElementById('password').value);
    if (pwd == "undefined") {
        document.getElementById('notification').innerHTML = "Tài khoản không tồn tại";
        document.getElementById('password').value = "";
    }
    else if (password != "" && password != pwd) {
        document.getElementById('notification').innerHTML = "Mật khẩu không hợp lệ.";
        document.getElementById('password').value = "";
    }
    else {
        // True Author
        var role = "Author";
        sessionStorage.setItem("Role",role);
        var email = String(document.getElementById('username').value.trim());
        var URL = String(URI + "authors/getinformation/" + email);
        axios.get(URL).then((response) => {
            var data = response.data;
            console.log(data);
            var Author_id = String(renderAuthorID(data));
            sessionStorage.setItem("Author_Id", Author_id);
            var Author_FullName = String(renderFullName(data));
            sessionStorage.setItem("Author_FullName", Author_FullName);
            clearForm();
            document.location = './page/home.html';
        });
    }
}

function clearForm() {
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
}

function renderStudentID(data) {
    for (var information of data) {
        return information.Student_id;
    }
}
function renderAuthorID(data) {
    for (var information of data) {
        return information.Author_id;
    }
}
function renderFullName(data) {
    for (var information of data) {
        return information.FullName;
    }
}