<?php

    require_once 'conexion.php';

    try{

        $dni = '77777777A';
        $codigo = 101;
        $anio = 2026;
        $nuevaNota = 8.25;

        $sql = "UPDATE matricula SET nota = ? WHERE dni = ? AND codigo = ? AND anio = ?";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('d', $nuevaNota, $dni, $codigo, $nuevaNota);
        $stmt->execute();

        echo "<h2>Actualizar nota</h2>";
        if($stmt->affected_rows > 0) {
            echo "<p>Linea modificada: " . $stmt->affected_rows . "</p>";
        }
        else{
            echo "<p>Ningun linea ha sido actualizado</p>";
        }

        $stmt->close();
        $db->close();

    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('Error al conectar con la base de datos.');
    }

?>