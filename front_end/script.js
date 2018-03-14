const {firebase} = require('./../config.js');
const db = firebase.database().ref('/posts');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("postSubmit").style.display = "block";
    document.getElementById("logout").style.display = "block";
    document.getElementById("navTitle").innerHTML = "Add Post";
  } else {
    // No user is signed in.
    document.getElementById("postSubmit").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("navTitle").innerHTML = "Login";
  }
});

var loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var email = document.querySelector('#email').value;
  var password = document.querySelector('#password').value;

  if (email.length > 0 && password.length > 0) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      document.querySelector('#email').value = "";
      document.querySelector('#password').value = "";
    }).catch(function(err) {
      console.log("There was an error while signing in", err)
      alert(err.message);
    });
  }
});

var postForm = document.querySelector('#postSubmit');
postForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var title = document.querySelector('#title').value;
  var desc = document.querySelector('#desc').value;
  var src = document.querySelector('#src').value;

  sendPost(title, desc, src);
});

var logoutBtn = document.querySelector('#logout');
logoutBtn.addEventListener('click', function(e) {
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    
  }).catch(function(error) {
    console.log("There was an error while signing out", err);
  });  
});

function sendPost(title, desc, src) {

  if (validateData(title, desc, src)) {
    doc_to_send = {
      title: title,
      desc: desc,
      src: src
    }
    db.push(doc_to_send).then(function() {
      document.querySelector('#title').value = "";
      document.querySelector('#desc').value = "";
      document.querySelector('#src').value = "";
    }).catch(function(err) {
      alert(err);
    })
  }
}

function validateData(title, desc, src) {
  if (title.length == 0 || desc.length == 0 || src.length == 0)
    return false;
  return true;
}