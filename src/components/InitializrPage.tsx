import { useState, useEffect } from "react";
import { InitializrMetadata } from "../types/initializrMetadata";
import { ProjectConfig } from "../types/projectConfig";
import { fetchInitializrMetadata } from "../api/initializrClient";
import { useProjectConfig } from "../hooks/useProjectConfig";
import { ProjectBasicsForm } from "./ProjectBasicsForm";
import { ProjectMetadataForm } from "./ProjectMetadataForm";
import { DependencySelector } from "./DependencySelector";
import { SummaryPanel } from "./SummaryPanel";
import { GenerateButtons } from "./GenerateButtons";

export function InitializrPage() {
  const { config, setConfig } = useProjectConfig();
  const [metadata, setMetadata] = useState<InitializrMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMetadata() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInitializrMetadata();
        setMetadata(data);
        
        // Set default boot version if not set
        if (!config.bootVersion && data.bootVersion.default) {
          setConfig({ bootVersion: data.bootVersion.default });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load metadata");
      } finally {
        setLoading(false);
      }
    }
    loadMetadata();
  }, []);

  const handleConfigChange = (updates: Partial<ProjectConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading metadata...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Metadata</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!metadata) {
    return null;
  }

  return (
    <div className="initializr-container">
      <header className="app-header">
        <h1>Custom Spring Initializr</h1>
        <p>Generate Spring Boot starter projects</p>
      </header>

      <div className="main-content">
        <div className="form-container">
          <ProjectBasicsForm
            config={config}
            metadata={metadata}
            onChange={handleConfigChange}
          />
          
          <ProjectMetadataForm
            config={config}
            onChange={handleConfigChange}
          />
          
          <DependencySelector
            config={config}
            metadata={metadata}
            onChange={handleConfigChange}
          />
          
          <GenerateButtons config={config} />
        </div>

        <div className="sidebar">
          <SummaryPanel config={config} />
        </div>
      </div>
    </div>
  );
}

