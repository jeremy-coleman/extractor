import WebGPUBinding from './WebGPUBinding.js';
import { GPUTextureViewDimension, GPUBindingType } from './constants.js';

class WebGPUSampledTexture extends WebGPUBinding {

	constructor( name, texture ) {

		super( name );

		this.texture = texture;

		this.dimension = GPUTextureViewDimension.TwoD;

		this.type = GPUBindingType.SampledTexture;
		this.visibility = GPUShaderStage.FRAGMENT;

		this.textureGPU = null; // set by the renderer

	}

	getTexture() {

		return this.texture;

	}

}

WebGPUSampledTexture.prototype.isSampledTexture = true;

export { WebGPUSampledTexture };
