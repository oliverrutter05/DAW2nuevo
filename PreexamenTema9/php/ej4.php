<?php

    require_once __DIR__ . '/conexion.php';

    try{

        $limite = 22;

        $sql = "SELECT alumnos, edad FROM alumnos WHERE edad < ? ORDER BY edad, nombre";
        $cnsulta = $db->prepare($sql);

        //"bind_param" se utiliza para vincular los parámetros a la consulta preparada.
        $cnsulta->bind_param('i', $limite);
        $cnsulta->execute();

        $resultado = $cnsulta->get_result();

        echo "<h2>Alumnos menores de $limite años</h2>";
        echo "<table border='1'>";
        echo "<tr><th>Nombre</th><th>Edad</th></tr>";

        while($fila = $resultado->fetch_assoc()){

            echo "<tr>";
            echo "<td>" . htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8') . "</td>";
            echo "<td>" . (int)$fila['edad'] . "</td>";
            echo "</tr>";

        }

        echo "</table>";

        $cnsulta->free();
        $db->close();

    }
    catch (mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('Error al conectar con la base de datos');
    }

?>