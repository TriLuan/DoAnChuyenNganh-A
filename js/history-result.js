const URI = "http://104.248.145.103:4000/";
function page_Load() {
    getHistory();
    setPostQuestion();
}
var content = "";
function getHistory() {
    axios.get(URI + "historypractices/gethistorypractice/" + sessionStorage.getItem("Student_Id")).then((response) => {
        var data = response.data;
        console.log(response)
        renderHistory(data);
    });
}

function renderHistory(data) {
    for (let i = 0; i < data.length; i++) {
        content += `
        <tr class="align-middle alert border-bottom" role="alert">
              <td class="text-center">`+ (i+1) + `</td>
              <td class="text-center">
                <div>`+ data[i].Question_description + `</div>
              </td>
              <td class="text-center">
                <div class="fw-600">`+ renderCreateDate(data[i].Submit_date) + `</div>
              </td>
              <td class="text-center">`+String(data[i].Languages).toUpperCase()+`</td>
              <td class="text-center">`+ data[i].Pass + `</td>
              <td class="text-center"><Button onclick="clickSeeDetail(`+data[i].ID+`)">Detail</Button> </td>
            </tr>
                        `;
        console.log(content);
        document.getElementById("table").innerHTML = content;
    }
}

function renderTestCaseFail(data){
  if(data == ""){
    return String("Không có lỗi");
  }
  return data;
}

function renderCreateDate(createDate) {
    return String(createDate.slice(8, 10) + "-" + createDate.slice(5, 7) + "-" + createDate.slice(0, 4) + " " + createDate.slice(11, 19));
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

function clickSeeDetail(id){
  sessionStorage.setItem("History_ID", id);
  document.location = 'history-detail.html'
}