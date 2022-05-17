import React, { FC } from 'react';
import * as THREE from 'three';
import { Plane, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import fragmentShader from '../../modules/glsl/raymarchingFrag.glsl';
import vertexShader from '../../modules/glsl/raymarchingVert.glsl';
import { AMOUNT, datas } from '../../modules/store';
import { publicPath } from '../../modules/utils';

export const ScreenPlane: FC = () => {
	const { viewport } = useThree()

	const texture = useTexture(publicPath('/assets/images/wlop.jpg'))
	texture.encoding = THREE.sRGBEncoding
	texture.wrapS = THREE.MirroredRepeatWrapping
	texture.wrapT = THREE.MirroredRepeatWrapping

	// Calculate screen size and texture aspect ratio
	const textureAspect = texture.image.width / texture.image.height
	const aspect = viewport.aspect
	const ratio = aspect / textureAspect
	const [x, y] = aspect < textureAspect ? [ratio, 1] : [1, 1 / ratio]

	// Replace embedded text
	const fragment = fragmentShader.replaceAll('AMOUNT', AMOUNT.toString())

	const shader: THREE.Shader = {
		uniforms: {
			u_aspect: { value: viewport.aspect },
			u_datas: { value: datas },
			u_texture: { value: texture },
			u_uvScale: { value: new THREE.Vector2(x, y) }
		},
		vertexShader,
		fragmentShader: fragment
	}

	useFrame(() => {
		datas.forEach((data, i) => {
			shader.uniforms.u_datas.value[i].position.copy(data.position)
		})
	})

	return (
		<Plane args={[1, 1]} scale={[viewport.width, viewport.height, 1]}>
			<shaderMaterial args={[shader]} />
		</Plane>
	)
}
