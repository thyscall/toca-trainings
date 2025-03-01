# web-startup

### Elevator Pitch
I started training youth soccer players almost four years ago. I am excited to legitimize this business while strengthening the visibility that my players have on their growth. This website is in the process of becoming a platform where players can own their training progress in their accounts and have access to resources to help with the mental aspect of the beautiful game.

### Key Features
- Secure login over HTTPS
- Account creation and authentication
- Customize training content and length 
- Display training types and details
- View training session feedback in user account
- Web pages: Home, About Me, User Login & Account



### Use of Technology
- [X] HTML - Uses HTML for four pages:
  1. Home 
  2. Login 
  3. My Training History
  4. About Me 

- [X] CSS - Application styles that are adaptable to desktop and mobile devices, follow good UX design principles, and emphasize value of website.
- [ ] JavaScript – UI, interactivity, data authentication
- [ ] React - Provides login and display trainer feedback.
- [ ] Web Service - Backend service for:
  - user login
  - display trainer feedback
- [ ] Authentication - User account creation and identification
- [ ] Database Data/Login - Store the following information: 
  - user/player information (Name, email, age)
  - training date
  - performance evaluation 
- [ ] WebSocket Data - As a user completes a training, it is added to their training history


### HTML
- GitHub startup repository in web footer
- Notes in Git repository
- Git commits
- HTML pages for home, about, login, and myaccount pages
- Body, nav, main, header, footer on every page
- Links between pages in header on every page
- Text on each page
- 3rd party service calls on about page for Premier League Standings API
- Images included on home and about pages
- Login and username display on login page

### CSS
- Properly styled CSS navigation elements, header, footer, and main content body
- Responsive window resizing
- Properly styled CSS application elements, text content, and images

### React
- Bundled using Vite
- Multiple react components that implement or mock all app functionality
  1. Login component to mock service authentication
  2. About page random quote placeholder
  3. User training history table input logic on My Account page (must log in first)
- React router
- React hooks applied on login.jsx and app.jsx

### Startup Service Assignment Completion
- HTTP service using Node.js and Express
- Frontend server up using Express static middleware
- Frontend calls third party service endpoints: Premier League Table on About page
- Backend provides service endpoints
- Frontend calls your service endpoints

### Startup Login Assignment Completion (Login -> My Account page)
- New user registration
- Existing user authentication
- Stores application data in MongoDB
- Stores and retrieves credentials in MongoDB
- Restricts application functionality based upon authentification

### WebSocket  on Home page
- Backend listens for WebSocket connection
- Frontend makes WebSocket connection
- Data sent over WebSocket connection
- WebSocket data displayed in the application interface
