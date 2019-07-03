/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ObjectParse = function () {


	return this;

};

THREE.ObjectParse.prototype = {

	constructor: THREE.ObjectParse,


	_createParserState: function () {

		var state = {
			objects: [],
			object: {},

			vertices: [],
			normals: [],
			uvs: [],


			startObject: function (name, fromDeclaration) {


				if (this.object && this.object.fromDeclaration === false) {

					this.object.name = name;
					this.object.fromDeclaration = (fromDeclaration !== false);
					return;

				}


				this.object = {
					// name: name || '',

					geometry: {
						uuid : '',
						vertices: [],
						normals: [],
						uvs: []
					},
			

				};

			
				this.objects.push(this.object);


			},

		

			parseVertexIndex: function (value, len) {

				var index = parseInt(value, 10);
				return (index >= 0 ? index - 1 : index + len / 3) * 3;

			},

			parseNormalIndex: function (value, len) {

				var index = parseInt(value, 10);
				return (index >= 0 ? index - 1 : index + len / 3) * 3;

			},

			parseUVIndex: function (value, len) {

				var index = parseInt(value, 10);
				return (index >= 0 ? index - 1 : index + len / 2) * 2;

			},

			addVertex: function (a, b, c) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push(src[a + 0]);
				dst.push(src[a + 1]);
				dst.push(src[a + 2]);
				dst.push(src[b + 0]);
				dst.push(src[b + 1]);
				dst.push(src[b + 2]);
				dst.push(src[c + 0]);
				dst.push(src[c + 1]);
				dst.push(src[c + 2]);

			},


			addNormal: function (a, b, c) {

				var src = this.normals;
				var dst = this.object.geometry.normals;

				dst.push(src[a + 0]);
				dst.push(src[a + 1]);
				dst.push(src[a + 2]);
				dst.push(src[b + 0]);
				dst.push(src[b + 1]);
				dst.push(src[b + 2]);
				dst.push(src[c + 0]);
				dst.push(src[c + 1]);
				dst.push(src[c + 2]);

			},

			addUV: function (a, b, c) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push(src[a + 0]);
				dst.push(src[a + 1]);
				dst.push(src[b + 0]);
				dst.push(src[b + 1]);
				dst.push(src[c + 0]);
				dst.push(src[c + 1]);

			},


			setUUID: function(uuid){
				this.object.geometry.uuid = uuid;
			},


			addFace: function (a, b, c, d, ua, ub, uc, ud, na, nb, nc, nd) {

				var vLen = this.vertices.length;

				var ia = this.parseVertexIndex(a, vLen);
				var ib = this.parseVertexIndex(b, vLen);
				var ic = this.parseVertexIndex(c, vLen);
				var id;

				if (d === undefined) {

					this.addVertex(ia, ib, ic);

				} else {

					id = this.parseVertexIndex(d, vLen);

					this.addVertex(ia, ib, id);
					this.addVertex(ib, ic, id);

				}

				if (ua !== undefined) {

					var uvLen = this.uvs.length;

					ia = this.parseUVIndex(ua, uvLen);
					ib = this.parseUVIndex(ub, uvLen);
					ic = this.parseUVIndex(uc, uvLen);

					if (d === undefined) {

						this.addUV(ia, ib, ic);

					} else {

						id = this.parseUVIndex(ud, uvLen);

						this.addUV(ia, ib, id);
						this.addUV(ib, ic, id);

					}

				}

				if (na !== undefined) {

					// Normals are many times the same. If so, skip function call and parseInt.
					var nLen = this.normals.length;
					ia = this.parseNormalIndex(na, nLen);

					ib = na === nb ? ia : this.parseNormalIndex(nb, nLen);
					ic = na === nc ? ia : this.parseNormalIndex(nc, nLen);

					if (d === undefined) {

						this.addNormal(ia, ib, ic);

					} else {

						id = this.parseNormalIndex(nd, nLen);

						this.addNormal(ia, ib, id);
						this.addNormal(ib, ic, id);

					}

				}

			},

		

		};

		// state.startObject('', false);

		return state;

	},

	parse: function (text) {

		var state = this._createParserState();

		var geometries = text;//text.geometries;

		var vertex = new THREE.Vector3();

		for (var i = 0; i < geometries.length; i++) {

			state.startObject(state);

			state.setUUID(geometries[i].uuid);

			var vertices = geometries[i].data.vertices;
			var normals = geometries[i].data.normal;
			var uvs = geometries[i].data.uv;

			for (var m = 0; m < vertices.length; m++) {
				state.vertices.push(vertices[m]);
			}

			for (var m = 0; m < normals.length; m++) {
				state.normals.push(normals[m]);
			}

			for (var m = 0; m < uvs.length; m++) {
				state.uvs.push(uvs[m]);
			}

			var faces = geometries[i].data.faces;

			for (j = 0, l = faces.length; j < l; j += 12) {

				if ( faces[ j + 4 ] + faces[ j + 5 ] + faces[ j + 6 ] + faces[ j + 7 ] !== 0 ) {
					
					state.addFace(
						faces[ j ], faces[ j + 3 ], faces[ j + 6 ], faces[ j + 9 ] || undefined,
						faces[ j + 1 ], faces[ j + 4 ], faces[ j + 7 ], faces[ j + 10 ] || undefined,
						faces[ j + 2 ], faces[ j + 5 ], faces[ j + 8 ] || undefined, faces[ j + 11 ] || undefined
					);
					
				} else {

					state.addFace(
						faces[ j ] || undefined, faces[ j + 1 ] || undefined, faces[ j + 2 ] || undefined, faces[ j + 3 ] || undefined,
						faces[ j + 4 ] || undefined, faces[ j + 5 ] || undefined, faces[ j + 6 ] || undefined, faces[ j + 7 ] || undefined,
						faces[ j + 8 ] || undefined, faces[ j + 9 ] || undefined, faces[ j + 10 ] || undefined, faces[ j + 11 ] || undefined
					);

				}
			}



		}

		// state.finalize();

		return state.objects;

	}

};
