DROP DATABASE IF EXISTS PROYECTO_FIS;
CREATE DATABASE PROYECTO_FIS;
USE PROYECTO_FIS;

DROP TABLE IF EXISTS 
    ESTADISTICAS, USUARIO_SELECCION, ACTIVIDAD, RESPUESTA, NUMEROS, TEMA, USUARIOS, JUGADOR, ADMINISTRADOR;
	
CREATE TABLE ADMINISTRADOR
(
    ID CHAR(10) ,
    NICKNAME VARCHAR(100) NOT NULL,
    CONSTRAINT PK_ADMINISTRADOR PRIMARY KEY(ID)
) ENGINE = INNODB;

CREATE TABLE JUGADOR
(
    ID CHAR(10),
    NICKNAME VARCHAR(100) NOT NULL,
    CONSTRAINT PK_JUGADOR PRIMARY KEY(ID) 
) ENGINE = INNODB;

CREATE TABLE USUARIOS
(
	ID CHAR(10),
	USERNAME VARCHAR(20) NOT NULL,
	EMAIL VARCHAR(25) NOT NULL,
	PASSWORD TEXT NOT NULL,
	ADMIN CHAR(2),
	IMG VARCHAR(15), 
	CONSTRAINT PK_USUARIOS PRIMARY KEY (ID)
) ENGINE = INNODB;

CREATE TABLE TEMA
(
	ID CHAR(10),
	TEMA VARCHAR(200) NOT NULL,
	CONSTRAINT PK_TEMA PRIMARY KEY (ID)
) ENGINE = INNODB;

CREATE TABLE NUMEROS
(
	ID CHAR(10),
	NUMERO1 VARCHAR(200) NOT NULL,
	NUMERO2 VARCHAR(200) NOT NULL,
	NUMERO3 VARCHAR(200) NOT NULL,
	NUMERO4 VARCHAR(200) NOT NULL,
	CONSTRAINT PK_NUMEROS PRIMARY KEY (ID)
) ENGINE = INNODB;

CREATE TABLE RESPUESTA
(
	ID CHAR(10),
	RESPUESTA VARCHAR(200) NOT NULL,
	CONSTRAINT PK_RESPUESTA PRIMARY KEY (ID)
) ENGINE = INNODB;

CREATE TABLE ACTIVIDAD 
(
	ID CHAR(10),
	NOMBRE VARCHAR(50) NOT NULL, 
	NIVEL CHAR(1) CHECK(NIVEL IN ('B', 'I', 'A')), 
	TEMA CHAR(10) NOT NULL,
	NUMEROS CHAR(10) NOT NULL,
	RESPUESTA CHAR(10) NOT NULL,
	ADMINISTRADOR CHAR(10) NOT NULL,
	CONSTRAINT PK_ACTIVIDAD PRIMARY KEY (ID),
	CONSTRAINT FK_TEMA FOREIGN KEY (TEMA) REFERENCES TEMA(ID),
	CONSTRAINT FK_NUMEROS FOREIGN KEY (NUMEROS) REFERENCES NUMEROS(ID),
	CONSTRAINT FK_RESPUESTA FOREIGN KEY (RESPUESTA) REFERENCES RESPUESTA(ID),
	CONSTRAINT FK_ADMINISTRADOR FOREIGN KEY (ADMINISTRADOR) REFERENCES ADMINISTRADOR(ID)
) ENGINE = INNODB;

CREATE TABLE ESTADISTICAS
(
	ID CHAR(10),
	BIEN INT NOT NULL DEFAULT 0,
	MAL INT NOT NULL DEFAULT 0,
	CONSTRAINT PK_ESTADISTICAS PRIMARY KEY (ID)
) ENGINE = INNODB;

CREATE TABLE USUARIO_SELECCION
(
	ID CHAR(10),
	JUGADOR CHAR(10) NOT NULL,
	ACTIVIDAD CHAR(10) NOT NULL,
	SELECCION VARCHAR(200) NOT NULL,
	ESTADISTICAS CHAR(10) NOT NULL,
	CONSTRAINT PK_USUARIO_SELECCION PRIMARY KEY (ID),
	CONSTRAINT FK_JUGADOR FOREIGN KEY (JUGADOR) REFERENCES JUGADOR(ID),
	CONSTRAINT FK_ACTIVIDAD FOREIGN KEY (ACTIVIDAD) REFERENCES ACTIVIDAD(ID),
	CONSTRAINT FK_ESTADISTICAS FOREIGN KEY (ESTADISTICAS) REFERENCES ESTADISTICAS(ID)
) ENGINE = INNODB;

DROP TRIGGER IF EXISTS ESTADISTICA_SELECT;
DELIMITER //
CREATE TRIGGER ESTADISTICA_SELECT BEFORE INSERT ON USUARIO_SELECCION FOR EACH ROW
BEGIN 
	DECLARE ID CHAR(10) DEFAULT NEW.ESTADISTICAS;
	DECLARE RESPUESTA VARCHAR(200) DEFAULT NEW.SELECCION;

	DECLARE RESPUESTA_V VARCHAR (200); 
	SELECT R.RESPUESTA INTO RESPUESTA_V  FROM ACTIVIDAD A JOIN TEMA T ON A.TEMA = T.ID JOIN NUMEROS N ON N.ID = A.NUMEROS JOIN RESPUESTA R ON R.ID = A.RESPUESTA WHERE A.ID = NEW.ACTIVIDAD;

	IF RESPUESTA = RESPUESTA_V  THEN 
		INSERT INTO ESTADISTICAS (ID, BIEN, MAL, FECHA) VALUES (ID, 1, 0, NOW());
	ELSE 
		INSERT INTO ESTADISTICAS (ID, BIEN, MAL, FECHA) VALUES (ID, 0, 1, NOW());
	END IF;

END//
DELIMITER ;

DROP TRIGGER IF EXISTS ESTADISTICA_UPDATE;
DELIMITER //
CREATE TRIGGER ESTADISTICA_UPDATE BEFORE UPDATE ON USUARIO_SELECCION FOR EACH ROW
BEGIN 
	DECLARE ID_E CHAR(10) DEFAULT OLD.ESTADISTICAS;
	DECLARE RESPUESTA VARCHAR(200) DEFAULT NEW.SELECCION;
	DECLARE RESPUESTA_V VARCHAR (200); 
	SELECT R.RESPUESTA INTO RESPUESTA_V  FROM ACTIVIDAD A JOIN TEMA T ON A.TEMA = T.ID JOIN NUMEROS N ON N.ID = A.NUMEROS JOIN RESPUESTA R ON R.ID = A.RESPUESTA WHERE A.ID = NEW.ACTIVIDAD;

	IF RESPUESTA = RESPUESTA_V THEN 
		UPDATE ESTADISTICAS SET BIEN = 1, MAL = 0, FECHA = NOW() WHERE ID = ID_E;
	ELSE
		UPDATE ESTADISTICAS SET BIEN = 0, MAL = 1, FECHA = NOW() WHERE ID = ID_E;
	END IF;

END //

DELIMITER ;