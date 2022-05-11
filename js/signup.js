const URI = 'http://103.253.147.116:4000/';

var flag_fullName = 1;
var flag_phoneNumber = 1;
var flag_email = 1;
var flag_password = 1;
var flag_re_password = 1;

function Register() {
    Checking();
    if (flag_fullName == 0 && flag_phoneNumber == 0 && flag_email == 0 && flag_password == 0 && flag_re_password == 0) {
        var role = String(document.getElementById("role").value);
        if (role == "Học viên") {
            runSignUpStudent();
        }
        else {
            runSignUpAuthor();
        }
    }
}

function Checking() {
    document.getElementById('notification').innerHTML = "";
    checkFullName();
    checkPhoneNumber();
    checkEmail();
    checkPassword();
    checkRe_Password();
}

function checkFullName() {
    var fullName = String(document.getElementById('fullname').value.trim());
    if (fullName == "") {
        flag_fullName = 1;
        document.getElementById('fullname').style.backgroundColor = 'yellow';
        document.getElementById('notification').innerHTML += "Họ và tên không được rỗng <br/>";
    }
    else {
        flag_fullName = 0;
        document.getElementById('fullname').style.backgroundColor = "white";
    }
}

function checkPhoneNumber() {
    var phoneNumber = String(document.getElementById('phone-number').value.trim());
    if (phoneNumber != "") {
        if (phoneNumber.length <= 9 || phoneNumber.length >= 11) {
            flag_phoneNumber = 1;
            document.getElementById('phone-number').style.backgroundColor = 'yellow';
            document.getElementById('notification').innerHTML += "Số điện thoại phải có 10 số <br/>";
        }
        else {
            flag_phoneNumber = 0;
            document.getElementById('phone-number').style.backgroundColor = 'white';
        }
    }
    else {
        flag_phoneNumber = 0;
    }
}

function checkEmail() {
    var email = String(document.getElementById('username').value.trim());
    var letter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (email == "") {
        flag_email = 1;
        document.getElementById('username').style.backgroundColor = 'yellow';
        document.getElementById('notification').innerHTML += "Email không được rỗng <br/>";
    }
    else if (!letter.test(email)) {
        flag_email = 1;
        document.getElementById('username').style.backgroundColor = 'yellow';
        document.getElementById('notification').innerHTML += "Email không hợp lệ (Example@email.com) <br/>";
    }
    else {
        flag_email = 0;
        document.getElementById('username').style.backgroundColor = 'white';
    }
}

function renderEmail(data, array) {
    var i = 0;
    for (var email of data) {
        array[i] = email.Email;
        i++;
    }
}

function checkPassword() {
    var password = String(document.getElementById('password').value);
    if (password == "") {
        flag_password = 1;
        document.getElementById('password').style.backgroundColor = 'yellow';
        document.getElementById('password').value = '';
        document.getElementById('notification').innerHTML += "Password không được rỗng <br/>";
    }
    else if (password.length <= 10) {
        flag_password = 1;
        document.getElementById('password').style.backgroundColor = 'yellow';
        document.getElementById('password').value = '';
        document.getElementById('notification').innerHTML += "Password phải có trên 10 ký tự <br/>";
    }
    else {
        flag_password = 0;
        document.getElementById('password').style.backgroundColor = 'white';
    }
}

function checkRe_Password() {
    var re_password = String(document.getElementById('password-confirm').value);
    var password = String(document.getElementById('password').value)
    if (re_password == "") {
        flag_re_password = 1;
        document.getElementById('password-confirm').style.backgroundColor = 'yellow';
        document.getElementById('password-confirm').value = '';
        document.getElementById('notification').innerHTML += "Vui lòng nhập lại password<br/>";
    }
    else if (re_password == password) {
        flag_re_password = 0;
        document.getElementById('password-confirm').style.backgroundColor = 'white';
    }
    else {
        flag_re_password = 1;
        document.getElementById('password-confirm').style.backgroundColor = 'yellow';
        document.getElementById('password-confirm').value = '';
        document.getElementById('notification').innerHTML += "Password nhập lại không trùng khớp <br/>";
    }
}

function submitData(dataName, param) {
    axios.post(URI + dataName + '/add', param).then((response) => {
        var result = response.data;
        console.log(result);
        clearForm();
        document.location = '../index.html'
    });
}

function postData(dataName) {
    var param = {
        "FullName": String(document.getElementById('fullname').value.trim()),
        "Email": String(document.getElementById('username').value.trim()),
        "PhoneNumber": Number(document.getElementById('phone-number').value.trim()),
        "Password": String(document.getElementById('password').value)
    };
    submitData(dataName, param);
}

function runSignUpStudent() {
    axios.get(URI + "students/getlist").then((response) => {
        var data = response.data;
        const array = [];
        var email = String(document.getElementById('username').value.trim());
        var status = 1;
        renderEmail(data, array);
        for (var i = 0; i < array.length; i++) {
            if (email == array[i]) {
                document.getElementById('username').style.backgroundColor = 'yellow';
                document.getElementById('notification').innerHTML += "Email này đã tồn tại";
                break;
            }
            else if (i == array.length - 1) {
                axios.get(URI + "authors/getlist").then((response) => {
                    var data = response.data;
                    const array = [];
                    var email = String(document.getElementById('username').value.trim());
                    var status = 1;
                    renderEmail(data, array);
                    for (var i = 0; i < array.length; i++) {
                        if (email == array[i]) {
                            document.getElementById('username').style.backgroundColor = 'yellow';
                            document.getElementById('notification').innerHTML += "Email này đã tồn tại";
                            break;
                        }
                        else if (i == array.length - 1) {
                            status = 0;
                        }
                    }
                    if (status == 0) {
                        document.getElementById('username').style.backgroundColor = 'white';
                        postData("students");
                    }
                });
            }
        }
    });
}

function runSignUpAuthor() {
    axios.get(URI + "authors/getlist").then((response) => {
        var data = response.data;
        const array = [];
        var email = String(document.getElementById('username').value.trim());
        var status = 1;
        renderEmail(data, array);
        for (var i = 0; i < array.length; i++) {
            if (email == array[i]) {
                document.getElementById('username').style.backgroundColor = 'yellow';
                document.getElementById('notification').innerHTML += "Email này đã tồn tại";
                break;
            }
            else if (i == array.length - 1) {
                axios.get(URI + "students/getlist").then((response) => {
                    var data = response.data;
                    const array = [];
                    var email = String(document.getElementById('username').value.trim());
                    var status = 1;
                    renderEmail(data, array);
                    for (var i = 0; i < array.length; i++) {
                        if (email == array[i]) {
                            document.getElementById('username').style.backgroundColor = 'yellow';
                            document.getElementById('notification').innerHTML += "Email này đã tồn tại";
                            break;
                        }
                        else if (i == array.length - 1) {
                            status = 0;
                        }
                    }
                    if (status == 0) {
                        document.getElementById('username').style.backgroundColor = 'white';
                        postData("authors");
                    }
                });
            }
        }
    });
}

function clearForm() {
    document.getElementById('fullname').value = '';
    document.getElementById('phone-number').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
}