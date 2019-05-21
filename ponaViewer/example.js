

$(document).ready(function() {


  // // main setup
  // var opts = {
  //   canvasId: 'canvas2d',
  //   roomImgId: "roomBkg",
  //   wallSettingDivId: 'wallSetting',
  //   roomSettingDivId: 'roomSetting',
  //   wallLengthSettingDivId:'wallLengthSetting',

  // };
  // var engine = new IMAPIC2D.Engine(opts);
  // new viewer(engine).init();
  // engine.toggle.isPC = true;

  // var load = new loadControl(engine);
  // load.newDesign();

  // // engine.setPixelsPerCm(0.7);
  // engine.handle.updatePixelsPerCm();
  // engine.draw();





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


  

    // var id = GetQueryString('id');


    // loadHouseByID();



 

});


function getCaseByID(id){


  var url = 'http://box.imapic.cn'

  $.get(url + '/miniapp/api/case3d/getcase?id=' + id,function(response){

    if(response.Code != 200 ){
      alert('返回码'+ response.Code);
      return;
    }

    if(response.Data == null){
      alert('返回数据为空！');
      return;
    }


    var data = response.Data.CaseJson;
    var jsonData = JSON.parse(data);
    var list = jsonData.itemList;


    var output = "";
    for (var i = 0; i < list.length; i++) {
      var id = list[i].model;
      if(id.length > 2){
        output += "'"+ id +"',</br>";
      }
    }


    document.write(output);

  });


    

}

      var container;

      var camera, scene, renderer;

      var spheres = [];

      var mouseX = 0, mouseY = 0;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      function createPona(){
        

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        init();
        animate();

            

      }


      function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
        camera.position.z = 3200;

        scene = new THREE.Scene();
        scene.background = new THREE.CubeTextureLoader()
          .setPath( 'textures/cube/Park3Med/' )
          .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );

        

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function onDocumentMouseMove( event ) {

        mouseX = ( event.clientX - windowHalfX ) * 10;
        mouseY = ( event.clientY - windowHalfY ) * 10;

      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();

      }

      function render() {

        var timer = 0.0001 * Date.now();

        for ( var i = 0, il = spheres.length; i < il; i ++ ) {

          var sphere = spheres[ i ];

          sphere.position.x = 5000 * Math.cos( timer + i );
          sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

        }

        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;

        camera.lookAt( scene.position );

        renderer.render( scene, camera );

      }


