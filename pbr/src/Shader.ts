
module STGL {

	export class Shader {

		private gl : any;
		public program :any;
		//Extract info from the shader
		private attributes:any = {}; 
		private uniformInfo = {};
		private samplers = {};
		private vs_shader : null;
		private fs_shader : null;

		constructor(gl){

			this.gl = gl;
			this.program = this.program || gl.createProgram();
		}
	
		compileSource(type, source) {

			var gl = this.gl;
			const shader = gl.createShader(type);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			// See if it compiled successfully
	  
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			//   console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
			//   gl.deleteShader(shader);
			//   return null;
				throw (type == gl.VERTEX_SHADER ? "Vertex" : "Fragment") + ' shader compile error: ' + gl.getShaderInfoLog(shader);
			}
	  
			return shader;
		}
		
		initProgram(vsSource, fsSource) {

			if( !vsSource || !fsSource )
				throw("Shader source code parameter missing");
	  
			var gl = this.gl;
	  
			const vertexShader = this.compileSource(gl.VERTEX_SHADER, vsSource);
			const fragmentShader = this.compileSource(gl.FRAGMENT_SHADER, fsSource);
	  
			// Create the shader program
	  
			const shaderProgram = this.program;
			gl.attachShader(shaderProgram, vertexShader);
			gl.attachShader(shaderProgram, fragmentShader);
			gl.linkProgram(shaderProgram);
	  
			// If creating the shader program failed, alert
	  
			if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			  console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
			  return null;
			}
		}
	
		bindBuffers(BUFFERS){
			
			var shaderProgram = this.program;
			var gl = this.gl;
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