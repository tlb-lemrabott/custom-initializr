import { InitializrMetadata, DependencyCategory, DependencyValue } from "../types/initializrMetadata";
import { ProjectConfig } from "../types/projectConfig";

interface DependencySelectorProps {
  config: ProjectConfig;
  metadata: InitializrMetadata;
  onChange: (updates: Partial<ProjectConfig>) => void;
}

function isDependencyValue(item: DependencyValue | DependencyCategory): item is DependencyValue {
  return "id" in item && !("values" in item);
}

export function DependencySelector({ config, metadata, onChange }: DependencySelectorProps) {
  const toggleDependency = (depId: string) => {
    const currentDeps = config.dependencies;
    const newDeps = currentDeps.includes(depId)
      ? currentDeps.filter((id) => id !== depId)
      : [...currentDeps, depId];
    onChange({ dependencies: newDeps });
  };

  const renderCategory = (category: DependencyCategory, level: number = 0) => {
    return (
      <div key={category.name} className={`dependency-category level-${level}`}>
        <h3 className="category-title">{category.name}</h3>
        <div className="dependency-list">
          {category.values.map((item) => {
            if (isDependencyValue(item)) {
              const isSelected = config.dependencies.includes(item.id);
              return (
                <label key={item.id} className="dependency-item">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleDependency(item.id)}
                  />
                  <div className="dependency-info">
                    <span className="dependency-name">{item.name}</span>
                    {item.description && (
                      <span className="dependency-description">{item.description}</span>
                    )}
                  </div>
                </label>
              );
            } else {
              return renderCategory(item, level + 1);
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="form-section">
      <h2>Dependencies</h2>
      <div className="dependencies-container">
        {metadata.dependencies.values.map((category) => renderCategory(category))}
      </div>
    </div>
  );
}

