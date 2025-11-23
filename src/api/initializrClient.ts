import { InitializrMetadata } from "../types/initializrMetadata";
import { ProjectConfig } from "../types/projectConfig";

const PROXY_BASE_URL = "http://localhost:8080/api/initializr";

export async function fetchInitializrMetadata(): Promise<InitializrMetadata> {
  const res = await fetch(`${PROXY_BASE_URL}/metadata`, {
    headers: {
      Accept: "application/vnd.initializr.v2.3+json",
    },
  });
  if (!res.ok) throw new Error("Failed to load metadata");
  return res.json();
}

export function buildStarterZipUrl(config: ProjectConfig): string {
  const params = new URLSearchParams();
  
  params.set("type", config.type);
  params.set("language", config.language);
  params.set("bootVersion", config.bootVersion);
  params.set("groupId", config.groupId);
  params.set("artifactId", config.artifactId);
  params.set("name", config.name);
  params.set("description", config.description);
  params.set("packageName", config.packageName);
  params.set("packaging", config.packaging);
  params.set("javaVersion", config.javaVersion);
  params.set("configurationFileFormat", config.configurationFileFormat);
  params.set("baseDir", config.baseDir);
  
  if (config.dependencies.length > 0) {
    params.set("dependencies", config.dependencies.join(","));
  }
  
  return `${PROXY_BASE_URL}/starter.zip?${params.toString()}`;
}

export function downloadZip(url: string, filename: string = "starter.zip"): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadJsonConfig(config: ProjectConfig, filename: string = "project-config.json"): void {
  const jsonStr = JSON.stringify(config, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

