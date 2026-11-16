<?php

    require_once 'conexion.php';

    try{

            $notaMinima = 5;

            $sql = "SELECT a.nombre AS nombre, asig.nombre AS asignatura, m.anio, m.nota   FROM alumnos a
                JOIN matriculas m ON a.dni = m.dni
                JOIN asignaturas asig ON asig.codigo = m.codigo
                WHERE m.nota >= ?
                ORDER BY m.nota DESC";

            $stmt = $db->prepare($sql);

            $stmt->bind_param('d', $notaMinima);
            $stmt->execute();

            $resultado = $stmt->get_result();

            echo "<h2>Filtrar matrícula por nota</h2>";
            echo "<table border='1'>";
            echo "<tr><th>Nombre</th><th>Asignatura</th><th>Año</th><th>Nota</th></tr>";

            while($fila = $resultado->fetch_assoc()) {

                $nombre = htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8');
                $agisnatura = htmlspecialchars($fila['asignatura'], ENT_QUOTES, 'UTF-8');
                $anio = (int)$fila['anio'];
                $nota = (float)$fila['nota'];

                echo "<tr>";
                echo "<td>" . $nombre . "</td>";
                echo "<td>" . $agisnatura . "</td>";
                echo "<td>" . $anio . "</td>";
                echo "<td>" . $nota . "</td>";
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
        exit("Error al conectar la base de datos.");
    }


?>