var URI = "http://103.253.147.116:4000/";

function renderSampleTestCase(obj) {
  var value = Number(obj.value);
  var content = "";
  for (var i = 0; i < value; i++) {
    content +=
      `
      <label>Test case ví dụ ` +
      (Number(i) + 1) +
      `</label>
      <input type="text" class="form-control" id="txtSampleTestCaseInput`+ i + `" placeholder="Input"/>
      <input type="text" class="form-control" id="txtSampleTestCaseOutput`+ i + `" placeholder="Output"/>
                  `;
    //console.log(i);
  }
  console.log(typeof value);
  console.log(content);
  document.getElementById("sampleTestCase").innerHTML = content;
}

function renderTestCase(obj) {
  var value = Number(obj.value);
  var content = "";
  for (var i = 0; i < value; i++) {
    content +=
      `
        <label>Test case ẩn ` +
      (Number(i) + 1) +
      `</label>
        <input type="text" class="form-control" id="txtTestCaseInput`+ i + `" placeholder="Input"/>
        <input type="text" class="form-control" id="txtTestCaseOutput`+ i + `" placeholder="Output"/>
                    `;
    console.log(i);
  }
  console.log(typeof value);
  console.log(content);
  document.getElementById("testCase").innerHTML = content;
}

function btnSubmit_Question() {
  var testCase = parseInt(document.getElementById("numberTestCase").value);
  var sampleTestCase = parseInt(document.getElementById("numberSampleTestCase").value);
  var title = String(document.getElementById("txtTitle").value.trim());
  var description = String(document.getElementById("txtDescription").value.trim());
  if (testCase != 0 && sampleTestCase != 0 && title != "" && description != "") {
    postQuestionProcess();
  }
  else{
    alert("Vui lòng nhập đầy đủ!!!");
  }
}

function renderLastId(data) {
  for (var question of data) {
    return question.Question_id;
  }
}

function postQuestionProcess() {
  axios.get(URI + "questions/getlastid").then((response) => {
    var data = response.data;
    var Question_id = renderLastId(data) + 1;
    runPostQuestion(Question_id);
  });

}

function runPostQuestion(Question_id) {
  var title = String(document.getElementById("txtTitle").value.trim());
  var description = String(document.getElementById("txtDescription").value.trim());
  var topic = String(document.getElementById("topic").value);
  var level = String(document.getElementById("level").value);
  var today = new Date();
  var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var param = {
    Question_id: Question_id,
    Title: title,
    Description: description,
    CreateDate: date,
    Topic: topic,
    Level: level,
    Author_id: 1,
  };
  submitQuestion(param, Question_id);
}

function submitQuestion(param, Question_id) {
  axios.post(URI + 'questions/add', param).then((response) => {
    var result = response.data;
    runPostSampleTestCase(Question_id);
    runPostTestCase(Question_id);
  });
}

function runPostTestCase(Question_id) {
  var totalTestCase = parseInt(document.getElementById("numberTestCase").value);
  for (var i = 0; i < totalTestCase; i++) {
    var inputId = String("txtTestCaseInput" + i);
    var outputId = String("txtTestCaseOutput" + i);
    var input = String(document.getElementById(inputId).value.trim());
    var output = String(document.getElementById(outputId).value.trim());
    var param = {
      Question_id: Question_id,
      Input: input,
      Output: output,
    };
    submitTestCase(param);
  }
}

function submitTestCase(param) {
  axios.post(URI + 'testcases/add', param).then((response) => {
    var result = response.data;
    location.reload();
    console.log("Thành công");
  });
}

function runPostSampleTestCase(Question_id) {
  var totalSampleTestCase = parseInt(document.getElementById("numberSampleTestCase").value);
  for (var i = 0; i < totalSampleTestCase; i++) {
    var inputId = String("txtSampleTestCaseInput" + i);
    var outputId = String("txtSampleTestCaseOutput" + i);
    var input = String(document.getElementById(inputId).value.trim());
    var output = String(document.getElementById(outputId).value.trim());
    var param = {
      Question_id: Question_id,
      Input: input,
      Output: output,
    };
    submitSampleTestCase(param);
  }
}

function submitSampleTestCase(param) {
  axios.post(URI + 'sampletestcases/add', param).then((response) => {
    var result = response.data;
  });
}
// function clearForm() {
//   document.getElementById("txtTitle").value = "";
//   document.getElementById("txtDescription").value = "";
//   document.getElementById("topic").value = "Cơ bản";
//   document.getElementById("level").value = "Dễ";
//   document.querySelector("numberSampleTestCase").selected;
//   document.querySelector("numberTestCase").selected  =true;
// }