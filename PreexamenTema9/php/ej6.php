<?php

    require_once __DIR__ 'conexion.php';

    try{

        $texto = 'lo';

        $patron = "%" . $texto . "%";

        $sql = "SELECT nombre, edad FROM alumnos WHERE nombre LIKE ? ORDER BY nombre";
        $cnsulta = $db->prepare($sql);

        $cnsulta = bind_param("s", $patron);

        $cnsulta->execute();
        $resultado = $cnsulta->get_result();

        echo "<h2>Buscar parte de un nombre</h2>";
        
        if($resultado->num_row > 0) {
            echo "<table border='1'>";
            echo "<tr><th>Nombre</th><th>Edad</th></tr>";

            while($fila = $resultado->fetch_assoc()) {

                echo "<tr>";
                echo "<td>" . htmlspecialchars($fila['nombre'], ENT_QUOTES, 'UTF-8') . "</td>";
                echo "<td>" . (int)$fila['edad'] . "</td>";
                echo "</tr>";

            }
            echo "</table>";
        }
        else {
            echo "<p>No hay condiciones para el texto buscado</p>";
        }

        $resultado->free();
        $cnsulta->close();
        $db->close();
        

    }
    catch (mysqli_sql_exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('Error al conectar con la base de datos.');
    }

?>