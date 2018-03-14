

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
    var str = engine.floorplan.convertTo3d();
    // var imapic3d = new IMAPIC3D.Engine($('#viewer')[0],window.innerWidth,window.innerHeight,window.devicePixelRatio);
    // imapic3d.init();
    // imapic3d.loadFrom2D(str);
    linkTo3d(str);
  });



});


function linkTo3d(str) {

  console.log(str);
  

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

  var generator = new IMAPIC3D.RoomGenerator();
  var loader = new House3D.SceneEditor.Loaders.ModelLoader();

  var inWallsJson = data['inWalls'];
  inWallsJson.forEach((item)=>{
    loadItem(loader,item['uuid'],item['matrix'],addModel);
  });

  var wallGroup = new THREE.Group();
  data['walls'].forEach((wall)=>{
    var _inWallsArray = [];
    for (var i = inWallsJson.length - 1; i >= 0; i--) {
      if(inWallsJson[i]['wallId'] == wall.id){ _inWallsArray.push(inWallsJson[i]); }
    }
    generator.generateWall(wallGroup,wall,_inWallsArray,addModel);
  });
  // scene.addModel(wallGroup);
  // addModel(wallGroup, 'Wall');
  // addModel(wallGroup, 'HangWall');


  var roomGroup = new THREE.Group();
  if(!('rooms' in data) ) {return;}
  data['rooms'].forEach((room)=>{
    var _room = generator.generateRoom(room,addModel);
    // addModel(_room,'Floor');
  });
  // scene.addModel(roomGroup);
  // addModel(roomGroup, 'Wall');

  window.addEventListener("resize", function () {
    editor.resize(window.innerWidth, window.innerHeight);
  });
  editor.resize(window.innerWidth, window.innerHeight);

}

function loadItem(loader,id,matrix,callback){
  
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
      // group.addItem(item);//,
      callback(item,'InWallItem');
    });

  });
}


function loadControl(engine) {

  var floorplan = engine.floorplan;
  this.newDesign = function() {
    // var data = '{"floorplan":{"corners":{"56d9ebd1-91b2-875c-799d-54b3785fca1f":{"x":630.555,"y":-227.58400000000006},"8f4a050d-e102-3c3f-5af9-3d9133555d76":{"x":294.64,"y":-227.58400000000006},"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359":{"x":294.64,"y":232.664},"254656bf-8a53-3987-c810-66b349f49b19":{"x":745.7439999999998,"y":232.664},"11d25193-4411-fbbf-78cb-ae7c0283164b":{"x":1044.7019999999998,"y":232.664},"edf0de13-df9f-cd6a-7d11-9bd13c36ce12":{"x":1044.7019999999998,"y":-105.66399999999999},"e7db8654-efe1-bda2-099a-70585874d8c0":{"x":745.7439999999998,"y":-105.66399999999999}},"walls":[{"corner1":"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359","corner2":"254656bf-8a53-3987-c810-66b349f49b19","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"254656bf-8a53-3987-c810-66b349f49b19","corner2":"e7db8654-efe1-bda2-099a-70585874d8c0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"56d9ebd1-91b2-875c-799d-54b3785fca1f","corner2":"8f4a050d-e102-3c3f-5af9-3d9133555d76","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"8f4a050d-e102-3c3f-5af9-3d9133555d76","corner2":"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"254656bf-8a53-3987-c810-66b349f49b19","corner2":"11d25193-4411-fbbf-78cb-ae7c0283164b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"11d25193-4411-fbbf-78cb-ae7c0283164b","corner2":"edf0de13-df9f-cd6a-7d11-9bd13c36ce12","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/light_brick.jpg","stretch":false,"scale":100}},{"corner1":"edf0de13-df9f-cd6a-7d11-9bd13c36ce12","corner2":"e7db8654-efe1-bda2-099a-70585874d8c0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"e7db8654-efe1-bda2-099a-70585874d8c0","corner2":"56d9ebd1-91b2-875c-799d-54b3785fca1f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{"11d25193-4411-fbbf-78cb-ae7c0283164b,254656bf-8a53-3987-c810-66b349f49b19,e7db8654-efe1-bda2-099a-70585874d8c0,edf0de13-df9f-cd6a-7d11-9bd13c36ce12":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/light_fine_wood.jpg","scale":300}}},"items":[{"item_name":"Full Bed","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/39/ik_nordli_full.js","xpos":939.5525544513545,"ypos":50,"zpos":-15.988409993966997,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Bedside table - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/353/cb-archnight-white_baked.js","xpos":1001.0862865204286,"ypos":31.15939942141,"zpos":86.4297300551338,"rotation":-0.7872847644705953,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Open Door","item_type":7,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/174/open_door.js","xpos":745.2440185546875,"ypos":110.5,"zpos":64.8291839065202,"rotation":-1.5707963267948966,"scale_x":1.7003089598352215,"scale_y":0.997292171703541,"scale_z":0.999415040540576,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":886.8841174461031,"ypos":139.1510114697785,"zpos":-105.16400146484375,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Dresser - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/478/we-narrow6white_baked.js","xpos":898.0548281668393,"ypos":35.611997646165,"zpos":201.10860458067486,"rotation":-3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":534.9620937975317,"ypos":137.60931398864443,"zpos":-227.08399963378906,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":295.1400146484375,"ypos":141.43383044055196,"zpos":123.2280598724867,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Media Console - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/400/cb-clapboard_baked.js","xpos":658.6568227980731,"ypos":67.88999754395999,"zpos":-141.50237235990153,"rotation":-0.8154064090423808,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Blue Rug","item_type":8,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/440/cb-blue-block-60x96.js","xpos":905.8690190229256,"ypos":0.250005,"zpos":44.59927303228528,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"NYC Poster","item_type":2,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/77/nyc-poster2.js","xpos":1038.448276049687,"ypos":146.22618581237782,"zpos":148.65033715350484,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Sofa - Grey","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/596/cb-rochelle-gray_baked.js","xpos":356.92671999154373,"ypos":42.54509923821,"zpos":-21.686174295784554,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Coffee Table - Wood","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/68/ik-stockholmcoffee-brown.js","xpos":468.479104587435,"ypos":24.01483158034958,"zpos":-23.468458996048412,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Floor Lamp","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/614/ore-3legged-white_baked.js","xpos":346.697102333121,"ypos":72.163997943445,"zpos":-175.19915302127583,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Red Chair","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/723/ik-ekero-orange_baked.js","xpos":397.676038151142,"ypos":37.50235073007,"zpos":156.31701312594373,"rotation":2.4062972386507093,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":374.7738207971076,"ypos":138.62749831597068,"zpos":-227.08399963378906,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Closed Door","item_type":7,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/617/closed-door28x80_baked.js","xpos":637.2176377788675,"ypos":110.80000022010701,"zpos":232.16400146484375,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Bookshelf","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/388/cb-kendallbookcasewalnut_baked.js","xpos":533.1460416453955,"ypos":92.17650034119151,"zpos":207.7644213268835,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false}]}'
    // var data = '{"floorplan":{"corners":[{"x":190.24799999676077,"y":-481.58400000192637},{"x":850.2479999967608,"y":518.4159999980735},{"x":652.3641294556497,"y":-146.06345528057977},{"x":190.24799999676077,"y":-146.06345528057972},{"x":850.2479999967608,"y":121.92000000048769},{"x":-809.7520000032391,"y":-481.58400000192637},{"x":-809.7520000032391,"y":518.4159999980735},{"x":190.24799999676077,"y":518.4159999980735}],"walls":[{"thickness":24,"cornerIndex":[3,7],"inWalls":[]},{"thickness":24,"cornerIndex":[0,5],"inWalls":[]},{"thickness":24,"cornerIndex":[1,7],"inWalls":[]},{"thickness":24,"cornerIndex":[1,4],"inWalls":[]},{"thickness":24,"cornerIndex":[2,4],"inWalls":[]},{"thickness":24,"cornerIndex":[0,3],"inWalls":[]},{"thickness":24,"cornerIndex":[2,3],"inWalls":[]},{"thickness":24,"cornerIndex":[5,6],"inWalls":[]},{"thickness":24,"cornerIndex":[6,7],"inWalls":[]}],"rooms":[{"name":"客厅","cornerIndex":[0,3,5,6,7]},{"name":"主卧","cornerIndex":[1,2,3,4,7]}]}}';
    // floorplan.loadSerialized('{"floorplan":{"corners":[{"x":640.6116282846873,"y":-495.7210517740312},{"x":640.6116282846873,"y":-224.00783929537812},{"x":1248.565735747316,"y":-224.00783929537812},{"x":1248.565735747316,"y":481.3530948861111},{"x":640.6116282846873,"y":479.2789482259687},{"x":638.5796282846792,"y":149.55825314448697},{"x":143.15826620995915,"y":147.48410648434455},{"x":145.19026620996726,"y":477.2048015658263},{"x":640.6116282846873,"y":-16.593173281139116},{"x":1248.565735747316,"y":-16.593173281139116},{"x":-47.701558208033475,"y":477.81137963003385},{"x":-514.3883717153127,"y":-495.7210517740312},{"x":-514.3883717153127,"y":479.2789482259687},{"x":-514.3883717153127,"y":136.89367956939776},{"x":-120.3883717153127,"y":136.89367956939776},{"x":-120.3876529334733,"y":478.03995225495663},{"x":-514.3883717153127,"y":-149.3385595302521},{"x":-325.3883717153127,"y":-149.3385595302521},{"x":-325.3883717153127,"y":136.89367956939776}],"walls":[{"thickness":24,"cornerIndex":[12,15],"inWalls":[{"start":{"x":-354.67803023665005,"y":478.7767144477339},"offset":229.9111311524624,"type":11}]},{"thickness":24,"cornerIndex":[4,5],"inWalls":[]},{"thickness":24,"cornerIndex":[0,11],"inWalls":[]},{"thickness":24,"cornerIndex":[0,1],"inWalls":[]},{"thickness":24,"cornerIndex":[1,2],"inWalls":[{"start":{"x":885.3600000039015,"y":-224.00783929537812},"offset":334.7483717192142,"type":10}]},{"thickness":24,"cornerIndex":[2,9],"inWalls":[]},{"thickness":24,"cornerIndex":[3,4],"inWalls":[]},{"thickness":24,"cornerIndex":[1,8],"inWalls":[{"start":{"x":640.6116282846873,"y":-199.5385595302521},"offset":74.66927976512602,"type":0}]},{"thickness":24,"cornerIndex":[5,6],"inWalls":[]},{"thickness":24,"cornerIndex":[4,7],"inWalls":[{"start":{"x":480.1389178120696,"y":478.60710812792183},"offset":250.47411683990018,"type":10}]},{"thickness":24,"cornerIndex":[6,7],"inWalls":[{"start":{"x":143.60550318818008,"y":220.05462189997218},"offset":122.77189351673647,"type":0}]},{"thickness":24,"cornerIndex":[5,8],"inWalls":[{"start":{"x":639.0742665367583,"y":109.11295238302513},"offset":90.6483253137324,"type":0}]},{"thickness":24,"cornerIndex":[3,9],"inWalls":[]},{"thickness":24,"cornerIndex":[8,9],"inWalls":[]},{"thickness":24,"cornerIndex":[7,10],"inWalls":[]},{"thickness":24,"cornerIndex":[11,16],"inWalls":[{"start":{"x":-514.3883717153127,"y":-413.92800000145496},"offset":131.99305177257622,"type":0}]},{"thickness":24,"cornerIndex":[12,13],"inWalls":[]},{"thickness":24,"cornerIndex":[13,18],"inWalls":[]},{"thickness":24,"cornerIndex":[10,15],"inWalls":[]},{"thickness":24,"cornerIndex":[14,15],"inWalls":[]},{"thickness":24,"cornerIndex":[13,16],"inWalls":[]},{"thickness":24,"cornerIndex":[16,17],"inWalls":[]},{"thickness":24,"cornerIndex":[14,18],"inWalls":[{"start":{"x":-185.51200000094286,"y":136.89367956939776},"offset":115.32362828563018,"type":0}]},{"thickness":24,"cornerIndex":[17,18],"inWalls":[{"start":{"x":-325.3883717153127,"y":-66.79317328113915},"offset":132.74538624911295,"type":0}]}],"rooms":[{"name":"客厅","cornerIndex":[0,1,8,5,6,7,10,15,14,18,17,16,11]},{"name":"厨房","cornerIndex":[1,2,9,8]},{"name":"餐厅","cornerIndex":[3,4,5,8,9]},{"name":"主卧","cornerIndex":[4,7,6,5]},{"name":"次卧","cornerIndex":[12,13,18,14,15]},{"name":"卫生间","cornerIndex":[13,16,17,18]}]}}');
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

