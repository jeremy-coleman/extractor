/**
 * Abstract base class of interpolants over parametric samples.
 *
 * The parameter domain is one dimensional, typically the time or a path
 * along a curve defined by the data.
 *
 * The sample values can have any dimensionality and derived classes may
 * apply special interpretations to the data.
 *
 * This class provides the interval seek in a Template Method, deferring
 * the actual interpolation to derived classes.
 *
 * Time complexity is O(1) for linear access crossing at most two points
 * and O(log N) for random access, where N is the number of positions.
 *
 * References:
 *
 * 		http://www.oodesign.com/template-method-pattern.html
 *
 * @author tschw
 */

class Interpolant
{
	parameterPositions;
	sampleValues;
	valueSize: number;

	defaultSettings_ = {};
	settings; // optional, subclass-specific settings structure

	resultBuffer;

	private _cachedIndex: number;

	constructor( parameterPositions, sampleValues, sampleSize: number, resultBuffer?)
	{
		this.parameterPositions = parameterPositions;
		this.sampleValues = sampleValues;
		this.valueSize = sampleSize;

		this.resultBuffer = resultBuffer !== undefined ? resultBuffer : new sampleValues.constructor( sampleSize );

		this._cachedIndex = 0;
	}

	evaluate( t:number )
	{
		let pp = this.parameterPositions,
			i1:number = this._cachedIndex,

			t1 = pp[ i1 ],
			t0 = pp[ i1 - 1 ];

		validate_interval: {
			seek: {
				let right;
				linear_scan: {
					//- See http://jsperf.com/comparison-to-undefined/3
					forward_scan: if ( !( t < t1 ) )
					{
						for ( let giveUpAt = i1 + 2; ; )
						{
							if ( t1 === undefined )
							{
								if ( t < t0 ) break forward_scan;

								// after end
								i1 = pp.length;
								this._cachedIndex = i1;
								return this.afterEnd_( i1 - 1, t, t0 );
							}

							if ( i1 === giveUpAt ) break; // this loop

							t0 = t1;
							t1 = pp[ ++i1 ];

							if ( t < t1 )
							{
								// we have arrived at the sought interval
								break seek;
							}
						}

						// prepare binary search on the right side of the index
						right = pp.length;
						break linear_scan;
					}

					if ( !( t >= t0 ) )
					{
						// looping?
						let t1global = pp[ 1 ];

						if ( t < t1global )
						{
							i1 = 2; // + 1, using the scan for the details
							t0 = t1global;
						}

						// linear reverse scan
						for ( let giveUpAt = i1 - 2; ; )
						{
							if ( t0 === undefined )
							{
								// before start
								this._cachedIndex = 0;
								return this.beforeStart_( 0, t, t1 );
							}

							if ( i1 === giveUpAt ) break; // this loop

							t1 = t0;
							t0 = pp[ --i1 - 1 ];

							if ( t >= t0 )
							{
								// we have arrived at the sought interval
								break seek;
							}
						}

						// prepare binary search on the left side of the index
						right = i1;
						i1 = 0;
						break linear_scan;
					}

					// the interval is valid
					break validate_interval;

				} // linear scan

				// binary search
				while ( i1 < right )
				{
					let mid = ( i1 + right ) >>> 1;

					if ( t < pp[ mid ] )
						right = mid;
					else
						i1 = mid + 1;
				}

				t1 = pp[ i1 ];
				t0 = pp[ i1 - 1 ];

				// check boundary cases, again
				if ( t0 === undefined )
				{
					this._cachedIndex = 0;
					return this.beforeStart_( 0, t, t1 );
				}

				if ( t1 === undefined )
				{
					i1 = pp.length;
					this._cachedIndex = i1;
					return this.afterEnd_( i1 - 1, t0, t );
				}
			} // seek

			this._cachedIndex = i1;
			this.intervalChanged_( i1, t0, t1 );
		} // validate_interval

		return this.interpolate_( i1, t0, t, t1 );
	}

	// Note: The indirection allows central control of many interpolants.
	// --- Protected interface

	getSettings_()
	{
		return this.settings || this.defaultSettings_;
	}

	copySampleValue_( index )
	{
		// copies a sample value to the result buffer
		let result = this.resultBuffer,
			values = this.sampleValues,
			stride = this.valueSize,
			offset = index * stride;

		for ( let i = 0; i !== stride; ++i )
			result[ i ] = values[ offset + i ];

		return result;
	}

	// Template methods for derived classes:
	interpolate_( i1, t0, t, t1 )
	{
		throw new Error( 'call to abstract method' );
		// implementations shall return this.resultBuffer
	}

	intervalChanged_(i1, t0, t1 )
	{
		// empty
	}

}


export { Interpolant };
