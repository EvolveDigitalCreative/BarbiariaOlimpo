import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// OrbitControls está aqui para a interatividade
import { OrbitControls, useFBX } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import React from 'react';

// Props completas
interface InteractiveCoin3DProps {
    className?: string;
    scale?: number;
    modelPositionY?: number; 
    autoRotate?: boolean; // Se a moeda deve girar sozinha
    rotationSpeed?: number; // Velocidade da rotação automática
    enableControls?: boolean; // Se o usuário pode interagir (girar/zoom)
}

// Mesh da Moeda (sem mudanças significativas aqui)
function CoinMeshWithFBX({ 
    scale = 0.4,
    modelPositionY = 0,
    autoRotate = true,
    rotationSpeed = 0.5
}: {
    scale?: number;
    modelPositionY?: number;
    autoRotate?: boolean;
    rotationSpeed?: number;
}) {
    const meshRef = useRef<THREE.Group>(null);
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const fbx = useFBX('../../OlimpoBarBer/coin/moeda.fbx'); 

    // Rotação automática (só roda se autoRotate = true E NÃO houver interação)
    // A lógica de interação do OrbitControls pausa essa rotação
    useFrame((_, delta) => {
        // A checagem de autoRotate aqui é redundante se OrbitControls estiver ativo,
        // mas deixamos para clareza ou caso OrbitControls seja desativado.
        if (meshRef.current && autoRotate) { 
             // Se OrbitControls estiver ativo, ele pode sobrescrever isso.
             // Para garantir rotação contínua mesmo com OrbitControls, 
             // precisaríamos de lógica mais complexa ou usar autoRotate do OrbitControls.
             // Por agora, focamos na interatividade manual.
             // meshRef.current.rotation.y += rotationSpeed * delta; // Comentado para priorizar OrbitControls
        }
    });

    // Carregamento de Texturas (sem mudança)
    useEffect(() => {
        let isMounted = true;
        const loadTextures = async () => { /* ... seu código de carregar textura ... */ 
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
                        map: baseColorTexture, metalnessMap: metallicTexture, normalMap: normalTexture,
                        roughnessMap: roughnessTexture, emissiveMap: baseColorTexture, 
                        emissiveIntensity: 0.15, metalness: 1, roughness: 1, envMapIntensity: 15
                    });
                        if (material.normalMap) { material.normalScale = new THREE.Vector2(3, 3); }
                        child.material = material;
                    }
                });
                setStatus('loaded');
            } catch (error) {
                console.error('Erro ao carregar texturas:', error);
                if (isMounted) { setStatus('error'); }
            }
        };
        loadTextures();
        return () => { isMounted = false; };
    }, [fbx]);
    
    // Fallbacks (sem mudança)
     if (status === 'loading') {
        return ( <mesh position={[0, modelPositionY, 0]}> <cylinderGeometry args={[2, 2, 0.3, 16]} /> <meshBasicMaterial color="#FFA500" /> </mesh> );
    }
    if (status === 'error') {
        return ( <mesh position={[0, modelPositionY, 0]}> <cylinderGeometry args={[2, 2, 0.3, 16]} /> <meshBasicMaterial color="#FF0000" /> </mesh> );
    }

    return (
        <primitive 
            ref={meshRef} 
            object={fbx} 
            dispose={null}
            scale={scale}
            position={[0, modelPositionY, 0]}
        />
    );
}

// Fallback Simples
function CoinFallback() { /* ... seu fallback ... */ 
     return ( <mesh> <cylinderGeometry args={[5, 5, 0.5, 16]} /> <meshStandardMaterial color="#FFD700" metalness={1.0} roughness={1} envMapIntensity={1} /> </mesh> );
}

// Componente Principal Exportado
export default function InteractiveCoin3D({
    className = "",
    scale = 0.4,
    modelPositionY = 0, // Ajustado para 0 como padrão para centralizar na tela cheia
    autoRotate = false, // Padrão: Sem rotação automática na página interativa
    rotationSpeed = 0.5,
    enableControls = true // Padrão: Interatividade LIGADA
}: InteractiveCoin3DProps) {
    const [hasContextLost, setHasContextLost] = useState(false);

    // Configs da Câmera para Tela Cheia
    const canvasProps = useMemo(() => ({
        camera: { 
            position: [0, 0, 100] as [number, number, number], // Câmera um pouco mais próxima
            fov: 50, // FOV maior para a tela cheia
            near: 0.1,
            far: 1000,
        },
        gl: { /* ... suas configs GL ... */ 
            antialias: true, alpha: true, powerPreference: "high-performance", 
            failIfMajorPerformanceCaveat: false, preserveDrawingBuffer: false,
            depth: true, stencil: false
        } as THREE.WebGLRendererParameters,
        dpr: Math.max(1, window.devicePixelRatio / 2), // DPR adaptativo
        performance: { min: 0.7 } 
    }), []);

    // Lógica de Context Lost (sem mudança)
    useEffect(() => { /* ... seu useEffect de context lost ... */ 
         const handleContextLost = (event: Event) => {
            event.preventDefault(); console.warn('WebGL Context Lost...'); setHasContextLost(true);
            setTimeout(() => { setHasContextLost(false); }, 1000);
        };
        const canvas = document.querySelector('canvas'); 
        if (canvas) {
            canvas.addEventListener('webglcontextlost', handleContextLost);
            canvas.addEventListener('webglcontextrestored', () => { console.log('WebGL Context recuperado'); setHasContextLost(false); });
            return () => { canvas.removeEventListener('webglcontextlost', handleContextLost); };
        }
    }, []);
    if (hasContextLost) { /* ... seu fallback de context lost ... */ 
        return ( <div className={`w-full h-full flex items-center justify-center ${className}`}> <div className="text-center"> <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 animate-spin"></div> <p className="text-sm text-gray-600">Recuperando...</p> </div> </div> );
     }

    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas {...canvasProps}>
                <Suspense fallback={<CoinFallback />}>
                    {/* Iluminação ajustada para a moeda maior */}
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 10, 5]} intensity={1.0} color="#FFFFE0"/>
                    <spotLight 
                        position={[-50, 20, 50]} // Luz lateral mais suave
                        intensity={4} 
                        angle={0.3} 
                        penumbra={1} 
                        color="#FFFFE0" 
                        distance={300}
                    />
                    
                    <CoinMeshWithFBX 
                        scale={scale}
                        modelPositionY={modelPositionY}
                        autoRotate={autoRotate}
                        rotationSpeed={rotationSpeed}
                    />
                    
                    {/* Renderiza OrbitControls SE enableControls for true */}
                    {enableControls && (
                        <OrbitControls
                            enablePan={false}
                            enableZoom={true} // Permitir zoom
                            enableRotate={true} // Permitir rotação manual
                            // Se autoRotate da prop for true E enableControls for true,
                            // o OrbitControls pode girar sozinho.
                            autoRotate={autoRotate} 
                            autoRotateSpeed={autoRotate ? rotationSpeed * 6 : 0} // Velocidade ajustada
                            minDistance={50}  // Zoom mínimo
                            maxDistance={180} // Zoom máximo
                            enableDamping={true}
                            dampingFactor={0.05}
                            target={[0, modelPositionY, 0]} // Foca na altura da moeda
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}