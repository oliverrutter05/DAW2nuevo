<?php

    require_once 'conexion.php';

    try{

        $sql = "SELECT nombre, edad 
        FROM alumnos
        ORDER BY edad DESC, nombre DESC";
        $resultado = $db->query($sql);



        echo "<h2>Listado básico</h2>";
        echo "<br><p>Hay un total de " . $resultado->num_rows . " alumnos</p>";

        echo "<table border='1'>";
        echo "<tr><th>Nombre</th><th>Edad</th></tr>";

        while($fila = $resultado->fetch_assoc()) {

            $nombre = htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8');
            $edad = (int)$fila['edad'];

            echo "<tr>";
            echo "<td>" . $nombre . "</td>";
            echo "<td>" . $edad . "</td>";
            echo "</tr>";

        }

        echo "</table>";

        $resultado->free();
        $db->close();
        

    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('Error al conectar la base de datos.');
    }
    

?>