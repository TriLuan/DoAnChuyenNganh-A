const URL = "http://159.223.81.131:4000/jobe/index.php/restapi/";

/* event-handler methods */
function page_Load() {
  getLanguages();
  getQuestion();
}
var result=0;
function btnRun_Click() {
  disabledButton_Run(true);
  content = "";
  runTestingSampleTestCase();
  clearConsole();
}

// function submitCode(param) {
//   axios.post(URL + "runs", param).then((response) => {
//     var result = response.data;
//     renderOutput(result);
//     disabledButton_Run(false);
//   });
// }

var runTestingSampleTestCase = function () {
  axios
    .get("http://103.253.147.116:4000/testcases/getlist")
    .then((response) => {
      var testCaseList = response.data;
      testCases = testCaseList.filter(function (testCaseList) {
        return testCaseList.Question_id === questionID;
      });
      testingProcess(testCases);
    });
};

var count = 0;


function testingProcess(testCases) {
  for (let i = 0; i < testCases.length; i++) {
    var param = {
      run_spec: {
        language_id: document.getElementById("ddlLanguages").value,
        sourcecode: codeMirror.getValue(),
        input: testCases[i].Input,
      },
    };
    submitCode_Testcase(param, testCases, i);
  }
  count = 0;
}

function submitCode_Testcase(param, testCases, i) {
  axios.post(URL + "runs", param).then((response) => {
    var result = response.data;
    console.log(result);
    checkTestCase(testCases, result, i);
    console.log("Pass: " + count + "/" + testCases.length);
    result=count;
    disabledButton_Run(false);
  });
}

function checkTestCase(testCases, result, i) {
  if (testCases[i].Output == result.stdout) {
    console.log("pass");
    handleTrueResult(testCases, result, i);
    count++;
  } else if (result.outcome != 15) {
    renderError(result);
  } else if (result.outcome === 15) {
    handleFalseResult(testCases, result, i);
    console.log("fail");
    console.log("Expected: " + testCases[i].Output);
    console.log("Result: " + result.stdout);
  }
}
var content = "";
function handleTrueResult(testCases, result, i) {
  content += `
  <h4>Kiểm thử `+ (Number(i) + 1) + ` <i class="fa-solid fa-circle-check"></i></h4>
  <h5>Input: `+ testCases[i].Input + ` </h5>
  <h5>Output: `+ testCases[i].Output + `</h5>
  <h5>Output thực tế: `+ result.stdout + `</h5>
                  `;
  document.getElementById("txtTestCase").innerHTML = content;
  console.log(content);
}

function handleFalseResult(testCases, result, i) {
  content += `
  <h4>Kiểm thử `+ (Number(i) + 1) + ` <i class="fa-solid fa-triangle-exclamation"></i></i></h4>
  <h5>Input: `+ testCases[i].Input + ` </h5>
  <h5>Output: `+ testCases[i].Output + `</h5>
  <h5>Output thực tế: `+ result.stdout + `</h5>
                  `;
  document.getElementById("txtTestCase").innerHTML = content;
  console.log(content);
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
  document.getElementById("txtOutput").value = output;
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

// SUBMIT Start

function btnSubmit_Click() {
  disabledButton_Submit(true);
  content = "";
  runTestingSampleTestCase();
  runTesting();
  clearConsole();
}

var runTestingTestCase = function () {
  axios
    .get("http://103.253.147.116:4000/testcases/getlist")
    .then((response) => {
      var testCaseList = response.data;
      testCases = testCaseList.filter(function (testCaseList) {
        return testCaseList.Question_id === questionID;
      });
      testingProcess(testCases);
    });
};

/* business methods */
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
  document.getElementById("txtConsole").innerHTML = "";
}
// var Output="";
// function submitCode(param,OP) {
//   axios.post(URI + "runs", param).then((response) => {
//     var result = response.data;
//     Output=renderOutput(result);
//     console.log(Output);
//   });
//   console.log(Output);
//   console.log(OP);
//   if (Number(Output) === Number(OP)){
//     console.log("renderOutput True");
//     return true;
//   }
//   else{
//     console.log("renderOutput False");
//   return false;
//   }
// }

var getQuestion = function () {
  if (sessionStorage.description) {
    document.getElementById("description").innerHTML =
      sessionStorage.getItem("description");
    questionID = Number(sessionStorage.getItem("ID"));
  } else {
    console.log("sessionStorage.description = null");
  }
};



/* helper methods */
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
  document.getElementById("txtConsole").innerHTML = output;
  clearTestCase()
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