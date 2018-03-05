

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

  engine.draw();

  $('.modal-body').on("click", "a", function(){
    engine.setRoomName($(this).text());
  });
        

  $('#update-floorplan').click(function(){

    $('#floorplanner').hide();
    $('#viewer').show();
    var str = engine.convertTo3d();
    var imapic3d = new IMAPIC3D.Engine($('#viewer')[0],window.innerWidth,window.innerHeight,window.devicePixelRatio);
    // imapic3d.init();
    // imapic3d.loadFrom2D(str);
    linkTo3d(str);
  });



});


function linkTo3d(str) {


  var editor = new House3D.SceneEditor.DesignEditor();
  var container = document.getElementById('container');
  editor.init(container, window.innerWidth, window.innerHeight, window.devicePixelRatio);
  var scene = editor.getHouseScene();
  editor.run();

  // editor.topView();
  // scene.setHouseType("20", HouseModels);
  //init 
  var storey = new House3D.Houses.Storey();
  var room = new House3D.Houses.Room();
  storey._floor = 1;
  storey.addRoom(room);
  scene.getHouse().addStorey(storey);

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

  var wallGroup = new THREE.Group();
  var generator = new IMAPIC3D.RoomGenerator();

  var uuid_window = '34B3723B-C00B-408E-AB8F-B2253F909F45' ; //窗户
  var uuid_door = '683E476B-139C-4ECC-8184-B0C5ECDC78D6' ; //门
  var loader = new House3D.SceneEditor.Loaders.ModelLoader();
  // loadItem(scene,loader,uuid_window,undefined);

  // return;
  data['walls'].forEach((wall)=>{

    var matrix = generator.generateWall(wallGroup,wall);
    // console.log(matrix);
    var mat_window = matrix['windowMatrice'];
    var mat_door = matrix['doorMatrice'];
    if(mat_window && mat_window.length > 0){
      matrix['windowMatrice'].forEach(function(_matrix){
        loadItem(scene,loader,uuid_window,_matrix);
      });
    }
    if(mat_door && mat_door.length > 0){
      matrix['doorMatrice'].forEach(function(_matrix){
        loadItem(scene,loader,uuid_door,_matrix);
      });
    }

  });

  scene.addModel(wallGroup);


  var roomGroup = new THREE.Group();
  if(!('rooms' in data) ) {return;}
  data['rooms'].forEach((room)=>{
    generator.generateRoom(roomGroup,room);
  });
  scene.addModel(roomGroup);
  // addModel(roomGroup, 'Wall');

  window.addEventListener("resize", function () {

    editor.resize(window.innerWidth, window.innerHeight);
  });

  editor.resize(window.innerWidth, window.innerHeight);

}

function loadItem(scene,loader,id,matrix){
  
  var token = 'A72HjL/ix79l9M1uqGH7SfXhdNtqM81XaRfaTAeXz/2X4p+qW68O1g==';
  // var url = "http://192.168.0.130:8088/api/item/getitemgeometry" ; //获取物件
  var url = "http://101.132.176.37:8059/api/item/getitemgeometry" ; //获取物件

  $.get(url, {UUID: id,Token:token}, function(data,status){
        console.log(data);
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
      console.log(box);
      item.matrix.identity();
      item.applyMatrix(matrix);
      item.scale.set(0.1,0.1,0.1);
      scene.addItem(item);
    });

  

  });
}


function loadControl(engine) {

  var floorplan = engine.floorplan;
  this.newDesign = function() {
    var data = '{"floorplan":{"corners":{"56d9ebd1-91b2-875c-799d-54b3785fca1f":{"x":630.555,"y":-227.58400000000006},"8f4a050d-e102-3c3f-5af9-3d9133555d76":{"x":294.64,"y":-227.58400000000006},"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359":{"x":294.64,"y":232.664},"254656bf-8a53-3987-c810-66b349f49b19":{"x":745.7439999999998,"y":232.664},"11d25193-4411-fbbf-78cb-ae7c0283164b":{"x":1044.7019999999998,"y":232.664},"edf0de13-df9f-cd6a-7d11-9bd13c36ce12":{"x":1044.7019999999998,"y":-105.66399999999999},"e7db8654-efe1-bda2-099a-70585874d8c0":{"x":745.7439999999998,"y":-105.66399999999999}},"walls":[{"corner1":"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359","corner2":"254656bf-8a53-3987-c810-66b349f49b19","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"254656bf-8a53-3987-c810-66b349f49b19","corner2":"e7db8654-efe1-bda2-099a-70585874d8c0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"56d9ebd1-91b2-875c-799d-54b3785fca1f","corner2":"8f4a050d-e102-3c3f-5af9-3d9133555d76","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"8f4a050d-e102-3c3f-5af9-3d9133555d76","corner2":"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"254656bf-8a53-3987-c810-66b349f49b19","corner2":"11d25193-4411-fbbf-78cb-ae7c0283164b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"11d25193-4411-fbbf-78cb-ae7c0283164b","corner2":"edf0de13-df9f-cd6a-7d11-9bd13c36ce12","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/light_brick.jpg","stretch":false,"scale":100}},{"corner1":"edf0de13-df9f-cd6a-7d11-9bd13c36ce12","corner2":"e7db8654-efe1-bda2-099a-70585874d8c0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"e7db8654-efe1-bda2-099a-70585874d8c0","corner2":"56d9ebd1-91b2-875c-799d-54b3785fca1f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{"11d25193-4411-fbbf-78cb-ae7c0283164b,254656bf-8a53-3987-c810-66b349f49b19,e7db8654-efe1-bda2-099a-70585874d8c0,edf0de13-df9f-cd6a-7d11-9bd13c36ce12":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/light_fine_wood.jpg","scale":300}}},"items":[{"item_name":"Full Bed","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/39/ik_nordli_full.js","xpos":939.5525544513545,"ypos":50,"zpos":-15.988409993966997,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Bedside table - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/353/cb-archnight-white_baked.js","xpos":1001.0862865204286,"ypos":31.15939942141,"zpos":86.4297300551338,"rotation":-0.7872847644705953,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Open Door","item_type":7,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/174/open_door.js","xpos":745.2440185546875,"ypos":110.5,"zpos":64.8291839065202,"rotation":-1.5707963267948966,"scale_x":1.7003089598352215,"scale_y":0.997292171703541,"scale_z":0.999415040540576,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":886.8841174461031,"ypos":139.1510114697785,"zpos":-105.16400146484375,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Dresser - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/478/we-narrow6white_baked.js","xpos":898.0548281668393,"ypos":35.611997646165,"zpos":201.10860458067486,"rotation":-3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":534.9620937975317,"ypos":137.60931398864443,"zpos":-227.08399963378906,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":295.1400146484375,"ypos":141.43383044055196,"zpos":123.2280598724867,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Media Console - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/400/cb-clapboard_baked.js","xpos":658.6568227980731,"ypos":67.88999754395999,"zpos":-141.50237235990153,"rotation":-0.8154064090423808,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Blue Rug","item_type":8,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/440/cb-blue-block-60x96.js","xpos":905.8690190229256,"ypos":0.250005,"zpos":44.59927303228528,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"NYC Poster","item_type":2,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/77/nyc-poster2.js","xpos":1038.448276049687,"ypos":146.22618581237782,"zpos":148.65033715350484,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Sofa - Grey","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/596/cb-rochelle-gray_baked.js","xpos":356.92671999154373,"ypos":42.54509923821,"zpos":-21.686174295784554,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Coffee Table - Wood","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/68/ik-stockholmcoffee-brown.js","xpos":468.479104587435,"ypos":24.01483158034958,"zpos":-23.468458996048412,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Floor Lamp","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/614/ore-3legged-white_baked.js","xpos":346.697102333121,"ypos":72.163997943445,"zpos":-175.19915302127583,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Red Chair","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/723/ik-ekero-orange_baked.js","xpos":397.676038151142,"ypos":37.50235073007,"zpos":156.31701312594373,"rotation":2.4062972386507093,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":374.7738207971076,"ypos":138.62749831597068,"zpos":-227.08399963378906,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Closed Door","item_type":7,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/617/closed-door28x80_baked.js","xpos":637.2176377788675,"ypos":110.80000022010701,"zpos":232.16400146484375,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Bookshelf","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/388/cb-kendallbookcasewalnut_baked.js","xpos":533.1460416453955,"ypos":92.17650034119151,"zpos":207.7644213268835,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false}]}'
  
    // var data = '{"floorplan":{"corners":{"1ebbd3f6-4f81-5fe0-a784-d7e7ff6bdd53":{"x":-426.7200000017069,"y":365.7600000014631},"6ed8eacb-ddbc-6588-c822-25e5c8e0a1b3":{"x":341.3760000013655,"y":365.7600000014631},"cca31609-5339-97c4-216c-e5f0c47dc9f2":{"x":341.3760000013655,"y":-530.3520000021215},"82f21899-0dc2-7c41-d36c-0a423d860b96":{"x":-426.7200000017069,"y":-382.0160000015281}},"walls":[{"corner1":"82f21899-0dc2-7c41-d36c-0a423d860b96","corner2":"1ebbd3f6-4f81-5fe0-a784-d7e7ff6bdd53"},{"corner1":"1ebbd3f6-4f81-5fe0-a784-d7e7ff6bdd53","corner2":"6ed8eacb-ddbc-6588-c822-25e5c8e0a1b3"},{"corner1":"6ed8eacb-ddbc-6588-c822-25e5c8e0a1b3","corner2":"cca31609-5339-97c4-216c-e5f0c47dc9f2"},{"corner1":"cca31609-5339-97c4-216c-e5f0c47dc9f2","corner2":"82f21899-0dc2-7c41-d36c-0a423d860b96"}]}}';
    floorplan.loadSerialized(data);
  };

  $("#newFile").click(this.newDesign);


  $("#loadFile").change(function(){
    var files = $(this).get(0).files;
    var reader  = new FileReader();
    reader.onload = function(event) {
      var data = event.target.result;
      floorplan.loadSerialized(data);
    }
    reader.readAsText(files[0]);
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
    'add_window' : clickModes.ADD_WINDOW
  }; 

  var activeStlye = 'btn-primary disabled';

  this.eventHandle = engine.handle;
  this.floorplan = engine.floorplan;

  var scope = this;

  this.init = function () {

    $( window ).resize( scope.handleWindowResize );
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
        scope.floorplan.newInWall(IMAPIC2D._DEFINES_.IN_WALL.TYPE.DOOR);
        scope.eventHandle.setMode(clickModes.MOVE);
      }else if(mode == clickModes.ADD_WINDOW){
        scope.floorplan.newInWall(IMAPIC2D._DEFINES_.IN_WALL.TYPE.WINDOW);
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

