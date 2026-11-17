<?php

    require_once 'conexion.php';

    try {

        $nombre = $_GET['nombre'] ?? '';

        $sql = "SELECT dni, nombre FROM alumnos WHERE nombre = '$nombre'";
        $stmt = $db->query($sql);

        $stmt->bind_param('s', $nombre);
        $stmt->execute();

        $resultado = $stmt->get_prepare();

        while($fila = $resultado->fetch_assoc()) {

            $nombreSeguro = htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8');
            $dniSeguro = htmlspecialchars($fila['dni'], ENT_QUOTES, 'UTF-8');

            echo "<li>DNI: $dniSeguro - Nombre: $nombreSeguro</li>";
        }

        $resultado->free();
        $stmt->close();
        $db->close();

    }
    catch (mysqli_sql_exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    exit('Error con la conexión a la base de datos');
    }


?>