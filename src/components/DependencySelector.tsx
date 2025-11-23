import { useState } from "react";
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const toggleDependency = (depId: string) => {
    const currentDeps = config.dependencies;
    const newDeps = currentDeps.includes(depId)
      ? currentDeps.filter((id) => id !== depId)
      : [...currentDeps, depId];
    onChange({ dependencies: newDeps });
  };

  const renderCategory = (category: DependencyCategory, level: number = 0, parentPath: string = "") => {
    const categoryPath = parentPath ? `${parentPath} > ${category.name}` : category.name;
    const isExpanded = expandedCategories.has(categoryPath);

    return (
      <div key={categoryPath} className={`dependency-category level-${level}`}>
        <div 
          className="category-header"
          onClick={() => toggleCategory(categoryPath)}
          style={{ cursor: "pointer" }}
        >
          <span className={`dropdown-icon ${isExpanded ? "expanded" : ""}`}>▼</span>
          <h3 className="category-title">{category.name}</h3>
        </div>
        {isExpanded && (
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
                return renderCategory(item, level + 1, categoryPath);
              }
            })}
          </div>
        )}
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

