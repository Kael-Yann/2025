'use client';

import { useState, useEffect } from 'react';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Portrait from '@/components/Portrait';
import Socials from '@/components/Socials';
import Work from '@/components/Work';
import { useGlobalTimeline } from '@/hooks/useAnimation';
import LoadingBar from '@/components/LoadingBar';
import { DISABLE_LOADING_ANIMATION } from '@/config';
import data from '@/data.json';

export default function MainGrid() {
  const [loaded, setLoaded] = useState(DISABLE_LOADING_ANIMATION);
  const [currentProject, setCurrentProject] = useState(0);
  const tl = useGlobalTimeline(loaded);

  // Scroll listener pour changer le projet actif
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      const index = Math.min(
        data.work.projects.length - 1,
        Math.floor(scrollY / sectionHeight)
      );
      setCurrentProject(index);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!DISABLE_LOADING_ANIMATION && (
        <LoadingBar onFinish={() => setLoaded(true)} />
      )}

      {/* Conteneur scrollable */}
      <div className="relative min-h-[500vh] bg-neutral-950 text-white">
        {/* Grille fixe */}
        <div className="fixed inset-0 grid grid-cols-12 grid-rows-10 gap-4 p-4">
          <div className="col-span-full row-span-1">
            <Nav data={data.nav} timeline={tl} />
          </div>

          {/* Left column */}
          <div className="col-span-8 row-span-9 grid grid-cols-subgrid grid-rows-subgrid gap-4">
            <div className="col-span-5 row-span-5">
              <Intro data={data.intro} timeline={tl} />
            </div>

            <div className="col-span-3 row-span-5">
              <Portrait data={data.portrait} timeline={tl} />
            </div>

            <div className="col-span-4 row-span-4">
              <About data={data.about} timeline={tl} />
            </div>

            <div className="col-span-4 row-span-4">
              <Contact data={data.contact} timeline={tl} />
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-4 row-span-9 grid grid-cols-subgrid grid-rows-subgrid gap-4">
            <div className="col-span-4 row-span-8">
              <Work
                data={data.work}
                timeline={tl}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
              />
            </div>

            <div className="col-span-4 row-span-1">
              <Socials data={data.socials} timeline={tl} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
