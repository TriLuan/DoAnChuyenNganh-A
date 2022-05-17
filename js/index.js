const URI = "http://103.253.147.116:4000/";
var questionList=[];

function page_Load(){
  getData('questions');
  setPostQuestion();
}

var getData=function(dataName){
  axios.get(URI+ dataName+"/getlist").then((response) => {
    questionList = response.data;
    console.log(questionList);
    renderQuestions();
  });
}

var renderQuestions = function () {
  var content = "";
  for (let i = 0; i < questionList.length; i++) {
    content +=
      `
            <div class="row news-row">
            <div class="col-sm-6 col-md-5 news-img">
              <img src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/cod16174155365053.jpeg" class="img-fluid" />
            </div>
            <div class="col-sm-6 col-md-7 news-text">
              <h2>` +
      questionList[i].Title +
                `</h2>
              <span>Chủ đề: ` +
      questionList[i].Topic +
                `</span>
                <br>
              <span>Cấp độ: ` +
      questionList[i].Level +
                `</span>
                <br>
                <span>Ngày tạo: ` +
      questionList[i].CreateDate.slice(0,10) +
                `</span>
                <br>
              <p>
              ` +
      questionList[i].Description +
      `
              </p>
              <button onclick="document.location='./IDE.html'">Làm bài</button>
            </div>
          </div>
        
            `;
  }

  document.querySelector("#questions").innerHTML = content;
};

function setPostQuestion(){
  var role = sessionStorage.getItem("Role");
  if (role == "Author"){
    document.getElementById("post-practice").style.visibility = "visible";
  }
}