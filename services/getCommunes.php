<?php
set_include_path('..'.PATH_SEPARATOR);
require_once('lib/common_service.php');
require_once('lib/initDataLayer.php');
require_once('lib/fonctions_parms.php');

try{
  $territoire = checkString('territoire',NULL,FALSE);
  $word = checkString('word',NULL,FALSE);
  $surfaceMin = checkUnsignedInt('surfaceMin',NULL,FALSE);
  $surfaceMax = checkUnsignedInt('surfaceMax',NULL,FALSE);
  $territoires = $data->getCommunes($territoire,$word,$surfaceMin,$surfaceMax);
  
  produceResult($territoires);
}catch(ParmsException $e){
  produceError("error");
}
catch (PDOException $e){
    produceError($e->getMessage());
}

?>
