function sendFormLogout(ev) {
    ev.preventDefault();
    let url = 'services/logout.php';
    fetchFromJson(url)
    .then(processAnswerL)
    .then(logOut); 
}



/**
 * 
 * @param {JSON} answer a requet result
 * @return null if the requet is not ok
 *         object else;
 * 
 */
function processAnswerL(answer){
    if (answer.status == "ok")
      return answer.result;
    else
      return null;
  }

function logOut(){
    setLoginInterface();
}