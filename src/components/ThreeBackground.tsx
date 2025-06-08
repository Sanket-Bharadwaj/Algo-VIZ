
import React, { useEffect, useRef, useCallback } from 'react';

interface ThreeBackgroundProps {
  effect?: 'particles' | 'waves' | 'geometric' | 'neural';
  isDarkMode?: boolean;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ 
  effect = 'particles', 
  isDarkMode = false 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const animationRef = useRef<number>();
  const meshesRef = useRef<any[]>([]);

  const cleanupScene = useCallback(() => {
    if (sceneRef.current) {
      // Dispose of all meshes and materials
      meshesRef.current.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat: any) => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
        sceneRef.current.remove(mesh);
      });
      meshesRef.current = [];
    }
  }, []);

  const createScene = useCallback(async () => {
    if (!mountRef.current) return;

    try {
      const THREE = await import('three');
      
      // Clean up existing scene
      cleanupScene();

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      // Reuse renderer if it exists
      let renderer = rendererRef.current;
      if (!renderer) {
        renderer = new THREE.WebGLRenderer({ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);
      }

      // Color schemes based on theme
      const colors = isDarkMode ? {
        primary: 0x8b5cf6,
        secondary: 0x06b6d4,
        accent: 0xec4899,
        subtle: 0x374151
      } : {
        primary: 0x8b5cf6,
        secondary: 0x06b6d4,
        accent: 0xf59e0b,
        subtle: 0xe5e7eb
      };

      let meshes: any[] = [];

      // Create different effects based on selected effect
      switch (effect) {
        case 'particles':
          meshes = createParticleEffect(THREE, scene, colors);
          break;
        case 'waves':
          meshes = createWaveEffect(THREE, scene, colors);
          break;
        case 'geometric':
          meshes = createGeometricEffect(THREE, scene, colors);
          break;
        case 'neural':
          meshes = createNeuralEffect(THREE, scene, colors);
          break;
      }

      function createParticleEffect(THREE: any, scene: any, colors: any) {
        const meshes: any[] = [];
        
        // Enhanced particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 150;
        const posArray = new Float32Array(particlesCount * 3);
        const velocityArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 30;
          posArray[i + 1] = (Math.random() - 0.5) * 30;
          posArray[i + 2] = (Math.random() - 0.5) * 30;
          
          velocityArray[i] = (Math.random() - 0.5) * 0.02;
          velocityArray[i + 1] = (Math.random() - 0.5) * 0.02;
          velocityArray[i + 2] = (Math.random() - 0.5) * 0.02;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.1,
          color: colors.primary,
          transparent: true,
          opacity: isDarkMode ? 0.8 : 0.6,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        meshes.push(particlesMesh);

        // Add floating geometric shapes
        const torusGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
          color: colors.secondary,
          wireframe: true,
          transparent: true,
          opacity: 0.2,
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        scene.add(torus);
        meshes.push(torus);

        return meshes;
      }

      function createWaveEffect(THREE: any, scene: any, colors: any) {
        const meshes: any[] = [];
        
        // Sine wave geometry
        const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
        const material = new THREE.MeshBasicMaterial({
          color: colors.primary,
          wireframe: true,
          transparent: true,
          opacity: isDarkMode ? 0.4 : 0.3,
        });
        
        const wave = new THREE.Mesh(geometry, material);
        wave.rotation.x = -Math.PI / 2;
        wave.position.y = -5;
        scene.add(wave);
        meshes.push(wave);

        // Secondary wave
        const wave2 = wave.clone();
        wave2.material = material.clone();
        wave2.material.color.setHex(colors.secondary);
        wave2.position.y = -3;
        wave2.rotation.z = Math.PI / 4;
        scene.add(wave2);
        meshes.push(wave2);

        return meshes;
      }

      function createGeometricEffect(THREE: any, scene: any, colors: any) {
        const meshes: any[] = [];
        
        // Multiple geometric shapes
        const shapes = [
          { geo: new THREE.OctahedronGeometry(2), color: colors.primary },
          { geo: new THREE.IcosahedronGeometry(1.5), color: colors.secondary },
          { geo: new THREE.TetrahedronGeometry(1.8), color: colors.accent },
        ];

        shapes.forEach((shape, index) => {
          const material = new THREE.MeshBasicMaterial({
            color: shape.color,
            wireframe: true,
            transparent: true,
            opacity: isDarkMode ? 0.5 : 0.4,
          });
          
          const mesh = new THREE.Mesh(shape.geo, material);
          mesh.position.set(
            (index - 1) * 8,
            Math.sin(index) * 3,
            -5
          );
          scene.add(mesh);
          meshes.push(mesh);
        });

        return meshes;
      }

      function createNeuralEffect(THREE: any, scene: any, colors: any) {
        const meshes: any[] = [];
        const nodes = [];
        
        // Create nodes
        for (let i = 0; i < 20; i++) {
          const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
          const nodeMaterial = new THREE.MeshBasicMaterial({
            color: colors.primary,
            transparent: true,
            opacity: 0.8,
          });
          
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          );
          
          scene.add(node);
          nodes.push(node);
          meshes.push(node);
        }

        // Create connections
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.7) { // 30% chance of connection
              const start = nodes[i].position;
              const end = nodes[j].position;
              
              const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
              const material = new THREE.LineBasicMaterial({
                color: colors.secondary,
                transparent: true,
                opacity: 0.3,
              });
              
              const line = new THREE.Line(geometry, material);
              scene.add(line);
              meshes.push(line);
            }
          }
        }

        return meshes;
      }

      meshesRef.current = meshes;
      camera.position.z = 10;
      sceneRef.current = scene;

      // Enhanced animation loop with better performance
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        meshes.forEach((mesh, index) => {
          if (mesh.geometry && mesh.geometry.type === 'Points') {
            // Animate particles
            mesh.rotation.x += 0.001;
            mesh.rotation.y += 0.001;
          } else if (mesh.geometry && mesh.geometry.type === 'PlaneGeometry') {
            // Animate waves
            const positions = mesh.geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
              const x = positions.getX(i);
              const z = positions.getZ(i);
              const y = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 0.5;
              positions.setY(i, y);
            }
            positions.needsUpdate = true;
          } else if (mesh.type === 'Mesh') {
            // Animate geometric shapes
            mesh.rotation.x += 0.005 + index * 0.001;
            mesh.rotation.y += 0.003 + index * 0.001;
            mesh.position.y += Math.sin(time + index) * 0.01;
          }
        });

        // Smooth camera movement
        camera.position.x = Math.sin(time * 0.2) * 2;
        camera.position.y = Math.cos(time * 0.15) * 1;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      // Optimized mouse interaction
      const handleMouseMove = (event: MouseEvent) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        meshes.forEach((mesh, index) => {
          if (mesh.type === 'Mesh') {
            mesh.rotation.y += mouseX * 0.0005;
            mesh.rotation.x += mouseY * 0.0005;
          }
        });
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    } catch (error) {
      console.error('Error creating Three.js scene:', error);
    }
  }, [effect, isDarkMode, cleanupScene]);

  useEffect(() => {
    createScene();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      cleanupScene();
    };
  }, [createScene]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 transition-opacity duration-700 ease-out"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeBackground;
