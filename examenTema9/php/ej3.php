<?php

    require_once 'conexion.php';

    try{

        $edadMinima = 21;

        $sql = "SELECT nombre, edad 
        FROM alumnos 
        WHERE edad >= ?
        ORDER BY edad, nombre";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('i', $edadMinima);
        $stmt->execute();

        $resultado = $stmt->get_result();

        echo "<h2>Buscar desde una edad</h2>";
        echo "<br><table border='1'>";
        echo "<tr><th>Nombre</th><th>Edad</th></tr>";

        while($fila = $resultado->fetch_assoc()) {

            $nombre = htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8');
            $edad = (int)$fila['edad'] ?? "Sin coincidencias";

            echo "<tr>";
            echo "<td>" . $nombre . "</td>";
            echo "<td>" . $edad . "</td>";
            echo "</tr>";

        }

        echo "</table>";

        $resultado->free();
        $stmt->close();
        $db->close();

    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('<br>Error al conectar la base de datos.');
    }
    
?>