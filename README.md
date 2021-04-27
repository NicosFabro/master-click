# Master Click

## Features implementadas

### Mostrar los clicks hechos por el usuario.

#### **Servidor**

He creado un Map de clicks por usuarios, guardando como key el socket id y como valor el número de clicks.

Cada vez que el usuario hace un click, se comprueba si ese usuario (socket) tiene clicks hechos. Si tiene, se incrementan. Si no, se añade el entry en el Map.

#### **Cliente**

Recibe el map y pone el número de clicks hechos por el usuario (socket) dentro de un nuevo div creado con id `clicksUserTxt`.

### Mostrar los clicks totales.

#### **Servidor**

Tener una variable que se vaya incrementando por cada click que hagan los usuarios. (Ya estaba implementado).

#### **Cliente**

Recibe la variable `numClicks` y la muestra en un div con id `clicksTxt`. (Ya estaba implementado).

### Mostrar la media de clicks por usuario y si el usuario está por encima y por debajo de la media.

#### **Cliente**

Se ha hecho el cálculo con los datos de `numClicks` entre `usersConnected`. Luego se comprueba si el número de clicks del usuario está por encima o por debajo de la media.

### Mostrar la cantidad de usuarios conectados.

#### **Servidor**

Tener un contador que vaya incrementando por cada conexión. (Ya estaba implementado).

#### **Cliente**

Recibe la variable `usersConnected` y la muestra en un div con id `counter`.

### Añadir un botón o mecanismo para reiniciar el contador.

#### **Servidor**

Tener una función que se ejecute cuando el socket reciba un `reset` que borre los clicks totales y los de todos los clientes. Luego enviar estos dos datos a todos los clientes.

#### **Cliente**

Crear un botón en el HTML que al hacer click envíe `reset` al socket. Tener una función que actualice los datos cuando reciba `callbackReset`.

## Heroku

* Link app: https://master-click-nicos.herokuapp.com/
* Link repositorio GitHub: https://github.com/NicosFabro/master-click