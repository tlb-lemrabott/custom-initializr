src/
  api/
    initializrClient.ts     // fetch metadata, build starter URLs
  hooks/
    useProjectConfig.ts     // main form state + URL sync
  components/
    InitializrPage.tsx      // page container
    ProjectBasicsForm.tsx   // type, language, boot, Java, packaging...
    ProjectMetadataForm.tsx // groupId, artifactId, name, description, packageName
    DependencySelector.tsx  // categories & checkboxes
    SummaryPanel.tsx        // shows assembled URL & JSON preview
    GenerateButtons.tsx     // Generate ZIP + Download JSON
  types/
    initializrMetadata.ts   // metadata types
    projectConfig.ts        // ProjectConfig type
  router/
    AppRouter.tsx
  App.tsx
  main.tsx
