

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
    wallLengthSettingDivId:'wallLengthSetting',

  };
  var engine = new IMAPIC2D.Engine(opts);
  new viewer(engine).init();
  engine.toggle.isPC = true;

  var load = new loadControl(engine);
  load.newDesign();

  // engine.setPixelsPerCm(0.7);
  engine.handle.updatePixelsPerCm();
  engine.draw();


  $('#wallLengthSetting').on('focus',function(){
    setTimeout(function () { $('#wallLengthSetting').select(); }, 50);
  });


  $('#roomSetting a').click( function(){
    engine.setRoomName($(this).text());
  });

  $('#toggle-snap').click(function(){
    if(engine.toggle.snapTarget){
      $(this).text('开启吸附');
    }else{
      $(this).text('关闭吸附');
    }
    engine.toggle.snapTarget = !engine.toggle.snapTarget;
  });



  $('#roomSettingClose').click(function(){
    $('#roomSetting').css('display','none');
  });


  function GetQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";  
    if (r != null)  
         context = r[2];  
    reg = null;  
    r = null;  
    return context == null || context == "" || context == "undefined" ? "" : context;  
}

    
  function loadHouseByID(){

    var id = GetQueryString('id');

    $.get("https://www.imapic.cn/miniapp/api/housetype/select?id="+id, function(data){

      if(data.Data == null || data.Code !== 200){
        alert('找不到这个户型');
        return;
      }

      console.log(data);

      var json = data.Data["HouseTypeJson"];
      json = JSON.parse(json);
      // console.log(json);

      var floorplan = engine.floorplan;

      floorplan.loadSerialized(json);
      engine.draw();
    });


  }   

   loadHouseByID();
  
  $('#exportOBJ').click(function(){


    var imapic3d = new IMAPIC3D.Engine($('#viewer')[0],window.innerWidth,window.innerHeight,window.devicePixelRatio);
    imapic3d.init();


    var str = engine.floorplan.convertTo3d();
    imapic3d.loadFrom2D(str);
    

    var exporter = new THREE.OBJExporter();
    var object = imapic3d._scene;


    var link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link ); // Firefox workaround, see #6594

    function save( blob, filename ) {

      link.href = URL.createObjectURL( blob );
      link.download = filename || 'model.obj';
      link.click();

      // URL.revokeObjectURL( url ); breaks Firefox...

    }

    save( new Blob( [ exporter.parse( object ) ], { type: 'text/plain' } ), 'model.obj'  );

  });

  $('#update-floorplan').click(function(){


    $('#floorplanner').hide();
    $('#viewer').show();


    var str = engine.floorplan.convertTo3d();
    
    
    linkTo3d(str,engine);
  });




 

  // loadSVGFile( engine,'models/tiger.svg');
});


var loadSVGFile = function (engine,url){


    // var  saveFloorplan = function(line) {
    //   var floorplan = {
    //     corners: [],
    //     walls: [],//{thickness:,cornerIndex:[1,2],inWalls:[{}]}
    //     // inWalls:[],
    //     // rooms: []//{name:,wallIndex:[]}
    //   }

    //   floorplan.corners.push(corner.toJson());

    //   floorplan.walls.push(wall.toJson());


    //   return floorplan;

    // }

  var getSize = function(pointList){

    var min = new THREE.Vector2(Infinity,Infinity);
    var max = new THREE.Vector2(-Infinity,-Infinity);

    for (var i = 0; i < pointList.length; i++) {
      p = pointList[i];

      if(p.x < min.x) min.x = p.x;
      if(p.y < min.y) min.y = p.y;
      if(p.x > max.x) max.x = p.x;
      if(p.y > max.y) max.y = p.y;
      
    }

    return {
      min: min,
      max: max
    };

  };


  var equal = function(p1,p2){

    // return false;
    return p1.distanceTo(p2) <  0.000000001 ;
  };

  var pushPoints = function(points,pointIndex,newP){

    var bHasSame = false;
    var index = -1;
    for (var i = 0; i < points.length; i++) {

      if(equal(points[i],newP)){
        index = i;
        bHasSame = true;
        break;
      }
    }

    if(0||!bHasSame){  
      pointIndex.push(points.length);
      points.push(newP);
    }else{
      pointIndex.push(index);

    }

  };


  var addNewCorner = function(area,center,p){

   p.y = area.max.y - p.y  + area.min.y; 
   p.sub(center.clone()).multiplyScalar(0.1);
   return engine.floorplan.newCorner(Math.floor(p.x*10)/10,Math.floor(p.y*10)/10);
    // return  engine.floorplan.newCorner(p.x,p.y);
  }

       

  var loader = new THREE.SVGLoader();
  loader.load( url, function ( paths ) {


    var pointArr = [];
    var indexArr = [];

    // points.push(paths[0].currentPath.curves[0].v1)

    for (var i = 0; i < paths.length; i++) {
      
      var line = paths[i].currentPath.curves[0];


      pushPoints(pointArr,indexArr,line.v1);
      pushPoints(pointArr,indexArr,line.v2);

    } 


    var area = getSize(pointArr);
    var center =  area.min.clone().add(area.max).multiplyScalar(0.5);
    
    console.log(area);
    console.log(center);
    console.log(pointArr.length);
    console.log(indexArr.length);

    for (var i = 0; i < indexArr.length-1; i+=2) {


      var p1 = pointArr[indexArr[i]];
      var p2 = pointArr[indexArr[i+1]];
      // if(index1 == index2 || index1 >= pointArr.length|| index2 >= pointArr.length) continue;

      if(p1.distanceTo(p2) > 50000) continue;

      // if(p1.y < area.min.y) continue;
      // if(p2.y < area.min.y) continue;
   
      var corner1 = addNewCorner(area,center,p1);
      var corner2 = addNewCorner(area,center,p2);
      console.log(corner1.x,corner2.x,corner1.y,corner2.y);

      var wall =  engine.floorplan.newWall(corner1,corner2);
      // wall.setThickness(1);

    }

    engine.draw();
  });

}





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

    // var mat = mesh.material;
    //   mat.transparent = true;
    //   if(mat.opacity > 0.9){
    //     mat.opacity = 0.2;
    //   }

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
};


function disposeMaterial(mtrl){

  if (mtrl.map)           mtrl.map.dispose();
  if (mtrl.lightMap)      mtrl.lightMap.dispose();
  if (mtrl.bumpMap)       mtrl.bumpMap.dispose();
  if (mtrl.normalMap)     mtrl.normalMap.dispose();
  if (mtrl.specularMap)   mtrl.specularMap.dispose();
  if (mtrl.envMap)        mtrl.envMap.dispose ();

  mtrl.dispose ();    // disposes any programs associated with the material
  mtrl = undefined;
}

function clearScene(node,callback) {

    if (node instanceof THREE.Mesh)
    {
      
        // node.dispose();
        if (node.geometry){
            node.geometry.dispose();
            node.geometry = undefined;
        }
        if (node.material){
            var materialArray;
            if (node.material instanceof THREE.MeshFaceMaterial || node.material instanceof THREE.MultiMaterial) {
                materialArray = node.material.materials;
            }
            else if(node.material instanceof Array) {
                materialArray = node.material;
            }
            if(materialArray) {
              materialArray.forEach(function (mtrl) {
                disposeMaterial(mtrl);
              });
            }else{
                disposeMaterial(node.material);
            }

        }
    }
    else{
        if (node.children !== undefined) {
            while (node.children.length > 0) {
                clearScene(node.children[0],callback);
                // if (node instanceof THREE.Mesh){
                  node.remove(node.children[0]);
                // }
            }
        }
    }
    callback();
}


function disposeNode (node)
{
    if (node instanceof THREE.Mesh)
    {
        // node.dispose();
        if (node.geometry)
        {
            node.geometry.dispose ();
            node.geometry = null;
        }

        if (node.material)
        {
            if (node.material instanceof THREE.MeshFaceMaterial)
            {
                $.each (node.material.materials, function (idx, mtrl)
                {
                    if (mtrl.map)           mtrl.map.dispose ();
                    if (mtrl.lightMap)      mtrl.lightMap.dispose ();
                    if (mtrl.bumpMap)       mtrl.bumpMap.dispose ();
                    if (mtrl.normalMap)     mtrl.normalMap.dispose ();
                    if (mtrl.specularMap)   mtrl.specularMap.dispose ();
                    if (mtrl.envMap)        mtrl.envMap.dispose ();

                    mtrl.dispose ();    // disposes any programs associated with the material
                    mtrl = null;
                });
            }
            else
            {
                if (node.material.map)          node.material.map.dispose ();
                if (node.material.lightMap)     node.material.lightMap.dispose ();
                if (node.material.bumpMap)      node.material.bumpMap.dispose ();
                if (node.material.normalMap)    node.material.normalMap.dispose ();
                if (node.material.specularMap)  node.material.specularMap.dispose ();
                if (node.material.envMap)       node.material.envMap.dispose ();

                node.material.dispose ();   // disposes any programs associated with the material
                node.material = null;
            }

        }
    }
}   // disposeNode

function disposeHierarchy (node, callback)
{
    for (var i = node.children.length - 1; i >= 0; i--)
    {
        var child = node.children[i];
        disposeHierarchy (child, callback);
        callback (child);
    }
}

function isKeepItem(uuid,keepUuidArray){

  for (var i = 0; i < keepUuidArray.length; i++) {
    if(keepUuidArray[i] == uuid){
      return true;
    }
  }
  return false;
}

function setTransparent(parent,bTrue,keepUuidArray){

  var objects = parent.children;
  if(!objects || objects === undefined)
      return;

  for (var i = 0; i < objects.length; i++) {

    var child = objects[i];
    if(isKeepItem(child.uuid,keepUuidArray)){
      // child.visible = true;
      continue;
    }

    var mat = child.material;
    if(mat){

      if(bTrue){

        mat.transparent = true;
        if(mat._opacity === undefined){
          mat._opacity = mat.opacity;
        }
        mat.opacity = 0.15;
      }else{
        mat.opacity = mat._opacity;
      }
    }else {
      setTransparent(child,bTrue,keepUuidArray);
    }
  }
}
  // else{

  //   for (var i = 0; i < objects.length; i++) {
  //     var child = objects[i];

  //     if(child.uuid == xName){
  //       // child.visible = false;
  //       continue;
  //     }

  //     var mat = child.material;
  //     if(mat){
  //       mat.opacity = mat._opacity;

  //     }else{
  //       setTransparent(child,bTrue);
  //     }
  //   }
  // }

    




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
  
  var bTransparent = true;

   $('#switchTransparent').click(function(){
    var info = editor._scene;
    console.log(info);

    setTransparent(info,bTransparent,["A6B94E4E-61F3-41F7-A7B9-2B6FCFCC8C3A"]);
    bTransparent = !bTransparent;

  });


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


  // loadItem(loader,"A6B94E4E-61F3-41F7-A7B9-2B6FCFCC8C3A",new THREE.Matrix4(),addModel);

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
      console.log(box);
      item.matrix.identity();
      item.applyMatrix(matrix);



      // item.material.side = THREE.DoubleSided;
      // item.material.side = THREE.BackSide;

      // item.scale.set(0.1,0.1,0.1);
      // group.addItem(item);//,
      callback(item,'InWallItem');
    });

  });
}


function loadControl(engine) {

  var floorplan = engine.floorplan;
  this.newDesign = function() {

    // floorplan.loadSerialized(data);
    // engine.draw();
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
    'door_dan' : clickModes.ADD_DOOR_DAN,
    'door_shuang' : clickModes.ADD_DOOR_SHUANG,
    'door_tuiyi' : clickModes.ADD_DOOR_TUIYI,
    'door_yushi' : clickModes.ADD_DOOR_YUSHI,
    'door_chufang' : clickModes.ADD_DOOR_CHUFANG,
    'door_ruhu' : clickModes.ADD_DOOR_RUHU,
    'window_putong' : clickModes.ADD_WINDOW_PUTONG,
    'window_luodi' : clickModes.ADD_WINDOW_LUODI,
    'window_piao' : clickModes.ADD_WINDOW_PIAO
  }; 

  var activeStlye = 'btn-primary disabled';

  this.eventHandle = engine.handle;
  this.floorplan = engine.floorplan;

  var scope = this;

  this.init = function () {

    $( window ).resize( scope.handleWindowResize );
    // document.addEventListener('resize',scope.handleWindowResize());
    window.addEventListener("orientationchange", function() { 
      scope.eventHandle.resizeView();
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
      if(mode ==undefined){
        return;
      }
      if(mode < 0){
        if(mode == clickModes.CLEAR ){
          if(confirm("确定清空画布？")){
            scope.floorplan.clear();
            engine.draw();
            scope.eventHandle.setMode(clickModes.MOVE);
          }
        }else{
          scope.eventHandle.setMode(mode);
        }
      }else{
        // if(mode < 6 || (mode >10&&model < 13)){
          scope.floorplan.newInWall(mode);
        // }
          scope.eventHandle.setMode(clickModes.MOVE);
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

