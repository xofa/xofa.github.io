IMAPIC3D.IP3DLoader = function (imapic3d, baseUrl) {


	this.imapic3d = imapic3d;

	this.baseUrl = baseUrl;

	this.modelInfo = {};

	this.modelLoader = new THREE.ObjectLoader();
	// this.materialLoader = new THREE.ObjectLoader();


	// this.lzma = new LZMA("js/xz/lzma_worker-min.js");

};


IMAPIC3D.IP3DLoader.prototype = {

	constructor: IMAPIC3D.IP3DLoader,

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
						uuid: '',
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


			setUUID: function (uuid) {
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

	parseGeometry: function (text) {

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

				if (faces[j + 4] + faces[j + 5] + faces[j + 6] + faces[j + 7] !== 0) {

					state.addFace(
						faces[j], faces[j + 3], faces[j + 6], faces[j + 9] || undefined,
						faces[j + 1], faces[j + 4], faces[j + 7], faces[j + 10] || undefined,
						faces[j + 2], faces[j + 5], faces[j + 8] || undefined, faces[j + 11] || undefined
					);

				} else {

					state.addFace(
						faces[j] || undefined, faces[j + 1] || undefined, faces[j + 2] || undefined, faces[j + 3] || undefined,
						faces[j + 4] || undefined, faces[j + 5] || undefined, faces[j + 6] || undefined, faces[j + 7] || undefined,
						faces[j + 8] || undefined, faces[j + 9] || undefined, faces[j + 10] || undefined, faces[j + 11] || undefined
					);

				}
			}



		}

		var items = state.objects;

		for (var i = 0; i < items.length; i++) {
			var data = items[i].geometry;

			var geometry = new THREE.BufferGeometry();
			geometry.addAttribute('position', new THREE.Float32BufferAttribute(data.vertices, 3));
			geometry.addAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3));
			geometry.addAttribute('uv', new THREE.Float32BufferAttribute(data.uvs, 2));
			geometry.uuid = data.uuid;

			items[i] = geometry.toJSON();
			geometry.dispose();
		}

		return items;
	},
	parseMatrix: function (item) {

		var position = item['position'];
		var rotation = item['rotation'];
		var scale = item['scale'];


		for (var key in rotation) {
			rotation[key] *= Math.PI / 180.0;
		}

		var rotator = new THREE.Quaternion().setFromEuler(new THREE.Euler(rotation.x, rotation.y, rotation.z), false);

		var matrix = new THREE.Matrix4();
		matrix.compose(position, rotator, scale);

		return matrix;
	},

	setLoadItemFinishCallback: function (object, parent) {

		if (parent) {
			parent.add(object);
		} else {

			this.imapic3d.addItem(object);
		}

	},

	handelMaterialAttribute: function (itemJson) {


		itemJson.textures.forEach(function (texture) {
			var wrap = texture.wrap;
			if (wrap[0] == null || wrap[1] == null) {
				texture.wrap = [1000, 1000];
			}
		});

		itemJson.images.forEach(function (image) {
			image.url += '?x-oss-process=image/resize,p_50';
		});

		itemJson.materials.forEach(function (mat) {

			if (mat.opacity > 0.99) { //!(mat.envMap && 
				mat.transparent = false;
			}
			mat.side = THREE.DoubleSide;

		});
	},

	requestGeometryByID: function (id, parameter, parent) {

		var self = this;
		$.get(this.baseUrl + '/itemapi/api/model/Select?' + id, function (data) {

			if (data.Data == null || data.Code !== 200) {
				return;
			}

			var json = data.Data.ModelJson;
			json = JSON.parse(json);

			json.geometries = self.parseGeometry(json.geometries);

			self.loadItem(json, parameter, parent);

		});
	},

	// 如果未定义callback就直接加载到场景，否则按照callback自己去加载
	loadItem: function (json, parameter, parent) {

		var self = this;

		this.modelLoader.parse(json, function (object) {


			object.userData._type = parameter.type;
			object.uuid = parameter.uuid;
			object.name = parameter.name;

			// console.log(object.name);

			if(parameter.matrix == undefined){
				parameter.matrix = new THREE.Matrix4().makeScale(0.1,0.1,0.1);
			}

			object.applyMatrix(parameter.matrix);
			// if(callback instanceof  Function) {
			// 	callback(object,parent);
			// }else{
			// 	self.imapic3d.addItem(object);
			// }

			self.setLoadItemFinishCallback(object, parent);

		});
	},

	requestItem: function (itemURL, parameter, parent) {

		var url = this.baseUrl + "/itemapi/api/item/getitemgeometry?uuid=" + itemURL;

		var self = this;
		$.get(url, function (response) {

			if (response['Code'] != 200) {
				console.error('getcase error code : ' + response['Code']);
				return;
			}

			var data = response['Data'];
			var name = data['Name'];

			// console.log(name);

			var itemJson = data['ItemJson'];
			if (!itemJson) {

				console.error('empty itemjson of ' + name + '->' + url);
				return;
			}

			parameter.name = name ? name : "defaultName";

			itemJson = JSON.parse(itemJson);

			self.handelMaterialAttribute(itemJson);

			var geoJson = data['GeometryJson'];
			if (geoJson) {
				geoJson = JSON.parse(geoJson);
				itemJson.geometries = self.parseGeometry(geoJson);
				self.loadItem(itemJson, parameter, parent);
			} else {

				console.log('request theItem from geometries id' + geoID);
				var geoID = itemJson.geometries;
				geoID && self.requestGeometryByID(geoID, parameter, parent);

			}


		});

	},


	parseMaterialJson: function (json, mesh_uuid) {

		var loader = this.modelLoader;
		var onLoad = this.setWallMaterialCallback;
		var images = loader.parseImages(json.images, function () {

			if (onLoad !== undefined) onLoad(materials, mesh_uuid);

		});

		var textures = loader.parseTextures(json.textures, images);
		var materials = loader.parseMaterials(json.materials, textures);



		return materials;
	},

	requestMaterials: function (uuid, mesh_uuid) {

		var url = this.baseUrl + "/box/api/material/select?UUID=" + uuid;
		var self = this;
		$.get(url, function (response) {

			if (response['Code'] != 200) {
				console.error('getcase error code : ' + response['Code']);
				return;
			}
			var data = response['Data'];
			var json = data['MaterialJson'];
			if (!json) return;
			json = JSON.parse(json);

			self.handelMaterialAttribute(json);

			self.parseMaterialJson(json, mesh_uuid);

		});
	},

	//以后再考虑优化重复ID的加载问题
	loadCase_WallMaterial: function (list) {

		for (let index = 0; index < list.length; index++) {
			const json = list[index];

			var mesh_uuid = json["uuid"];
			var materialId = json["materialId"];
			this.requestMaterials(materialId, mesh_uuid);
		}

	},


	loadCase_ItemList: function (json, parent) {

		console.log('------------------------start load itemList');

		for (var i = 0; i < json.length; i++) {
			var item = json[i];
			var itemURL = item['model'];

			if (itemURL.length < 10) { //有的UUID为空
				continue;
			}

			var matrix = this.parseMatrix(item);

			var parameter = {
				uuid: item['uuid'],
				matrix: matrix,
				type: item['type']
			};

			this.requestItem(itemURL, parameter, parent);
		}

	},

	loadCase_GroupList: function (json) {

		console.log('------------------------start load GroupList');
		console.log(json);
		for (var i = 0; i < json.length; i++) {
			var item = json[i];

			var itemList = item["itemList"];

			var matrix = this.parseMatrix(item["group"]);
			var group = new THREE.Group();
			group.applyMatrix(matrix);

			group.userData._type = "GroupItem";

			self.imapic3d.addItem(group);

			this.loadCase_ItemList(itemList, group);
		}

	},


	requestCaseByID: function (id) {

		var url = this.baseUrl + '/miniapp/api/case3d/getcase?id=' + id;

		var self = this;
		$.get(url, function (response) {

			if (response['Code'] != 200) {
				console.error('getcase error code : ' + response['Code']);
				return;
			}

			var data = response['Data'];
			var json = data['CaseJson'];
			json = JSON.parse(json);

			console.log(json);

			var itemList = json["itemList"];
			var groupList = json["groupList"];
			var buildList = json["buildList"];


			self.loadCase_ItemList(itemList);

			self.loadCase_GroupList(groupList);

			self.loadCase_WallMaterial(buildList);
		});
	},

	setWallMaterialCallback: function (mats, uuid) {


		for (var key in mats) {

			var mat = mats[key];
			var mesh = self.imapic3d.Get_SelectableGroup().getObjectByProperty('uuid', uuid);
			if (mesh) {

				// mat.side = mesh.material.side;
				// mesh.material = mat;
				mesh.material.map = mat.map;
				mesh.material.needsUpdate = true;
			}
		}
	},

	loadCaseAndUpdateWallPaper: function (caseid) {

		this.requestCaseByID(caseid);

	},


	loadTypedList: function (list, type) {

		for (var i = 0; i < list.length; i++) {

			var item = list[i];
			var matrix = new THREE.Matrix4().fromArray(item.matrix.elements);

			var parameter = {
				// uuid: item['uuid'],
				matrix: matrix,
				type: type
			};

			this.requestItem(item.uuid, parameter);

		}

	},

	loadInWall: function (list) {

		for (var i = 0; i < list.length; i++) {

			var item = list[i];
			var matrix = new THREE.Matrix4().fromArray(item.matrix.elements);

			var defaultTypes = IMAPIC2D._DEFINES_.IN_WALL.ITEMS;
			var type;

			for (var key in defaultTypes) {

				if (defaultTypes[key].UUID == item.uuid) {

					type = 'InWallItem' + key;
					break;
				}
			}

			var parameter = {
				// uuid: item['uuid'],
				matrix: matrix,
				type: type
			};

			this.requestItem(item.uuid, parameter);

		}

	},

	loadDroppedCeiling: function (rectStructs) {

		console.log(rectStructs);

		for (var i = 0; i < rectStructs.length; i++) {
		
			var rect = rectStructs[i];
			var center = rect["center"];
			var width  = rect["width"];
			var height = rect["height"];

			var scale = 1.0/10000;
			var matrixS = new THREE.Matrix4().makeScale(width*scale,0.1,height*scale);
			var matrix2 = new THREE.Matrix4().makeTranslation(center.x,280,center.y);
			var matrix =  matrix2.multiply(matrixS);

			var parameter = {
				
				matrix: matrix,
				type:"OnRoofItem"
			};

			var index = 0;
			this.requestItem(IMAPIC2D._DEFINES_.CONSTRUCTION.DROPPEDCEILING.TYPES[index],parameter);

			// var mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1,20,1));
			// mesh.position.set(center.x,260,center.y);
			// mesh.scale.set(width,1,height);
			
			// this.setLoadItemFinishCallback(mesh);
		}
	},

	changeFloorMaterial: function(){


		var url = this.baseUrl+'/box/api/Material/ListV2?pageindex=1&pagesize=20&mname=地板';
		var self = this;
		var loader = new THREE.MaterialLoader();


		$.get(url, function (response) {

			if (response['Code'] != 200) {
				console.error('getcase error code : ' + response['Code']);
				return;
			}

			var data = response['Data'];
			var i = parseInt(Math.random()*19);
			var list = data['List'];

			var item = list[i];
			var json = JSON.parse(item["MaterialJson"]);

                    // loader.setTextures(textures);
                    return loader.parse(data);



		});
	}














}