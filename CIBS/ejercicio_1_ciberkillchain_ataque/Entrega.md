# Ejercicio CiberKillChain - Ataque

 * Alumna: Josselyn Ordóñez

## Descripción del trabajo práctico
Debido a que no se tiene aún un trabajo práctico definido, se hará el ataque en base al trabajo práctico de la materia de Desarrollo de Aplicaciones IoT.

### Capa de Percepción

Mediante la utilización de un microcontrolador ESP32 y un sensor DHT11, se implementa:

- Nodo conectado vía Wi-Fi.
- Reportes de mediciones de la variable a medir cada 30 seg.
- Comunicación entre el nodo sensor y el servidor mediante TLS.
- Implementación de canales de actuación remota.

### Capa de Transporte
Se utiliza el protocolo MQTT con capa de seguridad TLS

### Capa de Procesamiento, Persistencia y Visualización

#### A. Base de Datos

1. Se utiliza Postgres SQL

#### B. API - NodeJs + Express

1. Persistencia de telemetrías enviadas por el nodo sensor.
2. Persistencia de los atributos de los nodos sensores registrados.
3. Recuperación de datos o atributos de un nodo sensor determinado.

#### C. Visualización (Interfaz de Usuario)

1. Visualización del ID del nodo y último valor reportado.
2. Timestamp de la última telemetría almacenada.
3. Visualización del estado de los canales de actuación remota.
4. Visualización del estado del nodo sensor.
5. Gráfica de serie temporal de temperatura y humedad.

![Arquitectura](infraestrutura_TP_IoT.png)

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

### Objetivo del ataque

El atacante pertenece a una banda de ladrones de casas moderanas. Sabe que algunas casas, como la de la víctima, tienen sistemas IoT que miden la temperatura del ambiente y se aprovecha de estos sistemas para deducir cuándo hay personas en la casa y cuándo no. Su estrategia es atacar estos sistemas y traer la información de la temperatura en las épocas de invierno. Si la temperatura es reducida, significa que la calefacción no está encendida y hay grandes posibilidades de que no haya nadie en casa. Una vez encuentra una casa vacía, es buen momento para entrar a saquear.

Por tanto, el objetivo del ciberataque es infiltrarse en el sistema y tener la información de las mediciones de temperatura en tiempo real.

### Diseño del ciberataque

* Reconnaissance
  - Imagen satelital identifica una pista de aterrizaje.
  - Espías dicen que por el puerto entra el combustible.
  - Espías locales dicen que la playa cercana no tiene buena vigilancia.

* Weaponization
  - **Puedo** preparar un bombardeo.
  - **Decido** preparar un equipo de comandos de sabotage.
  
* Delivery
  - Envío al equipo de sabotage a la playa cercana en submarino.
  
* Exploit
  - El equipo logra desembarcar sin incidentes en la playa.
  
* Installation  
  - El equipo se hace pasar por una compañia de circo como camuflaje.

* Command & Control
  - **Puedo** utilizar palomas mensajeras.
  - **Decido** utilizar Super High TeraHertz Radio que el adversario no puede detectar.
  
* Actions on Objectives
  - El equipo de comandos provoca daños menores en las cañerías.
  - El equipo de comandos coloca minas en el puerto dejando un camino para el desembarco.


  

