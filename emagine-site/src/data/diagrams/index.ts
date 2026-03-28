import { ProjectDiagram, DiagramNode } from '@/types/diagram';
import projects from '@/data/projects.json';

import mainMmd from './main.mmd?raw';
import nauthMmd from './nauth.mmd?raw';
import nnewsMmd from './nnews.mmd?raw';
import ztoolsMmd from './ztools.mmd?raw';
import bazzucamediaMmd from './bazzucamedia.mmd?raw';
import lofnMmd from './lofn.mmd?raw';
import devnoteMmd from './devnote.mmd?raw';
import pandoravaultMmd from './pandoravault.mmd?raw';
import easyslaMmd from './easysla.mmd?raw';
import viraltMmd from './viralt.mmd?raw';
import monexupMmd from './monexup.mmd?raw';
import devblogMmd from './devblog.mmd?raw';
import abipescaMmd from './abipesca.mmd?raw';
import goblinwarsMmd from './goblinwars.mmd?raw';
import nochainswapMmd from './nochainswap.mmd?raw';
import wb3Mmd from './wb3.mmd?raw';
import gitnewsMmd from './gitnews.mmd?raw';
import germaniumMmd from './germanium.mmd?raw';
import voxmeetMmd from './voxmeet.mmd?raw';
import linkedinbotMmd from './linkedinbot.mmd?raw';
import kryptodriveMmd from './kryptodrive.mmd?raw';
import ladinobotMmd from './ladinobot.mmd?raw';
import proxypayMmd from './proxypay.mmd?raw';

const mmdFiles: Record<string, string> = {
  main: mainMmd,
  nauth: nauthMmd,
  nnews: nnewsMmd,
  ztools: ztoolsMmd,
  bazzucamedia: bazzucamediaMmd,
  lofn: lofnMmd,
  devnote: devnoteMmd,
  pandoravault: pandoravaultMmd,
  easysla: easyslaMmd,
  viralt: viraltMmd,
  monexup: monexupMmd,
  devblog: devblogMmd,
  abipesca: abipescaMmd,
  goblinwars: goblinwarsMmd,
  nochainswap: nochainswapMmd,
  wb3: wb3Mmd,
  gitnews: gitnewsMmd,
  germanium: germaniumMmd,
  voxmeet: voxmeetMmd,
  linkedinbot: linkedinbotMmd,
  kryptodrive: kryptodriveMmd,
  ladinobot: ladinobotMmd,
  proxypay: proxypayMmd,
};

const projectBySlug = new Map(projects.filter(p => p.slug !== 'main').map(p => [p.slug, p]));

const statusMap: Record<string, 'active' | 'planned' | 'deprecated'> = {
  completed: 'active',
  deploying: 'active',
  development: 'planned',
  migration: 'active',
  outdated: 'deprecated',
  discontinued: 'deprecated',
};

function enrichMainNodes(nodes: typeof projects[0]['diagramNodes']): DiagramNode[] {
  return nodes.map(node => {
    const project = node.navigateTo ? projectBySlug.get(node.navigateTo) : undefined;
    if (!project) return node as DiagramNode;
    return {
      id: node.id,
      label: project.title,
      description: project.description,
      technologies: project.technologies,
      status: statusMap[project.status] || 'active',
      navigateTo: node.navigateTo,
    };
  });
}

const diagrams: Record<string, ProjectDiagram> = {};

for (const entry of projects) {
  const isMain = entry.slug === 'main';
  diagrams[entry.slug] = {
    slug: entry.slug,
    title: entry.title,
    parent: entry.diagramParent,
    mermaidDefinition: mmdFiles[entry.slug] || '',
    nodes: isMain ? enrichMainNodes(entry.diagramNodes) : entry.diagramNodes,
  };
}

export const getDiagram = (slug: string): ProjectDiagram | undefined => diagrams[slug];

export const getAllDiagrams = (): ProjectDiagram[] => Object.values(diagrams);

export default diagrams;
