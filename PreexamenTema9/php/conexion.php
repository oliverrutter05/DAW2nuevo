<?php

    try{
        mysql_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $db = new mysqli('localhost', 'prexam', 'CLAVE', 'centro');

        $db -> set_charset('utf8mb4');

        echo 'Coñexión correcta';

    }
    catch(mysql_sql_exception $e) {

        echo 'Error de conexión con la base de datos.';

    }

?>