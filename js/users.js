window.addEventListener('load',setupListeners);
function setupListeners(){

document.forms.form_register.addEventListener("submit", sendForm);

}
function processAnswer(answer){
  if (answer.status == "ok")
    return answer.result;
  else
    throw new Error(answer.message);
}


function sendForm(ev){
  let element = document.getElementById('message');
  element.textContent = "Wait please";
  ev.preventDefault();
  let args = new FormData(this);
  fetchFromJson('services/createUser.php',{method:'post',body:args}).then(processAnswer).then(userRegistred,userNotRegistred); 
}

function userRegistred(){
  let element = document.getElementById("message");
  element.textContent = "";
  let text = document.createElement('p');
  element.appendChild(text);
  text.textContent = "User registred with succes!";
}
function userNotRegistred(){
  let element = document.getElementById("message");
  element.textContent = "";
  let text = document.createElement('p');
  element.appendChild(text);
  text.textContent = "User could not be registred, try with another login";
}





