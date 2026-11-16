<?php

    require_once 'conexion.php';

    try{

        $dni = '77777777A';
        $codigo = 101;
        $anio = 2026;
        $nota = 7.5;

        $sql = "INSERT INTO matriculas (dni, codigo, anio, nota) VALUES (?, ?, ?, ?)";
        $stmt = $db->prepare($sql);

        $stmt->bind_param('siid', $dni, $codigo, $anio, $nota);
        $stmt->execute();

        echo "<h2>Insertar una matrícula</h2>";
        echo "<p>Fila introducida: " . $stmt->affected_rows ."</p>";

        $stmt->close();
        $db->close();

    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('<br>Error al conectar la base de datos');
    }

?>