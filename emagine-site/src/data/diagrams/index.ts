import { ProjectDiagram } from '@/types/diagram';
import main from './main';
import nauth from './nauth';
import nnews from './nnews';
import ztools from './ztools';
import bazzucamedia from './bazzucamedia';

const diagrams: Record<string, ProjectDiagram> = {
  [main.slug]: main,
  [nauth.slug]: nauth,
  [nnews.slug]: nnews,
  [ztools.slug]: ztools,
  [bazzucamedia.slug]: bazzucamedia,
};

export const getDiagram = (slug: string): ProjectDiagram | undefined => diagrams[slug];

export const getAllDiagrams = (): ProjectDiagram[] => Object.values(diagrams);

export default diagrams;
