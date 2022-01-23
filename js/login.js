window.addEventListener('load', setupListeners);



function setupListeners() {
    
    document.forms.formLogin.addEventListener('submit', sendFormLogin);

}

/**
 * 
 * @param {JSON} answer a requet result
 * @return null if the requet is not ok
 *         object else;
 */
function processAnswer(answer){
    if (answer.status == "ok")
      return answer.result;
    else
      throw new Error(answer.message);
  }


function sendFormLogin(ev) {
    ev.preventDefault();
    let args = new FormData(this);
    let queryString = new URLSearchParams(args).toString();
    let url = 'services/login.php?' + queryString;
    fetchFromJson(url , {method:'post',body:args})
    .then(processAnswer)
    .then(setConnectedInterface, errorMessage); 
}

function errorMessage(){
    let msgContainer = document.getElementById('message');
    msgContainer.textContent = "identifiants incorrect";
}

function setLoginInterface(){
    let header = document.getElementsByTagName('header')[0];
    clearContent(header);
    let titre = document.createElement('h1');
    titre.textContent = " Communes de la MEL ";
    header.appendChild(titre);
    header.appendChild(createForm());
   let inscriDiv = document.createElement('div');
   inscriDiv.id = "inscription";
   let inscriLink = document.createElement('a');
   inscriLink.id = "registrationLink";
   inscriLink.href = "register.php";
   inscriLink.textContent = "Créer un compte.";
   inscriDiv.appendChild(inscriLink);
   header.appendChild(inscriDiv);
}

function setConnectedInterface(user) {
    let header = document.getElementsByTagName('header')[0];
    let userNameContainer = document.createElement('span')
    userNameContainer.textContent = user.prenom + ' ' + user.nom +'('+user.login+')'; 
    let titre = document.createElement('h1');
    titre.textContent = " Communes de la MEL ";
    let usersInfos = document.createElement('h3');
    usersInfos.appendChild(userNameContainer);
    clearContent(header);
    header.appendChild(titre);
    header.appendChild(usersInfos);
    let formulaireDeconnexion = document.createElement('form');
    formulaireDeconnexion.setAttribute('id', 'deconnexion');
    formulaireDeconnexion.setAttribute('action', '');
    let logoutButton = document.createElement('button');
    logoutButton.textContent = "deconnexion"; 
    formulaireDeconnexion.appendChild(logoutButton);
    userNameContainer.append(formulaireDeconnexion);
    //header.appendChild(formulaireDeconnexion);
    formulaireDeconnexion.addEventListener('submit', sendFormLogout);
}

function clearContent(element){
    element.textContent = "";
}

function createForm(){
    let form = document.createElement('form');
    form.setAttribute('id', 'formLogin');
    let fieldset = document.createElement('fieldset');
    fieldset.appendChild(createLabel('Login : ', 'login'));
    fieldset.appendChild(createInput('text', 'login'));
    fieldset.appendChild(createLabel('Mot de passe : ', 'password'));
    fieldset.appendChild(createInput('password', 'password'));
    buuton = document.createElement('button');
    buuton.textContent = "OK";
    fieldset.appendChild(buuton);
    form.append(fieldset);
    div = document.createElement('div');
    div.setAttribute('id', 'message');
    form.appendChild(div);
    form.addEventListener('submit', sendFormLogin);
    return form;
}

function createLabel(referenceContent, forValue){
    let label = document.createElement('label');
    label.setAttribute('for', forValue);
    label.textContent = referenceContent;
    return label;
}

function createInput(type, name){
    let input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', name);
    input.setAttribute('name', name);
    return input;
}