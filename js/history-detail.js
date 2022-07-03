const URI = 'http://104.248.145.103:4000/historypractices/'


function page_Load(){
    getHistory()
}

function getHistory(){
    axios.get(URI +"gethistorypracticebyid/"+sessionStorage.getItem("History_ID")).then(response =>{
        data = response.data;
        console.log(data[0])
        document.getElementById("description").innerText = String(data[0].Question_description);
        document.getElementById("pass").innerText = String(data[0].Pass);
        document.getElementById("language").innerText = String(data[0].Languages);
        document.getElementById("date").innerText = String(renderSubmitDate(data[0].Submit_date));
        document.getElementById("testcasefail").innerText = String(data[0].Testcase_fail);
        document.getElementById("txtSourceCode").innerText = codeMirror.setValue(data[0].Source_code);
    });
}

function renderSubmitDate(Date) {
    return String(Date.slice(8, 10) + "-" + Date.slice(5, 7) + "-" + Date.slice(0, 4) + " " + Date.slice(11, 19));
  }