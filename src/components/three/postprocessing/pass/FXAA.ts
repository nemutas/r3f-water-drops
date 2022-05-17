import { FXAAShader } from 'three-stdlib';
import { Size } from '@react-three/fiber';
import { BaseShader } from './Base';

export class FXAA extends BaseShader {
	constructor() {
		super(FXAAShader)
	}

	protected _initController = () => {}

	update = (size: Size) => {
		// validate pass
		const pass = this.validatedPass()
		if (!pass) return

		// update uniforms
		pass.uniforms.resolution.value.set(1 / size.width, 1 / size.height)
	}
}
