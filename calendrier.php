<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendrier des événements astronomiques</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
        .evenement-passe {
            background-color: #f7f7f7;
        }
        .evenement-futur {
            background-color: #eafaea;
        }
    </style>
</head>
<body>
    <h1>Calendrier des événements astronomiques</h1>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Événement</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Exemple de données d'événements astronomiques
            $evenements_astronomiques = array(
                array("2024-05-15", "Éclipse lunaire totale"),
                array("2024-06-10", "Conjonction de Jupiter et Saturne"),
                array("2024-08-12", "Pluie de météores des Perséides"),
                // Ajouteer iciiiii
            );

            
            foreach ($evenements_astronomiques as $evenement) {
                $date_evenement = strtotime($evenement[0]);
                $classe_evenement = ($date_evenement < time()) ? 'evenement-passe' : 'evenement-futur';
                echo "<tr class='$classe_evenement'>";
                echo "<td>" . date("d/m/Y", $date_evenement) . "</td>";
                echo "<td>" . $evenement[1] . "</td>";
                echo "</tr>";
            }
            ?>
        </tbody>
    </table>
</body>
</html>
