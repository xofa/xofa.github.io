
module STGL {


  /** Startup options. */
  export interface Options {
    /** */


  }


  export class ProcessShader {

    constructor(){//path:string,names:string[]

      // this.loadGLSL(shaderpath).then(result =>{
      //   this.parseShader(result);
      // })
    }


    async loadGLSL(path:string){

      var shaderNames:string[] = [
        'math.glsl',
        'cubemapVertex.glsl',
        'cubemapFragment.glsl',
        'cubemapSampler.glsl',
        'panoramaVertex.glsl',
        'panoramaFragment.glsl',
        'panoramaSampler.glsl',

        'pbrReferenceFragment.glsl',
        'pbrReferenceVertex.glsl',
        'colorSpace.glsl',

        'pbr_ue4.glsl',

        'sphericalHarmonics.glsl',
        'sphericalHarmonicsVertex.glsl',
        'sphericalHarmonicsFragment.glsl'
      ];



      var shaderNameContent:any = {};
      shaderNames.map(async name => {
        shaderNameContent[name] = await $.get(path + name).catch(function (err){
          console.log(err);
        });//async  function () { return await $.get(path+name) }();
      });
      return shaderNameContent;

    }

    parseShader(shaderStrings:string){

      console.log(shaderStrings);
    }


    loadShader(gl, type, source) {

      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      // See if it compiled successfully

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    initShaderProgram(gl, vsSource, fsSource) {

      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

      // Create the shader program

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      // If creating the shader program failed, alert

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
      }

      return shaderProgram;
    }

    bindBuffers(gl,shaderProgram,BUFFERS){

      var vertex_Arr = BUFFERS['vertex'];
      if( vertex_Arr && vertex_Arr.length > 0){
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_Arr), gl.STATIC_DRAW);

        var location = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
        gl.vertexAttribPointer(location,3,gl.FLOAT,false,0,0);
        gl.enableVertexAttribArray(location);
        
      }

      var index_Arr = BUFFERS['index'];
      if( index_Arr && index_Arr.length > 1){
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index_Arr), gl.STATIC_DRAW);
      }


    }


    
  }
    
  
}
