<?php

    require_once __DIR__  . '/conexion.php';

    try {
        $sql = "SELECT nombre, edad FROM alumnos ORDER BY edad DESC LIMIT 2";
        $resultado = $db->query($sql);

        echo "<h2>Los dos alumnos con más edad</h2>";
        echo "<table border=1>";
        echo "<tr><th>Nombre</th><th>Edad</th></tr>";

        while ($fila = $resultado->fetch_assoc()) {
            echo "<tr>";

            echo "<td>" . htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "<td>" . (int)$fila['edad'] . "</td>";
            
            echo "</tr>";
        }

        echo "</table>";

        $resultado->free();
        $db->close();

    }
    catch (mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('Error de conexión con la base de datos.');
    }

?>