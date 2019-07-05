var engine,imapic3d,modelLoader;

var inited3d = false;

$(document).ready(function() {

  //禁用系统默认右键菜单
  $(document).bind("contextmenu",
      function(){
          return false;
      }
  );


  
  
  engine = init2d();

  // goto3d();

  $('#canvas2d').bind("mouseup", (event) => { 

  // $('#canvas2d').addEventListener('mouseup',function(event){
    setTimeout(function () { 
      // handleRoomNameSetting(engine,event); 
      // handlewallSelectedSetting(engine,event); 

      showSeletedMenu('roomSetting',engine.handle.selected.room,event);
      showSeletedMenu('wallSelectedSetting',engine.handle.selected.wall,event);
    
    }, 150);

  });

  $('#canvas2d').bind("mousedown", (event) => { 
    
    $('#roomSetting').hide();
    $('#wallSelectedSetting').hide();

  });

  //墙体选中的操作
  $('#splice_wall').click( function(){
    
    engine.handle.spliceSelectedWall();
    $('#wallSelectedSetting').hide();
   
  });

  $('#delete_wall').click( function(){
    
    engine.handle.deleteSelectedWall();
    $('#wallSelectedSetting').hide();
  });
//----墙体选中的操作

  // 房间选中的操作
  $('#roomSetting a').click( function(){
    engine.setRoomName($(this).text());
  });

  $('#roomSettingClose').click(function(){
    $('#roomSetting').css('display','none');
  });
//----房间选中的操作

// 墙体长度设置的操作
  $('#wallLengthSetting').on('focus',function(){
    setTimeout(function () { $('#wallLengthSetting').select(); }, 50);
  });
//----墙体长度设置的操作


  $('#toggle-snap').click(function(){
 
    var txt = engine.toggle.snapTarget ? '开启吸附' : '关闭吸附';
    $(this).text(txt);
    engine.toggle.snapTarget = !engine.toggle.snapTarget;
  });

  $('#toggle-ortho').click(function(){

    var txt = engine.toggle.drawStraight ? '开启正交绘制' : '关闭正交绘制';
    $(this).text(txt);
    engine.toggle.drawStraight = !engine.toggle.drawStraight;
  });

  $('#toggle-InnerLine').click(function(){

    var txt = engine.toggle.showWallInnerLine ? '转为墙内线绘制' : '转为墙中线绘制';
    $(this).text(txt);
    engine.toggle.showWallInnerLine = !engine.toggle.showWallInnerLine;
    engine.draw();
  });

 $('#exportJSON').click(function(){

    saveFile('json',engine);

  });

  $('#exportOBJ').click(function(){

    if(!inited3d){
      imapic3d = init3d();
    }
    imapic3d.loadFrom2D(engine.floorplan.convertTo3d());

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

  var selectTDQ = null;
  $('#viewOrth').click(function(){

    if(selectTDQ == null) return;

    console.log(selectTDQ);

    var intersect = selectTDQ.intersect;
    imapic3d.handleEvent.setViewByWallNormal(intersect.face.normal,intersect.point);

  });  


  function goto3d(){
    $('#floorplanner').hide();
    $('#viewer').show();

    if(!inited3d){

      inited3d = true;
      // imapic3d = init3d();

      imapic3d = new IMAPIC3D.Engine($('#viewer')[0],window.innerWidth,window.innerHeight,window.devicePixelRatio);
      imapic3d.toggle.isPC = true;
      imapic3d.init();

      var handleEvent = imapic3d.Get_handle();
      $(".menu").hide();
      handleEvent.addEventListener( 'PlaceClick', function ( event ) {

          $(".menu").show();
          $(".menu").css("left",event.mouse.x);
          $(".menu").css("top",event.mouse.y);

          selectTDQ = event;
      } );

      // var control = imapic3d.Get_OrbitControl();
      handleEvent.addEventListener('mousedown', function(){
          $(".menu").hide();
    
      });
      
      modelLoader = new IMAPIC3D.IP3DLoader(imapic3d,'https://box.imapic.cn');

      var caseid = GetQueryString('id');
      modelLoader.loadCaseAndUpdateWallPaper(caseid);
    }


    // console.log(scene.children);
    imapic3d.disposeHouse();
   
    // console.log(engine.floorplan);

    imapic3d.setFloorplan(engine.floorplan);


    var str = engine.floorplan.convertTo3d();
    imapic3d.loadFrom2D(str,true);

    
    var json = JSON.parse(str);
    // console.log(str);

    modelLoader.loadInWall(json['inWalls']);

    modelLoader.loadDroppedCeiling(json['rectStructs']);
  }

  $('#into3d').click(function(){

    goto3d();
  

  });

  //https://box.imapic.cn/box/api/item/ListV2?PageIndex=1&PageSize=20&TypeId=481&menuid=1

  var matrix = new THREE.Matrix4().makeScale(0.1,0.1,0.1);
  var matrixR = new THREE.Matrix4().makeRotationX(Math.PI/2);

	// modelLoader.requestItem("35151573-BCF7-4BE0-900F-A300E2E7BBAB",{
	// 	matrix:matrix
	// });

  var items = [
    "35151573-BCF7-4BE0-900F-A300E2E7BBAB", 
    "964B35E4-C85F-46C6-BB0F-69DEFDDC5534",
    "7821D402-76E1-4479-8A08-5FAAECBB468F",
    "AC12FC6F-A8EA-486D-B1D6-2B7DCCD469FC",
    "1B4E5D23-52A7-4FBC-9FEF-2C1EE2219A83"
  ];

  var size = [
    {x:149.7,z:91.7},
    {x:59.7,z:30.4},
    {x:45.5,z:64.3},
    {x:128.0,z:58.0},
    {x:50.5,z:50.5}
  ];


  function getWallCenter(){

    var walls = imapic3d.Get_Walls();
    var wall = walls[0];
    var box = new THREE.Box3().setFromObject(wall);
    return box.min.clone().add(box.max).multiplyScalar(0.5);
  }
 
  $('#itemFloor').click(function(){

   
    
    var center = getWallCenter();


    var mat = new THREE.Matrix4().makeTranslation(0,0,center.z+size[0].z);
    mat.multiply(matrix);
    modelLoader.requestItem(items[0],{
        matrix:mat,
        type:"OnFloorItem"
    });
    
  });

  function findTypePosition(ipic3d,name){

    var gp = ipic3d.Get_SelectableGroup().children;
    var sofa = undefined;
    for (let i = 0; i < gp.length; i++) {
      const element = gp[i];
      if(element.name&&element.name.indexOf(name)> -1){
        sofa = element; 
      }
    }

    if(sofa == undefined){
      return false;
    }else{
      return sofa.position;
    }


  }
  $('#itemFloor1').click(function(){

    var center = getWallCenter();

    var pos = {
      x: center.x,
      z : center.z + size[0].z
    };

    var mat = new THREE.Matrix4().makeTranslation(pos.x,0,pos.z+size[1].z + 20);
    mat.multiply(matrix);
    modelLoader.requestItem(items[1],{
        matrix:mat,
        type:"OnFloorItem"
    });
    
  });
  $('#itemWall').click(function(){

    var center = getWallCenter();
    var mat = new THREE.Matrix4().makeTranslation(-100 ,152, center.z);
    mat.multiply(matrix);
    mat.multiply(matrixR);
    modelLoader.requestItem(items[2],{
        matrix:mat,
        type:"OnWallItem"
    });
    
  });
  
  $('#itemWall1').click(function(){

    var center = getWallCenter();

    var mat = new THREE.Matrix4().makeTranslation(100 ,152, center.z);
    mat.multiply(matrix);
    mat.multiply(matrixR);
    modelLoader.requestItem(items[3],{
        matrix:mat,
        type:"OnWallItem"
    });
    
  });
  $('#itemRoof').click(function(){

    var pos = findTypePosition(imapic3d,"茶几");
    if(!pos){
      pos = { x:0,z:0 };
    }
    var mat = new THREE.Matrix4().makeTranslation(pos.x,280,pos.z);
    mat.multiply(matrix);
    modelLoader.requestItem(items[4],{
        matrix:mat,
        type:"OnRoofItem"
    });
    
  });

  $('#back2d').click(function(){

    $('#floorplanner').show();
    $('#viewer').hide();


    // var str = engine.floorplan.convertTo3d();
    
    // engine.floorplan.loadFloorplan(engine.floorplan);
    // engine.draw();
    
  });

  var isWireFrame = false;
  $('#changeFloor').click(function(){
    isWireFrame = !isWireFrame;
    imapic3d.setWireFrame(isWireFrame);
  });
  // loadSVGFile( engine,'models/tiger.svg');
});



function init2d(){

  // main setup
  var opts = {
    canvasId: 'canvas2d',
    roomImgId: "roomBkg",
    wallSettingDivId: 'wallSetting',
    roomSettingDivId: 'roomSetting',
    wallLengthSettingDivId:'wallLengthSetting',
    wallLengthSettingDivId2:'wallLengthSetting2',

  };
  var engine = new IMAPIC2D.Engine(opts);
  // engine.handle.pixel2CmRatio = 1100;
  new viewer(engine).init();
  engine.toggle.isPC = true;
  engine.toggle.showCenter = true;
  engine.toggle.moveWallStraight = true;
  engine.toggle.moveCornerEnable = true;
  engine.toggle.showBackgroundGrid = true;
  engine.toggle.showTextMeter = false;
  engine.toggle.showRoomName = true;
  engine.toggle.changeRoomName = true;
  engine.toggle.showLightRects = false;
  engine.toggle.showRoomBackgroundImage = true;
  engine.toggle.showWallInnerLine = false;


  var load = new loadControl(engine);
  load.newDesign();
  // engine.setPixelsPerCm(0.7);
  engine.handle.updatePixelsPerCm();
  engine.draw();

  loadHouseByID(engine);


  return engine;
}

function init3d(){

  var e3d = new IMAPIC3D.Engine($('#viewer')[0],window.innerWidth,window.innerHeight,window.devicePixelRatio);
  e3d.toggle.isPC = true;
  e3d.init();

  modelLoader = new IMAPIC3D.IP3DLoader(e3d,'https://box.imapic.cn');

  // var caseid = GetQueryString('id');
  // modelLoader.loadCaseAndUpdateWallPaper(caseid);

  return e3d;
}

function handleRoomNameSetting(engine,event){

  console.log('#roomSetting');

  var roomJQ= $('#roomSetting');

  if(engine.handle.selected.room == null){
    roomJQ.hide();
    return;
  }else{
    roomJQ.show();
  }

  var x = event.clientX;
  var y = event.clientY;

  roomJQ.css('left',x + 40);
  roomJQ.css('top',y);
  roomJQ.css('display','block');
}

function handleWallSelectedSetting(engine,event){


  console.log('#wallSelectedSetting');

  var wallJQ= $('#wallSelectedSetting');

  if(engine.handle.selected.room == null){
    wallJQ.hide();
    return;
  }else{
    wallJQ.show();
  }

  var x = event.clientX;
  var y = event.clientY;

  wallJQ.css('left',x + 40);
  wallJQ.css('top',y);
  wallJQ.css('display','block');

}

function showSeletedMenu(divName,selectedItem,event){

  // console.log(divName);
  var divJQ= $('#'+ divName);

  if(selectedItem == null){
    divJQ.hide();
    return;
  }else{
    divJQ.show();
  }

  var x = event.clientX;
  var y = event.clientY;

  divJQ.css('left',x + 40);
  divJQ.css('top',y);
  divJQ.css('display','block');
}



function saveFile(type,engine){


  var link = document.createElementNS("https://www.w3.org/1999/xhtml", "a");
  link.style.display = 'none';
  document.body.appendChild( link ); // Firefox workaround, see #6594

  function save( blob, filename ) {

    var URL = window.URL || window.webkitURL || window;

    link.href = URL.createObjectURL( blob );
    link.download = filename ;
    link.click();

    // URL.revokeObjectURL( url ); breaks Firefox...
  }

  var imapic3d = new IMAPIC3D.Engine($('#viewer')[0],window.innerWidth,window.innerHeight,window.devicePixelRatio);
  imapic3d.init();


  var str = engine.floorplan.convertTo3d();
  imapic3d.loadFrom2D(str);

  var object = imapic3d._houseGroup.children;
  // var object = imapic3d._scene;

  if(type=='json'){
    var exporter = new THREE.FileJSONExporter();

    console.log(exporter.parse( object ));
    // save( new Blob( [  exporter.parse( object )], { type: 'application/json' } ), houseID +'.json'  );
  }else{

    var exporter = new THREE.OBJExporter();
    save( new Blob( [  exporter.parse( object ) ], { type: 'text/plain' } ), houseID +'.obj'  );
  }

  // console.log(data);


}


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


function loadHouseByPntArr(engine,list){

  list = JSON.parse(list);

  var floorplan = engine.floorplan;

  for (var i = 0; i < list.length/2; i++) {
      var x = list[i*2];
      var y = list[i*2+1];

      console.log(x,y);

      // floorplan.newCorner(x*100.0,y*100.0);
      floorplan.newCorner(x*4.0,y*4.0);
      var corners = floorplan.getCorners();

      (i > 0) && floorplan.newWall(corners[corners.length-1],corners[corners.length-2]);
  
  }
  var corners = floorplan.getCorners();
  floorplan.newWall(corners[0],corners[corners.length-1]);

  floorplan.updateRoom();
  engine.draw();
}

function loadHouseByID(engine){

  var id = GetQueryString('shapeId');

  var url = "https://box.imapic.cn"
  // var url = "https://47.100.46.19"

  $.get(url + "/miniapp/api/housetype/select?id="+id, function(data){

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

    var corners = floorplan.roomList[0].corners;
    var maxY = 0;
    corners.forEach(function(p){
      maxY = Math.max(maxY,Math.abs(p.y));
    });
    

    if(maxY){
      var ratio = ($("#canvas2d").height()-60)*0.7 / (maxY*2);
      engine.setPixelsPerCm(ratio); 
    }


    engine.draw();
  });

  // var str = '{"floorplan":{"corners":[{"id":"b6d05002-901d-5e5e-78e2-8bbad052e5f1","x":100,"y":0},{"id":"285ac7ea-128c-a91a-c7b3-5c7dd3f2f0c7","x":400,"y":0},{"id":"2a88f4d7-9441-e5db-3b83-55153a434e1c","x":400,"y":400},{"id":"ef29fe45-39c5-2ad9-69bd-915809fd2f85","x":300,"y":400},{"id":"c9a5da16-0603-4259-eabd-b67e50ab61c3","x":300,"y":100},{"id":"7fbfd2ac-0f43-ce39-ed01-687ff0607d42","x":200,"y":100},{"id":"a63caeaf-1d15-af3b-74bb-4cb8fc7b22f7","x":200,"y":400},{"id":"905ce358-9ac0-7ad0-50de-62a4e3150846","x":100,"y":400}],"walls":[{"id":"51619ed0-0f9a-033d-ca53-f13c7b28d0bd","thickness":24,"cornerIndex":["b6d05002-901d-5e5e-78e2-8bbad052e5f1","285ac7ea-128c-a91a-c7b3-5c7dd3f2f0c7"]},{"id":"f8e5a3e5-a71c-0b88-b568-76f71a3f8f8e","thickness":24,"cornerIndex":["285ac7ea-128c-a91a-c7b3-5c7dd3f2f0c7","2a88f4d7-9441-e5db-3b83-55153a434e1c"]},{"id":"155cef3c-d024-61fb-1f55-3c4504e5b04f","thickness":24,"cornerIndex":["2a88f4d7-9441-e5db-3b83-55153a434e1c","ef29fe45-39c5-2ad9-69bd-915809fd2f85"]},{"id":"29edcc71-5d55-18b8-0dbd-a019b30eed7f","thickness":24,"cornerIndex":["ef29fe45-39c5-2ad9-69bd-915809fd2f85","c9a5da16-0603-4259-eabd-b67e50ab61c3"]},{"id":"13ca7785-7c76-b803-bac1-76e845062390","thickness":24,"cornerIndex":["c9a5da16-0603-4259-eabd-b67e50ab61c3","7fbfd2ac-0f43-ce39-ed01-687ff0607d42"]},{"id":"d81bd1b6-ddaf-9ddf-6916-f78cf35bde39","thickness":24,"cornerIndex":["7fbfd2ac-0f43-ce39-ed01-687ff0607d42","a63caeaf-1d15-af3b-74bb-4cb8fc7b22f7"]},{"id":"1b02b73e-d06e-e6ab-caf0-dcc40f72f878","thickness":24,"cornerIndex":["a63caeaf-1d15-af3b-74bb-4cb8fc7b22f7","905ce358-9ac0-7ad0-50de-62a4e3150846"]},{"id":"16156e95-f76e-6896-a93f-7a3c4de7b1cd","thickness":24,"cornerIndex":["905ce358-9ac0-7ad0-50de-62a4e3150846","b6d05002-901d-5e5e-78e2-8bbad052e5f1"]}],"inWalls":[],"rooms":[{"id":"0dc212b8-4195-ca51-d392-dc8099dc41fd","name":"未命名","cornerIndex":["b6d05002-901d-5e5e-78e2-8bbad052e5f1","285ac7ea-128c-a91a-c7b3-5c7dd3f2f0c7","2a88f4d7-9441-e5db-3b83-55153a434e1c","ef29fe45-39c5-2ad9-69bd-915809fd2f85","c9a5da16-0603-4259-eabd-b67e50ab61c3","7fbfd2ac-0f43-ce39-ed01-687ff0607d42","a63caeaf-1d15-af3b-74bb-4cb8fc7b22f7","905ce358-9ac0-7ad0-50de-62a4e3150846"]}]}}';
  // var floorplan = engine.floorplan;

  //   floorplan.loadSerialized(str);
  //   engine.draw();
  
} 



var loadSVGFile = function (engine,url){


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
    p.sub(center).multiplyScalar(0.1);
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


    // var area = getSize(pointArr);
    var area = IMAPIC2D.Core.Utils.getCornersRegion(pointArr);
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



  $('#undo').click( function(){
    var state = engine.floorplan.Stack.undo();
    if(state){
      engine.floorplan.updateRoom();
      engine.draw();
    }else{
      console.log('min stack size of undo !');
    }
  });

  $('#redo').click( function(){
    var state = engine.floorplan.Stack.redo();
    if(state){
      engine.floorplan.updateRoom();
      engine.draw();
    }else{
      console.log('max stack size of redo!');
    }
  });


  return this;
}


function viewer(engine) {

  var canvasWrapper = '#floorplanner';

  var clickModes = IMAPIC2D._DEFINES_.EVENTS;

  var BUTTON_STATE = {
    'move' : clickModes.MOVE,
    'draw' : clickModes.DRAW,

    'draw_room' : clickModes.DRAW_ROOM,

    'delete' : clickModes.DELETE,
    'deleteAll' : clickModes.CLEAR,
    'door_dan' : clickModes.ADD_DOOR_DAN,
    'door_dan1' : clickModes.ADD_DOOR_DAN1,
    'door_dan2' : clickModes.ADD_DOOR_DAN2,
    'door_shuang' : clickModes.ADD_DOOR_SHUANG,
    'door_tuiyi' : clickModes.ADD_DOOR_TUIYI,
    'door_tuiyi1' : clickModes.ADD_DOOR_TUIYI1,
    'door_tuiyi2' : clickModes.ADD_DOOR_TUIYI2,
    'door_yushi' : clickModes.ADD_DOOR_YUSHI,
    'door_chufang' : clickModes.ADD_DOOR_CHUFANG,
    'door_ruhu' : clickModes.ADD_DOOR_RUHU,
    'window_putong' : clickModes.ADD_WINDOW_PUTONG,
    'window_putong1' : clickModes.ADD_WINDOW_PUTONG1,
    'window_putong2' : clickModes.ADD_WINDOW_PUTONG2,
    'window_luodi' : clickModes.ADD_WINDOW_LUODI,
    'window_luodi1' : clickModes.ADD_WINDOW_LUODI1,
    'window_luodi2' : clickModes.ADD_WINDOW_LUODI2,
    'window_piao' : clickModes.ADD_WINDOW_PIAO,
    'window_piao1' : clickModes.ADD_WINDOW_PIAO1,
    'window_piao2' : clickModes.ADD_WINDOW_PIAO2,
    
    'door_dong' : clickModes.ADD_DOOR_HOLE,
    
    'rect_struct' : clickModes.ADD_RECT_STRUCT,

    'droppedceiling' : clickModes.ADD_DROPPEDCEILING
  }; 

  var BUTTON_NAME = {
    'move' : "平移",
    'draw' : "绘制墙体",
    'draw_room' : "绘制房间",
    'delete' : "删除选中",
    'deleteAll' : "清空画布",
    'door_dan' : "单开门",
    'door_dan1' : "单开门1",
    'door_dan2' : "单开门2",
    'door_shuang' : "双开门",
    'door_tuiyi' : "推移门",
    'door_tuiyi1' : "推移门1",
    'door_tuiyi2' : "推移门2",
    'door_yushi' : "浴室门",
    'door_chufang' : "厨房门",
    'door_ruhu' : "入户门",
    'window_putong' : "普通窗",
    'window_putong1' : "普通窗1",
    'window_putong2' : "普通窗2",
    'window_luodi' : "落地窗",
    'window_luodi1' : "落地窗1",
    'window_luodi2' : "落地窗2",
    'window_piao' : "飘窗",
    'window_piao1' : "飘窗1",
    'window_piao2' : "飘窗2",

    'door_dong' : "门洞",

    'rect_struct' : "梁柱",
    'droppedceiling' : "吊顶",

  };

  var activeStlye = 'btn-primary disabled';

  this.eventHandle = engine.handle;
  this.floorplan = engine.floorplan;

  var scope = this;


  function createButton(id,name){

    var btn=$("<button id='"+id+"' class='btn btn-sm btn-default'><span class='glyphicon glyphicon-pencil'></span>"+name+"</button>");
    $("#floorplanner-controls").append(btn);
  }

  this.init = function () {

    for(var key in BUTTON_NAME){

      createButton(key,BUTTON_NAME[key]);
    }

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

      // if (mode == clickModes.DRAW) {
      //   $("#draw-walls-hint").show('slow');
      // //  scope.handleWindowResize();
      // } else {
      //   $("#draw-walls-hint").hide('fast');
      // }

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
      }else if(mode <30){
          scope.floorplan.newInWall(mode);
          scope.eventHandle.setMode(clickModes.MOVE);
      }else if(mode == 30){
        scope.floorplan.newRectStruct(0);
        scope.eventHandle.setMode(clickModes.MOVE);

      }else if(mode == 40){
        scope.floorplan.newRectStruct(2);
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

