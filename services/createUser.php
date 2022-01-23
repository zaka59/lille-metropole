<?php
 set_include_path('..'.PATH_SEPARATOR);

 require_once('lib/common_service.php');
 require_once('lib/initDataLayer.php');
 require_once('lib/fonctions_parms.php');
try {
  
  $login = checkString("login",NULL,TRUE);
  $password = checkString("password",NULL,TRUE);
  $nom = checkString("nom",NULL,TRUE);
  $prenom = checkString("prenom",NULL,TRUE);
  $res = $data->createUser($login, $password, $nom, $prenom);
  produceResult($login);

 }catch(ParmsException $e){
  produceError($e->getMessage());
}
catch (PDOException $e){
   produceError($e->getMessage());
}

?>
