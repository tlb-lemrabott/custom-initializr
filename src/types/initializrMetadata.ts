export interface InitializrLink {
  href: string;
  templated?: boolean;
}

export interface InitializrLinks {
  [key: string]: InitializrLink;
}

export interface DependencyLink {
  href: string;
  title?: string;
  templated?: boolean;
}

export interface DependencyLinks {
  reference?: DependencyLink | DependencyLink[];
  guide?: DependencyLink | DependencyLink[];
  home?: DependencyLink;
  sample?: DependencyLink;
}

export interface DependencyValue {
  id: string;
  name: string;
  description: string;
  versionRange?: string;
  _links?: DependencyLinks;
}

export interface DependencyCategory {
  name: string;
  values: (DependencyValue | DependencyCategory)[];
}

export interface DependenciesMetadata {
  type: string;
  values: DependencyCategory[];
}

export interface SelectOption {
  id: string;
  name: string;
  description?: string;
  action?: string;
  tags?: Record<string, string>;
  versionRange?: string;
}

export interface FieldMetadata {
  type: string;
  default: string;
  values?: SelectOption[];
}

export interface InitializrMetadata {
  _links: InitializrLinks;
  dependencies: DependenciesMetadata;
  type: FieldMetadata;
  packaging: FieldMetadata;
  javaVersion: FieldMetadata;
  language: FieldMetadata;
  bootVersion: FieldMetadata;
  groupId: FieldMetadata;
  artifactId: FieldMetadata;
  version: FieldMetadata;
  name: FieldMetadata;
  description: FieldMetadata;
  packageName: FieldMetadata;
  configurationFileFormat?: FieldMetadata;
}

