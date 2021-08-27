import ConstNode from '../core/ConstNode.js';

const PI = new ConstNode( '3.141592653589793', 'float', 'PI' );
const RECIPROCAL_PI = new ConstNode( '0.3183098861837907', 'float', 'RECIPROCAL_PI' );
const EPSILON = new ConstNode( '1e-6', 'float', 'EPSILON' );

new ConstNode( '0.04', 'float', 'DEFAULT_SPECULAR_COEFFICIENT' );

export { EPSILON, PI, RECIPROCAL_PI };
