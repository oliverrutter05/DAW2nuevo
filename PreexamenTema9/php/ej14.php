<?php

    require_once 'conexion.php';

    try{

        $dni = '22222222B';

        $sql = "SELECT alumnos.dni, alumnos.nombre AS nombre, asignaturas.nombre AS asignatura, matriculas.anio, matriculas.nota
        FROM alumnos
        LEFT JOIN matriculas ON alumnos.dni = matriculas.dni
        LEFT JOIN asignaturas ON asignaturas.codigo = matriculas.codigo
        WHERE alumnos.dni = ?
        ORDER BY matriculas.anio DESC, asignaturas.nombre ASC";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('s', $dni);
        $stmt->execute();

        $resultado = $stmt->get_result();

        echo "<h2>Informe de un alumno</h2>";
        echo "<table border='1'>";
        echo "<tr><th>DNI</th><th>Nombre</th><th>Asignatura</th><th>Año</th><th>Nota</th></tr>";
        
        while($fila = $resultado->fetch_assoc()) {

            echo "<tr>";
            echo "<td>" . htmlspecialchars($fila['dni'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "<td>" . htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "<td>" . htmlspecialchars($fila['asignatura'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "<td>" . (int)$fila['anio'] . "</td>";
            echo "<td>" . (float)$fila['nota'] . "</td>";
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
        exit('Error al conectar con la base de datos.');
    }

?>