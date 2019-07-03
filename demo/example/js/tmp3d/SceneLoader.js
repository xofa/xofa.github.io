function disposeNode(parentObject) {
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
}

function disposeHierarchy(node, callback) {
    for (var i = node.children.length - 1; i >= 0; i--) {
        var child = node.children[i];
        disposeHierarchy(child, callback);
        callback(child);
    }
}


var SceneLoader = function (imapic3d) {


    this.imapic3d = imapic3d;

    // this.baseUrl = 'https://www.imapic.cn';http://www.imapic.cn/itemapi/api/model/Select?id=12170
    // this.baseUrl = 'http://www.zhengjian2018.work';
    this.baseUrl = 'http://box.imapic.cn';

    this.modelInfo = {};

    // this.lzma = new LZMA("js/xz/lzma_worker-min.js");
};

SceneLoader.prototype = {

    constructor: SceneLoader,


    getBase64 : function (){

        var canvas = this.imapic3d.container;
        var imageData = canvas.toDataURL('image/png');

        return imageData;
    },

    setFrontImage : function(){

        var data = this.getBase64();

        this.uploadImageByBase64(data);
    },


    uploadImageByBase64 : function(data){

        var json = {
            // 'uuid' : THREE.Math.generateUUID(),
            'file' : data,
            'typeId': 22,
            // 'name' : 'partImg'
        };

        console.log(json);

        var self = this;
        $.post(this.baseUrl + '/itemapi/api/image/add',  json ).then(function(response) {

            if (response.Code !== 200) {

                alert('image/list error code : ' + response.Code);
                return;
            }

            var imageUrl = response.Data;

            console.log('upload image success : ' + response.Data);
         
        });

    },

    loadUploadedGeometryByID: function(id,parameter){

        var self = this;
        $.get(this.baseUrl + '/itemapi/api/model/Select?id=' + id, function(data){

          if(data.Data == null || data.Code !== 200){
            alert('找不到这个上传的模型数据' + self.modelInfo.url);
            return;
          }

          var json = data.Data.ModelJson;
          json = JSON.parse(json);

          json.geometries = self.parseGeometry(json.geometries);

          self.loadItem(json,parameter);
         
        });
    },

    uploadObj2Json: function(model) {
        
        var self = this;
        $.post(this.baseUrl + '/itemapi/api/model/add', { ModelJson: model}).then(function(response) {

            if (response.Code !== 200) {

                alert('model/add error code : ' + response.Code);
                return;
            }

            self.modelInfo.id = response.Data;
            console.log('upload success : ' + self.baseUrl + '/itemapi/api/model/Select?id=' + response.Data);
         
        });
    },

    save2local:function(str,name){

        var link = document.createElement( 'a' );
        link.style.display = 'none';
        document.body.appendChild( link ); // Firefox workaround, see #6594

        function save( blob, filename ) {

          link.href = URL.createObjectURL( blob );
          link.download = filename || 'model.obj';
          link.click();

          // URL.revokeObjectURL( url ); breaks Firefox...

        }

        save( new Blob( [ str ], { type: 'application/x-xz' } ), name+'.xz'  );

    },

    //, function(percent) {
            //         document.title = "decompress: " + (percent * 100) + "%";
            // }

    loadXz: function(file){

        var self = this;
        this.callbackReadArrayBuffer(file,function(context){

   
            // var arr  = context.split(",");
            // var lzma = new LZMA("js/xz/lzma_worker-min.js");
                // new Uint8Array(ajax.response)
            LZMA.decompress(new Uint8Array(context), function(result,error) {

                var json = JSON.parse(result);

                self.loadItem(json);
            });

        }, function(percent) {
                /// Compressing progress code goes here.
            document.title = "Decompressing: " + (percent * 100) + "%";
        });

    },

    bin2String: function(array) {

      var result = "";
      for (var i = 0; i < array.length; i++) {
        result += String.fromCharCode(parseInt(array[i], 2));
      }
      return result;
    },

    loadModel: function(file) {


        var self = this;
        // var lzma1 = this.lzma;
        // var lzma1 = new LZMA("js/xz/lzma_worker-min.js");
        // var lzma1 = LZMA;

        // var reader = new FileReader();
        // reader.addEventListener('load', function(event) {

        //     var context = event.target.result;

        var name = file.name;

        this.callbackReadText(file,function(context){


            var object = new THREE.OBJLoader().parse(context);
            object.userData._type = 'partGroup';
            var data = object.toJSON();
            var str = JSON.stringify(data);

            // var str = JSON.stringify(context);

            // var str='1223333';

            LZMA.compress(str, 1, function (result,error) {
            // self.lzma.compress(str, 1, function (result,error) {

                // console.log("Compressed: " + result);

                // result = JSON.stringify(result);
                // var array = result.split(",");
                // var buffer = new Int8Array(array);
                // console.log(error);
                // var _str = JSON.stringify(buffer);
                // self.json = _str;
                // self.uploadObj2Json(_str);

                // result = self.bin2String(result);

                result = new Uint8Array(result);
                self.save2local(result,name);

            }, function on_compress_progress_update(percent) {
                /// Compressing progress code goes here.
                document.title = "Compressing: " + (percent * 100) + "%";
            });

        });

    },


    callbackReadText: function(file,callback){

        // var reader = new FileLoader();

        var reader = new FileReader();
        reader.addEventListener('load', function(event) {

            var context = event.target.result;
            callback(context);

        }, false);
        reader.readAsText(file);

    },


    callbackReadArrayBuffer: function(file,callback){

        // var reader = new FileLoader();

        var reader = new FileReader();
        reader.addEventListener('load', function(event) {

            var context = event.target.result;
            callback(context);

        }, false);
        reader.readAsArrayBuffer(file);

    },


    loadModel1: function(file) {


        var self = this;
        var filename = file.name;
        var extension = filename.split('.').pop().toLowerCase();
        

        var reader = new FileReader();

        reader.addEventListener('load', function(event) {

            var context = event.target.result;
            var object = new THREE.OBJLoader().parse(context);

            object.userData._type = 'partGroup';
            // var data = object.toJSON();
            // // console.log(data);
            // var str = JSON.stringify(data);

            // console.log(self.json);
            self.imapic3d.addItem(object);

            var box = new THREE.Box3().setFromObject(object);
            console.log(box.getSize());
            console.log(box.getCenter());
            console.log(object);

            self.json = new THREE.ExportJSON(context).export(object);

            self.uploadObj2Json(self.json);

        }, false);
        reader.readAsText(file);

    },




    loadHouseByID : function(id){

        var self = this;

        $.get(this.baseUrl + "/miniapp/api/housetype/select?id="+id, function(data){


          if(data.Data == null || data.Code !== 200){
            alert('找不到这个户型');
            return;
          }

          // console.log(data);

          var json = data.Data["HouseTypeJson"];
          json = JSON.parse(json);
          // console.log(json);

          var floorplan = new IMAPIC2D.Items.Floorplan();
          floorplan.loadSerialized(json);

          var str = floorplan.convertTo3d();

          // callback(str);
          self.imapic3d.loadFrom2D(str);
         
        });

    },

    loadCaseByID : function(id){

        var url = this.baseUrl + "/miniapp/api/case3d/getcase?id=" + id;

        var self = this;

        $.get(url,function(response){

            console.log(response);

            if(response['Code'] != 200){
                console.error('getcase error code : ' + response['Code'] );
                return;
            }

            var data = response['Data'];
            var name = data['CaseName'];
            var caseJson = data['CaseJson'];

            caseJson = JSON.parse(caseJson);

            self.loadItemList(caseJson['itemList']);

        });
    },

    loadItemList : function (json){

        console.log('------------------------start load itemList');

        for (var i = 0; i < json.length; i++) {
            var item = json[i];
            var itemURL = item['model'];

            if(itemURL.length < 10 ){ //有的UUID为空
                continue;
            }


            var position = item['position'];
            var rotation = item['rotation'];
            var scale = item['scale'];

            for(var key in rotation){
                rotation[key] *= Math.PI / 180.0;
            }


            var rotator = new THREE.Quaternion().setFromEuler(new THREE.Euler(rotation.x,rotation.y,rotation.z),false);

            var matrix = new THREE.Matrix4();
            matrix.compose(position,rotator,scale);

            // console.log(matrix);


            var parameter = {
                // uuid: item['uuid'],
                matrix: matrix
            };

            // this.getItem(itemURL,parameter);
            this.getItem(itemURL,parameter,this.loadItem.bind(this));

        }

    },

    getItem : function(itemURL,parameter,callback){

        var url = this.baseUrl + "/itemapi/api/item/getitemgeometry?uuid=" + itemURL;

        var self = this;

        $.get(url,function(response){


            if(response['Code'] != 200){
                console.error('getcase error code : ' + response['Code'] );
                return;
            }

            var data = response['Data'];
            var name = data['Name'];

            var itemJson = data['ItemJson'];

            itemJson = JSON.parse(itemJson);



            for (var i = 0; i < itemJson.textures.length; i++) {
                var wrap = itemJson.textures[i].wrap;
                if (wrap[0] == null || wrap[1] == null) {
                    itemJson.textures[i].wrap = [1000, 1000];
                }
            }

            for (var i = 0; i < itemJson.images.length; i++) {
                // console.log(itemJson.images[i].url);
                itemJson.images[i].url += '?x-oss-process=image/resize,p_50';
            }

             for (var i = 0; i < itemJson.materials.length; i++) {
                // console.log(itemJson.materials[i].normalMap);
                var mat = itemJson.materials[i];
                // mat.normalMap = undefined;

                if(!mat.envMap && mat.opacity < 0.99) mat.transparent = false;
            }


            var geoJson = data['GeometryJson'];
            geoJson = JSON.parse(geoJson);

            itemJson.geometries = self.parseGeometry(geoJson);
            // console.log(itemJson);

            // return;

            callback(itemJson,parameter);


        });

    },

    parseGeometry : function(json){

        var items = new THREE.ObjectParse().parse(json);

        // var geometries = [];

        for (var i = 0; i < items.length; i++) {
            var data = items[i].geometry;

            var geometry = new THREE.BufferGeometry();
            geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( data.vertices, 3 ) );
            geometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( data.normals, 3 ) );
            geometry.addAttribute( 'uv', new THREE.Float32BufferAttribute( data.uvs, 2 ) );

            geometry.uuid = data.uuid;


            // console.log(geometry.toJSON());

            // data.attributes = geometry.attributes;

            // geometries.push(geometry);

            items[i] = geometry.toJSON();//{data:{attributes:geometry.attributes}};

            geometry.dispose();
            // items[i].uuid = uuid;
        }

        return items;

    },

    loadItem : function(json,parameter){

        var self = this;

        var loader = new THREE.ObjectLoader();
        loader.parse(json,function(object){

            if(parameter !== undefined && parameter.matrix !== undefined){
                object.applyMatrix(parameter.matrix);
            }
            self.imapic3d.addItem(object);
        });
        
    }

};