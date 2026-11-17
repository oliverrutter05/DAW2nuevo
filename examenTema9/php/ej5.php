<?php

    require_once 'conexion.php';

    try{

        $dni = '88888888B';
        $nombre = 'Lucía Vega';
        $edad = 22;

        $sql = "INSERT INTO alumnos (dni, nombre, edad) VALUES (?, ?, ?)";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('ssi', $dni, $nombre, $edad);
        $stmt->execute();

        echo "<h2>Insertar un alumno</h2>";

        if($stmt->affected_rows > 0) {

            echo "<p>Alumno insertado: " . $stmt->affected_rows . "</p>";

        }

        $stmt->close();
        $db->close();

    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('<br>Error al conectar la base de datos.');
    }

?>