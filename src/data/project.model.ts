export interface ProjectSummary {
  id: string;
  name: string;
  summary: string;
  icon?: React.ReactElement;
  link?: { name: string; href: string };
}

export interface Project extends ProjectSummary {
  description?: string;
  imageUrl?: string;
}
