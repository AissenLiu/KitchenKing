import React, { useEffect, useRef } from 'react';

interface CelebrationProps {
  trigger: boolean;
  onComplete?: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ trigger, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 创建礼花粒子
    const createFirework = (x: number, y: number) => {
      const symbols = ['🎉', '🎊', '✨', '🌟', '⭐', '💫', '🔥', '👑', '🏆', '🎯', '💎', '🎁'];
      const particleCount = 15;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const deltaX = Math.cos(angle) * distance;
        const deltaY = Math.sin(angle) * distance;
        
        particle.style.setProperty('--x', `${deltaX}px`);
        particle.style.setProperty('--y', `${deltaY}px`);
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.fontSize = `${16 + Math.random() * 8}px`;
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1200);
      }
    };

    // 创建闪烁效果
    const createSparkles = (x: number, y: number) => {
      const sparkleSymbols = ['✨', '💫', '🌟', '⭐', '💥', '🎇', '🎆'];
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle';
          
          const offsetX = (Math.random() - 0.5) * 80;
          const offsetY = (Math.random() - 0.5) * 80;
          
          sparkle.style.left = `${x + offsetX}px`;
          sparkle.style.top = `${y + offsetY}px`;
          sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
          sparkle.style.fontSize = `${14 + Math.random() * 6}px`;
          
          container.appendChild(sparkle);
          
          setTimeout(() => sparkle.remove(), 1000);
        }, i * 120);
      }
    };

    // 创建彩纸效果
    const createConfetti = () => {
      const confettiSymbols = ['🎊', '🎉', '🎈', '🎁', '🏆', '👑', '💎', '🌟', '⭐', '✨', '🎯', '🔥', '💫', '🎇'];
      for (let i = 0; i < 25; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          
          confetti.style.left = `${Math.random() * rect.width}px`;
          confetti.style.animationDelay = `${Math.random() * 0.8}s`;
          confetti.style.animationDuration = `${2.5 + Math.random() * 2}s`;
          confetti.style.fontSize = `${12 + Math.random() * 8}px`;
          confetti.textContent = confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
          
          container.appendChild(confetti);
          
          setTimeout(() => confetti.remove(), 5000);
        }, i * 80);
      }
    };

    // 触发庆祝动画
    createFirework(centerX, centerY);
    createSparkles(centerX, centerY);
    createConfetti();

    // 清理函数
    const cleanup = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3000);

    return () => clearTimeout(cleanup);
  }, [trigger, onComplete]);

  if (!trigger) return null;

  return (
    <div 
      ref={containerRef}
      className="celebration-container"
    />
  );
};

export default Celebration;