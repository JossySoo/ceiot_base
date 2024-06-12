# Ejercicio CiberKillChain - Defensa

Hacer una copia de este documento para utilizar com plantilla para el ejercicio

## Alumno

(completar)

## Enunciado

Desarrollar la defensa en función del ataque planteado en orden inverso. No es una respuesta a un incidente, hay que detectar el ataque independientemente de la etapa.

Para cada etapa elegir una sola defensa, la más importante, considerar recursos limitados.

## Resolución
* Actions on Objectives
  Ataque: Dejo automatizada la extracción y uso de la información de temperatura para planificar robos (T1020 - Automated Exfiltration).
  Defensa: D3-Network Traffic Analysis
  - **Descripción:** Monitorear el tráfico de red para identificar y bloquear actividades de exfiltración automatizada.
  - **Enlace:** [Network Traffic Analysis](https://attack.mitre.org/mitigations/D3-Network%20Traffic%20Analysis)

* Command & Control
  Ataque: subscribirme a tópicos MQTT para enviar la telemetría de temperatura a mi Rasberry Pi, que a su vez la envía por internet hacia mi base de datos (T1071.001 - Application Layer Protocol: Web Protocols)
  Defensa: Certificate Management M1057
- **Descripción:** Usar certificados firmados por una CA confiable y administrar correctamente el ciclo de vida de los certificados.
- **Enlace:** [Certificate Management](https://attack.mitre.org/mitigations/M1057)

* Installation  
Ataque: Creo un nuevo certificado utilizando la misma información que el legítimo (T1649 - Steal or Forge Authentication Certificates). Intercepto la conexión TLS y presento el certificado autofirmado falso (T1649 - Steal or Forge Authentication Certificates).
Defensa:

* Exploit
Ataque: Capturo la contraseña del Wifi (T1056: Input Capture). Intercepto las comunicaciones entre el cliente y servidor para obtener el certificado de autofirmado (T1557.002: Adversary-in-the-Middle: DNS Spoofing)
Defensa 1: Encrypted Communication M1041
- **Descripción:** Asegurarse de que todas las comunicaciones de la red estén cifradas para evitar la captura de datos sensibles.
- **Enlace:** [Encrypted Communication](https://attack.mitre.org/mitigations/M1041)

* Delivery
Ataque: Instalo el punto de acceso falso cerca de la residencia para maximizar la probabilidad de conexión por parte de las víctimas y dejo instalado el Raspberry Pi (T1200 - Hardware Additions).

Defensa: Network Segmentation  M1030
- **Descripción:** Separar las redes IoT de las redes principales de la casa para reducir el riesgo de comprometer sistemas críticos.
- **Enlace:** [Network Segmentation](https://attack.mitre.org/mitigations/M1030)

* Weaponization
Ataque: crear un punto de acceso Wi-Fi falso con un nombre similar al de la red legítima (Evil Twin) y engañar a los usuarios para que se conecten a él y brinden la contraseña (T1200 - Hardware Additions / T1056: Input Capture). Preparar un dispositivo Raspeberry Pi que se conecte a internet para que envíe los datos a capturar a mi base de datos (T1200 - Hardware Additions).
Defensa: User Training M1017
- **Descripción:** Proporcionar entrenamiento a los usuarios sobre cómo detectar y evitar técnicas de ingeniería social. Por ejemplo, al ver 2 wifi con el mismo nombre, inmediatamente dudar y validar los dispositivos antes de ingresar contraseñas.
- **Enlace:** [User Training](https://attack.mitre.org/mitigations/M1017)

* Reconnaissance
Ataque: Busco los nombres de las personas que viven en la casa y los investigo en Internet. Veo una de las víctimas en Linkedin y noto que es alumna de la especialidad de CEIoT en la UBA. Además, tiene un enlace a su Github (T1589 - Gather Victim Identity Information). Reviso los repositorios en Github y veo un repositorio público de un sistema IoT de temperatura y humedad que puede estar instalado en su casa. Analizo el código para identificar vulnerabilidades y veo que el sistema usa certificados autofirmados (T1595.002 - Active Scanning: Vulnerability Scanning).
Defensa: Limit User Privileges M1018
- **Descripción:** Restringir el acceso a información sensible solo a personas que realmente lo necesiten. En github, colocar repositorios críticos en modo privado con acceso solo a quienes corresponda.
- **Enlace:** [Limit User Privileges](https://attack.mitre.org/mitigations/M1018)



