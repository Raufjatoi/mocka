import { cn, getTechLogos } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const DisplayTechIcons = async ({ techStack }) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex flex-row space-x-3">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex-center",
            index >= 1 && '-ml-4'
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image src={url} alt={tech} width={40} height={40} className="size-5" />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
