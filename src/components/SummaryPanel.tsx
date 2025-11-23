import { ProjectConfig } from "../types/projectConfig";
import { buildStarterZipUrl } from "../api/initializrClient";

interface SummaryPanelProps {
  config: ProjectConfig;
}

export function SummaryPanel({ config }: SummaryPanelProps) {
  const zipUrl = buildStarterZipUrl(config);
  const backlinkUrl = config.backlink || window.location.href;
  const jsonConfig = {
    ...config,
    backlink: backlinkUrl,
  };

  return (
    <div className="summary-panel">
      <h2>Summary</h2>
      
      <div className="summary-section">
        <h3>Generated URL</h3>
        <div className="url-display">
          <code>{backlinkUrl}</code>
        </div>
      </div>

      <div className="summary-section">
        <h3>JSON Config Preview</h3>
        <pre className="json-preview">
          {JSON.stringify(jsonConfig, null, 2)}
        </pre>
      </div>
    </div>
  );
}

