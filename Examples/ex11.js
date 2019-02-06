// custom function to get an element from DOM
function element(selector) {
    return document.querySelector(selector);
}

function saveButtonHandler() {
    element("#name").focus();
    var name = element("#name").value.trim();
    if (!name) return;

    var email = element("#email").value.trim();
    var phone = element("#phone").value.trim();

    var p1 = { name, email, phone };

    var data = localStorage.getItem("data");
    if (!data) {
        data = "[]";
    }
    data = JSON.parse(data);
    data.push(p1);
    localStorage.setItem("data", JSON.stringify(data));
    displayData();
    document.querySelectorAll("input[type=text]").forEach(e => e.value = "");
}

function displayData() {
    var data = localStorage.getItem("data");
    if (!data) {
        return;
    }
    data = JSON.parse(data);

    var str = "";
    data.forEach((p, index) => {
        str += `<tr><td>${index+1}</td><td>${p.name}</td><td>${p.email}</td><td>${p.phone}</td></tr>`;
    });

    element("#tbl1 > tbody").innerHTML = str;
}

window.onload = function () {
    element("#name").focus();
    element("#btnSave").onclick = saveButtonHandler;
    displayData();
};