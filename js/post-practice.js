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
      <input type="text" class="form-control" id="txtSampleTestCaseInput`+i+`" placeholder="Input"/>
      <input type="text" class="form-control" id="txtSampleTestCaseOutput`+i+`" placeholder="Output"/>
                  `;
    console.log(i);
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
        <input type="text" class="form-control" id="txtTestCaseInput`+i+`" placeholder="Input"/>
        <input type="text" class="form-control" id="txtTestCaseOutput`+i+`" placeholder="Output"/>
                    `;
    console.log(i);
  }
  console.log(typeof value);
  console.log(content);
  document.getElementById("testCase").innerHTML = content;
}

function btnSubmit_Question() {
  axios.get(URI + "questions/getlastid").then((response) => {
    var data = response.data;
    var Question_id = renderLastId(data) + 1;
    console.log(Question_id);
    postQuestionProcess(Question_id);
  });
}

function renderLastId(data) {
  for (var question of data) {
    return question.Question_id;
  }
}

function postQuestionProcess(Question_id) {
  runPostQuestion(Question_id);
}

function runPostQuestion(Question_id) {
  var title = String(document.getElementById("txtTitle").value);
  var description = String(document.getElementById("txtDescription").value);
  var topic = String(document.getElementById("topic").value);
  var level = String(document.getElementById("level").value);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var param = {
    Question_id: Question_id,
    Title: title,
    Description: description,
    CreateDate: date,
    Topic: topic,
    Level: level,
    Author_id: 1,
  };
  console.log(param);
}
