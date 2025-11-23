// src/hooks/useProjectConfig.ts
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectConfig } from "../types/projectConfig";

const DEFAULT_CONFIG: ProjectConfig = {
  type: "maven-project",
  language: "java",
  bootVersion: "",
  groupId: "com.example",
  artifactId: "demo",
  name: "demo",
  description: "Demo project",
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

  // keep backlink updated
  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      backlink: window.location.href,
    }));
  }, [searchParams]);

  // whenever config changes, update URL
  useEffect(() => {
    const params = toSearchParams(config);
    setSearchParams(params, { replace: true });
  }, [config, setSearchParams]);

  return { config, setConfig };
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
