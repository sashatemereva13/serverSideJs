# Node.js REST API with Express — Lab Report

## Section 1 - Project Setup

### 1.1 Package.json & Nodemon

Nodemon is a development tool that automatically restarts your server when you save a file. It should be installed as a **dev dependency** — meaning it is only needed during development, not in production.

**Your task:** Explain in your own words the difference between a regular dependency and a dev dependency. Why does it matter?

**Answer:** regular dependencies are needed during production and development, both, while the dev dependencies are only necessary and useful during development - like the aforementioned Nodemon.

### 1.2 CommonJS vs ES Modules

Node.js supports two module systems. You may encounter both in the wild.

|        | CommonJS (old)           | ES Modules (new)                         |
| ------ | ------------------------ | ---------------------------------------- |
| Import | `const x = require('x')` | `import x from 'x'`                      |
| Export | `module.exports = x`     | `export default x`                       |
| Enable | Default in Node.js       | Add `"type": "module"` in `package.json` |

**Your task:** Which module system is your project using? How do you know?

**Answer:**: i changed the 'type' to 'module' inside json package, so i'm using the new system as 'import'.

## Section 2 — Your First Endpoints

### 2.1 How Express Handles a Request

When a client makes a request to your server, Express matches the URL and HTTP method to a route, then runs a callback function. That callback receives two objects: `req` (the incoming request) and `res` (the response you send back).

**Your task:** In your own words, what is a route? What is an endpoint?

**Answer:** route is a set of steps and rules that define the path the package takes when travelling between the browser and the server. it is composed of url, HTTP method and a callback function.
while endpoint is the address on the server that the client is calling in order to get some data.

### 2.2 Sending Responses & Status Codes

Every HTTP response includes a **status code** that tells the client whether the request succeeded or failed.

| Code  | Meaning               | When to use                             |
| ----- | --------------------- | --------------------------------------- |
| `200` | OK                    | Successful GET or PUT                   |
| `201` | Created               | Successful POST (something was created) |
| `400` | Bad Request           | The client sent invalid data            |
| `404` | Not Found             | The resource doesn't exist              |
| `500` | Internal Server Error | Something broke on the server           |

**Your task:** What status code does Express send by default if you don't set one? Is that always appropriate?

**Answer:** express sends 200 ok by default but in cases of 'bad request' or 'not found', the 200 won't be appropriate. for example, if there is no user with an id 2985794 but the return is 200ok and nothing instead of a json string.

## Section 3 — Serving Student Data

### 3.1 Loading Data from a JSON File

Before connecting a real database, it is common to use a local JSON file as a data source. Node.js can read and import JSON files directly.

**Your task:** How did you load the `students.json` file in your project? Did you use `require` or `import`? Paste the line of code here.

**Answer:**

```
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load data
const filePath = path.join(__dirname, "../students.json");
```

### 3.2 The GET /students Endpoint

Your server exposes a `/students` endpoint that returns the full list of students as a JSON response.

**Your task:** What does `res.json()` do differently from `res.send()`? Why do we prefer it for API responses?

**Answer:** res.json() sends json files specifically and so it converts the object into a json string by default. res.send() is a general purpose structure, but APIs are meant to communicate with frontend using json.

## Section 4 — CORS & Body Parser

### 4.1 What is CORS?

**CORS** (Cross-Origin Resource Sharing) is a browser security mechanism. When a web page running on one origin (e.g. `http://localhost:5500`) tries to fetch data from a different origin (e.g. `http://localhost:3000`), the browser blocks the request by default unless the server explicitly allows it.

This is a **browser restriction** — it does not affect Postman or server-to-server communication.

**Your task:** Before enabling CORS, open your `index.html` frontend in the browser and observe the error in the console. What does the error say?

**Answer:** by the time i'm answering this question, my cors is already set up, so i manually commented it out and the error in the brower is like this:

```
Access to fetch at 'http://localhost:3001/students' from origin 'http://127.0.0.1:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
script.js:4 GET http://localhost:3001/students net::ERR_FAILED 200 (OK)
fetchStudents @ script.js:4
displayStudents @ script.js:34
(anonymous) @ script.js:43
script.js:39 Error fetching students: TypeError: Failed to fetch
at fetchStudents (script.js:4:26)
at displayStudents (script.js:34:28)
at script.js:43:1
```

about the screenshot: The request returns a 200 OK status because the server successfully handled it. However, since CORS is not enabled, the browser blocks access to the response for security reasons. As a result, the frontend cannot read the data and throws a “Failed to fetch” error.


### 4.2 Enabling CORS

After installing and enabling the `cors` package, the browser will accept responses from your API.

**Your task:** Where in your `index.js` did you add `app.use(cors())`? Why does the order of middleware matter in Express?

**Answer:** both, cors() and express.json() must run before the routes that depend on it.
cors() adds special headers for the browser so it doesn't block requests, while express.json() parses req.body (otherwise the req.body is undefined).

### 4.3 Express Body Parser

To read data sent in the **body** of a POST or PUT request, Express needs a body parser. Since Express 4.16+, this is built in:

```jsx
app.use(express.json());
```

**Your task:** What happens if you forget to add `express.json()` and a client sends JSON in the request body? What would `req.body` contain?

**Answer:** req.body will return undefined because express will not aprse the JSON body of incoming requests.

---

###

## Section 5 — CRUD & HTTP Methods

### 5.1 The Four Operations

Every data-driven application is built around four fundamental operations: **Create, Read, Update, Delete** — known as **CRUD**. Each maps to an HTTP method.

| CRUD   | HTTP Method | Typical URL     | What it does                     |
| ------ | ----------- | --------------- | -------------------------------- |
| Read   | `GET`       | `/students`     | Retrieve a list or a single item |
| Create | `POST`      | `/students`     | Add a new item                   |
| Update | `PUT`       | `/students/:id` | Replace an existing item         |
| Delete | `DELETE`    | `/students/:id` | Remove an item                   |

### 5.2 Your Route Signatures

Below are the route signatures your API should define. You do not need to implement full logic yet — focus on the structure.

```
// GET all students
app.get('api/students', (req, res) => { /* ... */ })

// GET a single student by ID
app.get('api/students/:id', (req, res) => { /* ... */ })

// POST — create a new student
app.post('api/students', (req, res) => { /* ... */ })

// PUT — update a student by ID
app.put('api/students/:id', (req, res) => { /* ... */ })

// DELETE — remove a student by ID
app.delete('api/students/:id', (req, res) => { /* ... */ })
```

**Your task:** What is `:id` in the URL? How do you access it in your handler function?

**Answer:** id is the unique identification of every student in the database. to access it, for example, to find a student:

```
const getStudentById = (req, res) => students.find((s) => s.id === id);
```

**Your task:** For a POST request that successfully creates a new student, which status code should you return and why?

**Answer:** 201 created because it means a new resource was created, while 200 ok is just to signify the general request success

## Section 6 — Refactoring: Routes → Controllers → Services

### 6.1 Why We Split Files

As an application grows, keeping all logic in a single `index.js` becomes hard to read and maintain. We separate responsibilities into layers:

| Layer           | File                                | Responsibility                                  |
| --------------- | ----------------------------------- | ----------------------------------------------- |
| **Entry point** | `index.js`                          | Start the server, register middleware           |
| **Routes**      | `routes/students.js`                | Define URL patterns and HTTP methods            |
| **Controllers** | `controllers/studentsController.js` | Handle the request, call service, send response |
| **Services**    | `services/studentsService.js`       | Business logic, data access                     |

This separation means each file has **one job**. A route file does not know how data is fetched. A service file does not know anything about HTTP.

**Your task:** In your own words, what is the difference between a controller and a service? Give a concrete example from your project.

**Answer:** the controller handles HTTP communication, for ex, calls a service function to add a new student.
the service is responsible for the application logic - updates the data and writes it to the JSON file.

### 6.2 Target Folder Structure

After refactoring, your project should look like this:

```
project/
├── index.js
├── package.json
├── students.json
├── routes/
│   └── students.js
├── controllers/
│   └── studentsController.js
└── services/
    └── studentsService.js

```

## Section 7 — Debugging with the Network Tab

The browser's Network tab is one of the most useful debugging tools available to you. It shows every request your page makes and every response it receives.

### 7.1 What to Look For

| What                 | Where to find it                 | Why it matters                                  |
| -------------------- | -------------------------------- | ----------------------------------------------- |
| Request method & URL | Request Headers                  | Confirms the right endpoint was called          |
| Status code          | Status column / Response Headers | Tells you if the request succeeded              |
| Response body        | Response / Preview tab           | Shows what data was actually returned           |
| CORS headers         | Response Headers                 | `Access-Control-Allow-Origin` must be present   |
| Request body         | Payload tab                      | For POST/PUT — confirms data was sent correctly |

**Your task:** Describe a bug you encountered during this lab. How did the Network tab (or Postman) help you identify and fix it?

**Answer:** after refactoring, i forgot to change the paths in imports, so I completely lost the students data and had a white screen instead of students. I reloaded the page and looked at the Networks tab to see what has actually been downloaded and that made me realise what went wrong.
