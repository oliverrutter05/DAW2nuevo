<?php

    require_once 'conexion.php';

    try{

        $nuevaNota = 7.75;
        $dni = '55555555Z';
        $codigo = 102;
        $anio = 2026;

        $sql = "UPDATE matriculas SET nota WHERE dni = ? AND codigo = ? AND anio = ?";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('dsii', $nuevaNota, $dni, $codigo, $anio);
        $stmt->execute();

        echo "<h2>Actualizar una nota</h2>";

        if($stmt->affected_rows > 0) {

            echo "<br><p>Nota actualizada</p>";

        }
        else {

            echo "<br><p>Sin cambios</p>";

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