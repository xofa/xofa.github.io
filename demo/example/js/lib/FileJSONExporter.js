/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.FileJSONExporter = function () {};

THREE.FileJSONExporter.prototype = {

	constructor: THREE.FileJSONExporter,

	parse: function ( object ) {

		var output = {
			"meshes":[]
		};
	

		var parseMesh = function ( mesh ) {

			var nbVertex = 0;
			var nbNormals = 0;
			var nbVertexUvs = 0;

			var geometry = mesh.geometry;

			var normalMatrixWorld = new THREE.Matrix3();

			if ( geometry instanceof THREE.Geometry ) {

				geometry = new THREE.BufferGeometry().setFromObject( mesh );

			}

			if ( geometry instanceof THREE.BufferGeometry ) {


				if(mesh.userData._geometry){
					geometry = mesh.userData._geometry;
				}

				// shortcuts
				var vertices = geometry.getAttribute( 'position' );
				var normals = geometry.getAttribute( 'normal' );
				var uvs = geometry._uv ? geometry._uv : geometry.getAttribute( 'uv' ).array;
				var indices = geometry.getIndex();
				

				// console.log(vertices);

				var str = {
					'uuid': mesh.uuid,
					// 'type': geometry._type,
					'type': mesh.userData._type,
					'area': mesh.userData.area,
					"v" : [].slice.call(vertices.array),
					"n" : [].slice.call(normals.array),
					"uv": [].slice.call(uvs),
					"i" : indices&&indices.array ? [].slice.call(indices.array) : []
				};
				output.meshes.push(str);

			}

		};

		
		object.forEach(function(item){

			item.traverse(function (child) {

				if (child instanceof THREE.Mesh) {

					parseMesh(child);

				}

			});
		});

		

		return  JSON.stringify(output);

	}

};
