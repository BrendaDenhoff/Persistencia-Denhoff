## Estrategias de persistencia

Descripción
Se realizó una API con diferentes endpoints para cada modelo creado, a través del orm sequelize, se realizaron migraciones a la base de datos y se utilizó para realizar consultas o modificar datos.

Funcionalidades
Autenticación con JWT: Para consumir los endpoints se necesita un Header "Authorization" con valor "Bearer + token JWT".

Registro de Usuarios: A través del enpoint /usu/sigUp podemos registrar un nuevo usuario. Devuelve el token para utilizar dentro de Authorization en los otros endpoints.

Login de Usuarios: A través del enpoint /usu/login podemos loguearnos con nuestro usuario y contraseña, si los datos están correctos se devolverá el token para consumir el resto de los endpoints.

Contraseñas Encriptadas: Al crear un nuevo usuario con email y contraseña, la contraseña persistirá en nuestra base de datos de manera encriptada, para prevalecer la seguridad del usuario.

Paginación: Para todos los métodos GET, se proporcionan los query params opcionales "limit" y "offset". El limit define el maximo de registros a devolver, y el offset desde que registro empieza a contar.

Dependencias
jsonwebtoken: Para generar y verificar tokens.
bcrypt: Para encriptar y desencriptar contraseñas
Endpoints
