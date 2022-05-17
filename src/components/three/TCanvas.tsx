import React, { FC, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PostProcessing } from './postprocessing/PostProcessing';
import { ScreenPlane } from './ScreenPlane';
import { Simulator } from './Simulator';

export const TCanvas: FC = () => {
	return (
		<Canvas
			camera={{
				position: [0, 0, 15],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}>
			<color attach="background" args={['#000']} />
			<Suspense fallback={null}>
				<Simulator />
				<ScreenPlane />
				<PostProcessing />
			</Suspense>
		</Canvas>
	)
}
