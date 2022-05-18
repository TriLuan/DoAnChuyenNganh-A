function page_Load() {
    displayResult();
    setPostQuestion();
    displayTestCaseFail();
}

function displayResult() {
    var content = "";
    content += `
        <h3 class = "mt-3">Câu hỏi: `+ sessionStorage.getItem("description") + ` </h3>
        <h1 class = "mt-4 text-center text-danger">Đạt: `+ sessionStorage.getItem("Pass") + `/` + sessionStorage.getItem("Total_TestCases") + ` test cases</h1>
        `;
    document.getElementById("result").innerHTML = content;
}

function displayTestCaseFail() {
    var tmp = sessionStorage.getItem("Total_TestCases") - sessionStorage.getItem("Pass");
    console.log("Test Case Fail");
    if (tmp != 0) {
        for (var i = 0; i < tmp; i++) {
            var name = String("Fail"+i);
            console.log(sessionStorage.getItem(name));
        }
    }
}

function setPostQuestion() {
    var role = sessionStorage.getItem("Role");
    if (role == "Author") {
        document.getElementById("post-practice").style.visibility = "visible";
        document.getElementById("account").innerHTML = sessionStorage.getItem("Author_FullName");
    }
    else {
        document.getElementById("account").innerHTML = sessionStorage.getItem("Student_FullName");
    }
}