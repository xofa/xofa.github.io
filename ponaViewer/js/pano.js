var PANO = function(){


	this.list = [];

	var container = document.querySelector( '#container' );
	this.progress = document.querySelector( '#progress' );

	this.viewer = new PANOLENS.Viewer( { 

	    container: container,
	    controlBar: true,
	    controlButtons: [],
	    autoHideInfospot: false,
	    output: 'console'


	} );

	this.addIconVR();
	this.addIconRotate();


	return this;


};

PANO.prototype = {


	constructor: PANO,

	addIconVR: function(){

		var scope = this;
		var switchVR = {
          style: {
            backgroundImage: 'url(icon/device.png)',
            float: 'right'
          },
          
          onTap: function(){
            scope.viewer.toggleNextControl();
          }
        };
        this.viewer.appendControlItem(switchVR);

	},

	addIconRotate: function(){

		var scope = this;
        var autoRotate = {
          style: {
            backgroundImage: 'url(icon/rotate.png)',
            float: 'right'
          },
          
          onTap: function(){
            if(scope.viewer.getControlName() == "orbit"){

              scope.viewer.OrbitControls.autoRotate = !scope.viewer.OrbitControls.autoRotate;
            }
          }
        };
        this.viewer.appendControlItem(autoRotate);
    },

    addSpotList: function(items,texture,panorama){

    	var scope = this;
        for (var i = 0; i < items.length; i++) {

          var item = items[i];

          var p = item.position;
          var infospot = new PANOLENS.Infospot( 350, texture,true)
          infospot.addStaticText(item.text);
          // infospot.addHoverText(item.text);
          infospot.position.set( p[0],p[1],p[2] );
          infospot.toPanorama = panorama;
          panorama.add( infospot );


          if(item.link !== undefined){

            infospot.addEventListener( "click", function(){

                scope.viewer.setPanorama( scope.list[item.link] );
            } );

          }else{
            
            infospot.addEventListener( "click", function(){
              this.focus();
              // this.element.style.display = 'block';
            } );

          }

        }

    },


    addSpotListInfo: function( panorama,data){

        for (var i = 0; i < data.length; i++) {
          var item = data[i];

          var url = "icon/new_spotd"+item.type+"_gif.png";

          var texture = PANOLENS.Utils.TextureLoader.load( url);
          // PANOLENS.Utils.TextureLoader.load( url,function(texture){

          this.addSpotList(item.list,texture,panorama);

          // });
        }
   
    },

    onProgress: function( event ) {

        var ratio = parseInt(event.progress.loaded / event.progress.total * 100);

        this.progress.innerHTML = "加载中..." +  ratio + '%';
        if ( ratio === 100 ) {
          this.progress.style.display = "none";
        }

    },

    onEnter: function(event){

    	this.progress.style.display = "block";
    	this.progress.innerHTML = '';
    },



    addPanorama: function(url,data){


    	var panorama = new PANOLENS.ImagePanorama( url );

    	panorama.addEventListener( 'progress', this.onProgress.bind(this) );
	    panorama.addEventListener( 'enter', this.onEnter.bind(this) );

    	this.addSpotListInfo(panorama,data);
    	this.viewer.add( panorama );

    	this.list.push(panorama);

    }






};