<?php

    require_once 'conexion.php';

    try{
        $dni = '77777777A';
        $nuevaEdad = 21;

        $sql = "UPDATE alumnos SET edad = ? WHERE dni = ?";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('is', $nuevaEdad, $dni);
        $stmt->execute();

        echo "<h2>Actualizar datos de alumno</h2>";

        if($stmt->affected_rows > 0) {
            echo "<p>Edad actualizada correctamente. Fila actualizado: " . $stmt->affected_rows . "</p>";
        }
        else{
            echo "<p>No se ha podido actualizar la edad.</p>";
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