/**
 * @author sroucheray / http://sroucheray.org/
 * @author mrdoob / http://mrdoob.com/
 */

import { LineSegments } from '../objects/LineSegments';
import { VertexColors } from '../constants';
import { LineBasicMaterial } from '../materials/LineBasicMaterial';
import { Float32BufferAttribute } from '../core/BufferAttribute';
import { BufferGeometry } from '../core/BufferGeometry';

class AxesHelper extends LineSegments
{
	constructor( size )
	{
		size = size || 1;

		var vertices = [
			0, 0, 0, size, 0, 0,
			0, 0, 0, 0, size, 0,
			0, 0, 0, 0, 0, size
		];

		var colors = [
			1, 0, 0, 1, 0.6, 0,
			0, 1, 0, 0.6, 1, 0,
			0, 0, 1, 0, 0.6, 1
		];

		var geometry = new BufferGeometry();
		geometry.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		geometry.addAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

		var material = new LineBasicMaterial( { vertexColors: VertexColors } );

		super( geometry, material );
	}
}

export { AxesHelper };
