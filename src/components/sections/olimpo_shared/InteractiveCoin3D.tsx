import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import React from 'react';

interface InteractiveCoin3DProps {
    className?: string;
    autoRotate?: boolean;
    rotationSpeed?: number;
    scale?: number;
    enableControls?: boolean;
}

interface ControlsWrapperProps {
    autoRotate: boolean;
    rotationSpeed: number;
}

function ControlsWrapper({ autoRotate, rotationSpeed }: ControlsWrapperProps) {
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);
    const lastInteraction = useRef(Date.now());
    const isInteracting = useRef(false);

    const IDLE_TIMEOUT = 3000;
    const SMOOTH_FACTOR = 0.05;

    useEffect(() => {
        const controls = controlsRef.current;
        if (!controls) return;

        const onStart = () => {
            isInteracting.current = true;
            lastInteraction.current = Date.now();
        };

        const onEnd = () => {
            isInteracting.current = false;
        };

        controls.addEventListener('start', onStart);
        controls.addEventListener('end', onEnd);

        return () => {
            controls.removeEventListener('start', onStart);
            controls.removeEventListener('end', onEnd);
        };
    }, []);

    useFrame((_, delta) => {
        const controls = controlsRef.current;
        if (!controls || !controls.target || !camera) return;

        controls.update();

        const now = Date.now();
        const isIdle = !isInteracting.current && (now - lastInteraction.current > IDLE_TIMEOUT);

        if (autoRotate && isIdle) {
            const position = camera.position;
            const target = controls.target;
            
            const radius = position.distanceTo(target);
            const currentAngle = Math.atan2(position.x - target.x, position.z - target.z);
            const newAngle = currentAngle + rotationSpeed * delta; 

            position.x = target.x + radius * Math.sin(newAngle);
            position.z = target.z + radius * Math.cos(newAngle);

            camera.position.copy(position);
            controls.update();
        } else if (isInteracting.current) {
            lastInteraction.current = now;
        }
    });
    
    return (
        <OrbitControls
            ref={controlsRef}
            // AQUI: Ajuste o target.y para -40
            target={[0, 20, 0]} 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false}
            minDistance={40}
            maxDistance={150}
            enableDamping={true}
            dampingFactor={0.05}
        />
    );
}

function CoinMeshWithFBX({ 
    scale = 0.4
}: {
    autoRotate?: boolean;
    rotationSpeed?: number;
    scale?: number;
}) {
    const meshRef = useRef<THREE.Group>(null);
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    const fbx = useFBX('../../OlimpoBarBer/coin/moeda.fbx'); 

    useEffect(() => {
        let isMounted = true;
        
        const loadTextures = async () => {
            try {
                const textureLoader = new TextureLoader();
                
                const [baseColorTexture, metallicTexture, normalTexture, roughnessTexture] = await Promise.all([
                    textureLoader.loadAsync('../../OlimpoBarBer/coin/moedatexturas/moeda_BaseColor.png'),
                    textureLoader.loadAsync('../../OlimpoBarBer/coin/moedatexturas/moeda_Metallic.png'),
                    textureLoader.loadAsync('../../OlimpoBarBer/coin/moedatexturas/moeda_Normal.png'),
                    textureLoader.loadAsync('../../OlimpoBarBer/coin/moedatexturas/moeda_Roughness.png')
                ]);
                
                [baseColorTexture, metallicTexture, normalTexture, roughnessTexture].forEach(texture => {
                    texture.generateMipmaps = true;
                    texture.minFilter = THREE.LinearMipmapLinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    texture.wrapS = THREE.ClampToEdgeWrapping;
                    texture.wrapT = THREE.ClampToEdgeWrapping;
                });

                if (!isMounted) return;

                fbx.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        if (child.material && Array.isArray(child.material)) {
                            child.material.forEach(mat => mat.dispose());
                        } else if (child.material) {
                            (child.material as THREE.Material).dispose();
                        }

                    const material = new THREE.MeshStandardMaterial({
                        map: baseColorTexture,
                        metalnessMap: metallicTexture,
                        normalMap: normalTexture,
                        roughnessMap: roughnessTexture,
                        emissiveMap: baseColorTexture, 
                        emissiveIntensity: 0.15,
                        metalness: 1,
                        roughness: 1,
                        envMapIntensity: 15
                    });
                        
                        if (material.normalMap) {
                            material.normalScale = new THREE.Vector2(3, 3);
                        }
                        
                        child.material = material;
                    }
                });

                setStatus('loaded');
                
            } catch (error) {
                console.error('Erro ao carregar texturas:', error);
                if (isMounted) {
                    setStatus('error');
                }
            }
        };

        loadTextures();

        return () => {
            isMounted = false;
        };
    }, [fbx]);
    
    if (status === 'loading') {
        return (
            <mesh>
                <cylinderGeometry args={[2, 2, 0.3, 16]} />
                <meshBasicMaterial color="#FFA500" />
            </mesh>
        );
    }

    if (status === 'error') {
        return (
            <mesh>
                <cylinderGeometry args={[2, 2, 0.3, 16]} />
                <meshBasicMaterial color="#FF0000" />
            </mesh>
        );
    }

    return (
        <primitive 
            ref={meshRef} 
            object={fbx} 
            dispose={null}
            scale={scale}
        />
    );
}

function CoinFallback() {
    return (
        <mesh>
            <cylinderGeometry args={[5, 5, 0.5, 16]} />
            <meshStandardMaterial 
                color="#FFD700"
                metalness={1.0}
                roughness={1}
                envMapIntensity={1}
            />
        </mesh>
    );
}

export default function InteractiveCoin3D({
    className = "",
    autoRotate = true,
    rotationSpeed = 0.5,
    scale = 0.4,
    enableControls = true
}: InteractiveCoin3DProps) {
    const [hasContextLost, setHasContextLost] = useState(false);

    const canvasProps = useMemo(() => ({
        camera: { 
            // AQUI: Ajuste a posição Y para -40 para descer a moeda na imagem
            position: [0, -40, 100] as [number, number, number], 
            fov: 20
        },
        gl: {
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance", 
            failIfMajorPerformanceCaveat: false,
            preserveDrawingBuffer: false,
            depth: true,
            stencil: false
        } as THREE.WebGLRendererParameters,
        dpr: 1, 
        performance: { min: 0.8 } 
    }), []);

    useEffect(() => {
        const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn('WebGL Context Lost, tentando recuperar...');
            setHasContextLost(true);
            
            setTimeout(() => {
                setHasContextLost(false);
            }, 1000);
        };

        const canvas = document.querySelector('canvas'); 
        if (canvas) {
            canvas.addEventListener('webglcontextlost', handleContextLost);
            canvas.addEventListener('webglcontextrestored', () => {
                console.log('WebGL Context recuperado');
                setHasContextLost(false);
            });

            return () => {
                canvas.removeEventListener('webglcontextlost', handleContextLost);
            };
        }
    }, []);

    if (hasContextLost) {
        return (
            <div className={`w-full h-full flex items-center justify-center ${className}`}>
                <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 animate-spin"></div>
                    <p className="text-sm text-gray-600">Recuperando renderização...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas {...canvasProps}>
                <Suspense fallback={<CoinFallback />}>
                    <ambientLight intensity={0.8} color="#FFFFE0" />
                    <directionalLight 
                        position={[10, 10, 5]} 
                        intensity={1.2}
                        color="#FFFFE0"
                    />
                    
                    <CoinMeshWithFBX 
                        autoRotate={autoRotate}
                        rotationSpeed={rotationSpeed}
                        scale={scale}
                    />
                    
                    {enableControls && (
                        <ControlsWrapper 
                            autoRotate={autoRotate}
                            rotationSpeed={rotationSpeed}
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}
