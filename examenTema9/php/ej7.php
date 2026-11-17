<?php

    require_once 'conexion.php';

    try{
        $dni = '22222222B';
        $codigo = 101;
        $anio = 2025;

        $sql = "DELETE FROM matriculas WHERE dni = ? AND codigo = ? AND anio = ?";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('sii', $dni, $codigo, $anio);
        $stmt->execute();

        echo "<h2>Eliminar una matrícula</h2>";

        if($stmt->affected_rows > 0) {

            echo "<p>Matrícula eliminada</p>";

        }
        else {

            echo "<p>No encontrada</p>";

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