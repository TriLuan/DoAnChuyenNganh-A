const URI = "http://104.248.145.103:4000/";
function page_Load() {
    getHistory();
}
var content = "";
function getHistory() {
    axios.get(URI + "historypractices/gethistorypractice/" + sessionStorage.getItem("Student_Id")).then((response) => {
        var data = response.data;
        renderHistory(data);
    });
}

function renderHistory(data) {
    for (let i = 0; i < data.length; i++) {
        content += `
        <tr class="align-middle alert border-bottom" role="alert">
              <td>`+ (i+1) + `</td>
              <td class="text-center">
                <img style="width:140px;height:90px"  src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/cod16174155365053.jpeg"/>
              </td>
              <td>
                <div>`+ data[i].Question_description + `</div>
              </td>
              <td>
                <div class="fw-600">`+ renderCreateDate(data[i].Submit_date) + `</div>
              </td>
              <td>`+ data[i].Source_code + `</td>
              <td>`+ data[i].Pass + `</td>
              <td>`+ renderTestCaseFail(data[i].Testcase_fail) + `</td>
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