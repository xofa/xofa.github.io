

$(document).ready(function() {

  //禁用系统默认右键菜单
  $(document).bind("contextmenu",
      function(){
          return false;
      }
  );



  // main setup
  var opts = {
    canvasId: 'canvas2d',
    roomImgId: "roomBkg",
    wallSettingDivId: 'wallSetting',
    roomSettingDivId: 'roomSetting',

  }
  var engine = new IMAPIC2D.Engine(opts);
  new viewer(engine).init();

  var load = new loadControl(engine);
  load.newDesign();

  // engine.setPixelsPerCm(0.7);
  engine.handle.updatePixelsPerCm();
  engine.draw();





  $('#roomSetting a').click( function(){
    engine.setRoomName($(this).text());
  });

  $('#roomSettingClose').click(function(){
    $('#roomSetting').css('display','none');
  });


        

  $('#update-floorplan').click(function(){

    $('#floorplanner').hide();
    $('#viewer').show();
    var str = engine.floorplan.convertTo3d();
    // var imapic3d = new IMAPIC3D.Engine($('#viewer')[0],window.innerWidth,window.innerHeight,window.devicePixelRatio);
    // imapic3d.init();
    // imapic3d.loadFrom2D(str);

    linkTo3d(str,engine);
  });








var ModelScence = function () {
  var room;
  init();
  function init() {
    var storey = new House3D.Houses.Storey();
    room = new House3D.Houses.Room();

    storey._floor = 1;
    storey.addRoom(room);
    scene.getHouse().addStorey(storey);

  }

  var arr=[];
  function addModel(mesh, type) {
    for(var i = 0; i < arr.length; i++){
      if(arr[i] == mesh.uuid)
      {
        mesh.uuid=mesh.uuid+"_2";
        //console.log("wall:"+mesh.uuid);
        break;
      }
    }

    let obj = House3D.Models.ModelFactory.build(type);
    obj.add(mesh);

    //obj.uuid = mesh.uuid;

    let metadata = { "uuid": "", "model": "", "materialId": "" };
    obj.setMetadata(metadata);

    scene.addModel(obj);
    room.addObject(obj);

    arr.push(mesh.uuid);
  }

  // var geometry = new THREE.BoxGeometry(300,300,300);
  // var mat = new THREE.MeshBasicMaterial({color:0xff0000});
  // // addModel(new THREE.Mesh(geometry,mat), 'Floor');
  // scene.addModel(new THREE.Mesh(geometry,mat));
  // console.log(scene);

  this.addWall = function (mesh) {
    // console.log(mesh)
    // scene.add(mesh);

    addModel(mesh, 'Wall');
    addModel(mesh, 'HangWall');
  }
  this.removeWall = function (mesh) { console.log(2) }

  this.addRoof = function (mesh) {
    console.log(mesh)
    //scene.add(mesh);
    
    addModel(mesh, 'Roof');
  }
  this.removeRoof = function (mesh) { console.log(4) }

  this.addFloor = function (mesh) {
    console.log(mesh)
    scene.add(mesh);
    
    addModel(mesh, 'Floor');
  }
  this.removeFloor = function (mesh) { console.log(6) }

  this.addDoor = function(metadata) {
    console.log(metadata)
    addItem(metadata);
  }
  this.removeDoor = function(metadata) {
    console.log(8)
  }
  this.addWindow = function(metadata) {
    console.log(metadata)
    addItem(metadata);
  }
  this.removeWindow = function(metadata) {
    console.log(10)
  }
}


function linkTo3d(str,engine2d) {

  // console.log(str);

  var editor = new House3D.SceneEditor.DesignEditor();
  var container = document.getElementById('container');
  editor.init(container, window.innerWidth, window.innerHeight, window.devicePixelRatio);
  var scene = editor.getHouseScene();
  editor.run();

  // editor.inHomeView();
  // scene.setHouseType("20", HouseModels);
  //init 
  var storey = new House3D.Houses.Storey();
  var room = new House3D.Houses.Room();
  storey._floor = 1;
  storey.addRoom(room);
  scene.getHouse().addStorey(storey);


  // var  texture = new THREE.TextureLoader().load('images/1.png',function(){
  //    var material = new THREE.SpriteMaterial( { map: texture } );
  //   var shopItem = new THREE.Sprite( material );
  //   // shopItem.center.set( 0.0, 0.0 );
  //   shopItem.scale.set( texture.image.width, texture.image.height, 1 );
  //   scene.add( shopItem );
  // }); //
 


  var generator = new IMAPIC3D.RoomGenerator(undefined,true);



  var arr=[];
  function addModel(mesh, type) {
    for(var i = 0; i < arr.length; i++){
      if(arr[i] == mesh.uuid)
      {
        mesh.uuid=mesh.uuid+"_2";
        //console.log("wall:"+mesh.uuid);
        break;
      }
    }

    let obj = House3D.Models.ModelFactory.build(type);
    obj.add(mesh);

    //obj.uuid = mesh.uuid;

    let metadata = { "uuid": "", "model": "", "materialId": "" };
    obj.setMetadata(metadata);

    scene.addModel(obj);
    room.addObject(obj);

    arr.push(mesh.uuid);

  }

  //parse
  var data = JSON.parse(str);
  if(data == null || !('walls' in data) ) {return;}

  // var tex = generator.loadTexture('texture/1.jpg');
  // generator.setGroundTexture(tex,4);
  var loader = new House3D.SceneEditor.Loaders.ModelLoader();

  var inWallsJson = data['inWalls'];
  inWallsJson.forEach((item)=>{
    loadItem(loader,item['uuid'],item['matrix'],addModel);
  });

  data['walls'].forEach((wall)=>{
    var _inWallsArray = [];
    for (var i = inWallsJson.length - 1; i >= 0; i--) {
      if(inWallsJson[i]['wallId'] == wall.id){ _inWallsArray.push(inWallsJson[i]); }
    }
    generator.generateWall(undefined,wall,_inWallsArray,addModel);
  });

  var centerArray = [];
  if(!('rooms' in data) ) {return;}
  data['rooms'].forEach((room)=>{
    var center = generator.generateRoom(room,addModel);
    centerArray.push(new THREE.Vector2(center.x,center.y));
  });

  var totalCenter = new THREE.Vector2();
  for (var i = 0; i < centerArray.length ; i++) {
    totalCenter.add(centerArray[i]);
  }
  totalCenter.divideScalar(centerArray.length);

  var control = editor._overViewControls;
  control.target.set(totalCenter.x,140,totalCenter.y);
  control.update();
  // editor._scene.position.sub(center.x,0,center.y);


  window.addEventListener("orientationchange", function() { 
    editor.resize(window.innerWidth, window.innerHeight);
  }, false); 
  
  window.addEventListener("resize", function () {
    editor.resize(window.innerWidth, window.innerHeight);
  });
  editor.resize(window.innerWidth, window.innerHeight);


}

function loadItem(loader,id,matrix,callback){
  
  var token = 'A72HjL/ix79l9M1uqGH7SfXhdNtqM81XaRfaTAeXz/2X4p+qW68O1g==';
  // var url = "http://192.168.0.130:8088/api/item/getitemgeometry" ; //获取物件
  var url = "http://101.132.176.37:8054/api/item/getitemgeometry" ; //获取物件

  $.get(url, {UUID: id,Token:token}, function(data,status){
        // console.log(data);
    var res = data.Data;

    var itemJson = JSON.parse(res.ItemJson);
    itemJson.geometries = JSON.parse(res.GeometryJson);

    var metadata = {
      uuid: itemJson.geometries.UUID,
      model: itemJson.geometries.UUID,
      position: {x: 0,y: 0,z: 0}
    };
    
    var data = {
      model: itemJson,
      metadata: metadata
    };
    loader.createItem1(data,function(item){
      // console.log(item);
      var box = new THREE.Box3().setFromObject(item);
      // console.log(box);
      item.matrix.identity();
      item.applyMatrix(matrix);
      item.scale.set(0.1,0.1,0.1);
      // group.addItem(item);//,
      callback(item,'InWallItem');
    });

  });
}


function loadControl(engine) {

  var floorplan = engine.floorplan;
  this.newDesign = function() {

    var data = '{"floorplan":{"corners":[{"id":"5bfbaf14-80f1-39da-dcc8-e741d6dd09c9","x":-406.272541949217,"y":594.0196016917242},{"id":"2240b9d9-4208-77e8-9996-b208790b1270","x":762.7274580507831,"y":594.0196016917242},{"id":"bd5d4811-e779-26aa-2fb5-827f114dfb08","x":762.7274580507831,"y":-474.98039830827577},{"id":"05dc1caf-dd2e-af51-3b42-84991ec21bf7","x":-406.272541949217,"y":-474.98039830827577},{"id":"2f0709c5-c3b8-d183-8710-d9f7a6632f85","x":-89.61894307703312,"y":-474.98039830827577},{"id":"93c7c819-b727-4516-173c-0f435f3d66d7","x":-89.61894307703312,"y":-18.980398308275767},{"id":"c44ad175-091f-808a-e8b6-b2837968ccc8","x":-406.272541949217,"y":-18.980398308275767},{"id":"5bf9fd15-7826-0096-27d2-a902d82d01ba","x":-209.11086717974405,"y":-18.980398308275767},{"id":"9aded034-0a9e-b1ec-cfe0-49d7f5c0df7f","x":-406.272541949217,"y":276.0196016917242},{"id":"36883d2b-75c4-edad-64f6-dd81928ca39f","x":-209.11086717974405,"y":276.0196016917242},{"id":"158b032c-b50e-e97a-8ac4-75dc71e20850","x":232.88913282025607,"y":594.0196016917242},{"id":"96137e1d-cc0e-2875-0ca5-bb266c7b00e9","x":232.8891328202559,"y":276.0196016917242},{"id":"34b78b6f-9460-71c4-4314-568aac778229","x":232.8891328202559,"y":160.01960169172418},{"id":"c200ec67-4b92-1a3a-2415-9ef14d354d19","x":762.7274580507831,"y":160.01960169172418},{"id":"c0893a91-ef23-fbfd-8f38-fcc8b49c299f","x":523.7729339835494,"y":-474.98039830827577},{"id":"ba1876a6-ec4d-1361-a57b-bcb8ea509511","x":523.7729339835494,"y":160.01960169172418}],"walls":[{"id":"d92ec250-d50c-e047-343b-b9327277a213","thickness":24,"cornerIndex":["05dc1caf-dd2e-af51-3b42-84991ec21bf7","c44ad175-091f-808a-e8b6-b2837968ccc8"]},{"id":"80ff6f07-44d0-6ddf-515c-b59a742cf58e","thickness":24,"cornerIndex":["5bfbaf14-80f1-39da-dcc8-e741d6dd09c9","158b032c-b50e-e97a-8ac4-75dc71e20850"]},{"id":"f09e3613-cd0d-f3b8-3646-6d66a3fe3871","thickness":24,"cornerIndex":["2240b9d9-4208-77e8-9996-b208790b1270","c200ec67-4b92-1a3a-2415-9ef14d354d19"]},{"id":"36e0e0ff-6ab5-4076-f5a3-268746d204ad","thickness":24,"cornerIndex":["bd5d4811-e779-26aa-2fb5-827f114dfb08","c0893a91-ef23-fbfd-8f38-fcc8b49c299f"]},{"id":"c779a011-e261-9c1c-e653-0d9f9d0e191b","thickness":24,"cornerIndex":["2f0709c5-c3b8-d183-8710-d9f7a6632f85","05dc1caf-dd2e-af51-3b42-84991ec21bf7"]},{"id":"64ac22eb-07f6-cd91-1bd4-f35e52ba1e26","thickness":24,"cornerIndex":["2f0709c5-c3b8-d183-8710-d9f7a6632f85","93c7c819-b727-4516-173c-0f435f3d66d7"]},{"id":"53c68364-77cf-f00d-149c-5770fff02dc2","thickness":24,"cornerIndex":["c44ad175-091f-808a-e8b6-b2837968ccc8","9aded034-0a9e-b1ec-cfe0-49d7f5c0df7f"]},{"id":"590e69c6-8dd8-f043-3c07-a58c08b00477","thickness":24,"cornerIndex":["93c7c819-b727-4516-173c-0f435f3d66d7","5bf9fd15-7826-0096-27d2-a902d82d01ba"]},{"id":"0b441091-7799-776d-228d-6bd3300686b5","thickness":24,"cornerIndex":["5bf9fd15-7826-0096-27d2-a902d82d01ba","c44ad175-091f-808a-e8b6-b2837968ccc8"]},{"id":"0d2f591c-fc27-f0be-0f1c-2bdd5b257dea","thickness":24,"cornerIndex":["5bf9fd15-7826-0096-27d2-a902d82d01ba","36883d2b-75c4-edad-64f6-dd81928ca39f"]},{"id":"6fea52e2-4ec1-5b50-4194-ddb81375b118","thickness":24,"cornerIndex":["9aded034-0a9e-b1ec-cfe0-49d7f5c0df7f","5bfbaf14-80f1-39da-dcc8-e741d6dd09c9"]},{"id":"940ce1d9-d3e7-3756-ff74-05dcb2fb41d6","thickness":24,"cornerIndex":["36883d2b-75c4-edad-64f6-dd81928ca39f","9aded034-0a9e-b1ec-cfe0-49d7f5c0df7f"]},{"id":"4dc43b43-3605-ff2b-d6a6-9dc61801594c","thickness":24,"cornerIndex":["36883d2b-75c4-edad-64f6-dd81928ca39f","96137e1d-cc0e-2875-0ca5-bb266c7b00e9"]},{"id":"7761ccf9-cf21-fa29-2c3a-ff36b7462ad0","thickness":24,"cornerIndex":["158b032c-b50e-e97a-8ac4-75dc71e20850","2240b9d9-4208-77e8-9996-b208790b1270"]},{"id":"dd96a4f9-4880-9a0b-ad52-0dffa06d1de0","thickness":24,"cornerIndex":["96137e1d-cc0e-2875-0ca5-bb266c7b00e9","158b032c-b50e-e97a-8ac4-75dc71e20850"]},{"id":"4767a0fb-a100-2891-d633-ffb086933df3","thickness":24,"cornerIndex":["96137e1d-cc0e-2875-0ca5-bb266c7b00e9","34b78b6f-9460-71c4-4314-568aac778229"]},{"id":"6e7f6032-817e-dd80-459b-878306568d71","thickness":24,"cornerIndex":["c200ec67-4b92-1a3a-2415-9ef14d354d19","bd5d4811-e779-26aa-2fb5-827f114dfb08"]},{"id":"d191e1ca-c377-4a6d-40f8-6231aab90bdc","thickness":24,"cornerIndex":["34b78b6f-9460-71c4-4314-568aac778229","ba1876a6-ec4d-1361-a57b-bcb8ea509511"]},{"id":"e0eb7dfb-1da5-e0e4-4be7-26f4a0702d87","thickness":24,"cornerIndex":["c0893a91-ef23-fbfd-8f38-fcc8b49c299f","2f0709c5-c3b8-d183-8710-d9f7a6632f85"]},{"id":"b3554d0f-b9a0-3a41-a92d-f0f9de11747c","thickness":24,"cornerIndex":["ba1876a6-ec4d-1361-a57b-bcb8ea509511","c200ec67-4b92-1a3a-2415-9ef14d354d19"]},{"id":"b51df2ae-f886-15f4-7f35-78395cbc68b3","thickness":24,"cornerIndex":["c0893a91-ef23-fbfd-8f38-fcc8b49c299f","ba1876a6-ec4d-1361-a57b-bcb8ea509511"]}],"inWalls":[{"id":"fec92043-2c32-6957-ef00-fa2154c8c4f2","wallId":"64ac22eb-07f6-cd91-1bd4-f35e52ba1e26","modelId":0,"offset":230.12439830729633,"length":100.4,"bottom":0,"height":210.2,"type":0},{"id":"d1c27bd2-c567-af5b-5686-f778a722a201","wallId":"0d2f591c-fc27-f0be-0f1c-2bdd5b257dea","modelId":0,"offset":135.48502430841884,"length":100.4,"bottom":0,"height":210.2,"type":0},{"id":"a7929a0e-81b0-21fb-cdcd-f9584364cb54","wallId":"4dc43b43-3605-ff2b-d6a6-9dc61801594c","modelId":0,"offset":227.39886717981724,"length":100.4,"bottom":0,"height":210.2,"type":0},{"id":"d0b8b08f-946f-f509-6bad-360a4120784e","wallId":"d191e1ca-c377-4a6d-40f8-6231aab90bdc","modelId":0,"offset":147.49349224004044,"length":100.4,"bottom":0,"height":210.2,"type":0},{"id":"e44e3c10-f3fc-ed67-0058-e516eca6cc65","wallId":"b51df2ae-f886-15f4-7f35-78395cbc68b3","modelId":0,"offset":305.30839830759703,"length":100.4,"bottom":0,"height":210.2,"type":0},{"id":"243154cf-0b8b-4eaa-1d5c-bfa6fd97e69a","wallId":"80ff6f07-44d0-6ddf-515c-b59a742cf58e","modelId":0,"offset":316.65359887218386,"length":180,"bottom":50,"height":195,"type":10},{"id":"fa45735c-1774-053b-fd79-7c7b4908d236","wallId":"7761ccf9-cf21-fa29-2c3a-ff36b7462ad0","modelId":0,"offset":290.8838011632933,"length":180,"bottom":50,"height":195,"type":10},{"id":"61ade699-5b01-fe66-3898-e463602c5aef","wallId":"6e7f6032-817e-dd80-459b-878306568d71","modelId":0,"offset":317.4996016923541,"length":180,"bottom":50,"height":195,"type":10},{"id":"f8e3bf59-335d-9aed-8e66-b65c8e1b744c","wallId":"53c68364-77cf-f00d-149c-5770fff02dc2","modelId":0,"offset":137.4765563767974,"length":229.2,"bottom":50,"height":207.3,"type":11},{"id":"e2e182c2-094e-2ff7-5027-3a952b029caa","wallId":"6fea52e2-4ec1-5b50-4194-ddb81375b118","modelId":0,"offset":157.1386231806028,"length":180,"bottom":50,"height":195,"type":10},{"id":"e02c63a7-f3b2-3999-4e4b-15a7a07d1510","wallId":"f09e3613-cd0d-f3b8-3646-6d66a3fe3871","modelId":0,"offset":225.21160169024898,"length":180,"bottom":50,"height":195,"type":10},{"id":"6646c7a7-7727-7d8f-7faf-292053ec6a09","wallId":"e0eb7dfb-1da5-e0e4-4be7-26f4a0702d87","modelId":0,"offset":290.88380116329347,"length":100.4,"bottom":0,"height":210.2,"type":0},{"id":"1bba91dc-1519-cefe-6aea-114f353661d7","wallId":"d92ec250-d50c-e047-343b-b9327277a213","modelId":0,"offset":201.67639830718252,"length":180,"bottom":50,"height":195,"type":10}],"rooms":[{"id":"a5d68408-7219-697d-4b75-71e7a058df51","name":"次卧","cornerIndex":["5bfbaf14-80f1-39da-dcc8-e741d6dd09c9","9aded034-0a9e-b1ec-cfe0-49d7f5c0df7f","36883d2b-75c4-edad-64f6-dd81928ca39f","96137e1d-cc0e-2875-0ca5-bb266c7b00e9","158b032c-b50e-e97a-8ac4-75dc71e20850"]},{"id":"7bfe9dc5-0136-0407-71b3-837844b46243","name":"主卧","cornerIndex":["2240b9d9-4208-77e8-9996-b208790b1270","158b032c-b50e-e97a-8ac4-75dc71e20850","96137e1d-cc0e-2875-0ca5-bb266c7b00e9","34b78b6f-9460-71c4-4314-568aac778229","ba1876a6-ec4d-1361-a57b-bcb8ea509511","c200ec67-4b92-1a3a-2415-9ef14d354d19"]},{"id":"586801ee-a724-b83f-be90-a84afae48e13","name":"餐厅","cornerIndex":["bd5d4811-e779-26aa-2fb5-827f114dfb08","c200ec67-4b92-1a3a-2415-9ef14d354d19","ba1876a6-ec4d-1361-a57b-bcb8ea509511","c0893a91-ef23-fbfd-8f38-fcc8b49c299f"]},{"id":"ddc794e5-1777-f15d-1d38-fcb0d270d766","name":"厨房","cornerIndex":["05dc1caf-dd2e-af51-3b42-84991ec21bf7","2f0709c5-c3b8-d183-8710-d9f7a6632f85","93c7c819-b727-4516-173c-0f435f3d66d7","5bf9fd15-7826-0096-27d2-a902d82d01ba","c44ad175-091f-808a-e8b6-b2837968ccc8"]},{"id":"d618ca42-b418-ed13-bc22-be97c45d1922","name":"门厅","cornerIndex":["2f0709c5-c3b8-d183-8710-d9f7a6632f85","c0893a91-ef23-fbfd-8f38-fcc8b49c299f","ba1876a6-ec4d-1361-a57b-bcb8ea509511","34b78b6f-9460-71c4-4314-568aac778229","96137e1d-cc0e-2875-0ca5-bb266c7b00e9","36883d2b-75c4-edad-64f6-dd81928ca39f","5bf9fd15-7826-0096-27d2-a902d82d01ba","93c7c819-b727-4516-173c-0f435f3d66d7"]},{"id":"3a65acae-a7e7-1f13-4ef5-369513713fab","name":"卫生间","cornerIndex":["c44ad175-091f-808a-e8b6-b2837968ccc8","5bf9fd15-7826-0096-27d2-a902d82d01ba","36883d2b-75c4-edad-64f6-dd81928ca39f","9aded034-0a9e-b1ec-cfe0-49d7f5c0df7f"]}]}}';

    floorplan.loadSerialized(data);
    engine.draw();
  };

  $("#newFile").click(this.newDesign);


  $("#loadFile").change(function(){
    var files = $(this).get(0).files;
    var reader  = new FileReader();
    reader.onload = function(event) {
      var data = event.target.result;
      // console.log(data);
      floorplan.loadSerialized(data);
    }
    reader.readAsText(files[0]);

    engine.draw();
  });


  function dateToString(){  
    var now = new Date();
    var year = now.getFullYear();  
    var month =(now.getMonth() + 1).toString();  
    var day = (now.getDate()).toString();  
    var hour = (now.getHours()).toString();  
    var minute = (now.getMinutes()).toString();  
    var second = (now.getSeconds()).toString();  
    if (month.length == 1) {month = "0" + month;}  
    if (day.length == 1) {  day = "0" + day; }  
    if (hour.length == 1) { hour = "0" + hour;}  
    if (minute.length == 1) { minute = "0" + minute; }  
    if (second.length == 1) { second = "0" + second;}  
     var dateTime = year + month + day +"_"+ hour + minute+ second;  
     return dateTime;  
  }  

 $("#saveFile").click( function () {
    var data = floorplan.exportSerialized();

    var a = window.document.createElement('a');
    var blob = new Blob([data], {type : 'text'});
    a.href = window.URL.createObjectURL(blob);
    
    var dateStr = dateToString();
    var nameStr = 'design'+ dateStr +'.imapic2d';
    a.download = nameStr;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    alert(nameStr + '保存成功！');

  });


  return this;
}




function viewer(engine) {

  var canvasWrapper = '#floorplanner';

  var clickModes = IMAPIC2D._DEFINES_.EVENTS;

  var BUTTON_STATE = {
    'move' : clickModes.MOVE,
    'draw' : clickModes.DRAW,
    'delete' : clickModes.DELETE,
    'deleteAll' : clickModes.CLEAR,
    'add_door' : clickModes.ADD_DOOR,
    'add_door1' : clickModes.ADD_DOOR1,
    'add_door2' : clickModes.ADD_DOOR2,
    'add_window' : clickModes.ADD_WINDOW,
    'add_window1' : clickModes.ADD_WINDOW1,
    'add_window2' : clickModes.ADD_WINDOW2
  }; 

  var activeStlye = 'btn-primary disabled';

  this.eventHandle = engine.handle;
  this.floorplan = engine.floorplan;

  var scope = this;

  this.init = function () {

    $( window ).resize( scope.handleWindowResize );
    // document.addEventListener('resize',scope.handleWindowResize());
    window.addEventListener("orientationchange", function() { 
      scope.handleWindowResize();
    }, false); 
    scope.handleWindowResize();

    // mode buttons
    scope.eventHandle.modeResetCallbacks.add(function(mode) {

      for(var id in BUTTON_STATE){

        var button = $('#'+id);
        if(mode == BUTTON_STATE[id]){
          if(!button.hasClass(activeStlye))
            button.addClass(activeStlye);
        }else{
          if(button.hasClass(activeStlye))
            button.removeClass(activeStlye);
        }
      }

      if (mode == clickModes.DRAW) {
        $("#draw-walls-hint").show('slow');
      //  scope.handleWindowResize();
      } else {
        $("#draw-walls-hint").hide('fast');
      }

    });

    $('#floorplanner-controls>button').click(function(){
      var id = $(this).attr("id");
      console.log(id);

      var mode = BUTTON_STATE[id];

      if(mode == clickModes.ADD_DOOR){
        scope.floorplan.newInWall(0);
        scope.eventHandle.setMode(clickModes.MOVE);
      }else if(mode == clickModes.ADD_DOOR1){
        scope.floorplan.newInWall(1);
        scope.eventHandle.setMode(clickModes.MOVE);
      }else if(mode == clickModes.ADD_DOOR2){
        scope.floorplan.newInWall(2);
        scope.eventHandle.setMode(clickModes.MOVE);

      }else if(mode == clickModes.ADD_WINDOW){
        scope.floorplan.newInWall(10);
        scope.eventHandle.setMode(clickModes.MOVE);
      }else if(mode == clickModes.ADD_WINDOW1){
        scope.floorplan.newInWall(11);
        scope.eventHandle.setMode(clickModes.MOVE);
      }else if(mode == clickModes.ADD_WINDOW2){
        scope.floorplan.newInWall(12);
        scope.eventHandle.setMode(clickModes.MOVE);
      }else if(mode == clickModes.CLEAR ){
        if(confirm("确定清空画布？")){
          scope.floorplan.clear();
          engine.draw();
        }
        scope.eventHandle.setMode(clickModes.MOVE);
      }else{
        scope.eventHandle.setMode(mode);
      }

    });

    scope.eventHandle.reset();
  };



  this.handleWindowResize = function() {
    $(canvasWrapper).height(window.innerHeight - $(canvasWrapper).offset().top);
    scope.eventHandle.resizeView();
  };

  return this;

} 

