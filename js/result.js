function displayResult() {
    var content = "";
    content += `
        <h3 class = "mt-3">Câu hỏi: `+ sessionStorage.getItem("description") + ` </h3>
        <h1 class = "mt-4 text-center text-danger">Đạt: `+sessionStorage.getItem("Pass")+`/`+sessionStorage.getItem("Total_TestCases")+` test cases</h1>
        `;
    document.getElementById("result").innerHTML = content;
    console.log(content);
}

function page_Load(){
    displayResult();
}