import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectConfig } from "../types/projectConfig";

const DEFAULT_CONFIG: ProjectConfig = {
  type: "maven-project",
  language: "java",
  bootVersion: "",
  groupId: "com.example",
  artifactId: "demo",
  name: "demo",
  description: "Demo project for Spring Boot",
  packageName: "com.example.demo",
  packaging: "jar",
  javaVersion: "17",
  configurationFileFormat: "yaml",
  baseDir: "demo",
  dependencies: [],
  backlink: "",
};

export function useProjectConfig() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [config, setConfig] = useState<ProjectConfig>(() =>
    fromSearchParams(searchParams)
  );
  const skipUrlUpdate = useRef(false);
  const configRef = useRef(config);

  // Keep ref in sync
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Sync from URL when it changes (e.g., browser back/forward, initial load)
  useEffect(() => {
    if (skipUrlUpdate.current) {
      skipUrlUpdate.current = false;
      return;
    }
    
    const urlConfig = fromSearchParams(searchParams);
    const currentConfig = configRef.current;
    
    // Only update if URL config is different from current config
    if (JSON.stringify(urlConfig) !== JSON.stringify({ ...currentConfig, backlink: urlConfig.backlink })) {
      setConfig({
        ...urlConfig,
        backlink: window.location.href,
      });
    }
  }, [searchParams]);

  // Update URL when config changes (from user input)
  const updateConfig = (updates: Partial<ProjectConfig> | ((prev: ProjectConfig) => ProjectConfig)) => {
    setConfig((prev) => {
      const newConfig = typeof updates === "function" ? updates(prev) : { ...prev, ...updates };
      const params = toSearchParams(newConfig);
      const currentParams = new URLSearchParams(searchParams);
      
      // Only update URL if params changed
      if (params.toString() !== currentParams.toString()) {
        skipUrlUpdate.current = true;
        setSearchParams(params, { replace: true });
      }
      
      return {
        ...newConfig,
        backlink: window.location.href,
      };
    });
  };

  return { config, setConfig: updateConfig };
}

function fromSearchParams(sp: URLSearchParams): ProjectConfig {
  // read params, fallback to defaults
  const deps = sp.get("dependencies")?.split(",").filter(Boolean) ?? [];
  return {
    ...DEFAULT_CONFIG,
    ...Object.fromEntries(sp.entries()),
    dependencies: deps,
    backlink: window.location.href,
  } as ProjectConfig;
}

function toSearchParams(config: ProjectConfig): URLSearchParams {
  const sp = new URLSearchParams();
  Object.entries(config).forEach(([key, value]) => {
    if (key === "backlink") return;
    if (key === "dependencies") {
      if ((value as string[]).length) {
        sp.set("dependencies", (value as string[]).join(","));
      }
    } else {
      if (value != null && value !== "") sp.set(key, String(value));
    }
  });
  return sp;
}

