

TransformControls = function ( camera, domElement ) {

	THREE.Object3D.call( this );

	domElement = ( domElement !== undefined ) ? domElement : document;

	this.visible = false;


	var _gizmo = new TransformControlsGizmo();
	this.add( _gizmo );

	var _plane = new TransformControlsPlane();
	this.add( _plane );

	var scope = this;

	// Define properties with getters/setter
	// Setting the defined property will automatically trigger change event
	// Defined properties are passed down to gizmo and plane

	defineProperty( "camera", camera );
	defineProperty( "object", undefined );
	defineProperty( "enabled", true );
	defineProperty( "axis", null );
	defineProperty( "mode", "translate" );
	defineProperty( "translationSnap", null );
	defineProperty( "rotationSnap", null );
	defineProperty( "space", "world" );
	defineProperty( "size", 1 );
	defineProperty( "dragging", false );
	defineProperty( "showX", true );
	defineProperty( "showY", true );
	defineProperty( "showZ", true );

	var changeEvent = { type: "change" };
	var mouseDownEvent = { type: "mouseDown" };
	var mouseUpEvent = { type: "mouseUp", mode: scope.mode };
	var objectChangeEvent = { type: "objectChange" };

	// Reusable utility variables

	var ray = new THREE.Raycaster();

	var _tempVector = new THREE.Vector3();
	var _tempVector2 = new THREE.Vector3();
	var _tempQuaternion = new THREE.Quaternion();
	var _unit = {
		X: new THREE.Vector3( 1, 0, 0 ),
		RY: new THREE.Vector3( 0, 1, 0 ),
		Z: new THREE.Vector3( 0, 0, 1 )
	};
	var _identityQuaternion = new THREE.Quaternion();
	var _alignVector = new THREE.Vector3();

	var pointStart = new THREE.Vector3();
	var pointEnd = new THREE.Vector3();
	var rotationAxis = new THREE.Vector3();
	var rotationAngle = 0;

	var cameraPosition = new THREE.Vector3();
	var cameraQuaternion = new THREE.Quaternion();
	var cameraScale = new THREE.Vector3();

	var parentPosition = new THREE.Vector3();
	var parentQuaternion = new THREE.Quaternion();
	var parentScale = new THREE.Vector3();

	var worldPositionStart = new THREE.Vector3();
	var worldQuaternionStart = new THREE.Quaternion();
	var worldScaleStart = new THREE.Vector3();

	var worldPosition = new THREE.Vector3();
	var worldQuaternion = new THREE.Quaternion();
	var worldScale = new THREE.Vector3();

	var eye = new THREE.Vector3();

	var _positionStart = new THREE.Vector3();
	var _quaternionStart = new THREE.Quaternion();
	var _scaleStart = new THREE.Vector3();

	//避免每次都去new 
	var _rotateEluer = new THREE.Euler();
	var _rotateQuaternion = new THREE.Quaternion();

	// TODO: remove properties unused in plane and gizmo

	defineProperty( "parentQuaternion", parentQuaternion );
	defineProperty( "worldPosition", worldPosition );
	defineProperty( "worldPositionStart", worldPositionStart );
	defineProperty( "worldQuaternion", worldQuaternion );
	defineProperty( "worldQuaternionStart", worldQuaternionStart );
	defineProperty( "cameraPosition", cameraPosition );
	defineProperty( "cameraQuaternion", cameraQuaternion );
	defineProperty( "pointStart", pointStart );
	defineProperty( "pointEnd", pointEnd );
	defineProperty( "rotationAxis", rotationAxis );
	defineProperty( "rotationAngle", rotationAngle );
	defineProperty( "eye", eye );

	{

		domElement.addEventListener( "mousedown", onPointerDown, false );
		domElement.addEventListener( "touchstart", onPointerDown, false );
		domElement.addEventListener( "mousemove", onPointerHover, false );
		domElement.addEventListener( "touchmove", onPointerHover, false );
		domElement.addEventListener( "touchmove", onPointerMove, false );
		document.addEventListener( "mouseup", onPointerUp, false );
		domElement.addEventListener( "touchend", onPointerUp, false );
		domElement.addEventListener( "touchcancel", onPointerUp, false );
		domElement.addEventListener( "touchleave", onPointerUp, false );
		domElement.addEventListener( "contextmenu", onContext, false );

	}

	this.dispose = function () {

		domElement.removeEventListener( "mousedown", onPointerDown );
		domElement.removeEventListener( "touchstart", onPointerDown );
		domElement.removeEventListener( "mousemove", onPointerHover );
		domElement.removeEventListener( "touchmove", onPointerHover );
		domElement.removeEventListener( "touchmove", onPointerMove );
		document.removeEventListener( "mouseup", onPointerUp );
		domElement.removeEventListener( "touchend", onPointerUp );
		domElement.removeEventListener( "touchcancel", onPointerUp );
		domElement.removeEventListener( "touchleave", onPointerUp );
		domElement.removeEventListener( "contextmenu", onContext );

	};

	// Set current object
	this.box = new THREE.Box3();

	this.boxRadius = 0;

	this.attach = function ( object ) {

		this.object = object;
		this.visible = true;


	};

	// Detatch from object
	this.detach = function () {

		this.object = undefined;
		this.visible = false;
		this.axis = null;

	};

	// Defined getter, setter and store for a property
	function defineProperty( propName, defaultValue ) {

		var propValue = defaultValue;

		Object.defineProperty( scope, propName, {

			get: function() {

				return propValue !== undefined ? propValue : defaultValue;

			},

			set: function( value ) {

				if ( propValue !== value ) {

					propValue = value;
					_plane[ propName ] = value;
					_gizmo[ propName ] = value;

					scope.dispatchEvent( { type: propName + "-changed", value: value } );
					scope.dispatchEvent( changeEvent );

				}

			}

		});

		scope[ propName ] = defaultValue;
		_plane[ propName ] = defaultValue;
		_gizmo[ propName ] = defaultValue;

	}

	// updateMatrixWorld  updates key transformation variables
	this.updateMatrixWorld = function () {

		if ( this.object !== undefined ) {

			this.object.updateMatrixWorld();
			this.object.parent.matrixWorld.decompose( parentPosition, parentQuaternion, parentScale );
			this.object.matrixWorld.decompose( worldPosition, worldQuaternion, worldScale );

		}

		this.camera.updateMatrixWorld();
		this.camera.matrixWorld.decompose( cameraPosition, cameraQuaternion, cameraScale );

		if ( this.camera instanceof THREE.PerspectiveCamera ) {

			eye.copy( cameraPosition ).sub( worldPosition ).normalize();

		} else if ( this.camera instanceof THREE.OrthographicCamera ) {

			eye.copy( cameraPosition ).normalize();

		}

		THREE.Object3D.prototype.updateMatrixWorld.call( this );

	};



	this.modeTest = function( ray,mode) {

		var intersect = ray.intersectObjects( _gizmo.picker[ mode ].children, true )[ 0 ] || false;

		if ( intersect ) {

			this.axis = intersect.object.name;

			this.mode = mode;
			return true;

		} else {

			this.axis = null;

		}

		return false;
	}



	this.pointerHover = function( pointer ) {

		if ( this.object === undefined || this.dragging === true || ( pointer.button !== undefined && pointer.button !== 0 ) ) return;

		ray.setFromCamera( pointer, this.camera );

		

		if(!this.modeTest(ray,'translate')){
			
			if(!this.modeTest(ray,'rotate')){

				if(ray.intersectObjects( this.object.children, true )[ 0 ] ){

					this.axis = "XYZK";
					this.mode = "translate";
					return;
				}
			}
		}else{
			// _gizmo.gizmo[ "rotate" ].visible = false;
		}

		this.dispatchEvent(changeEvent);


	};

	function changeSpace(){

		if ( this.mode === 'scale') {

			this.space = 'local';

		} else if ( this.axis === 'E' ||  this.axis === 'XYZE' ||  this.axis === 'XYZ' ) {

			this.space = 'world';

		}

	}

	this.placeList = [];

	this.setPlaceList = function(list){
		this.placeList = list;
	};

	this.floorplan = undefined;
	this.setFloorplan = function(floorplan){

		this.floorplan = floorplan;
	};

	this.getRooms = function(){

		return this.floorplan.getRooms() ;
	};


	this.containsPoint = function ( box ,point  ) {

		return point.x < box.min.x || point.x > box.max.x ||
				point.y < box.min.z || point.y > box.max.z ? false : true;

	};


	var intersectsBox =  ( function () {

		var v = new IMAPIC2D.Vec2();

        return function intersectsBox( line,box  ) {
		
          return line.intersectBox( box, v ) ;//!== null

        };

     } )();


	this.isInRoom = function(pnt){


		var rooms = this.floorplan.getRooms() ;
		if(rooms.length < 1) return false;

		var room = rooms[0];
		var points = room.innerPoints;


		// var xDis = (this.box.max.x - this.box.min.x)/2.0;
		// var zDis = (this.box.max.z - this.box.min.z)/2.0;

		// var tArr = [];
		// tArr.push( {x:pnt.x - xDis,y:pnt.z - zDis});
		// tArr.push( {x:pnt.x - xDis,y:pnt.z + zDis});
		// tArr.push( {x:pnt.x + xDis,y:pnt.z + zDis});
		// tArr.push( {x:pnt.x + xDis,y:pnt.z - zDis});

		// for (let i = 0; i < tArr.length; i++) {
		// 	const element = tArr[i];
		// 	if(!IMAPIC2D.Core.Utils.isPointInsidePolygon(element,points)){
		// 		return false;
		// 	}
		// }

		return true;
	};


	var computeBackVec = function(polygon,box){

		var tArr = [];
		tArr.push( {x:box.min.x,y:box.min.y });
		tArr.push( {x:box.min.x,y:box.max.y });
		tArr.push( {x:box.max.x,y:box.max.y });
		tArr.push( {x:box.max.x,y:box.max.y });

		var dis = 0 ;
		for (let i = 0; i < tArr.length; i++) {
			const element = tArr[i];
			if(!IMAPIC2D.Core.Utils.isPointInsidePolygon(element,points)){
				return false;
			}
		}
	};
	
	this.isCollisionWithWall = function(moveLine){

		if ( this.object === undefined ) return false;

		var rooms = this.floorplan.getRooms() ;
		if(rooms.length < 1) return false;

		var room = rooms[0];
		var points = room.innerPoints;

		// var pos = this.object.position;
		// var q = new IMAPIC2D.Vec2(pos.x,pos.z);

		var box = this.box.clone().translate(moveLine);
		box.min.y = box.min.z;
		box.max.y = box.max.z;

		for (let i = 0; i < points.length; i++) {

			var p1 = points[i];
			var p2 = i+1 == points.length ? points[0] : points[i+1];

			// var line = new IMAPIC2D.Line(p1,p2);

			// if(intersectsBox(line,box) !== null){
			// 	return true;
			// }
			// var p0 = line.closestPointOnLine(q);

			// var p0 = line.GetSnapPointOrNot(p1,p2,dir);

			// if(p0 && p0.distanceTo(dir.end) < 20){

			// 	this.object.position.x = p0.x;
			// 	this.object.position.z = p0.y;
			// 	return true;
			// }

			var p = moveLine.GetCrossPoint(p1,p2);

			if(p){
				
				return p;
			}

			
		}

		return false;


	};


	function GetIntersect(pointer){

		ray.setFromCamera( pointer, scope.camera );

		var list = scope.mode === 'translate' && (scope.axis.indexOf("XYZ")>-1) ? scope.placeList : [ _plane ];
	
		return ray.intersectObjects( list, true )[ 0 ] || false;
	}

	this.pointerDown = function( pointer ) {

		if ( this.object === undefined || this.axis === null || this.dragging === true || ( pointer.button !== undefined && pointer.button !== 0 )  ) return;
		// if(this.axis === null) return;
		

		var planeIntersect = GetIntersect(pointer);

		if ( planeIntersect ) {

			// console.log(planeIntersect.object);
			// changeSpace();

			this.object.updateMatrixWorld();
			this.object.parent.updateMatrixWorld();

			_positionStart.copy( this.object.position );
			_quaternionStart.copy( this.object.quaternion );
			_scaleStart.copy( this.object.scale );

			this.object.matrixWorld.decompose( worldPositionStart, worldQuaternionStart, worldScaleStart );

			pointStart.copy( planeIntersect.point ).sub( worldPositionStart );


			// this.object.userData.radius = 

			this.box.setFromObject(this.object);


		}

		this.dragging = true;
		mouseDownEvent.mode = this.mode;
		this.dispatchEvent( mouseDownEvent );

	};


	this.pointerMove = function( pointer ) {

		var axis = this.axis;
		var mode = this.mode;
		var object = this.object;
		var space = this.space;

		// changeSpace();

		if ( object === undefined  || axis === null || this.dragging === false || ( pointer.button !== undefined && pointer.button !== 0 ) ) return;
		// if ( axis === null ) return;
		
		var planeIntersect = GetIntersect(pointer);
		if ( planeIntersect === false ) return;

		// console.log(planeIntersect.point );

		pointEnd.copy( planeIntersect.point ).sub( worldPositionStart );

		if ( mode === 'translate' ) { //|| axis === null

			// if(axis !== null){
			if ( axis.search( 'X' ) === -1 ) {
				pointEnd.x = pointStart.x;
			}
			if ( axis.search( 'Y' ) === -1 ) {
				pointEnd.y = pointStart.y;
			}
			if ( axis.search( 'Z' ) === -1 ) {
				pointEnd.z = pointStart.z;
			}
// }

			// console.log(pointStart,pointEnd);
			
			// console.time("move");

			// var moveVec = pointEnd.clone().sub( pointStart );

			var moveLine = new IMAPIC2D.Line().fromNumber(pointStart.x,pointStart.z,pointEnd.x,pointEnd.z);

			var pos = pointEnd.clone().sub( pointStart ).add( _positionStart );

			// var p = this.isCollisionWithWall(moveLine);
			// if(p){
			// 	// console.log(p);
			// 	// pointEnd.x = p.x;
			// 	// pointEnd.z -= p.y;
			// 	// pointEnd.sub( worldPositionStart );

			// 	// var xLenHalf = (this.box.max.x - this.box.min.x) / 2;
			// 	// var yLenHalf = (this.box.max.y - this.box.min.y) / 2;
			// 	// pos.x -= p.x > 0 ? p.x -  xLenHalf : p.x +  xLenHalf;
			// 	// pos.z -= p.y > 0 ? p.y -  yLenHalf : p.y +  yLenHalf;

			// 	// pos.sub(pointEnd);
			// }
			
			if(this.translationSnap != null){

				if ( axis.search( 'X' ) !== - 1 ) {

					pos.x = Math.round( pos.x / this.translationSnap ) * this.translationSnap;

				}

				if ( axis.search( 'Y' ) !== - 1 ) {

					pos.y = Math.round( pos.y / this.translationSnap ) * this.translationSnap;

				}

				if ( axis.search( 'Z' ) !== - 1 ) {

					pos.z = Math.round( pos.z / this.translationSnap ) * this.translationSnap;

				}
			}

			pos.y = Math.max(pos.y,0);
			object.position.copy(pos );
			
			// console.timeEnd("move");
			


		}else if ( mode === 'rotate' ) {

			var ROTATION_SPEED = 20 / worldPosition.distanceTo( _tempVector.setFromMatrixPosition( this.camera.matrixWorld ) );

			var quaternion = this.space === "local" ? worldQuaternion : _identityQuaternion;

			var unit = _unit[ axis ];

			if ( axis === 'X' || axis === 'RY' || axis === 'Z' ) {

				_alignVector.copy( unit ).applyQuaternion( quaternion ); 

				rotationAxis.copy( unit );

				_tempVector = unit.clone();
				_tempVector2 = pointEnd.clone().sub( pointStart );
		
				rotationAngle = _tempVector2.dot( _tempVector.cross( eye ).normalize() ) * ROTATION_SPEED;

			}
			

			this.rotationAngle = rotationAngle;

			// threejs默认是将移动的变量大小进行吸附，将其改为为最终模型的实际旋转角度进行吸附。 2019.1.2 fanhuan

			// if ( space === 'local' ) {

			// 	object.quaternion.copy( _quaternionStart );
			// 	object.quaternion.multiply( _tempQuaternion.setFromAxisAngle( rotationAxis, rotationAngle ) );

			// } else {

				object.quaternion.copy( _tempQuaternion.setFromAxisAngle( rotationAxis, rotationAngle ) ).multiply( _quaternionStart );
				

				if(this.rotationSnap){

					var _eluer = _rotateEluer.setFromQuaternion( object.quaternion );

					var targetSnapAngle = Math.round( _eluer.y / this.rotationSnap ) * this.rotationSnap;
					if ( Math.abs(targetSnapAngle - _eluer.y ) < Math.PI / 36) {

						_eluer.y = targetSnapAngle;
						_rotateQuaternion.setFromEuler(_eluer,false);
						object.quaternion.copy(_rotateQuaternion);
					}
					// console.log(_eluer.x*180/Math.PI,_eluer.y*180/Math.PI,_eluer.z*180/Math.PI);

				}
	
			// }

		}


		this.dispatchEvent( changeEvent );
		this.dispatchEvent( objectChangeEvent );

	};

	this.pointerUp = function( pointer ) {

		if ( pointer.button !== undefined && pointer.button !== 0 ) return;

		if ( this.dragging && ( this.axis !== null ) ) {//

			mouseUpEvent.mode = this.mode;
			this.dispatchEvent( mouseUpEvent );

		}

		this.dragging = false;

		if ( pointer.button === undefined ) this.axis = null;

	};

	// normalize mouse / touch pointer and remap {x,y} to view space.

	function getPointer( event ) {

		var pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;

		var rect = domElement.getBoundingClientRect();

		return {
			x: ( pointer.clientX - rect.left ) / rect.width * 2 - 1,
			y: - ( pointer.clientY - rect.top ) / rect.height * 2 + 1,
			button: event.button
		};

	}

	// mouse / touch event handlers

	function onContext( event ) {

		event.preventDefault();

	}

	function onPointerHover( event ) {

		if ( !scope.enabled ) return;

		scope.pointerHover( getPointer( event ) );

	}

	function onPointerDown( event ) {

		if ( !scope.enabled ) return;

		event.preventDefault();
		
		document.addEventListener( "mousemove", onPointerMove, false );

		scope.pointerHover( getPointer( event ) );
		scope.pointerDown( getPointer( event ) );

	}

	function onPointerMove( event ) {

		if ( !scope.enabled ) return;

		event.preventDefault();

		// scope.pointerHover( getPointer( event ) );
		scope.pointerMove( getPointer( event ) );

	}

	function onPointerUp( event ) {

		
		if ( !scope.enabled ) return;


		event.preventDefault(); // Prevent MouseEvent on mobile

		
		document.removeEventListener( "mousemove", onPointerMove, false );
		// scope.pointerHover( getPointer( event ) );

		scope.pointerUp( getPointer( event ) );

	}

	// TODO: depricate

	this.getMode = function () {

		return scope.mode;

	};

	this.setMode = function ( mode ) {

		scope.mode = mode;

	};

	this.setTranslationSnap = function ( translationSnap ) {

		scope.translationSnap = translationSnap;

	};

	this.setRotationSnap = function ( rotationSnap ) {

		scope.rotationSnap = rotationSnap;

	};

	this.setSize = function ( size ) {

		scope.size = size;

	};

	this.setSpace = function ( space ) {

		scope.space = space;

	};

	this.update = function () {

		console.warn( 'THREE.TransformControls: update function has been depricated.' );

	};

};

TransformControls.prototype = Object.assign( Object.create( THREE.Object3D.prototype ), {

  constructor: TransformControls,

  isTransformControls: true

} );


TransformControlsGizmo = function () {

	'use strict';

	THREE.Object3D.call( this );

	this.type = 'TransformControlsGizmo';

	// shared materials

	var gizmoMaterial = new THREE.MeshBasicMaterial({
		depthTest: false,
		depthWrite: false,
		transparent: true,
		side: THREE.DoubleSide,
		fog: false,
		opacity:0.7
	});

	// Make unique material for each axis/color

	var matInvisible = gizmoMaterial.clone();
	matInvisible.opacity = 0.15;


	// Gizmo definitions - custom hierarchy definitions for setupGizmo() function

	var ArrowGeometry = function( h,w ) {


		var shape = new THREE.Shape();
			shape.moveTo( 0, 1 );
			shape.lineTo( -2*w, h );
			shape.lineTo( -w, h );
			shape.lineTo( -w, 0.4 );
			shape.lineTo( w, 0.4 );
			shape.lineTo( w, h );
			shape.lineTo( 2*w, h );
			shape.moveTo( 0,  1 );

			
		var geometry = new THREE.ShapeBufferGeometry( shape );

		return geometry;

	}

	var RotateGeometry = function( iR,oR,a ) {


		var arLen = 0.05;
		var arAng = Math.PI/20.0;//箭头偏移角度


		var angleStart = Math.PI * 0.5 - a;
		var angleEnd = Math.PI * 0.5 + a;


		var Ssa = Math.sin(a);
		var Sca = Math.cos(a);

		var Asa = Math.sin(a + arAng);
		var Aca = Math.cos(a + arAng);
		var AL = (iR + oR) * 0.5;

		var shape = new THREE.Shape();
			shape.moveTo( iR*Ssa, iR*Sca );

			shape.lineTo( (iR-arLen)*Ssa, (iR-arLen)*Sca );
			shape.lineTo( AL*Asa, AL*Aca );
			shape.lineTo( (oR+arLen)*Ssa, (oR+arLen)*Sca );

			shape.lineTo( oR*Ssa, oR*Sca );
			shape.absarc( 0,0, oR, angleStart,angleEnd, false);

			shape.lineTo( -(oR+arLen)*Ssa, (oR+arLen)*Sca );
			shape.lineTo( -AL*Asa, AL*Aca );
			shape.lineTo( -(iR-arLen)*Ssa, (iR-arLen)*Sca );
			shape.lineTo( -iR*Ssa, iR*Sca );

			shape.absarc( 0,0, iR, angleEnd, angleStart, true);

			// shape.lineTo( -iR*Ssa, iR*Sca );
			
		var geometry = new THREE.ShapeBufferGeometry( shape );

		return geometry;

	}

	var defaultMat = gizmoMaterial.clone();
	defaultMat.color.set( 0x479FFF );
	// var arrowGeometry = new THREE.CylinderBufferGeometry( 0, 0.05, 0.2, 12, 1, false);
	var arrowGeometry = new ArrowGeometry( 0.8,0.05);
	// var arrowMesh = new THREE.Mesh( arrowGeometry, defaultMat );

	var arrowMesh = new THREE.Mesh( arrowGeometry, defaultMat );

	var axisOffset = 0.5;

	var gizmoTranslate = {
		X: [
			[ new THREE.Mesh( arrowGeometry, defaultMat.clone() ), [ axisOffset, 0, 0 ], [ 0, 0, -Math.PI / 2 ], null, 'fwd' ],
			[ new THREE.Mesh( arrowGeometry, defaultMat.clone() ), [ axisOffset, 0, 0 ], [ 0, 0, -Math.PI / 2 ], null, 'bwd' ],
			// [ new THREE.Line( lineGeometry, matLineRed ) ]
			// [ dirMesh, [ 0, 0.5, 0 ] ]
		],
		Y: [
			[ new THREE.Mesh( arrowGeometry, defaultMat.clone() ), [ 0, axisOffset, 0 ], null, null, 'fwd' ],
			[ new THREE.Mesh( arrowGeometry, defaultMat.clone() ), [ 0, axisOffset, 0 ], null, null, 'bwd' ],
			// [ dirMesh, [ 0, 0.5, 0 ] ]
			// [ new THREE.Line( lineGeometry, matLineGreen ), null, [ 0, 0, Math.PI / 2 ] ]
		],
		Z: [
			[ new THREE.Mesh( arrowGeometry, defaultMat.clone() ), [ 0, 0, axisOffset ], [ Math.PI / 2, 0, 0 ], null, 'fwd' ],
			[ new THREE.Mesh( arrowGeometry, defaultMat.clone() ), [ 0, 0, axisOffset ], [ Math.PI / 2, 0, 0 ], null, 'bwd' ],
			// [ dirMesh, [ 0, 0.5, 0 ] ]
			// [ new THREE.Line( lineGeometry, matLineBlue ), null, [ 0, -Math.PI / 2, 0 ] ]
		],
		XYZ: [
			// [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.1, 0 ), matWhiteTransperent ), [ 0, 0, 0 ], [ 0, 0, 0 ] ],
			[ new THREE.Mesh( new THREE.CircleBufferGeometry( 0.5, 20, 0, Math.PI * 2 ), matInvisible ), [ 0, 0, 0 ], [  -Math.PI / 2,0, 0 ] ],
		],
		// XY: [
		// 	[ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.295, 0.295 ), matYellowTransparent ), [ 0.15, 0.15, 0 ] ],
		// 	[ new THREE.Line( lineGeometry, matLineYellow ), [ 0.18, 0.3, 0 ], null, [ 0.125, 1, 1 ] ],
		// 	[ new THREE.Line( lineGeometry, matLineYellow ), [ 0.3, 0.18, 0 ], [ 0, 0, Math.PI / 2 ], [ 0.125, 1, 1 ] ]
		// ],
		// YZ: [
		// 	[ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.295, 0.295 ), matCyanTransparent ), [ 0, 0.15, 0.15 ], [ 0, Math.PI / 2, 0 ] ],
		// 	[ new THREE.Line( lineGeometry, matLineCyan ), [ 0, 0.18, 0.3 ], [ 0, 0, Math.PI / 2 ], [ 0.125, 1, 1 ] ],
		// 	[ new THREE.Line( lineGeometry, matLineCyan ), [ 0, 0.3, 0.18 ], [ 0, -Math.PI / 2, 0 ], [ 0.125, 1, 1 ] ]
		// ],
		// XZ: [
		// 	[ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.295, 0.295 ), matMagentaTransparent ), [ 0.15, 0, 0.15 ], [ -Math.PI / 2, 0, 0 ] ],
		// 	[ new THREE.Line( lineGeometry, matLineMagenta ), [ 0.18, 0, 0.3 ], null, [ 0.125, 1, 1 ] ],
		// 	[ new THREE.Line( lineGeometry, matLineMagenta ), [ 0.3, 0, 0.18 ], [ 0, -Math.PI / 2, 0 ], [ 0.125, 1, 1 ] ]
		// ]
	};

	var disOffset = 1.0;

	var pickerTranslate = {
		X: [
			[ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), matInvisible ), [ disOffset, 0, 0 ], [ 0, 0, -Math.PI / 2 ] ]
		],
		Y: [
			[ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), matInvisible ), [ 0, disOffset, 0 ] ]
		],
		Z: [
			[ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), matInvisible ), [ 0, 0, disOffset ], [ Math.PI / 2, 0, 0 ] ]
		],
		XYZ: [
			// [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.2, 0 ), matInvisible ) ]
			[ new THREE.Mesh( new THREE.CircleBufferGeometry( 0.6, 20, 0, Math.PI * 2 ), matInvisible), [ 0, 0, 0 ], [  -Math.PI / 2,0, 0 ] ],
			// [ new THREE.Mesh( new THREE.SphereBufferGeometry( 0.6, 20, 20, Math.PI * 2 ), matInvisible), [ 0, 0, 0 ], [  -Math.PI / 2,0, 0 ] ],

		]
	
	};

	var helperTranslate = {

	};

	var gizmoRotate = {
		// X: [
		// 	[ new THREE.Line( CircleGeometry( 1, 0.5 ), matLineRed ) ],
		// 	[ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.04, 0 ), matRed ), [ 0, 0, 0.99 ], null, [ 1, 3, 1 ] ],
		// ],
		RY: [
			// [ new THREE.Mesh( new THREE.RingBufferGeometry( 0.82, 1, 20, 5, Math.PI*0.2, Math.PI*0.6  ), defaultMat ), null, [ Math.PI / 2, 0, 0  ] ],
			[ new THREE.Mesh( new RotateGeometry( 0.68, 0.85,  Math.PI*0.4  ), defaultMat.clone() ), null, [ Math.PI / 2, 0, 0  ] ],
			[ new THREE.Mesh( new RotateGeometry( 0.68, 0.85,  Math.PI*0.4  ), defaultMat.clone() ), null, [ -Math.PI / 2, 0, 0  ] ],
			[ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.05, 0 ), defaultMat.clone() ), [ 0, 0, 0.84 ], null, [ 3, 1, 1 ] ],
		],
	
	};

	var helperRotate = {
		// AXIS: [
		// 	[ new THREE.Line( lineGeometry, matHelper.clone() ), [ -1e3, 0, 0 ], null, [ 1e6, 1, 1 ], 'helper' ]
		// ]
	};

	var pickerRotate = {
		// X: [
		// 	[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.1, 4, 24 ), matInvisible ), [ 0, 0, 0 ], [ 0, -Math.PI / 2, -Math.PI / 2 ] ],
		// ],
		RY: [
			[ new THREE.Mesh( new THREE.TorusBufferGeometry( 0.77, 0.14, 4, 24 ), matInvisible ), [ 0, 0, 0 ], [ Math.PI / 2, 0, 0 ] ],
		],
		// Z: [
		// 	[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.1, 4, 24 ), matInvisible ), [ 0, 0, 0 ], [ 0, 0, -Math.PI / 2 ] ],
		// ],
		// E: [
		// 	[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1.25, 0.1, 2, 24 ), matInvisible ) ]
		// ],
		// XYZE: [
		// 	[ new THREE.Mesh( new THREE.SphereBufferGeometry( 0.7, 10, 8 ), matInvisible ) ]
		// ]
	};

	var gizmoScale = {

	};

	var pickerScale = {

	};

	var helperScale = {

	};

	// Creates an Object3D with gizmos described in custom hierarchy definition.

	var setupGizmo = function( gizmoMap ) {

		var gizmo = new THREE.Object3D();

		for ( var name in gizmoMap ) {

			for ( var i = gizmoMap[ name ].length; i --; ) {

				var object = gizmoMap[ name ][ i ][ 0 ].clone();
				var position = gizmoMap[ name ][ i ][ 1 ];
				var rotation = gizmoMap[ name ][ i ][ 2 ];
				var scale = gizmoMap[ name ][ i ][ 3 ];
				var tag = gizmoMap[ name ][ i ][ 4 ];

				// name and tag properties are essential for picking and updating logic.
				object.name = name;
				object.tag = tag;

				if (position) {
					object.position.set(position[ 0 ], position[ 1 ], position[ 2 ]);
				}
				if (rotation) {
					object.rotation.set(rotation[ 0 ], rotation[ 1 ], rotation[ 2 ]);
				}
				if (scale) {
					object.scale.set(scale[ 0 ], scale[ 1 ], scale[ 2 ]);
				}

				object.updateMatrix();

				var tempGeometry = object.geometry.clone();
				tempGeometry.applyMatrix(object.matrix);
				object.geometry = tempGeometry;

				object.position.set( 0, 0, 0 );
				object.rotation.set( 0, 0, 0 );
				object.scale.set(1, 1, 1);

				gizmo.add(object);

			}

		}

		return gizmo;

	};

	// Reusable utility variables

	var tempVector = new THREE.Vector3( 0, 0, 0 );
	var tempEuler = new THREE.Euler();
	var alignVector = new THREE.Vector3( 0, 1, 0 );
	var zeroVector = new THREE.Vector3( 0, 0, 0 );
	var lookAtMatrix = new THREE.Matrix4();
	var tempQuaternion = new THREE.Quaternion();
	var tempQuaternion2 = new THREE.Quaternion();
	var identityQuaternion = new THREE.Quaternion();

	var unitX = new THREE.Vector3( 1, 0, 0 );
	var unitY = new THREE.Vector3( 0, 1, 0 );
	var unitZ = new THREE.Vector3( 0, 0, 1 );

	// Gizmo creation

	this.gizmo = {};
	this.picker = {};
	this.helper = {};

	this.add( this.gizmo[ "translate" ] = setupGizmo( gizmoTranslate ) );
	this.add( this.gizmo[ "rotate" ] = setupGizmo( gizmoRotate ) );
	this.add( this.gizmo[ "scale" ] = setupGizmo( gizmoScale ) );
	this.add( this.picker[ "translate" ] = setupGizmo( pickerTranslate ) );
	this.add( this.picker[ "rotate" ] = setupGizmo( pickerRotate ) );
	this.add( this.picker[ "scale" ] = setupGizmo( pickerScale ) );
	this.add( this.helper[ "translate" ] = setupGizmo( helperTranslate ) );
	this.add( this.helper[ "rotate" ] = setupGizmo( helperRotate ) );
	this.add( this.helper[ "scale" ] = setupGizmo( helperScale ) );

	// Pickers should be hidden always
	var visible = false;
	this.picker[ "translate" ].visible = visible;
	this.picker[ "rotate" ].visible = visible;
	this.picker[ "scale" ].visible = visible;

	var AXIS_DIR = {

		'X' :  unitX,
		'Y' :  unitY,
		'Z' :  unitZ
	};

	var AXIS_VEC = {

		'X' :  new THREE.Vector3( 0, 0, 0 ),
		'Y' :  new THREE.Vector3( 0, 0, Math.PI / 2 ),
		'Z' :  new THREE.Vector3( 0, Math.PI / 2, 0 )
	};

	var AXIS_HIDE_TRESHOLD = 0.99;
	var ROTATE_HIDE_TRESHOLD = 0.9;
	var AXIS_FLIP_TRESHOLD = -0.4;
	var PLANE_HIDE_TRESHOLD = 0.2;
	var HIDE_OPACITY = 0.2;


	var handles = [];
		handles = handles.concat( this.picker[ "translate" ].children );
		handles = handles.concat( this.gizmo[ "translate" ].children );
		handles = handles.concat( this.picker[ "rotate" ].children );
		handles = handles.concat( this.gizmo[ "rotate" ].children );


	this.handleHelper = function(handle,quaternion){

		var key = this.axis;
		handle.position.copy( this.worldPositionStart );
		handle.visible = !!this.axis ;

		if (AXIS_DIR.hasOwnProperty(key)){

			tempQuaternion.setFromEuler( tempEuler.copy( AXIS_VEC[key]) );
			handle.quaternion.copy( quaternion ).multiply( tempQuaternion );

			if ( Math.abs( alignVector.copy( AXIS_DIR[key] ).applyQuaternion( quaternion ).dot( this.eye ) ) > ROTATE_HIDE_TRESHOLD ) {
				handle.visible = false;
			}
		}


	};

	this.handleTranslate = function (handle,quaternion,Enabled=true){

		var key = handle.name;

		if (Enabled&&AXIS_DIR.hasOwnProperty(key)&& Math.abs( alignVector.copy( AXIS_DIR[key] ).applyQuaternion( quaternion ).dot( this.eye ) ) > AXIS_HIDE_TRESHOLD ) {
			handle.scale.set( 1e-10, 1e-10, 1e-10 );
			handle.visible = false;
		}

		
	};

	this.handleTranslateFlip = function (handle,quaternion){

		var key = handle.name;

		if (AXIS_DIR.hasOwnProperty(key)&& handle.name.search( key ) !== -1 ) {
			if ( alignVector.copy( AXIS_DIR[key] ).applyQuaternion( quaternion ).dot( this.eye ) < AXIS_FLIP_TRESHOLD ) {
				if ( handle.tag === 'fwd' ) {
					handle.visible = false;
				} else {
					handle.scale[key.toLowerCase()] *= -1;
				}
			} else if ( handle.tag === 'bwd' ) {
				handle.visible = false;
			}
		}
	};

	this.handleMaterial = function(handle){

		handle.material._opacity = handle.material._opacity || handle.material.opacity;
		handle.material._color = handle.material._color || handle.material.color.clone();

		handle.material.color.copy( handle.material._color );
		handle.material.opacity = handle.material._opacity;


		if ( !this.enabled ) {

			handle.material.opacity = HIDE_OPACITY;
			// handle.material.color.lerp( new THREE.Color( 1, 1, 1 ), HIDE_OPACITY );

		} else if (this.axis ) {


			if ( handle.name === this.axis ) {

				handle.material.opacity = 1.0;
				// handle.material.color.lerp( new THREE.Color( 1, 1, 1 ), HIDE_OPACITY );

			} else if ( this.axis.split('').some( function( a ) { return handle.name === a; } ) ) {

				handle.material.opacity = 1.0;
				// handle.material.color.lerp( new THREE.Color( 1, 1, 1 ), HIDE_OPACITY );

			} else {

				handle.material.opacity = 0.5;
				// 

			}
			// handle.material.color.lerp( new THREE.Color( 1, 1, 1 ), HIDE_OPACITY );

		}
	};



	// updateMatrixWorld will update transformations and appearance of individual handles

	this.updateMatrixWorld = function () {

		var space = this.space;

		if ( this.mode === 'scale' ) space = 'local'; // scale always oriented to local rotation

		var quaternion = space === "local" ? this.worldQuaternion : identityQuaternion;

		var eyeDistance = this.worldPosition.distanceTo( this.cameraPosition);

		eyeDistance = Math.min(1200,eyeDistance);
		eyeDistance = Math.max(500,eyeDistance);

		for ( var i = 0; i < handles.length; i++ ) {

			var handle = handles[i];

			// hide aligned to camera

			handle.visible = true;
			handle.rotation.set( 0, 0, 0 );
			handle.position.copy( this.worldPosition );

			handle.scale.set( 1, 1, 1 ).multiplyScalar( eyeDistance * this.size / 4 ); //4 or 7

			

			// }else{
				// Align handles to current local or world rotation
				handle.quaternion.copy( quaternion );


				this.handleTranslate(handle,quaternion);
				// Flip translate and scale axis ocluded behind another axis
				this.handleTranslateFlip(handle,quaternion);
				

				tempQuaternion2.copy( quaternion );
				alignVector.copy( this.eye ).applyQuaternion( tempQuaternion.copy( quaternion ).inverse() );


				if ( handle.name === 'RY' ) {
					
					tempQuaternion.setFromAxisAngle( unitY, Math.atan2( alignVector.x, alignVector.z ) );
					tempQuaternion.multiplyQuaternions( tempQuaternion2, tempQuaternion );
					handle.quaternion.copy( tempQuaternion );

				}else if(handle.name === 'X'){

					tempQuaternion.setFromAxisAngle( unitX, -Math.atan2( this.eye.y,this.eye.z ) );
					handle.quaternion.copy( tempQuaternion );
				}else if(handle.name === 'Y'){

					tempQuaternion.setFromAxisAngle( unitY, Math.atan2( this.eye.x,this.eye.z ) );
					handle.quaternion.copy( tempQuaternion );
				}else if(handle.name === 'Z'){

					tempQuaternion.setFromAxisAngle( unitZ, -Math.atan2( this.eye.x,this.eye.y ) );
					handle.quaternion.copy( tempQuaternion );
				}

		

				this.handleMaterial(handle);
			// }

			// console.log(this.axis , handle.name)

			if(!!this.axis&&(this.axis !== handle.name && this.axis !== "XYZK" ) ){
				handle.visible = false;
			}
			

		}
		// var name = handle.name;

		// handles.forEach(function(child){

		// 	if(child.name !== handle.name){
		// 		child.visible = false;
		// 	}
		// });

		THREE.Object3D.prototype.updateMatrixWorld.call( this );

	};

};

TransformControlsGizmo.prototype = Object.assign( Object.create( THREE.Object3D.prototype ), {

	constructor: TransformControlsGizmo,

	isTransformControlsGizmo: true

} );


TransformControlsPlane = function () {

	'use strict';

	THREE.Mesh.call( this,
		new THREE.PlaneBufferGeometry( 5000, 5000, 1, 1 ),
		new THREE.MeshBasicMaterial( { visible: false, wireframe: true, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } )
	);

	this.type = 'TransformControlsPlane';

	var unitX = new THREE.Vector3( 1, 0, 0 );
	var unitY = new THREE.Vector3( 0, 1, 0 );
	var unitZ = new THREE.Vector3( 0, 0, 1 );

	var tempVector = new THREE.Vector3();
	var dirVector = new THREE.Vector3();
	var alignVector = new THREE.Vector3();
	var tempMatrix = new THREE.Matrix4();
	var identityQuaternion = new THREE.Quaternion();


	var AXIS_DIR = {

		'X' :  unitX,
		'Y' :  unitY,
		'Z' :  unitZ
	};

	this.handleTranslate = function(){

		var key = this.axis;
		if (AXIS_DIR.hasOwnProperty(key)){

			alignVector.copy( this.eye ).cross( AXIS_DIR[key] );
			dirVector.copy( AXIS_DIR[key] ).cross( alignVector );
		}

	};

	this.updateMatrixWorld = function() {

		var space = this.space;

		this.position.copy( this.worldPosition );

		if ( this.mode === 'scale' ) space = 'local'; // scale always oriented to local rotation

		unitX.set( 1, 0, 0 ).applyQuaternion( space === "local" ? this.worldQuaternion : identityQuaternion );
		unitY.set( 0, 1, 0 ).applyQuaternion( space === "local" ? this.worldQuaternion : identityQuaternion );
		unitZ.set( 0, 0, 1 ).applyQuaternion( space === "local" ? this.worldQuaternion : identityQuaternion );

		// Align the plane for current transform mode, axis and space.

		alignVector.copy( unitY );

		switch ( this.mode ) {
			case 'translate':
			case 'scale':
				this.handleTranslate();
				break;
			case 'rotate':
			default:
				// special case for rotate
				dirVector.set( 0, 0, 0 );
		}

		if ( dirVector.length() === 0 ) {

			// If in rotate mode, make the plane parallel to camera
			this.quaternion.copy( this.cameraQuaternion );

		} else {

			tempMatrix.lookAt( tempVector.set( 0, 0, 0 ), dirVector, alignVector );

			this.quaternion.setFromRotationMatrix( tempMatrix );

		}

		THREE.Object3D.prototype.updateMatrixWorld.call( this );

	};

};

TransformControlsPlane.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {

	constructor: TransformControlsPlane,

	isTransformControlsPlane: true

} );
