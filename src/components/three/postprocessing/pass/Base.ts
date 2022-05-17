import { createRef } from 'react';
import * as THREE from 'three';
import { Pass, ShaderPass } from 'three-stdlib';

export abstract class BasePass<T extends Pass> {
	public ref

	constructor() {
		this.ref = createRef<T>()
	}

	protected abstract _initController: () => void
	abstract update: (...args: any) => void

	protected get pass() {
		return this.ref.current
	}

	protected validatedPass = (enabled = true) => {
		if (!this.pass) return null
		this.pass.enabled = enabled
		return enabled ? this.pass : null
	}
}

export abstract class BaseShader extends BasePass<ShaderPass> {
	public shader: THREE.Shader

	constructor(shader: THREE.Shader) {
		super()
		this.shader = shader
	}
}

export abstract class BaseCustomShader extends BaseShader {
	constructor(uniforms: { [uniform: string]: THREE.IUniform<any> }, vertexShader: string, fragmentShader: string) {
		const shader = {
			uniforms: THREE.UniformsUtils.merge([{ tDiffuse: { value: null } }, uniforms]),
			vertexShader,
			fragmentShader
		}
		super(shader)
	}
}
