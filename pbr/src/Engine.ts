/// <reference path="Shader.ts" />
/// <reference path="ProcessShader.ts" />


module STGL {

  export class Engine {

    public gl : any;

    private _renderer;
    private _scene;
    private _camera;

    private _width;
    private _height;

    private _program:Shader[] = [];

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

      this.initCamera();

      var gl = this.gl;
      
      var shader = new Shader(gl);
      shader.initProgram(vsSource,fsSource);
      shader.bindBuffers(datas);

      this._program.push(shader);
      
     


      this.render();
    }

    initTHREE(){

      this._renderer.setPixelRatio( this._width / this._height );
      this._renderer.setSize( this._width , this._height );


      this._scene = new THREE.Scene();

    }

    initCamera(){

      
      this._camera = new THREE.PerspectiveCamera( 60, this._width / this._height, 0.1, 1000 );
      this._camera.position.set(0,0,1);
      this._camera.updateProjectionMatrix();

   
    }

    render() {

      requestAnimationFrame(() => this.render());
      this.drawScene(this.gl);

    }

    drawScene(gl){

      gl.clearColor(0.65, 0.65, 0.65, 1.0);  // Clear to black, fully opaque
      // gl.clearDepth(1.0);                 // Clear everything
      // gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      // gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

      // Clear the canvas before we start drawing on it.

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


      // const fov = 45 * Math.PI / 180;   // in radians
      // const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;


      // var top = near * Math.tan(0.5 * fov ) ,
      // height = 2 * top,
      // width = aspect * height,
      // left = - 0.5 * width;

      // gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers['vertex']);
      // var location = gl.getAttribLocation(this.program, 'aVertexPosition');
      // gl.vertexAttribPointer(location,3,gl.FLOAT,false,0,0);
      // gl.enableVertexAttribArray(location);
      // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers['index']);


     // const projectionMatrix = new THREE.Matrix4().makePerspective( left, left + width, top, top - height, near, far ).toArray();
      // const projectionMatrix = new THREE.Matrix4().makeOrthographic( -0.5,0.5,0.5,-0.5, near, far ).toArray();

      for (let index = 0; index < this._program.length; index++) {
        const shader = this._program[index];
        
        gl.useProgram(shader.program);
        
        // const projectionMatrix = new THREE.Matrix4().makeOrthographic( -0.5*this._width,0.5*this._width,0.5*this._height,-0.5*this._height, near, far ).toArray();
        var locationProj = gl.getUniformLocation(shader.program, 'uProjectionMatrix');
        gl.uniformMatrix4fv(locationProj,false,this._camera.projectionMatrix.toArray());

        var locationView = gl.getUniformLocation(shader.program, 'uModelViewMatrix');
        gl.uniformMatrix4fv(locationView,false,this._camera.matrixWorldInverse.toArray());

      }
        

    
      const vertexCount = 36;
      gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, 0);


    }
    
  }
    
  
}
