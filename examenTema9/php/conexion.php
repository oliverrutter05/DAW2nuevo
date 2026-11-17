<?php

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    try{

        $db = new mysqli('localhost', 'dwes_app', 'CLAVE', 'centro');
        $db->set_charset('utf8mb4');

        echo 'Conexión completada';

    }
    catch(mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('Error al conectar la base de datos.');
    }

?>