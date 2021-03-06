/**
 * @author mrdoob / http://mrdoob.com/
 * @author benaadams / https://twitter.com/ben_a_adams
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Geometry } from '../core/Geometry';
import { BufferGeometry } from '../core/BufferGeometry';
import { Float32BufferAttribute } from '../core/BufferAttribute';
import { Vector3 } from '../math/Vector3';

// SphereGeometry
class SphereGeometry extends Geometry
{
	constructor( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength )
	{
		super();
		this.type = 'SphereGeometry';

		this.parameters = {
			radius: radius,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			phiStart: phiStart,
			phiLength: phiLength,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		this.fromBufferGeometry( new SphereBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) );
		this.mergeVertices();
	}

}

// SphereBufferGeometry
class SphereBufferGeometry extends BufferGeometry
{
	constructor( radius, widthSegments, heightSegments, phiStart: number = 0, phiLength: number = Math.PI * 2, thetaStart: number = 0, thetaLength: number = Math.PI )
	{
		super();

		this.type = 'SphereBufferGeometry';

		this.parameters = {
			radius: radius,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			phiStart: phiStart,
			phiLength: phiLength,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		radius = radius || 1;

		widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
		heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

		phiStart = phiStart !== undefined ? phiStart : 0;
		phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

		thetaStart = thetaStart !== undefined ? thetaStart : 0;
		thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

		var thetaEnd = thetaStart + thetaLength;

		var ix, iy;

		var index = 0;
		var grid = [];

		var vertex = new Vector3();
		var normal = new Vector3();

		// buffers
		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// generate vertices, normals and uvs
		for ( iy = 0; iy <= heightSegments; iy++ )
		{
			var verticesRow = [];
			var v = iy / heightSegments;
			for ( ix = 0; ix <= widthSegments; ix++ )
			{
				var u = ix / widthSegments;

				// vertex
				vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
				vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
				vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal
				normal.set( vertex.x, vertex.y, vertex.z ).normalize();
				normals.push( normal.x, normal.y, normal.z );

				// uv
				uvs.push( u, 1 - v );
				verticesRow.push( index++ );
			}

			grid.push( verticesRow );
		}

		// indices
		for ( iy = 0; iy < heightSegments; iy++ )
		{
			for ( ix = 0; ix < widthSegments; ix++ )
			{
				var a = grid[ iy ][ ix + 1 ];
				var b = grid[ iy ][ ix ];
				var c = grid[ iy + 1 ][ ix ];
				var d = grid[ iy + 1 ][ ix + 1 ];

				if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d );
				if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d );
			}
		}

		// build geometry
		this.setIndex( indices );
		this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );
	}

}


export { SphereGeometry, SphereBufferGeometry };
