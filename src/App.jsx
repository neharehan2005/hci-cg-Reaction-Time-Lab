import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gapSize } from "three/tsl";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";

export default function App() {
  const mountRef = useRef(null);

  const [stats, setStats] = useState({
    trials: 0,
    correct: 0,
    avgRT: 0,
    lastRT: 0,
  });

  const stateRef = useRef({
    falling: null,
    expected: null,
    startTime: 0,
    speed: 0.02,
    running: false,
    sumRT: 0,
  });

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0c0f");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // LIGHT
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 5, 5);
    scene.add(light);

    // TEXT CREATOR
    const createText = (char, isLetter) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 256;
      canvas.height = 256;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 256, 256);

      ctx.fillStyle = isLetter ? "#00e5ff" : "#ffe600";
      ctx.font = "bold 180px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(char, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);

      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      sprite.scale.set(2, 2, 1);
      sprite.position.y = 3;

      return sprite;
    };

    // SPAWN OBJECT/GENERATE RANDOM OBJECTS(letters/numbers)
    const spawn = () => {
      const isLetter = Math.random() < 0.5;
      const char = isLetter
        ? LETTERS[Math.floor(Math.random() * LETTERS.length)]
        : NUMBERS[Math.floor(Math.random() * NUMBERS.length)];

      const sprite = createText(char, isLetter);

      scene.add(sprite);

      stateRef.current.falling = sprite;
      stateRef.current.expected = isLetter ? "A" : "L";
      stateRef.current.startTime = performance.now();
      stateRef.current.running = true;
    };

    // GAME LOOP
    const animate = () => {
      requestAnimationFrame(animate);

      const obj = stateRef.current.falling;

      if (obj) {
        obj.position.y -= stateRef.current.speed;

        // If missed
        if (obj.position.y < -3) {
          scene.remove(obj);
          stateRef.current.falling = null;
          spawn();
        }
      }

      renderer.render(scene, camera);
    };

    animate();
    spawn();

    // INPUT
    const handleKey = (e) => {
      const key = e.key.toUpperCase();
      const s = stateRef.current;

      if (!s.running || !s.falling) return;

      if (key !== "A" && key !== "L") return;

      const rt = Math.round(performance.now() - s.startTime);
      const correct = key === s.expected;

      // remove object
      scene.remove(s.falling);
      s.falling = null;

     
      if (correct) {
        s.sumRT += rt;
      }
       
       // update stats
      setStats((prev) => {
        const trials = prev.trials + 1;
        const correctCount = prev.correct + (correct ? 1 : 0);
        const accuracy=Math.round((correctCount/trials)*100);
        return {
          trials,
          correct: correctCount,
          avgRT: correctCount > 0 ? Math.round(s.sumRT / correctCount) : 0,
          lastRT: rt,
          accuracy,
          
        };
      });

      
      // next spawn
      setTimeout(spawn, 400);
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={mountRef} />

      {/* UI OVERLAY */}
      <div style={styles.ui}>
        <h1 style={styles.title}>REACTION TIME LAB</h1>

        <div style={styles.panel}>
          <p>Trials: {stats.trials}</p>
          <p>Correct: {stats.correct}</p>
          <p>Accuracy:{stats.accuracy ? stats.accuracy + "%" : "0%"}</p>
          <p>Avg RT: {stats.avgRT} ms</p>
          <p>Last RT: {stats.lastRT} ms</p>
        </div>

        <div style={styles.controls}>
          <button style={styles.button}>⌨ Press A = Letter</button>
          <button style={styles.button}>⌨ Press L = Number</button>
        </div>
      </div>
    </>
  );
}

const styles = {
  ui: {
    position: "absolute",
    top: 30,
    left: 30,
    color: "#e6f7ff",
    fontFamily: "'Orbitron', 'Courier New', monospace",
    zIndex: 10,
  },

  title: {
    fontSize: "34px",
    letterSpacing: "4px",
    marginBottom: "15px",
    color: "#00e5ff",
    textShadow: "0 0 10px #00e5ff, 0 0 25px #00e5ff55",
  },

  panel: {
    background: "rgba(10, 15, 25, 0.65)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(0, 229, 255, 0.4)",
    borderRadius: "12px",
    padding: "14px 18px",
    marginBottom: "12px",
    boxShadow: "0 0 20px rgba(0,229,255,0.15)",
    minWidth: "180px",
  },

  button: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid rgba(0,229,255,0.5)",
    background: "rgba(0,229,255,0.08)",
    color: "#00e5ff",
    fontSize: "12px",
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 0 10px rgba(0,229,255,0.2)",
  },


};

