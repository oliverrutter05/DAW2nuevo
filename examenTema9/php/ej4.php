<?php

    require_once 'conexion.php';

    try{

        $texto = 'a';

        $sql = "SELECT dni, nombre
        FROM alumnos
        WHERE nombre LIKE %a%";
        $stmt = $db->prepare($sql);
        
        $stmt->bind_param('s', $texto);
        $stmt->execute();

        $resultado = $stmt->get_result();

        echo "<h2>Buscar por nombre</h2>";
        echo "<br><table border='1'>";
        echo "<tr><th>DNI</th><th>Nombre</th></tr>";

        while($fila = $resultado->fetch_assoc()) {

            $dni = htmlspecialchars($fila['dni'], ENT_QUOTES, 'UTF-8');
            $nombre = htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8');

            echo "<tr>";
            echo "<td>" . $dni . "</td>";
            echo "<td>" . $nombre . "</td>";
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