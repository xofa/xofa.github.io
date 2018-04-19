/// <reference path="ProcessShader.ts" />


module STGL {

  export class Engine {

    public gl : any;
    private program;
    private buffers;

    private _renderer;
    private _scene;
    private _camera;

    private _width;
    private _height;

    constructor(canvas:HTMLCanvasElement){//path:string,names:string[]

      // this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      // console.log(_gl);
      
      this._renderer = new THREE.WebGLRenderer( { antialias: true, canvas:canvas } );
      this.gl = this._renderer.getContext();
      
      this._width = canvas.clientWidth;
      this._height = canvas.clientHeight;

      if (!this.gl) {
        console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
      }

      console.log(this.gl);

    }
    
    init(datas,vsSource,fsSource){

      var shaderInit = new ProcessShader();
      this.program = shaderInit.initShaderProgram(this.gl,vsSource,fsSource);
      shaderInit.bindBuffers(this.gl,this.program,datas);

      this.render();
    }

    initTHREE(datas){

      this._renderer.setPixelRatio( this._width / this._height );
      this._renderer.setSize( this._width , this._height );

      this._camera = new THREE.PerspectiveCamera( 60, this._width / this._height, 0.1, 1000 );
      this._camera.position.set(0,0,0);

      this._scene = new THREE.Scene();

    }

    render() {

      requestAnimationFrame(() => this.render());
      this.drawScene(this.gl);

    }

    drawScene(gl){

      gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

      // Clear the canvas before we start drawing on it.

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


      const fov = 45 * Math.PI / 180;   // in radians
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const near = 0.1;
      const far = 100.0;

      var top = near * Math.tan(0.5 * fov ) ,
      height = 2 * top,
      width = aspect * height,
      left = - 0.5 * width;

      // gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers['vertex']);
      // var location = gl.getAttribLocation(this.program, 'aVertexPosition');
      // gl.vertexAttribPointer(location,3,gl.FLOAT,false,0,0);
      // gl.enableVertexAttribArray(location);
      // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers['index']);

      gl.useProgram(this.program);

     // const projectionMatrix = new THREE.Matrix4().makePerspective( left, left + width, top, top - height, near, far ).toArray();
      const projectionMatrix = new THREE.Matrix4().makeOrthographic( -0.5,0.5,0.5,-0.5, near, far ).toArray();
      // const projectionMatrix = new THREE.Matrix4().makeOrthographic( -0.5*this._width,0.5*this._width,0.5*this._height,-0.5*this._height, near, far ).toArray();
      var locationProj = gl.getUniformLocation(this.program, 'uProjectionMatrix');
      gl.uniformMatrix4fv(locationProj,false,projectionMatrix);

      const modelViewMatrix =  new THREE.Matrix4().makeRotationY(0.1).toArray();
      var locationView = gl.getUniformLocation(this.program, 'uModelViewMatrix');
      gl.uniformMatrix4fv(locationView,false,modelViewMatrix);


    
      const vertexCount = 36;
      gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, 0);


    }
    
  }
    
  
}
