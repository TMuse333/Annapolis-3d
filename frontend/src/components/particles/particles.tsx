"use client"
import { useEffect, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import { ISourceOptions, tsParticles } from "@tsparticles/engine";

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticlesEngine = async () => {
      await loadSlim(tsParticles);
    };

    initParticlesEngine().then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    background: { color: { value: "#000000" } },
    fpsLimit: 1,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "connect" },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 1, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#00bfff" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: 9,
        enable: true,
        outModes: { default: "bounce" },
        speed: 0.002,
        straight: false,
      },
      number: { density: { enable: true }, value: 80 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  }), []);

  if (!init) {
    return null;
  }

  return <Particles id="tsparticles" options={options} />;
};

export default ParticlesComponent;