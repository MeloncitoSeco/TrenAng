

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
-- Table `fotoTren`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotoTren`.`Usuario` (
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fotoTren`.`foro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotoTren`.`Foro` (
  `idComentario` INT(11) NOT NULL AUTO_INCREMENT,
  `Texto` VARCHAR(500) NOT NULL,
  `Creador` VARCHAR(45) NOT NULL,
  `PId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idComentario`),
  INDEX `creador_idx` (`Creador` ASC) ,
  INDEX `orden_idx` (`PId` ASC) ,
  CONSTRAINT `Creador`
    FOREIGN KEY (`creador`)
    REFERENCES `fotoTren`.`Usuario` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Orden`
    FOREIGN KEY (`PId`)
    REFERENCES `fotoTren`.`Foro` (`idComentario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fotoTren`.`tipoTren`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotoTren`.`tipoTren` (
  `tipoTren` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tipoTren`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = armscii8;


-- -----------------------------------------------------
-- Table `fotoTren`.`tren`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotoTren`.`Tren` (
  `trenId` INT(11) NOT NULL,
  `modelo` VARCHAR(24) NOT NULL,
  `tipoTren` INT(11) NOT NULL,
  PRIMARY KEY (`trenId`),
  INDEX `tren-tipo_idx` (`tipoTren` ASC) ,
  CONSTRAINT `tren-tipo`
    FOREIGN KEY (`tipoTren`)
    REFERENCES `fotoTren`.`tipoTren` (`tipoTren`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fotoTren`.`publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fotoTren`.`Publicacion` (
  `pubId` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `trenId` INT(11) NOT NULL,
  `titulo` VARCHAR(120) NOT NULL,
  `comAuto` VARCHAR(45) NOT NULL,
  `fechaCrea` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `texto` VARCHAR(2000) NULL DEFAULT NULL,
  PRIMARY KEY (`pubId`),
  INDEX `pub-usu_idx` (`email` ASC) ,
  INDEX `pub-tren_idx` (`trenId` ASC) ,
  CONSTRAINT `pub-tren`
    FOREIGN KEY (`trenId`)
    REFERENCES `fotoTren`.`Tren` (`trenId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `pub-usu`
    FOREIGN KEY (`email`)
    REFERENCES `fotoTren`.`Usuario` (`email`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fotoTren`.`imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fototren`.`imagen` (
  `imgId` VARCHAR(255) NOT NULL,
  `fecha` DATETIME null default null,
  `pubId` INT(11) NOT NULL,
  PRIMARY KEY (`imgId`),
  INDEX `img-pub_idx` (`pubId` ASC) ,
  CONSTRAINT `img-pub`
    FOREIGN KEY (`pubId`)
    REFERENCES `fototren`.`publicacion` (`pubId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
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
INSERT INTO `fotoTren`.`Tren` (`trenId`, `modelo`, `tipoTren`) 
VALUES 
    (1, 'Civia', 8),
    (2, 'IRYO', 4),
    (3, 'Alvia S-120', 2),
    (4, 'Ave S-103', 1),
    (5, 'Avant S-104', 3);


COMMIT;


-- -----------------------------------------------------
-- Data for table `fotoTren`.`Usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `fotoTren`;
INSERT INTO `fotoTren`.`Usuario` (`name`, `email`, `password`) 
VALUES 
    ('Santiago', 'santiago@gmail.com', 'password123'),
    ('Miriam', 'miriam@gmail.com', 'mypass2024'),
    ('Carlos', 'carlos@example.com', 'trainlover'),
    ('pepe', 'pepe@gmail.com',  '$2b$10$VtGJkvvhK5eKTx2aSeMk6ux9gJXqBv7xkOTvbZ.HRuUUoUlNQ2SH2'),
   
    ('Elena', 'elena@example.com', 'password456');

COMMIT;


-- -----------------------------------------------------
-- Data for table `fotoTren`.`Publicacion`
-- -----------------------------------------------------
START TRANSACTION;
USE `fotoTren`;
INSERT INTO `fotoTren`.`Publicacion` (`email`, `trenId`, `titulo`, `comAuto`, `texto`) 
VALUES 
    ('santiago@gmail.com', 1, 'Civia en Andalucía', 'Andalucía', 'Hermosa mañana para una foto de este tren.'),
    ('carlos@example.com', 2, 'IRYO desde Navarra', 'Navarra', 'Un gran tren para un viaje inolvidable.'),
    ('miriam@gmail.com', 3, 'Alvia en Cataluña',  'Cataluña', 'Impresionante velocidad capturada.'),
    ('elena@example.com', 4, 'Ave por Madrid',  'Madrid', 'Una vista increíble del Ave en el andén.');


COMMIT;


-- -----------------------------------------------------
-- Data for table `fotoTren`.`Imagen`
-- -----------------------------------------------------
START TRANSACTION;
USE `fotoTren`;
INSERT INTO `fotoTren`.`Imagen` (`imgId`,`fecha`, `pubId`) 
VALUES 
    ('1733004564050-RESULTADO1.png','2024-10-16 10:30:00', 1);
    



COMMIT;
start transaction;
INSERT INTO `fotoTren`.`Foro` (`Texto`, `Creador`, `PId`) 
VALUES 
    ('Este es el primer comentario del foro.', 'Miriam', null),
    ('Discutamos sobre trenes históricos.', 'Miriam', null),
    ('Bienvenidos al foro de fotografía de trenes.', 'Miriam', null);

INSERT INTO `fotoTren`.`Foro` (`Texto`, `Creador`, `PId`) 
VALUES 
    ('¡Me encanta este tema!', 'Miriam', 1), -- Respuesta al primer comentario
    ('¿Qué opinan del tren AVE?', 'Miriam', 1), -- Respuesta al primer comentario
    ('Tengo fotos del tren AVE en acción.', 'Miriam', 2), -- Respuesta al segundo comentario
    ('¡Excelente idea para compartir fotos!', 'Miriam', 2), -- Respuesta al segundo comentario
    ('Gracias, espero que les guste.', 'Miriam', 4); -- Respuesta al cuarto comentario
commit;	