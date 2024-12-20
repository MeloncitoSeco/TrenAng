

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fotoTren
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fotoTren
-- -----------------------------------------------------
DROP  SCHEMA IF EXISTS `fotoTren`;
CREATE SCHEMA IF NOT EXISTS `fotoTren` DEFAULT CHARACTER SET utf8mb3 ;
USE `fotoTren` ;

-- -----------------------------------------------------
-- Table `fototren`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fototren`.`usuario` (
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fototren`.`foro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fototren`.`foro` (
  `idComentario` INT(11) NOT NULL AUTO_INCREMENT,
  `Texto` VARCHAR(500) NOT NULL,
  `Creador` VARCHAR(45) NOT NULL,
  `PId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idComentario`),
  INDEX `creador_idx` (`Creador` ASC) ,
  INDEX `orden_idx` (`PId` ASC) ,
  CONSTRAINT `creador`
    FOREIGN KEY (`Creador`)
    REFERENCES `fototren`.`usuario` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `orden`
    FOREIGN KEY (`PId`)
    REFERENCES `fototren`.`foro` (`idComentario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fototren`.`tipotren`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fototren`.`tipotren` (
  `tipoTren` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tipoTren`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = armscii8;


-- -----------------------------------------------------
-- Table `fototren`.`tren`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fototren`.`tren` (
  `trenId` INT(11) NOT NULL,
  `modelo` VARCHAR(24) NOT NULL,
  `tipoTren` INT(11) NOT NULL,
  `fechaFabricacion` INT(11) NOT NULL,
  PRIMARY KEY (`trenId`),
  INDEX `tren-tipo_idx` (`tipoTren` ASC) ,
  CONSTRAINT `tren-tipo`
    FOREIGN KEY (`tipoTren`)
    REFERENCES `fototren`.`tipotren` (`tipoTren`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fototren`.`publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fototren`.`publicacion` (
  `pubId` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `trenId` INT(11) NOT NULL,
  `titulo` VARCHAR(120) NOT NULL,
  `posicion` VARCHAR(45) NOT NULL,
  `comAuto` VARCHAR(45) NOT NULL,
  `fechaCrea` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `texto` VARCHAR(2000) NULL DEFAULT NULL,
  PRIMARY KEY (`pubId`),
  INDEX `pub-usu_idx` (`email` ASC) ,
  INDEX `pub-tren_idx` (`trenId` ASC) ,
  CONSTRAINT `pub-tren`
    FOREIGN KEY (`trenId`)
    REFERENCES `fototren`.`tren` (`trenId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `pub-usu`
    FOREIGN KEY (`email`)
    REFERENCES `fototren`.`usuario` (`email`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fototren`.`imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fototren`.`imagen` (
  `imgId` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `pubId` INT(11) NOT NULL,
  PRIMARY KEY (`imgId`),
  INDEX `img-pub_idx` (`pubId` ASC) ,
  CONSTRAINT `img-pub`
    FOREIGN KEY (`pubId`)
    REFERENCES `fototren`.`publicacion` (`pubId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- Data for table `fotoTren`.`tipoTren`
-- -----------------------------------------------------
START TRANSACTION;
USE `fotoTren`;
INSERT INTO `fotoTren`.`tipoTren` (`tipoTren`, `name`) 
VALUES 
    (1, 'Ave'),
    (2, 'Alvia'),
    (3, 'Avant'),
    (4, 'IRYO'),
    (5, 'OUIGO'),
    (6, 'LD'),
    (7, 'MD'),
    (8, 'Cercanias/Rodalies'),
    (9, 'AM');


COMMIT;


-- -----------------------------------------------------
-- Data for table `fotoTren`.`Tren`
-- -----------------------------------------------------
START TRANSACTION;
USE `fotoTren`;
INSERT INTO `fotoTren`.`Tren` (`trenId`, `modelo`, `tipoTren`, `fechaFabricacion`) 
VALUES 
    (1, 'Civia', 8, 2003),
    (2, 'IRYO', 4, 2020),
    (3, 'Alvia S-120', 2, 2015),
    (4, 'Ave S-103', 1, 2010),
    (5, 'Avant S-104', 3, 2018);


COMMIT;


-- -----------------------------------------------------
-- Data for table `fotoTren`.`Usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `fotoTren`;
INSERT INTO `fotoTren`.`usuario` (`name`, `email`, `password`) 
VALUES 
    ('Santiago', 'santiago@gmail.com', 'password123'),
    ('Miriam', 'miriam@gmail.com', 'mypass2024'),
    ('Carlos', 'carlos@example.com', 'trainlover'),
    ('Elena', 'elena@example.com', 'password456');

COMMIT;


-- -----------------------------------------------------
-- Data for table `fotoTren`.`Publicacion`
-- -----------------------------------------------------
START TRANSACTION;
USE `fotoTren`;
INSERT INTO `fotoTren`.`Publicacion` (`email`, `trenId`, `titulo`, `posicion`, `comAuto`, `texto`) 
VALUES 
    ('santiago@gmail.com', 1, 'Civia en Andalucía', 'Quieto', 'Andalucía', 'Hermosa mañana para una foto de este tren.'),
    ('miriam@gmail.com', 2, 'IRYO desde Navarra', 'Moviendo', 'Navarra', 'Un gran tren para un viaje inolvidable.'),
    ('carlos@example.com', 3, 'Alvia en Cataluña', 'Moviendo', 'Cataluña', 'Impresionante velocidad capturada.'),
    ('elena@example.com', 4, 'Ave por Madrid', 'Quieto', 'Madrid', 'Una vista increíble del Ave en el andén.');


COMMIT;


-- -----------------------------------------------------
-- Data for table `fotoTren`.`Imagen`
-- -----------------------------------------------------
START TRANSACTION;
USE `fotoTren`;
INSERT INTO `fotoTren`.`Imagen` (`fecha`, `pubId`) 
VALUES 
    ('2024-10-16 10:30:00', 1),
    ('2024-10-16 11:00:00', 1),
    ('2024-10-16 12:15:00', 2),
    ('2024-10-16 13:20:00', 2),
    ('2024-10-16 14:25:00', 3),
    ('2024-10-16 15:30:00', 3),
    ('2024-10-16 16:45:00', 4),
    ('2024-10-16 17:50:00', 4),
    ('2024-10-16 18:55:00', 1),
    ('2024-10-16 19:10:00', 2);



COMMIT;
start transaction;
INSERT INTO `fototren`.`foro` (`Texto`, `Creador`, `PId`) 
VALUES 
    ('Este es el primer comentario del foro.', 'ana@example.com', null),
    ('Discutamos sobre trenes históricos.', 'luis@example.com', null),
    ('Bienvenidos al foro de fotografía de trenes.', 'maria@example.com', null);

INSERT INTO `fototren`.`foro` (`Texto`, `Creador`, `PId`) 
VALUES 
    ('¡Me encanta este tema!', 'luis@example.com', 1), -- Respuesta al primer comentario
    ('¿Qué opinan del tren AVE?', 'maria@example.com', 1), -- Respuesta al primer comentario
    ('Tengo fotos del tren AVE en acción.', 'ana@example.com', 2), -- Respuesta al segundo comentario
    ('¡Excelente idea para compartir fotos!', 'maria@example.com', 2), -- Respuesta al segundo comentario
    ('Gracias, espero que les guste.', 'ana@example.com', 4); -- Respuesta al cuarto comentario
commit;