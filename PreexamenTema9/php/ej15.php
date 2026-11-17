<?php

    require_once 'conexion.php';

    try{

        //Nuevo alumno
        $dni = '11111111A';
        $nombre = 'Oliver Rutter';
        $edad = 21;
        
        //Matrícula
        $codigo = 101;
        $anio = 2026;
        $nota = 0.5;

        $db->begin_transaction();

        $sqlAlumno = "INSERT INTO alumnos (dni, nombre, edad) VALUES (?, ?, ?)";
        $stmt1 = $db->prepare($sqlAlumno);
        $stmt1->bind_param('ssi', $dni, $nombre, $edad);
        $stmt1->execute();
        $stmt1->close();

        $sqlMatricula = "INSERT INTO matriculas(dni, codigo, anio, nota) VALUES (?, ?, ?, ?)";
        $stmt2 = $db->prepare();
        $stmt2->bind_param('siid', $dni, $codigo, $anio, $nota);
        $stmt2->execute();
        $stmt2->close();

        $db->commit();
        echo "<h2>Alta segura completa</h2>";
        echo "<p>Se ha añadido a la lista!!</p>";

    }
    catch(mysqli_sql_exception $e) {
        if(isset($db)) {
            $db->rollback();
        }

        error_log($e->getMessage());
        http_response_code(500);
        exit('Error con la conexión a la base de datos');
        
    }
    finally {
        if(isset($db) && $db instanceof mysqli) {
            $db->close();
        }        
    }


?>