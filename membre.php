<?php
// Démarrer la session
session_start();

// Connexion à la base de données
$conn = mysqli_connect('localhost', 'root', '', 'lydia');

// Vérification de la connexion
if (!$conn) {
    die("Erreur de connexion à la base de données: " . mysqli_connect_error());
}

// Requête pour sélectionner tous les comptes
$sql = "SELECT * FROM user";
$resultat = mysqli_query($conn, $sql);


if (mysqli_num_rows($resultat) > 0) {
    
    while ($row = mysqli_fetch_assoc($resultat)) {
        echo  $row["nom"] ." " . $row["prénom"] . "<br>";
    }
} else {
    echo "Aucun compte trouvé.";
}

// Fermeture de la connexion
mysqli_close($conn);


?>
