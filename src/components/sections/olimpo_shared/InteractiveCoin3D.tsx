import React, { useRef, useEffect, Suspense, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX, useTexture, OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

interface InteractiveCoin3DProps {
  className?: string;
  scale?: number;
  modelPositionY?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
  enableControls?: boolean;
}

// ✅ --- Solução A: Modelo "Imperativo" com clone (como você tinha antes) ---
function CoinModel({
  scale = 0.4,
  modelPositionY = 0,
  autoRotate = true,
  rotationSpeed = 0.5,
}: {
  scale?: number;
  modelPositionY?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
}) {
  // 1. O fbx original do hook (que é cacheado e não deve ser modificado)
  const fbx = useFBX('../../OlimpoBarBer/coin/moeda.fbx');
  const groupRef = useRef<Group>(null);

  // 2. Criamos um clone local do modelo. É ESTE que vamos usar.
  const scene = useMemo(() => {
    if (fbx) {
      console.log('Clonando modelo FBX...');
      return fbx.clone(true); // true para clonar recursivamente
    }
  }, [fbx]); // Dependência correta

  // 3. Suas texturas estão perfeitas com useMemo/useCallback
  const texturePaths = useMemo(() => ({
    map: '../../OlimpoBarBer/coin/moedatexturas/moeda_BaseColor.png',
    normalMap: '../../OlimpoBarBer/coin/moedatexturas/moeda_Normal.png',
    metalnessMap: '../../OlimpoBarBer/coin/moedatexturas/moeda_Metallic.png',
    roughnessMap: '../../OlimpoBarBer/coin/moedatexturas/moeda_Roughness.png',
  }), []);

  const onTexturesLoaded = useCallback((loadedTextures: any) => {
    const processTexture = (texture: THREE.Texture | THREE.Texture[], colorSpace: THREE.ColorSpace) => {
      if (Array.isArray(texture)) {
        texture.forEach((t) => {
          t.flipY = false;
          t.colorSpace = colorSpace;
          t.needsUpdate = true;
        });
      } else if (texture) {
        texture.flipY = false;
        texture.colorSpace = colorSpace;
        texture.needsUpdate = true;
      }
    };
    processTexture(loadedTextures.map, THREE.SRGBColorSpace);
    processTexture(loadedTextures.normalMap, THREE.NoColorSpace);
    processTexture(loadedTextures.metalnessMap, THREE.NoColorSpace);
    processTexture(loadedTextures.roughnessMap, THREE.NoColorSpace);
    console.log('Texturas configuradas via callback useTexture');
  }, []);

  const textures = useTexture(texturePaths, onTexturesLoaded);

  // 4. Rotação
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  // 5. Este useEffect agora depende e opera sobre o 'scene' (o clone)
  useEffect(() => {
    // Verificamos se o 'scene' (clone) e as texturas existem
    if (scene && textures.map) {
      console.log('Aplicando material ao CLONE...');
      scene.scale.setScalar(scale);
      scene.position.set(0, modelPositionY, 0);

      const materialsToDispose: THREE.Material[] = [];

      // Atravessamos o 'scene' (clone), não o 'fbx' original
      scene.traverse((child) => {
        if ('isMesh' in child && child.isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          const material = new THREE.MeshStandardMaterial({
            map: textures.map,
            normalMap: textures.normalMap,
            metalnessMap: textures.metalnessMap,
            roughnessMap: textures.roughnessMap,
            metalness: 1.0,
            roughness: 0.4,
            envMapIntensity: 1.5,
          });

          mesh.material = material;
          materialsToDispose.push(material);
        }
      });
      console.log('Material aplicado ao CLONE.');

      return () => {
        // Agora, limpamos os materiais do clone, o que é seguro.
        console.log('Limpando materiais do CLONE...');
        materialsToDispose.forEach((m) => m.dispose());
      };
    }
  }, [scene, textures, scale, modelPositionY]); // Dependências corretas

  // 6. Verificamos se o 'scene' está pronto
  if (!scene) return null; // Suspense vai pegar isso

  return (
    <group ref={groupRef}>
      {/* 7. Renderizamos o 'scene' (clone) */}
      <primitive object={scene} />
    </group>
  );
}

// Fallback em DOM (HTML), está correto pois está fora do Canvas.
function LoadingFallback() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
      <p style={{ color: 'white' }}>Carregando Moeda...</p>
    </div>
  );
}

// ✅ --- Componente Pai com a CORREÇÃO PRINCIPAL ---
export default function InteractiveCoin3D({
  className = '',
  scale = 0.4,
  modelPositionY = 0,
  autoRotate = false,
  rotationSpeed = 0.5,
  enableControls = true,
}: InteractiveCoin3DProps) {
  
  // const [key, setKey] = useState(Date.now); // <-- REMOVIDO

  const canvasProps = useMemo(
    () => ({
      camera: {
        position: [0, 0, 200] as [number, number, number],
        fov: 20,
        near: 0.1,
        far: 1000,
      },
      shadows: true,
      gl: {
        antialias: true,
        alpha: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: 'high-performance', // Diz ao navegador para usar a GPU dedicada
      failIfMajorPerformanceCaveat: true,  // Força o uso de um bom hardware se disponível
        toneMappingExposure: 1.0,
        // preserveDrawingBuffer: true, // <-- Removido, melhora performance
      },
      dpr: Math.min(window.devicePixelRatio, 2),
    }),
    []
  );

  // Este useEffect era a causa do crash 'Context Lost'
  /*
  useEffect(() => {
    const refresh = () => setKey(Date.now());
    document.addEventListener('visibilitychange', refresh);
    return () => {
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  */

  return (
    <div
      className={`w-full h-full ${className}`}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        {/* O 'key={key}' foi REMOVIDO daqui. Esta é a correção crucial. */}
        <Canvas {...canvasProps}>
          <ambientLight color={0xffffff} intensity={0.7} />
          <directionalLight
            color={0xffffff}
            position={[5, 10, 7.5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, -5, 5]} intensity={0.5} />

          <CoinModel
            scale={scale}
            modelPositionY={modelPositionY}
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
          />

          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={80}
              maxDistance={300}
              enableDamping={true}
              dampingFactor={0.05}
              target={[0, modelPositionY, 0]}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
}