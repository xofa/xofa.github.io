/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 * @author jtreat3 / http://TreatGames.com
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function ( object ) {

	var scope = this;
	
	this.object = object;
	this.object.rotation.reorder( 'YXZ' );

	this.enabled = true;

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.horizontalOffset = 0; // degrees
	this.verticalOffset = 0; // degrees

	var onDeviceOrientationChangeEvent = function ( event ) {

		scope.deviceOrientation = event;
		
		if (event.alpha == null)
			scope.deviceOrientation = {alpha:90, beta:90, gamma:0};

	};

	var onScreenOrientationChangeEvent = function () {

		scope.screenOrientation = window.orientation || 0;

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function () {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function ( quaternion, alpha, beta, gamma, orient ) {
			
			euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler ); // orient the device

			quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

		};

	}();

	this.connect = function () {

		// onScreenOrientationChangeEvent(); // run once on load

		// window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.enabled = true;

	};

	this.disconnect = function () {

		// window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.enabled = false;

	};

	this.update = function (_horizontalOffset, _verticalOffset) {

		if ( scope.enabled === false ) return;
		
		if (_horizontalOffset != undefined)	scope.horizontalOffset = _horizontalOffset;
		if (_verticalOffset != undefined)	scope.verticalOffset  = _verticalOffset;
		
		if ( !scope.deviceOrientation ) {			
			scope.deviceOrientation = {alpha:90, beta:90, gamma:0};
			scope.screenOrientation = 0;
		}
		var device = scope.deviceOrientation;
		
		var alpha = THREE.Math.degToRad( device.alpha ); // Z
		var beta = THREE.Math.degToRad( device.beta ); // X'
		var gamma = THREE.Math.degToRad( device.gamma ); // Y''
		
		var orient = THREE.Math.degToRad( scope.screenOrientation ); // O

		setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

		scope.object.rotateX(THREE.Math.degToRad( scope.verticalOffset ));
		var axisY = new THREE.Vector3( 0, 1, 0 );
		scope.object.rotateOnWorldAxis(axisY, THREE.Math.degToRad( scope.horizontalOffset ));
	};

	this.dispose = function () {

		scope.disconnect();

	};

	this.connect();

};