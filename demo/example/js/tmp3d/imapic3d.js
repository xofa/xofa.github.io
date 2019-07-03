/**
 */

var Imapic3D = function (containerID) {



	this.container = document.getElementById(containerID);
	this.screen = { left: 0, top: 0, width: 0, height: 0 };
	

	this.sizeHalf = 0;
	this.aspect = 1.0;

	this.viewDistance = 3000;

	this.scene = new THREE.Scene();

	this.camera = undefined;


	this.renderer = undefined;
	this.controls = undefined;
	this.controlsDrag = undefined;

	this.selectArray = [];
	// this.selectArray = new THREE.Group();
	// this.scene.add(this.selectArray);


	this.mouse = new THREE.Vector2();
	this.selected = undefined;
	this.selectedHelper = new THREE.BoxHelper();
	this.scene.add( this.selectedHelper );

	this.raycaster = new THREE.Raycaster();


	// this.modelFBXloader = new THREE.FBXLoader();

	
	// var box = new THREE.BoxHelper();
	// this.scene.add( box );


	this.houseGroup = new THREE.Group();
	this.scene.add(this.houseGroup);


	this.init();
};

Imapic3D.prototype = {

	constructor: Imapic3D,

	init: function ( ) {


		this.initRenderer();

		this.initCamera();

		this.initEvent();

		this.initControls();

		this.initOther();

		this.animate();
	},



	initEvent: function (){

		document.addEventListener("resize",this.onWindowResize.bind(this),false);
		// this.container.addEventListener("keydown",this.onKeyDown.bind(this),false);
		// document.addEventListener("keydown",this.onKeyDown.bind(this),false);
		
    	// this.renderer.domElement.addEventListener("mousedown",this.handleMouseDown.bind(this),false);
    	// this.renderer.domElement.addEventListener("mousemove",this.handleMouseMove.bind(this),false);
	},

	initCamera: function (){

		this.camera = new THREE.PerspectiveCamera( 50, this.screen.width / this.screen.height, 1, 100000 );
		
		var distance = 3000;
		this.camera.position.set(distance,distance,distance);
	},

	updateCameraPosition: function (){
		
	},

	initRenderer: function (){

	  	this.renderer = new THREE.WebGLRenderer({ 
		  	antialias: true,
		  	canvas:this.container,
		  	alpha: true,
	        preserveDrawingBuffer: true
	    });


		this.updateCanvasSize();

		// document.body.appendChild(this.renderer.domElement);

		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(this.screen.width, this.screen.height);
		this.renderer.gammaOutput = true;
		this.renderer.gammaInput = true;

	  // this.renderer.shadowMap.enabled = true;
	  // this.renderer.shadowMap.type = THREE.PCFShadowMap;

	},

	initControls: function (){

		// this.controls = new THREE.OrthographicTrackballControls( this.camera ,this.renderer.domElement);//,
		this.controls = new THREE.OrbitControls( this.camera ,this.renderer.domElement);//,
		// this.controls.zoomSpeed = 1.0;
		// this.controls.rotateSpeed = 0.8;
		// this.controls.panSpeed = 0.5;
		// this.controls.staticMoving = true;

		this.controls.minDistance = 1;
		this.controls.maxDistance = 10000;

		// this.controlsDrag = new THREE.DragControls( this.selectArray, this.camera, this.renderer.domElement );

		// var self = this;
		// this.controlsDrag.addEventListener( 'dragstart', function ( event ) { 

		// 	console.log('dragstart');
		// 	// console.log(event.object);
		// 	self.controls.enabled = false; } );
		// this.controlsDrag.addEventListener( 'dragend', function ( event ) { self.controls.enabled = true; } );

	},


	initOther: function (){

		// this.backgroundMap = new THREE.TextureLoader().load('static/textures/background.jpg');
		// this.backgroundMap.mapping = THREE.SphericalReflectionMapping;

		// var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(20000,20000,200),
		// new THREE.MeshBasicMaterial({side:THREE.BackSide,map:this.backgroundMap,depthWrite:false}));
		// this.scene.add(sphere);

		// this.scene.background = new THREE.CubeTextureLoader()
		this.scene.background = new THREE.Color(0xffffff);
		// 	.setPath( 'static/textures/default/cube/skyboxsun25deg/' )
		// 	.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );

		// this.scene.background.format = THREE.RGBFormat;
		// this.scene.background.mapping = THREE.CubeReflectionMapping;

		// var light = new THREE.DirectionalLight( 0xffffff );
		// 	light.position.set( 1, 1, 1 );
		// 	this.scene.add( light );

		var light = new THREE.AmbientLight( 0x111111 );
     		this.scene.add( light );


		// var light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 2 );
		// 		light.position.set( 0, 1500, 200 );
		// 		light.target.position.set( 0, 0, 0 );

		// 		light.castShadow = true;

		// 		light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 1, 2500 ) );
		// 		light.shadow.bias = 0.0005;

		// 		light.shadow.mapSize.width = 1024;
		// 		light.shadow.mapSize.height = 1024;
			// this.scene.add( light );

			// this.scene.add( new THREE.CameraHelper( light.shadow.camera ) );

     	var	hemiLight = new THREE.HemisphereLight( 0x888888, 0x888888);
			// hemiLight.color.setHSL( 0.6, 1, 0.6 );
			// hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
			hemiLight.position.set( 0, 2500, 0 );
			this.scene.add( hemiLight );

		var dirLight = new THREE.DirectionalLight(0xffffff);
			dirLight.position.set(200,200,200);
			this.scene.add(dirLight);

		// ground
		// var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false } ) );
		// 	mesh.rotation.x = - Math.PI / 2;
		// 	mesh.receiveShadow = true;
		// 	this.scene.add( mesh );

		// var grid = new THREE.GridHelper( 10000, 100, 0x00ff00, 0x000000 );
		// 	grid.material.opacity = 0.3;
		// 	grid.position.y  = -1;
		// 	grid.material.transparent = true;
		// 	this.scene.add( grid );

   //    	var gridHelper = new THREE.GridHelper( 4000, 10, 0x00ff00, 0x838383 );
			// this.scene.add( gridHelper );


	},





	animate: function () {

      requestAnimationFrame(this.animate.bind(this));
  
      this.render();

      if(this.controls!==undefined && this.controls.enabled)
      	 this.controls.update();

  
    },

    render: function (){


      	this.renderer.render(this.scene, this.camera);
    },



	reLocationCameraAndControlTarget(modelArray){

		var box = new THREE.Box3();
		for (var i = 0; i < modelArray.length; i++) {
			// var curBox = new THREE.Box3().setFromObject( modelArray[i] );

			box.expandByObject(modelArray[i]);
		}

		var size = new THREE.Vector3();
		var center = new THREE.Vector3();
		box.getSize(size);
		box.getCenter(center);

		// console.log(size);
  //       console.log(center);

		// var sphere = new THREE.Sphere().setFromPoints([box.min,box.max]);
		// console.log(sphere);

		var dis = Math.max(size.x,size.y);

		this.camera.position.set(center.x, center.y,dis*1.5);
		this.controls.target.copy(center);

	},


	addItem: function (object){

		this.selectArray.push(object);

		object.traverse(function(child){

			if(child instanceof THREE.Mesh){

				child.material = new THREE.MeshPhongMaterial({color:0x888888,specular:0xffffff,shininess:200});
				// child.material = new THREE.MeshBasicMaterial({color:0xd3d3d3});
				// child.castShadow = true;
				// child.receiveShadow = true;
			}
		});

		this.reLocationCameraAndControlTarget(this.selectArray);

		this.scene.add(object);
	},

	addHouse : function(mesh,type){
        if(mesh.type !== 'Mesh')
            return;

        this.selectArray.push(mesh);

		this.reLocationCameraAndControlTarget(this.selectArray);
        
        this.houseGroup.add(mesh);
    },

    loadFrom2D : function (str) {

        var self = this;
        
        var generator = new IMAPIC3D.RoomGenerator(undefined,true);
        var data = JSON.parse(str);

        // var json = {"floorplan":{"corners":[{"id":"f49a22c3-3125-5b4d-a921-2413f310ad19","x":-337.739176346357,"y":231.59239704329457},{"id":"933cd287-1ed6-2514-9ad3-338885904857","x":-478.739176346357,"y":231.59239704329457},{"id":"46ba6729-b12c-438f-6733-3d9ff44866f9","x":-300.0796812749004,"y":-262.40760295670543},{"id":"bc9267ad-4ae6-907d-0f46-b753ab4f8c23","x":-478.739176346357,"y":186.59239704329457},{"id":"ee6d981f-e63e-6bc4-e2bb-9681ba6ae198","x":-337.739176346357,"y":-262.40760295670543},{"id":"b6e4c858-805d-6a43-b45a-9daf4a0bdb86","x":-712.739176346357,"y":-262.40760295670543},{"id":"8afcfa93-0a24-8418-61a8-c81985524bc9","x":-712.739176346357,"y":186.59239704329457}],"walls":[{"id":"bc36e8f4-090d-a82a-7ce3-5a2cb469123d","thickness":24,"cornerIndex":["ee6d981f-e63e-6bc4-e2bb-9681ba6ae198","f49a22c3-3125-5b4d-a921-2413f310ad19"]},{"id":"2b7002d0-b825-c932-f0c0-0c268b28e1a1","thickness":24,"cornerIndex":["f49a22c3-3125-5b4d-a921-2413f310ad19","933cd287-1ed6-2514-9ad3-338885904857"]},{"id":"d3cd4dcf-2b98-10ed-1abf-9922af934f76","thickness":24,"cornerIndex":["933cd287-1ed6-2514-9ad3-338885904857","bc9267ad-4ae6-907d-0f46-b753ab4f8c23"]},{"id":"febdb821-13e7-e2c9-7b80-aeb773da0368","thickness":24,"cornerIndex":["bc9267ad-4ae6-907d-0f46-b753ab4f8c23","8afcfa93-0a24-8418-61a8-c81985524bc9"]},{"id":"1c25c727-dcf4-777b-25bb-425e2a663553","thickness":24,"cornerIndex":["ee6d981f-e63e-6bc4-e2bb-9681ba6ae198","b6e4c858-805d-6a43-b45a-9daf4a0bdb86"]},{"id":"d796da49-d4e2-6e86-d5a7-c860d8f304e6","thickness":24,"cornerIndex":["b6e4c858-805d-6a43-b45a-9daf4a0bdb86","8afcfa93-0a24-8418-61a8-c81985524bc9"]}],"inWalls":[{"id":"0b29e897-29b9-007f-58b5-3b42a1af7016","wallId":"bc36e8f4-090d-a82a-7ce3-5a2cb469123d","modelId":0,"offset":340.93067987978236,"length":150.4,"lengthScaled":1.168303327877796,"dir":1,"bottom":0,"height":205,"type":2},{"id":"dcf1c5e9-8fdc-7f84-8973-141d1cdccef2","wallId":"2b7002d0-b825-c932-f0c0-0c268b28e1a1","modelId":0,"offset":71.09273248555178,"length":180,"lengthScaled":0.49488234673419873,"dir":1,"bottom":50,"height":195,"type":10},{"id":"b700a988-6b3b-8d61-8b72-050184e5af51","wallId":"febdb821-13e7-e2c9-7b80-aeb773da0368","modelId":0,"offset":86.21873091514055,"length":180,"lengthScaled":0.8135414546126728,"dir":1,"bottom":50,"height":195,"type":10}],"rooms":[{"id":"23430561-9586-b6a2-932a-42735c55bb97","name":"未命名","cornerIndex":["f49a22c3-3125-5b4d-a921-2413f310ad19","933cd287-1ed6-2514-9ad3-338885904857","bc9267ad-4ae6-907d-0f46-b753ab4f8c23","8afcfa93-0a24-8418-61a8-c81985524bc9","b6e4c858-805d-6a43-b45a-9daf4a0bdb86","ee6d981f-e63e-6bc4-e2bb-9681ba6ae198"]}]}};
        // var data = json.floorplan;
        // console.log(data);
          if(data == null || !('walls' in data) ) {return;}


          var inWallsJson = data['inWalls'];
          // inWallsJson.forEach((item)=>{
          //   loadItem(loader,item['uuid'],item['matrix'],self.addItem.bind(self));
          // });

          data['walls'].forEach((wall)=>{

            var _inWallsArray = [];
            for (var i = inWallsJson.length - 1; i >= 0; i--) {
              if(inWallsJson[i]['wallId'] == wall.id){ _inWallsArray.push(inWallsJson[i]); }
            }
            generator.generateWall(undefined,wall,_inWallsArray,self.addHouse.bind(self));
          });

          // if(!('rooms' in data) ) {return;}
          data['rooms'].forEach((room)=>{
            var center = generator.generateRoom(room,self.addHouse.bind(self));
            // centerArray.push(new THREE.Vector2(center.x,center.y));
          });

    },


    updateCanvasSize(){

  		var rect = this.renderer.domElement.getBoundingClientRect();
     	this.screen.left = rect.left;
     	this.screen.top = rect.top;
     	this.screen.width = rect.width;
     	this.screen.height = rect.height;
    },



	onWindowResize: function (){

		// this.container.style.height = this.screen.height;

		// this.computeScreenSize();

      // canvas_size.set($("#mainCanvas").width(),$("#mainCanvas").height());
      // console.log(canvas_size.x,canvas_size.y);

   		this.updateCanvasSize();

		this.camera.aspect = this.screen.width / this.screen.height;
        this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.screen.width, this.screen.height);
		// this.renderer.setSize(this.screen.width, this.screen.height);
		

      	// this.render();
	},



	intersectObjects: function ( pointer, objects ) {

		var rect = this.renderer.domElement.getBoundingClientRect();
		var x = ( pointer.clientX - rect.left ) / rect.width;
		var y = ( pointer.clientY - rect.top ) / rect.height;

		var pointerVector = new THREE.Vector2( ( x * 2 ) - 1, - ( y * 2 ) + 1 );
		this.raycaster.setFromCamera( pointerVector, this.camera );

		var intersections = this.raycaster.intersectObjects( objects, true );
		return intersections[ 0 ] ? intersections[ 0 ].object : undefined;
		// return intersections[ 0 ] ? this.callbackIndeedSelected(intersections[ 0 ].object ) : undefined;

	},

	handleMouseDown: function (event){

		console.log('3d down');

		// event.preventDefault();



		var selected = this.intersectObjects(event,this.selectArray/*.children*/);

		// console.log(selected);

		
		if(this.selected != selected){
	

			if(selected !== undefined){


				this.selectedHelper.setFromObject(selected);

				this.selected = selected;

			
			}
		}

		// this.controls.enabled = selected !== undefined ? false : true;


	},


	handleMouseMove: function (event){

		if(this.selected === undefined )
			return;

		var _plane = new THREE.Plane(new THREE.Vector3(0,1,0));//this.camera.getWorldDirection( )
		_plane.setFromNormalAndCoplanarPoint( _plane.normal , this.selected.position );

		// console.log(_plane);

	 	var a = this.raycaster.ray.intersectPlane( _plane,new THREE.Vector3() );

	 	// this.selected.position.add(a);

	 	// console.log(a);

	
		
	},

	disposeNode: function (parentObject) {

		if(!parentObject || !parentObject.children) return;

	    parentObject.traverse(function (node) {
	        if (node instanceof THREE.Mesh) {
	            if (node.geometry) {
	                node.geometry.dispose();
	            }
	            if (node.material) {
	                var materialArray;
	                if (node.material instanceof THREE.MeshFaceMaterial || node.material instanceof THREE.MultiMaterial) {
	                    materialArray = node.material.materials;
	                }
	                else if (node.material instanceof Array) {
	                    materialArray = node.material;
	                }
	                if (materialArray) {
	                    materialArray.forEach(function (mtrl, idx) {
	                        if (mtrl.map) mtrl.map.dispose();
	                        if (mtrl.lightMap) mtrl.lightMap.dispose();
	                        if (mtrl.bumpMap) mtrl.bumpMap.dispose();
	                        if (mtrl.normalMap) mtrl.normalMap.dispose();
	                        if (mtrl.specularMap) mtrl.specularMap.dispose();
	                        if (mtrl.envMap) mtrl.envMap.dispose();
	                        mtrl.dispose();
	                    });
	                }
	                else {
	                    if (node.material.map) node.material.map.dispose();
	                    if (node.material.lightMap) node.material.lightMap.dispose();
	                    if (node.material.bumpMap) node.material.bumpMap.dispose();
	                    if (node.material.normalMap) node.material.normalMap.dispose();
	                    if (node.material.specularMap) node.material.specularMap.dispose();
	                    if (node.material.envMap) node.material.envMap.dispose();
	                    node.material.dispose();
	                }
	            }
	        }
	    });
	},

	disposeHierarchy:function (node, callback) {

		if(!node || !node.children) return;

	    for (var i = node.children.length - 1; i >= 0; i--) {
	        var child = node.children[i];
	        this.disposeHierarchy(child, callback);
	        callback(child);
	    }
	},

	disposeGroup:function(group){

		this.disposeHierarchy(group,this.disposeNode.bind(this));
	}

	




};
