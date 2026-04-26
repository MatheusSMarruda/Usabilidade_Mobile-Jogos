// Scenes.jsx — Cenas de bioma em pixel art 3/4.
// Convertido do amazonia-standalone para ES module.

import {
  SpritePine, SpriteTreeAutumn, SpriteBush, SpriteGrass,
  SpriteLog, SpriteRock, SpriteArara, SpriteLeaf, SpriteCloud,
  SpriteTucano, SpriteSun, SpriteCactus,
} from './Sprites';

function FallingLeaves({ count = 8, color = 'orange' }) {
  const leaves = Array.from({ length: count }).map((_, i) => ({
    left: (i * 13 + 7) % 100,
    delay: (i * 0.7) % 6,
    duration: 6 + (i % 4),
    size: 3 + (i % 2),
  }));
  return (
    <>
      <style>{`
        @keyframes fall-${color} {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {leaves.map((l, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${l.left}%`, top: 0,
          animation: `fall-${color} ${l.duration}s linear ${l.delay}s infinite`,
          zIndex: 5, pointerEvents: 'none',
        }}>
          <SpriteLeaf size={l.size} />
        </div>
      ))}
    </>
  );
}

function DriftingClouds({ count = 3, top = 60 }) {
  const clouds = Array.from({ length: count }).map((_, i) => ({
    top: top + i * 40,
    delay: i * 8,
    duration: 40 + i * 10,
    size: 3 + (i % 2),
  }));
  return (
    <>
      <style>{`
        @keyframes drift {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(110vw); }
        }
      `}</style>
      {clouds.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', top: c.top, left: 0,
          animation: `drift ${c.duration}s linear ${c.delay}s infinite`,
          zIndex: 2,
        }}>
          <SpriteCloud size={c.size} />
        </div>
      ))}
    </>
  );
}

function Rain({ count = 60 }) {
  const drops = Array.from({ length: count }).map((_, i) => ({
    left: (i * 17 + 3) % 100,
    delay: (i * 0.11) % 1.2,
    duration: 0.6 + ((i % 5) * 0.1),
    height: 10 + (i % 3) * 4,
  }));
  return (
    <>
      <style>{`
        @keyframes rainfall {
          0% { transform: translateY(-20vh); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0.8; }
        }
      `}</style>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6, overflow: 'hidden' }}>
        {drops.map((d, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${d.left}%`, top: 0,
            width: 2, height: d.height,
            background: 'linear-gradient(180deg, rgba(180,220,255,0) 0%, rgba(200,230,255,0.9) 100%)',
            animation: `rainfall ${d.duration}s linear ${d.delay}s infinite`,
            imageRendering: 'pixelated',
          }} />
        ))}
      </div>
    </>
  );
}

export function SceneAmazonia() {
  return (
    <div className="scene" style={{
      background: 'linear-gradient(180deg, #3a5a3a 0%, #2e4a2e 40%, #1f3520 100%)',
    }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: '35%',
        background: 'linear-gradient(180deg, rgba(40,55,50,0.75) 0%, rgba(40,55,50,0.2) 100%)',
      }} />
      <DriftingClouds count={3} top={30} />
      <Rain count={70} />

      <div style={{
        position: 'absolute', left: 0, right: 0, top: '35%', height: '22%',
        background: 'linear-gradient(180deg, #2e4a2e 0%, #1f3520 100%)',
        clipPath: 'polygon(0 50%, 8% 30%, 15% 45%, 25% 25%, 35% 40%, 45% 20%, 55% 45%, 65% 30%, 75% 20%, 85% 40%, 95% 30%, 100% 45%, 100% 100%, 0 100%)',
        opacity: 0.85,
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '48%', height: '20%',
        background: 'linear-gradient(180deg, #3d5a2a 0%, #2a3d18 100%)',
        clipPath: 'polygon(0 60%, 10% 30%, 18% 50%, 28% 20%, 40% 45%, 52% 25%, 62% 45%, 75% 20%, 88% 50%, 100% 30%, 100% 100%, 0 100%)',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%',
        background: 'linear-gradient(180deg, #3d5028 0%, #2a3818 60%, #1a2408 100%)',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%',
        backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 14px, rgba(0,0,0,0.15) 14px 15px), repeating-linear-gradient(0deg, transparent 0 10px, rgba(0,0,0,0.1) 10px 11px)',
      }} />

      <div style={{ position: 'absolute', left: '4%', bottom: '25%', zIndex: 3 }} className="sway-leaf">
        <SpritePine size={5} />
      </div>
      <div style={{ position: 'absolute', left: '18%', bottom: '22%', zIndex: 3 }} className="sway-leaf">
        <SpritePine size={4} />
      </div>
      <div style={{ position: 'absolute', right: '6%', bottom: '24%', zIndex: 3 }} className="sway-leaf">
        <SpritePine size={5} />
      </div>
      <div style={{ position: 'absolute', right: '20%', bottom: '22%', zIndex: 3 }} className="sway-leaf">
        <SpritePine size={4} />
      </div>

      <div style={{ position: 'absolute', left: '32%', bottom: '10%', zIndex: 3 }}>
        <SpriteBush size={3} />
      </div>
      <div style={{ position: 'absolute', right: '35%', bottom: '8%', zIndex: 3 }}>
        <SpriteBush size={3} />
      </div>
      <div style={{ position: 'absolute', left: '50%', bottom: '6%', zIndex: 3 }}>
        <SpriteBush size={2} />
      </div>

      {[8, 22, 42, 58, 72, 88].map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: `${p}%`, bottom: '4%', zIndex: 3 }} className="sway-grass">
          <SpriteGrass size={3} />
        </div>
      ))}

      <div style={{ position: 'absolute', right: '12%', bottom: '6%', zIndex: 4 }}>
        <SpriteLog size={3} />
      </div>

      <div style={{ position: 'absolute', left: '12%', top: '32%', zIndex: 4 }} className="bob">
        <SpriteArara size={3} />
      </div>

      <div className="shimmer" style={{
        position: 'absolute', left: '28%', bottom: '3%', width: 60, height: 6,
        background: 'rgba(150,200,220,0.35)', borderRadius: 2, zIndex: 2,
      }} />
      <div className="shimmer" style={{
        position: 'absolute', right: '25%', bottom: '2%', width: 80, height: 5,
        background: 'rgba(150,200,220,0.3)', borderRadius: 2, zIndex: 2,
        animationDelay: '0.5s',
      }} />

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,30,20,0.2)', pointerEvents: 'none', zIndex: 7 }} />
    </div>
  );
}
