import { Interpolant } from './Interpolant';
import { Quaternion } from '../Quaternion';

/**
 * Spherical linear unit quaternion interpolant.
 *
 * @author tschw
 */

class QuaternionLinearInterpolant extends Interpolant
{
	
	constructor( parameterPositions, sampleValues, sampleSize, resultBuffer )
	{
		super( parameterPositions, sampleValues, sampleSize, resultBuffer );
	}

	interpolate_( i1, t0, t, t1 )
	{
		var result = this.resultBuffer,
			values = this.sampleValues,
			stride = this.valueSize,
			offset = i1 * stride,
			alpha = ( t - t0 ) / ( t1 - t0 );

		for ( var end = offset + stride; offset !== end; offset += 4 )
			Quaternion.slerpFlat( result, 0, values, offset - stride, values, offset, alpha );

		return result;
	}

}


export { QuaternionLinearInterpolant };
