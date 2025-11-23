import { ProjectConfig } from "../types/projectConfig";
import { buildStarterZipUrl, downloadZip, downloadJsonConfig } from "../api/initializrClient";

interface GenerateButtonsProps {
  config: ProjectConfig;
}

export function GenerateButtons({ config }: GenerateButtonsProps) {
  const handleGenerateZip = () => {
    if (!config.bootVersion) {
      alert("Please select a Spring Boot version");
      return;
    }
    const url = buildStarterZipUrl(config);
    downloadZip(url, `${config.artifactId || "starter"}.zip`);
  };

  const handleDownloadJson = () => {
    const jsonConfig = {
      ...config,
      backlink: window.location.href,
    };
    downloadJsonConfig(jsonConfig, `${config.artifactId || "project"}-config.json`);
  };

  const isGenerateDisabled = !config.bootVersion;

  return (
    <div className="generate-buttons">
      <button
        className="btn btn-primary"
        onClick={handleGenerateZip}
        disabled={isGenerateDisabled}
      >
        Generate Project
      </button>
      <button
        className="btn btn-secondary"
        onClick={handleDownloadJson}
      >
        Download JSON Config
      </button>
    </div>
  );
}

