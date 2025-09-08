import http from 'k6/http';
import { check } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Carga los datos desde el archivo CSV.
const csvData = open('users.csv');
const users = papaparse.parse(csvData, { header: true }).data;

// Configura las opciones de la prueba
export const options = {
  scenarios: {
    constant_tps_scenario: {
      executor: 'constant-arrival-rate',
      rate: 20, // 20 peticiones por segundo
      timeUnit: '1s',
      duration: '3m', // Duración de 3 minutos
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
  thresholds: {
    'http_req_duration{status:200}': ['p(95)<1500'],
    'http_req_failed': ['rate<0.85'],
    'checks': ['rate>0'],
  },
};

// Función principal de la prueba
export default function () {
  if (users.length === 0) {
    console.error('El archivo CSV está vacío o no se pudo leer correctamente.');
    return;
  }
  
  const user = users[Math.floor(Math.random() * users.length)];

  const url = 'https://fakestoreapi.com/auth/login';
  const payload = JSON.stringify({
    username: user.user,
    password: user.passwd,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      name: 'Login_API_Test',
    },
  };

  const res = http.post(url, payload, params);

  // La validación.
  check(res, {
    'login exitoso y tiene token': (r) => {
      try {
        const body = r.json();
        return r.status === 200 && body && body.hasOwnProperty('token');
      } catch (e) {
        return false; // Fallo si la respuesta no es un JSON válido
      }
    },
    'login fallido y no tiene token': (r) => {
      try {
        const body = r.json();
        return r.status !== 200 && body && !body.hasOwnProperty('token');
      } catch (e) {
        // Esto captura casos donde la respuesta no es JSON, como un 404 HTML
        return r.status !== 200;
      }
    },
  });
}