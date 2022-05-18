import React from 'react';
import { useGLTF } from '@react-three/drei';

function Model({ modelURL }: { modelURL: string }) {
  const { scene } = useGLTF(modelURL);
  return <primitive object={scene} />;
}

export default Model;
