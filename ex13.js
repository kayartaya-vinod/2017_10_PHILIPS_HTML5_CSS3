var db;

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

    // execute an SQL insert statement
    var sql = "insert into persons values (?, ?, ?)";
    var data = [name, email, phone];

    db.transaction(tx => {
        tx.executeSql(sql, data, (tx, result) => {
            alert("New person data saved with id " + result.insertId);
            document.querySelectorAll("input[type=text]").forEach(t => t.value = "");
            displayData();
        });
    });
}

function displayData() {
    var sql = "select * from persons";
    var data = []; // paramerer values, if any
    db.transaction(tx => {
        tx.executeSql(sql, data, (tx, rs)=>{
            var str = "";
            for(var i=0; i<rs.rows.length; i++){
                var p = rs.rows.item(i);
                str += `<tr><td>${i+1}</td><td>${p.name}</td><td>${p.email}</td><td>${p.phone}</td>`;
            }
            document.querySelector("#tbl1>tbody").innerHTML = str;
        });
     });
}

window.onload = function () {
    element("#btnSave").onclick = saveButtonHandler;

    db = window.openDatabase("vindb1", "1.0", "Database to hold contact details", 200000, function (db) {
        db.transaction(function (tx) {
            var sql = "create table persons(name varchar(50), email varchar(50), phone varchar(50))";
            tx.executeSql(sql);
            console.log("New table 'persons' created!");
        });
    });

    displayData();
};