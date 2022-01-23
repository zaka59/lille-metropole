<?php
set_include_path('..'.PATH_SEPARATOR);
require_once('lib/common_service.php');
require_once('lib/initDataLayer.php');
require_once('lib/fonctions_parms.php');
require('lib/watchdog.php');
 
try{
    
    if (!isset($_SESSION['ident']))
        produceError("No one is connected");

    else{
        produceResult($_SESSION['ident']);
        session_destroy(); 
    }   
} catch (Exception $e){
    produceError($e->getMessage());
}
?>
