const {firebase} = require('./../config.js');
const db = firebase.database().ref('/posts');

var form = document.querySelector('#postSubmit');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  var title = document.querySelector('#title').value;
  var desc = document.querySelector('#desc').value;
  var src = document.querySelector('#src').value;

  sendPost(title, desc, src);
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
    })
  }
}

function validateData(title, desc, src) {
  if (title.length == 0 || desc.length == 0 || src.length == 0)
    return false;
  return true;
}