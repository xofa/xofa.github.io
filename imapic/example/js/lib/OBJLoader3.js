/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.OBJLoader3 = function (manager) {

	this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;

	this.materials = null;

};

THREE.OBJLoader3.prototype = {

	constructor: THREE.OBJLoader3,

	load: function (url, onLoad, onProgress, onError) {

		var scope = this;

		var loader = new THREE.FileLoader(scope.manager);
		loader.setPath(this.path);
		loader.load(url, function (text) {

			onLoad(scope.parse(text));

		}, onProgress, onError);

	},

	setPath: function (value) {

		this.path = value;
	},

	setMaterials: function (materials) {

		this.materials = materials;

	},

	_createParserState: function () {

		var state = {
			objects: [],
			object: {},

			vertices: [],
			normals: [],
			uvs: [],

			materialLibraries: [],

			startObject: function (name, fromDeclaration) {

				// If the current object (initial from reset) is not from a g/o declaration in the parsed
				// file. We need to use it for the first parsed g/o to keep things in sync.
				if (this.object && this.object.fromDeclaration === false) {

					this.object.name = name;
					this.object.fromDeclaration = (fromDeclaration !== false);
					return;

				}

				var previousMaterial = (this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined);

				if (this.object && typeof this.object._finalize === 'function') {

					this.object._finalize(true);

				}

				this.object = {
					name: name || '',
					fromDeclaration: (fromDeclaration !== false),

					geometry: {
						vertices: [],
						normals: [],
						uvs: []
					},
					materials: [],
					smooth: true,

					startMaterial: function (name, libraries) {

						var previous = this._finalize(false);

						// New usemtl declaration overwrites an inherited material, except if faces were declared
						// after the material, then it must be preserved for proper MultiMaterial continuation.
						if (previous && (previous.inherited || previous.groupCount <= 0)) {

							this.materials.splice(previous.index, 1);

						}

						var material = {
							index: this.materials.length,
							name: name || '',
							mtllib: (Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : ''),
							smooth: (previous !== undefined ? previous.smooth : this.smooth),
							groupStart: (previous !== undefined ? previous.groupEnd : 0),
							groupEnd: -1,
							groupCount: -1,
							inherited: false,

							clone: function (index) {
								var cloned = {
									index: (typeof index === 'number' ? index : this.index),
									name: this.name,
									mtllib: this.mtllib,
									smooth: this.smooth,
									groupStart: 0,
									groupEnd: -1,
									groupCount: -1,
									inherited: false
								};
								cloned.clone = this.clone.bind(cloned);
								return cloned;
							}
						};

						this.materials.push(material);

						return material;

					},

					currentMaterial: function () {

						if (this.materials.length > 0) {
							return this.materials[this.materials.length - 1];
						}

						return undefined;

					},

					_finalize: function (end) {

						var lastMultiMaterial = this.currentMaterial();
						if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {

							lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
							lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
							lastMultiMaterial.inherited = false;

						}

						// Ignore objects tail materials if no face declarations followed them before a new o/g started.
						if (end && this.materials.length > 1) {

							for (var mi = this.materials.length - 1; mi >= 0; mi--) {
								if (this.materials[mi].groupCount <= 0) {
									this.materials.splice(mi, 1);
								}
							}

						}

						// Guarantee at least one empty material, this makes the creation later more straight forward.
						if (end && this.materials.length === 0) {

							this.materials.push({
								name: '',
								smooth: this.smooth
							});

						}

						return lastMultiMaterial;

					}
				};

				// Inherit previous objects material.
				// Spec tells us that a declared material must be set to all objects until a new material is declared.
				// If a usemtl declaration is encountered while this new object is being parsed, it will
				// overwrite the inherited material. Exception being that there was already face declarations
				// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

				if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === "function") {

					var declared = previousMaterial.clone(0);
					declared.inherited = true;
					this.object.materials.push(declared);

				}

				this.objects.push(this.object);

			},

			finalize: function () {

				if (this.object && typeof this.object._finalize === 'function') {

					this.object._finalize(true);

				}

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

			addVertexLine: function (a) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push(src[a + 0]);
				dst.push(src[a + 1]);
				dst.push(src[a + 2]);

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

			addUVLine: function (a) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push(src[a + 0]);
				dst.push(src[a + 1]);

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

			addLineGeometry: function (vertices, uvs) {

				this.object.geometry.type = 'Line';

				var vLen = this.vertices.length;
				var uvLen = this.uvs.length;

				for (var vi = 0, l = vertices.length; vi < l; vi++) {

					this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));

				}

				for (var uvi = 0, l = uvs.length; uvi < l; uvi++) {

					this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));

				}

			}

		};

		state.startObject('', false);

		return state;

	},

	parse: function (text) {

		var state = this._createParserState();

		var geometries = text.geometries;

		var vertex = new THREE.Vector3();

		for (var i = 0; i < geometries.length; i++) {

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

			state.startObject(state);
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

		state.finalize();

		return state.objects;

	}

};
