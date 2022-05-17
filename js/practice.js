const URI = "http://103.253.147.116:4000/";
var questionList = [];

function page_Load() {
  getData('questions');
  setPostQuestion();
}

var getData = function (dataName) {
  axios.get(URI + dataName + "/getlist").then((response) => {
    questionList = response.data;
    console.log(questionList);
    renderQuestionsTopic();
  });
}


var setQuestion = (description, ID) => {
  sessionStorage.setItem('ID', ID);
  sessionStorage.setItem('description', description);
  if (sessionStorage.description) {
    console.log(sessionStorage.description);
    console.log(sessionStorage.ID);
  } else {
    sessionStorage.description = "";
  }
}

var renderQuestionsTopic = function () {
  var content = "";
  var questionListEasy = questionList.filter(function (questionList) {
    return questionList.Level == 'Dễ';
  });
  var questionListMedium = questionList.filter(function (questionList) {
    return questionList.Level == 'Trung bình';
  });
  var questionListDifficult = questionList.filter(function (questionList) {
    return questionList.Level == 'Khó';
  });
  // if (questionListDifficult.length!=0){

  // }
  for (let i = 0; i < questionListEasy.length; i++) {
    if (i === 0) {
      content +=
        `
          <h2>Level: Dễ</h2>
          `
    }
    content +=
      `
                <div class="row news-row">
                <div class="col-sm-6 col-md-5 news-img">
                  <img src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/cod16174155365053.jpeg" class="img-fluid" />
                </div>
                <div class="col-sm-6 col-md-7 news-text">
                  <h2>` +
      questionListEasy[i].Title +
      `</h2>
                  <span>Chủ đề: ` +
      questionListEasy[i].Topic +
      `</span>
                    <br>
                  <span>Cấp độ: ` +
      questionListEasy[i].Level +
      `</span>
                    <br>
                    <span>Ngày tạo: ` +
      questionListEasy[i].CreateDate.slice(0, 10) +
      `</span>
                    <br>
                  <p id="description">
                  ` +
      questionListEasy[i].Description +
      `
                  </p>
                  <button onclick="setQuestion('${questionListEasy[i].Description}','${questionListEasy[i].Question_id}');document.location='./IDE.html'">Làm bài</button>
                </div>
              </div>
            
                `;
  }
  for (let i = 0; i < questionListMedium.length; i++) {
    if (i === 0) {
      content +=
        `
          <h2>Level: Trung bình</h2>
          `
    }
    content +=
      `
                  <div class="row news-row">
                  <div class="col-sm-6 col-md-5 news-img">
                    <img src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/cod16174155365053.jpeg" class="img-fluid" />
                  </div>
                  <div class="col-sm-6 col-md-7 news-text">
                    <h2>` +
      questionListMedium[i].Title +
      `</h2>
                    <span>Chủ đề: ` +
      questionListMedium[i].Topic +
      `</span>
                      <br>
                    <span>Cấp độ: ` +
      questionListMedium[i].Level +
      `</span>
                      <br>
                      <span>Ngày tạo: ` +
      questionListMedium[i].CreateDate.slice(0, 10) +
      `</span>
                      <br>
                    <p id="description">
                    ` +
      questionListMedium[i].Description +
      `
                    </p>
                    <button onclick="setQuestion('${questionListMedium[i].Description}','${questionListMedium[i].Question_id}');document.location='./IDE.html'">Làm bài</button>
                  </div>
                </div>
              
                  `;
  }
  for (let i = 0; i < questionListDifficult.length; i++) {
    if (i === 0) {
      content +=
        `
            <h2>Level: Khó</h2>
            `
    }
    content +=
      `
                  <div class="row news-row">
                  
                  <div class="col-sm-6 col-md-5 news-img">
                    <img src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/cod16174155365053.jpeg" class="img-fluid" />
                  </div>
                  <div class="col-sm-6 col-md-7 news-text">
                    <h2>` +
      questionListDifficult[i].Title +
      `</h2>
                    <span>Chủ đề: ` +
      questionListDifficult[i].Topic +
      `</span>
                      <br>
                    <span>Cấp độ: ` +
      questionListDifficult[i].Level +
      `</span>
                      <br>
                      <span>Ngày tạo: ` +
      questionListDifficult[i].CreateDate.slice(0, 10) +
      `</span>
                      <br>
                    <p id="description">
                    ` +
      questionListDifficult[i].Description +
      `
                    </p>
                    <button onclick="setQuestion('${questionListDifficult[i].Description}','${questionListDifficult[i].Question_id}');document.location='./IDE.html '">Làm bài</button>
                  </div>
                </div>
              
                  `;
  }
  document.querySelector("#questions").innerHTML = content;
};

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
