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
    - UI loads and requests project options from `GET https://start.spring.io/metadata/client.`

2. Render Dynamic Form
    - UI displays available options (Boot version, dependencies, etc.) based on metadata.

3. User Configures Project
    - User selects values (name, groupId, version, dependencies, etc.).
    - UI updates browser URL with query parameters.

4. Generate & Download
    - UI builds a Spring Initializr URL and triggers ZIP download: `https://start.spring.io/starter.zip?....`

5. Export JSON Config
    - UI generates a JSON blueprint including a backlink (deep link).
    - User saves it using the OS save dialog.

6. Restore From Backlink
    - Opening the backlink pre-fills the UI with the same configuration.