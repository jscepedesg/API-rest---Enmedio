# API-rest---Enmedio
Ejercicio para el desarrollo de una API rest que permita administrar los procesos de compra y venta.

## Assets

- El modelo de datos diseñado se puede visualizar dentro de la carpeta assets.

### Explicacíon modelo de datos

Se uso este modelo de datos para que permitiera que el programa llegue a ser escalable y mantenible y se puediera optener la información de la manera mas facíl y optima, con base en las reglas de negocio.

### Endpoints Postman

- El archivo JSON de postman se podra descargar de la carpeta assets, que esta en la raiz el proyecto.


## Dependencias

- Instalar NodeJs ultima versión estable.
- Instalar de manera globlar typescript, nodemon y ts-node ---- `npm i -g typescript nodemon ts-node`
- No olvide descargar las dependencias del proyecto con: `npm i` en la raiz del proyecto.

## Generar build

Para generar la carpeta dis, que tendra el compilado del programa se debe estar en la raiz del proyecto y correr
el comando: 

`npm run build`

Si desea ejecutarlo puede hacerlo dentro de la raiz del compilado con el comando:

`node index.js`

## Compilar entorno de desarrollo

Si desea compilar el entorno de desarrollo en typescript es necesario habler cumplido los requerimientos dichos en el apartado de dependencias, si ya lo hizo, puede ejecutar el software con:

`npm run server`

## Descripción

La empresa xyz encargada de la compra y venta de productos industriales busca digitalizar sus procesos, 
por tal razon requiere el desarrollo de un administrador en el que puedan:

- Crear productos, actualizar y eliminar los mismos
- Llevar el inventario de cuantos productos tienen en stock y cuantos se han vendido.
- Conocer cuales son los clientes que más compran
- Manejar los tiempos de entrega de sus productos por sus operarios
- Conocer la puntuación de sus productos según sus clientes.
- Ver las estadísticas de sus productos.

Ejercicio:

- Diseñe la base de datos para dicho proyecto
- Justifique porqué uso el modelo de bd usado
- Realice un API rest que retorne la información solicitada en los requisitos funcionales mencionados arriba.
- Enviar link del proyecto en github para revisión y archivo JSON de postman o el programa que desée donde podamos 
  revisar los endpoints desarrollados.
- Opcional: Montar proyecto en un servidor.


