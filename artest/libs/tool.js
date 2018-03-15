var _initSourceWebcam = function(onReady, onError) {
	var _this = this;

	this.parameters = {
		sourceUrl : null,
		
		// resolution of at which we initialize in the source image
		sourceWidth: 640,
		sourceHeight: 480,
		// resolution displayed for the source 
		displayWidth: 640,
		displayHeight: 480,
	}

	// init default value
	onError = onError || function(error){	
		alert('Webcam Error\nName: '+error.name + '\nMessage: '+error.message)
	}

	var domElement = document.createElement('video');
	domElement.setAttribute('autoplay', '');
	domElement.setAttribute('muted', '');
	domElement.setAttribute('playsinline', '');
	domElement.style.width = this.parameters.displayWidth+'px'
	domElement.style.height = this.parameters.displayHeight+'px'

	// check API is available
	if (navigator.mediaDevices === undefined 
			|| navigator.mediaDevices.enumerateDevices === undefined 
			|| navigator.mediaDevices.getUserMedia === undefined  ){
		if( navigator.mediaDevices === undefined )				var fctName = 'navigator.mediaDevices'
		else if( navigator.mediaDevices.enumerateDevices === undefined )	var fctName = 'navigator.mediaDevices.enumerateDevices'
		else if( navigator.mediaDevices.getUserMedia === undefined )		var fctName = 'navigator.mediaDevices.getUserMedia'
		else console.assert(false)
		onError({
			name: '',
			message: 'WebRTC issue-! '+fctName+' not present in your browser'
		})
		return null
	}

	// get available devices
	navigator.mediaDevices.enumerateDevices().then(function(devices) {
        var userMediaConstraints = {
			audio: false,
			video: {
				facingMode: 'environment',
				width: {
					ideal: _this.parameters.sourceWidth,
					// min: 1024,
					// max: 1920
				},
				height: {
					ideal: _this.parameters.sourceHeight,
					// min: 776,
					// max: 1080
				}
		  	}
        }
		// get a device which satisfy the constraints
		navigator.mediaDevices.getUserMedia(userMediaConstraints).then(function success(stream) {
			// set the .src of the domElement
			domElement.srcObject = stream;
			// to start the video, when it is possible to start it only on userevent. like in android
			document.body.addEventListener('click', function(){
				domElement.play();
			});
			// document.onloadedmetadata = function(e) {
			//    document.play();
			// };

// TODO listen to loadedmetadata instead

			// wait until the video stream is ready
			var interval = setInterval(function() {
				if (!domElement.videoWidth)	return;
				onReady()
				clearInterval(interval)
			}, 1000/50);
		}).catch(function(error) {
			onError({
				name: error.name,
				message: error.message
			});
		});
	}).catch(function(error) {
		onError({
			message: error.message
		});
	});

	return domElement;
};

var initAR = function(onReady, onError){

	function onSourceReady(){
		document.body.appendChild(domElement);
		onReady && onReady()
    } 

	var domElement = _initSourceWebcam(onSourceReady, onError) ;
    domElement.style.position = 'absolute';
    domElement.style.top = '0px';
    domElement.style.left = '0px';
    domElement.style.zIndex = '-2';

    onResizeElement(domElement); 
}

var onResizeElement = function(domElement){

	var screenWidth = window.innerWidth
	var screenHeight = window.innerHeight

	var sourceWidth = this.domElement.videoWidth
	var sourceHeight = this.domElement.videoHeight
	
	// compute sourceAspect
	var sourceAspect = sourceWidth / sourceHeight
	var screenAspect = screenWidth / screenHeight

	// if screenAspect < sourceAspect, then change the width, else change the height
	if( screenAspect < sourceAspect ){
		// compute newWidth and set .width/.marginLeft
		var newWidth = sourceAspect * screenHeight
		domElement.style.width = newWidth+'px'
		domElement.style.marginLeft = -(newWidth-screenWidth)/2+'px'
		
		// init style.height/.marginTop to normal value
		domElement.style.height = screenHeight+'px'
		domElement.style.marginTop = '0px'
	}else{
		// compute newHeight and set .height/.marginTop
		var newHeight = 1 / (sourceAspect / screenWidth)
		domElement.style.height = newHeight+'px'
		domElement.style.marginTop = -(newHeight-screenHeight)/2+'px'
		
		// init style.width/.marginLeft to normal value
		domElement.style.width = screenWidth+'px'
		domElement.style.marginLeft = '0px'
	}
};

var handleMedia = function(){
			//访问用户媒体设备的兼容方法
	function getUserMedia(constrains,success,error){
	    if(navigator.mediaDevices.getUserMedia){
	        //最新标准API
	        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
	    } else if (navigator.webkitGetUserMedia){
	        //webkit内核浏览器
	        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
	    } else if (navigator.mozGetUserMedia){
	        //Firefox浏览器
	        navagator.mozGetUserMedia(constrains).then(success).catch(error);
	    } else if (navigator.getUserMedia){
	        //旧版API
	        navigator.getUserMedia(constrains).then(success).catch(error);
	    }else {
		    alert("你的浏览器不支持访问用户媒体设备");
		}

	}


	function handleSuccess(stream) {
	  // window.stream = stream; // only to make stream available to console
	  var video = document.querySelector('video');
	    // 旧的浏览器可能没有srcObject
	  if ("srcObject" in video) {
	    video.srcObject = stream;
	    video.onloadedmetadata = function(e) {
		   video.play();
		};
	  } else {
	    // 防止再新的浏览器里使用它，应为它已经不再支持了
	    var CompatibleURL = window.URL || window.webkitURL;
	    video.src = CompatibleURL.createObjectURL(stream);
	    video.play();
	  }
	
	}

	function handleError(err) {
	  alert(err.name + ": " + err.message); 
	}
	// navigator.mediaDevices.getUserMedia({
	//   video: { facingMode: { exact: "environment" } }//user
	// }).then(handleSuccess).catch(handleError);

	    //调用用户媒体设备，访问摄像头
	getUserMedia({video: { facingMode: { exact: "environment" } } },handleSuccess,handleError);
}