const URI = "http://104.248.145.103:4000/";

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
            var name = String("Fail" + i);
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

function addHistoryResultProcess() {
    var role = sessionStorage.getItem("Role");
    if (role == "Student") {
        var questionId = sessionStorage.getItem("ID");
        var questionDescription = sessionStorage.getItem("description");
        var studentId = sessionStorage.getItem("Student_Id");
        var pass = String(sessionStorage.getItem("Pass") + "/" + sessionStorage.getItem("Total_TestCases"));
        var testCaseFail = String(renderTestCaseFail());
        var sourceCode = sessionStorage.getItem("SourceCode");
        var today = new Date();
        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
        var param = {
            Question_id: questionId,
            question_description: questionDescription,
            Student_id: studentId,
            Pass: pass,
            Testcase_fail: testCaseFail,
            Source_code: sourceCode,
            Submit_date: date,
        };
        console.log(param);
        postHistoryResult(param);
    }
}

function postHistoryResult(param) {
    axios.post(URI + "historypractices/add", param).then((response) => {
        var result = response.data;
        console.log(result);
        clearSessionStorage();
        document.location = "practice.html";
    });
}

function renderTestCaseFail() {
    var tmp = sessionStorage.getItem("Total_TestCases") - sessionStorage.getItem("Pass");
    var data = "";
    if (tmp != 0) {
        for (var i = 0; i < tmp; i++) {
            var name = String("Fail" + i);
            data += String(sessionStorage.getItem(name)) + "\n";
        }
    }
    return data;
}

function clearSessionStorage() {
    var tmp = sessionStorage.getItem("Total_TestCases") - sessionStorage.getItem("Pass");
    if (tmp != 0) {
        for (var i = 0; i < tmp; i++) {
            var name = String("Fail" + i);
            sessionStorage.setItem(name, null);
        }
    }
}