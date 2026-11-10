<?php

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    try {
        $db = new mysqli('localhost', 'prexam', 'CLAVE', 'centro');
        $db->set_charset('utf8mb4');

        $sql = "SELECT nombre, edad FROM alumnos ORDER BY alumnos ASC";
        $resultado = $db->query($sql);

        $totalFilas = $resultado->num_rows;
        echo "<p>Número total de filas: $resultado</p>";

        echo "<table border='1'>";
        echo "<tr><th>Nombre</th><th>Edad</th></tr>";

        while($fila = $resultado->fetch_assoc()) {
            echo "<tr>";

            echo "<td>" . htmlspecialchars($fila['nombre'], ENT_QUOTES , 'UTF-8') . "</td>";
            echo "<td>" . (int)$fila['edad'] . "</td>";

            echo "</tr>";
        }

        echo "</table>";

        $resultado->free();
        $db->close();
    } 
    catch (mysqli_sql_exception $e) {
        echo "Error al procesar la consulta";
    }

?>