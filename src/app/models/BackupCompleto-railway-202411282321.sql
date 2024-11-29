-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: junction.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE IF NOT EXISTS railway;
USE railway;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `rol_id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`rol_id`),
  UNIQUE KEY `uq_rol_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Cliente');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicaciones`
--

DROP TABLE IF EXISTS `ubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicaciones` (
  `ubicacion_id` int unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`ubicacion_id`),
  UNIQUE KEY `uq_ubicacion_descripcion` (`descripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicaciones`
--

LOCK TABLES `ubicaciones` WRITE;
/*!40000 ALTER TABLE `ubicaciones` DISABLE KEYS */;
INSERT INTO `ubicaciones` VALUES (5,'Edificio Anexo - Sala de Juegos'),(4,'Edificio Principal - Sala VIP'),(1,'Piso 1 - Sala A'),(2,'Piso 1 - Sala B'),(3,'Piso 2 - Sala de Conferencias'),(8,'Piso 3 - Sala de Estudio'),(9,'Piso 4 - Sala de Co-working'),(10,'Planta Baja - Sala de Cine'),(6,'Subsuelo - Sala de Karaoke'),(7,'Terraza - Zona de Reuniones');
/*!40000 ALTER TABLE `ubicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Wilber Ernesto Elías Avalos','wilberelias.ufg.edu@gmail.com','$2b$10$z77ETNqDwD1UUn8jrrRLHOH8W9xt2/AO581UOpvCo2qwkFzrcY5RC',1),(2,'Derek Morales','eduardomancia48@gmail.com','$2b$10$siH3GaR7wqjL841ZHipHSe9oMG27qk2peeeCpa.rAKpCsHpvmJv8i',2),(5,'Eduardo','eduardomancia481@gmail.com','$2b$10$2ZH2s7vG3hq3kXdeZ5Txx.D58KfLNjeB5Jl57wVuUuNC7WrRphBQ2',1),(6,'Jennifer Elizabeth Gomez Bonilla ','jennifergomez663@gmail.com','$2b$10$VKd8orrrNaz0kwEGCutbFe2dJPxmjVtPY1kZoGLXoG699rU3o7xxO',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salas`
--

DROP TABLE IF EXISTS `salas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salas`
--

LOCK TABLES `salas` WRITE;
/*!40000 ALTER TABLE `salas` DISABLE KEYS */;
INSERT INTO `salas` VALUES (2,'Karaoke',7,6,7.00,1,'Sala De Canto','Destinada a Karaoke con amigos o familiares','https://res.cloudinary.com/dpczqaodr/image/upload/v1731438466/sistema_de_reservas/kcjeato6c1wqwulkpyky.png'),(3,'GameRoom',5,5,10.00,1,'Jugar Videojuegos','Sala con capacidad de conexión con tus consolas favoritas','https://res.cloudinary.com/dpczqaodr/image/upload/v1731435431/sistema_de_reservas/irjlqwwydtfbr9fjkvgy.png'),(4,'Sala Multifuncional A',9,1,9.00,1,'Multifuncional','Sala multifuncional para que el usuario pueda usarla con sus propios recursos','https://res.cloudinary.com/dpczqaodr/image/upload/v1731435480/sistema_de_reservas/ya80rhgl6gdxfhvbtyl7.png'),(5,'Sala VIP',5,4,10.00,1,'Actividades Exclusivas','Sala con actividades exclusivas para miembros VIP','https://res.cloudinary.com/dpczqaodr/image/upload/v1731435906/sistema_de_reservas/kwhnkhcbim7n6tcnfmjy.png'),(6,'Sala Multifuncional B',10,2,20.00,1,'Multifuncional','Sala con propósitos multifuncionales','https://res.cloudinary.com/dpczqaodr/image/upload/v1731435942/sistema_de_reservas/f9foasx52wiumxpspkvx.png'),(7,'Sala de Conferencia',10,3,10.00,1,'Conferencias Empresariales','Sala con atenuación de ruido, para evitar entrada o salida de sonido.','https://res.cloudinary.com/dpczqaodr/image/upload/v1731435978/sistema_de_reservas/xkvnxaioir5k5nj4shca.png');
/*!40000 ALTER TABLE `salas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados_reserva`
--

DROP TABLE IF EXISTS `estados_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados_reserva` (
  `estado_reserva_id` int unsigned NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`estado_reserva_id`),
  UNIQUE KEY `uq_estado_nombre` (`estado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados_reserva`
--

LOCK TABLES `estados_reserva` WRITE;
/*!40000 ALTER TABLE `estados_reserva` DISABLE KEYS */;
INSERT INTO `estados_reserva` VALUES (2,'Terminada'),(1,'Vigente');
/*!40000 ALTER TABLE `estados_reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactos`
--
DROP TABLE IF EXISTS `contactos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactos` (
  `contacto_id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int unsigned NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`contacto_id`),
  KEY `fk_usuario_contacto` (`usuario_id`),
  CONSTRAINT `fk_usuario_contacto` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactos`
--

LOCK TABLES `contactos` WRITE;
/*!40000 ALTER TABLE `contactos` DISABLE KEYS */;
INSERT INTO `contactos` VALUES (1,1,'73446143','Urb Nuevos Horizontes');
/*!40000 ALTER TABLE `contactos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `reserva_id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int unsigned NOT NULL,
  `sala_id` int unsigned NOT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado_reserva_id` int unsigned NOT NULL,
  PRIMARY KEY (`reserva_id`),
  KEY `idx_fecha_sala_usuario` (`fecha_reserva`,`sala_id`,`usuario_id`),
  KEY `fk_usuario_reserva` (`usuario_id`),
  KEY `fk_sala_reserva` (`sala_id`),
  KEY `fk_estado_reserva` (`estado_reserva_id`),
  CONSTRAINT `fk_estado_reserva` FOREIGN KEY (`estado_reserva_id`) REFERENCES `estados_reserva` (`estado_reserva_id`),
  CONSTRAINT `fk_sala_reserva` FOREIGN KEY (`sala_id`) REFERENCES `salas` (`sala_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_usuario_reserva` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (47,1,2,'2024-11-28','15:00:00','16:00:00',2),(48,1,2,'2024-11-29','20:00:00','22:00:00',1),(49,1,7,'2024-11-30','10:00:00','14:00:00',2),(50,1,4,'2024-11-29','15:00:00','16:00:00',2);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiales_reserva`
--

DROP TABLE IF EXISTS `historiales_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiales_reserva` (
  `historial_id` int unsigned NOT NULL AUTO_INCREMENT,
  `reserva_id` int unsigned NOT NULL,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`historial_id`),
  KEY `fk_reserva_historial` (`reserva_id`),
  CONSTRAINT `fk_reserva_historial` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`reserva_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiales_reserva`
--

LOCK TABLES `historiales_reserva` WRITE;
/*!40000 ALTER TABLE `historiales_reserva` DISABLE KEYS */;
INSERT INTO `historiales_reserva` VALUES (33,47,'2024-11-28 20:09:02'),(34,48,'2024-11-28 22:35:30'),(35,49,'2024-11-28 22:37:01'),(36,50,'2024-11-28 22:47:30');
/*!40000 ALTER TABLE `historiales_reserva` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Temporary view structure for view `vista_roles`
--

DROP TABLE IF EXISTS `vista_roles`;
/*!50001 DROP VIEW IF EXISTS `vista_roles`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_roles` AS SELECT 
 1 AS `rol_id`,
 1 AS `nombre`*/;
SET character_set_client = @saved_cs_client;
--
-- Temporary view structure for view `vista_ubicaciones`
--

DROP TABLE IF EXISTS `vista_ubicaciones`;
/*!50001 DROP VIEW IF EXISTS `vista_ubicaciones`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_ubicaciones` AS SELECT 
 1 AS `ubicacion_id`,
 1 AS `descripcion`*/;
SET character_set_client = @saved_cs_client;
--
-- Temporary view structure for view `vista_estados_reserva`
--

DROP TABLE IF EXISTS `vista_estados_reserva`;
/*!50001 DROP VIEW IF EXISTS `vista_estados_reserva`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_estados_reserva` AS SELECT 
 1 AS `estado_reserva_id`,
 1 AS `estado`*/;
SET character_set_client = @saved_cs_client;
--
-- Temporary view structure for view `vista_usuarios`
--

DROP TABLE IF EXISTS `vista_usuarios`;
/*!50001 DROP VIEW IF EXISTS `vista_usuarios`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_usuarios` AS SELECT 
 1 AS `usuario_id`,
 1 AS `nombre`,
 1 AS `email`,
 1 AS `password_hash`,
 1 AS `rol_id`*/;
SET character_set_client = @saved_cs_client;
--
-- Temporary view structure for view `vista_salas`
--

DROP TABLE IF EXISTS `vista_salas`;
/*!50001 DROP VIEW IF EXISTS `vista_salas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_salas` AS SELECT 
 1 AS `sala_id`,
 1 AS `nombre`,
 1 AS `capacidad`,
 1 AS `ubicacion_id`,
 1 AS `precio`,
 1 AS `disponible`,
 1 AS `actividad`,
 1 AS `descripcion`,
 1 AS `img`*/;
SET character_set_client = @saved_cs_client;
--
-- Temporary view structure for view `vista_contactos`
--

DROP TABLE IF EXISTS `vista_contactos`;
/*!50001 DROP VIEW IF EXISTS `vista_contactos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_contactos` AS SELECT 
 1 AS `contacto_id`,
 1 AS `usuario_id`,
 1 AS `telefono`,
 1 AS `direccion`*/;
SET character_set_client = @saved_cs_client;
--
-- Temporary view structure for view `vista_reservas`
--

DROP TABLE IF EXISTS `vista_reservas`;
/*!50001 DROP VIEW IF EXISTS `vista_reservas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_reservas` AS SELECT 
 1 AS `reserva_id`,
 1 AS `usuario_id`,
 1 AS `sala_id`,
 1 AS `fecha_reserva`,
 1 AS `hora_inicio`,
 1 AS `hora_fin`,
 1 AS `estado_reserva_id`*/;
SET character_set_client = @saved_cs_client;
--
-- Temporary view structure for view `vista_reservas_detalles`
--

DROP TABLE IF EXISTS `vista_reservas_detalles`;
/*!50001 DROP VIEW IF EXISTS `vista_reservas_detalles`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_reservas_detalles` AS SELECT 
 1 AS `reserva_id`,
 1 AS `fecha_reserva`,
 1 AS `hora_inicio`,
 1 AS `hora_fin`,
 1 AS `usuario_nombre`,
 1 AS `usuario_email`,
 1 AS `sala_nombre`,
 1 AS `estado_reserva`*/;
SET character_set_client = @saved_cs_client;
--
-- Temporary view structure for view `vista_perfil_usuario`
--

DROP TABLE IF EXISTS `vista_perfil_usuario`;
/*!50001 DROP VIEW IF EXISTS `vista_perfil_usuario`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_perfil_usuario` AS SELECT 
 1 AS `usuario_id`,
 1 AS `nombre`,
 1 AS `email`,
 1 AS `rol_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'railway'
--

--
-- Dumping routines for database 'railway'
--
--
-- Final view structure for view `vista_roles`
--

/*!50001 DROP VIEW IF EXISTS `vista_roles`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_roles` AS select `roles`.`rol_id` AS `rol_id`,`roles`.`nombre` AS `nombre` from `roles` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
--
-- Final view structure for view `vista_ubicaciones`
--

/*!50001 DROP VIEW IF EXISTS `vista_ubicaciones`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_ubicaciones` AS select `ubicaciones`.`ubicacion_id` AS `ubicacion_id`,`ubicaciones`.`descripcion` AS `descripcion` from `ubicaciones` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
--
-- Final view structure for view `vista_estados_reserva`
--

/*!50001 DROP VIEW IF EXISTS `vista_estados_reserva`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_estados_reserva` AS select `estados_reserva`.`estado_reserva_id` AS `estado_reserva_id`,`estados_reserva`.`estado` AS `estado` from `estados_reserva` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
--
-- Final view structure for view `vista_usuarios`
--

/*!50001 DROP VIEW IF EXISTS `vista_usuarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_usuarios` AS select `usuarios`.`usuario_id` AS `usuario_id`,`usuarios`.`nombre` AS `nombre`,`usuarios`.`email` AS `email`,`usuarios`.`password_hash` AS `password_hash`,`usuarios`.`rol_id` AS `rol_id` from `usuarios` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
--
-- Final view structure for view `vista_salas`
--

/*!50001 DROP VIEW IF EXISTS `vista_salas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_salas` AS select `salas`.`sala_id` AS `sala_id`,`salas`.`nombre` AS `nombre`,`salas`.`capacidad` AS `capacidad`,`salas`.`ubicacion_id` AS `ubicacion_id`,`salas`.`precio` AS `precio`,`salas`.`disponible` AS `disponible`,`salas`.`actividad` AS `actividad`,`salas`.`descripcion` AS `descripcion`,`salas`.`img` AS `img` from `salas` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
--
-- Final view structure for view `vista_contactos`
--

/*!50001 DROP VIEW IF EXISTS `vista_contactos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_contactos` AS select `contactos`.`contacto_id` AS `contacto_id`,`contactos`.`usuario_id` AS `usuario_id`,`contactos`.`telefono` AS `telefono`,`contactos`.`direccion` AS `direccion` from `contactos` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
--
-- Final view structure for view `vista_reservas`
--

/*!50001 DROP VIEW IF EXISTS `vista_reservas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_reservas` AS select `reservas`.`reserva_id` AS `reserva_id`,`reservas`.`usuario_id` AS `usuario_id`,`reservas`.`sala_id` AS `sala_id`,`reservas`.`fecha_reserva` AS `fecha_reserva`,`reservas`.`hora_inicio` AS `hora_inicio`,`reservas`.`hora_fin` AS `hora_fin`,`reservas`.`estado_reserva_id` AS `estado_reserva_id` from `reservas` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
--
-- Final view structure for view `vista_reservas_detalles`
--

/*!50001 DROP VIEW IF EXISTS `vista_reservas_detalles`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_reservas_detalles` AS select `r`.`reserva_id` AS `reserva_id`,`r`.`fecha_reserva` AS `fecha_reserva`,`r`.`hora_inicio` AS `hora_inicio`,`r`.`hora_fin` AS `hora_fin`,`u`.`nombre` AS `usuario_nombre`,`u`.`email` AS `usuario_email`,`s`.`nombre` AS `sala_nombre`,`e`.`estado` AS `estado_reserva` from (((`reservas` `r` join `usuarios` `u` on((`r`.`usuario_id` = `u`.`usuario_id`))) join `salas` `s` on((`r`.`sala_id` = `s`.`sala_id`))) join `estados_reserva` `e` on((`r`.`estado_reserva_id` = `e`.`estado_reserva_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
--
-- Final view structure for view `vista_perfil_usuario`
--

/*!50001 DROP VIEW IF EXISTS `vista_perfil_usuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `vista_perfil_usuario` AS select `usuarios`.`usuario_id` AS `usuario_id`,`usuarios`.`nombre` AS `nombre`,`usuarios`.`email` AS `email`,`usuarios`.`rol_id` AS `rol_id` from `usuarios` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-28 23:22:07
