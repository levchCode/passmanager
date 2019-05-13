let pass_data = []
let secret = ""

function tabulate()
{
    let txt = "<tr><td>Service</td><td>Login</td><td>Password</td><td>Actions</td></tr>"
    for (x in pass_data) {
      txt += "<tr contenteditable><td>" + pass_data[x].name + "</td><td>" + pass_data[x].login + 
      "</td><td>" + pass_data[x].pass +
      "</td><td><input type='button' onclick='updateEntry("+ x +")' value='Update'><input type='button' onclick='removeEntry("+ x +")' value='Delete'></td></tr>";
    }
    document.getElementById("creds").innerHTML = txt;   
}


function show()
{
    try {
    pass_data = JSON.parse(decrypt())
    tabulate()
    }
    catch(e) {
        alert("Incorrect password or invalid file format")
    }

    
}

function handleFile()
{
    let reader = new FileReader();

    reader.onload = function(fileLoadedEvent){
        secret = fileLoadedEvent.target.result;
    };

    reader.readAsText(document.getElementById("secret").files[0], "UTF-8");
}

function download(filename) {
    let text = encrypt()
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

function decrypt()
{
    let key = document.getElementById("pas").value
    return CryptoJS.DES.decrypt(secret, key).toString(CryptoJS.enc.Utf8);
}

function encrypt()
{
    let message = JSON.stringify(pass_data)
    let key = document.getElementById("pas").value
    let encrypted = CryptoJS.DES.encrypt(message, key);
  
    return encrypted.toString();
}

function updateEntry(index)
{
    var table = document.getElementById("creds");
    pass_data[index].name = table.rows[index+1].cells[0].innerHTML
    pass_data[index].login = table.rows[index+1].cells[1].innerHTML
    pass_data[index].pass = table.rows[index+1].cells[2].innerHTML
    tabulate()
}

function addEntry()
{
    pass_data.push({"name":document.getElementById("name").value, "login":document.getElementById("login").value, "pass":document.getElementById("pass").value})
    tabulate()
}

function removeEntry(index)
{
    pass_data.splice(index, 1)
    tabulate()
}

function generateNewPassword()
{
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";

    for (var x = 0; x < 20; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }

    document.getElementById("pass").value = pass
    
}
