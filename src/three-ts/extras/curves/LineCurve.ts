import { Vector2 } from '../../math/Vector2.js';
import { Curve } from '../core/Curve.js';


class LineCurve extends Curve
{
	v1: Vector2;
	v2: Vector2;

	constructor( v1, v2 )
	{
		super();

		this.type = 'LineCurve';

		this.v1 = v1 || new Vector2();
		this.v2 = v2 || new Vector2();
	}

	getPoint( t, optionalTarget )
	{
		var point = optionalTarget || new Vector2();

		if ( t === 1 )
			point.copy( this.v2 );
		else
		{
			point.copy( this.v2 ).sub( this.v1 );
			point.multiplyScalar( t ).add( this.v1 );
		}

		return point;
	}

	// Line curve is linear, so we can overwrite default getPointAt
	getPointAt( u, optionalTarget )
	{
		return this.getPoint( u, optionalTarget );
	}

	getTangent( /* t */ )
	{
		var tangent = this.v2.clone().sub( this.v1 );
		return tangent.normalize();
	}

	copy( source )
	{
		super.copy( source );

		this.v1.copy( source.v1 );
		this.v2.copy( source.v2 );

		return this;
	}

	toJSON()
	{
		var data = Curve.prototype.toJSON.call( this );

		data.v1 = this.v1.toArray();
		data.v2 = this.v2.toArray();

		return data;
	}

	fromJSON( json )
	{
		super.fromJSON( json );

		this.v1.fromArray( json.v1 );
		this.v2.fromArray( json.v2 );

		return this;
	}

}


export { LineCurve };
