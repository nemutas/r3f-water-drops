import React, { FC } from 'react';
import { Effects } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FXAA } from './pass/FXAA';

export const PostProcessing: FC = () => {
	const fxaa = new FXAA()

	useFrame(({ size }) => {
		fxaa.update(size)
	})

	return (
		<Effects>
			<shaderPass ref={fxaa.ref} args={[fxaa.shader]} />
		</Effects>
	)
}
