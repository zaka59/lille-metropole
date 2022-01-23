
window.addEventListener('load',initForm);
function initForm(){
  fetchFromJson('services/getTerritoires.php')
  .then(processAnswer)
  .then(makeOptions);
  
  document.forms.form_communes.addEventListener("submit", sendForm);

  // décommenter pour le recentrage de la carte :
  //document.forms.form_communes.territoire.addEventListener("change",function(){
  //  centerMapElt(this[this.selectedIndex]);
  //});
}

function processAnswer(answer){
  if (answer.status == "ok")
    return answer.result;
  else
    throw new Error(answer.message);
}

function makeOptions(tab){
  for (let territoire of tab){  
    let option = document.createElement('option');
    option.textContent = territoire.nom;
    option.value = territoire.id;
    document.forms.form_communes.territoire.appendChild(option);
    for (let k of ['min_lat','min_lon','max_lat','max_lon']){
      option.dataset[k] = territoire[k];
    }
  }
}


function sendForm(ev){ // form event listener
    ev.preventDefault(); // empêche l’envoi normal
    let args = new FormData(this); // données du formulaire
    let queryString = new URLSearchParams(args).toString(); 
    let url = 'services/getCommunes.php?' + queryString;
    fetchFromJson(url).then(processAnswer).then(makeCommunesItems); 
}

function makeCommunesItems(tab){
  let element = document.getElementById("liste_communes");
  element.textContent = "";
  for (let commune of tab){  
    let item = document.createElement('li');
    item.textContent = commune.nom;
    item.value = commune.id;
    for (let k of ['insee','min_lat','min_lon','max_lat','max_lon']){ 
      item.dataset[k] = commune[k];
         }
    item.addEventListener('click', fetchCommune); 
    item.addEventListener('mouseover', function(){centerMapElt(item)});
    element.appendChild(item);
  }
}


function fetchCommune(){
  let inseeValue= this.dataset.insee;
  //let args = new FormData(this); // données du formulaire
  //let queryString = new URLSearchParams(inseeValue).toString();'insee'
  let url = "services/getDetails.php?insee=" + inseeValue;
  fetchFromJson(url).then(processAnswer).then(displayCommune);
}

function displayCommune(commune){
  let listContainer = document.getElementById("details");
  listContainer.textContent = "";
  let list = document.createElement('ul');
  listContainer.appendChild(list);
  createDetailMap(commune);
  for (let detail of ['insee', 'nom', 'nom_terr', 'surface', 'perimetre', 'pop2016', 'lat', 'lon']){
    let item = document.createElement('li');
    item.textContent = detail+' : '+commune[detail];
    list.appendChild(item);
  }
}


/**
 * Recentre la carte principale autour d'une zone rectangulaire
 * elt doit comporter les attributs dataset.min_lat, dataset.min_lon, dataset.max_lat, dataset.max_lon, 
 */
function centerMapElt(elt){
  let ds = elt.dataset;
  map.fitBounds([[ds.min_lat,ds.min_lon],[ds.max_lat,ds.max_lon]]);
}
