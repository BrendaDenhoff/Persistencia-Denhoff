## Proyecto_api
En esta API vas a encontrar 5 entidades (carreras, cursa, materias, usuarios y controlador).

# General
/car => Carreras
/mat => Materias
/usu => Usuarios
/cur => Cursa
/con => Controlador

En todas las entidades podes:
1. Obtener todos los registros:
    Get => /nombre_tabla/PaginaActual&CantidadRegistros
    Por ejemplo:
    Get => /car/0&10
    Get => /con/3&20

2. Insertar un registro: (excepto controlador)
Se deben declarar los valores en el body
    Post => /nombre_tabla/
    Por ejemplo:
    Post => /usu/

3. Obtener un registro por id: 
    Get => /nombre_tabla/id
    Por ejemplo:
    Get => /mat/5

4. Actualziar informacion de un registro por id: (excepto controlador)
Se debe declarar el valor a actualizar
    PUT => /nombre_tabla/id
    Por ejemplo:
    PUT => /car/7

5. SSe elimina un registro por id: (excepto controlador)
    DELETE => /nombre_tabla/id
    Por ejemplo:
    DELETE => /nombre_tabla/8

# Usuarios
1. Crear un usuario:
Se deben declarar los valores en el body
    POST => /usu/SigUp

2. Iniciar seccion:
Se deben declarar el email y contrasenia en el body
    POST => /usu/login
Te devuelve un token para poder acceder a la api.

3. Cambiar contrasenia
    PUT => /usu/cambiarContrasenia

# IMPORTANTE
Recorda que para poder utilizar la api es necesario logearse y utilizar el token




