# 💻 Comandos de Inicio Rápido

Para ejecutar el proyecto es necesario seguir los siguientes pasos

## 1: Clonar el repositorio
```bash
git clone https://github.com/Luan-nee/Chets-Nuts-Foods.git
```

## 2: Descargar las dependencias
```bash
npm install
```
## 3: Definir las variables de entorno
Crea un archivo `.env` en la raiz del proyecto, dentro de ella define las siguientes variables.
El valor que se les da a cada variable es un ejemplo demostrativo

```js
DB_HOST=localhost
DB_USER=Agusto
DB_PASSWORD=123
DB_NAME=proyectDB
DB_PORT=3306
CORS_DOMINIO_FRONTEND=https://proyect123.com
BACKEND_PORT=3000
```

| Variable | Descripción de uso |
| :--- | :--- |
| `DB_HOST` | Dirección del servidor de la base de datos (ej. `localhost` para local o una IP para remoto). |
| `DB_USER` | Nombre de usuario para la autenticación en MySQL. |
| `DB_PASSWORD` | Contraseña del usuario de la base de datos. |
| `DB_NAME` | Nombre de la base de datos específica del proyecto (ej. `proyectDB`). |
| `DB_PORT` | Puerto de conexión de MySQL (por defecto es `3306`). |
| `CORS_DOMINIO_FRONTEND` | URL del frontend permitida para realizar peticiones a la API (evita errores de CORS). |
| `BACKEND_PORT` | Puerto en el que se ejecutará el servidor de Node.js/Express (ej. `3000`). |

# 📂 Arquitectura de archivo
Para desarrollar este proyecto hemos usado la arquitectura `nombre_arquitectura` y a continuación explicamos el uso de cada archivo.

```text
src/
├── config/             # Configuraciones globales y definiciones de constantes.
|   └── db.config.ts            # Establece la conexión con la base de datos.
├── controllers/        # Estructuras de respuesta de los endpoints creados.
|   └── Vehiculo.ts            # Clase VehiculoController, define estructuras de respuesta del endpoint {{url}}/api/vehiculos.
├── models/             # Estructura type de typescript.
|   └── vehiculo.ts            # Definiciones de tipos para vehiculo.
├── repositories/       # Consultas a las base de datos ( SELECT | DELETE | UPDATE | INSERT ) usando MYSQL.
|   └── Vehiculo.ts            # Clase VehiculoController, contiene métodos que hacen consultas usando la sintaxis de MYSQL.
├── routes/             # Definición de los endpoints de la API.
|   └── Vehiculo.ts            # Define endpoints relacionados a vehiculos.
├── services/           # Manejo de errores.
|   └── Vehiculo.ts            # Clase VehiculoService, verifica que los datos del vehiculo sean correctos.
├── app.ts              # Inicialización del servidor.
├── createDatabase.ts   # Script usado para crear y/o poblar la base de datos de forma automática.
└── index.ts            # Inicialización del servidor de pruebas.
```

