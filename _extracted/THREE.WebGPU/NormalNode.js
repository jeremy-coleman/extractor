import Node from './Node.js';
import AttributeNode from './AttributeNode.js';
import VaryNode from './VaryNode.js';
import ModelNode from './ModelNode.js';
import CameraNode from './CameraNode.js';
import OperatorNode from './OperatorNode.js';
import MathNode from './MathNode.js';
import { inverseTransformDirection } from './MathFunctions.js';

class NormalNode extends Node {

	static LOCAL = 'local';
	static WORLD = 'world';
	static VIEW = 'view';

	constructor( scope = NormalNode.LOCAL ) {

		super( 'vec3' );

		this.scope = scope;

	}

	generate( builder, output ) {

		const type = this.getType( builder );
		const nodeData = builder.getDataFromNode( this, builder.shaderStage );
		const scope = this.scope;

		let localNormalNode = nodeData.localNormalNode;

		if ( localNormalNode === undefined ) {

			localNormalNode = new AttributeNode( 'normal', 'vec3' );

			nodeData.localNormalNode = localNormalNode;

		}

		let outputNode = localNormalNode;

		if ( scope === NormalNode.VIEW ) {

			let viewNormalNode = nodeData.viewNormalNode;

			if ( viewNormalNode === undefined ) {

				const vertexNormalNode = new OperatorNode( '*', new ModelNode( ModelNode.NORMAL_MATRIX ), localNormalNode );

				viewNormalNode = new MathNode( MathNode.NORMALIZE, new VaryNode( vertexNormalNode ) );

				nodeData.viewNormalNode = viewNormalNode;

			}

			outputNode = viewNormalNode;

		} else if ( scope === NormalNode.WORLD ) {

			let worldNormalNode = nodeData.worldNormalNode;

			if ( worldNormalNode === undefined ) {

				const vertexNormalNode = inverseTransformDirection.call( { dir: new NormalNode( NormalNode.VIEW ), matrix: new CameraNode( CameraNode.VIEW_MATRIX ) } );

				worldNormalNode = new MathNode( MathNode.NORMALIZE, new VaryNode( vertexNormalNode ) );

				nodeData.worldNormalNode = worldNormalNode;

			}

			outputNode = worldNormalNode;

		}

		const normalSnipped = outputNode.build( builder, type );

		return builder.format( normalSnipped, type, output );

	}

}

export default NormalNode;
