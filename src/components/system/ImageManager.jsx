import React, { useEffect, useState } from 'react';

export default function ImageManager({
  nombre = 'imagen-desconocida',
  src = '',
  useStrongTransition = false,
  zIndex = 1,
  x = 'auto',
  y = 'auto',
  width = 'auto',
  height = 'auto',
  opacity = 1,
  fullscreen = false,
}) {
  const [visible, setVisible] = useState(false);
  const transitionTime = useStrongTransition ? 1200 : 600;

  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, [src]);

  const style = fullscreen
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex,
        opacity: visible ? opacity : 0,
        pointerEvents: 'none',
        transition: `opacity ${transitionTime}ms ease-in-out`,
      }
    : {
        position: 'absolute',
        left: x ?? 'auto',
        top: y ?? 'auto',
        width,
        height,
        opacity: visible ? opacity : 0,
        zIndex,
        pointerEvents: 'none',
        transition: `opacity ${transitionTime}ms ease-in-out`,
      };

  return (
    <img
      alt={nombre}
      src={src}
      style={style}
      data-nombre={nombre}
    />
  );
}
