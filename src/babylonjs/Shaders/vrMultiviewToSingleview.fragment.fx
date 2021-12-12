precision mediump sampler2DArray;

varying vec2 vUV;
uniform sampler2DArray multiviewSampler;
uniform int imageIndex;

void main(void)
{
	gl_FragColor = texture2D(multiviewSampler, vec3(vUV, imageIndex));
}