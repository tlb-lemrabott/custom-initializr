# Custom Spring Initializr Web UI

## Description:
A custom React-based Spring Initializr client that fetches real-time metadata from https://start.spring.io to generate Spring Boot starter projects. It allows users to configure project settings, preview the generated URL, download the starter ZIP, and export a shareable JSON config with a deep-link to recreate the same project setup.

## Key Value
- Dynamic UI driven by Initializr metadata.
- Generates Spring Boot starter ZIP via query parameters.
- Exports configuration as a downloadable JSON file.
- Backlink support to restore saved project options instantly.
- URL-synced form enables sharing reproducible project templates.


## 🔄 Process Workflow
1. Fetch Metadata
    - UI loads and requests project options from `GET http://localhost:8080/api/initializr/metadata` (GET, Accept: application/vnd.initializr.v2.3+json)
    - This endpoint proxies to the Spring Initializr API

2. Render Dynamic Form
    - UI displays available options (Boot version, dependencies, etc.) based on metadata.

3. User Configures Project
    - User selects values (name, groupId, version, dependencies, etc.).
    - UI updates browser URL with query parameters.

4. Generate & Download
    - On Generate Button Click: UI builds a Spring Initializr URL and triggers ZIP download: `http://localhost:8080/api/initializr/starter.zip?....` (GET, Accept: application/vnd.initializr.v2.3+json)
    - This endpoint proxies to the Spring Initializr ZIP generation API

5. Export JSON Config
    - UI generates a JSON blueprint including a backlink (deep link).
    - User saves it using the OS save dialog.

6. Restore From Backlink
    - Opening the backlink pre-fills the UI with the same configuration.


## External APIs & Contracts

**Note:** The application uses a proxy server running on `localhost:8080` to communicate with the Spring Initializr API. Make sure the proxy server is running before using the application.

### 3.1 Metadata API
    - Endpoint: GET `http://localhost:8080/api/initializr/metadata`
    - Headers:
        - Accept: application/vnd.initializr.v2.3+json
        - Content-Type: application/json (for completeness, not strictly required for GET)

    - Purpose: Get all options for:
        - Project type (maven-project, gradle-project, …)
        - Language (java, kotlin, …)
        - Packaging (jar, war)
        - Boot versions
        - Java versions
        - Dependencies (grouped by categories)
        - etc.

### 3.2 ZIP Generator API
    - Base: `http://localhost:8080/api/initializr/starter.zip`
    - Method: GET
    - Headers:
        - Accept: application/vnd.initializr.v2.3+json
        - Content-Type: application/json (for completeness, not strictly required for GET)
        - Query parameters:
            Example:
                ```text
                type=maven-project
                &language=java
                &bootVersion=3.4.1
                &baseDir=demo
                &groupId=com.example
                &artifactId=demo
                &name=demo
                &description=Demo%20project
                &packageName=com.example.demo
                &packaging=jar
                &javaVersion=17
                &configurationFileFormat=yaml
                &dependencies=web,data-jpa
                ```

---

## Functional Requirements

### 🔄 Load Metadata on App Load
1. Load metadata on app load
    - Fetch metadata from /metadata/client.
    - Handle loading / error states.

2. Render dynamic form
    - Dropdown for Project Type, Language, Boot Version, Packaging, Java Version, Configuration Format, etc. 
    - Text inputs for groupId, artifactId, name, description, baseDir, packageName.
    - Dependency picker:
        - Show categories
        - Allow selecting multiple dependencies (store as codes: web, data-jpa, etc.).

3. URL Synchronization
> Keep the UI state mirrored in the browser URL.

- Path: `/starter-client`
- Query params mirror all form fields:
  - `type`, `language`, `bootVersion`, `groupId`, `packageName`, `dependencies`, etc.

#### ⏳ On First Load:
- Parse URL query params
- Pre-fill the form with them

#### 🔄 On Every Change:
- Update query params via `history.pushState` or `navigate` (React Router) without reload.

4. Generate Project
#### 📦 On "Generate" Button Click:
1. Build query string from the current form state
2. Construct ZIP URL:  
   `http://localhost:8080/api/initializr/starter.zip?${queryString}`
3. Trigger download:
   - Using a hidden `<a href={url} download>` clicked programmatically, **or**
   - `fetch → blob → createObjectURL → download`

#### 📑 Also build JSON Config 
Build JSON config file to be downloaded after user click on Download JSON Config file 
Example:
```json
{
  "type": "maven-project",
  "language": "java",
  "bootVersion": "3.4.2",
  "name": "orders-service",
  "configurationFileFormat": "yaml",
  "dependencies": ["web", "data-jpa"],
  "groupId": "com.example",
  "artifactId": "orders-service",
  "packageName": "com.example.orders",
  "javaVersion": "17",
  "packaging": "jar",
  "baseDir": "orders-service",
  "description": "Orders service project",
  "backlink": "http://localhost:3000/starter-client?type=maven-project&language=java&bootVersion=3.4.2&..."
}

5. Backlink behavior
    - When a user opens the backlink URL:
    - The React app parses query params.
    - Pre-fills the form with those values.
    - User sees same configuration ready to re-generate.

---

## Non-Functional Requirements
- **Responsiveness:** Clean layout on desktop and laptop (you can start simple, then optimize).
- **Performance:** Metadata loaded once and cached in state.
- **Resilience:** 
    - Handle metadata fetch errors (show message & retry button).
    - Validate required fields before enabling Generate.
- **Code quality:**
    - Modular React components.
    - Clear types/interfaces (prefer TypeScript if you can).

---

## Dependencies

### Runtime Dependencies
- **react** (^18.2.0) - React library for building user interfaces
- **react-dom** (^18.2.0) - React DOM renderer
- **react-router-dom** (^6.20.0) - React Router for client-side routing and URL synchronization

### Development Dependencies
- **typescript** (^5.2.2) - TypeScript compiler and type checking
- **vite** (^5.0.8) - Fast build tool and development server
- **@vitejs/plugin-react** (^4.2.1) - Vite plugin for React support
- **@types/react** (^18.2.43) - TypeScript type definitions for React
- **@types/react-dom** (^18.2.17) - TypeScript type definitions for React DOM
- **eslint** (^8.55.0) - JavaScript/TypeScript linter
- **@typescript-eslint/parser** (^6.14.0) - ESLint parser for TypeScript
- **@typescript-eslint/eslint-plugin** (^6.14.0) - ESLint plugin for TypeScript
- **eslint-plugin-react-hooks** (^4.6.0) - ESLint rules for React hooks
- **eslint-plugin-react-refresh** (^0.4.5) - ESLint plugin for React Fast Refresh

---

## How to Run the Project

### Prerequisites
- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

### Step 1: Start Proxy Server
**Important:** The application requires a proxy server running on `localhost:8080`. Make sure your proxy server is running before starting the frontend application.

The proxy should handle:
- `GET http://localhost:8080/api/initializr/metadata` → proxies to Spring Initializr metadata API
- `GET http://localhost:8080/api/initializr/starter.zip?params` → proxies to Spring Initializr ZIP generation API

### Step 2: Install Dependencies
Navigate to the project directory and install all required dependencies:

```bash
cd custom-initializr
npm install
```

This will install all runtime and development dependencies listed in `package.json`.

### Step 3: Start Development Server
Run the development server with hot-reload:

```bash
npm run dev
```

The application will start and you should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to **http://localhost:5173** (or the URL shown in the terminal).

The app will automatically reload when you make changes to the code.

### Step 4: Access the Application
- **Main route**: http://localhost:5173/starter-client
- **Root route**: http://localhost:5173/ (also works)

### Available Scripts

#### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR).

#### Build for Production
```bash
npm run build
```
Compiles TypeScript and builds the production-ready bundle in the `dist/` directory.

#### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing (run `npm run build` first).

#### Lint Code
```bash
npm run lint
```
Runs ESLint to check for code quality issues.

### Troubleshooting

**Port already in use?**
If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

**Dependencies not installing?**
- Make sure you have Node.js 18+ installed: `node --version`
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- Clear npm cache: `npm cache clean --force`

**TypeScript errors?**
- Run `npm run build` to see all TypeScript compilation errors
- Make sure all dependencies are installed: `npm install`

**Proxy server not running?**
- Make sure the proxy server is running on `localhost:8080`
- Check that the proxy endpoints are accessible:
  - `http://localhost:8080/api/initializr/metadata`
  - `http://localhost:8080/api/initializr/starter.zip`
- The frontend will show an error if it cannot connect to the proxy

**CORS issues?**
- The proxy server should handle CORS headers. If you encounter CORS errors, check your proxy server configuration.

---