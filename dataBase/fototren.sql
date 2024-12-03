-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2024 a las 12:17:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fototren`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foro`
--

CREATE TABLE `foro` (
  `idComentario` int(11) NOT NULL,
  `Texto` varchar(500) NOT NULL,
  `Creador` varchar(45) NOT NULL,
  `PId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--

CREATE TABLE `imagen` (
  `imgId` varchar(255) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `pubId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `imagen`
--

INSERT INTO `imagen` (`imgId`, `fecha`, `pubId`) VALUES
('1733224568330-alviacadiz.jpg', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `pubId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `trenId` int(11) NOT NULL,
  `titulo` varchar(120) NOT NULL,
  `comAuto` varchar(45) NOT NULL,
  `fechaCrea` timestamp NOT NULL DEFAULT current_timestamp(),
  `texto` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`pubId`, `email`, `trenId`, `titulo`, `comAuto`, `fechaCrea`, `texto`) VALUES
(1, 'pepe@gmail.com', 1, 'Alvia cadiz', 'Cadiz', '2024-12-03 11:16:08', 'Una foto de el tren alvia madrid cadiz estacionado en Cadiz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipotren`
--

CREATE TABLE `tipotren` (
  `tipoTren` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_general_ci;

--
-- Volcado de datos para la tabla `tipotren`
--

INSERT INTO `tipotren` (`tipoTren`, `name`) VALUES
(1, 'Ave'),
(2, 'Alvia'),
(3, 'Avant'),
(4, 'IRYO'),
(5, 'OUIGO'),
(6, 'LD'),
(7, 'MD'),
(8, 'Cercanias/Rodalies'),
(9, 'AM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tren`
--

CREATE TABLE `tren` (
  `trenId` int(11) NOT NULL,
  `modelo` varchar(24) NOT NULL,
  `tipoTren` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tren`
--

INSERT INTO `tren` (`trenId`, `modelo`, `tipoTren`) VALUES
(1, '730', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `name` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`name`, `email`, `password`) VALUES
('pepe', 'pepe@gmail.com', '$2b$10$VtGJkvvhK5eKTx2aSeMk6ux9gJXqBv7xkOTvbZ.HRuUUoUlNQ2SH2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `foro`
--
ALTER TABLE `foro`
  ADD PRIMARY KEY (`idComentario`),
  ADD KEY `creador_idx` (`Creador`),
  ADD KEY `orden_idx` (`PId`);

--
-- Indices de la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`imgId`),
  ADD KEY `img-pub_idx` (`pubId`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`pubId`),
  ADD KEY `pub-usu_idx` (`email`),
  ADD KEY `pub-tren_idx` (`trenId`);

--
-- Indices de la tabla `tipotren`
--
ALTER TABLE `tipotren`
  ADD PRIMARY KEY (`tipoTren`);

--
-- Indices de la tabla `tren`
--
ALTER TABLE `tren`
  ADD PRIMARY KEY (`trenId`),
  ADD KEY `tren-tipo_idx` (`tipoTren`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `foro`
--
ALTER TABLE `foro`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `pubId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `foro`
--
ALTER TABLE `foro`
  ADD CONSTRAINT `Creador` FOREIGN KEY (`Creador`) REFERENCES `usuario` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Orden` FOREIGN KEY (`PId`) REFERENCES `foro` (`idComentario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD CONSTRAINT `img-pub` FOREIGN KEY (`pubId`) REFERENCES `publicacion` (`pubId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `pub-tren` FOREIGN KEY (`trenId`) REFERENCES `tren` (`trenId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `pub-usu` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `tren`
--
ALTER TABLE `tren`
  ADD CONSTRAINT `tren-tipo` FOREIGN KEY (`tipoTren`) REFERENCES `tipotren` (`tipoTren`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
