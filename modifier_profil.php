<?php
include "db.php";
session_start();


if (!isset($_SESSION['user_id'])) {
    header("Location: indexastro.php");
    exit();
}


$user_id = $_SESSION['user_id'];
$conn = new mysqli("localhost", "root", "", "lydia");

if ($conn->connect_error) {
    die("Échec de la connexion à la base de données : " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $mdp = $_POST['mdp'];
    $ancien_mdp = $_POST['ancien_mdp'];
    
    $query_verif_mdp = $conn->prepare("SELECT mdp FROM user WHERE id = ?");
    $query_verif_mdp->bind_param("i", $user_id);
    $query_verif_mdp->execute();
    $result_verif_mdp = $query_verif_mdp->get_result();
    $row_verif_mdp = $result_verif_mdp->fetch_assoc();
    $mdp_actuel = $row_verif_mdp['mdp'];

    if (password_verify($ancien_mdp, $mdp_actuel)) {
        // Vérifier si le nouveau mot de passe est différent de l'ancien
        if ($mdp != $ancien_mdp) {
            // Hasher le nouveau mot de passe
            $mdp_hash = password_hash($mdp, PASSWORD_DEFAULT);
            $query = $conn->prepare("UPDATE user SET nom = ?, prénom = ?, mdp = ? WHERE id = ?");
            $query->bind_param("sssi", $nom, $prenom, $mdp_hash, $user_id);

            // Exécuter la requête de mise à jour
            $query->execute();

            // Redirection vers la page du profil utilisateur après la mise à jour
            header("Location: profil.php");
            exit();
        } else {
        
            $erreur_mdp = "Le nouveau mot de passe doit être différent de l'ancien.";
        }
    } else {

        $erreur_mdp = "L'ancien mot de passe est incorrect.";
    }

    $query_verif_mdp->close();
}

// Récupérer les informations de l'utilisateur
$query = $conn->prepare("SELECT nom, prénom FROM user WHERE id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    die("Utilisateur non trouvé.");
}

$query->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style_modifier_profil.css">
    <title>Modifier le profil</title>
</head>
<body>
<div class="container">
    <h1>  Modifier le profil </h1>
    <?php if (isset($erreur_mdp)) echo "<p style='color: red;'>$erreur_mdp</p>"; ?>
   

    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <label for="nom">Nom :</label><br>
        <input type="text" id="nom" name="nom" value="<?= htmlspecialchars($user['nom']) ?>"><br><br>
        <label for="prenom">Prénom :</label><br>
        <input type="text" id="prenom" name="prenom" value="<?= htmlspecialchars($user['prénom']) ?>"><br><br>
        <label for="ancien_mdp">Ancien mot de passe :</label><br>
        <input type="password" id="ancien_mdp" name="ancien_mdp"><br><br>
        <label for="mdp">Nouveau mot de passe :</label><br>
        <input type="password" id="mdp" name="mdp"><br><br>
        <input type="submit" value="Enregistrer">
    </form>
    </div>
</body>
</html>
