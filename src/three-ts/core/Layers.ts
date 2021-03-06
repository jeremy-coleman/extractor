/**
 * @author mrdoob / http://mrdoob.com/
 */

class Layers
{

	mask: number;

	constructor()
	{
		this.mask = 1 | 0;
	}

	set( channel: number )
	{
		this.mask = 1 << channel | 0;
	}

	enable( channel: number )
	{
		this.mask |= 1 << channel | 0;
	}

	toggle( channel: number )
	{
		this.mask ^= 1 << channel | 0;
	}

	disable( channel: number )
	{
		this.mask &= ~( 1 << channel | 0 );
	}

	test( layers: Layers ): boolean
	{
		return ( this.mask & layers.mask ) !== 0;
	}

}


export { Layers };
