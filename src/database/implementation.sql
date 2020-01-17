DROP DATABASE IF EXISTS PROYECTO_FIS;
CREATE DATABASE PROYECTO_FIS;
USE PROYECTO_FIS;

DROP TABLE IF EXISTS 
    ADMINISTRADOR, ACTIVIDAD, ALTERNATIVAS, JUGADOR, ESTADISTICAS, SECCION_ALTERNATIVAS;

CREATE TABLE ADMINISTRADOR
(
    ID CHAR(10),
    NICKNAME VARCHAR(100) NOT NULL,
    CONSTRAINT PK_ADMINISTRADOR PRIMARY KEY(ID)
);

CREATE TABLE ACTIVIDAD
(
    ID CHAR(7) ,
    DIFICULTAD VARCHAR(15) NOT NULL,
    TEMA VARCHAR(50) NOT NULL,
    RESPUESTA VARCHAR(50) NOT NULL,
    ID_ADMINISTRADOR CHAR(10), 
    CONSTRAINT PK_ACTIVIDAD PRIMARY KEY(ID), 
    CONSTRAINT FK_ACTIVIDAD_ADMINISTRADOR FOREIGN KEY(ID_ADMINISTRADOR) REFERENCES ADMINISTRADOR(ID)

);

CREATE TABLE ALTERNATIVAS
(
    ID_ACTIVIDAD VARCHAR(7) ,
    ALTER1 VARCHAR(25) NOT NULL,
    ALTER2 VARCHAR(25) NOT NULL,
    ALTER3 VARCHAR(25) NOT NULL,
    ALTER4 VARCHAR(25) NOT NULL,
    CONSTRAINT FK_ACTIVIDAD FOREIGN KEY(ID_ACTIVIDAD) REFERENCES ACTIVIDAD(ID), 
    CONSTRAINT PK_ALTERNATIVAS PRIMARY KEY(ID_ACTIVIDAD)
);

CREATE TABLE ESTADISTICAS
(
    ID VARCHAR(7),
    ESTA_VERSION INT NOT NULL, 
     CONSTRAINT PK_ESTADISTICA PRIMARY KEY(ID)
);

CREATE TABLE JUGADOR
(
    ID CHAR(10) ,
    NICKNAME VARCHAR(100) NOT NULL,
    ID_ESTADISTICAS VARCHAR(7),
    CONSTRAINT FK_JUGADOR_ESTADISTICAS FOREIGN KEY(ID_ESTADISTICAS) REFERENCES ESTADISTICAS(ID),
    CONSTRAINT PK_JUGADOR PRIMARY KEY(ID) 
);

CREATE TABLE SELECCION_ALTERNATIVA
(
    ID_JUGADOR VARCHAR(10),
    ID_ACTIVIDAD VARCHAR(7),
    CONSTRAINT PK_SELECCION_ALTERNATIVA PRIMARY KEY(ID_JUGADOR, ID_ACTIVIDAD),
    CONSTRAINT FK_ID_JUGADPR_JUGADOR FOREIGN KEY(ID_JUGADOR) REFERENCES JUGADOR(ID),
    CONSTRAINT FK_ID_ACTIVIDAD_ACTIVIDAD FOREIGN KEY(ID_ACTIVIDAD) REFERENCES ACTIVIDAD(ID)
);

CREATE TABLE usuarios (
  ID VARCHAR(10),
  USERNAME varchar(50) NOT NULL UNIQUE,
  EMAIL varchar(50) NOT NULL,
  PASSWORD text NOT NULL,
  ADMIN CHAR(2) CHECK(ADMIN IN('SI', 'NO')), 
  IMG VARCHAR(15), 
  PRIMARY KEY(ID)
) ENGINE=InnoDB


CREATE USER 'JUGADOR'@'%' IDENTIFIED BY 'jugador';

GRANT SELECT ON PROYECTO_FIS.* TO 'JUGADOR'@'%';
GRANT ALL ON PROYECTO_FIS.USUARIOS TO 'JUGADOR'@'%';

/* Usuario administrador */

CREATE USER 'ADMINISTRADOR'@'%' IDENTIFIED BY 'administrador';

GRANT ALL ON PROYECTO_FIS.* TO 'ADMINISTRADOR'@'%';

/* DELIMITER //
CREATE FUNCTION isExistID(val CHAR(10), tabla VARCHAR(20)) RETURNS INT
BEGIN 
    DECLARE ID_NICK VARCHAR(10);
    SELECT ID INTO ID_NICK FROM tabla WHERE ID=val;
    IF (ID_NICK IS NULL) THEN
        RETURN 0;
     ELSE 
        RETURN 1;
    END IF;
END //

DELIMITER ; */
