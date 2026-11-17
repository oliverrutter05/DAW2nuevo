<?php

    require_once 'conexion.php';

    try{

        $dni = '77777777A';
        $codigo = 101;
        $anio = 2026;

        $sql = "DELETE FROM matriculas WHERE dni = ? AND codigo = ? AND anio = ?";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('sii', $dni, $codigo, $anio);
        $stmt->execute();

        echo "<h2>Eliminar una matrícula</h2>";

        if($stmt->affected_rows === 1) {
            echo "<p>Matrícula eliminada";
        }
        else {
            echo "<p>No se ha encontrado la matrícula</p>";
        }

    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('Error al conectarse a la base de datos.');
    }

?>