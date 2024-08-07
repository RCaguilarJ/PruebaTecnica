
Configuración y Ejecución del Proyecto To-Do List

Este archivo proporciona instrucciones para configurar y ejecutar tanto el backend como el frontend de la aplicación To-Do List.
Requisitos Previos

    .NET Core SDK (versión 6.0 o superior)
    Node.js (versión 18.0 o superior)
    MySQL o SQL Server para la base de datos

Configuración del Backend (API en .NET Core)

    Clonar el Repositorio

    bash

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO_DEL_BACKEND>

Configurar la Cadena de Conexión

    Abre el archivo appsettings.json en el proyecto backend.

    Modifica la cadena de conexión en la sección ConnectionStrings para que apunte a tu base de datos MySQL o SQL Server.

    json

    "ConnectionStrings": {
      "DefaultConnection": "Server=<DIRECCIÓN_DEL_SERVIDOR>;Database=<NOMBRE_DE_LA_BASE_DE_DATOS>;User=<USUARIO>;Password=<CONTRASEÑA>;"
    }

Restaurar Paquetes y Ejecutar Migraciones

    Restaura los paquetes NuGet:

    bash

dotnet restore

Aplica las migraciones a la base de datos:

bash

    dotnet ef database update

Ejecutar el Backend

bash

    dotnet run

    La API estará disponible en http://localhost:5000 por defecto.

Configuración del Frontend (ReactJS)

    Clonar el Repositorio

    bash

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO_DEL_FRONTEND>

Instalar Dependencias

    Instala las dependencias de npm:

    bash

    npm install

Configurar la URL de la API

    Abre el archivo src/api.js (o el archivo correspondiente donde se configuran las URL de la API).

    Configura la URL base de la API para que apunte a tu instancia del backend.

    javascript

    const API_URL = 'http://localhost:5000/api';

Ejecutar el Frontend

bash

    npm start

    La aplicación frontend estará disponible en http://localhost:3000 por defecto.

Ejemplos de Peticiones a la API
Obtener Todas las Tareas

    Método: GET

    URL: http://localhost:5000/api/tasks

    bash

    curl -X GET http://localhost:5000/api/tasks

Crear una Nueva Tarea

    Método: POST

    URL: http://localhost:5000/api/tasks

    Body:

    json

{
  "title": "Nueva tarea",
  "description": "Descripción de la nueva tarea",
  "isCompleted": false
}

bash

    curl -X POST http://localhost:5000/api/tasks -H "Content-Type: application/json" -d '{"title": "Nueva tarea", "description": "Descripción de la nueva tarea", "isCompleted": false}'

Actualizar una Tarea

    Método: PUT

    URL: http://localhost:5000/api/tasks/{id}

    Body:

    json

{
  "title": "Título actualizado",
  "description": "Descripción actualizada",
  "isCompleted": true
}

bash

    curl -X PUT http://localhost:5000/api/tasks/{id} -H "Content-Type: application/json" -d '{"title": "Título actualizado", "description": "Descripción actualizada", "isCompleted": true}'

Eliminar una Tarea

    Método: DELETE

    URL: http://localhost:5000/api/tasks/{id}

    bash

curl -X DELETE http://localhost:5000/api/tasks/{id}