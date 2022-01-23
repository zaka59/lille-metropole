<?php
 
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
  <head>
    <meta charset="UTF-8"/>
    <title>Communes de la MEL</title>
    <link rel="stylesheet" type="text/css" href="style_td6.css" />
    <script src="js/fetchUtils.js"></script>
    <script src="js/communes.js"></script>
    <script src="js/carte.js"></script>
    <script src="js/login.js"></script>
    <script src="js/logout.js"></script>
    
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script>


  </head>
<body>
<header>
<h1>
Communes de la MEL
</h1>
<form action="" id="formLogin">
<fieldset>
  <label for="login">Login :</label>
  <input type="text" name="login" id="login" required="required" autofocus/>
  <label for="password">Mot de passe :</label>
  <input type="password" name="password" id="password" required="required" />
  <button type="submit" name="valid">OK</button>
</fieldset>
<div id="message"></div>
</form>
<div id="inscription">
  <a id="registrationLink" href="register.php">Créer un compte.</a>
</div>
</header>
<section id="main">
  <div id="choix">
    <form id="form_communes" action="">
      <fieldset>
        <legend>Choix des communes</legend>
        <label>Territoire :
          <select name="territoire">
              <option value=""
                      data-min_lat="50.499" data-min_lon="2.789"
                      data-max_lat="50.794" data-max_lon="3.272"
              >
                Tous
              </option>
              <!-- les autres options seront crées en JS -->
          </select>
        </label>
        <label>Surface minimale :
            <input type="number" name="surfaceMin" id="surfaceMin">
            <br>
        </label>
        <label>Surface maximal :
            <input type="number" name="surfaceMax" id="surfaceMax">
            <br>
        </label>
        <label>Mots-clés :
            <input type="text" name="word" id="word">
            <br>
        </label>
        </fieldset>
      <button type="submit">Afficher la liste</button>
    </form>
  </div>
  <br>
  <div id='carte'></div>
  <ul id="liste_communes">
</ul>

  
  <div id="details"></div>
</section>

<footer>
</footer>
</body>
</html>
