import React, { useEffect, useRef } from 'react';
import './HealthCursor.css';

const HealthCursor = () => {
  const pointRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let animationFrameId = null;

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        if (pointRef.current) {
          pointRef.current.style.left = `${x}px`;
          pointRef.current.style.top = `${y}px`;
          pointRef.current.style.opacity = '1';
        }
        if (glowRef.current) {
          glowRef.current.style.left = `${x}px`;
          glowRef.current.style.top = `${y}px`;
          glowRef.current.style.opacity = '1';
        }
      });
    };

    const handleMouseDown = () => {
      if (pointRef.current) pointRef.current.classList.add('clicked');
      if (glowRef.current) glowRef.current.classList.add('clicked');
    };

    const handleMouseUp = () => {
      if (pointRef.current) pointRef.current.classList.remove('clicked');
      if (glowRef.current) glowRef.current.classList.remove('clicked');
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        if (glowRef.current) glowRef.current.classList.add('hover');
      } else {
        if (glowRef.current) glowRef.current.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="custom-cursor-wrapper">
      <div
        ref={pointRef}
        className="cursor-point"
        style={{ left: '-100px', top: '-100px', opacity: 0 }}
      />
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{ left: '-100px', top: '-100px', opacity: 0 }}
      />
    </div>
  );
};

export default HealthCursor;