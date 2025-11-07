'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Accordion from './Accordion'; // ton composant accordéon
import Box from './Box';

export default function Work({ data, timeline, currentProject, setCurrentProject }) {
  const project = data.projects[currentProject];

  const contentAnimation = (delay) => {
    const offset = 0.3;
    timeline
      ?.from('.work-heading', { yPercent: 100, stagger: 0.18 }, delay + offset)
      ?.from('.work-border', { scaleX: 0, stagger: 0.18, ease: 'slow.out' }, delay + offset)
      ?.from('.thumbnail', { opacity: 0 }, delay + offset);
  };

  return (
    <Box
      timeline={timeline}
      className='-translate-x-full scale-0 py-0 opacity-0'
      callbackAnimation={contentAnimation}
    >
      <div className='relative z-10 size-full overflow-hidden'>
        <div className='flex flex-col gap-6 overflow-y-auto max-lg:overflow-y-visible'>
          
          {/* Photo animée */}
          <AnimatePresence mode="wait">
            {project?.media && (
              <motion.img
                key={currentProject}
                src={project.media}
                alt={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className='w-full h-[50vh] object-cover rounded-2xl'
              />
            )}
          </AnimatePresence>

          {/* Accordéon */}
          {data.projects.length > 0 && (
            <Accordion
              activeIndex={currentProject}
              projects={data.projects}
              onChange={setCurrentProject}
            />
          )}

          {/* Texte du projet */}
          {project && (
            <div className='mt-4 text-white'>
              <h2 className='text-2xl font-bold'>{project.title}</h2>
              <p className='text-neutral-300'>
                {project.description || "Pas de description pour ce projet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
}
