<?php
set_include_path('..'.PATH_SEPARATOR);
require_once('lib/common_service.php');
require_once('lib/initDataLayer.php');
require_once('lib/fonctions_parms.php');

try{
  
    $commune = checkString('insee',NULL,FALSE);
    $communeDetails = $data->getDetails($commune);
    if($communeDetails===NULL)
    	produceError("pas de insee NULL"); // you can create an Exception if you want 
    else
   		produceResult($communeDetails);
    
}catch(ParmsException $e){
  produceError("error");
}
catch (PDOException $e){
    produceError($e->getMessage());
}

?>