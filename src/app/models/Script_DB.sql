
CREATE DATABASE IF NOT EXISTS railway;
USE railway;

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `rol_id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`rol_id`),
  UNIQUE KEY `uq_rol_nombre` (`nombre`)
) ;

INSERT INTO `roles` (`rol_id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Cliente');

DROP TABLE IF EXISTS `ubicaciones`;

CREATE TABLE `ubicaciones` (
  `ubicacion_id` int unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`ubicacion_id`),
  UNIQUE KEY `uq_ubicacion_descripcion` (`descripcion`)
) ;

INSERT INTO `ubicaciones` (`ubicacion_id`, `descripcion`) VALUES
(1, 'Piso 1 - Sala A'),
(2, 'Piso 1 - Sala B'),
(3, 'Piso 2 - Sala de Conferencias'),
(4, 'Edificio Principal - Sala VIP'),
(5, 'Edificio Anexo - Sala de Juegos'),
(6, 'Subsuelo - Sala de Karaoke'),
(7, 'Terraza - Zona de Reuniones'),
(8, 'Piso 3 - Sala de Estudio'),
(9, 'Piso 4 - Sala de Co-working'),
(10, 'Planta Baja - Sala de Cine');

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `usuario_id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol_id` int unsigned NOT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `uq_usuario_email` (`email`),
  KEY `fk_rol_usuario` (`rol_id`),
  CONSTRAINT `fk_rol_usuario` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`) ON DELETE CASCADE
) ;

INSERT INTO `usuarios` (`usuario_id`, `nombre`, `email`, `password_hash`, `rol_id`) VALUES
(1, 'Wilber Ernesto Elías Avalos', 'wilberelias.ufg.edu@gmail.com', '$2b$10$z77ETNqDwD1UUn8jrrRLHOH8W9xt2/AO581UOpvCo2qwkFzrcY5RC', 1),
(2, 'Derek Morales', 'eduardomancia48@gmail.com', '$2b$10$siH3GaR7wqjL841ZHipHSe9oMG27qk2peeeCpa.rAKpCsHpvmJv8i', 2),
(5, 'Eduardo', 'eduardomancia481@gmail.com', '$2b$10$2ZH2s7vG3hq3kXdeZ5Txx.D58KfLNjeB5Jl57wVuUuNC7WrRphBQ2', 1),
(6, 'Jennifer Elizabeth Gomez Bonilla', 'jennifergomez663@gmail.com', '$2b$10$VKd8orrrNaz0kwEGCutbFe2dJPxmjVtPY1kZoGLXoG699rU3o7xxO', 1),
(10,'ADMINISTRADOR','administrador@gmail.com','$2b$10$CuyC7mp3GHeAzhGxk1Fdb.BPR.Fr8lbAa6UKOdpwUg7cVQP3UVcHu',1),
(11,'CLIENTE','cliente@gmail.com','$2b$10$2UM3fRY6Zfcjzbixlcwob.gEUdVgk/1v/bxMWgYb6dS5iUidIeLrG',2);

DROP TABLE IF EXISTS `salas`;

CREATE TABLE `salas` (
  `sala_id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `capacidad` smallint unsigned NOT NULL,
  `ubicacion_id` int unsigned NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  `actividad` varchar(100) NOT NULL DEFAULT 'Multifuncional',
  `descripcion` varchar(500) DEFAULT NULL,
  `img` text,
  PRIMARY KEY (`sala_id`),
  KEY `fk_ubicacion_sala` (`ubicacion_id`),
  CONSTRAINT `fk_ubicacion_sala` FOREIGN KEY (`ubicacion_id`) REFERENCES `ubicaciones` (`ubicacion_id`) ON DELETE CASCADE,
  CONSTRAINT `salas_chk_1` CHECK ((`capacidad` > 0))
) ;

INSERT INTO `salas` (`sala_id`, `nombre`, `capacidad`, `ubicacion_id`, `precio`, `disponible`, `actividad`, `descripcion`, `img`) VALUES
(2, 'Karaoke', 7, 6, 7.00, 1, 'Sala De Canto', 'Destinada a Karaoke con amigos o familiares', 'https://res.cloudinary.com/dpczqaodr/image/upload/v1731438466/sistema_de_reservas/kcjeato6c1wqwulkpyky.png'),
(3, 'GameRoom', 5, 5, 10.00, 1, 'Jugar Videojuegos', 'Sala con capacidad de conexión con tus consolas favoritas', 'https://res.cloudinary.com/dpczqaodr/image/upload/v1731435431/sistema_de_reservas/irjlqwwydtfbr9fjkvgy.png'),
(4, 'Sala Multifuncional A', 9, 1, 9.00, 1, 'Multifuncional', 'Sala multifuncional para que el usuario pueda usarla con sus propios recursos', 'https://res.cloudinary.com/dpczqaodr/image/upload/v1731435480/sistema_de_reservas/ya80rhgl6gdxfhvbtyl7.png'),
(5, 'Sala VIP', 5, 4, 10.00, 1, 'Actividades Exclusivas', 'Sala con actividades exclusivas para miembros VIP', 'https://res.cloudinary.com/dpczqaodr/image/upload/v1731435906/sistema_de_reservas/kwhnkhcbim7n6tcnfmjy.png'),
(6, 'Sala Multifuncional B', 10, 2, 20.00, 1, 'Multifuncional', 'Sala con propósitos multifuncionales', 'https://res.cloudinary.com/dpczqaodr/image/upload/v1731435942/sistema_de_reservas/f9foasx52wiumxpspkvx.png'),
(7, 'Sala de Conferencia', 10, 3, 10.00, 1, 'Conferencias Empresariales', 'Sala con atenuación de ruido, para evitar entrada o salida de sonido.', 'https://res.cloudinary.com/dpczqaodr/image/upload/v1731435978/sistema_de_reservas/xkvnxaioir5k5nj4shca.png');

DROP TABLE IF EXISTS `estados_reserva`;

CREATE TABLE `estados_reserva` (
  `estado_reserva_id` int unsigned NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`estado_reserva_id`),
  UNIQUE KEY `uq_estado_nombre` (`estado`)
) ;

INSERT INTO `estados_reserva` (`estado_reserva_id`, `estado`) VALUES
(1, 'Vigente'),
(2, 'Terminada');

DROP TABLE IF EXISTS `contactos`;

CREATE TABLE `contactos` (
  `contacto_id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int unsigned NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`contacto_id`),
  KEY `fk_usuario_contacto` (`usuario_id`),
  CONSTRAINT `fk_usuario_contacto` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ;

INSERT INTO `contactos` (`contacto_id`, `usuario_id`, `telefono`, `direccion`) VALUES
(1, 1, '73446143', 'Urb Nuevos Horizontes');

DROP TABLE IF EXISTS `reservas`;

CREATE TABLE `reservas` (
  `reserva_id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int unsigned NOT NULL,
  `sala_id` int unsigned NOT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado_reserva_id` int unsigned NOT NULL,
  PRIMARY KEY (`reserva_id`),
  KEY `idx_fecha_sala_usuario` (`fecha_reserva`, `sala_id`, `usuario_id`),
  KEY `fk_usuario_reserva` (`usuario_id`),
  KEY `fk_sala_reserva` (`sala_id`),
  KEY `fk_estado_reserva` (`estado_reserva_id`),
  CONSTRAINT `fk_usuario_reserva` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sala_reserva` FOREIGN KEY (`sala_id`) REFERENCES `salas` (`sala_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_estado_reserva` FOREIGN KEY (`estado_reserva_id`) REFERENCES `estados_reserva` (`estado_reserva_id`)
) ;

INSERT INTO `reservas` (`reserva_id`, `usuario_id`, `sala_id`, `fecha_reserva`, `hora_inicio`, `hora_fin`, `estado_reserva_id`) VALUES
(47, 1, 2, '2024-11-28', '15:00:00', '16:00:00', 2),
(48, 1, 2, '2024-11-29', '20:00:00', '22:00:00', 1),
(49, 1, 7, '2024-11-30', '10:00:00', '14:00:00', 2),
(50, 1, 4, '2024-11-29', '15:00:00', '16:00:00', 2);

DROP TABLE IF EXISTS `historiales_reserva`;

CREATE TABLE `historiales_reserva` (
  `historial_id` int unsigned NOT NULL AUTO_INCREMENT,
  `reserva_id` int unsigned NOT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`historial_id`),
  KEY `fk_reserva_historial` (`reserva_id`),
  CONSTRAINT `fk_reserva_historial` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`reserva_id`) ON DELETE CASCADE
) ;

INSERT INTO `historiales_reserva` (`historial_id`, `reserva_id`, `fecha_modificacion`) VALUES
(33, 47, '2024-11-28 20:09:02'),
(34, 48, '2024-11-28 22:35:30'),
(35, 49, '2024-11-28 22:37:01'),
(36, 50, '2024-11-28 22:47:30');

CREATE VIEW vista_roles AS
SELECT rol_id, nombre
FROM roles;

CREATE VIEW vista_ubicaciones AS
SELECT ubicacion_id, descripcion
FROM ubicaciones;

CREATE VIEW vista_estados_reserva AS
SELECT estado_reserva_id, estado
FROM estados_reserva;

CREATE VIEW vista_usuarios AS
SELECT usuario_id, nombre, email, password_hash, rol_id
FROM usuarios;

CREATE VIEW vista_salas AS
SELECT sala_id, nombre, capacidad, ubicacion_id, precio, disponible, actividad, descripcion, img
FROM salas;

CREATE VIEW vista_reservas_detalles AS
SELECT
    r.reserva_id,
    r.fecha_reserva,
    r.hora_inicio,
    r.hora_fin,
    u.nombre AS usuario_nombre,
    u.email AS usuario_email,
    s.nombre AS sala_nombre,
    e.estado AS estado_reserva
FROM
    reservas r
    JOIN usuarios u ON r.usuario_id = u.usuario_id
    JOIN salas s ON r.sala_id = s.sala_id
    JOIN estados_reserva e ON r.estado_reserva_id = e.estado_reserva_id;

CREATE VIEW vista_perfil_usuario AS
SELECT usuario_id, nombre, email, rol_id
FROM usuarios;