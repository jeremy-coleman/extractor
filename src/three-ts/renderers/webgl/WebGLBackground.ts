/**
 * @author mrdoob / http://mrdoob.com/
 */

import { BackSide } from '../../constants';
import { OrthographicCamera } from '../../cameras/OrthographicCamera';
import { BoxBufferGeometry } from '../../geometries/BoxGeometry';
import { PlaneBufferGeometry } from '../../geometries/PlaneGeometry';
import { MeshBasicMaterial } from '../../materials/MeshBasicMaterial';
import { ShaderMaterial } from '../../materials/ShaderMaterial';
import { Color } from '../../math/Color';
import { Mesh } from '../../objects/Mesh';
import { ShaderLib } from '../shaders/ShaderLib';
import { WebGLRenderer } from "../WebGLRenderer";
import { WebGLState } from "./WebGLState";
import { WebGLGeometries } from "./WebGLGeometries";

class WebGLBackground
{
	renderer: WebGLRenderer;
	state: WebGLState;
	geometries: WebGLGeometries;
	premultipliedAlpha;

	constructor( renderer, state, geometries, premultipliedAlpha )
	{
		this.renderer = renderer;
		this.state = state;
		this.geometries = geometries;
		this.premultipliedAlpha = premultipliedAlpha;
	}

	clearColor: Color = new Color( 0x000000 );
	clearAlpha: number = 0;

	planeCamera;
	planeMesh;
	boxMesh;

	render( renderList, scene, camera, forceClear )
	{
		var background = scene.background;
		if ( background === null )
		{
			this.setClear( this.clearColor, this.clearAlpha );
		} else if ( background && background.isColor )
		{
			this.setClear( background, 1 );
			forceClear = true;
		}

		if ( this.renderer.autoClear || forceClear )
			this.renderer.clear( this.renderer.autoClearColor, this.renderer.autoClearDepth, this.renderer.autoClearStencil );

		if ( background && background.isCubeTexture )
		{
			if ( this.boxMesh === undefined )
			{
				this.boxMesh = new Mesh(
					new BoxBufferGeometry( 1, 1, 1 ),
					new ShaderMaterial( {
						uniforms: ShaderLib.cube.uniforms,
						vertexShader: ShaderLib.cube.vertexShader,
						fragmentShader: ShaderLib.cube.fragmentShader,
						side: BackSide,
						depthTest: true,
						depthWrite: false,
						fog: false
					} )
				);

				this.boxMesh.geometry.removeAttribute( 'normal' );
				this.boxMesh.geometry.removeAttribute( 'uv' );

				this.boxMesh.onBeforeRender = function ( renderer, scene, camera )
				{
					this.matrixWorld.copyPosition( camera.matrixWorld );
				};
				this.geometries.update( this.boxMesh.geometry );
			}
			this.boxMesh.material.uniforms.tCube.value = background;
			renderList.push( this.boxMesh, this.boxMesh.geometry, this.boxMesh.material, 0, null );
		} else if ( background && background.isTexture )
		{
			if ( this.planeCamera === undefined )
			{
				this.planeCamera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
				this.planeMesh = new Mesh(
					new PlaneBufferGeometry( 2, 2 ),
					new MeshBasicMaterial( { depthTest: false, depthWrite: false, fog: false } )
				);
				this.geometries.update( this.planeMesh.geometry );
			}

			this.planeMesh.material.map = background;
			// TODO Push this to renderList
			this.renderer.renderBufferDirect( this.planeCamera, null, this.planeMesh.geometry, this.planeMesh.material, this.planeMesh, null );
		}
	}

	setClear( color, alpha )
	{
		this.state.buffers.color.setClear( color.r, color.g, color.b, alpha, this.premultipliedAlpha );
	}

	getClearColor()
	{
		return this.clearColor;
	}

	setClearColor( color, alpha?: number )
	{
		this.clearColor.set( color );
		this.clearAlpha = alpha !== undefined ? alpha : 1;
		this.setClear( this.clearColor, this.clearAlpha );
	}

	getClearAlpha()
	{
		return this.clearAlpha;
	}

	setClearAlpha( alpha )
	{
		this.clearAlpha = alpha;
		this.setClear( this.clearColor, this.clearAlpha );
	}

}


export { WebGLBackground };
