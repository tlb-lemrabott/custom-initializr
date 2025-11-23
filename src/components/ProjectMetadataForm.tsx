import { ProjectConfig } from "../types/projectConfig";

interface ProjectMetadataFormProps {
  config: ProjectConfig;
  onChange: (updates: Partial<ProjectConfig>) => void;
}

export function ProjectMetadataForm({ config, onChange }: ProjectMetadataFormProps) {
  return (
    <div className="form-section">
      <h2>Project Metadata</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="groupId">Group</label>
          <input
            id="groupId"
            type="text"
            value={config.groupId}
            onChange={(e) => onChange({ groupId: e.target.value })}
            placeholder="com.example"
          />
        </div>

        <div className="form-group">
          <label htmlFor="artifactId">Artifact</label>
          <input
            id="artifactId"
            type="text"
            value={config.artifactId}
            onChange={(e) => onChange({ artifactId: e.target.value })}
            placeholder="demo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={config.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="demo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="baseDir">Base Directory</label>
          <input
            id="baseDir"
            type="text"
            value={config.baseDir}
            onChange={(e) => onChange({ baseDir: e.target.value })}
            placeholder="demo"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={config.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Demo project for Spring Boot"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="packageName">Package Name</label>
          <input
            id="packageName"
            type="text"
            value={config.packageName}
            onChange={(e) => onChange({ packageName: e.target.value })}
            placeholder="com.example.demo"
          />
        </div>
      </div>
    </div>
  );
}

