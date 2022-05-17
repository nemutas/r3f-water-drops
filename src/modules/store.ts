import * as THREE from 'three';
import { Data } from '../types/types';

export const AMOUNT = 20

export const datas: Data[] = [...Array(AMOUNT)].map(() => {
	const position = new THREE.Vector3(THREE.MathUtils.randFloat(-5, 5), THREE.MathUtils.randFloat(-5, 5), 0)
	const scale = THREE.MathUtils.randFloat(0.5, 1.5)
	return { position, scale }
})
