CREATE DATABASE IF NOT EXISTS chets_nuts_foods;
USE chets_nuts_foods;

-- 1. Tabla: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    iduser INT NOT NULL AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    apellidomaterno VARCHAR(50) NOT NULL,
    apellidopaterno VARCHAR(50) NOT NULL,
    edad INT DEFAULT 18,
    dniuser VARCHAR(10),
    rucuser VARCHAR(15),
    tipo VARCHAR(50) DEFAULT 'NATURAL',
    estado TINYINT(1) DEFAULT 1,
    numero VARCHAR(50),
    numeroLicenciaConducir VARCHAR(20),
    correo VARCHAR(100),
    cantenvios INT DEFAULT 0,
    fechacreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (iduser),
    CONSTRAINT chk_usuarios_tipo CHECK (tipo IN ('NATURAL', 'JURIDICO'))
);

-- 2. Tabla: accesos
CREATE TABLE IF NOT EXISTS accesos (
    idacceso INT NOT NULL AUTO_INCREMENT,
    idusuario INT NOT NULL,
    tipos VARCHAR(50) NOT NULL,
    correo VARCHAR(200) NOT NULL,
    contra VARCHAR(50) NOT NULL,
    estado TINYINT(1) DEFAULT 1,
    estadoacceso VARCHAR(50) DEFAULT 'DISPONIBLE',
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idacceso),
    CONSTRAINT chk_accesos_tipos CHECK (tipos IN ('ADMIN', 'CHOFER', 'CLIENTE', 'COLABORADOR')),
    CONSTRAINT chk_accesos_estado CHECK (estadoacceso IN ('DISPONIBLE', 'OCUPADO', 'OBSERVACION'))
);

-- 3. Tabla: datosempresa
CREATE TABLE IF NOT EXISTS datosempresa (
    idDatosEmpresa INT NOT NULL AUTO_INCREMENT,
    ruc VARCHAR(15) NOT NULL,
    denominacion VARCHAR(150) NOT NULL,
    numeroRegistroMtc VARCHAR(30) NOT NULL,
    codigoMtc VARCHAR(30) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    urlApi VARCHAR(150) DEFAULT 'none',
    claveAcceso VARCHAR(80) DEFAULT 'none',
    fechavigenciaregistro TIMESTAMP NOT NULL,
    PRIMARY KEY (idDatosEmpresa)
);

-- 4. Tabla: establecimientos
CREATE TABLE IF NOT EXISTS establecimientos (
    idEst INT NOT NULL AUTO_INCREMENT,
    idUsuarioResponsable INT NOT NULL,
    codigoSunat VARCHAR(5),
    nombreEst VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    descripcion VARCHAR(200),
    latitud VARCHAR(70) NOT NULL,
    longitud VARCHAR(70) NOT NULL,
    distrito VARCHAR(70) NOT NULL,
    provincia VARCHAR(70) NOT NULL,
    departamento VARCHAR(70) NOT NULL,
    ubigeo VARCHAR(15) NOT NULL,
    tipoestablecimiento VARCHAR(50) DEFAULT 'oficina',
    activo TINYINT(1) DEFAULT 1,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idEst),
    CONSTRAINT chk_establecimientos_tipo CHECK (tipoestablecimiento IN ('fiscal', 'anexo', 'almacen', 'oficina', 'noRegistrado'))
);

-- 5. Tabla: vehiculosempresa
CREATE TABLE IF NOT EXISTS vehiculosempresa (
    idvehempresa INT NOT NULL AUTO_INCREMENT,
    placa VARCHAR(10) NOT NULL,
    marca VARCHAR(10) NOT NULL,
    modelo VARCHAR(10) NOT NULL,
    anio VARCHAR(5) NOT NULL,
    tipoVehiculo VARCHAR(20),
    vin VARCHAR(100),
    numeroHabilitacion VARCHAR(150),
    capacidadCarga DECIMAL(10,2) NOT NULL,
    tiposervicio VARCHAR(100) DEFAULT 'PRIVADO',
    estadovehiculo VARCHAR(100) DEFAULT 'OPERATIVO',
    fechacreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idvehempresa),
    CONSTRAINT chk_vehiculos_servicio CHECK (tiposervicio IN ('PUBLICO', 'PRIVADO')),
    CONSTRAINT chk_vehiculos_estado CHECK (estadovehiculo IN ('OPERATIVO', 'INACTIVO', 'RESERVADO'))
);

-- 6. Tabla: salidatransporte
CREATE TABLE IF NOT EXISTS salidatransporte (
    idsalidatransporte INT NOT NULL AUTO_INCREMENT,
    idvehiculo INT NOT NULL,
    idchoferacceso INT NOT NULL,
    idchoferaccesosecundario INT,
    idorigenestablecimiento INT NOT NULL,
    iddestinoestablecimiento INT NOT NULL,
    fechasalida TIMESTAMP NOT NULL,
    estadotransporte VARCHAR(50) DEFAULT 'INICIO',
    fechafinalizado TIMESTAMP NULL DEFAULT NULL,
    fechacreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idsalidatransporte),
    CONSTRAINT chk_transporte_estado CHECK (estadotransporte IN ('INICIO', 'EN CAMINO', 'FINALIZADO', 'CANCELADO'))
);

-- 7. Tabla: paquetes
CREATE TABLE IF NOT EXISTS paquetes (
    idenvio INT NOT NULL AUTO_INCREMENT,
    idusuario INT NOT NULL,
    idusuarioDestino INT NOT NULL,
    idsalidatransporte INT NOT NULL,
    idDestinoEstablecimiento INT,
    destino VARCHAR(50),
    clave VARCHAR(10) NOT NULL,
    montocobrado DECIMAL(10,2) NOT NULL,
    estadopaquete VARCHAR(50) DEFAULT 'HOME',
    observacion VARCHAR(300),
    cantidadproduct INT DEFAULT 0,
    ultimaactualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fechacreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idenvio),
    CONSTRAINT chk_paquetes_estado CHECK (estadopaquete IN ('ENTREGADO', 'CAMINO', 'DETENIDO', 'HOME', 'CANCELADO', 'REVISION'))
);

-- 8. Tabla: productos
CREATE TABLE IF NOT EXISTS productos (
    id INT NOT NULL AUTO_INCREMENT,
    idenvio INT NOT NULL,
    nombreproducto VARCHAR(150) NOT NULL,
    observacion VARCHAR(150),
    pesounitario DECIMAL(10,3) NOT NULL,
    cantidad INT DEFAULT 1,
    pesototal DECIMAL(10,3) DEFAULT 0.000,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaactualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- 9. Tabla: guiasremision
CREATE TABLE IF NOT EXISTS guiasremision (
    idguia INT NOT NULL AUTO_INCREMENT,
    idpaquete INT,
    numero VARCHAR(100),
    qrUrl VARCHAR(200),
    confirmado TINYINT(1) DEFAULT 0,
    datagenerate VARCHAR(700),
    fechaupdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fechaConfirmacion TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (idguia)
);

-- 10. Tabla: seguimientopaquetes
CREATE TABLE IF NOT EXISTS seguimientopaquetes (
    idseg INT NOT NULL AUTO_INCREMENT,
    idpaquete INT NOT NULL,
    idcontrolestablecimiento INT COMMENT 'En caso de haber pasado por algun establecimiento',
    latitud VARCHAR(50),
    longitud VARCHAR(50),
    direccion VARCHAR(70),
    titulo VARCHAR(100) NOT NULL,
    comentario VARCHAR(150) COMMENT 'En caso quiera agregar alguna informacion',
    fecharegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idseg)
);

-- 11. Tabla: productsdefect
CREATE TABLE IF NOT EXISTS productsdefect (
    idproductdefect INT NOT NULL AUTO_INCREMENT,
    creatoracceso INT NOT NULL,
    nombre VARCHAR(250) NOT NULL,
    descripcion VARCHAR(300),
    fechacreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idproductdefect)
);

-- 12. Tabla: notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
    idnotificacion INT NOT NULL AUTO_INCREMENT,
    titulonotificacion VARCHAR(150) NOT NULL,
    descripcion VARCHAR(350) COMMENT 'cuando es socket llega json',
    estado TINYINT(1) DEFAULT 1,
    tiponotificacion VARCHAR(50) DEFAULT 'anuncio',
    detalletipo VARCHAR(50),
    fechaejecute TIMESTAMP NOT NULL,
    fechacreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idnotificacion),
    CONSTRAINT chk_notificaciones_tipo CHECK (tiponotificacion IN ('socket', 'anuncio', 'informe'))
);