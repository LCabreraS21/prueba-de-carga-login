# Prueba de Carga del Servicio de Login con k6

## Descripción
Este proyecto contiene la resolución de un ejercicio de prueba de carga para el servicio de login de `https://fakestoreapi.com`. El objetivo es alcanzar una tasa de 20 transacciones por segundo (TPS) y validar el comportamiento del servicio bajo carga.

## Requisitos de Ejecución
- **Herramienta de Prueba**: k6 v0.48.0 (se recomienda usar la última versión disponible).
- **Entorno de Ejecución**: Node.js (opcional, si se requiere para algún pre-procesamiento).

## Estructura del Proyecto
- `login_test.js`: Script de k6 con la lógica de la prueba.
- `users.csv`: Archivo de datos parametrizados para las credenciales.
- `conclusiones.txt`: Archivo con los hallazgos y conclusiones de la prueba.

## Instrucciones de Ejecución
1.  Asegúrate de tener k6 instalado.
2.  Abre una terminal en la raíz del proyecto.
3.  Ejecuta el siguiente comando:
    ```bash
    k6 run login_test.js
    ```