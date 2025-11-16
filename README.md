# Proyecto Ruleta Online - Backend Node.js

API de backend para una ruleta de apuestas online usando Node.js, Express y MongoDB.

---

## 🔧 Requisitos

* Node.js >= 18
* MongoDB en funcionamiento
* npm o yarn

---

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno (`.env`):

```env
PORT=3000
BD_URL=mongodb://localhost:27017
JWT_SECRET=tu_secreto_jwt
```

4. Levantar el servidor:

```bash
npm run dev
```

---

## 🗂️ Endpoints

### 1. Usuarios

* **Crear usuario** (POST `/users/crear`)

```json
{
  "name": "Juan",
  "email": "juan@mail.com",
  "password": "123456",
  "role": "user"
}
```

**Response 201**

```json
{
  "mensaje": "Usuario creado correctamente"
}
```

* **Obtener todos los usuarios** (GET `/users/mostrar`)

**Response 200**

```json
{
  "mensaje": "Petición Exitosa",
  "data": [
    {
      "_id": "64f0c5...",
      "name": "Juan",
      "email": "juan@mail.com",
      "role": "user",
      "balance": 0
    }
  ]
}
```

* **Actualizar usuario** (PUT `/users/actualizar/:id`)

```json
{
  "name": "Juan Pérez",
  "password": "nueva123"
}
```

* **Eliminar usuario** (DELETE `/users/eliminar/:id`)

---

### 2. Login

* **Iniciar sesión** (POST `/login`)

```json
{
  "userLogin": "juan@mail.com",
  "passwordLogin": "123456"
}
```

**Response 200**

```json
{
  "mensaje": "Login exitoso!!",
  "token": "<TOKEN_JWT>",
  "_id": "64f0c5...",
  "role": "user"
}
```

> Guardar el token para las rutas protegidas en la cabecera `Authorization: Bearer <TOKEN_JWT>`

---

### 3. Ruletas

* **Crear ruleta** (POST `/ruletas`)

**Response 200**

```json
{
  "id": "64f0d5..."
}
```

* **Abrir ruleta** (PUT `/ruletas/open/:id`)

**Response 200**

```json
{
  "message": "Ruleta abierta"
}
```

* **Cerrar ruleta** (PUT `/ruletas/close/:rouletteId`)

**Response 200**

```json
{
  "message": "Ruleta cerrada",
  "winningNumber": 17,
  "winningColor": "negro",
  "results": [
    {
      "userId": "64f0c5...",
      "bet": 17,
      "result": "win",
      "payout": 5000
    },
    {
      "userId": "64f0c5...",
      "bet": "rojo",
      "result": "lose",
      "payout": 0
    }
  ]
}
```

* **Listar ruletas** (GET `/ruletas`)

**Response 200**

```json
[
  {
    "_id": "64f0d5...",
    "status": "open",
    "createdAt": "2025-11-16T14:00:00.000Z"
  }
]
```

---

### 4. Apuestas

* **Realizar apuesta** (POST `/apuestas/:rouletteId`)

```json
{
  "number": 17,
  "color": "rojo",
  "amount": 1000
}
```

> Puedes apostar a un **número** (0-36) o un **color** (`rojo` o `negro`). El monto máximo es 10.000.

**Response 200**

```json
{
  "message": "Apuesta registrada",
  "apuesta": {
    "_id": "64f0e5...",
    "rouletteId": "64f0d5...",
    "userId": "64f0c5...",
    "number": 17,
    "color": "rojo",
    "amount": 1000
  }
}
```

---

### 5. Reglas de la ruleta

* Números ganadores: 0-36, seleccionados aleatoriamente al cerrar la ruleta.
* Color ganador: números pares → rojo, números impares → negro.
* Multiplicadores:

  * Número correcto: x5
  * Color correcto: x1.8
* Si fallas, se pierde el monto apostado.

---

### 6. Notas importantes

* Todas las rutas protegidas requieren token JWT en `Authorization: Bearer <TOKEN>`.
* Solo usuarios con `role: user` pueden realizar apuestas.

---

### Autoría

Este proyecto fue desarrollado como material educativo para estudiantes de BIT +.
Autor: Duwa Alexander Rippe Amaya
GitHub: [Duwar](https://github.com/Duwar)
LinkedIn: [Perfil de LinkedIn](#)

¡Explora los ejemplos y adapta las soluciones a tus propios proyectos!
