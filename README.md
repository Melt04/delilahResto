Proyecto final del curso Desarrollo Fullstack WEB.

API Rest para gestionar una app de pedidos on line

Configuraciones por defecto:

El nombre de la base de datos es Resto
El server corre sobre el puerto 300
Espera que mysql este corriendo en el puerto por defecto,3306
Usuario de la base de datos es Root
El usuario de la base de datos no tiene contrasena
Todas esas configuraciones pueden ser modificadas desde el archivo const.js
Instrucciones:

Ejecutar npm install para las dependencias
Ejecutar el script npm run dev para iniciar el servidor y la Base de datos.
Dentro de la carpeta complementos se encuentra 2 carpetas , query_tables , donde estan
las querys para crear las tablas y la carpeta CSV, donde estan los archivos para importar data para las tablas.
Se adjunta un archivo con las querys necesarias para generar las tablas
Se adjunta 4 archivos con datos ya generados para las tablas:
Users
States
Roles
Productos
La tabla de users tiene 2 usuarios creados:
userName: Usuario password:'123465'
userName: Admin password:'Admin'
Endpoints:

Usuarios:
get /users
post /users/signin
post /users/login
post /users/favorites/{id}
get /users/profile
post /users/:user/admin
Productos:
get /products
post /products
get /products/{id}
delete /products/{id}
put /products/{id}
Pedidos:
get /orders
post /orders
put /orders/{id}
