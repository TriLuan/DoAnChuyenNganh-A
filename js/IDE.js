const URL = "http://128.199.172.148:4000/jobe/index.php/restapi/";
const URL1 = "http://104.248.145.103:4000/";

/* event-handler methods */
function page_Load() {
  getLanguages();
  getQuestion();
  setPostQuestion();
  setSessionsStoreSampleTestCase();
}

/* Start Business Methods */
function getLanguages() {
  axios.get(URL + "languages").then((response) => {
    var languages = response.data;
    renderLanguages(languages);
  });
}

function clearTestCase() {
  document.getElementById("txtTestCase").innerHTML = "";
}
function clearConsole() {
  document.getElementById("output").innerHTML = "";
}

var getQuestion = function () {
  if (sessionStorage.description) {
    document.getElementById("description").innerHTML =
      sessionStorage.getItem("description");
    questionID = Number(sessionStorage.getItem("ID"));
  } else {
    console.log("sessionStorage.description = null");
  }
};
/* End Business Methods */

/* Start Sample Test Cases */
// function btnRun_Click() {
//   disabledButton_Run(true);
//   content = "";
//   runTestingSampleTestCase();
//   clearConsole();
// }

var runTestingSampleTestCase = function () {
  axios.get(URL1 + "sampletestcases/getlist").then((response) => {
    var sampleTestCaseList = response.data;
    sampleTestCases = sampleTestCaseList.filter(function (sampleTestCaseList) {
      return sampleTestCaseList.Question_id === questionID;
    });
    sampleTestingProcess(sampleTestCases);
  });
};

var count = 0;
function sampleTestingProcess(sampleTestCases) {
  for (let i = 0; i < sampleTestCases.length; i++) {
    var param = {
      run_spec: {
        language_id: document.getElementById("ddlLanguages").value,
        sourcecode: codeMirror.getValue(),
        input: sampleTestCases[i].Input,
      },
    };
    submitCode_SampleTestCase(param, sampleTestCases, i);
  }
  count = 0;
}

function submitCode_SampleTestCase(param, sampleTestCases, i) {
  axios.post(URL + "runs", param).then((response) => {
    var result = response.data;
    console.log(result);
    checkSampleTestCase(sampleTestCases, result, i);
    console.log("Pass: " + count + "/" + sampleTestCases.length);
    disabledButton_Run(false);
  });
}

function checkSampleTestCase(sampleTestCases, result, i) {
  if (sampleTestCases[i].Output == result.stdout) {
    console.log("pass");
    handleTrueResult(sampleTestCases, result, i);
    count++;
  } else if (result.outcome != 15) {
    renderError(result);
  } else if (result.outcome === 15) {
    handleFalseResult(sampleTestCases, result, i);
    console.log("fail");
    console.log("Expected: " + sampleTestCases[i].Output);
    console.log("Result: " + result.stdout);
  }
}

var content = "";
function handleTrueResult(testCases, result, i) {
  content +=
    `
  <h4>Kiểm thử ` +
    (Number(i) + 1) +
    ` <i class="fa-solid fa-circle-check"></i></h4>
  <h5>Input: ` +
    testCases[i].Input +
    ` </h5>
  <h5>Output: ` +
    testCases[i].Output +
    `</h5>
  <h5>Output thực tế: ` +
    result.stdout +
    `</h5>
                  `;
  document.getElementById("output").innerHTML = content;
  console.log(content);
}

function handleFalseResult(testCases, result, i) {
  content +=
    `
  <h4>Kiểm thử ` +
    (Number(i) + 1) +
    ` <i class="fa-solid fa-triangle-exclamation"></i></i></h4>
  <h5>Input: ` +
    testCases[i].Input +
    ` </h5>
  <h5>Output: ` +
    testCases[i].Output +
    `</h5>
  <h5>Output thực tế: ` +
    result.stdout +
    `</h5>
                  `;
  document.getElementById("output").innerHTML = content;
  console.log(content);
}

function disabledButton_Run(isDisabled) {
  if (isDisabled) {
    document.getElementById("btnRun").disabled = true;
    document.getElementById("btnRun").value = "  WAITING  ";
  } else {
    document.getElementById("btnRun").disabled = false;
    document.getElementById("btnRun").value = "Chạy thử";
  }
}

function btnRun_Click() {
  disabledButton_Run(true);
  var param = {
    run_spec: {
      language_id: document.getElementById("ddlLanguages").value,
      sourcecode: codeMirror.getValue(),
      input: document.getElementById("txtInput").value,
    },
  };
  submitCode(param);
}

function submitCode(param) {
  axios.post(URL + "runs", param).then((response) => {
    var result = response.data;
    renderOutput(result);
    disabledButton_Run(false);
  });
}

function renderOutput(result) {
  var output = "";
  if (result.outcome === 11) {
    output = result.cmpinfo;
  } else if (result.outcome === 12) {
    output = result.stderr;
  } else if (result.outcome === 13) {
    output = "Time limit exceeded";
  } else if (result.outcome === 15) {
    output = result.stdout;
  } else if (result.outcome === 17) {
    output = "Memory limit exceeded";
  } else if (result.outcome === 19) {
    output = "Illegal system call";
  } else if (result.outcome === 20) {
    output = "Internal error";
  } else if (result.outcome === 21) {
    output = "Server overload";
  }
  document.getElementById("txtOutput").innerHTML = output;
}

/* End Sample Test Cases */

/* Start Test Cases */
function btnSubmit_Click() {
  disabledButton_Submit(true);
  runTestingTestCase();
}

var runTestingTestCase = function () {
  axios.get(URL1 + "testcases/getlist").then((response) => {
    var testCaseList = response.data;
    testCases = testCaseList.filter(function (testCaseList) {
      return testCaseList.Question_id === questionID;
    });
    testingProcess(testCases);
  });
};

function testingProcess(testCases) {
  sessionStorage.setItem("Pass", 0);
  sessionStorage.setItem("Total_TestCases", testCases.length);
  sessionStorage.setItem("SourceCode", codeMirror.getValue());
  for (let i = 0; i < testCases.length; i++) {
    var param = {
      run_spec: {
        language_id: document.getElementById("ddlLanguages").value,
        sourcecode: codeMirror.getValue(),
        input: testCases[i].Input,
      },
    };
    submitCode_TestCase(param, testCases, i);
  }
}

var j = 0;

function submitCode_TestCase(param, testCases, i) {
  axios.post(URL + "runs", param).then((response) => {
    var result = response.data;
    console.log(result);
    checkTestCase(testCases, result, i);
    if (i == testCases.length - 1) {
      j = 0;
      disabledButton_Submit(false);
      document.location = "result.html";
    }
  });
}

function checkTestCase(testCases, result, i) {
  if (testCases[i].Output == result.stdout) {
    console.log("pass");
    sessionStorage.setItem("Pass", Number(sessionStorage.getItem("Pass")) + 1);
  } else {
    var name = String("Fail" + j);
    var data = String(
      "Input: " +
        testCases[i].Input +
        " Expected Result: " +
        testCases[i].Output +
        " Execute Result: " +
        result.stdout
    );
    sessionStorage.setItem(name, data);
    j++;
  }
}

function disabledButton_Submit(isDisabled) {
  if (isDisabled) {
    document.getElementById("btnSubmit").disabled = true;
    document.getElementById("btnSubmit").value = "  WAITING  ";
  } else {
    document.getElementById("btnSubmit").disabled = false;
    document.getElementById("btnSubmit").value = "Nộp bài";
  }
}
/* End Test Cases */

/* Start Helper Methods */
function renderLanguages(languages) {
  for (var language of languages) {
    var opt = document.createElement("option");
    opt.value = language[0];
    opt.text = language[0] + " (" + language[1] + ")";
    document.getElementById("ddlLanguages").appendChild(opt);
  }
}

function renderError(result) {
  var output = "";
  if (result.outcome === 11) {
    output = result.cmpinfo;
  } else if (result.outcome === 12) {
    output = result.stderr;
  } else if (result.outcome === 13) {
    output = "Time limit exceeded";
  } else if (result.outcome === 17) {
    output = "Memory limit exceeded";
  } else if (result.outcome === 19) {
    output = "Illegal system call";
  } else if (result.outcome === 20) {
    output = "Internal error";
  } else if (result.outcome === 21) {
    output = "Server overload";
  }
  document.getElementById("output").innerHTML = output;
  clearTestCase();
}

function setPostQuestion() {
  var role = sessionStorage.getItem("Role");
  if (role == "Author") {
    document.getElementById("post-practice").style.visibility = "visible";
    document.getElementById("account").innerHTML =
      sessionStorage.getItem("Author_FullName");
  } else {
    document.getElementById("account").innerHTML =
      sessionStorage.getItem("Student_FullName");
  }
}

// function setSessionsStoreSampleTestCase() {
//   axios.get(URL1 + "sampletestcases/getlist").then((response) => {
//     var sampleTestCaseList = response.data;
//     sampleTestCases = sampleTestCaseList.filter(function (sampleTestCaseList) {
//       return sampleTestCaseList.Question_id === questionID;
//     });
//     var content = "";
//     for (let i = 0; i < sampleTestCases.length; i++) {
//       var nameInput = String("SampleTestCaseInput" + i);
//       var nameOutput = String("SampleTestCaseOutput" + i);
//       content +=
//         `
//         <h3>`+(i+1)+`: <span>` +
//         sampleTestCases[i].Input[0] +
//         `+` +
//         sampleTestCases[i].Input[2] +
//         `=` +
//         +sampleTestCases[i].Output +
//         `</span></h3>
                  
//                   `;
//       document.getElementById("sampleTestCase").innerHTML = content;
//       sessionStorage.setItem(nameInput, sampleTestCases[i].Input);
//       sessionStorage.setItem(nameOutput, sampleTestCases[i].Output);
//     }
//   });
// }

/* End Helper Methods */

// Code test IDE
/*
Bài 1

#include <stdio.h>

int main(){
  int a,b;
    scanf("%d %d",&a,&b);
    printf("%d",a+b);
}

Bài 3

#include <stdio.h>

int main(){
  int n;
    scanf("%d",&n);
    if(n%2==0){
      printf("even number");
    }
    else
      printf("odd number");
}
*/
