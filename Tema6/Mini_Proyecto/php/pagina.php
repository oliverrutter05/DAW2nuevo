<?php
include 'datos.php';

function escapar($texto)
{
    return htmlspecialchars($texto, ENT_QUOTES, 'UTF-8');
}

function mostrarCabecera($titulo)
{
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Cuestionario de EA SPORTS FC y fútbol.">
        <title><?php echo escapar($titulo); ?> | FC 27</title>
        <link rel="stylesheet" href="../css/styles.css">
    </head>
    <body>
    <div class="landing">
        <div class="landing-glow" aria-hidden="true"></div>
        <header class="site-header landing-header">
            <a class="wordmark" href="../index.html" aria-label="FC 27, inicio">FC<span>27</span></a>
            <span class="header-label">EL RETO · TIPO TEST</span>
        </header>
    <?php
}

function mostrarPie($haRespondido)
{
    ?>
        <footer class="landing-footer">
            <span>FC 27 · EL RETO</span>
            <?php if ($haRespondido) { ?>
                <a href="../index.html">VOLVER A JUGAR</a>
            <?php } else { ?>
                <span>¿LISTO PARA JUGAR?</span>
            <?php } ?>
        </footer>
    </div>
    </body>
    </html>
    <?php
}

function mostrarFormulario($preguntas)
{
    ?>
    <main class="quiz-content">
        <div class="section-heading">
            <p class="eyebrow"><span class="eyebrow-line"></span> FC 27 · PON A PRUEBA TUS CONOCIMIENTOS</p>
            <h2>La alineación<br><span>está en tus manos.</span></h2>
            <p class="section-copy">Selecciona una respuesta en cada pregunta. Al terminar, podrás ver tu puntuación y repasar las soluciones.</p>
        </div>

        <form action="pagina.php" method="post">
            <?php foreach ($preguntas as $indice => $pregunta) { ?>
                <fieldset class="question-card">
                    <legend>
                        <span class="question-number"><?php echo sprintf('%02d', $indice + 1); ?></span>
                        <span><?php echo escapar($pregunta['pregunta']); ?></span>
                    </legend>
                    <div class="options-grid">
                        <?php foreach ($pregunta['respuestas'] as $respuestaIndice => $respuesta) { ?>
                            <label class="option">
                                <input type="radio" name="respuestas[<?php echo $indice; ?>]" value="<?php echo $respuestaIndice; ?>">
                                <span class="option-marker"><?php echo $respuestaIndice + 1; ?></span>
                                <span class="option-text"><?php echo escapar($respuesta); ?></span>
                            </label>
                        <?php } ?>
                    </div>
                </fieldset>
            <?php } ?>
            <div class="form-actions">
                <p>Puedes dejar preguntas en blanco; contarán como no acertadas.</p>
                <button class="button button-primary" type="submit">
                    Corregir el test <span class="button-arrow" aria-hidden="true">→</span>
                </button>
            </div>
        </form>
    </main>
    <?php
}

function mostrarInicio()
{
    ?>
    <main class="quiz-content">
        <div class="section-heading">
            <p class="eyebrow"><span class="eyebrow-line"></span> FC 27 · EL RETO</p>
            <h1>¿Listo para<br><span>jugar?</span></h1>
            <p class="section-copy">Elige una respuesta en cada pregunta. Al terminar, podrás ver cuántas has acertado y repasar las soluciones.</p>
        </div>
        <form action="pagina.php" method="post">
            <input type="hidden" name="accion" value="iniciar">
            <button class="button button-primary" type="submit">
                Empezar el test <span class="button-arrow" aria-hidden="true">→</span>
            </button>
        </form>
    </main>
    <?php
}

function mostrarResultados($preguntas, $respuestasUsuario, $aciertos)
{
    $total = count($preguntas);
    $porcentaje = round(($aciertos / $total) * 100);
    $sinContestar = 0;
    foreach ($respuestasUsuario as $respuestaUsuario) {
        if ($respuestaUsuario === -1) {
            $sinContestar++;
        }
    }

    ?>
    <main class="quiz-content">
        <section class="result-hero">
            <p class="eyebrow"><span class="eyebrow-line"></span> RESULTADO FINAL</p>
            <h1><?php echo $aciertos; ?><span class="score-total"> / <?php echo $total; ?></span></h1>
            <p class="result-message">
                <?php
                if ($porcentaje === 100) {
                    echo '¡Partido perfecto! No se te escapa una.';
                } elseif ($porcentaje >= 70) {
                    echo '¡Gran partido! Tienes buen ojo para el fútbol.';
                } elseif ($porcentaje >= 40) {
                    echo 'Buen comienzo. Repasa las jugadas y vuelve a intentarlo.';
                } else {
                    echo 'Toda leyenda empieza entrenando. ¡Inténtalo otra vez!';
                }
                ?>
            </p>
            <div class="score-track" role="img" aria-label="Puntuación: <?php echo $aciertos; ?> de <?php echo $total; ?>">
                <span style="width: <?php echo $porcentaje; ?>%"></span>
            </div>
            <p class="score-caption"><?php echo $porcentaje; ?>% de aciertos · <?php echo $sinContestar; ?> sin contestar</p>
            <a class="button button-primary" href="../index.html">
                Volver a jugar <span class="button-arrow" aria-hidden="true">↻</span>
            </a>
        </section>

        <section class="review-section">
            <div class="review-heading">
                <p class="eyebrow"><span class="eyebrow-line"></span> REPASO DEL PARTIDO</p>
                <h2>Las respuestas</h2>
            </div>
            <?php foreach ($preguntas as $indice => $pregunta) {
                $seleccionUsuario = $respuestasUsuario[$indice];
                $esCorrecta = ($seleccionUsuario === $pregunta['correcta']);
                ?>
                <article class="review-card">
                    <div class="review-question">
                        <span class="question-number"><?php echo sprintf('%02d', $indice + 1); ?></span>
                        <h3><?php echo escapar($pregunta['pregunta']); ?></h3>
                        <span class="review-status <?php echo $esCorrecta ? 'status-correct' : 'status-wrong'; ?>">
                            <?php
                            if ($esCorrecta) {
                                echo 'Correcta';
                            } elseif ($seleccionUsuario === -1) {
                                echo 'En blanco';
                            } else {
                                echo 'Incorrecta';
                            }
                            ?>
                        </span>
                    </div>
                    <div class="review-answers">
                        <?php foreach ($pregunta['respuestas'] as $respuestaIndice => $respuesta) {
                            $claseRespuesta = '';
                            if ($respuestaIndice === $pregunta['correcta']) {
                                $claseRespuesta = ' answer-correct';
                            } elseif ($respuestaIndice === $seleccionUsuario) {
                                $claseRespuesta = ' answer-wrong';
                            }
                            ?>
                            <p class="review-answer<?php echo $claseRespuesta; ?>">
                                <span><?php echo $respuestaIndice + 1; ?></span>
                                <?php echo escapar($respuesta); ?>
                                <?php if ($respuestaIndice === $seleccionUsuario) { ?>
                                    <small>Tu respuesta</small>
                                <?php } ?>
                                <?php if ($respuestaIndice === $pregunta['correcta']) { ?>
                                    <small>Respuesta correcta</small>
                                <?php } ?>
                            </p>
                        <?php } ?>
                    </div>
                    <p class="explanation"><?php echo escapar($pregunta['explicacion']); ?></p>
                </article>
            <?php } ?>
        </section>
    </main>
    <?php
}

$haIniciado = (isset($_POST['accion']) && $_POST['accion'] === 'iniciar');
$haRespondido = (isset($_POST['respuestas']) && is_array($_POST['respuestas']));
$respuestasUsuario = array();
$aciertos = 0;

if ($haRespondido) {
    foreach ($preguntas as $indice => $pregunta) {
        $seleccion = -1;
        if (isset($_POST['respuestas']) && is_array($_POST['respuestas']) && isset($_POST['respuestas'][$indice]) && is_scalar($_POST['respuestas'][$indice])) {
            $valor = filter_var($_POST['respuestas'][$indice], FILTER_VALIDATE_INT);
            if ($valor !== false && isset($pregunta['respuestas'][$valor])) {
                $seleccion = $valor;
            }
        }
        $respuestasUsuario[$indice] = $seleccion;
        if ($seleccion === $pregunta['correcta']) {
            $aciertos++;
        }
    }
}

mostrarCabecera($haRespondido ? 'Tu resultado' : 'El test');
if ($haRespondido) {
    mostrarResultados($preguntas, $respuestasUsuario, $aciertos);
} elseif ($haIniciado) {
    mostrarFormulario($preguntas);
} else {
    mostrarInicio();
}
mostrarPie($haRespondido);
?>
