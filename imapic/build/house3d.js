"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var House3D;
(function (House3D) {
    var Object3D = (function (_super) {
        __extends(Object3D, _super);
        function Object3D() {
            var _this = _super.call(this) || this;
            _this._hover = false;
            _this._selected = false;
            _this._highlighted = false;
            _this._emissiveColor = 0x444444;
            _this._selectable = false;
            _this._resizable = false;
            _this._rotatable = false;
            _this._movable = false;
            _this.type = "Object3D";
            return _this;
        }
        Object3D.prototype.select = function () {
            this._selected = true;
            this.updateHighlight();
        };
        Object3D.prototype.unSelect = function () {
            this._selected = false;
            this.updateHighlight();
        };
        Object3D.prototype.focus = function () {
            this._hover = true;
            this.updateHighlight();
        };
        ;
        Object3D.prototype.blur = function () {
            this._hover = false;
            this.updateHighlight();
        };
        ;
        Object3D.prototype.move = function (point) {
            this.position.copy(point);
            return true;
        };
        Object3D.prototype.rotate = function (rotate) {
            this.rotation.set(rotate.x, rotate.y, rotate.z);
        };
        Object3D.prototype.rotateByQuaternion = function (quaternion) {
            this.quaternion.copy(quaternion);
        };
        Object3D.prototype.getSelectable = function () {
            return this._selectable;
        };
        Object3D.prototype.getMovable = function () {
            return this._movable;
        };
        Object3D.prototype.copy = function (source, recursive) {
            _super.prototype.copy.call(this, source, recursive);
            this._hover = source._hover;
            this._selected = source._selected;
            this._highlighted = source._highlighted;
            this._emissiveColor = source._emissiveColor;
            this._resizable = source._resizable;
            this._rotatable = source._rotatable;
            this._movable = source._movable;
            this.type = source.type;
            return this;
        };
        Object3D.prototype.clone = function (recursive) {
            var newObject = new Object3D();
            newObject.copy(this, recursive);
            return newObject;
        };
        Object3D.prototype.updateHighlight = function () {
            var on = this._hover || this._selected;
            this._highlighted = on;
            var hex = on ? this._emissiveColor : 0x000000;
            this.traverseVisible(function (child) {
                if (child instanceof THREE.Mesh) {
                    var material = child.material;
                    if (material.emissive)
                        material.emissive.setHex(hex);
                }
            });
        };
        Object3D.prototype.getMeshes = function (meshes) {
            this.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    meshes.push(child);
                }
            });
        };
        Object3D.prototype.getBox = function () {
            var box = new THREE.Box3();
            box.setFromObject(this);
            return box;
        };
        return Object3D;
    }(THREE.Object3D));
    House3D.Object3D = Object3D;
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var BuildData = (function () {
        function BuildData() {
            this.materialId = "";
        }
        BuildData.prototype.copy = function (source, recursive) {
            this.uuid = source.uuid;
            this.model = source.model;
            this.materialId = source.materialId;
            if (source.position) {
                this.position = new THREE.Vector3();
                this.position.set(source.position.x, source.position.y, source.position.z);
            }
            if (source.rotation) {
                this.rotation = new THREE.Vector3();
                this.rotation.set(source.rotation.x, source.rotation.y, source.rotation.z);
            }
            return this;
        };
        BuildData.prototype.clone = function (recursive) {
            var newObject = new BuildData();
            newObject.copy(this, recursive);
            return newObject;
        };
        return BuildData;
    }());
    House3D.BuildData = BuildData;
})(House3D || (House3D = {}));
var Serializable = (function () {
    function Serializable() {
    }
    Serializable.prototype.deserialize = function (json, instance) {
        for (var prop in json) {
            if (!json.hasOwnProperty(prop))
                continue;
            if (typeof json[prop] === 'object')
                this.deserialize(json[prop], instance[prop]);
            else
                instance[prop] = json[prop];
        }
    };
    Serializable.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    return Serializable;
}());
var House3D;
(function (House3D) {
    var ModelMetadata = (function () {
        function ModelMetadata() {
        }
        return ModelMetadata;
    }());
    House3D.ModelMetadata = ModelMetadata;
    var Geometry = (function () {
        function Geometry() {
            this.vertices = [];
            this.faces = [];
            this.normal = [];
            this.uv = [];
        }
        return Geometry;
    }());
    House3D.Geometry = Geometry;
    var GeometryData = (function () {
        function GeometryData() {
            this.type = 'BufferGeometry';
        }
        return GeometryData;
    }());
    House3D.GeometryData = GeometryData;
    var MaterialData = (function () {
        function MaterialData() {
            this.type = 'MeshStandardMaterial';
            this.color = 0xffffff;
            this.roughness = 0.5;
            this.metalness = 0.5;
            this.emissive = 0;
            this.depthFunc = 3;
            this.depthTest = true;
            this.depthWrite = true;
            this.skinning = false;
            this.morphTargets = false;
            this.dithering = false;
            this.transparent = false;
        }
        return MaterialData;
    }());
    House3D.MaterialData = MaterialData;
    var ImageData = (function () {
        function ImageData() {
        }
        return ImageData;
    }());
    House3D.ImageData = ImageData;
    var TextureData = (function () {
        function TextureData() {
            this.repeat = [1, 1];
            this.offset = [0, 0];
            this.wrap = [1, 1];
        }
        return TextureData;
    }());
    House3D.TextureData = TextureData;
    var MeshData = (function () {
        function MeshData() {
            this.type = 'Mesh';
        }
        return MeshData;
    }());
    House3D.MeshData = MeshData;
    var ObjectData = (function () {
        function ObjectData() {
            this.type = 'Group';
            this.objectType = 'Object3D';
            this.placement = false;
            this.children = [];
        }
        return ObjectData;
    }());
    House3D.ObjectData = ObjectData;
    var ModelData = (function (_super) {
        __extends(ModelData, _super);
        function ModelData() {
            var _this = _super.call(this) || this;
            _this.geometries = [];
            _this.materials = [];
            _this.textures = [];
            _this.images = [];
            return _this;
        }
        return ModelData;
    }(Serializable));
    House3D.ModelData = ModelData;
    var MaterialsData = (function () {
        function MaterialsData() {
            this.textures = [];
            this.images = [];
        }
        return MaterialsData;
    }());
    House3D.MaterialsData = MaterialsData;
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Builds;
        (function (Builds) {
            var Build = (function (_super) {
                __extends(Build, _super);
                function Build() {
                    var _this = _super.call(this) || this;
                    _this.type = "Build";
                    _this.castShadow = true;
                    _this.receiveShadow = true;
                    _this._metadata = new House3D.BuildData();
                    _this._metadata.uuid = _this.uuid;
                    return _this;
                }
                Build.prototype.getMetadata = function () {
                    this._metadata.uuid = this.uuid;
                    this._metadata.position = this.position.clone();
                    this._metadata.rotation = this.rotation.toVector3().clone();
                    return this._metadata;
                };
                Build.prototype.setMetadata = function (data) {
                    this._metadata.uuid = data.uuid;
                    this._metadata.model = data.model;
                    this._metadata.position = data.position;
                    if (data.rotation)
                        this._metadata.rotation = data.rotation;
                };
                Build.prototype.copy = function (source, recursive) {
                    _super.prototype.copy.call(this, source, recursive);
                    this._metadata = source._metadata.clone();
                    return this;
                };
                Build.prototype.clone = function (recursive) {
                    var newObject = new Build();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                Build.prototype.modifyMaterial = function (materialId, material) {
                    this._metadata.materialId = materialId;
                    this.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.material.dispose();
                            child.material = material;
                            child.material.needsUpdate = true;
                        }
                    });
                };
                return Build;
            }(House3D.Object3D));
            Builds.Build = Build;
        })(Builds = Models.Builds || (Models.Builds = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var ItemMoveType;
    (function (ItemMoveType) {
        ItemMoveType[ItemMoveType["InsideWall"] = 0] = "InsideWall";
        ItemMoveType[ItemMoveType["OnTheWall"] = 1] = "OnTheWall";
        ItemMoveType[ItemMoveType["OnThFloor"] = 2] = "OnThFloor";
        ItemMoveType[ItemMoveType["OnTheRoof"] = 3] = "OnTheRoof";
        ItemMoveType[ItemMoveType["OnTheItem"] = 4] = "OnTheItem";
    })(ItemMoveType = House3D.ItemMoveType || (House3D.ItemMoveType = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var ItemData = (function () {
        function ItemData() {
        }
        ItemData.prototype.copy = function (source, recursive) {
            this.uuid = source.uuid;
            this.model = source.model;
            if (source.position) {
                this.position = new THREE.Vector3();
                this.position.set(source.position.x, source.position.y, source.position.z);
            }
            if (source.rotation) {
                this.rotation = new THREE.Vector3();
                this.rotation.set(source.rotation.x, source.rotation.y, source.rotation.z);
            }
            if (source.scale) {
                this.scale = new THREE.Vector3();
                this.scale.set(source.scale.x, source.scale.y, source.scale.z);
            }
            return this;
        };
        ItemData.prototype.clone = function (recursive) {
            var newObject = new ItemData();
            newObject.copy(this, recursive);
            return newObject;
        };
        return ItemData;
    }());
    House3D.ItemData = ItemData;
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var Item = (function (_super) {
                __extends(Item, _super);
                function Item() {
                    var _this = _super.call(this) || this;
                    _this._isFixed = false;
                    _this._error = false;
                    _this._errorColor = 0xff0000;
                    _this._onFloorEnable = false;
                    _this._onWallEnable = false;
                    _this._onRoofEnable = false;
                    _this._inWallEnable = false;
                    _this._onItemEnable = false;
                    _this._allowPlacement = true;
                    _this.type = "Item";
                    _this._rotatable = false;
                    _this._movable = false;
                    _this.castShadow = true;
                    _this.receiveShadow = false;
                    _this._metadata = new House3D.ItemData();
                    _this._metadata.uuid = _this.uuid;
                    return _this;
                }
                Item.prototype.onFloorEnable = function () {
                    return this._onFloorEnable;
                };
                Item.prototype.onWallEnable = function () {
                    return this._onWallEnable;
                };
                Item.prototype.onRoofEnable = function () {
                    return this._onRoofEnable;
                };
                Item.prototype.inWallEnable = function () {
                    return this._inWallEnable;
                };
                Item.prototype.onItemEnable = function () {
                    return this._onItemEnable;
                };
                Item.prototype.allowPlacement = function () {
                    return this._allowPlacement;
                };
                Item.prototype.setPlacement = function (enable) {
                    this._allowPlacement = enable;
                };
                Item.prototype.setRoom = function (room) {
                    this._room = room;
                };
                Item.prototype.copy = function (source, recursive) {
                    _super.prototype.copy.call(this, source, recursive);
                    this._isFixed = source._isFixed;
                    this._onFloorEnable = source._onFloorEnable;
                    this._onWallEnable = source._onWallEnable;
                    this._onRoofEnable = source._onRoofEnable;
                    this._inWallEnable = source._inWallEnable;
                    this._onItemEnable = source._onItemEnable;
                    this._allowPlacement = source._allowPlacement;
                    this._metadata = source._metadata.clone();
                    this.traverseVisible(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.material = child.material.clone();
                        }
                    });
                    return this;
                };
                Item.prototype.clone = function (recursive) {
                    var newObject = new Item();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                Item.prototype.move = function (point) {
                    var oldPoint = this.position.clone();
                    _super.prototype.move.call(this, point);
                    this._metadata.position = this.position;
                    this.checkedError();
                    return true;
                };
                Item.prototype.rotate = function (rotate) {
                    var oldRotation = this.rotation.clone().toVector3();
                    _super.prototype.rotate.call(this, rotate);
                    this._metadata.rotation = this.rotation.toVector3();
                    this.checkedError();
                };
                Item.prototype.dragging = function (intersect) {
                    return this.move(intersect.point);
                };
                Item.prototype.checkedError = function () {
                    this.updateHighlight();
                };
                Item.prototype.updateHighlight = function () {
                    var on = this._hover || this._selected;
                    this._highlighted = on;
                    var hex = on ? this._emissiveColor : 0x000000;
                    hex = this._error ? this._errorColor : hex;
                    this.traverseVisible(function (child) {
                        if (child instanceof THREE.Mesh) {
                            var material = child.material;
                            if (material.emissive)
                                material.emissive.setHex(hex);
                        }
                    });
                };
                Item.prototype.validPosition = function () {
                    return this._room.getCheckBoxes(this);
                };
                Item.prototype.getMetadata = function () {
                    this._metadata.uuid = this.uuid;
                    this._metadata.position = this.position.clone();
                    this._metadata.rotation = new THREE.Vector3();
                    this._metadata.rotation.x = this.rotation.x * 180 / Math.PI;
                    this._metadata.rotation.y = this.rotation.y * 180 / Math.PI;
                    this._metadata.rotation.z = this.rotation.z * 180 / Math.PI;
                    this._metadata.scale = this.scale.clone();
                    return this._metadata;
                };
                Item.prototype.setMetadata = function (data) {
                    this._metadata.uuid = data.uuid;
                    this._metadata.model = data.model;
                    this._metadata.position = data.position;
                    if (data.rotation)
                        this._metadata.rotation = data.rotation;
                    if (data.scale)
                        this._metadata.scale = data.scale;
                };
                Item.prototype.modifyMaterial = function (material) {
                };
                return Item;
            }(House3D.Object3D));
            Items.Item = Item;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var HotSpotData = (function () {
        function HotSpotData() {
        }
        HotSpotData.prototype.copy = function (source, recursive) {
            this.min = source.min.clone();
            this.max = source.max.clone();
            this.position = source.position.clone();
            return this;
        };
        HotSpotData.prototype.clone = function (recursive) {
            var newObject = new HotSpotData();
            newObject.copy(this, recursive);
            return newObject;
        };
        return HotSpotData;
    }());
    House3D.HotSpotData = HotSpotData;
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Builds;
        (function (Builds) {
            var HotSpot = (function (_super) {
                __extends(HotSpot, _super);
                function HotSpot() {
                    var _this = _super.call(this) || this;
                    _this.type = "HotSpot";
                    _this.castShadow = false;
                    _this.receiveShadow = false;
                    _this._metadata = new House3D.HotSpotData();
                    return _this;
                }
                HotSpot.prototype.getMetadata = function () {
                    return this._metadata;
                };
                HotSpot.prototype.setMetadata = function (data) {
                    this._metadata.min = data.min;
                    this._metadata.max = data.max;
                    this._metadata.position = data.position;
                };
                HotSpot.prototype.copy = function (source, recursive) {
                    _super.prototype.copy.call(this, source, recursive);
                    this._metadata = source._metadata.clone();
                    return this;
                };
                HotSpot.prototype.clone = function (recursive) {
                    var newObject = new HotSpot();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                HotSpot.prototype.isEnter = function (pos) {
                    var box = new THREE.Box3();
                    box.setFromPoints([this._metadata.min, this._metadata.max]);
                    if (box.containsPoint(pos))
                        return this._metadata.position;
                    return undefined;
                };
                return HotSpot;
            }(House3D.Object3D));
            Builds.HotSpot = HotSpot;
        })(Builds = Models.Builds || (Models.Builds = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Houses;
    (function (Houses) {
        var Room = (function () {
            function Room() {
                this._builds = {};
                this._items = {};
                this.uuid = THREE.Math.generateUUID();
                this.name = '';
            }
            Room.prototype.addObject = function (data) {
                if (data.type.indexOf("Item") < 0) {
                    var build = data;
                    this._builds[data.uuid] = build;
                }
                else {
                    var item = data;
                    this._items[data.uuid] = item;
                    item.setRoom(this);
                }
            };
            Room.prototype.removeItem = function (uuid) {
                for (var key in this._items) {
                    if (this._items[key].uuid == uuid) {
                        delete this._items[key];
                        return true;
                    }
                }
                return false;
            };
            Room.prototype.getBuild = function (uuid) {
                for (var key in this._builds) {
                    var build = this._builds[key];
                    if (build.uuid == uuid)
                        return build;
                }
                return undefined;
            };
            Room.prototype.getItem = function (uuid) {
                for (var key in this._items) {
                    var item = this._items[key];
                    if (item.uuid == uuid)
                        return item;
                }
                return undefined;
            };
            Room.prototype.addItem = function (item) {
                this._items[item.uuid] = item;
                item.setRoom(this);
            };
            Room.prototype.clear = function () {
                for (var key in this._builds) {
                    delete this._builds[key];
                }
                for (var key in this._items) {
                    delete this._items[key];
                }
            };
            Room.prototype.clearItem = function () {
                for (var key in this._items) {
                    var obj = this._items[key];
                    if (obj.type.indexOf('Item') >= 0 &&
                        (obj.type != 'DecorateItem' && obj.type != 'Item'))
                        delete this._items[key];
                }
            };
            Room.prototype.display = function () {
                for (var key in this._builds) {
                    var build = this._builds[key];
                    if (build.type != "CollisionWall" && build.type != "HangWall")
                        build.visible = true;
                }
                for (var key in this._items) {
                    this._items[key].visible = true;
                }
            };
            Room.prototype.hidden = function () {
                for (var key in this._builds) {
                    this._builds[key].visible = false;
                }
                for (var key in this._items) {
                    this._items[key].visible = false;
                }
            };
            Room.prototype.getPickupMeshes = function (meshes) {
                for (var key in this._builds) {
                    var build = this._builds[key];
                    if (build.visible)
                        this._builds[key].getMeshes(meshes);
                }
                for (var key in this._items) {
                    var item = this._items[key];
                    if (item.visible)
                        this._items[key].getMeshes(meshes);
                }
            };
            Room.prototype.getPlaceMeshes = function (obj, meshes) {
                for (var key in this._builds) {
                    var build = this._builds[key];
                    if (obj.onFloorEnable()) {
                        if (build.type == "Floor")
                            build.getMeshes(meshes);
                    }
                    if (obj.onWallEnable()) {
                        if (build.type == "HangWall")
                            build.getMeshes(meshes);
                    }
                    if (obj.onRoofEnable()) {
                        if (build.type == "Roof")
                            build.getMeshes(meshes);
                    }
                }
                for (var key in this._items) {
                    var item = this._items[key];
                    if (obj === item)
                        continue;
                    if (obj.onItemEnable() == true) {
                        if (item.allowPlacement())
                            item.getMeshes(meshes);
                    }
                    if (obj.onFloorEnable()) {
                        if (item.type == "CarpetItem")
                            item.getMeshes(meshes);
                    }
                }
            };
            Room.prototype.getWallMeshes = function (meshes) {
                for (var key in this._builds) {
                    var build = this._builds[key];
                    if (build.type == "HangWall" || build.type == "CollisionWall")
                        build.getMeshes(meshes);
                }
            };
            Room.prototype.getDoorMeshes = function (doors) {
                for (var key in this._items) {
                    var item = this._items[key];
                    if (item.getMetadata().model == "683E476B-139C-4ECC-8184-B0C5ECDC78D6")
                        doors.push(item);
                }
            };
            Room.prototype.getUnPlaceMeshes = function (obj, meshes) {
                for (var key in this._builds) {
                    var build = this._builds[key];
                    if (obj.onFloorEnable() != true) {
                        if (build.type == "Floor")
                            build.getMeshes(meshes);
                    }
                    if (obj.onWallEnable() != true) {
                        if (build.type == "HangWall")
                            build.getMeshes(meshes);
                        if (build.type == "CollisionWall")
                            build.getMeshes(meshes);
                    }
                    if (obj.onRoofEnable() != true) {
                        if (build.type == "Roof")
                            build.getMeshes(meshes);
                    }
                }
            };
            Room.prototype.getCheckBoxes = function (obj) {
                var objbox = new THREE.Box3();
                objbox.setFromObject(obj);
                for (var key in this._items) {
                    var item = this._items[key];
                    if (item === obj)
                        continue;
                    if (item.type == "Item")
                        continue;
                    if (item.type == "DecorateItem")
                        continue;
                    var box = new THREE.Box3();
                    box.setFromObject(item);
                    if (objbox.intersectsBox(box)) {
                        return false;
                    }
                }
                return true;
            };
            Room.prototype.movablePosition = function (item) {
                var objbox = new THREE.Box3();
                objbox.setFromObject(item);
                var meshes = [];
                this.getUnPlaceMeshes(item, meshes);
                for (var _i = 0, meshes_1 = meshes; _i < meshes_1.length; _i++) {
                    var mesh = meshes_1[_i];
                    var box = new THREE.Box3();
                    box.setFromObject(mesh);
                    if (objbox.intersectsBox(box)) {
                        return false;
                    }
                }
                return true;
            };
            Room.prototype.getAllItems = function (datas) {
                for (var key in this._items) {
                    datas.push(this._items[key]);
                }
            };
            Room.prototype.getAllBuilds = function (datas) {
                for (var key in this._builds) {
                    datas.push(this._builds[key]);
                }
            };
            Room.prototype.setHotSpot = function (hotSpot) {
                this._hotSpot = hotSpot;
            };
            Room.prototype.isEnter = function (pos) {
                if (this._hotSpot)
                    return this._hotSpot.isEnter(pos);
                return undefined;
            };
            return Room;
        }());
        Houses.Room = Room;
    })(Houses = House3D.Houses || (House3D.Houses = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Houses;
    (function (Houses) {
        var Storey = (function () {
            function Storey() {
                this._visable = true;
                this._rooms = {};
                this.uuid = THREE.Math.generateUUID();
                this.name = '';
                this._floor = 1;
            }
            Storey.prototype.addRoom = function (data) {
                this._rooms[data.uuid] = data;
                this._currentRoom = data;
            };
            Storey.prototype.getRoom = function (name) {
                return this._rooms[name];
            };
            Storey.prototype.clear = function () {
                for (var key in this._rooms) {
                    this._rooms[key].clear();
                    delete this._rooms[key];
                }
            };
            Storey.prototype.clearItem = function () {
                for (var key in this._rooms) {
                    this._rooms[key].clearItem();
                }
            };
            Storey.prototype.getPickupMeshes = function (meshes) {
                for (var key in this._rooms) {
                    this._rooms[key].getPickupMeshes(meshes);
                }
            };
            Storey.prototype.getPlaceMeshes = function (obj, meshes) {
                for (var key in this._rooms) {
                    this._rooms[key].getPlaceMeshes(obj, meshes);
                }
            };
            Storey.prototype.getWallMeshes = function (meshes) {
                for (var key in this._rooms) {
                    this._rooms[key].getWallMeshes(meshes);
                }
            };
            Storey.prototype.getDoorMeshes = function (doors) {
                for (var key in this._rooms) {
                    this._rooms[key].getDoorMeshes(doors);
                }
            };
            Storey.prototype.getUnPlaceMeshes = function (obj, meshes) {
                for (var key in this._rooms) {
                    this._rooms[key].getUnPlaceMeshes(obj, meshes);
                }
            };
            Storey.prototype.removeItem = function (uuid) {
                for (var key in this._rooms) {
                    if (this._rooms[key].removeItem(uuid))
                        return true;
                }
                return false;
            };
            Storey.prototype.display = function () {
                for (var key in this._rooms) {
                    this._rooms[key].display();
                }
                this._visable = true;
            };
            Storey.prototype.hidden = function () {
                for (var key in this._rooms) {
                    this._rooms[key].hidden();
                }
                this._visable = false;
            };
            Storey.prototype.getBuild = function (uuid) {
                for (var key in this._rooms) {
                    var build = this._rooms[key].getBuild(uuid);
                    if (build)
                        return build;
                }
                return undefined;
            };
            Storey.prototype.getItem = function (uuid) {
                for (var key in this._rooms) {
                    var item = this._rooms[key].getItem(uuid);
                    if (item)
                        return item;
                }
                return undefined;
            };
            Storey.prototype.addItem = function (item) {
                if (this._currentRoom) {
                    this._currentRoom.addItem(item);
                }
            };
            Storey.prototype.getAllItems = function (datas) {
                for (var key in this._rooms) {
                    this._rooms[key].getAllItems(datas);
                }
            };
            Storey.prototype.getAllBuilds = function (datas) {
                for (var key in this._rooms) {
                    this._rooms[key].getAllBuilds(datas);
                }
            };
            Storey.prototype.isEnter = function (pos) {
                return this._currentRoom.isEnter(pos);
            };
            return Storey;
        }());
        Houses.Storey = Storey;
    })(Houses = House3D.Houses || (House3D.Houses = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var OnWallItem = (function (_super) {
                __extends(OnWallItem, _super);
                function OnWallItem() {
                    var _this = _super.call(this) || this;
                    _this.type = "OnWallItem";
                    _this._onWallEnable = true;
                    _this._selectable = true;
                    return _this;
                }
                OnWallItem.prototype.dragging = function (intersect) {
                    var point = intersect.point;
                    var face = intersect.face;
                    var box = new THREE.Box3();
                    box.setFromObject(this);
                    var size = box.getSize();
                    var normal = face.normal;
                    point.z += normal.z * 2;
                    var angle = 999999999999;
                    if (normal.x != 0)
                        angle = normal.z / normal.x;
                    if (1 - normal.x < 0.0000001) {
                        this.rotation.z = -Math.PI / 2;
                    }
                    else if (1 - normal.z < 0.0000001) {
                        this.rotation.z = 0;
                    }
                    else {
                        this.rotation.z = Math.atan(angle) + Math.PI / 2;
                        if (normal.x > 0)
                            this.rotation.z += Math.PI;
                    }
                    this.rotation.x = Math.PI / 2;
                    return this.move(point);
                };
                OnWallItem.prototype.rotateByQuaternion = function (quaternion) {
                    _super.prototype.rotateByQuaternion.call(this, quaternion);
                    this.rotation.z = -Math.PI / 2;
                };
                OnWallItem.prototype.inRegion = function (intersect) {
                    var wall = intersect.object;
                    var box = new THREE.Box3();
                    box.setFromObject(wall);
                    var diff1 = box.max.clone().sub(intersect.point);
                    var diff2 = intersect.point.clone().sub(box.min);
                    var objbox = new THREE.Box3();
                    objbox.setFromObject(this);
                    var half = objbox.max.clone().sub(objbox.min).divideScalar(2);
                    if (diff1.y < half.y * 2 || diff2.y < 1) {
                        return false;
                    }
                    if (Math.abs(intersect.face.normal.x) < (1 - 0.0000001))
                        if (diff1.x < half.x || diff2.x < half.x) {
                            return false;
                        }
                    if (Math.abs(intersect.face.normal.z) < (1 - 0.0000001))
                        if (diff1.z < half.z || diff2.z < half.z) {
                            return false;
                        }
                    return true;
                };
                OnWallItem.prototype.clone = function (recursive) {
                    var newObject = new OnWallItem();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return OnWallItem;
            }(Items.Item));
            Items.OnWallItem = OnWallItem;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Houses;
    (function (Houses) {
        var House = (function () {
            function House() {
                this._storeys = {};
                this._combinationStart = false;
                this._selectItems = [];
                this._metadata = new House3D.HouseTypeData();
            }
            House.prototype.setControls = function (control) {
                this._control = control;
            };
            House.prototype.getMetadata = function () {
                return this._metadata;
            };
            House.prototype.setMetadata = function (data) {
                this._metadata.uuid = data.uuid;
                this._metadata.id = data.id;
            };
            House.prototype.addStorey = function (data) {
                this._storeys[data._floor] = data;
                if (!this._currentStorey)
                    this._currentStorey = data;
                if (data._floor == 1)
                    this._currentStorey = data;
            };
            House.prototype.getStorey = function (floor) {
                return this._storeys[floor];
            };
            House.prototype.displayStorey = function (floor) {
                for (var key in this._storeys) {
                    var display = false;
                    if (floor == 0)
                        display = true;
                    else if (this._storeys[key]._floor == floor)
                        display = true;
                    if (display) {
                        this._storeys[key].display();
                        this._currentStorey = this._storeys[key];
                    }
                    else {
                        this._storeys[key].hidden();
                    }
                }
            };
            House.prototype.getBuild = function (uuid) {
                for (var key in this._storeys) {
                    var build = this._storeys[key].getBuild(uuid);
                    if (build)
                        return build;
                }
                return undefined;
            };
            House.prototype.getItem = function (uuid) {
                for (var key in this._storeys) {
                    var item = this._storeys[key].getItem(uuid);
                    if (item)
                        return item;
                }
                return undefined;
            };
            House.prototype.addItem = function (item) {
                if (this._currentStorey) {
                    this._currentStorey.addItem(item);
                }
            };
            House.prototype.removeItem = function (uuid) {
                for (var key in this._storeys) {
                    if (this._storeys[key].removeItem(uuid))
                        return true;
                }
                return false;
            };
            House.prototype.clear = function () {
                for (var key in this._storeys) {
                    this._storeys[key].clear();
                    delete this._storeys[key];
                }
                this._currentStorey = undefined;
            };
            House.prototype.clearItem = function () {
                for (var key in this._storeys) {
                    this._storeys[key].clearItem();
                }
            };
            House.prototype.getAllItems = function () {
                var datas = [];
                for (var key in this._storeys) {
                    this._storeys[key].getAllItems(datas);
                }
                return datas;
            };
            House.prototype.getAllBuilds = function () {
                var datas = [];
                for (var key in this._storeys) {
                    this._storeys[key].getAllBuilds(datas);
                }
                return datas;
            };
            House.prototype.copyItem = function (metadata) {
                var datas = [];
                for (var key in this._storeys) {
                    this._storeys[key].getAllBuilds(datas);
                }
                return datas;
            };
            House.prototype.getPickupMeshes = function () {
                var meshes = [];
                for (var key in this._storeys) {
                    var storey = this._storeys[key];
                    if (storey._visable) {
                        storey.getPickupMeshes(meshes);
                    }
                }
                return meshes;
            };
            House.prototype.getObject3D = function (object) {
                var obj = object.parent;
                if (obj.parent && obj.parent.type == "ItemGroup") {
                    obj = obj.parent;
                }
                return obj;
            };
            House.prototype.dragStart = function (intersect) {
                if (!this._combinationStart ||
                    !this._selectObject ||
                    this._selectObject.type.indexOf("Item") < 0)
                    this.unDrag();
                var obj = this.getObject3D(intersect.object);
                if (obj.type.indexOf("Item") >= 0) {
                    var item = obj;
                    var selectable = item.getSelectable();
                    if (selectable === true) {
                        this._selectObject = item;
                        if (this._combinationStart) {
                            if (item.type.indexOf("Item") >= 0) {
                                this._control.attach(item);
                                this.addGroupItem(item);
                                item.select();
                            }
                        }
                        else {
                            if (item.type.indexOf("Item") >= 0) {
                                this._control.attach(item);
                            }
                            item.select();
                        }
                        return true;
                    }
                    else
                        return false;
                }
                else {
                    this._selectObject = this.getObject3D(intersect.object);
                    return false;
                }
            };
            House.prototype.dragging = function (intersect) {
                this._control.detach();
                if (this._selectObject) {
                    if (this._selectObject.type.indexOf("Item") >= 0) {
                        var item = this._selectObject;
                        item.dragging(intersect);
                    }
                }
            };
            House.prototype.dragEnd = function () {
                if (this._selectObject) {
                    if (this._selectObject.type.indexOf("Item") >= 0) {
                        var item = this._selectObject;
                        if (item.type == "OnFloorItem")
                            this._control.attach(item);
                    }
                }
            };
            House.prototype.unDrag = function () {
                if (this._selectObject) {
                    if (this._selectObject.type.indexOf("Item") >= 0) {
                        var item = this._selectObject;
                        item.unSelect();
                    }
                }
                this._selectObject = undefined;
                this._control.detach();
            };
            House.prototype.getPlaceMeshes = function (mesh) {
                if (mesh === this._curmesh)
                    return this._placeMeshes;
                var meshes = [];
                var obj = this.getObject3D(mesh);
                if (obj.type.indexOf("Item") >= 0) {
                    var item = obj;
                    for (var key in this._storeys) {
                        var storey = this._storeys[key];
                        if (storey._visable) {
                            storey.getPlaceMeshes(item, meshes);
                        }
                    }
                }
                this._curmesh = mesh;
                this._placeMeshes = meshes;
                return meshes;
            };
            House.prototype.getWallMeshes = function () {
                if (House.WallMeshes)
                    return House.WallMeshes;
                House.WallMeshes = [];
                var meshes = [];
                for (var key in this._storeys) {
                    var storey = this._storeys[key];
                    if (storey._visable) {
                        storey.getWallMeshes(meshes);
                    }
                }
                for (var _i = 0, meshes_2 = meshes; _i < meshes_2.length; _i++) {
                    var mesh = meshes_2[_i];
                    var box = new THREE.Box3();
                    box.setFromObject(mesh);
                    House.WallMeshes.push(box);
                }
                return House.WallMeshes;
            };
            House.prototype.getDoorMeshes = function () {
                if (House.DoorMeshes)
                    return House.DoorMeshes;
                House.DoorMeshes = [];
                var doors = [];
                for (var key in this._storeys) {
                    var storey = this._storeys[key];
                    if (storey._visable) {
                        storey.getDoorMeshes(doors);
                    }
                }
                for (var _i = 0, doors_1 = doors; _i < doors_1.length; _i++) {
                    var door = doors_1[_i];
                    var box = new THREE.Box3();
                    box.setFromObject(door);
                    House.DoorMeshes.push(box);
                }
                return House.DoorMeshes;
            };
            House.prototype.combinationStart = function () {
                this._combinationStart = true;
                this.unDrag();
            };
            House.prototype.combinationCancel = function () {
                this._combinationStart = false;
                this.unDrag();
                for (var _i = 0, _a = this._selectItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.unSelect();
                }
                this._selectItems = [];
            };
            House.prototype.combination = function (store) {
                if (!this._combinationStart)
                    return;
                if (this._selectItems.length == 0)
                    return;
                var group = new House3D.Models.Items.ItemGroup();
                group.combination(store, this, this._selectItems);
                this._control.attach(group);
                this._selectObject = group;
                this._combinationStart = false;
                this._selectItems = [];
                return group;
            };
            House.prototype.separation = function (store) {
                if (this._selectObject &&
                    this._selectObject.type == "ItemGroup") {
                    var item = this._selectObject;
                    item.separation(store, this);
                    this.unDrag();
                }
            };
            House.prototype.addGroupItem = function (newItem) {
                for (var _i = 0, _a = this._selectItems; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item === newItem)
                        return;
                }
                this._selectItems.push(newItem);
            };
            House.prototype.enter = function (obj) {
                var pos = obj.position;
                for (var key in this._storeys) {
                    var storey = this._storeys[key];
                    var result = storey.isEnter(pos);
                    if (result) {
                        obj.position.set(result.x, result.y, result.z);
                        return true;
                    }
                }
                return false;
            };
            return House;
        }());
        Houses.House = House;
    })(Houses = House3D.Houses || (House3D.Houses = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Events;
        (function (Events) {
            var RegisterEvents = (function () {
                function RegisterEvents() {
                }
                Object.defineProperty(RegisterEvents.prototype, "buildEvents", {
                    get: function () {
                        return this._buildEvents;
                    },
                    set: function (events) {
                        this._buildEvents = events;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RegisterEvents.prototype, "itemEvents", {
                    get: function () {
                        return this._itemEvents;
                    },
                    set: function (events) {
                        this._itemEvents = events;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RegisterEvents;
            }());
            Events.RegisterEvents = RegisterEvents;
        })(Events = SceneEditor.Events || (SceneEditor.Events = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var OnFloorItem = (function (_super) {
                __extends(OnFloorItem, _super);
                function OnFloorItem() {
                    var _this = _super.call(this) || this;
                    _this.type = "OnFloorItem";
                    _this._onFloorEnable = true;
                    _this._selectable = true;
                    return _this;
                }
                OnFloorItem.prototype.clone = function (recursive) {
                    var newObject = new OnFloorItem();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return OnFloorItem;
            }(Items.Item));
            Items.OnFloorItem = OnFloorItem;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var CarpetItem = (function (_super) {
                __extends(CarpetItem, _super);
                function CarpetItem() {
                    var _this = _super.call(this) || this;
                    _this.type = "CarpetItem";
                    _this._onFloorEnable = true;
                    _this._selectable = true;
                    _this._allowPlacement = true;
                    return _this;
                }
                CarpetItem.prototype.clone = function (recursive) {
                    var newObject = new CarpetItem();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return CarpetItem;
            }(Items.Item));
            Items.CarpetItem = CarpetItem;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var OnWallFloorItem = (function (_super) {
                __extends(OnWallFloorItem, _super);
                function OnWallFloorItem() {
                    var _this = _super.call(this) || this;
                    _this.type = "OnWallFloorItem";
                    _this._onFloorEnable = true;
                    _this._onWallEnable = true;
                    return _this;
                }
                OnWallFloorItem.prototype.clone = function (recursive) {
                    var newObject = new OnWallFloorItem();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return OnWallFloorItem;
            }(Items.Item));
            Items.OnWallFloorItem = OnWallFloorItem;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var ItemGroup = (function (_super) {
                __extends(ItemGroup, _super);
                function ItemGroup() {
                    var _this = _super.call(this) || this;
                    _this.type = "ItemGroup";
                    _this._onFloorEnable = true;
                    _this._selectable = true;
                    return _this;
                }
                ItemGroup.prototype.clone = function (recursive) {
                    var newObject = new ItemGroup();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                ItemGroup.prototype.combination = function (store, house, items) {
                    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                        var item = items_1[_i];
                        store.remove(item);
                        house.removeItem(item.uuid);
                        if (item.type == "ItemGroup") {
                            var items_2 = [];
                            for (var _a = 0, _b = item.children; _a < _b.length; _a++) {
                                var obj = _b[_a];
                                items_2.push(obj);
                            }
                            for (var _c = 0, items_3 = items_2; _c < items_3.length; _c++) {
                                var subItem = items_3[_c];
                                var pos_1 = subItem.getWorldPosition();
                                var rotat = subItem.getWorldRotation().toVector3();
                                subItem.position.copy(pos_1);
                                subItem.rotation.setFromVector3(rotat);
                                this.add(subItem);
                            }
                        }
                        else {
                            this.add(item);
                        }
                    }
                    this.updateMatrixWorld();
                    var pos = this.getCenter();
                    pos.y = 0;
                    for (var _d = 0, _e = this.children; _d < _e.length; _d++) {
                        var obj = _e[_d];
                        var item = obj;
                        item.position.sub(pos);
                    }
                    this.position.add(pos);
                    store.addModel(this);
                    house.addItem(this);
                };
                ItemGroup.prototype.separation = function (store, house) {
                    this.unSelect();
                    store.remove(this);
                    house.removeItem(this.uuid);
                    var items = [];
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        items.push(obj);
                    }
                    for (var _b = 0, items_4 = items; _b < items_4.length; _b++) {
                        var item = items_4[_b];
                        var pos = item.getWorldPosition();
                        var rotat = item.getWorldRotation().toVector3();
                        item.position.copy(pos);
                        item.rotation.setFromVector3(rotat);
                        store.addModel(item);
                        house.addItem(item);
                    }
                };
                ItemGroup.prototype.getMeshes = function (meshes) {
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        var item = obj;
                        item.getMeshes(meshes);
                    }
                };
                ItemGroup.prototype.select = function () {
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        var item = obj;
                        item.select();
                    }
                };
                ItemGroup.prototype.unSelect = function () {
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        var item = obj;
                        item.unSelect();
                    }
                };
                ItemGroup.prototype.getCenter = function () {
                    var minPos = new THREE.Vector3();
                    var maxPos = new THREE.Vector3();
                    var y = 0;
                    var index = 0;
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        var item = obj;
                        var x = item.position.x;
                        var z = item.position.z;
                        if (index == 0) {
                            minPos.x = maxPos.x = x;
                            minPos.z = maxPos.z = z;
                            y = item.position.y;
                            index++;
                        }
                        else {
                            maxPos.x = maxPos.x > x ? maxPos.x : x;
                            minPos.x = minPos.x < x ? minPos.x : x;
                            maxPos.z = maxPos.z > z ? maxPos.z : z;
                            minPos.z = minPos.z < z ? minPos.z : z;
                        }
                    }
                    var position = new THREE.Vector3();
                    position.x = (minPos.x + maxPos.x) / 2;
                    position.y = y;
                    position.z = (minPos.z + maxPos.z) / 2;
                    return position;
                };
                ItemGroup.prototype.getChildrenMetadata = function () {
                    var itemList = [];
                    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        var item = obj;
                        var data = item.getMetadata();
                        itemList.push(data);
                    }
                    return itemList;
                };
                return ItemGroup;
            }(Items.Item));
            Items.ItemGroup = ItemGroup;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var InWallItem = (function (_super) {
                __extends(InWallItem, _super);
                function InWallItem() {
                    var _this = _super.call(this) || this;
                    _this.type = "InWallItem";
                    _this._inWallEnable = true;
                    return _this;
                }
                InWallItem.prototype.clone = function (recursive) {
                    var newObject = new InWallItem();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return InWallItem;
            }(Items.Item));
            Items.InWallItem = InWallItem;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var OnItem = (function (_super) {
                __extends(OnItem, _super);
                function OnItem() {
                    var _this = _super.call(this) || this;
                    _this.type = "OnItem";
                    _this._onFloorEnable = true;
                    _this._onItemEnable = true;
                    _this._selectable = true;
                    _this._allowPlacement = false;
                    return _this;
                }
                OnItem.prototype.clone = function (recursive) {
                    var newObject = new OnItem();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                OnItem.prototype.dragging = function (intersect) {
                    var point = intersect.point;
                    point.y += 1;
                    return this.move(point);
                };
                return OnItem;
            }(Items.Item));
            Items.OnItem = OnItem;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var OnRoofItem = (function (_super) {
                __extends(OnRoofItem, _super);
                function OnRoofItem() {
                    var _this = _super.call(this) || this;
                    _this.type = "OnRoofItem";
                    _this._onRoofEnable = true;
                    _this._selectable = true;
                    return _this;
                }
                OnRoofItem.prototype.clone = function (recursive) {
                    var newObject = new OnRoofItem();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return OnRoofItem;
            }(Items.Item));
            Items.OnRoofItem = OnRoofItem;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Builds;
        (function (Builds) {
            var Floor = (function (_super) {
                __extends(Floor, _super);
                function Floor() {
                    var _this = _super.call(this) || this;
                    _this.type = "Floor";
                    return _this;
                }
                Floor.prototype.clone = function (recursive) {
                    var newObject = new Floor();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                Floor.prototype.modifyMaterial = function (materialId, material) {
                    material.side = THREE.DoubleSide;
                    _super.prototype.modifyMaterial.call(this, materialId, material);
                };
                return Floor;
            }(Builds.Build));
            Builds.Floor = Floor;
        })(Builds = Models.Builds || (Models.Builds = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Builds;
        (function (Builds) {
            var Wall = (function (_super) {
                __extends(Wall, _super);
                function Wall() {
                    var _this = _super.call(this) || this;
                    _this.type = "Wall";
                    return _this;
                }
                Wall.prototype.clone = function (recursive) {
                    var newObject = new Wall();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return Wall;
            }(Builds.Build));
            Builds.Wall = Wall;
        })(Builds = Models.Builds || (Models.Builds = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Builds;
        (function (Builds) {
            var Roof = (function (_super) {
                __extends(Roof, _super);
                function Roof() {
                    var _this = _super.call(this) || this;
                    _this.type = "Roof";
                    return _this;
                }
                Roof.prototype.Change = function (data) {
                };
                Roof.prototype.clone = function (recursive) {
                    var newObject = new Roof();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return Roof;
            }(Builds.Build));
            Builds.Roof = Roof;
        })(Builds = Models.Builds || (Models.Builds = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Builds;
        (function (Builds) {
            var CollisionWall = (function (_super) {
                __extends(CollisionWall, _super);
                function CollisionWall() {
                    var _this = _super.call(this) || this;
                    _this.type = "CollisionWall";
                    _this.visible = false;
                    return _this;
                }
                CollisionWall.prototype.clone = function (recursive) {
                    var newObject = new CollisionWall();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return CollisionWall;
            }(Builds.Build));
            Builds.CollisionWall = CollisionWall;
        })(Builds = Models.Builds || (Models.Builds = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Builds;
        (function (Builds) {
            var HangWall = (function (_super) {
                __extends(HangWall, _super);
                function HangWall() {
                    var _this = _super.call(this) || this;
                    _this.type = "HangWall";
                    _this.visible = false;
                    return _this;
                }
                HangWall.prototype.clone = function (recursive) {
                    var newObject = new HangWall();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return HangWall;
            }(Builds.Build));
            Builds.HangWall = HangWall;
        })(Builds = Models.Builds || (Models.Builds = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Items;
        (function (Items) {
            var DecorateItem = (function (_super) {
                __extends(DecorateItem, _super);
                function DecorateItem() {
                    var _this = _super.call(this) || this;
                    _this.type = "DecorateItem";
                    _this._selectable = true;
                    return _this;
                }
                DecorateItem.prototype.clone = function (recursive) {
                    var newObject = new DecorateItem();
                    newObject.copy(this, recursive);
                    return newObject;
                };
                return DecorateItem;
            }(Items.Item));
            Items.DecorateItem = DecorateItem;
        })(Items = Models.Items || (Models.Items = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var ModelFactory = (function () {
            function ModelFactory() {
            }
            ModelFactory.build = function (itemType) {
                var object;
                switch (itemType) {
                    case 'Floor':
                        object = new Models.Builds.Floor();
                        break;
                    case 'Wall':
                        object = new Models.Builds.Wall();
                        break;
                    case 'Roof':
                        object = new Models.Builds.Roof();
                        break;
                    case 'OnFloorItem':
                        object = new Models.Items.OnFloorItem();
                        break;
                    case 'CarpetItem':
                        object = new Models.Items.CarpetItem();
                        break;
                    case 'OnWallFloorItem':
                        object = new Models.Items.OnWallFloorItem();
                        break;
                    case 'InWallItem':
                        object = new Models.Items.InWallItem();
                        break;
                    case 'OnItem':
                        object = new Models.Items.OnItem();
                        break;
                    case 'OnRoofItem':
                        object = new Models.Items.OnRoofItem();
                        break;
                    case 'OnWallItem':
                        object = new Models.Items.OnWallItem();
                        break;
                    case 'ItemGroup':
                        object = new Models.Items.ItemGroup();
                        break;
                    case 'DecorateItem':
                        object = new Models.Items.DecorateItem();
                        break;
                    case 'CollisionWall':
                        object = new Models.Builds.CollisionWall();
                        break;
                    case 'HangWall':
                        object = new Models.Builds.HangWall();
                        break;
                    default:
                        object = new Models.Items.Item();
                }
                return object;
            };
            return ModelFactory;
        }());
        Models.ModelFactory = ModelFactory;
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Loaders;
        (function (Loaders) {
            var MaterialLoader = (function () {
                function MaterialLoader(manager) {
                    this.crossOrigin = '';
                    this.texturePath = '';
                    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
                }
                MaterialLoader.prototype.setCrossOrigin = function (value) {
                    this.crossOrigin = value;
                };
                MaterialLoader.prototype.setTexturePath = function (value) {
                    this.texturePath = value;
                };
                MaterialLoader.prototype.onLoad = function (event) { };
                MaterialLoader.prototype.onProgress = function (event) { };
                MaterialLoader.prototype.onError = function (event) { };
                MaterialLoader.prototype.load = function (modelData) {
                    var images = this.loadImages(modelData.images);
                    var textures = this.loadTextures(modelData.textures, images);
                    var materials = this.loadMaterials(modelData.materials[0], textures);
                    return materials;
                };
                MaterialLoader.prototype.parse = function (json) {
                    var obj = JSON.parse(json);
                    var modelData = obj;
                    var images = this.loadImages(modelData.images);
                    var textures = this.loadTextures(modelData.textures, images);
                    var materials = this.loadMaterials(modelData.materials[0], textures);
                    return materials;
                };
                MaterialLoader.prototype.loadImages = function (datas) {
                    var images = {};
                    if (datas !== undefined && datas.length > 0) {
                        var loader = new THREE.ImageLoader(this.manager);
                        loader.setCrossOrigin(this.crossOrigin);
                        for (var index = 0, length = datas.length; index < length; index++) {
                            var image = datas[index];
                            var path = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(image.url) ? image.url : this.texturePath + image.url;
                            images[image.uuid] = loader.load(path, this.onProgress, this.onError);
                        }
                    }
                    return images;
                };
                MaterialLoader.prototype.loadTextures = function (datas, images) {
                    var textures = {};
                    if (datas !== undefined) {
                        for (var index = 0, length = datas.length; index < length; index++) {
                            var data = datas[index];
                            if (data.image === undefined) {
                                console.warn('ModelLoader: No "image" specified for', data.uuid);
                            }
                            if (images[data.image] === undefined) {
                                console.warn('ModelLoader: Undefined image', data.image);
                            }
                            var texture = new THREE.Texture(images[data.image]);
                            texture.needsUpdate = true;
                            texture.uuid = data.uuid;
                            if (data.name !== undefined)
                                texture.name = data.name;
                            if (data.offset !== undefined)
                                texture.offset.fromArray(data.offset);
                            if (data.repeat !== undefined)
                                texture.repeat.fromArray(data.repeat);
                            if (data.wrap !== undefined) {
                                texture.wrapS = data.wrap[0];
                                texture.wrapT = data.wrap[1];
                            }
                            if (data.anisotropy !== undefined)
                                texture.anisotropy = data.anisotropy;
                            if (data.flipY !== undefined)
                                texture.flipY = data.flipY;
                            textures[data.uuid] = texture;
                        }
                    }
                    return textures;
                };
                MaterialLoader.prototype.loadMaterials = function (data, textures) {
                    var loader = new THREE.MaterialLoader();
                    loader.setTextures(textures);
                    return loader.parse(data);
                };
                MaterialLoader.prototype.getMaterial = function (name, materials) {
                    if (name === undefined)
                        return undefined;
                    if (materials[name] === undefined) {
                        console.warn('THREE.ObjectLoader: Undefined material', name);
                    }
                    return materials[name];
                };
                return MaterialLoader;
            }());
            Loaders.MaterialLoader = MaterialLoader;
        })(Loaders = SceneEditor.Loaders || (SceneEditor.Loaders = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Houses;
        (function (Houses) {
            var House = (function (_super) {
                __extends(House, _super);
                function House(container, transform) {
                    var _this = _super.call(this) || this;
                    _this._transform = transform;
                    _this.init_itemmenu(container);
                    _this.init_buildmenu(container);
                    return _this;
                }
                House.prototype.registerEvents = function (events) {
                    this._events = events;
                };
                House.prototype.dragStart = function (intersect) {
                    var obj = this.getObject3D(intersect.object);
                    var result = _super.prototype.dragStart.call(this, intersect);
                    this.showMenu();
                    if (this._selectObject) {
                        if (this._selectObject.type.indexOf("Item") >= 0) {
                            var item = this._selectObject;
                            var selectable = item.getSelectable();
                            if (selectable === true) {
                                this.item_selectEvent();
                            }
                        }
                        else {
                            this.build_selectEvent();
                        }
                    }
                    return result;
                };
                House.prototype.dragging = function (intersect) {
                    this.hideMenu();
                    if (!intersect)
                        return;
                    _super.prototype.dragging.call(this, intersect);
                };
                House.prototype.angleView = function () {
                    if (this._selectObject) {
                        if (this._selectObject.type.indexOf("Item") < 0) {
                            this.hideMenu();
                        }
                    }
                };
                House.prototype.mouseWheel = function () {
                    this.showMenu();
                };
                House.prototype.unDrag = function () {
                    this.hideMenu();
                    _super.prototype.unDrag.call(this);
                };
                House.prototype.dragEnd = function () {
                    this.showMenu();
                    _super.prototype.dragEnd.call(this);
                };
                House.prototype.init_itemmenu = function (container) {
                    var _this = this;
                    this._itemMenu = document.createElement('div');
                    this._itemMenu.setAttribute("style", "position:absolute; display:none;backgroundColor:#666666; ");
                    container.appendChild(this._itemMenu);
                    var imgDelete = document.createElement('img');
                    imgDelete.id = "imgitem_delete";
                    imgDelete.src = "./images/delete.png";
                    imgDelete.width = 32;
                    imgDelete.setAttribute("style", "backgroundColor:#666666;float:left;");
                    this._itemMenu.appendChild(imgDelete);
                    var imgModifyColor = document.createElement('img');
                    imgModifyColor.id = "imgitem_modifycolor";
                    imgModifyColor.src = "./images/modifycolor.png";
                    imgModifyColor.width = 32;
                    imgModifyColor.setAttribute("style", "backgroundColor:#666666; float:left;");
                    this._itemMenu.appendChild(imgModifyColor);
                    var imgModifyModel = document.createElement('img');
                    imgModifyModel.id = "imgitem_modifymodel";
                    imgModifyModel.src = "./images/modifymodel.png";
                    imgModifyModel.width = 32;
                    imgModifyModel.setAttribute("style", "backgroundColor:#666666; float:left;");
                    this._itemMenu.appendChild(imgModifyModel);
                    var imgCopyModel = document.createElement('img');
                    imgCopyModel.id = "imgitem_copymodel";
                    imgCopyModel.src = "./images/copying.png";
                    imgCopyModel.width = 32;
                    imgCopyModel.setAttribute("style", "backgroundColor:#666666; float:left;");
                    this._itemMenu.appendChild(imgCopyModel);
                    var imgSeparation = document.createElement('img');
                    imgSeparation.id = "imgitem_separation";
                    imgSeparation.src = "./images/group_delete.png";
                    imgSeparation.width = 32;
                    imgSeparation.setAttribute("style", "backgroundColor:#666666; float:left;");
                    this._itemMenu.appendChild(imgSeparation);
                    var imgCombination = document.createElement('img');
                    imgCombination.id = "imgitem_combination";
                    imgCombination.src = "./images/group_add.png";
                    imgCombination.width = 32;
                    imgCombination.setAttribute("style", "backgroundColor:#666666; float:left;");
                    this._itemMenu.appendChild(imgCombination);
                    var imgDetail = document.createElement('img');
                    imgDetail.id = "imgitem_detail";
                    imgDetail.src = "./images/detail.png";
                    imgDetail.width = 32;
                    imgDetail.style.backgroundColor = '#666666';
                    this._itemMenu.appendChild(imgDetail);
                    imgDelete.addEventListener('click', function () { return _this.item_deleteEvent(); });
                    imgModifyColor.addEventListener('click', function () { return _this.item_modifycolorEvent(); });
                    imgModifyModel.addEventListener('click', function () { return _this.item_modifymodelEvent(); });
                    imgCopyModel.addEventListener('click', function () { return _this.item_copymodelEvent(); });
                    imgSeparation.addEventListener('click', function () { return _this.item_separationEvent(); });
                    imgCombination.addEventListener('click', function () { return _this.item_combinationEvent(); });
                    imgDetail.addEventListener('click', function () { return _this.item_detailEvent(); });
                };
                House.prototype.item_selectEvent = function () {
                    var events = this._events.itemEvents;
                    if (this._selectObject && events && events.selectEvent) {
                        var item = this._selectObject;
                        events.selectEvent(item.getMetadata());
                    }
                };
                House.prototype.item_deleteEvent = function () {
                    var events = this._events.itemEvents;
                    if (this._selectObject && events && events.deleteEvent) {
                        var item = this._selectObject;
                        events.deleteEvent(item.getMetadata());
                    }
                };
                House.prototype.item_modifycolorEvent = function () {
                    var events = this._events.itemEvents;
                    if (this._selectObject && events && events.modifyColorEvent) {
                        var item = this._selectObject;
                        events.modifyColorEvent(item.getMetadata());
                    }
                };
                House.prototype.item_modifymodelEvent = function () {
                    var events = this._events.itemEvents;
                    if (this._selectObject && events && events.modifyModelEvent) {
                        var item = this._selectObject;
                        events.modifyModelEvent(item.getMetadata());
                    }
                };
                House.prototype.item_copymodelEvent = function () {
                    var events = this._events.itemEvents;
                    if (this._selectObject && events && events.modifyModelEvent) {
                        var item = this._selectObject;
                        events.copyModelEvent(item.getMetadata());
                    }
                };
                House.prototype.item_separationEvent = function () {
                    var events = this._events.itemEvents;
                    if (this._selectObject && events && events.separationEvent) {
                        var item = this._selectObject;
                        events.separationEvent(item.getMetadata());
                    }
                    this.hideMenu();
                };
                House.prototype.item_combinationEvent = function () {
                    var events = this._events.itemEvents;
                    if (this._selectObject && events && events.combinationEvent) {
                        var item = this._selectObject;
                        events.combinationEvent(item.getMetadata());
                    }
                    this.hideMenu();
                };
                House.prototype.item_detailEvent = function () {
                    var events = this._events.itemEvents;
                    if (this._selectObject && events && events.detailEvent) {
                        var item = this._selectObject;
                        events.detailEvent(item.getMetadata());
                    }
                };
                House.prototype.init_buildmenu = function (container) {
                    var _this = this;
                    this._buildMenu = document.createElement('div');
                    this._buildMenu.setAttribute("style", "position:absolute; display:none;");
                    container.appendChild(this._buildMenu);
                    var imgModifyColor = document.createElement('img');
                    imgModifyColor.id = 'imgbuild_modifycolor';
                    imgModifyColor.src = './images/modifycolor.png';
                    imgModifyColor.width = 32;
                    imgModifyColor.setAttribute("style", "backgroundColor:#666666; float:left;");
                    this._buildMenu.appendChild(imgModifyColor);
                    var imgDetail = document.createElement('img');
                    imgDetail.id = "imgbuild_detail";
                    imgDetail.src = "./images/detail.png";
                    imgDetail.width = 32;
                    imgDetail.setAttribute("style", "backgroundColor:#666666; float:left;");
                    this._buildMenu.appendChild(imgDetail);
                    imgModifyColor.addEventListener('click', function () { return _this.build_modifycolorEvent(); });
                    imgDetail.addEventListener('click', function () { return _this.build_detailEvent(); });
                };
                House.prototype.build_selectEvent = function () {
                    var events = this._events.buildEvents;
                    if (this._selectObject && events && events.selectEvent) {
                        var build = this._selectObject;
                        events.selectEvent(build.getMetadata());
                    }
                };
                House.prototype.build_modifycolorEvent = function () {
                    var events = this._events.buildEvents;
                    if (this._selectObject && events && events.modifyColorEvent) {
                        var build = this._selectObject;
                        events.modifyColorEvent(build.getMetadata());
                    }
                };
                House.prototype.build_detailEvent = function () {
                    var events = this._events.buildEvents;
                    if (this._selectObject && events && events.detailEvent) {
                        var build = this._selectObject;
                        events.detailEvent(build.getMetadata());
                    }
                };
                House.prototype.calcBuildMenu = function (element, obj) {
                    var box = new THREE.Box3();
                    box.setFromObject(obj);
                    var middle = box.max.clone().add(box.min).divideScalar(2);
                    middle = this._transform.worldToScreen(middle);
                    element.style.left = middle.x + 'px';
                    element.style.top = middle.y + 'px';
                    element.style.display = 'block';
                };
                House.prototype.calcItemMenu = function (element, obj) {
                    var box = new THREE.Box3();
                    box.setFromObject(obj);
                    var pos = box.max.clone().add(box.min).divideScalar(2);
                    pos.y = box.max.y;
                    pos = this._transform.worldToScreen(pos);
                    var pos1 = box.max.clone();
                    pos1 = this._transform.worldToScreen(pos1);
                    pos.x += Math.abs(pos1.x - pos.x) + 20;
                    pos.y -= Math.abs(pos1.y - pos.y) + 20;
                    if (pos.y < 0)
                        pos.y = 0;
                    element.style.left = pos.x + 'px';
                    element.style.top = pos.y + 'px';
                    element.style.display = 'block';
                };
                House.prototype.elementDisplay = function (element, display) {
                    var id = document.getElementById(element);
                    if (id)
                        if (display)
                            id.style.display = "block";
                        else
                            id.style.display = "none";
                };
                House.prototype.showMenu = function () {
                    if (this._selectObject) {
                        if (this._selectObject.type.indexOf("Item") >= 0) {
                            var item = this._selectObject;
                            var selectable = item.getSelectable();
                            if (selectable === true) {
                                this._buildMenu.style.display = 'none';
                                this.calcItemMenu(this._itemMenu, item);
                                if (this._combinationStart && this._selectItems.length > 1) {
                                    this.elementDisplay("imgitem_delete", false);
                                    this.elementDisplay("imgitem_modifycolor", false);
                                    this.elementDisplay("imgitem_modifymodel", false);
                                    this.elementDisplay("imgitem_copymodel", false);
                                    this.elementDisplay("imgitem_separation", false);
                                    this.elementDisplay("imgitem_combination", true);
                                    this.elementDisplay("imgitem_detail", false);
                                }
                                else {
                                    this.elementDisplay("imgitem_delete", true);
                                    this.elementDisplay("imgitem_modifycolor", false);
                                    this.elementDisplay("imgitem_modifymodel", true);
                                    this.elementDisplay("imgitem_copymodel", true);
                                    this.elementDisplay("imgitem_separation", false);
                                    this.elementDisplay("imgitem_combination", false);
                                    this.elementDisplay("imgitem_detail", true);
                                    if (this._selectObject.type == "ItemGroup") {
                                        this.elementDisplay("imgitem_separation", true);
                                    }
                                    else {
                                        this.elementDisplay("imgitem_modifycolor", true);
                                    }
                                }
                            }
                            else {
                                this.hideMenu();
                            }
                        }
                        else {
                            this._itemMenu.style.display = 'none';
                            this.calcBuildMenu(this._buildMenu, this._selectObject);
                        }
                    }
                };
                House.prototype.hideMenu = function () {
                    this._buildMenu.style.display = 'none';
                    this._itemMenu.style.display = 'none';
                };
                House.prototype.preAddItem = function (item) {
                    this.preItem = item;
                };
                House.prototype.cancelAddItem = function () {
                    this.preItem = undefined;
                };
                House.prototype.getPreAddItem = function () {
                    return this.preItem;
                };
                return House;
            }(House3D.Houses.House));
            Houses.House = House;
        })(Houses = SceneEditor.Houses || (SceneEditor.Houses = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var ModelStore = (function () {
            function ModelStore(scene) {
                this._objects = {};
                this._meshes = {};
                this._scene = scene;
            }
            ModelStore.prototype.addModel = function (model) {
                this._objects[model.uuid] = model;
                this._scene.add(model);
            };
            ModelStore.prototype.add = function (model) {
                this._scene.add(model);
            };
            ModelStore.prototype.get = function (uuid) {
                return this._objects[uuid];
            };
            ModelStore.prototype.remove = function (model) {
                if (model) {
                    var obj = this._objects[model.uuid];
                    if (obj) {
                        delete this._objects[model.uuid];
                        this._scene.remove(model);
                    }
                }
            };
            ModelStore.prototype.removeById = function (uuid) {
                var obj = this._objects[uuid];
                if (obj) {
                    delete this._objects[uuid];
                    this._scene.remove(obj);
                }
            };
            ModelStore.prototype.getMeshes = function () {
                var meshes = [];
                var scope = this;
                for (var key in this._objects) {
                    var model = this._objects[key];
                    model.traverseVisible(function (child) {
                        if (child instanceof THREE.Mesh) {
                            scope._meshes[child.uuid] = child;
                            meshes.push(child);
                        }
                    });
                }
                return meshes;
            };
            ModelStore.prototype.clear = function () {
                for (var key in this._objects) {
                    this._scene.remove(this._objects[key]);
                }
            };
            ModelStore.prototype.clearItem = function () {
                for (var key in this._objects) {
                    var obj = this._objects[key];
                    if (obj.type.indexOf('Item') >= 0 &&
                        (obj.type != 'DecorateItem' && obj.type != 'Item'))
                        this._scene.remove(obj);
                }
            };
            return ModelStore;
        }());
        Models.ModelStore = ModelStore;
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Environments;
        (function (Environments) {
            var PointLight = (function (_super) {
                __extends(PointLight, _super);
                function PointLight(position, intensity) {
                    var _this = this;
                    if (!intensity)
                        intensity = 2;
                    _this = _super.call(this, 0xffffff, intensity, 0) || this;
                    _this.position.set(0, 100, 0);
                    if (position)
                        _this.position.set(position.x, position.y, position.z);
                    _this.castShadow = false;
                    return _this;
                }
                return PointLight;
            }(THREE.PointLight));
            Environments.PointLight = PointLight;
        })(Environments = Models.Environments || (Models.Environments = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var LightData = (function () {
        function LightData() {
        }
        LightData.prototype.copy = function (source, recursive) {
            this.position = source.position.clone();
            if (source.power)
                this.power = source.power;
            return this;
        };
        LightData.prototype.clone = function (recursive) {
            var newObject = new LightData();
            newObject.copy(this, recursive);
            return newObject;
        };
        return LightData;
    }());
    House3D.LightData = LightData;
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Loaders;
        (function (Loaders) {
            var StoreyData = (function () {
                function StoreyData() {
                    this.wallList = [];
                    this.floorList = [];
                    this.roofList = [];
                    this.decorateList = [];
                }
                return StoreyData;
            }());
            Loaders.StoreyData = StoreyData;
            var HouseData = (function () {
                function HouseData() {
                }
                return HouseData;
            }());
            Loaders.HouseData = HouseData;
        })(Loaders = SceneEditor.Loaders || (SceneEditor.Loaders = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var SystemConfig = (function () {
            function SystemConfig() {
            }
            SystemConfig.ModelScale = 0.1;
            return SystemConfig;
        }());
        SceneEditor.SystemConfig = SystemConfig;
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Loaders;
        (function (Loaders) {
            var ItemMetadata = (function () {
                function ItemMetadata() {
                }
                return ItemMetadata;
            }());
            var ModelLoader = (function () {
                function ModelLoader(manager) {
                    this.crossOrigin = '';
                    this.texturePath = '';
                    this.Scale = SceneEditor.SystemConfig.ModelScale;
                    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
                }
                ModelLoader.prototype.setCrossOrigin = function (value) {
                    this.crossOrigin = value;
                };
                ModelLoader.prototype.setTexturePath = function (value) {
                    this.texturePath = value;
                };
                ModelLoader.prototype.onLoad = function (event) { };
                ModelLoader.prototype.onProgress = function (event) { };
                ModelLoader.prototype.onError = function (event) { };
                ModelLoader.prototype.load = function (url, metadata, onLoad) {
                    var scope = this;
                    var loader = new THREE.FileLoader();
                    loader.load(url, function (data) {
                        var model = scope.parse(data);
                        onLoad(model, metadata);
                    }, this.onProgress, this.onError);
                };
                ModelLoader.prototype.parse = function (json) {
                    var obj = JSON.parse(json);
                    return this.parseObj(obj);
                };
                ModelLoader.prototype.loadObject = function (data, obj) {
                    var item = House3D.Models.ModelFactory.build(data.objectType);
                    item.uuid = data.uuid;
                    if (data.name !== undefined)
                        item.name = data.name;
                    if (data.placement !== undefined && item.type.indexOf("Item") >= 0) {
                        var item1 = item;
                        item1.setPlacement(data.placement);
                    }
                    if (obj.children !== undefined) {
                        obj.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                var newobj = child.clone();
                                newobj.uuid = child.uuid;
                                item.add(newobj);
                            }
                        });
                    }
                    return item;
                };
                ModelLoader.prototype.parseObj = function (modelData) {
                    var parseJSON = function (state) {
                        var object = new THREE.OBJLoader3().parse(state);
                        for (var i = 0; i < state.geometries.length; i++) {
                            var attributes = {
                                "position": {
                                    "itemSize": 3,
                                    "type": "Float32Array",
                                    "array": [],
                                    "normalized": false
                                },
                                "normal": {
                                    "itemSize": 3,
                                    "type": "Float32Array",
                                    "array": [],
                                    "normalized": false
                                },
                                "uv": {
                                    "itemSize": 2,
                                    "type": "Float32Array",
                                    "array": [],
                                    "normalized": false
                                }
                            };
                            var attr = state.geometries[i].data;
                            attributes.position.array = object[i].geometry.vertices;
                            attributes.normal.array = object[i].geometry.normals;
                            attributes.uv.array = object[i].geometry.uvs;
                            delete state.geometries[i].data.vertices;
                            delete state.geometries[i].data.normal;
                            delete state.geometries[i].data.uv;
                            delete state.geometries[i].data.faces;
                            state.geometries[i].data.attributes = attributes;
                        }
                 
                        return state;
                    };
                    modelData = parseJSON(modelData);
                    var loader = new THREE.ObjectLoader();
                    loader.setCrossOrigin('');
                    var object = loader.parse(modelData);
                    var item = this.loadObject(modelData.object, object);
                    return item;
                    
                };
                ModelLoader.prototype.createItem1 = function (data,callback) {

                     var parseJSON = function (state) {
                        var object = new THREE.OBJLoader3().parse(state);
                        for (var i = 0; i < state.geometries.length; i++) {
                            var attributes = {
                                "position": {
                                    "itemSize": 3,
                                    "type": "Float32Array",
                                    "array": [],
                                    "normalized": false
                                },
                                "normal": {
                                    "itemSize": 3,
                                    "type": "Float32Array",
                                    "array": [],
                                    "normalized": false
                                },
                                "uv": {
                                    "itemSize": 2,
                                    "type": "Float32Array",
                                    "array": [],
                                    "normalized": false
                                }
                            };
                            var attr = state.geometries[i].data;
                            attributes.position.array = object[i].geometry.vertices;
                            attributes.normal.array = object[i].geometry.normals;
                            attributes.uv.array = object[i].geometry.uvs;
                            delete state.geometries[i].data.vertices;
                            delete state.geometries[i].data.normal;
                            delete state.geometries[i].data.uv;
                            delete state.geometries[i].data.faces;
                            state.geometries[i].data.attributes = attributes;
                        }
                        for (var i = 0; i < state.textures.length; i++) {
                    
                            state.textures[i].wrap = undefined;
                            
                        }
                        return state;
                    };
    

                    var modelData = parseJSON(data.model);

                    var loader = new THREE.ObjectLoader();
                    loader.setCrossOrigin('');
              
                    var scope = this;
                    loader.parse(modelData,function(object){
                        var obj = scope.loadObject(modelData.object, object);
                        obj.scale.set(scope.Scale, scope.Scale, scope.Scale);
                        var metadata = data.metadata;
                        if (metadata.position)
                            obj.position.copy(metadata.position);
                        if (metadata.rotation) {
                            obj.rotation.x = metadata.rotation.x * Math.PI / 180;
                            obj.rotation.y = metadata.rotation.y * Math.PI / 180;
                            obj.rotation.z = metadata.rotation.z * Math.PI / 180;
                        }
                        if (metadata.scale) {
                            obj.scale.set(metadata.scale.x, metadata.scale.y, metadata.scale.z);
                        }
                        obj.setMetadata(metadata);
                        callback(obj);
                    })
              
                };
                ModelLoader.prototype.createItem = function (data) {
                    var loader = new Loaders.ModelLoader(undefined);
                    var item = loader.parseObj(data.model);
                    var obj = item.clone();
                    obj.scale.set(this.Scale, this.Scale, this.Scale);
                    var metadata = data.metadata;
                    if (metadata.position)
                        obj.position.copy(metadata.position);
                    if (metadata.rotation) {
                        obj.rotation.x = metadata.rotation.x * Math.PI / 180;
                        obj.rotation.y = metadata.rotation.y * Math.PI / 180;
                        obj.rotation.z = metadata.rotation.z * Math.PI / 180;
                    }
                    if (metadata.scale) {
                        obj.scale.set(metadata.scale.x, metadata.scale.y, metadata.scale.z);
                    }
                    obj.setMetadata(metadata);
                    return obj;
                };
                ModelLoader.prototype.createItemGroup = function (metadata) {
                    var group = new House3D.Models.Items.ItemGroup();
                    var objgroup = group.clone();
                    if (metadata.position)
                        objgroup.position.copy(metadata.position);
                    if (metadata.rotation) {
                        objgroup.rotation.x = metadata.rotation.x * Math.PI / 180;
                        objgroup.rotation.y = metadata.rotation.y * Math.PI / 180;
                        objgroup.rotation.z = metadata.rotation.z * Math.PI / 180;
                    }
                    if (metadata.scale) {
                        objgroup.scale.set(metadata.scale.x, metadata.scale.y, metadata.scale.z);
                    }
                    objgroup.setMetadata(metadata);
                    return objgroup;
                };
                return ModelLoader;
            }());
            Loaders.ModelLoader = ModelLoader;
        })(Loaders = SceneEditor.Loaders || (SceneEditor.Loaders = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Loaders;
        (function (Loaders) {
            var HouseLoader = (function () {
                function HouseLoader() {
                    this.Scale = SceneEditor.SystemConfig.ModelScale;
                    this._totalCount = 0;
                    this._loadCount = 0;
                    this._manager = new THREE.LoadingManager();
                }
                HouseLoader.prototype.loadObj = function (obj, modelStore, house, loadComplete) {
                    this._modelStore = modelStore;
                    this._loadComplete = loadComplete;
                    var modelData = obj;
                    if (!modelData || !modelData.storeyList || modelData.storeyList.length == 0)
                        return;
                    for (var _i = 0, _a = modelData.storeyList; _i < _a.length; _i++) {
                        var storeyData = _a[_i];
                        var storey = new House3D.Houses.Storey();
                        var room = new House3D.Houses.Room();
                        storey._floor = storeyData.storey;
                        this.loadStorey(storeyData, room);
                        storey.addRoom(room);
                        house.addStorey(storey);
                    }
                };
                HouseLoader.prototype.loadStorey = function (datas, room) {
                    for (var _i = 0, _a = datas.floorList; _i < _a.length; _i++) {
                        var data = _a[_i];
                        this.loadBuilds(data, room);
                    }
                    for (var _b = 0, _c = datas.roofList; _b < _c.length; _b++) {
                        var data = _c[_b];
                        this.loadBuilds(data, room);
                    }
                    for (var _d = 0, _e = datas.wallList; _d < _e.length; _d++) {
                        var data = _e[_d];
                        this.loadBuilds(data, room);
                    }
                    if (datas.decorateList)
                        this.loadDecorate(datas.decorateList, room);
                    if (datas.hotSpot)
                        this.loadHotSpot(datas.hotSpot, room);
                    if (datas.lightList)
                        this.loadLight(datas.lightList, room);
                    else
                        this.loadLight(undefined, room);
                };
                HouseLoader.prototype.loadDecorate = function (datas, room) {
                    for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                        var data = datas_1[_i];
                        this._totalCount++;
                        this.loadObjects(data, room);
                    }
                };
                HouseLoader.prototype.loadHotSpot = function (data, room) {
                    var hotSpot = new House3D.Models.Builds.HotSpot();
                    hotSpot.setMetadata(data);
                    room.setHotSpot(hotSpot);
                };
                HouseLoader.prototype.loadLight = function (datas, room) {
                    if (datas) {
                        for (var _i = 0, datas_2 = datas; _i < datas_2.length; _i++) {
                            var data = datas_2[_i];
                            var light = new House3D.Models.Environments.PointLight(data.position, data.power);
                            this._modelStore.add(light);
                        }
                    }
                    else {
                        var light = new House3D.Models.Environments.PointLight();
                        this._modelStore.add(light);
                    }
                };
                HouseLoader.prototype.loadObjects = function (data, room) {
                    var _this = this;
                    var metadata = { "room": room, "data": data };
                    var loader = new Loaders.ModelLoader(this._manager);
                    if (data.model)
                        loader.load(data.model, metadata, function (data, metadata) { return _this.onLoadModel(data, metadata); });
                };
                HouseLoader.prototype.loadBuilds = function (data, room) {
                    var _this = this;
                    this._totalCount++;
                    var metadata = { "room": room, "data": data };
                    var loader = new Loaders.ModelLoader(this._manager);
                    if (data.model)
                        loader.load(data.model, metadata, function (data, metadata) { return _this.onLoadBuild(data, metadata); });
                };
                HouseLoader.prototype.onLoadModel = function (object, data) {
                    var obj = object;
                    obj.scale.set(this.Scale, this.Scale, this.Scale);
                    var metadata = data.data;
                    obj.setMetadata(metadata);
                    obj.position.copy(metadata.position);
                    if (metadata.rotation) {
                        obj.rotation.x = metadata.rotation.x * Math.PI / 180;
                        obj.rotation.y = metadata.rotation.y * Math.PI / 180;
                        obj.rotation.z = metadata.rotation.z * Math.PI / 180;
                    }
                    this._modelStore.addModel(obj);
                    data.room.addObject(obj);
                    if (this._loadComplete) {
                        this._loadCount++;
                        if (this._loadCount == this._totalCount)
                            this._loadComplete();
                    }
                };
                HouseLoader.prototype.onLoadBuild = function (object, data) {
                    var scope = this;
                    var childCount = 0;
                    object.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            var objBuild = House3D.Models.ModelFactory.build(object.type);
                            var obj = objBuild;
                            var build = child.clone();
                            obj.uuid = child.uuid;
                            obj.add(build);
                            obj.scale.set(scope.Scale, scope.Scale, scope.Scale);
                            var metadata = data.data;
                            obj.setMetadata(metadata);
                            obj.position.copy(metadata.position);
                            if (metadata.rotation) {
                                obj.rotation.x = metadata.rotation.x * Math.PI / 180;
                                obj.rotation.y = metadata.rotation.y * Math.PI / 180;
                                obj.rotation.z = metadata.rotation.z * Math.PI / 180;
                            }
                            scope._modelStore.addModel(obj);
                            data.room.addObject(obj);
                            childCount++;
                            if (childCount == child.parent.children.length) {
                                if (scope._loadComplete) {
                                    scope._loadCount++;
                                    if (scope._loadCount == scope._totalCount) {
                                        scope._loadComplete();
                                    }
                                }
                            }
                        }
                    });
                };
                return HouseLoader;
            }());
            Loaders.HouseLoader = HouseLoader;
        })(Loaders = SceneEditor.Loaders || (SceneEditor.Loaders = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var HouseTypeData = (function () {
        function HouseTypeData() {
            this.id = "";
            this.uuid = THREE.Math.generateUUID();
        }
        HouseTypeData.prototype.copy = function (source, recursive) {
            this.uuid = source.uuid;
            this.id = source.id;
            return this;
        };
        HouseTypeData.prototype.clone = function (recursive) {
            var newObject = new HouseTypeData();
            newObject.copy(this, recursive);
            return newObject;
        };
        return HouseTypeData;
    }());
    House3D.HouseTypeData = HouseTypeData;
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Loaders;
        (function (Loaders) {
            var ItemGroupData = (function () {
                function ItemGroupData() {
                    this.itemList = [];
                }
                return ItemGroupData;
            }());
            var HouseData = (function () {
                function HouseData() {
                    this.buildList = [];
                    this.itemList = [];
                    this.groupList = [];
                }
                return HouseData;
            }());
            var HouseSave = (function () {
                function HouseSave() {
                }
                HouseSave.prototype.save = function (house) {
                    var houseDatas = new HouseData();
                    houseDatas.houseType = house.getMetadata();
                    this.saveBuild(house, houseDatas);
                    this.saveItem(house, houseDatas);
                    return houseDatas;
                };
                HouseSave.prototype.saveBuild = function (house, houseDatas) {
                    var builds = house.getAllBuilds();
                    for (var _i = 0, builds_1 = builds; _i < builds_1.length; _i++) {
                        var build = builds_1[_i];
                        var data = build.getMetadata();
                        if (data.materialId && data.materialId.length > 0)
                            houseDatas.buildList.push(data);
                    }
                };
                HouseSave.prototype.saveItem = function (house, houseDatas) {
                    var items = house.getAllItems();
                    for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
                        var item = items_5[_i];
                        if (item.type == "Item") {
                        }
                        else if (item.type == "ItemGroup") {
                            var group = item;
                            var groupData = new ItemGroupData();
                            groupData.group = group.getMetadata();
                            groupData.itemList = group.getChildrenMetadata();
                            houseDatas.groupList.push(groupData);
                        }
                        else {
                            var data = item.getMetadata();
                            houseDatas.itemList.push(data);
                        }
                    }
                };
                return HouseSave;
            }());
            Loaders.HouseSave = HouseSave;
        })(Loaders = SceneEditor.Loaders || (SceneEditor.Loaders = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Houses;
        (function (Houses) {
            var HouseScene = (function () {
                function HouseScene(scene, house) {
                    this._scene = scene;
                    this._house = house;
                    this._models = new House3D.Models.ModelStore(scene);
                    this.initEnvironment();
                }
                HouseScene.prototype.clear = function () {
                    if (this._house !== undefined) {
                        this._models.clear();
                        this._house.clear();
                    }
                };
                HouseScene.prototype.clearItem = function () {
                    if (this._house !== undefined) {
                        this._models.clearItem();
                        this._house.clearItem();
                    }
                };
                HouseScene.prototype.setHouseType = function (id, datas, loadComplete) {
                    this.clear();
                    var metadata = new House3D.HouseTypeData();
                    metadata.id = id;
                    this._house.setMetadata(metadata);
                    var loader = new SceneEditor.Loaders.HouseLoader();
                    loader.loadObj(datas, this._models, this._house, loadComplete);
                };
                HouseScene.prototype.setHouseTypeNew = function (id, loadComplete) {
                    var metadata = new House3D.HouseTypeData();
                    metadata.id = id;
                    this._house.setMetadata(metadata);
                    var light = new House3D.Models.Environments.PointLight();
                    this._models.add(light);
                };
                HouseScene.prototype.addItem = function (item) {
                    this._house.unDrag();
                    this._models.addModel(item);
                    this._house.addItem(item);
                };
                HouseScene.prototype.removeItem = function (item) {
                    this._house.unDrag();
                    this._models.removeById(item.getMetadata().uuid);
                    return this._house.removeItem(item.getMetadata().uuid);
                };
                HouseScene.prototype.addPreItem = function (item) {
                    this._house.unDrag();
                    this._house.preAddItem(item);
                };
                HouseScene.prototype.cancelItemAdd = function () {
                    this._house.cancelAddItem();
                };
                HouseScene.prototype.getJson = function () {
                    var save = new SceneEditor.Loaders.HouseSave();
                    return save.save(this._house);
                };
                HouseScene.prototype.addModel = function (item) {
                    this._models.addModel(item);
                };
                HouseScene.prototype.add = function (item) {
                    this._models.add(item);
                };
                HouseScene.prototype.getHouse = function () {
                    return this._house;
                };
                HouseScene.prototype.initEnvironment = function () {
                    var light = new House3D.Models.Environments.AmbientLight();
                    this._scene.add(light);
                    this._sun = new House3D.Models.Environments.Sun();
                    this._scene.add(this._sun);
                    this._sun.visible = false;
                    this._background = new House3D.Models.Environments.Background();
                    this._scene.add(this._background);
                };
                HouseScene.prototype.displayBackground = function () {
                    this._background.visible = true;
                };
                HouseScene.prototype.hiddenBackground = function () {
                    this._background.visible = false;
                };
                HouseScene.prototype.displayStorey = function (floor) {
                    this._house.displayStorey(floor);
                };
                HouseScene.prototype.itemDelete = function (data) {
                    this._house.unDrag();
                    this._models.removeById(data.uuid);
                    return this._house.removeItem(data.uuid);
                };
                HouseScene.prototype.itemModifyModel = function (data, newData) {
                    this._house.unDrag();
                    var scope = this;
                    var item = this._house.getItem(data.uuid);
                    if (item) {
                        this._models.removeById(data.uuid);
                        this._house.removeItem(data.uuid);
                        newData.setMetadata(data);
                        this._models.addModel(newData);
                        this._house.addItem(newData);
                    }
                };
                HouseScene.prototype.buildModifyColor = function (data, materialId, material) {
                    var build = this._house.getBuild(data.uuid);
                    if (build && material) {
                        build.modifyMaterial(materialId, material);
                    }
                };
                HouseScene.prototype.showSun = function () {
                    this._sun.visible = true;
                };
                HouseScene.prototype.hideSun = function () {
                    this._sun.visible = false;
                };
                HouseScene.prototype.combinationStart = function () {
                    this._house.combinationStart();
                };
                HouseScene.prototype.combinationCancel = function () {
                    this._house.combinationCancel();
                };
                HouseScene.prototype.combination = function () {
                    return this._house.combination(this._models);
                };
                HouseScene.prototype.separation = function () {
                    this._house.separation(this._models);
                };
                HouseScene.prototype.copyItem = function (metadata) {
                    var item = this._house.getItem(metadata.uuid);
                    if (!item)
                        return;
                    var newItem = item.clone();
                    newItem.unSelect();
                    var objbox = new THREE.Box3();
                    objbox.setFromObject(newItem);
                    newItem.position.x += objbox.getSize().x;
                    this.addItem(newItem);
                };
                return HouseScene;
            }());
            Houses.HouseScene = HouseScene;
        })(Houses = SceneEditor.Houses || (SceneEditor.Houses = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Controls;
        (function (Controls) {
            var ViewControls = (function () {
                function ViewControls(house, domElement) {
                    this._mouse = new THREE.Vector2();
                    this._house = house;
                    this._domElement = domElement;
                    this.registerEvents();
                }
                ViewControls.prototype.handMove = function (event) {
                    if (Math.abs(this._mouse.x - event.screenX) > 1 ||
                        Math.abs(this._mouse.y - event.screenY) > 1)
                        this._house.angleView();
                };
                ViewControls.prototype.handleMouseWheel = function (event) {
                    this._house.mouseWheel();
                };
                ViewControls.prototype.onMouseDownEvent = function (event) {
                    this._mouse.x = event.screenX;
                    this._mouse.y = event.screenY;
                };
                ViewControls.prototype.onMouseMoveEvent = function (event) {
                    if (event.buttons == 1 || event.buttons == 2) {
                        this.handMove(event);
                    }
                };
                ViewControls.prototype.onTouchStartEvent = function (event) {
                    this._mouse.x = event.touches[0].screenX;
                    this._mouse.y = event.touches[0].screenY;
                };
                ViewControls.prototype.onTouchMoveEvent = function (event) {
                    switch (event.touches.length) {
                        case 1:
                            this.handMove(event.touches[0]);
                            break;
                        default:
                            break;
                    }
                };
                ViewControls.prototype.onMouseWheelEvent = function (event) {
                    this.handleMouseWheel(event);
                };
                ViewControls.prototype.unregisteredEvents = function () {
                    this._domElement.removeEventListener('mousedown', this.onMouseDownEvent, false);
                    this._domElement.removeEventListener('mousemove', this.onMouseMoveEvent, false);
                    this._domElement.removeEventListener('wheel', this.onMouseWheelEvent, false);
                    this._domElement.removeEventListener('touchstart', this.onTouchStartEvent, false);
                    this._domElement.removeEventListener('touchmove', this.onTouchMoveEvent, false);
                };
                ViewControls.prototype.registerEvents = function () {
                    var _this = this;
                    this._domElement.addEventListener('mousedown', function (ev) { return _this.onMouseDownEvent(ev); }, false);
                    this._domElement.addEventListener('mousemove', function (ev) { return _this.onMouseMoveEvent(ev); }, false);
                    this._domElement.addEventListener('wheel', function (ev) { return _this.onMouseWheelEvent(ev); }, false);
                    this._domElement.addEventListener('touchstart', function (ev) { return _this.onTouchStartEvent(ev); }, false);
                    this._domElement.addEventListener('touchmove', function (ev) { return _this.onTouchMoveEvent(ev); }, false);
                };
                return ViewControls;
            }());
            Controls.ViewControls = ViewControls;
        })(Controls = SceneEditor.Controls || (SceneEditor.Controls = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Controls;
    (function (Controls) {
        var EventControls = (function () {
            function EventControls() {
                this.stopPropagation = true;
                this._handEvent = false;
                this._enabled = true;
            }
            EventControls.prototype.onMouseDownEvent = function (event) {
            };
            EventControls.prototype.onMouseMoveEvent = function (event) {
            };
            EventControls.prototype.onMouseUpEvent = function (event) {
            };
            EventControls.prototype.onMouseWheelEvent = function (event) {
            };
            EventControls.prototype.onMouseOutEvent = function (event) {
            };
            EventControls.prototype.onTouchStartEvent = function (event) {
            };
            EventControls.prototype.onTouchEndEvent = function (event) {
            };
            EventControls.prototype.onTouchMoveEvent = function (event) {
            };
            EventControls.prototype.onTouchCancelEvent = function (event) {
            };
            EventControls.prototype.onTouchLeaveEvent = function (event) {
            };
            EventControls.prototype.onKeyDownEvent = function (event) {
            };
            EventControls.prototype.onKeyUpEvent = function (event) {
            };
            EventControls.prototype.onBlurEvent = function (event) {
            };
            EventControls.prototype.onContextMenuEvent = function (event) {
                event.preventDefault();
            };
            EventControls.prototype.captureEvent = function () {
                this._handEvent = true;
            };
            EventControls.prototype.releaseEvent = function () {
                this._handEvent = false;
            };
            EventControls.prototype.isCapture = function () {
                return this._handEvent;
            };
            EventControls.prototype.unable = function () {
                this._enabled = false;
            };
            EventControls.prototype.enable = function () {
                this._enabled = true;
            };
            EventControls.prototype.isEnable = function () {
                return this._enabled;
            };
            return EventControls;
        }());
        Controls.EventControls = EventControls;
    })(Controls = House3D.Controls || (House3D.Controls = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Transform = (function () {
        function Transform(domElement, camera) {
            this._domElement = domElement;
            this._camera = camera;
        }
        Transform.prototype.changeCamera = function (camera) {
            this._camera = camera;
        };
        Transform.prototype.worldToScreen = function (worldPos) {
            var rect = this._domElement.getBoundingClientRect();
            var windowHalfX = rect.width / 2;
            var windowHalfY = rect.height / 2;
            var screenPos = worldPos.clone();
            screenPos.project(this._camera);
            screenPos.x = Math.round((screenPos.x + 1) * windowHalfX);
            screenPos.y = Math.round((-screenPos.y + 1) * windowHalfY);
            screenPos.z = 0;
            return screenPos;
        };
        Transform.prototype.intersectObjects = function (pos, objects) {
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(pos, this._camera);
            return raycaster.intersectObjects(objects);
        };
        return Transform;
    }());
    House3D.Transform = Transform;
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var Controls;
        (function (Controls) {
            var DragItemControls = (function () {
                function DragItemControls(transform, domElement) {
                    this._mouse = new THREE.Vector2();
                    this._enabled = false;
                    this._transform = transform;
                    this._domElement = (domElement !== undefined) ? domElement : document;
                    this.unable();
                    this.registerEvents();
                }
                DragItemControls.prototype.setHouse = function (house) {
                    this._house = house;
                };
                DragItemControls.prototype.calcMouse = function (event) {
                    var rect = this._domElement.getBoundingClientRect();
                    this._mouse.x = event.clientX;
                    this._mouse.y = event.clientY;
                    this._mouse.x = ((this._mouse.x - rect.left) / rect.width) * 2 - 1;
                    this._mouse.y = -((this._mouse.y - rect.top) / rect.height) * 2 + 1;
                };
                DragItemControls.prototype.handMove = function (event) {
                    var newItem = this._house.getHouse().getPreAddItem();
                    var item = newItem;
                    if (item)
                        this._select = item;
                    else
                        item = this._select;
                    if (!item)
                        return;
                    this.calcMouse(event);
                    var placeMeshes = this._house.getHouse().getPlaceMeshes(item.children[0]);
                    if (placeMeshes.length == 0)
                        return;
                    var intersects = this._transform.intersectObjects(this._mouse, placeMeshes);
                    if (intersects.length > 0) {
                        var intersect = intersects[0];
                        if (newItem) {
                            item.visible = false;
                            this._house.addItem(item);
                            if (item.dragging(intersect)) {
                                item.visible = true;
                                this._house.getHouse().cancelAddItem();
                            }
                            else {
                                this._house.removeItem(item);
                            }
                        }
                        else
                            item.dragging(intersect);
                        this._domElement.style.cursor = 'move';
                    }
                };
                DragItemControls.prototype.handMoveUp = function (event) {
                    this._house.getHouse().dragEnd();
                    this.unable();
                    this._select = undefined;
                    this._domElement.style.cursor = 'auto';
                };
                DragItemControls.prototype.onMouseMoveEvent = function (event) {
                    if (this._enabled === false)
                        return;
                    event.preventDefault();
                    event.stopPropagation();
                    if (event.buttons == 1 || event.buttons == 2) {
                        this.handMove(event);
                    }
                };
                DragItemControls.prototype.onMouseUpEvent = function (event) {
                    if (this._enabled === false)
                        return;
                    event.preventDefault();
                    event.stopPropagation();
                    this.handMoveUp(event);
                };
                DragItemControls.prototype.onTouchMoveEvent = function (event) {
                    if (this._enabled === false)
                        return;
                    event.preventDefault();
                    event.stopPropagation();
                    switch (event.touches.length) {
                        case 1:
                            this.handMove(event.touches[0]);
                            break;
                        default:
                            break;
                    }
                };
                DragItemControls.prototype.onTouchEndEvent = function (event) {
                    if (this._enabled === false)
                        return;
                    event.preventDefault();
                    event.stopPropagation();
                    this.handMoveUp(event.touches[0]);
                };
                DragItemControls.prototype.enable = function () {
                    this._enabled = true;
                };
                DragItemControls.prototype.unable = function () {
                    this._enabled = false;
                };
                DragItemControls.prototype.registerEvents = function () {
                    var _this = this;
                    document.addEventListener('mousemove', function (ev) { return _this.onMouseMoveEvent(ev); }, false);
                    document.addEventListener('mouseup', function (ev) { return _this.onMouseUpEvent(ev); }, false);
                    document.addEventListener('touchmove', function (ev) { return _this.onTouchMoveEvent(ev); }, false);
                    document.addEventListener('touchend', function (ev) { return _this.onTouchEndEvent(ev); }, false);
                };
                return DragItemControls;
            }());
            Controls.DragItemControls = DragItemControls;
        })(Controls = SceneEditor.Controls || (SceneEditor.Controls = {}));
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Controls;
    (function (Controls) {
        var EventMonitor = (function () {
            function EventMonitor(domElement) {
                this._eventControls = [];
                this._domElement = domElement;
                this.registerEvents();
            }
            EventMonitor.prototype.addEventListener = function (control) {
                this._eventControls.push(control);
            };
            EventMonitor.prototype.onMouseDown = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onMouseDownEvent(event);
                    if (ev.stopPropagation && ev.isCapture()) {
                        break;
                    }
                }
            };
            EventMonitor.prototype.onMouseMove = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    if (ev.isCapture()) {
                        ev.onMouseMoveEvent(event);
                        break;
                    }
                }
            };
            EventMonitor.prototype.onMouseUp = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onMouseUpEvent(event);
                }
            };
            EventMonitor.prototype.onMouseWheel = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onMouseWheelEvent(event);
                    if (ev.stopPropagation && ev.isCapture()) {
                        break;
                    }
                }
            };
            EventMonitor.prototype.onMouseOut = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onMouseOutEvent(event);
                }
            };
            EventMonitor.prototype.onTouchStart = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onTouchStartEvent(event);
                    if (ev.stopPropagation && ev.isCapture()) {
                        break;
                    }
                }
            };
            EventMonitor.prototype.onTouchMove = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    if (ev.isCapture())
                        ev.onTouchMoveEvent(event);
                }
            };
            EventMonitor.prototype.onTouchEnd = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onTouchEndEvent(event);
                }
            };
            EventMonitor.prototype.onTouchCancel = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onTouchCancelEvent(event);
                }
            };
            EventMonitor.prototype.onTouchLeave = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onTouchLeaveEvent(event);
                }
            };
            EventMonitor.prototype.onKeyDown = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onKeyDownEvent(event);
                    if (ev.stopPropagation && ev.isCapture()) {
                        break;
                    }
                }
            };
            EventMonitor.prototype.onKeyUp = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onKeyUpEvent(event);
                }
            };
            EventMonitor.prototype.onBlur = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onBlurEvent(event);
                }
            };
            EventMonitor.prototype.onContextMenu = function (event) {
                for (var _i = 0, _a = this._eventControls; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    if (!ev.isEnable())
                        continue;
                    ev.onContextMenuEvent(event);
                    if (ev.stopPropagation && ev.isCapture()) {
                        break;
                    }
                }
            };
            EventMonitor.prototype.unregisteredEvents = function () {
                this._domElement.removeEventListener('mousedown', this.onMouseDown, false);
                this._domElement.removeEventListener('mousemove', this.onMouseMove, false);
                document.removeEventListener('mouseup', this.onMouseUp, false);
                this._domElement.removeEventListener('wheel', this.onMouseWheel, false);
                document.removeEventListener("mouseout", this.onMouseOut, false);
                this._domElement.removeEventListener('touchstart', this.onTouchStart, false);
                this._domElement.removeEventListener('touchmove', this.onTouchMove, false);
                document.removeEventListener('touchend', this.onTouchEnd, false);
                document.removeEventListener("touchcancel", this.onTouchCancel, false);
                document.removeEventListener("touchleave", this.onTouchLeave, false);
                this._domElement.removeEventListener('blur', this.onBlur, false);
                this._domElement.removeEventListener('contextmenu', this.onContextMenu, false);
            };
            EventMonitor.prototype.registerEvents = function () {
                var _this = this;
                this._domElement.addEventListener('mousedown', function (ev) { return _this.onMouseDown(ev); }, false);
                this._domElement.addEventListener('mousemove', function (ev) { return _this.onMouseMove(ev); }, false);
                document.addEventListener('mouseup', function (ev) { return _this.onMouseUp(ev); }, false);
                this._domElement.addEventListener('wheel', function (ev) { return _this.onMouseWheel(ev); }, false);
                document.addEventListener("mouseout", function (ev) { return _this.onMouseOut(ev); }, false);
                this._domElement.addEventListener('touchstart', function (ev) { return _this.onTouchStart(ev); }, false);
                this._domElement.addEventListener('touchmove', function (ev) { return _this.onTouchMove(ev); }, false);
                document.addEventListener('touchend', function (ev) { return _this.onTouchEnd(ev); }, false);
                document.addEventListener("touchcancel", function (ev) { return _this.onTouchCancel(ev); }, false);
                document.addEventListener("touchleave", function (ev) { return _this.onTouchLeave(ev); }, false);
                this._domElement.addEventListener('blur', function (ev) { return _this.onBlur(ev); }, false);
                this._domElement.addEventListener('contextmenu', function (ev) { return _this.onContextMenu(ev); }, false);
            };
            EventMonitor.prototype.dispose = function () {
                this.unregisteredEvents();
            };
            return EventMonitor;
        }());
        Controls.EventMonitor = EventMonitor;
    })(Controls = House3D.Controls || (House3D.Controls = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Controls;
    (function (Controls) {
        var OrbitControls = (function (_super) {
            __extends(OrbitControls, _super);
            function OrbitControls(camera, domElement) {
                var _this = _super.call(this) || this;
                _this.target = new THREE.Vector3();
                _this.minDistance = 200;
                _this.maxDistance = 2000;
                _this.minZoom = 0;
                _this.maxZoom = Infinity;
                _this.minPolarAngle = 0;
                _this.maxPolarAngle = Math.PI / 2 - 0.01;
                _this.minAzimuthAngle = -Infinity;
                _this.maxAzimuthAngle = Infinity;
                _this.enableDamping = false;
                _this.dampingFactor = 0.25;
                _this.enableZoom = true;
                _this.zoomSpeed = 1.0;
                _this.enableRotate = true;
                _this.rotateSpeed = 1.0;
                _this.enablePan = true;
                _this.keyPanSpeed = 7.0;
                _this.autoRotate = false;
                _this.autoRotateSpeed = 2.0;
                _this.enableKeys = true;
                _this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
                _this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
                _this.changeEvent = { type: 'change' };
                _this.startEvent = { type: 'start' };
                _this.endEvent = { type: 'end' };
                _this.STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };
                _this.state = _this.STATE.NONE;
                _this.EPS = 0.000001;
                _this.spherical = new THREE.Spherical();
                _this.sphericalDelta = new THREE.Spherical();
                _this.scale = 1;
                _this.panOffset = new THREE.Vector3();
                _this.zoomChanged = false;
                _this.rotateStart = new THREE.Vector2();
                _this.rotateEnd = new THREE.Vector2();
                _this.rotateDelta = new THREE.Vector2();
                _this.panStart = new THREE.Vector2();
                _this.panEnd = new THREE.Vector2();
                _this.panDelta = new THREE.Vector2();
                _this.dollyStart = new THREE.Vector2();
                _this.dollyEnd = new THREE.Vector2();
                _this.dollyDelta = new THREE.Vector2();
                _this.touchDistance = 0;
                _this._object = camera;
                _this._domElement = (domElement !== undefined) ? domElement : document;
                _this.target0 = _this.target.clone();
                _this.position0 = _this._object.position.clone();
                _this.zoom0 = _this._object.zoom;
                _this.update();
                return _this;
            }
            OrbitControls.prototype.getPolarAngle = function () {
                return this.spherical.phi;
            };
            OrbitControls.prototype.getAzimuthalAngle = function () {
                return this.spherical.theta;
            };
            OrbitControls.prototype.saveState = function () {
                this.target0.copy(this.target);
                this.position0.copy(this._object.position);
                this.zoom0 = this._object.zoom;
            };
            OrbitControls.prototype.reset = function () {
                this.target.copy(this.target0);
                this._object.position.copy(this.position0);
                this._object.zoom = this.zoom0;
                this._object.updateProjectionMatrix();
                this.update();
                this.state = this.STATE.NONE;
            };
            OrbitControls.prototype.update = function () {
                var offset = new THREE.Vector3();
                var quat = new THREE.Quaternion().setFromUnitVectors(this._object.up, new THREE.Vector3(0, 1, 0));
                var quatInverse = quat.clone().inverse();
                var lastPosition = new THREE.Vector3();
                var lastQuaternion = new THREE.Quaternion();
                var position = this._object.position;
                offset.copy(position).sub(this.target);
                offset.applyQuaternion(quat);
                this.spherical.setFromVector3(offset);
                if (this.autoRotate && this.state === this.STATE.NONE) {
                    this.rotateLeft(this.getAutoRotationAngle());
                }
                this.spherical.theta += this.sphericalDelta.theta;
                this.spherical.phi += this.sphericalDelta.phi;
                this.spherical.theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, this.spherical.theta));
                this.spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.spherical.phi));
                this.spherical.makeSafe();
                this.spherical.radius *= this.scale;
                this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius));
                this.target.add(this.panOffset);
                offset.setFromSpherical(this.spherical);
                offset.applyQuaternion(quatInverse);
                position.copy(this.target).add(offset);
                this._object.lookAt(this.target);
                if (this.enableDamping === true) {
                    this.sphericalDelta.theta *= (1 - this.dampingFactor);
                    this.sphericalDelta.phi *= (1 - this.dampingFactor);
                }
                else {
                    this.sphericalDelta.set(0, 0, 0);
                }
                this.scale = 1;
                this.panOffset.set(0, 0, 0);
                if (this.zoomChanged ||
                    lastPosition.distanceToSquared(this._object.position) > this.EPS ||
                    8 * (1 - lastQuaternion.dot(this._object.quaternion)) > this.EPS) {
                    lastPosition.copy(this._object.position);
                    lastQuaternion.copy(this._object.quaternion);
                    this.zoomChanged = false;
                    return true;
                }
                return false;
            };
            OrbitControls.prototype.getAutoRotationAngle = function () {
                return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
            };
            OrbitControls.prototype.getZoomScale = function () {
                return Math.pow(0.95, this.zoomSpeed);
            };
            OrbitControls.prototype.rotateLeft = function (angle) {
                this.sphericalDelta.theta -= angle;
            };
            OrbitControls.prototype.rotateUp = function (angle) {
                this.sphericalDelta.phi -= angle;
            };
            OrbitControls.prototype.panLeft = function (distance, objectMatrix) {
                var v = new THREE.Vector3();
                v.setFromMatrixColumn(objectMatrix, 0);
                v.multiplyScalar(-distance);
                this.panOffset.add(v);
            };
            OrbitControls.prototype.panUp = function (distance, objectMatrix) {
                var v = new THREE.Vector3();
                v.setFromMatrixColumn(objectMatrix, 1);
                v.multiplyScalar(distance);
                this.panOffset.add(v);
            };
            OrbitControls.prototype.pan = function (deltaX, deltaY) {
                var offset = new THREE.Vector3();
                var element = this._domElement === document ? this._domElement.body : this._domElement;
                if (this._object instanceof THREE.PerspectiveCamera) {
                    var position = this._object.position;
                    offset.copy(position).sub(this.target);
                    var targetDistance = offset.length();
                    targetDistance *= Math.tan((this._object.fov / 2) * Math.PI / 180.0);
                    this.panLeft(2 * deltaX * targetDistance / element.clientHeight, this._object.matrix);
                    this.panUp(2 * deltaY * targetDistance / element.clientHeight, this._object.matrix);
                }
                else if (this._object instanceof THREE.OrthographicCamera) {
                    this.panLeft(deltaX * (this._object.right - this._object.left) / this._object.zoom / element.clientWidth, this._object.matrix);
                    this.panUp(deltaY * (this._object.top - this._object.bottom) / this._object.zoom / element.clientHeight, this._object.matrix);
                }
                else {
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
                    this.enablePan = false;
                }
            };
            OrbitControls.prototype.dollyIn = function (dollyScale) {
                if (this._object instanceof THREE.PerspectiveCamera) {
                    this.scale /= dollyScale;
                }
                else if (this._object instanceof THREE.OrthographicCamera) {
                    this._object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this._object.zoom * dollyScale));
                    this._object.updateProjectionMatrix();
                    this.zoomChanged = true;
                }
                else {
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                    this.enableZoom = false;
                }
            };
            OrbitControls.prototype.dollyOut = function (dollyScale) {
                if (this._object instanceof THREE.PerspectiveCamera) {
                    this.scale *= dollyScale;
                }
                else if (this._object instanceof THREE.OrthographicCamera) {
                    this._object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this._object.zoom / dollyScale));
                    this._object.updateProjectionMatrix();
                    this.zoomChanged = true;
                }
                else {
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                    this.enableZoom = false;
                }
            };
            OrbitControls.prototype.handleMouseDownRotate = function (event) {
                this.rotateStart.set(event.clientX, event.clientY);
            };
            OrbitControls.prototype.handleMouseDownDolly = function (event) {
                this.dollyStart.set(event.clientX, event.clientY);
            };
            OrbitControls.prototype.handleMouseDownPan = function (event) {
                this.panStart.set(event.clientX, event.clientY);
            };
            OrbitControls.prototype.handleMouseMoveRotate = function (event) {
                this.rotateEnd.set(event.clientX, event.clientY);
                this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
                var element = this._domElement === document ? this._domElement.body : this._domElement;
                this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientWidth * this.rotateSpeed);
                this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight * this.rotateSpeed);
                this.rotateStart.copy(this.rotateEnd);
                this.update();
            };
            OrbitControls.prototype.handleMouseMoveDolly = function (event) {
                this.dollyEnd.set(event.clientX, event.clientY);
                this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
                if (this.dollyDelta.y > 0) {
                    this.dollyIn(this.getZoomScale());
                }
                else if (this.dollyDelta.y < 0) {
                    this.dollyOut(this.getZoomScale());
                }
                this.dollyStart.copy(this.dollyEnd);
                this.update();
            };
            OrbitControls.prototype.handleMouseMovePan = function (event) {
                this.panEnd.set(event.clientX, event.clientY);
                this.panDelta.subVectors(this.panEnd, this.panStart);
                this.pan(this.panDelta.x, this.panDelta.y);
                this.panStart.copy(this.panEnd);
                this.update();
            };
            OrbitControls.prototype.handleMouseUp = function (event) {
            };
            OrbitControls.prototype.handleMouseWheel = function (event) {
                if (event.deltaY < 0) {
                    this.dollyOut(this.getZoomScale());
                }
                else if (event.deltaY > 0) {
                    this.dollyIn(this.getZoomScale());
                }
                this.update();
            };
            OrbitControls.prototype.handleKeyDown = function (event) {
                switch (event.keyCode) {
                    case this.keys.UP:
                        this.pan(0, this.keyPanSpeed);
                        this.update();
                        break;
                    case this.keys.BOTTOM:
                        this.pan(0, -this.keyPanSpeed);
                        this.update();
                        break;
                    case this.keys.LEFT:
                        this.pan(this.keyPanSpeed, 0);
                        this.update();
                        break;
                    case this.keys.RIGHT:
                        this.pan(-this.keyPanSpeed, 0);
                        this.update();
                        break;
                }
            };
            OrbitControls.prototype.handleTouchStartRotate = function (event) {
                this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
            };
            OrbitControls.prototype.handleTouchStartDolly = function (event) {
                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                this.touchDistance = distance;
                this.dollyStart.set(0, distance);
            };
            OrbitControls.prototype.handleTouchStartPan = function (event) {
                this.panStart.set(event.touches[0].pageX, event.touches[0].pageY);
            };
            OrbitControls.prototype.handleTouchMoveRotate = function (event) {
                this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
                var element = this._domElement === document ? this._domElement.body : this._domElement;
                this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientWidth * this.rotateSpeed);
                this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight * this.rotateSpeed);
                this.rotateStart.copy(this.rotateEnd);
                this.update();
            };
            OrbitControls.prototype.handleTouchMoveDolly = function (event) {
                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                var diff = Math.abs(this.touchDistance - distance);
                this.touchDistance = distance;
                if (diff < 10) {
                    this.state = this.STATE.TOUCH_PAN;
                    return;
                }
                this.dollyEnd.set(0, distance);
                this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
                if (this.dollyDelta.y > 0) {
                    this.dollyOut(this.getZoomScale());
                }
                else if (this.dollyDelta.y < 0) {
                    this.dollyIn(this.getZoomScale());
                }
                this.dollyStart.copy(this.dollyEnd);
                this.update();
            };
            OrbitControls.prototype.handleTouchMovePan = function (event) {
                this.panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                this.panDelta.subVectors(this.panEnd, this.panStart);
                this.pan(this.panDelta.x, this.panDelta.y);
                this.panStart.copy(this.panEnd);
                this.update();
            };
            OrbitControls.prototype.handleTouchEnd = function (event) {
            };
            OrbitControls.prototype.onMouseDownEvent = function (event) {
                if (this._enabled === false)
                    return;
                event.preventDefault();
                this.captureEvent();
                switch (event.button) {
                    case this.mouseButtons.ORBIT:
                        if (this.enableRotate === false)
                            return;
                        this.handleMouseDownRotate(event);
                        this.state = this.STATE.ROTATE;
                        break;
                    case this.mouseButtons.ZOOM:
                        if (this.enableZoom === false)
                            return;
                        this.handleMouseDownDolly(event);
                        this.state = this.STATE.DOLLY;
                        break;
                    case this.mouseButtons.PAN:
                        if (this.enablePan === false)
                            return;
                        this.handleMouseDownPan(event);
                        this.state = this.STATE.PAN;
                        break;
                }
            };
            OrbitControls.prototype.onMouseMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                switch (this.state) {
                    case this.STATE.ROTATE:
                        if (this.enableRotate === false)
                            return;
                        this.handleMouseMoveRotate(event);
                        break;
                    case this.STATE.DOLLY:
                        if (this.enableZoom === false)
                            return;
                        this.handleMouseMoveDolly(event);
                        break;
                    case this.STATE.PAN:
                        if (this.enablePan === false)
                            return;
                        this.handleMouseMovePan(event);
                        break;
                }
            };
            OrbitControls.prototype.onMouseUpEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                this.handleMouseUp(event);
                this.releaseEvent();
                this.state = this.STATE.NONE;
            };
            OrbitControls.prototype.onMouseWheelEvent = function (event) {
                if (this._enabled === false || this.enableZoom === false || (this.state !== this.STATE.NONE && this.state !== this.STATE.ROTATE))
                    return false;
                event.preventDefault();
                this.handleMouseWheel(event);
            };
            OrbitControls.prototype.onKeyDownEvent = function (event) {
                if (this._enabled === false || this.enableKeys === false || this.enablePan === false)
                    return;
                this.handleKeyDown(event);
            };
            OrbitControls.prototype.onTouchStartEvent = function (event) {
                if (this._enabled === false)
                    return;
                this.captureEvent();
                switch (event.touches.length) {
                    case 1:
                        if (this.enableRotate === false)
                            return;
                        this.handleTouchStartRotate(event);
                        this.state = this.STATE.TOUCH_ROTATE;
                        break;
                    case 2:
                        if (this.enableZoom === false)
                            return;
                        this.handleTouchStartDolly(event);
                        this.state = this.STATE.TOUCH_DOLLY;
                        if (this.enablePan === false)
                            return;
                        this.handleTouchStartPan(event);
                        break;
                    default:
                        this.state = this.STATE.NONE;
                }
            };
            OrbitControls.prototype.onTouchMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                switch (event.touches.length) {
                    case 1:
                        if (this.enableRotate === false)
                            return;
                        if (this.state !== this.STATE.TOUCH_ROTATE)
                            return;
                        this.handleTouchMoveRotate(event);
                        break;
                    case 2:
                        if (this.enableZoom === false)
                            return;
                        this.handleTouchMoveDolly(event);
                        if (this.state === this.STATE.TOUCH_PAN)
                            this.handleTouchMovePan(event);
                        break;
                    default:
                        this.state = this.STATE.NONE;
                }
            };
            OrbitControls.prototype.onTouchEndEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                this.handleTouchEnd(event);
                this.releaseEvent();
                this.state = this.STATE.NONE;
            };
            return OrbitControls;
        }(Controls.EventControls));
        Controls.OrbitControls = OrbitControls;
    })(Controls = House3D.Controls || (House3D.Controls = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Controls;
    (function (Controls) {
        var TopViewControls = (function (_super) {
            __extends(TopViewControls, _super);
            function TopViewControls(camera, domElement) {
                var _this = _super.call(this) || this;
                _this.target = new THREE.Vector3();
                _this.minZoom = 0.5;
                _this.maxZoom = 2;
                _this.enableZoom = true;
                _this.zoomSpeed = 1.0;
                _this.enablePan = true;
                _this.keyPanSpeed = 7.0;
                _this.MouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
                _this.touchDistance = 0;
                _this.changeEvent = { type: 'change' };
                _this.startEvent = { type: 'start' };
                _this.endEvent = { type: 'end' };
                _this.STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };
                _this.state = _this.STATE.NONE;
                _this.EPS = 0.000001;
                _this.spherical = new THREE.Spherical();
                _this.sphericalDelta = new THREE.Spherical();
                _this.scale = 1;
                _this.panOffset = new THREE.Vector3();
                _this.zoomChanged = false;
                _this.panStart = new THREE.Vector2();
                _this.panEnd = new THREE.Vector2();
                _this.panDelta = new THREE.Vector2();
                _this.dollyStart = new THREE.Vector2();
                _this.dollyEnd = new THREE.Vector2();
                _this.dollyDelta = new THREE.Vector2();
                _this._object = camera;
                _this._domElement = (domElement !== undefined) ? domElement : document;
                _this.target0 = _this.target.clone();
                _this.position0 = _this._object.position.clone();
                _this.zoom0 = _this._object.zoom;
                _this.update();
                return _this;
            }
            TopViewControls.prototype.saveState = function () {
                this.target0.copy(this.target);
                this.position0.copy(this._object.position);
                this.zoom0 = this._object.zoom;
            };
            ;
            TopViewControls.prototype.reset = function () {
                this.target.copy(this.target0);
                this._object.position.copy(this.position0);
                this._object.zoom = this.zoom0;
                this._object.updateProjectionMatrix();
                this.update();
                this.state = this.STATE.NONE;
            };
            ;
            TopViewControls.prototype.update = function () {
                var offset = new THREE.Vector3();
                var position = this._object.position;
                offset.copy(position).sub(this.target);
                this.spherical.setFromVector3(offset);
                this.target.add(this.panOffset);
                this.target.y = 0;
                position.copy(this.target).add(offset);
                this._object.lookAt(this.target);
                this.scale = 1;
                this.panOffset.set(0, 0, 0);
                return true;
            };
            ;
            TopViewControls.prototype.getZoomScale = function () {
                return Math.pow(0.95, this.zoomSpeed);
            };
            TopViewControls.prototype.panLeft = function (distance, objectMatrix) {
                var v = new THREE.Vector3();
                v.setFromMatrixColumn(objectMatrix, 0);
                v.multiplyScalar(-distance);
                this.panOffset.add(v);
            };
            TopViewControls.prototype.panUp = function (distance, objectMatrix) {
                var v = new THREE.Vector3();
                v.setFromMatrixColumn(objectMatrix, 1);
                v.multiplyScalar(distance);
                this.panOffset.add(v);
            };
            TopViewControls.prototype.pan = function (deltaX, deltaY) {
                var offset = new THREE.Vector3();
                var element = this._domElement === document ? this._domElement.body : this._domElement;
                if (this._object instanceof THREE.PerspectiveCamera) {
                    var position = this._object.position;
                    offset.copy(position).sub(this.target);
                    var targetDistance = offset.length();
                    targetDistance *= Math.tan((this._object.fov / 2) * Math.PI / 180.0);
                    this.panLeft(2 * deltaX * targetDistance / element.clientHeight, this._object.matrix);
                    this.panUp(2 * deltaY * targetDistance / element.clientHeight, this._object.matrix);
                }
                else if (this._object instanceof THREE.OrthographicCamera) {
                    this.panLeft(deltaX * (this._object.right - this._object.left) / this._object.zoom / element.clientWidth, this._object.matrix);
                    this.panUp(deltaY * (this._object.top - this._object.bottom) / this._object.zoom / element.clientHeight, this._object.matrix);
                }
                else {
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
                    this.enablePan = false;
                }
            };
            TopViewControls.prototype.dollyIn = function (dollyScale) {
                if (this._object instanceof THREE.OrthographicCamera) {
                    this._object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this._object.zoom * dollyScale));
                    this._object.updateProjectionMatrix();
                    this.zoomChanged = true;
                }
                else {
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                    this.enableZoom = false;
                }
            };
            TopViewControls.prototype.dollyOut = function (dollyScale) {
                if (this._object instanceof THREE.OrthographicCamera) {
                    this._object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this._object.zoom / dollyScale));
                    this._object.updateProjectionMatrix();
                    this.zoomChanged = true;
                }
                else {
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                    this.enableZoom = false;
                }
            };
            TopViewControls.prototype.handleMouseDownDolly = function (event) {
                this.dollyStart.set(event.clientX, event.clientY);
            };
            TopViewControls.prototype.handleMouseDownPan = function (event) {
                this.panStart.set(event.clientX, event.clientY);
            };
            TopViewControls.prototype.handleMouseMoveDolly = function (event) {
                this.dollyEnd.set(event.clientX, event.clientY);
                this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
                if (this.dollyDelta.y > 0) {
                    this.dollyIn(this.getZoomScale());
                }
                else if (this.dollyDelta.y < 0) {
                    this.dollyOut(this.getZoomScale());
                }
                this.dollyStart.copy(this.dollyEnd);
                this.update();
            };
            TopViewControls.prototype.handleMouseMovePan = function (event) {
                this.panEnd.set(event.clientX, event.clientY);
                this.panDelta.subVectors(this.panEnd, this.panStart);
                this.pan(this.panDelta.x, this.panDelta.y);
                this.panStart.copy(this.panEnd);
                this.update();
            };
            TopViewControls.prototype.handleMouseUp = function (event) {
            };
            TopViewControls.prototype.handleMouseWheel = function (event) {
                if (event.deltaY < 0) {
                    this.dollyOut(this.getZoomScale());
                }
                else if (event.deltaY > 0) {
                    this.dollyIn(this.getZoomScale());
                }
                this.update();
            };
            TopViewControls.prototype.handleTouchStartDolly = function (event) {
                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                this.dollyStart.set(0, distance);
            };
            TopViewControls.prototype.handleTouchStartPan = function (event) {
                this.panStart.set(event.touches[0].pageX, event.touches[0].pageY);
            };
            TopViewControls.prototype.handleTouchMoveDolly = function (event) {
                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                this.dollyEnd.set(0, distance);
                this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
                if (this.dollyDelta.y > 0) {
                    this.dollyOut(this.getZoomScale());
                }
                else if (this.dollyDelta.y < 0) {
                    this.dollyIn(this.getZoomScale());
                }
                this.dollyStart.copy(this.dollyEnd);
                this.update();
            };
            TopViewControls.prototype.handleTouchMovePan = function (event) {
                this.panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                this.panDelta.subVectors(this.panEnd, this.panStart);
                this.pan(this.panDelta.x, this.panDelta.y);
                this.panStart.copy(this.panEnd);
                this.update();
            };
            TopViewControls.prototype.handleTouchEnd = function (event) {
            };
            TopViewControls.prototype.onMouseDownEvent = function (event) {
                if (this._enabled === false)
                    return;
                event.preventDefault();
                this.captureEvent();
                switch (event.button) {
                    case this.MouseButtons.ZOOM:
                        if (this.enableZoom === false)
                            return;
                        this.handleMouseDownDolly(event);
                        this.state = this.STATE.DOLLY;
                        break;
                    case this.STATE.ROTATE:
                    case this.MouseButtons.PAN:
                        if (this.enablePan === false)
                            return;
                        this.handleMouseDownPan(event);
                        this.state = this.STATE.PAN;
                        break;
                }
            };
            TopViewControls.prototype.onMouseMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                switch (this.state) {
                    case this.STATE.DOLLY:
                        if (this.enableZoom === false)
                            return;
                        this.handleMouseMoveDolly(event);
                        break;
                    case this.STATE.ROTATE:
                    case this.STATE.PAN:
                        if (this.enablePan === false)
                            return;
                        this.handleMouseMovePan(event);
                        break;
                }
            };
            TopViewControls.prototype.onMouseUpEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.handleMouseUp(event);
                this.releaseEvent();
                this.state = this.STATE.NONE;
            };
            TopViewControls.prototype.onMouseWheelEvent = function (event) {
                if (this._enabled === false || this.enableZoom === false || (this.state !== this.STATE.NONE && this.state !== this.STATE.ROTATE))
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.handleMouseWheel(event);
            };
            TopViewControls.prototype.onTouchStartEvent = function (event) {
                if (this._enabled === false)
                    return;
                this.captureEvent();
                switch (event.touches.length) {
                    case 1:
                        if (this.enablePan === false)
                            return;
                        this.handleTouchStartPan(event);
                        this.state = this.STATE.TOUCH_PAN;
                        break;
                    case 2:
                        if (this.enableZoom === false)
                            return;
                        this.handleTouchStartDolly(event);
                        this.state = this.STATE.TOUCH_DOLLY;
                        var dx = event.touches[0].pageX - event.touches[1].pageX;
                        var dy = event.touches[0].pageY - event.touches[1].pageY;
                        var distance = Math.sqrt(dx * dx + dy * dy);
                        this.touchDistance = distance;
                        this.handleTouchStartPan(event);
                        break;
                    default:
                        this.state = this.STATE.NONE;
                }
            };
            TopViewControls.prototype.onTouchMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                switch (event.touches.length) {
                    case 1:
                        if (this.enablePan === false)
                            return;
                        if (this.state !== this.STATE.TOUCH_PAN)
                            return;
                        this.handleTouchMovePan(event);
                        break;
                    case 2:
                        if (this.enableZoom === false)
                            return;
                        if (this.state !== this.STATE.TOUCH_DOLLY)
                            return;
                        var dx = event.touches[0].pageX - event.touches[1].pageX;
                        var dy = event.touches[0].pageY - event.touches[1].pageY;
                        var distance = Math.sqrt(dx * dx + dy * dy);
                        var diff = Math.abs(this.touchDistance - distance);
                        this.touchDistance = distance;
                        if (diff < 10) {
                            this.state = this.STATE.TOUCH_PAN;
                            this.handleTouchMovePan(event);
                        }
                        else {
                            this.state = this.STATE.TOUCH_DOLLY;
                            this.handleTouchMoveDolly(event);
                        }
                        break;
                    default:
                        this.state = this.STATE.NONE;
                }
            };
            TopViewControls.prototype.onTouchEndEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                this.handleTouchEnd(event);
                this.releaseEvent();
                this.state = this.STATE.NONE;
            };
            return TopViewControls;
        }(Controls.EventControls));
        Controls.TopViewControls = TopViewControls;
    })(Controls = House3D.Controls || (House3D.Controls = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Controls;
    (function (Controls) {
        var MoveControls = (function (_super) {
            __extends(MoveControls, _super);
            function MoveControls(camera, domElement) {
                var _this = _super.call(this) || this;
                _this.PI_2 = Math.PI / 2;
                _this._movementSpeed = 10.0;
                _this.MoveDirection = { Forward: 1, Backward: 2, Left: 3, Right: 4, None: 0 };
                _this._velocity = new THREE.Vector3();
                _this._rotateStart = new THREE.Vector2();
                _this._rotateEnd = new THREE.Vector2();
                _this._rotateDelta = new THREE.Vector2();
                _this._moveStart = new THREE.Vector2();
                _this._moveEnd = new THREE.Vector2();
                _this._distance = 0;
                _this.STATE = { NONE: -1, ROTATE: 0, MOVE: 1 };
                _this._state = _this.STATE.NONE;
                _this._isMoving = false;
                _this._speedRate = new THREE.Vector2();
                _this._domElement = (domElement !== undefined) ? domElement : document;
                camera.position.set(0, 0, 0);
                camera.rotation.set(0, 0, 0);
                _this._pitchObject = new THREE.Object3D();
                _this._pitchObject.add(camera);
                _this._pitchObject.rotation.x = -0.3;
                _this._yawObject = new THREE.Object3D();
                _this._yawObject.position.set(0, 150, 0);
                _this._yawObject.add(_this._pitchObject);
                return _this;
            }
            MoveControls.prototype.setHouse = function (house) {
                this._house = house;
            };
            MoveControls.prototype.getObject = function () {
                return this._yawObject;
            };
            MoveControls.prototype.setHeightLevel = function (level) {
                if (level == 2)
                    this._yawObject.position.y = 420;
                else
                    this._yawObject.position.y = 150;
            };
            MoveControls.prototype.moving = function (speeding) {
                this._isMoving = true;
                this._speedRate.x = speeding.x;
                this._speedRate.y = speeding.y;
            };
            MoveControls.prototype.stop = function () {
                this._isMoving = false;
                this._speedRate.x = 0;
                this._speedRate.y = 0;
                this._moveDirection = this.MoveDirection.None;
            };
            MoveControls.prototype.handleRotateStart = function (x, y) {
                this._rotateStart.set(x, y);
                this._domElement.style.cursor = 'move';
            };
            MoveControls.prototype.handleRotate = function (x, y) {
                this._rotateEnd.set(x, y);
                this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart);
                this._yawObject.rotation.y -= this._rotateDelta.x * 0.002;
                this._pitchObject.rotation.x -= this._rotateDelta.y * 0.002;
                this._pitchObject.rotation.x = Math.max(-this.PI_2, Math.min(this.PI_2, this._pitchObject.rotation.x));
                this._rotateStart.copy(this._rotateEnd);
            };
            MoveControls.prototype.handleMoveStart = function (x, y) {
                this._moveStart.set(x, y);
            };
            MoveControls.prototype.handleMove = function (x, y) {
                var diffX1 = x - this._moveStart.x;
                var diffY1 = y - this._moveStart.y;
                var diffX = Math.abs(diffX1);
                var diffY = Math.abs(diffY1);
                this._moveDirection = this.MoveDirection.None;
                this._moveStart.set(x, y);
                if (diffX > diffY) {
                    if (diffX == 0)
                        return;
                    this._moveDirection = this.MoveDirection.Right;
                    if (diffX1 < 0)
                        this._moveDirection = this.MoveDirection.Left;
                }
                else {
                    if (diffY == 0)
                        return;
                    this._moveDirection = this.MoveDirection.Backward;
                    if (diffY1 < 0)
                        this._moveDirection = this.MoveDirection.Forward;
                }
            };
            MoveControls.prototype.handleEnd = function () {
                this.stop();
                this._domElement.style.cursor = 'auto';
                this._state = this.STATE.NONE;
            };
            MoveControls.prototype.moveForward = function (delta) {
                this._velocity.z -= this._movementSpeed;
                this.getObject().translateZ(this._velocity.z * delta);
            };
            MoveControls.prototype.moveBackward = function (delta) {
                this._velocity.z += this._movementSpeed;
                this.getObject().translateZ(this._velocity.z * delta);
            };
            MoveControls.prototype.moveLeft = function (delta) {
                this._velocity.x -= this._movementSpeed;
                this.getObject().translateX(this._velocity.x * delta);
            };
            MoveControls.prototype.moveRight = function (delta) {
                this._velocity.x += this._movementSpeed;
                this.getObject().translateX(this._velocity.x * delta);
            };
            MoveControls.prototype.update = function (delta) {
                if (this._enabled === false)
                    return;
                var delta1 = delta;
                if (this._isMoving === true) {
                    this._yawObject.rotation.y -= this._speedRate.x * delta;
                    if (this._speedRate.y > 0.2) {
                        delta1 = Math.abs(delta * this._speedRate.y);
                        this._moveDirection = this.MoveDirection.Backward;
                    }
                    else if (this._speedRate.y < -0.2) {
                        delta1 = Math.abs(delta * this._speedRate.y);
                        this._moveDirection = this.MoveDirection.Forward;
                    }
                    else {
                        this._moveDirection = this.MoveDirection.None;
                    }
                }
                this._velocity.x -= this._velocity.x * 10.0 * delta;
                this._velocity.z -= this._velocity.z * 10.0 * delta;
                switch (this._moveDirection) {
                    case this.MoveDirection.Forward:
                        this.moveForward(delta1);
                        if (this.isknockWall(this.getObject().position) == false) {
                            this.moveBackward(-delta1 * 10);
                        }
                        break;
                    case this.MoveDirection.Backward:
                        this.moveBackward(delta1);
                        if (this.isknockWall(this.getObject().position) == false) {
                            this.moveForward(-delta1 * 10);
                        }
                        break;
                    case this.MoveDirection.Left:
                        this.moveLeft(delta1);
                        if (this.isknockWall(this.getObject().position) == false) {
                            this.moveRight(-delta1 * 10);
                        }
                        break;
                    case this.MoveDirection.Right:
                        this.moveRight(delta1);
                        if (this.isknockWall(this.getObject().position) == false) {
                            this.moveLeft(-delta1 * 10);
                        }
                        break;
                }
                if (this._moveDirection != this.MoveDirection.None) {
                    var result = this._house.enter(this.getObject());
                    if (result) {
                        var scope_1 = this;
                        this._enabled = false;
                        setTimeout(function () { scope_1._enabled = true; }, 1000);
                    }
                }
            };
            MoveControls.prototype.isknockWall = function (position) {
                var doorBoxs = this._house.getDoorMeshes();
                for (var _i = 0, doorBoxs_1 = doorBoxs; _i < doorBoxs_1.length; _i++) {
                    var box = doorBoxs_1[_i];
                    if (box.containsPoint(position) == true)
                        return true;
                    var distance = box.distanceToPoint(position);
                    if (distance == 0)
                        continue;
                    if (distance <= 10) {
                        return true;
                    }
                }
                var wallBoxs = this._house.getWallMeshes();
                for (var _a = 0, wallBoxs_1 = wallBoxs; _a < wallBoxs_1.length; _a++) {
                    var box = wallBoxs_1[_a];
                    if (box.containsPoint(position) == true)
                        return false;
                    var distance = box.distanceToPoint(position);
                    if (distance == 0)
                        continue;
                    if (distance <= 10) {
                        return false;
                    }
                }
                return true;
            };
            MoveControls.prototype.onMouseDownEvent = function (event) {
                if (this._enabled === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.captureEvent();
                switch (event.button) {
                    case THREE.MOUSE.LEFT:
                        this._state = this.STATE.ROTATE;
                        this.handleRotateStart(event.clientX, event.clientY);
                        break;
                    case THREE.MOUSE.RIGHT:
                        this._state = this.STATE.MOVE;
                        this.handleMoveStart(event.clientX, event.clientY);
                        break;
                    default: break;
                }
            };
            MoveControls.prototype.onMouseMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                switch (this._state) {
                    case this.STATE.ROTATE:
                        this.handleRotate(event.clientX, event.clientY);
                        break;
                    case this.STATE.MOVE:
                        this.handleMove(event.clientX, event.clientY);
                        break;
                    default: break;
                }
            };
            MoveControls.prototype.onMouseUpEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.handleEnd();
                this.releaseEvent();
            };
            MoveControls.prototype.onTouchStartEvent = function (event) {
                if (this._enabled === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.captureEvent();
                switch (event.touches.length) {
                    case 1:
                        this.handleRotateStart(event.touches[0].clientX, event.touches[0].clientY);
                        break;
                    case 2:
                        var dx = event.touches[0].pageX - event.touches[1].pageX;
                        var dy = event.touches[0].pageY - event.touches[1].pageY;
                        this._distance = Math.sqrt(dx * dx + dy * dy);
                        this.handleMoveStart(event.touches[0].clientX, event.touches[0].clientY);
                        break;
                    default:
                        break;
                }
            };
            MoveControls.prototype.onTouchMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                switch (event.touches.length) {
                    case 1:
                        this.handleRotate(event.touches[0].clientX, event.touches[0].clientY);
                        break;
                    case 2:
                        var dx = event.touches[0].pageX - event.touches[1].pageX;
                        var dy = event.touches[0].pageY - event.touches[1].pageY;
                        var distance = Math.sqrt(dx * dx + dy * dy);
                        if (Math.abs(this._distance - distance) < 5)
                            this.handleMove(event.touches[0].clientX, event.touches[0].clientY);
                        break;
                    default:
                        break;
                }
            };
            MoveControls.prototype.onTouchEndEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.handleEnd();
                this.releaseEvent();
            };
            MoveControls.prototype.onKeyDownEvent = function (event) {
                switch (event.keyCode) {
                    case 38:
                    case 87:
                        this._moveDirection = this.MoveDirection.Forward;
                        this.captureEvent();
                        break;
                    case 37:
                    case 65:
                        this._moveDirection = this.MoveDirection.Left;
                        this.captureEvent();
                        break;
                    case 40:
                    case 83:
                        this._moveDirection = this.MoveDirection.Backward;
                        this.captureEvent();
                        break;
                    case 39:
                    case 68:
                        this._moveDirection = this.MoveDirection.Right;
                        this.captureEvent();
                        break;
                }
            };
            MoveControls.prototype.onKeyUpEvent = function (event) {
                switch (event.keyCode) {
                    case 38:
                    case 87:
                    case 37:
                    case 65:
                    case 40:
                    case 83:
                    case 39:
                    case 68:
                        this._moveDirection = this.MoveDirection.None;
                        break;
                }
            };
            return MoveControls;
        }(Controls.EventControls));
        Controls.MoveControls = MoveControls;
    })(Controls = House3D.Controls || (House3D.Controls = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Controls;
    (function (Controls) {
        var RockerControls = (function (_super) {
            __extends(RockerControls, _super);
            function RockerControls(container) {
                var _this = _super.call(this) || this;
                _this._radius = 30;
                _this._width = 120;
                _this._height = 120;
                _this._rockerRadius = 50;
                _this._rockerPosition = new THREE.Vector2();
                _this._moveOffset = new THREE.Vector2();
                _this._speedOffset = new THREE.Vector2();
                _this.init(container);
                _this.registerEvents();
                return _this;
            }
            RockerControls.prototype.setMoveControl = function (control) {
                this._moveControls = control;
            };
            RockerControls.prototype.init = function (container) {
                var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
                canvas.setAttribute("width", this._width.toString());
                canvas.setAttribute("height", this._height.toString());
                canvas.setAttribute("style", "position:absolute; top:100px; bottom:10px;");
                this._domElement = canvas;
                container.appendChild(canvas);
                this._context = canvas.getContext('2d');
                this._context.fillStyle = 'rgba(255, 255, 255, 0)';
                var imgbg = document.createElement('img');
                imgbg.setAttribute("width", this._width.toString());
                imgbg.setAttribute("height", this._height.toString());
                imgbg.setAttribute("id", "imgbg");
                imgbg.setAttribute("style", "display:none;");
                imgbg.setAttribute("src", "./images/1.png");
                container.appendChild(imgbg);
                var imgrk = document.createElement('img');
                imgrk.setAttribute("width", (this._rockerRadius * 2).toString());
                imgrk.setAttribute("height", (this._rockerRadius * 2).toString());
                imgrk.setAttribute("id", "imgrk");
                imgrk.setAttribute("style", "display:none;");
                imgrk.setAttribute("src", "./images/2.png");
                container.appendChild(imgrk);
                this._rockerPosition.set(this._width / 2, this._height / 2);
            };
            RockerControls.prototype.getPoint = function (x, y) {
                var canvas = this._domElement;
                var bbox = canvas.getBoundingClientRect();
                return {
                    x: x - bbox.left * (canvas.width / bbox.width),
                    y: y - bbox.top * (canvas.height / bbox.height)
                };
            };
            RockerControls.prototype.show = function () {
                this._domElement.setAttribute("style", "display:block;position:absolute; right:10px; bottom:10px;");
            };
            RockerControls.prototype.hide = function () {
                this._domElement.setAttribute("style", "display:none;");
            };
            RockerControls.prototype.unable = function () {
                this.hide();
                _super.prototype.unable.call(this);
            };
            RockerControls.prototype.enable = function () {
                this.show();
                _super.prototype.enable.call(this);
            };
            RockerControls.prototype.handleMoveStart = function (x, y) {
                var p = this.getPoint(x, y);
                if (this._width / 2 - this._rockerRadius > p.x)
                    return;
                if (this._width / 2 + this._rockerRadius < p.x)
                    return;
                if (this._height / 2 - this._rockerRadius > p.y)
                    return;
                if (this._height / 2 + this._rockerRadius < p.y)
                    return;
            };
            RockerControls.prototype.handleMoveEnd = function () {
                this._rockerPosition.set(this._width / 2, this._height / 2);
                if (this._moveControls)
                    this._moveControls.stop();
                this._moveControls.enable();
            };
            RockerControls.prototype.handleMove = function (x, y) {
                var p = this.getPoint(x, y);
                var xdiff = p.x - this._width / 2;
                var ydiff = p.y - this._height / 2;
                var distance = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
                if (distance <= this._radius) {
                    this._moveOffset.x = p.x;
                    this._moveOffset.y = p.y;
                }
                else {
                    this._moveOffset.x = xdiff * this._radius / distance + this._width / 2;
                    this._moveOffset.y = ydiff * this._radius / distance + this._height / 2;
                }
                this._rockerPosition.set(this._moveOffset.x, this._moveOffset.y);
                this._speedOffset.x = (this._moveOffset.x - this._width / 2) / this._radius;
                this._speedOffset.y = (this._moveOffset.y - this._height / 2) / this._radius;
                if (this._moveControls)
                    this._moveControls.moving(this._speedOffset);
            };
            RockerControls.prototype.update = function (delta) {
                if (this._enabled === false)
                    return;
                this._context.clearRect(0, 0, this._width, this._height);
                var imgbg = document.getElementById("imgbg");
                this._context.drawImage(imgbg, 0, 0, this._width, this._height);
                var imgrk = document.getElementById("imgrk");
                this._context.drawImage(imgrk, this._rockerPosition.x - this._rockerRadius, this._rockerPosition.y - this._rockerRadius, this._rockerRadius * 2, this._rockerRadius * 2);
            };
            RockerControls.prototype.onMouseDownEvent = function (event) {
                if (this._enabled === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.captureEvent();
                switch (event.button) {
                    case 0:
                        this.handleMoveStart(event.clientX, event.clientY);
                        break;
                    default:
                        break;
                }
            };
            RockerControls.prototype.onMouseMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.handleMove(event.clientX, event.clientY);
            };
            RockerControls.prototype.onMouseUpEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.handleMoveEnd();
                this.releaseEvent();
            };
            RockerControls.prototype.onTouchStartEvent = function (event) {
                if (this._enabled === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.captureEvent();
                switch (event.touches.length) {
                    case 1:
                        this.handleMoveStart(event.touches[0].clientX, event.touches[0].clientY);
                        break;
                    default:
                        break;
                }
            };
            RockerControls.prototype.onTouchMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                switch (event.touches.length) {
                    case 1:
                        this.handleMove(event.touches[0].clientX, event.touches[0].clientY);
                        break;
                    default:
                        break;
                }
            };
            RockerControls.prototype.onTouchEndEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                event.stopPropagation();
                this.handleMoveEnd();
                this.releaseEvent();
            };
            RockerControls.prototype.onBlurEvent = function (event) {
                this.handleMoveEnd();
            };
            RockerControls.prototype.unregisteredEvents = function () {
                this._domElement.removeEventListener('mousedown', this.onMouseDownEvent, false);
                document.removeEventListener('mousemove', this.onMouseMoveEvent, false);
                document.removeEventListener('mouseup', this.onMouseUpEvent, false);
                this._domElement.removeEventListener('touchstart', this.onTouchStartEvent, false);
                document.removeEventListener('touchend', this.onTouchEndEvent, false);
                document.removeEventListener('touchmove', this.onTouchMoveEvent, false);
                this._domElement.removeEventListener('blur', this.onBlurEvent, false);
            };
            RockerControls.prototype.registerEvents = function () {
                var _this = this;
                this._domElement.addEventListener('mousedown', function (ev) { return _this.onMouseDownEvent(ev); }, false);
                document.addEventListener('mousemove', function (ev) { return _this.onMouseMoveEvent(ev); }, false);
                document.addEventListener('mouseup', function (ev) { return _this.onMouseUpEvent(ev); }, false);
                this._domElement.addEventListener('touchstart', function (ev) { return _this.onTouchStartEvent(ev); }, false);
                document.addEventListener('touchend', function (ev) { return _this.onTouchEndEvent(ev); }, false);
                document.addEventListener('touchmove', function (ev) { return _this.onTouchMoveEvent(ev); }, false);
                this._domElement.addEventListener('blur', function (ev) { return _this.onBlurEvent(ev); }, false);
            };
            RockerControls.prototype.dispose = function () {
                this.unregisteredEvents();
            };
            return RockerControls;
        }(Controls.EventControls));
        Controls.RockerControls = RockerControls;
    })(Controls = House3D.Controls || (House3D.Controls = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Controls;
    (function (Controls) {
        var GizmoMaterial = (function (_super) {
            __extends(GizmoMaterial, _super);
            function GizmoMaterial(parameters, highlight) {
                var _this = _super.call(this) || this;
                _this.setValues(parameters);
                _this.oldColor = _this.color.clone();
                _this.oldOpacity = _this.opacity;
                _this.side = THREE.DoubleSide;
                if (highlight)
                    _this.highlightColor = new THREE.Color(highlight);
                else
                    _this.highlightColor = new THREE.Color(0xFFFF00);
                return _this;
            }
            GizmoMaterial.prototype.highlight = function (highlighted) {
                if (highlighted) {
                    this.color.copy(this.highlightColor);
                    this.opacity = 1;
                }
                else {
                    this.color.copy(this.oldColor);
                    this.opacity = this.oldOpacity;
                }
            };
            return GizmoMaterial;
        }(THREE.MeshBasicMaterial));
        var GizmoLineMaterial = (function (_super) {
            __extends(GizmoLineMaterial, _super);
            function GizmoLineMaterial(parameters) {
                var _this = _super.call(this) || this;
                _this.depthTest = false;
                _this.depthWrite = false;
                _this.transparent = true;
                _this.linewidth = 1;
                _this.setValues(parameters);
                _this.oldColor = _this.color.clone();
                _this.oldOpacity = _this.opacity;
                _this.side = THREE.DoubleSide;
                return _this;
            }
            GizmoLineMaterial.prototype.highlight = function (highlighted) {
                if (highlighted) {
                    this.color.setRGB(1, 1, 0);
                    this.opacity = 1;
                }
                else {
                    this.color.copy(this.oldColor);
                    this.opacity = this.oldOpacity;
                }
            };
            return GizmoLineMaterial;
        }(THREE.LineBasicMaterial));
        var Width = 16;
        var Height = 32;
        var VWidth = 4;
        var LShape = (function (_super) {
            __extends(LShape, _super);
            function LShape() {
                var _this = this;
                var width = Width, height = Height;
                var shape = new THREE.Shape();
                shape.moveTo(0, 0);
                shape.lineTo(0, -width + height);
                shape.lineTo(-width, -width + height);
                shape.lineTo(-width, -width);
                shape.lineTo(-width + height, -width);
                shape.lineTo(-width + height, 0);
                var geometry = new THREE.ShapeBufferGeometry(shape);
                geometry.rotateY(Math.PI / 2);
                geometry.rotateZ(Math.PI / 2);
                var material = new GizmoMaterial({ color: 0x000000 }, 0x2B3423);
                _this = _super.call(this, geometry, material) || this;
                return _this;
            }
            return LShape;
        }(THREE.Mesh));
        var DShape = (function (_super) {
            __extends(DShape, _super);
            function DShape() {
                var _this = this;
                var width = Width, height = Height;
                var geometry = new THREE.PlaneBufferGeometry(width, height);
                geometry.rotateY(Math.PI / 2);
                geometry.rotateZ(Math.PI / 2);
                var material = new GizmoMaterial({ color: 0xFFE401 }, 0xFFFF00);
                _this = _super.call(this, geometry, material) || this;
                return _this;
            }
            return DShape;
        }(THREE.Mesh));
        var VShape = (function (_super) {
            __extends(VShape, _super);
            function VShape() {
                var _this = this;
                var width = Width, widthV = VWidth;
                var shape = new THREE.Shape();
                var sqrt = widthV / Math.sqrt(2);
                shape.moveTo(0, width / 4 + widthV / 2);
                shape.lineTo(width / 2, -width / 4 + widthV / 2);
                shape.lineTo(width / 2 - sqrt, -width / 4 + widthV / 2 - sqrt);
                shape.lineTo(0, width / 4 + widthV / 2 - Math.sqrt(2) * widthV);
                shape.lineTo(-width / 2 + sqrt, -width / 4 + widthV / 2 - sqrt);
                shape.lineTo(-width / 2, -width / 4 + widthV / 2);
                var geometry = new THREE.ShapeBufferGeometry(shape);
                geometry.rotateY(Math.PI / 2);
                geometry.rotateZ(Math.PI / 2);
                var material = new GizmoMaterial({ color: 0xFFFFFF }, 0xFFFFFF);
                _this = _super.call(this, geometry, material) || this;
                return _this;
            }
            return VShape;
        }(THREE.Mesh));
        var LVShape = (function (_super) {
            __extends(LVShape, _super);
            function LVShape() {
                var _this = this;
                var width = Width, height = Height * 2 / 4;
                var widthV = VWidth / 2, heightV = width / 2;
                var sqrt2 = Math.sqrt(2);
                var sqrtL = heightV / sqrt2;
                var sqrt = widthV / sqrt2;
                var shape = new THREE.Shape();
                var h = height * 3 / 8 + sqrt2 * widthV / 2;
                shape.moveTo(-heightV, h);
                shape.lineTo(-heightV + sqrtL, h - sqrtL);
                shape.lineTo(-heightV + sqrtL - sqrt, h - sqrtL - sqrt);
                shape.lineTo(-heightV + widthV / 2, h - sqrt2 * widthV - widthV / 2);
                shape.moveTo(-heightV + widthV / 2, -heightV + widthV / 2);
                shape.lineTo(h - sqrt2 * widthV - widthV / 2, -heightV + widthV / 2);
                shape.lineTo(h - sqrtL - sqrt, -heightV + sqrtL - sqrt);
                shape.lineTo(h - sqrtL, -heightV + sqrtL);
                shape.lineTo(h, -heightV);
                shape.lineTo(h - sqrtL, -heightV - sqrtL);
                shape.lineTo(h - sqrtL - sqrt, -heightV - sqrtL + sqrt);
                shape.lineTo(h - sqrt2 * widthV - widthV / 2, -heightV - widthV / 2);
                shape.lineTo(-heightV + widthV / 2, -heightV - widthV / 2);
                shape.quadraticCurveTo(-heightV - widthV / 2, -heightV - widthV / 2, -heightV - widthV / 2, -heightV + widthV / 2);
                shape.lineTo(-heightV - widthV / 2, h - sqrt2 * widthV - widthV / 2);
                shape.lineTo(-heightV - sqrtL + sqrt, h - sqrtL - sqrt);
                shape.lineTo(-heightV - sqrtL, h - sqrtL);
                var geometry = new THREE.ShapeBufferGeometry(shape);
                geometry.rotateY(Math.PI / 2);
                geometry.rotateZ(Math.PI / 2);
                var material = new GizmoMaterial({ color: 0xFFFFFF }, 0xFFFFFF);
                _this = _super.call(this, geometry, material) || this;
                return _this;
            }
            return LVShape;
        }(THREE.Mesh));
        var TransformGizmo = (function (_super) {
            __extends(TransformGizmo, _super);
            function TransformGizmo() {
                var _this = _super.call(this) || this;
                _this.diff = 0.05;
                _this.handles = new THREE.Object3D();
                _this.planes = new THREE.Object3D();
                _this.add(_this.handles);
                _this.add(_this.planes);
                _this.init();
                return _this;
            }
            TransformGizmo.prototype.init = function () {
                var planeGeometry = new THREE.PlaneBufferGeometry(1000, 1000, 2, 2);
                var planeMaterial = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });
                var planes = {
                    "X": new THREE.Mesh(planeGeometry, planeMaterial),
                    "Y": new THREE.Mesh(planeGeometry, planeMaterial),
                    "Z": new THREE.Mesh(planeGeometry, planeMaterial)
                };
                this.activePlane = planes["Y"];
                planes["X"].rotation.set(0, Math.PI / 2, 0);
                planes["Y"].rotation.set(-Math.PI / 2, 0, 0);
                for (var i in planes) {
                    planes[i].name = i;
                    this.planes.add(planes[i]);
                    this.planes[i] = planes[i];
                }
                var setupGizmos = function (gizmoMap, parent) {
                    for (var name in gizmoMap) {
                        for (var i = gizmoMap[name].length; i--;) {
                            var object = gizmoMap[name][i][0];
                            var position = gizmoMap[name][i][1];
                            var rotation = gizmoMap[name][i][2];
                            object.name = name;
                            if (position)
                                object.position.set(position[0], position[1], position[2]);
                            if (rotation)
                                object.rotation.set(rotation[0], rotation[1], rotation[2]);
                            parent.add(object);
                        }
                    }
                };
                setupGizmos(this.handleGizmos, this.handles);
            };
            TransformGizmo.prototype.highlight = function (axis) {
                this.traverse(function (child) {
                    if (child.material && child.material.highlight) {
                        if (child.name === axis) {
                            child.material.highlight(true);
                        }
                        else {
                            child.material.highlight(false);
                        }
                    }
                });
            };
            TransformGizmo.prototype.updateRotate = function (rotate) {
                this.rotation.copy(rotate);
            };
            TransformGizmo.prototype.updateScale = function (scale) {
                this.object.scale.copy(scale);
                this.box.setFromObject(this.object);
                var diff1 = 1;
                var diff2 = 1 + this.diff;
                if (this.object.type == "OnRoofItem") {
                    diff1 = -diff1 - 5;
                    diff2 = -diff2 - 5;
                }
                if (this.object.type != "OnWallItem") {
                    var x = (this.box.max.x - this.box.min.x) / 2;
                    var z = (this.box.max.z - this.box.min.z) / 2;
                    var obj = this.handleGizmos.RY[0][0];
                    obj.position.set(-x, diff1, -z);
                    var obj = this.handleGizmos.RY[1][0];
                    obj.position.set(-x, diff1, z);
                    var obj = this.handleGizmos.RY[2][0];
                    obj.position.set(x, diff1, z);
                    var obj = this.handleGizmos.RY[3][0];
                    obj.position.set(x, diff1, -z);
                    var obj = this.handleGizmos.RY[4][0];
                    obj.position.set(-x, diff2, -z);
                    var obj = this.handleGizmos.RY[5][0];
                    obj.position.set(-x, diff2, z);
                    var obj = this.handleGizmos.RY[6][0];
                    obj.position.set(x, diff2, z);
                    var obj = this.handleGizmos.RY[7][0];
                    obj.position.set(x, diff2, -z);
                }
                var diff3 = 1 + this.diff * 2;
                var diff4 = 1 + this.diff * 3;
                if (this.object.type == "OnRoofItem") {
                    diff3 = -diff3 - 5;
                    diff4 = -diff4 - 5;
                }
                if (this.object.type != "ItemGroup") {
                    var x = (this.box.max.x - this.box.min.x) / 2;
                    var z = (this.box.max.z - this.box.min.z) / 2;
                    var y = this.box.max.y - this.box.min.y;
                    var obj = this.handleGizmos.SX[0][0];
                    obj.position.set(-x - 10, diff3, 0);
                    var obj = this.handleGizmos.SX[1][0];
                    obj.position.set(x + 10, diff3, 0);
                    var obj = this.handleGizmos.SX[2][0];
                    obj.position.set(-x - 10, diff4, 0);
                    var obj = this.handleGizmos.SX[3][0];
                    obj.position.set(x + 10, diff4, 0);
                    var obj = this.handleGizmos.SZ[0][0];
                    obj.position.set(0, diff3, z + 10);
                    var obj = this.handleGizmos.SZ[1][0];
                    obj.position.set(0, diff3, -z - 10);
                    var obj = this.handleGizmos.SZ[2][0];
                    obj.position.set(0, diff4, z + 10);
                    var obj = this.handleGizmos.SZ[3][0];
                    obj.position.set(0, diff4, -z - 10);
                }
            };
            TransformGizmo.prototype.rotateGeometry = function (box) {
                var x = (box.max.x - box.min.x) / 2;
                var z = (box.max.z - box.min.z) / 2;
                var diff1 = 1;
                var diff2 = 1 + this.diff;
                if (this.object.type == "OnRoofItem") {
                    diff1 = -diff1 - 5;
                    diff2 = -diff2 - 5;
                }
                this.handleGizmos.RY =
                    [
                        [new LShape(), [-x, diff1, -z], [0, Math.PI, 0]],
                        [new LShape(), [-x, diff1, z], [0, -Math.PI / 2, 0]],
                        [new LShape(), [x, diff1, z], [0, 0, 0]],
                        [new LShape(), [x, diff1, -z], [0, Math.PI / 2, 0]],
                        [new LVShape(), [-x, diff2, -z], [0, Math.PI, 0]],
                        [new LVShape(), [-x, diff2, z], [0, -Math.PI / 2, 0]],
                        [new LVShape(), [x, diff2, z], [0, 0, 0]],
                        [new LVShape(), [x, diff2, -z], [0, Math.PI / 2, 0]]
                    ];
            };
            TransformGizmo.prototype.scaleGeometry = function (box) {
                var x = (box.max.x - box.min.x) / 2;
                var z = (box.max.z - box.min.z) / 2;
                var y = box.max.y - box.min.y;
                var diff3 = 1 + this.diff * 2;
                var diff4 = 1 + this.diff * 3;
                if (this.object.type == "OnRoofItem") {
                    diff3 = -diff3 - 5;
                    diff4 = -diff4 - 5;
                }
                this.handleGizmos.SX =
                    [
                        [new DShape(), [-x - 10, diff3, 0], [0, Math.PI / 2, 0]],
                        [new DShape(), [x + 10, diff3, 0], [0, Math.PI / 2, 0]],
                        [new VShape(), [-x - 10, diff4, 0], [0, 0, 0]],
                        [new VShape(), [x + 10, diff4, 0], [0, Math.PI, 0]]
                    ];
                this.handleGizmos.SZ =
                    [
                        [new DShape(), [0, diff3, z + 10], [0, -Math.PI, 0]],
                        [new DShape(), [0, diff3, -z - 10], [0, 0, 0]],
                        [new VShape(), [0, diff4, z + 10], [0, Math.PI / 2, 0]],
                        [new VShape(), [0, diff4, -z - 10], [0, -Math.PI / 2, 0]]
                    ];
            };
            TransformGizmo.prototype.clear = function () {
                var children = this.handles.children;
                for (var i = children.length - 1; i >= 0; i--) {
                    this.handles.remove(children[i]);
                }
            };
            TransformGizmo.prototype.setObject = function (object) {
                this.clear();
                var o = object.clone();
                o.rotation.set(0, 0, 0);
                this.object = o;
                this.box = new THREE.Box3();
                this.box.setFromObject(o);
                this.handleGizmos = {};
                if (object.type != "OnWallItem") {
                    this.rotateGeometry(this.box);
                }
                if (object.type != "ItemGroup") {
                    this.scaleGeometry(this.box);
                }
                this.init();
                this.rotation.copy(object.rotation);
            };
            TransformGizmo.prototype.setActivePlane = function (axis) {
                this.activePlane = this.planes["Y"];
            };
            return TransformGizmo;
        }(THREE.Object3D));
        var ObjectControls = (function (_super) {
            __extends(ObjectControls, _super);
            function ObjectControls(transform, camera, domElement) {
                var _this = _super.call(this) || this;
                _this.visible = false;
                _this.axis = null;
                _this.ray = new THREE.Raycaster();
                _this.pointerVector = new THREE.Vector2();
                _this.point = new THREE.Vector3();
                _this.offset = new THREE.Vector3();
                _this.rotation = new THREE.Vector3();
                _this.offsetRotation = new THREE.Vector3();
                _this.oldScale = new THREE.Vector3();
                _this.tempMatrix = new THREE.Matrix4();
                _this.tempVector = new THREE.Vector3();
                _this.tempQuaternion = new THREE.Quaternion();
                _this.quaternionX = new THREE.Quaternion();
                _this.quaternionY = new THREE.Quaternion();
                _this.quaternionZ = new THREE.Quaternion();
                _this.unitX = new THREE.Vector3(1, 0, 0);
                _this.unitY = new THREE.Vector3(0, 1, 0);
                _this.unitZ = new THREE.Vector3(0, 0, 1);
                _this.parentRotationMatrix = new THREE.Matrix4();
                _this.parentScale = new THREE.Vector3();
                _this.worldPosition = new THREE.Vector3();
                _this.worldRotation = new THREE.Euler();
                _this.worldRotationMatrix = new THREE.Matrix4();
                _this.camPosition = new THREE.Vector3();
                _this.camRotation = new THREE.Euler();
                _this.scaleY = false;
                _this.dScaleY = 0;
                _this._transform = transform;
                _this._camera = camera;
                _this._domElement = (domElement !== undefined) ? domElement : document;
                _this._gizmoRotate = new TransformGizmo();
                _this._gizmoRotate.visible = false;
                _this._transformGizmo = new THREE.Object3D();
                _this._transformGizmo.add(_this._gizmoRotate);
                _this.init_menu(domElement);
                return _this;
            }
            ObjectControls.prototype.attach = function (object) {
                this.enable();
                this.object = object;
                this.setPosition(this.object);
            };
            ObjectControls.prototype.detach = function () {
                this.unable();
                this.object = undefined;
                this._gizmoRotate.visible = false;
                this.axis = null;
                this.hideMenu();
            };
            ObjectControls.prototype.setPosition = function (object) {
                this.showMenu();
                this._gizmoRotate.setObject(object);
                this._gizmoRotate.position.copy(object.position);
                this._gizmoRotate.visible = true;
            };
            ObjectControls.prototype.getObject = function () {
                return this._transformGizmo;
            };
            ObjectControls.prototype.changeCamera = function (camera) {
                this._camera = camera;
            };
            ObjectControls.prototype.calcMouse = function (pointer) {
                var rect = this._domElement.getBoundingClientRect();
                var x = (pointer.clientX - rect.left) / rect.width;
                var y = (pointer.clientY - rect.top) / rect.height;
                this.pointerVector.set((x * 2) - 1, -(y * 2) + 1);
            };
            ObjectControls.prototype.handleStart = function (event) {
                if (this.object === undefined)
                    return;
                this.calcMouse(event);
                var intersects = this._transform.intersectObjects(this.pointerVector, this._gizmoRotate.handles.children);
                if (intersects.length == 0)
                    return;
                var intersect = intersects[0];
                this.pickObject = intersect.object;
                this.captureEvent();
                this.axis = intersect.object.name;
                this._gizmoRotate.setActivePlane(this.axis);
                this.setPosition(this.object);
                this._gizmoRotate.highlight(this.axis);
                this.oldScale.copy(this.object.scale);
                this.worldRotationMatrix.extractRotation(this.object.matrixWorld);
                this.parentRotationMatrix.extractRotation(this.object.parent.matrixWorld);
                this.parentScale.setFromMatrixScale(this.tempMatrix.getInverse(this.object.parent.matrixWorld));
                this.offset.copy(intersect.point);
            };
            ObjectControls.prototype.handleMove = function (event) {
                if (this.object === undefined || this.axis === null || this.pickObject === undefined)
                    return;
                this.calcMouse(event);
                var intersects = this._transform.intersectObjects(this.pointerVector, [this._gizmoRotate.activePlane]);
                if (intersects.length == 0)
                    return;
                var intersect = intersects[0];
                this.point.copy(intersect.point);
                if (this.axis == "RY") {
                    this.point.sub(this.object.position);
                    this.point.multiply(this.parentScale);
                    this.tempVector.copy(this.offset).sub(this.object.position);
                    this.tempVector.multiply(this.parentScale);
                    this.rotation.set(Math.atan2(this.point.z, this.point.y), Math.atan2(this.point.x, this.point.z), Math.atan2(this.point.y, this.point.x));
                    this.offsetRotation.set(Math.atan2(this.tempVector.z, this.tempVector.y), Math.atan2(this.tempVector.x, this.tempVector.z), Math.atan2(this.tempVector.y, this.tempVector.x));
                    this.tempQuaternion.setFromRotationMatrix(this.tempMatrix.getInverse(this.parentRotationMatrix));
                    var diff = Math.abs(this.rotation.y - this.offsetRotation.y) * 2 / Math.PI;
                    diff = diff % 1;
                    if (diff < 0.05 || diff > 0.95) {
                        var rotate = Math.round((this.rotation.y - this.offsetRotation.y) * 2 / Math.PI) * Math.PI / 2;
                        this.quaternionY.setFromAxisAngle(this.unitY, rotate);
                    }
                    else {
                        this.quaternionY.setFromAxisAngle(this.unitY, this.rotation.y - this.offsetRotation.y);
                    }
                    this.tempQuaternion.multiplyQuaternions(this.tempQuaternion, this.quaternionY);
                    this.object.rotateByQuaternion(this.tempQuaternion);
                    this._gizmoRotate.updateRotate(this.object.rotation);
                }
                else {
                    this.point.sub(this.offset);
                    this.point.multiply(this.parentScale);
                    this.point.applyMatrix4(this.tempMatrix.getInverse(this.worldRotationMatrix));
                    this.object.updateMatrixWorld();
                    this.worldPosition.setFromMatrixPosition(this.object.matrixWorld);
                    this.worldRotation.setFromRotationMatrix(this.tempMatrix.extractRotation(this.object.matrixWorld));
                    this._camera.updateMatrixWorld();
                    this.camPosition.setFromMatrixPosition(this._camera.matrixWorld);
                    this.camRotation.setFromRotationMatrix(this.tempMatrix.extractRotation(this._camera.matrixWorld));
                    var nscale = this.worldPosition.distanceTo(this.camPosition) / 6;
                    var scale = new THREE.Vector3();
                    scale.set(nscale, nscale, nscale);
                    var min = 0.05;
                    var max = 0.2;
                    if (this.axis === "SX") {
                        var scaleX = 1 + this.point.x / scale.x;
                        if (this.pickObject.position.x < 0)
                            scaleX = 1 - this.point.x / scale.x;
                        var scaleX = scaleX * this.oldScale.x;
                        scaleX = scaleX > min ? scaleX : min;
                        scaleX = scaleX < max ? scaleX : max;
                        this.object.scale.x = scaleX;
                    }
                    else if (this.axis === "SZ") {
                        var scaleZ = 1 + this.point.z / scale.z;
                        if (this.pickObject.position.z < 0)
                            scaleZ = 1 - this.point.z / scale.z;
                        var scaleZ = scaleZ * this.oldScale.z;
                        scaleZ = scaleZ > min ? scaleZ : min;
                        scaleZ = scaleZ < max ? scaleZ : max;
                        this.object.scale.z = scaleZ;
                    }
                    this._gizmoRotate.updateScale(this.object.scale);
                    this._gizmoRotate.highlight(this.axis);
                }
            };
            ObjectControls.prototype.handleEnd = function (event) {
                event.preventDefault();
                this.pickObject = undefined;
                this.unregisteredEvents();
                if (event.button !== undefined && event.button !== 0)
                    return;
            };
            ObjectControls.prototype.onMouseDownEvent = function (event) {
                if (this._enabled === false)
                    return;
                event.preventDefault();
                if (event.button == 0) {
                    this.handleStart(event);
                }
            };
            ObjectControls.prototype.onMouseMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                this.handleMove(event);
            };
            ObjectControls.prototype.onMouseUpEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                if (event.button == 0) {
                    this.handleEnd(event);
                }
                this.releaseEvent();
            };
            ObjectControls.prototype.onTouchStartEvent = function (event) {
                if (this._enabled === false)
                    return;
                switch (event.touches.length) {
                    case 1:
                        this.handleStart(event.changedTouches[0]);
                        break;
                    default:
                        break;
                }
            };
            ObjectControls.prototype.onTouchMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                this.handleMove(event.changedTouches[0]);
            };
            ObjectControls.prototype.onTouchEndEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                this.handleEnd(event);
                this.releaseEvent();
            };
            ObjectControls.prototype.init_menu = function (container) {
                var _this = this;
                this._scaleMenu = document.createElement('div');
                this._scaleMenu.setAttribute("style", "position:absolute;display:none; ");
                this._domElement.appendChild(this._scaleMenu);
                var imgScale = document.createElement('img');
                imgScale.id = "imgitem_sacle";
                imgScale.src = "./images/sacleheight.png";
                imgScale.width = 48;
                imgScale.setAttribute("style", "float:left;");
                this._scaleMenu.appendChild(imgScale);
                imgScale.addEventListener('mousedown', function (ev) { return _this.onMouseDown(ev); });
                imgScale.addEventListener('touchstart', function (ev) { return _this.onTouchStart(ev); });
            };
            ObjectControls.prototype.elementDisplay = function (element, display) {
                var id = document.getElementById(element);
                if (id)
                    if (display)
                        id.style.display = "block";
                    else
                        id.style.display = "none";
            };
            ObjectControls.prototype.onMouseDown = function (event) {
                var _this = this;
                event.preventDefault();
                event.stopPropagation();
                if (!this.object)
                    return;
                this.scaleY = true;
                this.mouseOld = new THREE.Vector2(event.clientX, event.clientY);
                this.dScaleY = this.object.scale.y;
                document.addEventListener('mouseup', function (ev) { return _this.onMouseUp(ev); });
                document.addEventListener('mousemove', function (ev) { return _this.onMouseMove(ev); }, false);
            };
            ObjectControls.prototype.onMouseUp = function (event) {
                this.unregisteredEvents();
            };
            ObjectControls.prototype.onTouchStart = function (event) {
                var _this = this;
                event.preventDefault();
                event.stopPropagation();
                if (!this.object)
                    return;
                this.scaleY = true;
                this.mouseOld = new THREE.Vector2(event.touches[0].clientX, event.touches[0].clientY);
                this.dScaleY = this.object.scale.y;
                document.addEventListener('touchend', function (ev) { return _this.onTouchEnd(ev); });
                document.addEventListener('touchmove', function (ev) { return _this.onTouchMove(ev); }, false);
            };
            ObjectControls.prototype.onTouchEnd = function (event) {
                this.unregisteredEvents();
            };
            ObjectControls.prototype.unregisteredEvents = function () {
                this.scaleY = false;
                document.removeEventListener('mousemove', this.onMouseMove, false);
                document.removeEventListener('touchmove', this.onTouchMove, false);
                document.removeEventListener('mouseup', this.onMouseUp, false);
                document.removeEventListener('touchend', this.onTouchEnd, false);
            };
            ObjectControls.prototype.onTouchMove = function (event) {
                if (event.touches.length != 1)
                    return;
                event.preventDefault();
                event.stopPropagation();
                if (this.scaleY)
                    this.scaleHeight(new THREE.Vector2(event.touches[0].clientX, event.touches[0].clientY));
            };
            ObjectControls.prototype.onMouseMove = function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (this.scaleY)
                    this.scaleHeight(new THREE.Vector2(event.clientX, event.clientY));
            };
            ObjectControls.prototype.calcMenu = function (element, object) {
                if (object.type == "ItemGroup" || object.type == "OnWallItem") {
                    this.elementDisplay("imgitem_sacle", false);
                    return;
                }
                this.elementDisplay("imgitem_sacle", true);
                var box = new THREE.Box3();
                box.setFromObject(object);
                var middle = box.max.clone().add(box.min).divideScalar(2);
                if (object.type == "OnRoofItem")
                    middle.y = box.min.y;
                else
                    middle.y = box.max.y;
                middle = this._transform.worldToScreen(middle);
                element.style.left = middle.x - 24 + 'px';
                element.style.top = middle.y - 24 + 'px';
                element.style.display = 'block';
            };
            ObjectControls.prototype.showMenu = function () {
                if (this.object) {
                    this.calcMenu(this._scaleMenu, this.object);
                }
            };
            ObjectControls.prototype.hideMenu = function () {
                this._scaleMenu.style.display = 'none';
            };
            ObjectControls.prototype.scaleHeight = function (mouse) {
                if (!this.object)
                    return;
                var min = 0.05;
                var max = 0.2;
                var scaleY = 1 + (this.mouseOld.y - mouse.y) / 200;
                if (this.object.type == "OnRoofItem")
                    scaleY = 1 + (mouse.y - this.mouseOld.y) / 200;
                var scaleY = scaleY * this.dScaleY;
                scaleY = scaleY > min ? scaleY : min;
                scaleY = scaleY < max ? scaleY : max;
                this.object.scale.y = scaleY;
                var scale = new THREE.Vector3();
                scale.set(this.object.scale.x * 10, this.object.scale.y * 10, this.object.scale.z * 10);
                this.showMenu();
                this._gizmoRotate.highlight(this.axis);
            };
            return ObjectControls;
        }(Controls.EventControls));
        Controls.ObjectControls = ObjectControls;
    })(Controls = House3D.Controls || (House3D.Controls = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Controls;
    (function (Controls) {
        var DragControls = (function (_super) {
            __extends(DragControls, _super);
            function DragControls(transform, domElement) {
                var _this = _super.call(this) || this;
                _this._raycaster = new THREE.Raycaster();
                _this._mouse = new THREE.Vector2();
                _this._offset = new THREE.Vector2();
                _this._transform = transform;
                _this._domElement = (domElement !== undefined) ? domElement : document;
                return _this;
            }
            DragControls.prototype.setHouse = function (house) {
                this._house = house;
            };
            DragControls.prototype.calcMouse = function (event) {
                var rect = this._domElement.getBoundingClientRect();
                this._mouse.x = event.clientX - this._offset.x;
                this._mouse.y = event.clientY - this._offset.y;
                this._mouse.x = ((this._mouse.x - rect.left) / rect.width) * 2 - 1;
                this._mouse.y = -((this._mouse.y - rect.top) / rect.height) * 2 + 1;
            };
            DragControls.prototype.getOffset = function (intersect) {
                var obj = this._house.getObject3D(intersect.object);
                var p1 = this._transform.worldToScreen(intersect.point);
                var p2 = this._transform.worldToScreen(obj.position);
                this._offset.set(p1.x - p2.x, p1.y - p2.y);
            };
            DragControls.prototype.handMouseDown = function (event) {
                this._offset.set(0, 0);
                this._selected = undefined;
                this.calcMouse(event);
                var objects = this._house.getPickupMeshes();
                var intersects = this._transform.intersectObjects(this._mouse, objects);
                if (intersects.length > 0) {
                    var intersect = intersects[0];
                    var pickup = this._house.dragStart(intersect);
                    if (pickup === true) {
                        this._selected = intersect.object;
                        this.getOffset(intersect);
                        this._domElement.style.cursor = 'move';
                        this.captureEvent();
                    }
                }
                else {
                    this._house.unDrag();
                }
            };
            DragControls.prototype.handMouseMove = function (event) {
                this.calcMouse(event);
                if (this._selected == null)
                    return;
                var placeMeshes = this._house.getPlaceMeshes(this._selected);
                if (placeMeshes.length == 0)
                    return;
                var intersects = this._transform.intersectObjects(this._mouse, placeMeshes);
                if (intersects.length > 0) {
                    var intersect = intersects[0];
                    this._house.dragging(intersect);
                    this._domElement.style.cursor = 'move';
                }
            };
            DragControls.prototype.handMouseUp = function (event) {
                this._offset.set(0, 0);
                if (this._selected) {
                    this._house.dragEnd();
                    this._selected = undefined;
                    this._domElement.style.cursor = 'auto';
                }
            };
            DragControls.prototype.onMouseDownEvent = function (event) {
                if (this._enabled === false)
                    return;
                event.preventDefault();
                if (event.button == 0) {
                    this.handMouseDown(event);
                }
            };
            DragControls.prototype.onMouseMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                event.preventDefault();
                this.handMouseMove(event);
            };
            DragControls.prototype.onMouseUpEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                if (event.button == 0) {
                    this.handMouseUp(event);
                }
                this.releaseEvent();
            };
            DragControls.prototype.onTouchStartEvent = function (event) {
                if (this._enabled === false)
                    return;
                switch (event.touches.length) {
                    case 1:
                        this.handMouseDown(event.touches[0]);
                        break;
                    default:
                        break;
                }
            };
            DragControls.prototype.onTouchMoveEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                switch (event.touches.length) {
                    case 1:
                        this.handMouseMove(event.touches[0]);
                        break;
                    default:
                        break;
                }
            };
            DragControls.prototype.onTouchEndEvent = function (event) {
                if (this._enabled === false)
                    return;
                if (this.isCapture() === false)
                    return;
                this.handMouseUp(event.touches[0]);
                this.releaseEvent();
                this._domElement.style.cursor = 'auto';
            };
            return DragControls;
        }(Controls.EventControls));
        Controls.DragControls = DragControls;
    })(Controls = House3D.Controls || (House3D.Controls = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Environments;
        (function (Environments) {
            var AmbientLight = (function (_super) {
                __extends(AmbientLight, _super);
                function AmbientLight() {
                    var _this = _super.call(this) || this;
                    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x0f0e0d, 4.2);
                    hemiLight.castShadow = false;
                    _this.add(hemiLight);
                    var light = new THREE.DirectionalLight(0xffffff, 2.6);
                    light.position.set(0, -1, 0);
                    light.castShadow = false;
                    _this.add(light);
                    return _this;
                }
                return AmbientLight;
            }(THREE.Object3D));
            Environments.AmbientLight = AmbientLight;
        })(Environments = Models.Environments || (Models.Environments = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Environments;
        (function (Environments) {
            var Background = (function (_super) {
                __extends(Background, _super);
                function Background() {
                    var _this = _super.call(this) || this;
                    _this.init();
                    return _this;
                }
                Background.prototype.init = function () {
                    var skyGeo = new THREE.SphereBufferGeometry(1500, 32, 15);
                    var textureLoader = new THREE.TextureLoader();
                    var mapBg = textureLoader.load('models/2.jpg');
                    mapBg.wrapS = mapBg.wrapT = THREE.RepeatWrapping;
                    mapBg.needsUpdate = true;
                    var materialBg = new THREE.MeshBasicMaterial({ map: mapBg });
                    var sky = new THREE.Mesh(skyGeo, materialBg);
                    materialBg.side = THREE.BackSide;
                    this.add(sky);
                };
                return Background;
            }(THREE.Object3D));
            Environments.Background = Background;
        })(Environments = Models.Environments || (Models.Environments = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var Models;
    (function (Models) {
        var Environments;
        (function (Environments) {
            var Sun = (function (_super) {
                __extends(Sun, _super);
                function Sun() {
                    var _this = _super.call(this) || this;
                    var sunLight = new THREE.DirectionalLight(0xffffff);
                    sunLight.position.set(250, 600, -1000);
                    sunLight.castShadow = true;
                    sunLight.intensity = 4;
                    var shadowCameraLeft = -2000;
                    var shadowCameraRight = 2000;
                    var shadowCameraTop = 2000;
                    var shadowCameraBottom = -2000;
                    var shadowCameraNear = 50;
                    var shadowCameraFar = 2000;
                    var camera = new THREE.OrthographicCamera(shadowCameraLeft, shadowCameraRight, shadowCameraTop, shadowCameraBottom, shadowCameraNear, shadowCameraFar);
                    sunLight.shadow = new THREE.LightShadow(camera);
                    sunLight.shadow.mapSize.height = 1024;
                    sunLight.shadow.mapSize.width = 1024;
                    _this.add(sunLight);
                    return _this;
                }
                return Sun;
            }(THREE.Object3D));
            Environments.Sun = Sun;
        })(Environments = Models.Environments || (Models.Environments = {}));
    })(Models = House3D.Models || (House3D.Models = {}));
})(House3D || (House3D = {}));
var House3D;
(function (House3D) {
    var SceneEditor;
    (function (SceneEditor) {
        var DesignEditor = (function () {
            function DesignEditor() {
                this.ViewState = { TOPVIEW: 1, OVERVIEW: 2, INHOMEVIEW: 3 };
                this._clock = new THREE.Clock();
            }
            DesignEditor.prototype.run = function () {
                this.animate();
            };
            DesignEditor.prototype.init = function (container, width, height, pixelRatio) {
                this.initScene();
                this.initCamera(width, height);
                this.initRenderer(width, height, pixelRatio);
                this.initHouseScene(container);
                this.intiControls(container);
                this.overView();
                container.appendChild(this._renderer.domElement);
            };
            DesignEditor.prototype.initRenderer = function (width, height, pixelRatio) {
                this._renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    alpha: true,
                    preserveDrawingBuffer: true
                });
                this._renderer.gammaInput = true;
                this._renderer.gammaOutput = true;
                this._renderer.physicallyCorrectLights = true;
                this._renderer.shadowMap.enabled = true;
                this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                this._renderer.setPixelRatio(pixelRatio);
                this._renderer.setSize(width, height);
                this._renderer.setClearColor(0x000000, 1.0);
            };
            DesignEditor.prototype.initScene = function () {
                this._scene = new THREE.Scene();
            };
            DesignEditor.prototype.intiControls = function (container) {
                this._viewControls = new House3D.SceneEditor.Controls.ViewControls(this._house, this._renderer.domElement);
                this._transformControls = new THREE.TransformControls(this._perspectiveCamera, this._renderer.domElement);
                this._transformControls.setHouse(this._house);
                this._scene.add(this._transformControls);
                this._dragItemControls = new SceneEditor.Controls.DragItemControls(this._transform, this._renderer.domElement);
                this._dragItemControls.setHouse(this._houseScene);
                this._eventMonitor = new House3D.Controls.EventMonitor(this._renderer.domElement);
                this._objectControls = new House3D.Controls.ObjectControls(this._transform, this._perspectiveCamera, container);
                this._eventMonitor.addEventListener(this._objectControls);
                this._scene.add(this._objectControls.getObject());
                this._house.setControls(this._objectControls);
                this._dragControls = new House3D.Controls.DragControls(this._transform, this._renderer.domElement);
                this._eventMonitor.addEventListener(this._dragControls);
                this._dragControls.setHouse(this._house);
                this._overViewControls = new House3D.Controls.OrbitControls(this._perspectiveCamera, this._renderer.domElement);
                this._eventMonitor.addEventListener(this._overViewControls);
                this._topViewControls = new House3D.Controls.TopViewControls(this._orthographicCamera, this._renderer.domElement);
                this._eventMonitor.addEventListener(this._topViewControls);
                this._topViewControls.unable();
                this._moveControls = new House3D.Controls.MoveControls(this._moveCamera, this._renderer.domElement);
                this._eventMonitor.addEventListener(this._moveControls);
                this._moveControls.unable();
                this._moveControls.setHouse(this._house);
                this._scene.add(this._moveControls.getObject());
                this._rockerControls = new House3D.Controls.RockerControls(container);
                this._rockerControls.setMoveControl(this._moveControls);
                this._rockerControls.unable();
            };
            DesignEditor.prototype.initCamera = function (width, height) {
                this._orthographicCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -500, 1000);
                this._orthographicCamera.position.set(0, 100, 0);
                this._perspectiveCamera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
                this._perspectiveCamera.position.set(0, 1000, 0);
                this._moveCamera = new THREE.PerspectiveCamera(60, width / height, 1, 5000);
                this._moveCamera.position.set(0, 0, 0);
                var dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
                dirLight.position.set(10, 10, 10).normalize();
                this._moveCamera.add(dirLight);
                this._moveCamera.add(dirLight.target);
                this._scene.add(this._moveCamera);
            };
            DesignEditor.prototype.initStats = function (container) {
                this._stats = new Stats();
                container.appendChild(this._stats.dom);
            };
            DesignEditor.prototype.initHouseScene = function (container) {
                this._transform = new House3D.Transform(container, this._camera);
                this._events = new SceneEditor.Events.RegisterEvents();
                this._house = new SceneEditor.Houses.House(container, this._transform);
                this._house.registerEvents(this._events);
                this._houseScene = new SceneEditor.Houses.HouseScene(this._scene, this._house);
            };
            DesignEditor.prototype.animate = function () {
                var _this = this;
                requestAnimationFrame(function () { return _this.animate(); });
                this.render();
            };
            DesignEditor.prototype.render = function () {
                var delta = this._clock.getDelta();
                if (this._moveControls.isEnable()) {
                    this._moveControls.update(delta);
                    this._rockerControls.update(delta);
                }
                if (this._stats)
                    this._stats.update();
                this._renderer.render(this._scene, this._camera);
            };
            DesignEditor.prototype.resize = function (width, height) {
                if (this._viewState == this.ViewState.OVERVIEW) {
                    this._perspectiveCamera.aspect = width / height;
                    this._perspectiveCamera.updateProjectionMatrix();
                }
                else if (this._viewState == this.ViewState.INHOMEVIEW) {
                    this._moveCamera.aspect = width / height;
                    this._moveCamera.updateProjectionMatrix();
                }
                else if (this._viewState == this.ViewState.TOPVIEW) {
                    this._orthographicCamera.left = window.innerWidth / -2;
                    this._orthographicCamera.right = window.innerWidth / 2;
                    this._orthographicCamera.top = window.innerHeight / 2;
                    this._orthographicCamera.bottom = window.innerHeight / -2;
                    this._orthographicCamera.updateProjectionMatrix();
                }
                this._renderer.setSize(width, height);
                this._width = width;
                this._height = height;
            };
            DesignEditor.prototype.getHouseScene = function () {
                return this._houseScene;
            };
            DesignEditor.prototype.getEvents = function () {
                return this._events;
            };
            DesignEditor.prototype.getHouse = function () {
                return this._house;
            };
            DesignEditor.prototype.changeCamera = function (camera) {
                this._camera = camera;
                this._transform.changeCamera(this._camera);
                this._objectControls.changeCamera(this._camera);
                this._transformControls.changeCamera(this._camera);
            };
            DesignEditor.prototype.inHomeView = function () {
                this._viewState = this.ViewState.INHOMEVIEW;
                this._topViewControls.unable();
                this._overViewControls.unable();
                this._moveControls.enable();
                this._rockerControls.enable();
                this._scene.add(this._moveControls.getObject());
                this.changeCamera(this._moveCamera);
                this._houseScene.displayBackground();
                this.resize(this._width, this._height);
            };
            DesignEditor.prototype.topView = function () {
                this._viewState = this.ViewState.TOPVIEW;
                this._overViewControls.unable();
                this._moveControls.unable();
                this._rockerControls.unable();
                this._topViewControls.enable();
                this.changeCamera(this._orthographicCamera);
                this._houseScene.hiddenBackground();
                this.resize(this._width, this._height);
                this.pickupLock(false);
            };
            DesignEditor.prototype.overView = function () {
                this._viewState = this.ViewState.OVERVIEW;
                this._topViewControls.unable();
                this._moveControls.unable();
                this._rockerControls.unable();
                this._overViewControls.enable();
                this._scene.remove(this._moveControls.getObject());
                this.changeCamera(this._perspectiveCamera);
                this._houseScene.hiddenBackground();
                this.resize(this._width, this._height);
                this.pickupLock(false);
            };
            DesignEditor.prototype.saveImage = function (filename) {
                var canvas = this._renderer.domElement;
                var imageData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream;");
                var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                save_link.href = imageData;
                save_link.download = filename;
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
            };
            DesignEditor.prototype.shadowEnable = function () {
                this._renderer.shadowMap.enabled = true;
                this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                this._houseScene.showSun();
            };
            DesignEditor.prototype.shadowUnable = function () {
                this._renderer.shadowMap.enabled = false;
                this._houseScene.hideSun();
            };
            DesignEditor.prototype.save = function () {
                var houseSave = new SceneEditor.Loaders.HouseSave();
                return houseSave.save(this._house);
            };
            DesignEditor.prototype.preItemAdd = function (item) {
                this._renderer.domElement.focus();
                this._houseScene.addPreItem(item);
                this._dragItemControls.enable();
            };
            DesignEditor.prototype.displayStorey = function (floor) {
                this._houseScene.displayStorey(floor);
                this._moveControls.setHeightLevel(floor);
            };
            DesignEditor.prototype.pickupLock = function (lock) {
                if (lock)
                    this._dragControls.unable();
                else
                    this._dragControls.enable();
            };
            DesignEditor.prototype.transformStartup = function (startup) {
                this._house.unDrag();
                if (startup) {
                    this._house.setControls(this._transformControls);
                }
                else {
                    this._house.setControls(this._objectControls);
                }
            };
            DesignEditor.prototype.translateMode = function () {
                this._transformControls.setMode("translate");
                this._transformControls.setSpace("world");
            };
            DesignEditor.prototype.rotateMode = function () {
                this._transformControls.setMode("rotate");
                this._transformControls.setSpace("world");
            };
            DesignEditor.prototype.scaleMode = function () {
                this._transformControls.setMode("scale");
            };
            return DesignEditor;
        }());
        SceneEditor.DesignEditor = DesignEditor;
    })(SceneEditor = House3D.SceneEditor || (House3D.SceneEditor = {}));
})(House3D || (House3D = {}));
