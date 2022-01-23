<?php
set_include_path('..'.PATH_SEPARATOR);
require_once('lib/common_service.php');
require_once('lib/initDataLayer.php');
require_once('lib/fonctions_parms.php');
session_name('session_de_Zac');
session_start();

 
try{
    /**
     * si parametre manquant, status='error';
     * si user déjà connecté status='error';
     * si login ou password incorrect, status='error';
     * sinon, status='ok', result='info:login, nom, prenom'
     */
    //$nom = checkString('nom', NULL, FALSE);
    $login = checkString('login', NULL, TRUE);
    $password = checkString('password', NULL, TRUE);

    
    if(isset($_SESSION['ident']))
        throw new UserAlreadyConnected("User is connected");
        
    $user = $data->authentification($login, $password);
    if ($user === NULL){
        throw new AuthentificationError("login or password not valid");
    }
    else if ($user !== NULL && !isset($_SESSION['ident'])) {
        $_SESSION['ident'] = $users;
        produceResult($user);
        unset($_SESSION['echec']);
    }

        
    
}
catch (ParmsException $e){
    produceError($e->getMessage());
    $_SESSION['echec'] = True;
} catch (PDOException $e){
    produceError($e->getMessage());
    $_SESSION['echec'] = True;
} 
catch (AuthentificationError $e){
    produceError($e->getMessage());
    $_SESSION['echec'] = True;
}
?>
