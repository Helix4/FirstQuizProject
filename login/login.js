function checkAvailability(userName) {
  for (var userNumber in localStorage) {
    var credentials = localStorage[userNumber];
    var divider = credentials.indexOf(":");
    var existingUserName = credentials.substring(0, divider);

    if (userName === existingUserName) {
      return false;
    }
  }
  return true;
}

function addNewCredentials() {
  var username = document.forms.login.elements.uname.value;
  var password = document.forms.login.elements.pass.value;
  var userNumber = localStorage.length;
  var credentials = username + ":" + password;

  if( checkAvailability(username) ) {
    localStorage[userNumber] = credentials;
    document.cookie = "user=" + encodeURIComponent(username) + "; path=/";
    return true;
  }
  return false;
}

function authenticateUser() {
  var username = document.forms.login.elements.uname.value;
  var password = document.forms.login.elements.pass.value;
  var userNumber = localStorage.length;
  var credentials = username + ":" + password;

  for (var user in localStorage) {
    if (localStorage[user] === credentials) {
      document.cookie = "user=" + encodeURIComponent(username) + "; path=/";
      return true;
    }
  }
  return false;
}



window.onload = function() {
  var submit = document.getElementById("subcreds");
  var newUser = document.getElementById("newuser");

  newUser.onclick = function() {
    if (addNewCredentials()) {
      alert("Congratulations, you have created a new account!");
      document.location = "../main/index.html";
    }
    else {
            alert("User already exists! Please choose another username!");
    }
  };

  submit.onclick = function() {
    if (authenticateUser()) {
      document.location = "../main/index.html";
    }
    else {
      alert("The username and password you have entered do not match!");
    }
  };
};
