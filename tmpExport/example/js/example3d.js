var CommonUrl = 'http://101.132.176.37:8059';
// var CommonUrl = 'http://192.168.0.128:8081';

var editor = new House3D.SceneEditor.DesignEditor();

var container = document.getElementById('container');

editor.init(container, window.innerWidth, window.innerHeight, window.devicePixelRatio);

var scene = editor.getHouseScene();
// scene.setHouseType("20", HouseModels);

editor.run();

var events = editor.getEvents();
events.buildEvents = new buildEvents();
events.itemEvents = new itemEvents();

// editor.shadowEnable();
// editor.topView();
//getCase(280);
// setTimeout(addCase, 1000);

window.addEventListener("resize", function () {

  editor.resize(window.innerWidth, window.innerHeight);
});

// addItem1();
function addItem1() {
  var metadata = { uuid: "2DFEAC32-2568-40B4-842F-34853FB66F01", model: "models/zhiwu.json", position: { x: 0, y: 0, z: 0 } };

  var url = 'models/zhiwu.json';
  var loader = new THREE.FileLoader();
  loader.load(url, function (itemJson) {

    metadata.model = url;

    var data = {
      "model": JSON.parse(itemJson),
      "metadata": metadata
    };
    var loader = new House3D.SceneEditor.Loaders.ModelLoader();
    var item = loader.createItem(data);

    scene.addItem(item);
  });
}
var b =false;
document.addEventListener("keydown", function (event) {

  switch (event.keyCode) {

    case 73: editor.topView();//I
      break;
    case 79: editor.overView();//O
      break;
    case 80: editor.inHomeView();//P
      break;

    case 74: saveCase();//J
      break;
    case 75: addItem();//K
      // case 75: scene.clearItem();//K
      break;
    case 76: editor.saveImage('a.jpg');//L
      break;

    case 66: combination();//B
      // case 66: translate();//B
      // case 66: editor.displayStorey(0);//B
      break;
    //case 77: scene.combination();
    case 77: editor.displayStorey(1);//M
      break;
    //case 78: scene.separation();
    case 78: editor.displayStorey(2);//N
      break;
    case 90: 
      b=!b;
      editor.transformStartup(b);//Z
      break;
    case 88: editor.translateMode();//X
      break;
    case 67: editor.rotateMode();//C
      break;
    case 86: editor.scaleMode();//V
      break;

  }
});

function itemEvents() {
  this.selectEvent = function (metadata) {
    console.log('select');
  }

  this.deleteEvent = function (metadata) {
    console.log('delete');
    scene.removeItem(metadata);
  }

  this.modifyColorEvent = function (metadata) {
    console.log('modifyColor');

    var url = 'models/zhiwu.json';
    var loader = new THREE.FileLoader();
    loader.load(url, function (itemJson) {

      metadata.model = url;

      var data = {
        "model": JSON.parse(itemJson),
        "metadata": metadata
      };
      var loader = new House3D.SceneEditor.Loaders.ModelLoader();
      var item = loader.createItem(data);

      scene.itemModifyModel(metadata, item);
    });
  }

  this.modifyModelEvent = function (metadata) {
    console.log('modifyModel');

    var url = 'models/zhiwu.json';
    var loader = new THREE.FileLoader();
    loader.load(url, function (itemJson) {

      metadata.model = url;
      var data = {
        "model": JSON.parse(itemJson),
        "metadata": metadata
      };
      console.log(metadata);
      var loader = new House3D.SceneEditor.Loaders.ModelLoader();
      var item = loader.createItem(data);

      scene.itemModifyModel(metadata, item);
    });

  }

  this.copyModelEvent = function (metadata) {
    scene.copyItem(metadata);
  }

  this.combinationEvent = function (metadata) {
    var group = scene.combination();
    scene.combinationCancel();
    bCombination = false;
    console.log(group.getMetadata());
    console.log(group.getChildrenMetadata());
  }

  this.separationEvent = function (metadata) {
    scene.separation();
  }

  this.detailEvent = function (metadata) {
    console.log('detail');
  }
}

function buildEvents() {
  this.selectEvent = function (metadata) {
    console.log('select');
  }

  this.modifyColorEvent = function (metadata) {
    console.log('modifyColor');

    buildModifyColor(metadata);
  }

  this.detailEvent = function (metadata) {
    console.log('detail');
  }
}


function preAddItem() {
  console.log('preAddItem');

  //addItem({ uuid: "595CAB13-5CF6-45E4-B0E4-7256A8677C9D", model: "B6D1E40A-D008-4345-A33D-FC9440DA0EBD", position: { x: 0, y: 100, z: 0 }, rotation: { x: 0, y: 0, z: 0 } });

  var group = { "itemList": [{ "uuid": "C4265C12-8274-4C72-9B19-5314F557E2F8", "model": "A7211538-20C5-4E7B-9E3B-5AA2D8C2C272", "position": { "x": -41.14990053378756, "y": 0, "z": -1.9998103816179196 }, "rotation": { "x": 0, "y": 84.0579712298291, "z": 0 } }, { "uuid": "5840F709-0555-4123-A0C1-FF2F8675A885", "model": "027C4048-150D-47EF-B641-EF2E9627C9E7", "position": { "x": 41.14990053378756, "y": 2.2737367544323207e-14, "z": 1.9998103816178912 }, "rotation": { "x": 0, "y": 0, "z": 0 } }], "group": { "uuid": "F3A76BB4-794D-44BC-BA23-C7D12FC5C4CE", "position": { "x": 0, "y": 0, "z": 0 }, "rotation": { "x": 0, "y": 0, "z": 0 } } };

  var items = group.itemList;

  var loader = new House3D.SceneEditor.Loaders.ModelLoader();
  var itemGroup = loader.createItemGroup(group.group);

  var iGroup = {
    "itemGroup": itemGroup,
    "length": items.length
  };
  for (var i = 0; i < items.length; i++) {
    addItempre(items[i], iGroup);
  }
}

function addCase(house) {
  // var res = { "buildList": [{ "materialId": "4814", "uuid": "B0691046-263B-4328-AD37-757A54857AC8", "model": "models/house2/house/floor1/1-diban.json", "position": { "x": 0, "y": 0, "z": 0 }, "rotation": { "x": 0, "y": 0, "z": 0 } }, { "materialId": "4814", "uuid": "E7A08AB2-6147-4FE5-A1C5-0B7DD54FA2DC", "model": "models/house2/house/floor1/1_qiang.json", "position": { "x": 0, "y": 0, "z": 0 }, "rotation": { "x": 0, "y": 0, "z": 0 } }], "itemList": [{ "uuid": "759FF02E-5D89-4262-87EF-D97B675545D5", "model": "A7211538-20C5-4E7B-9E3B-5AA2D8C2C272", "position": { "x": 275.0368028800553, "y": 8, "z": 151.5815084698377 }, "rotation": { "x": 0, "y": 84.05797122982916, "z": 0 }, "scale": { "x": 0.1, "y": 0.1, "z": 0.1 } }, { "uuid": "94C2CB4E-E478-44FB-8E60-2AEDB0826C23", "model": "027C4048-150D-47EF-B641-EF2E9627C9E7", "position": { "x": 520.1740637879838, "y": 8, "z": 121.60254629890895 }, "rotation": { "x": 0, "y": 0, "z": 0 }, "scale": { "x": 0.1, "y": 0.1, "z": 0.1 } }], "groupList": [{ "itemList": [{ "uuid": "ACD841D3-4CA7-40B2-887B-72FEB593B99B", "model": "A7211538-20C5-4E7B-9E3B-5AA2D8C2C272", "position": { "x": -41.14990053378756, "y": 0, "z": -1.9998103816179196 }, "rotation": { "x": 0, "y": 84.0579712298291, "z": 0 }, "scale": { "x": 0.1, "y": 0.1, "z": 0.1 } }, { "uuid": "CBC29B0C-A185-47E7-A37E-DFC12395A18F", "model": "027C4048-150D-47EF-B641-EF2E9627C9E7", "position": { "x": 41.14990053378756, "y": 2.2737367544323207e-14, "z": 1.9998103816178912 }, "rotation": { "x": 0, "y": 0, "z": 0 }, "scale": { "x": 0.1, "y": 0.1, "z": 0.1 } }], "group": { "uuid": "DEDF4488-4264-4D69-8A5D-8D107C7F2C12", "position": { "x": 469.09411928734164, "y": 0, "z": 384.8824652602257 }, "rotation": { "x": 0, "y": 0, "z": 0 }, "scale": { "x": 1, "y": 1, "z": 1 } } }], "houseType": { "id": "20", "uuid": "D758DBC5-E4DD-40E8-921C-CE65E04F2939" } };
  // house = res;

  //console.log(house);

  getHouseType(house.houseType.id);

  addCaseItems(house);
}

function addCaseItems(house) {
  var itemList = house.itemList;
  for (var i = 0; i < itemList.length; i++) {
    addItem(itemList[i]);
  }

  var groups = house.groupList;
  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      addGroup(groups[i]);
    }
  }

  var builds = house.buildList;
  if (builds) {
    for (var i = 0; i < builds.length; i++) {
      var metadata = builds[i];

      modifyMaterial(metadata);
    }
  }
}

function buildModifyColor(metadata) {
  var newMaterial = '{"materials":[{"uuid":"6A4F6887-1BC4-4CB9-B7CE-A4CBEFE012E8","type":"MeshStandardMaterial","color":16777215,"roughness":0.7,"metalness":0.4,"emissive":0,"bumpScale":1,"opacity":1,"transparent":true,"normalScale":[1,1],"displacementScale":1,"displacementBias":0,"depthFunc":3,"depthTest":true,"depthWrite":true,"map":"03B0D75E-0C31-42BB-96FF-B09E07D4E9EA","normalMap":"D0EBEDD9-0423-4044-9B29-FF905B692AD7"}],"textures":[{"uuid":"03B0D75E-0C31-42BB-96FF-B09E07D4E9EA","name":"","mapping":305,"repeat":[1,1],"offset":[0,0],"wrap":[null,null],"minFilter":1008,"magFilter":1006,"anisotropy":1,"flipY":true,"image":"BD198FB2-40EF-4B26-88AA-B5E695E81D7E"},{"uuid":"D0EBEDD9-0423-4044-9B29-FF905B692AD7","name":"","mapping":305,"repeat":[1,1],"offset":[0,0],"wrap":[null,null],"minFilter":1008,"magFilter":1006,"anisotropy":1,"flipY":true,"image":"14ACD7EE-C751-4AD3-928A-3D58909F9A30"}],"images":[{"uuid":"BD198FB2-40EF-4B26-88AA-B5E695E81D7E","url":"http://djitemhd.oss-cn-shanghai.aliyuncs.com/18c52871-bf5c-43cc-a32b-3e39b18599de.jpeg"},{"uuid":"14ACD7EE-C751-4AD3-928A-3D58909F9A30","url":"http://djitemhd.oss-cn-shanghai.aliyuncs.com/18c52871-bf5c-43cc-a32b-3e39b18599de.jpeg"}]}';

  var loader = new House3D.SceneEditor.Loaders.MaterialLoader();
  var material = loader.parse(newMaterial);

  scene.buildModifyColor(metadata, "4814", material);
}

function getHouseType(id) {
  var data = {
    Id: id
  };

  $.post(CommonUrl + "/api/housetype/select",
    data,
    function (res) {
     // console.log(res);
      var data = res.Data.HouseTypeJson;
    //   var housetype = JSON.parse(data);
    //   scene.setHouseType(id, housetype);

      addItem({ uuid: "595CAB13-5CF6-45E4-B0E4-7256A8677C9D", model: "595CAB13-5CF6-45E4-B0E4-7256A8677C9D", position: { x: 0, y: 100, z: 0 }, rotation: { x: 0, y: 0, z: 0 } });
    });
}

function getCase(Id) {
  var data = {
    id: Id
  };

  $.post(CommonUrl + "/api/case/getcase",
    data,
    function (res) {
      // console.log(JSON.parse(res.Data.CaseJson));

      addCase(JSON.parse(res.Data.CaseJson));
    });
}

function getGeometry(itemJson, metadata, geoId) {
  var data = {
    id: geoId
  };

  $.post(CommonUrl + "/api/item/getgeometry",
    data,
    function (res) {
      var GeometryJson = res.Data.GeometryJson;
      itemJson.geometries = JSON.parse(res.Data.GeometryJson);
      // console.log(itemJson);

      var data = {
        "model": itemJson,
        "metadata": metadata
      };
      var loader = new House3D.SceneEditor.Loaders.ModelLoader();
      var item = loader.createItem(data);

      item.position.copy(metadata.position);
      item.rotation.x = metadata.rotation.x * Math.PI / 180;
      item.rotation.y = metadata.rotation.y * Math.PI / 180;
      item.rotation.z = metadata.rotation.z * Math.PI / 180;

      scene.addItem(item);
    });
}

function addItem(metadata) {

  var uid = metadata.model;

  var data = {
    uuid: uid
  };

  $.post(CommonUrl + "/api/item/select",
    data,
    function (res) { //console.log(res);
      var itemdetail = res.Data;
      if (!res.Data.ItemJson)
        return;

      var itemJson = JSON.parse(res.Data.ItemJson);
      // console.log(itemJson);
      var geoId = itemJson.geometries;
      getGeometry(itemJson, metadata, geoId);

    });
}

function getGeometrypre(itemJson, metadata, geoId, group) {
  var data = {
    id: geoId
  };

  $.post(CommonUrl + "/api/item/getgeometry",
    data,
    function (res) {
      var GeometryJson = res.Data.GeometryJson;
      itemJson.geometries = JSON.parse(res.Data.GeometryJson);
      // console.log(itemJson);

      var data = {
        "model": itemJson,
        "metadata": metadata
      };

      var loader = new House3D.SceneEditor.Loaders.ModelLoader();
      var item = loader.createItem(data);

      group.itemGroup.add(item);
      group.length--;

      if (group.length == 0) {
        editor.preItemAdd(group.itemGroup);
      }
    });
}

function addItempre(metadata, group) {

  var uid = metadata.model;

  var data = {
    uuid: uid
  };

  $.post(CommonUrl + "/api/item/select",
    data,
    function (res) {
      var itemdetail = res.Data;
      if (!res.Data.ItemJson)
        return;

      var itemJson = JSON.parse(res.Data.ItemJson);

      var geoId = itemJson.geometries;
      getGeometrypre(itemJson, metadata, geoId, group);

    });
}

function modifyMaterial(metadata) {

  var data = {
    UUID: metadata.materialId
  };
  $.post(CommonUrl + "/api/material/select",
    data,
    function (res) {
      var json = res.Data.MaterialJson;

      var loader = new House3D.SceneEditor.Loaders.MaterialLoader();
      json.side = THREE.BackSide;
      var material = loader.parse(json);
      // console.log(material);
      scene.buildModifyColor(metadata, metadata.materialId, material);

    })
}

var bCombination = false;
function combination() {
  bCombination = !bCombination;

  if (bCombination)
    scene.combinationStart();
  else
    scene.combinationCancel();
}

var bTranslate = false;
function translate() {
  bTranslate = !bTranslate;

  if (bTranslate)
    editor.translateStart();
  else
    editor.translateEnd();
}

function saveCase() {
  let caselist = editor.save();
  var data = {
    CaseJson: JSON.stringify(caselist)
  }

  console.log(data.CaseJson);

  // $.post(CommonUrl + "/api/case/add",
  //   data,
  //   function (res) {
  //     alert(res.Message);
  //   });
}

function addGroup(group) {
  var items = group.itemList;

  var loader = new House3D.SceneEditor.Loaders.ModelLoader();
  var itemGroup = loader.createItemGroup(group.group);

  var iGroup = {
    "itemGroup": itemGroup,
    "length": items.length
  };
  for (var i = 0; i < items.length; i++) {
    addItemg(items[i], iGroup);
  }
}

window.onload = function () {
  editor.resize(window.innerWidth, window.innerHeight);
}