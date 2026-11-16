<?php

    require_once 'conexion.php';

    try {

        $dni = '77777788A';
        $nombre = 'Ana Martín';
        $edad = 20;

        $sql = "INSERT INTO alumnos (dni, nombre, edad) VALUES (?, ? , ?)";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('ssi', $dni, $nombre, $edad);
        $stmt->execute();

        echo "<h2>Insertar alumno</h2>";
        echo "<p>Filas insertadas: " . $stmt->affected_rows . "<p>";

        $stmt->close();
        $db->close();

    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit("Error al insertar el alumno en la base de datos.");
    }

?>