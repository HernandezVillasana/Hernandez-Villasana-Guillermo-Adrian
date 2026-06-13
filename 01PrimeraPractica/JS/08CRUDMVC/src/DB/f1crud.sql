CREATE DATABASE IF NOT EXISTS f1crud;
USE f1crud;


CREATE TABLE pilotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    equipo VARCHAR(100),
    pais VARCHAR(100),
    numero INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE campeones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anio INT NOT NULL,
    piloto VARCHAR(100) NOT NULL,
    escuderia VARCHAR(100),
    puntos INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE escuderias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(100),
    motor VARCHAR(100),
    titulos INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO pilotos(nombre, equipo, pais, numero)
VALUES
('Max Verstappen', 'Red Bull', 'Países Bajos', 1),
('Lewis Hamilton', 'Ferrari', 'Reino Unido', 44),
('Charles Leclerc', 'Ferrari', 'Mónaco', 16),
('Carlos Sainz', 'Ferrari', 'España', 55),
('Sergio Pérez', 'Red Bull', 'México', 11),
('George Russell', 'Mercedes', 'Reino Unido', 63),
('Fernando Alonso', 'Aston Martin', 'España', 14),
('Lando Norris', 'McLaren', 'Reino Unido', 4),
('Oscar Piastri', 'McLaren', 'Australia', 81),
('Pierre Gasly', 'Alpine', 'Francia', 10),
('Esteban Ocon', 'Alpine', 'Francia', 31),
('Valtteri Bottas', 'Kick Sauber', 'Finlandia', 77),
('Yuki Tsunoda', 'RB', 'Japón', 22);


INSERT INTO campeones(anio, piloto, escuderia, puntos)
VALUES
(2024, 'Max Verstappen', 'Red Bull', 437),
(2023, 'Max Verstappen', 'Red Bull', 575),
(2022, 'Max Verstappen', 'Red Bull', 454),
(2021, 'Max Verstappen', 'Red Bull', 395),
(2020, 'Lewis Hamilton', 'Mercedes', 347),
(2019, 'Lewis Hamilton', 'Mercedes', 413),
(2018, 'Lewis Hamilton', 'Mercedes', 408),
(2017, 'Lewis Hamilton', 'Mercedes', 363),
(2016, 'Nico Rosberg', 'Mercedes', 385),
(2015, 'Lewis Hamilton', 'Mercedes', 381),
(2014, 'Lewis Hamilton', 'Mercedes', 384),
(2013, 'Sebastian Vettel', 'Red Bull', 397);


INSERT INTO escuderias(nombre, pais, motor, titulos)
VALUES
('Ferrari', 'Italia', 'Ferrari', 16),
('Red Bull', 'Austria', 'Honda', 6),
('Mercedes', 'Alemania', 'Mercedes', 8),
('McLaren', 'Reino Unido', 'Mercedes', 8),
('Aston Martin', 'Reino Unido', 'Mercedes', 0),
('Alpine', 'Francia', 'Renault', 2),
('Williams', 'Reino Unido', 'Mercedes', 9),
('Kick Sauber', 'Suiza', 'Ferrari', 0),
('RB', 'Italia', 'Honda', 0),
('Haas', 'Estados Unidos', 'Ferrari', 0);


SHOW TABLES;