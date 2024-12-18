<h3>Midterm Study Guide</h3>
<b>In the following code, what does the link element do? </b><br>
Link is used to define a relationship between HTML and an external resource. It most often connects HTML to an external CSS file.


<b>In the following code,  what does a div tag do?</b><br>
The div tag is used to group together other HTML elements. Often used to structure a web page by creating sections. 

    
<b>In the following code, what is the difference between the #title and .grid selector?</b><br>
The title selector targets an element with an ID title. .grid targets elements with the grid class. Hashtag is used for IDs and . is used for classes. IDs should be unique but classes can be used for more than one element. 

<b>In the following code, what is the difference between padding and margin?</b><br>
Padding: space between content and its border
Margin: space between outside of its border and other elements

<b>Given this HTML and this CSS how will the images be displayed using flex?</b><br>
Flexbox organizes elements in a flex row or column. Use additional properties to adjust spacing, alignment, etc. 

<b>What does the following padding CSS do?</b><br>
First padding px: top and bottom
Second padding px: left and right

<b>What does the following code using arrow syntax function declaration do?</b><br>
JavaScript arrows: shorthand to define functions, shows what to return

<b>What does the following code using map with an array output?</b><br>
Map method creates a new array by applying a given function to each element of the orginal array. 

<b>What does the following code output using getElementByID and addEventListener?</b><br>
Read functions. Buttons' function will run when clicked. 

<b>What does the following line of Javascript do using a # selector?</b><br>
Hashtag plus an ID indiactes which element to manipulate

<b>Which of the following are true? (mark all that are true about the DOM)</b><br>
DOM means Document Object Model. Acts like a tree of objects. 

<b>By default, the HTML span element has a default CSS display property value of: </b><br>
Span is inline by defualt, only takes up as much width as its content. 

<b>How would you use CSS to change all the div elements to have a background color of red?</b><br>
div then squiggle brackets background-color: red;

<b>How would you display an image with a hyperlink in HTML?</b><br>
<a href=""https://example.com">
  <img src="image.jpg" alt="Description">
</a>

<b>In the CSS box model, what is the ordering of the box layers starting at the inside and working out?</b><br>
From inside: content, padding, border, margin. 

<b>Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?</b><br>
Something in the CSS like: .trouble { color: green; }

<b>What will the following code output when executed using a for loop and console.log?</b><br>
For loop iterates over a list of values and changes each value one by one. 

<b>How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?</b><br>
document.getElementById('byu').style.color = 'green';

<b>What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?</b><br>
Opening HTML tags (without <>)<br>
Paragraph: p<br>
Ordered List: ol<br>
Unordered List: ul<br>
Second Level Heading: h2<br>
First Level Heading: h1<br>
Third Level Heading: h3<br>

<b>How do you declare the document type to be html?</b><br>
<!DOCTYPE html>

<b>What is valid javascript syntax for if, else, for, while, switch statements?</b><br>
If/else:<br>
if (condition) {<br>
  // code<br>
} else {<br>
  // code<br>
}<br>

for:<br>
for (let i = 0; i < 10; i++) {<br>
  // code<br>
}<br>

while:<br>
while (condition) {<br>
  // code<br>
}<br>

switch:<br>
switch (value) {<br>
  case 'a':<br>
    // code<br>
    break;<br>
  default:<br>
    // code<br>
}<br>

<b>What is the correct syntax for creating a javascript object?</b><br>
const obj = {<br>
  key: 'value',<br>
  anotherKey: 42<br>
};<br>

<b>Is it possible to add new properties to javascript objects?</b><br>
Yes

<b>If you want to include JavaScript on an HTML page, which tag do you use?</b><br>
use the <script> tag

<b>Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?</b><br>
document.getElementById('animal').textContent = 'crow';<br>

<b>Which of the following correctly describes JSON?</b><br>
A lightweight data-interchange format that's easy to read and write. used for transferring data between a server and web app. 

<b>What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?</b><br>
chmod: Changes file permissions.<br>
pwd: Prints the current working directory.<br>
cd: Changes the directory.<br>
ls: Lists files in a directory.<br>
vim/nano: Text editors.<br>
mkdir: Creates a new directory.<br>
mv: Moves or renames files.<br>
rm: Removes files or directories.<br>
man: Displays the manual for a command.<br>
ssh: Connects to a remote server via SSH.<br>
ps: Displays running processes.<br>
wget: Downloads files from the web.<br>
sudo: Executes a command as a superuser.<br>

<b>Which of the following console command creates a remote shell session?</b><br>
ssh

<b>Which of the following is true when the -la parameter is specified for the ls console command?</b><br>
ls -la lists all files and their details. Hidden files are included. 

<b>Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?</b><br>
click is the top-level domain<br>
bozo is the root domain<br>
banana.fruit would be the subdomain<br>

<b>Is a web certificate is necessary to use HTTPS.</b><br>
Yes

<b>Can a DNS A record can point to an IP address or another A record.</b><br>
DNS A records point to an IP address, not another A record. 

<b>Port 443, 80, 22 is reserved for which protocol?</b><br>
Port 443: HTTPS.<br>
Port 80: HTTP.<br>
Port 22: SSH.<br>

<b>What will the following code using Promises output when executed?</b><br>
Promises in JavaScript are used to handle asynchronous operations. Depending on the code provided, it could resolve successfully or fail (rejected), and the output would be logged accordingly.


<h3>Final Exam Study Guide</h3>
<br><br>
What is the default port for HTTP/HTTPS/SSH? 
<ul>
    <li>HTTP (port 80) is the standard unencrypted web communication protocol, using TCP/IP for transmitting hypertext documents between web servers and clients.</li>
    <li>HTTPS (port 443) uses SSL/TLS encryption, adding a secure layer to HTTP communications, preventing man-in-the-middle attacks and data interception.</li>
    <li>SSH (port 22) provides encrypted remote access and network services, using public-key cryptography for secure authentication and data transmission between networked devices.</li>
</ul>

<pre><code>
// HTTP Server Example
const http = require('http');
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Standard HTTP Connection');
});
httpServer.listen(80);

// HTTPS Server Example
const https = require('https');
const fs = require('fs');
const httpsServer = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Secure HTTPS Connection');
});
httpsServer.listen(443);

// SSH Connection Example
const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Connection established on port 22');
}).connect({
  host: 'example.com',
  port: 22,
  username: 'user',
  password: 'password'
});
</code></pre>
<br><br>
What does an HTTP status code in the range of 300/400/500 indicate?
<ul>
    <li>300-range (Redirection) indicates the client must take additional action to complete the request, such as using an alternate URL or caching mechanism.</li>
    <li>400-range (Client Errors) signifies problems originating from the client-side, including authentication failures, resource not found, or malformed request syntax.</li>
    <li>500-range (Server Errors) represents internal server problems, such as unexpected conditions preventing request fulfillment, database connection failures, or server-side processing errors.</li>
</ul>

<pre><code>
// Express.js Status Code Examples
app.get('/redirect', (req, res) => {
  // 300 Range - Redirection
  res.status(301).redirect('/new-location');
});

app.get('/user', (req, res) => {
  // 400 Range - Client Errors
  if (!req.user) {
    res.status(404).json({ error: 'User not found' });
  }
  if (!req.permissions) {
    res.status(403).json({ error: 'Forbidden' });
  }
});

app.get('/server-error', (req, res) => {
  // 500 Range - Server Errors
  try {
    // Simulated server error
    throw new Error('Internal Server Problem');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
</code></pre>
<br><br>
What does the HTTP header content-type allow you to do?
<ul>
    <li>Content-Type enables precise specification of media representation, allowing browsers and servers to correctly interpret and process transmitted data.</li>
    <li>Different MIME types signal how incoming data should be parsed: application/json for structured data exchange, text/html for web documents, multipart/form-data for file uploads.</li>
    <li>The header prevents ambiguity in data interpretation, enabling proper decoding and rendering of transmitted content across different platforms and applications.</li>
</ul>

<pre><code>
// Sending different content types
app.get('/json-data', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({ name: 'John', age: 30 });
});

app.post('/upload', (req, res) => {
  res.set('Content-Type', 'multipart/form-data');
  // File upload handling
});

app.get('/html-content', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('<html><body>Hello World</body></html>');
});
</code></pre>
<br><br>
What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
<ul>
    <li>Secure Cookies are exclusively transmitted over HTTPS, preventing interception by blocking transmission on unencrypted HTTP connections.</li>
    <li>Http-only Cookies cannot be accessed by client-side JavaScript, mitigating cross-site scripting (XSS) attacks by preventing malicious script access to sensitive session tokens.</li>
    <li>Same-site Cookies restrict cookie transmission to same-origin requests, protecting against cross-site request forgery (CSRF) by preventing unauthorized cross-origin cookie usage.</li>
</ul>

<pre><code>
// Secure Cookie Example
res.cookie('session', 'token123', {
  secure: true,      // Only sent over HTTPS
  httpOnly: true,    // Inaccessible to client-side scripts
  sameSite: 'strict' // Restricts cross-site sending
});

// Detailed Cookie Configuration
app.use(cookieSession({
  name: 'session',
  keys: ['secret1', 'secret2'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'strict'
}));
</code></pre>
<br><br>
Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
// Middleware Example
function logMiddleware(req, res, next) {
  console.log(`Path: ${req.path}`);
  next();
}

app.use(logMiddleware);
app.get('/api/document', (req, res) => {
  res.send('Document Route');
});

// Exam Answer: Console will log "/api/document"
<br><br>
Given the following Express service code: What does the following front end JavaScript that performs a fetch return?
// Backend Express Service
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

// Frontend Fetch
fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    // Exam Answer: Returns array of user objects
    // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    console.log(data);
  });
<br><br>
Given the following MongoDB query, select all of the matching documents {name:Mark}
<ul>
    <li>This exact match query uses strict equality comparison, returning documents where the "name" field precisely matches the string "Mark".</li>
    <li>The query employs a filter object in MongoDB's find() method, utilizing index-based lookups for efficient document retrieval.</li>
    <li>Case-sensitive by default, this query differentiates between "Mark", "mark", and "MARK" as distinct values.</li>
</ul>

<pre><code>
// Exact Match Query
db.users.find({ name: "Mark" })

// More Complex Queries
db.users.find({ 
  name: "Mark", 
  age: { $gte: 25 },
  status: "active"
})

// Projection and Limits
db.users.find(
  { name: "Mark" },
  { name: 1, email: 1 }
).limit(5)
</code></pre>
<br><br>
How should user passwords be stored?
<ul>
    <li>Passwords must never be stored in plain text due to significant security vulnerabilities.</li>
    <li>Cryptographic hashing algorithms like bcrypt implement key stretching, adding computational complexity to prevent rapid brute-force attacks.</li>
    <li>Salting introduces unique, random data to each password hash, ensuring that identical passwords generate different hash values and mitigating rainbow table attacks.</li>
</ul>

<pre><code>
const bcrypt = require('bcrypt');

// Password Hashing
async function hashPassword(password) {
  const saltRounds = 12; // Recommended complexity
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

// Password Verification
async function verifyPassword(inputPassword, storedHash) {
  return bcrypt.compare(inputPassword, storedHash);
}
</code></pre>
<br><br>
Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?
// Backend WebSocket (Node.js)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.send('Server says hello');
  
  ws.on('message', (message) => {
    ws.send(`Server received: ${message}`);
  });
});

// Frontend WebSocket
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  socket.send('Client hello');
};

socket.onmessage = (event) => {
  console.log(event.data);  // Exam Answer: 
  // First log: "Server says hello"
  // Second log: "Server received: Client hello"
};
<br><br>
What is the websocket protocol intended to provide?
<ul>
    <li>WebSockets provide full-duplex, bidirectional communication channels over a single TCP connection, enabling real-time data exchange between clients and servers.</li>
    <li>Unlike HTTP's request-response model, WebSockets maintain persistent connections, reducing overhead and latency for interactive applications.</li>
    <li>The protocol uses an initial HTTP handshake to establish the connection, then upgrades to a WebSocket connection for continuous, low-latency communication.</li>
</ul>
<br>
<pre><code>
// Server-side (Node.js with ws)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.send('Server says hello');
  
  ws.on('message', (message) => {
    ws.send(`Server received: ${message}`);
  });
});

// Client-side
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  socket.send('Client hello');
};

socket.onmessage = (event) => {
  console.log(event.data);
};
</code></pre>
<br><br>
What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM<br>
JSX: JavaScript XML, a syntax extension for React enabling declarative UI component creation by embedding HTML-like code directly within JavaScript.<br>
JS: Dynamically typed, prototype-based programming language supporting multiple programming paradigms, primarily used for client-side and server-side web development.<br>
AWS: Cloud computing platform providing scalable infrastructure services, including compute, storage, databases, and machine learning tools.<br>
NPM: Node Package Manager, the largest software registry facilitating package installation, version management, and dependency resolution for JavaScript projects.<br>
NVM: Node Version Manager, a tool allowing developers to install and switch between multiple Node.js runtime versions seamlessly.<br>
<br>
<br>
Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.<br>
// Scenario 1: Simple Parameter Rendering
function Greeting({ name, age }) {
  return <p>Hello, {name}! You are {age} years old.</p>;
}
// Exam Answer: Renders "Hello, John! You are 25 years old."

// Scenario 2: Conditional Rendering
function UserStatus({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn 
        ? `Welcome back, ${username}!` 
        : 'Please log in'}
    </div>
  );
}
// Exam Answer: Renders "Welcome back, Sarah!" or "Please log in"

// Scenario 3: Nested Object Parameters
function ProfileCard({ user: { name, email, age } }) {
  return (
    <div>
      {name} - {email} - {age}
    </div>
  );
}
// Exam Answer: Renders "John Doe - john@example.com - 30"
<br><br>
Given a set of React components that include each other, what will be generated
// Parent Component
function ParentComponent() {
  return (
    <div>
      <ChildComponent />
      <SiblingComponent />
    </div>
  );
}

// Nested Components
function ChildComponent() {
  return (
    <div>
      <GrandchildComponent />
    </div>
  );
}

function SiblingComponent() {
  return <h2>Sibling Content</h2>;
}

function GrandchildComponent() {
  return <p>Deeply Nested Content</p>;
}

// Exam Answer: Generated DOM will include:
// <div>
//   <div>
//     <p>Deeply Nested Content</p>
//   </div>
//   <h2>Sibling Content</h2>
// </div>
<br><br>
What does a React component with React.useState do?
Introduces state management in functional components without converting to class-based components.<br>
Returns an array containing the current state value and a setter function, enabling immutable state updates and triggering component re-renders.<br>
Supports complex state management through functional updates and can handle primitive and object-based state representations.<br>
<br><br>
What are React Hooks used for?
Hooks solve issues with class component complexity by enabling state and lifecycle features in functional components.<br>
Promote code reuse through custom hooks, allowing extraction and sharing of stateful logic across multiple components.<br>
Simplify component composition and reduce boilerplate code compared to traditional class component implementations.<br>
<br><br>
What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks<br>
useState: Manages component-level state, providing reactive updates and re-rendering capabilities.<br>
useContext: Enables consumption of React Context API, facilitating global state management without prop drilling.<br>
useRef: Creates mutable references persisting across component re-renders, useful for accessing DOM elements and storing mutable values.<br>
useEffect: Handles side effects in functional components, replacing lifecycle methods like componentDidMount and componentDidUpdate.<br>
useMemo/useCallback: Optimize performance by memoizing computed values and preventing unnecessary re-renders.<br>
I'll provide a comprehensive explanation of each React Hook with examples and their specific use cases:

1. State Hook (useState):
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
- Adds state to functional components
- Returns an array with two elements: current state value and a setter function
- Allows component to have mutable state without converting to a class component
- Can store primitive values or complex objects
- Triggers re-render when state changes
- Supports functional updates for complex state modifications

2. Context Hook (useContext):
```javascript
// Create a context
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```
- Allows functional components to consume context without nesting
- Simplifies accessing shared data across component tree
- Eliminates prop drilling
- Provides a way to pass data through component tree without manually passing props
- Enables global state management for themes, authentication, etc.

3. Ref Hook (useRef):
```javascript
function TextInputWithFocusButton() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    // Directly access DOM element
    inputRef.current.focus();
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}
```
- Creates mutable references that persist across component re-renders
- Useful for:
  - Accessing DOM elements directly
  - Storing mutable values without causing re-renders
  - Keeping references to timers, intervals, or other non-rendering values
- Value is stored in `.current` property
- Doesn't trigger re-render when value changes

4. Effect Hook (useEffect):
```javascript
function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Side effect: Fetch data when component mounts
    fetch('/api/data')
      .then(response => response.json())
      .then(result => setData(result));
    
    // Cleanup function (optional)
    return () => {
      // Cancel subscriptions, clear timers, etc.
    };
  }, []); // Empty dependency array means effect runs once on mount
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```
- Performs side effects in functional components
- Replaces lifecycle methods like componentDidMount, componentDidUpdate
- Can:
  - Fetch data
  - Set up subscriptions
  - Manually change DOM
  - Handle timers and intervals
- Supports optional cleanup function
- Dependency array controls when effect runs

5. Performance Hooks (useMemo and useCallback):
```javascript
function ExpensiveComputation() {
  const [count, setCount] = useState(0);
  
  // Memoize expensive computation
  const expensiveResult = useMemo(() => {
    return computeExpensiveValue(count);
  }, [count]);
  
  // Memoize callback to prevent unnecessary re-renders
  const incrementHandler = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <div>
      <p>Computed Result: {expensiveResult}</p>
      <button onClick={incrementHandler}>Increment</button>
    </div>
  );
}
```
- `useMemo`: Memoizes computed values
  - Prevents unnecessary recalculations
  - Optimizes performance for complex computations
  - Runs only when dependencies change

- `useCallback`: Memoizes function definitions
  - Prevents unnecessary function recreations
  - Useful in optimizing child component re-renders
  - Maintains function reference between renders

Key Exam Preparation Tips:
- Understand the purpose of each hook
- Know when and how to use them
- Recognize performance implications
- Practice implementing hooks in various scenarios
- Understand dependency arrays and their impact

Common Mistakes to Avoid:
- Forgetting dependency arrays in useEffect
- Overusing refs
- Creating unnecessary re-renders
- Misunderstanding hook rules (only call at top level, only in functional components)

Would you like me to elaborate on any specific aspect of these React Hooks?
<br><br>
Given React Router code, select statements that are true.
// Exam Tip: Know these common React Router patterns
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* True statements include: */}
      {/* 1. Switch renders only the first matching route */}
      {/* 2. Route path can be exact or partial */}
      {/* 3. Link creates client-side navigation without page reload */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Link to="/contact">Contact</Link>
      </Switch>
    </BrowserRouter>
  );
}
<br><br>
What does the package.json file do?
Serves as the manifest file for Node.js projects, defining metadata, dependencies, scripts, and configuration parameters.<br>
Enables precise dependency management through version specification, supporting semantic versioning for package compatibility.<br>
Provides script definitions for build, test, start, and deployment processes, standardizing project workflow across different development environments.<br>
<br><br>
What does the fetch function do?
Provides a modern, Promise-based API for making asynchronous network requests, replacing older XMLHttpRequest methods.<br>
Supports multiple HTTP methods (GET, POST, PUT, DELETE) with configurable headers, request bodies, and response handling.<br>
Implements native promise chaining and error handling, enabling more readable and maintainable AJAX interactions.<br>
<br><br>
What does node.js do?
Server-side JavaScript runtime built on Chrome's V8 JavaScript engine, enabling non-blocking, event-driven architecture.<br>
Provides comprehensive built-in modules for file system access, networking, cryptography, and stream processing.<br>
Supports npm ecosystem, facilitating extensive third-party package integration and modular application development.<br>
<br><br>
What does pm2 do?
Advanced Node.js process manager providing clustering, load balancing, and automatic application recovery.<br>
Enables zero-downtime deployments, log management, and performance monitoring for production Node.js applications.<br>
Supports process scaling across multiple CPU cores and provides detailed application metrics.<br>
<br><br>
What does Vite do?<br>
Modern frontend build tool leveraging native ES modules for rapid development and builds.<br>
Provides instant server start, lightning-fast hot module replacement (HMR), and optimized production builds.<br>
Supports multiple frameworks (React, Vue, Svelte) with out-of-the-box configuration and extensible plugin system.<br>