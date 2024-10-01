

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema servidor
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema servidor
-- -----------------------------------------------------
DROP  SCHEMA IF EXISTS `servidor`;
CREATE SCHEMA IF NOT EXISTS `servidor` DEFAULT CHARACTER SET utf8mb3 ;
USE `servidor` ;

-- -----------------------------------------------------
-- Table `servidor`.`tipoTren`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `servidor`.`tipoTren` (
  `tipoTren` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tipoTren`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = armscii8;


-- -----------------------------------------------------
-- Table `servidor`.`Tren`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `servidor`.`Tren` (
  `trenId` INT NOT NULL,
  `modelo` VARCHAR(24) NOT NULL,
  `tipoTren` INT NOT NULL,
  `fechaFabricacion` INT NOT NULL,
  PRIMARY KEY (`trenId`),
  INDEX `tren-tipo_idx` (`tipoTren` ASC),
  CONSTRAINT `tren-tipo`
    FOREIGN KEY (`tipoTren`)
    REFERENCES `servidor`.`tipoTren` (`tipoTren`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `servidor`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `servidor`.`usuario` (
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `contra` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `servidor`.`Publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `servidor`.`Publicacion` (
  `pubId` INT NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `trenId` INT NOT NULL,
  `titulo` VARCHAR(120) NOT NULL,
  `posicion` VARCHAR(45) NOT NULL,
  `comAuto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`pubId`),
  INDEX `pub-usu_idx` (`email` ASC),
  INDEX `pub-tren_idx` (`trenId` ASC) ,
  CONSTRAINT `pub-tren`
    FOREIGN KEY (`trenId`)
    REFERENCES `servidor`.`Tren` (`trenId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `pub-usu`
    FOREIGN KEY (`email`)
    REFERENCES `servidor`.`Usuario` (`email`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `servidor`.`Imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `servidor`.`Imagen` (
  `imgId` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `pubId` INT NOT NULL,
  `sesion` VARCHAR(255) NULL DEFAULT NULL,
  `num` INT NULL DEFAULT NULL,
  PRIMARY KEY (`imgId`),
  INDEX `img-pub_idx` (`pubId` ASC),
  CONSTRAINT `img-pub`
    FOREIGN KEY (`pubId`)
    REFERENCES `servidor`.`Publicacion` (`pubId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `servidor`.`tipoTren`
-- -----------------------------------------------------
START TRANSACTION;
USE `servidor`;
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (1, 'Ave');
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (2, 'Alvia');
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (3, 'Avant');
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (4, 'IRYO');
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (5, 'OUIGO');
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (6, 'LD');
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (7, 'MD');
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (8, 'Cercanias/Rodalies');
INSERT INTO `servidor`.`tipoTren` (`tipoTren`, `nombre`) VALUES (9, 'AM');

COMMIT;


-- -----------------------------------------------------
-- Data for table `servidor`.`Tren`
-- -----------------------------------------------------
START TRANSACTION;
USE `servidor`;
INSERT INTO `servidor`.`Tren` (`trenId`, `modelo`, `tipoTren`, `fechaFabricacion`) VALUES (1, 'Civia', 8, 2003);
INSERT INTO `servidor`.`Tren` (`trenId`, `modelo`, `tipoTren`, `fechaFabricacion`) VALUES (2, 'IRYO', 4, 2020);

COMMIT;


-- -----------------------------------------------------
-- Data for table `servidor`.`Usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `servidor`;
INSERT INTO `servidor`.`usuario` (`nombre`, `email`, `contra`) VALUES ('Santi', 'santiago@gmail.com', '1234');

COMMIT;


-- -----------------------------------------------------
-- Data for table `servidor`.`Publicacion`
-- -----------------------------------------------------
START TRANSACTION;
USE `servidor`;
INSERT INTO `servidor`.`Publicacion` (`pubId`, `email`, `trenId`, `titulo`, `posicion`, `comAuto`) VALUES (1, 'santiago@gmail.com', 1, 'Primer Civia', 'Quieto', 'Andalucía');
INSERT INTO `servidor`.`Publicacion` (`pubId`, `email`, `trenId`, `titulo`, `posicion`, `comAuto`) VALUES (2, 'santiago@gmail.com', 2, 'Iryo', 'Quieto', 'Navarra');
COMMIT;


-- -----------------------------------------------------
-- Data for table `servidor`.`Imagen`
-- -----------------------------------------------------
START TRANSACTION;
USE `servidor`;
INSERT INTO `servidor`.`imagen` (`imgId`, `fecha`, `pubId`, `sesion`, `num`) VALUES (10, '2013-03-20 19:56:00', 1, 'rth65ufgh', 1);
INSERT INTO `servidor`.`imagen` (`imgId`, `fecha`, `pubId`, `sesion`, `num`) VALUES (11, '2022-04-20 19:56:00', 2, 'rth65ufgh', 1);
INSERT INTO `servidor`.`imagen` (`imgId`, `fecha`, `pubId`, `sesion`, `num`) VALUES (12, '2022-04-20 19:56:00', 2, 'rth65ufgh', 1);


COMMIT;