import { ProjectConfig } from "../types/projectConfig";
import { InitializrMetadata } from "../types/initializrMetadata";

interface ProjectBasicsFormProps {
  config: ProjectConfig;
  metadata: InitializrMetadata;
  onChange: (updates: Partial<ProjectConfig>) => void;
}

export function ProjectBasicsForm({ config, metadata, onChange }: ProjectBasicsFormProps) {
  return (
    <div className="form-section">
      <h2>Project Basics</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="type">Project Type</label>
          <select
            id="type"
            value={config.type}
            onChange={(e) => onChange({ type: e.target.value })}
          >
            {metadata.type.values?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            value={config.language}
            onChange={(e) => onChange({ language: e.target.value })}
          >
            {metadata.language.values?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bootVersion">Spring Boot Version</label>
          <select
            id="bootVersion"
            value={config.bootVersion}
            onChange={(e) => onChange({ bootVersion: e.target.value })}
            required
          >
            <option value="">Select a version</option>
            {metadata.bootVersion.values?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="javaVersion">Java Version</label>
          <select
            id="javaVersion"
            value={config.javaVersion}
            onChange={(e) => onChange({ javaVersion: e.target.value })}
          >
            {metadata.javaVersion.values?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="packaging">Packaging</label>
          <select
            id="packaging"
            value={config.packaging}
            onChange={(e) => onChange({ packaging: e.target.value })}
          >
            {metadata.packaging.values?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {metadata.configurationFileFormat && (
          <div className="form-group">
            <label htmlFor="configurationFileFormat">Configuration Format</label>
            <select
              id="configurationFileFormat"
              value={config.configurationFileFormat}
              onChange={(e) => onChange({ configurationFileFormat: e.target.value })}
            >
              {metadata.configurationFileFormat.values?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

