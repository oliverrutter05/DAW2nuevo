CREATE DATABASE IF NOT EXISTS centro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE centro;

CREATE TABLE alumnos (
    dni CHAR(9) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad TINYINT NOT NULL
);

CREATE TABLE asignaturas (
    codigo INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    creditos SMALLINT NOT NULL,
    trimestre TINYINT NOT NULL
);

CREATE TABLE matriculas (
    dni CHAR(9),
    codigo INT,
    anio SMALLINT,
    nota DECIMAL(4,2),
    PRIMARY KEY (dni, codigo, anio),
    FOREIGN KEY (dni) REFERENCES alumnos(dni) ON DELETE CASCADE,
    FOREIGN KEY (codigo) REFERENCES asignaturas(codigo) ON DELETE CASCADE
);

CREATE USER IF NOT EXISTS 'prexam'@'localhost' IDENTIFIED BY 'CLAVE';
GRANT ALL PRIVILEGES ON centro.* TO 'dwes_app'@'localhost';
FLUSH PRIVILEGES;

