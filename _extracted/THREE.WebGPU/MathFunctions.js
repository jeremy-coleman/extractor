import { PI } from './MathConsts.js';
import CodeNode from './CodeNode.js';
import FunctionNode from './FunctionNode.js';

// variadic macros
const saturateMacro = new CodeNode( '#define saturate(a) clamp( a, 0.0, 1.0 )' );
const whiteComplementMacro = new CodeNode( '#define whiteComplement(a) ( 1.0 - saturate( a ) )' );

const transformDirection = new FunctionNode( `
vec3 ( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}` );

const inverseTransformDirection = new FunctionNode( `
vec3 ( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}` );

const pow2 = new FunctionNode( 'float pow2( const in float x ) { return x*x; }' );
new FunctionNode( 'float pow3( const in float x ) { return x*x*x; }' );
new FunctionNode( 'float pow4( const in float x ) { float x2 = x*x; return x2*x2; }' );

new FunctionNode( 'float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }' );

new FunctionNode( 'float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }' );

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
new FunctionNode( `
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;

	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, 3.141592653589793 );

	return fract(sin(sn) * c);

}` ).setIncludes( [ PI ] );

new FunctionNode( 'float precisionSafeLength( vec3 v ) { return length( v ); }' );

export { inverseTransformDirection, pow2, saturateMacro, transformDirection, whiteComplementMacro };
