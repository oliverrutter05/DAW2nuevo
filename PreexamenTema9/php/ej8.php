<?php

    require_once 'conexion.php';

    try{

        $anio = 2026;

        $sql = "SELECT a.nombre AS nombre, asig.nombre AS asignatura, m.nota 
        FROM alumnos a
        JOIN matriculas m ON a.dni = m.dni 
        JOIN asignaturas asig ON asig.codigo = m.codigo 
        WHERE m.anio = ?";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('i', $anio);
        $stmt->execute();

        $resultado = $stmt->get_result();

        echo "<h2>Consultar por año</h2>";
        echo "<table border='1'>";
        echo "<tr><th>Nombre</th><th>Asignatura</th><th>Nota</th></tr>";

        

        while($fila = $resultado->fetch_assoc()) {

            $nombre = htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8');
            $asignatura = htmlspecialchars($fila['asignatura'], ENT_QUOTES, 'UTF-8');
            $nota = (float)$fila['nota'];

            echo "<tr>";
            echo "<td>" . $nombre . "</td>";
            echo "<td>" . $asignatura . "</td>";
 
            if($fila['nota'] === null) {
                echo "<td>Pendiente</td>";
            }
            else {
                echo "<td>" . $nota . "</td>";
            }

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
        exit('<br>Error al conectar con la base de datos');
    }

?>