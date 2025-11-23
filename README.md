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
    - UI loads and requests project options from `GET https://start.spring.io/metadata/client.` (GET, Accept: application/vnd.initializr.v2.3+json)

2. Render Dynamic Form
    - UI displays available options (Boot version, dependencies, etc.) based on metadata.

3. User Configures Project
    - User selects values (name, groupId, version, dependencies, etc.).
    - UI updates browser URL with query parameters.

4. Generate & Download
    - On Generate Button Click: UI builds a Spring Initializr URL and triggers ZIP download: `https://start.spring.io/starter.zip?....` (GET, Accept: application/vnd.initializr.v2.3+json)

5. Export JSON Config
    - UI generates a JSON blueprint including a backlink (deep link).
    - User saves it using the OS save dialog.

6. Restore From Backlink
    - Opening the backlink pre-fills the UI with the same configuration.


## External APIs & Contracts

3.1 Metadata API
    - Endpoint: GET `https://start.spring.io/metadata/client`
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

3.2 ZIP Generator API
    - Base: `https://start.spring.io/starter.zip`
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
#### 📦 On “Generate” Button Click:
1. Build query string from the current form state
2. Construct ZIP URL:  
   `https://start.spring.io/starter.zip?${queryString}`
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