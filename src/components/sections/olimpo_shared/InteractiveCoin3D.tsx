import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import React from 'react'; // Mantendo a importação explícita de React

interface InteractiveCoin3DProps {
    className?: string;
    autoRotate?: boolean; // Rotação baseada em useFrame (retorno ao idle)
    rotationSpeed?: number;
    scale?: number;
    enableControls?: boolean; // Permite interação manual (OrbitControls)
}

interface ControlsWrapperProps {
    autoRotate: boolean;
    rotationSpeed: number;
}

// Componente de controle do mouse e rotação suave
function ControlsWrapper({ autoRotate, rotationSpeed }: ControlsWrapperProps) {
    // Correção: `gl` e `camera` são obtidos automaticamente pelo OrbitControls
    const { camera } = useThree();
    const controlsRef = useRef<any>(null); // Referência aos OrbitControls
    const lastInteraction = useRef(Date.now());
    const isInteracting = useRef(false);

    // Duração do período de inatividade antes de retomar a rotação (em ms)
    const IDLE_TIMEOUT = 3000; 
    // Fator de suavização para retomar a rotação
    const SMOOTH_FACTOR = 0.05; 

    // Efeitos para monitorar interação do usuário
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

    useFrame((_, delta) => { // Usando '_' para o state não utilizado
        const controls = controlsRef.current;
        if (!controls || !controls.target || !camera) return;

        // 1. Manter a câmera atualizada (necessário para damping)
        controls.update();

        // 2. Verificar ociosidade para retomar a rotação
        const now = Date.now();
        const isIdle = !isInteracting.current && (now - lastInteraction.current > IDLE_TIMEOUT);

        if (autoRotate && isIdle) {
            // Interpolação para girar suavemente (simulando a rotação de idle)
            
            // Define o vetor da posição atual da câmera
            const position = camera.position;
            
            // Define o vetor do ponto para onde a câmera está olhando (target)
            const target = controls.target;
            
            // Calcula o ângulo atual (horizontal)
            const radius = position.distanceTo(target);
            const currentAngle = Math.atan2(position.x - target.x, position.z - target.z);

            // Calcula o novo ângulo: (A rotação é aplicada em passos)
            // Usamos delta para garantir a taxa de quadros (frames per second)
            const newAngle = currentAngle + rotationSpeed * delta; 

            // Calcula a nova posição X e Z
            position.x = target.x + radius * Math.sin(newAngle);
            position.z = target.z + radius * Math.cos(newAngle);

            // Aplica a nova posição à câmera
            camera.position.copy(position);

            // Notifica o OrbitControls para atualizar
            controls.update();

        } else if (isInteracting.current) {
            // Se o usuário estiver interagindo, apenas atualiza o tempo
            lastInteraction.current = now;
        }
    });
    
    // Controles de órbita (rotação, zoom manual)
    return (
        <OrbitControls
            ref={controlsRef}
            // CORREÇÃO: Removido 'args={[camera, gl.domElement]}'. O OrbitControls pega isso do contexto.
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={false} // Desabilita o autoRotate nativo (usamos useFrame)
            minDistance={40} // Limite de zoom in
            maxDistance={150} // Limite de zoom out
            enableDamping={true}
            dampingFactor={0.05}
        />
    );
}

// Componente da moeda com modelo FBX e texturas
function CoinMeshWithFBX({ 
    scale = 0.5
}: {
    autoRotate?: boolean;
    rotationSpeed?: number;
    scale?: number;
}) {
    const meshRef = useRef<THREE.Group>(null);
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    // Carregar modelo FBX usando useFBX hook
    const fbx = useFBX('../../OlimpoBarBer/coin/moeda.fbx'); 

    useEffect(() => {
        let isMounted = true;
        
        const loadTextures = async () => {
            try {
                const textureLoader = new TextureLoader();
                
                // Carregar texturas
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

                // Aplicar textura ao modelo
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
            scale={scale} // Aplica a escala aqui de forma reativa
        />
    );
}

// Fallback quando há problemas de carga
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
    scale = 0.5,
    enableControls = true
}: InteractiveCoin3DProps) {
    const [hasContextLost, setHasContextLost] = useState(false);

    // Configuração do Canvas (Camera, Renderer, etc.)
    const canvasProps = useMemo(() => ({
        camera: { 
            // CORREÇÃO AQUI: Abaixa a posição Y da câmera para centralizar a moeda verticalmente no Canvas
            position: [0, -15, 100] as [number, number, number], 
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

    // Recuperar contexto em caso de perda
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
                    {/* Iluminação amarela clara */}
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
                    
                    {/* Controles de órbita (interação manual + idle rotation) */}
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
