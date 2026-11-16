<?php

    require_once __DIR__ 'conexion.php';

    try{

        $edad1 = 21;
        $edad2 = 24;

        $sql = "SELECT nombre, edad FROM alumnos WHERE edad IN (?, ?) ORDER BY edad, nombre";
        $cnsulta = $db->prepare($sql);

        $cnsulta->bind_param("ii", $edad1, $edad2);
        $cnsulta->execute();

        $resultado = $cnsulta->get_result();

        echo "<h2>Buscar por edades</h2>";
        echo "<table border='1'>";
        echo "<tr><th>Nombre</th><th>Edad</th></tr>";

        while($fila = $resultado->fetch_assoc()) {

            echo "<tr>";
            echo "<td>" . htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "<td>" . (int)$fila['edad'] . "</td>";
            echo "</tr>";

        }

        echo "</table>";

        $resultado->free();
        $cnsulta->close();
        $db->close();
    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage();
        http_response_code(500);
        exit('Error al conectar con la base de datos.');
    }

?>