var canvas;
var gl;
var program;
var redraw = false;
var index = 0;
var line =[];
var pointsArray = new Float32Array([0,0.5,
                    0.5,-0.32,
                    0.5,-0.32,
                    -0.5,-0.32,
                    -0.5,-0.32,
                    0,0.5,
                    0,0.6,
                    0.6,-0.37,
                    0.6,-0.37,
                    -0.6,-0.37,
                    -0.6,-0.37,
                    0,0.6]);

window.onload = function init(){
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    canvas.addEventListener("mousedown",function(event){
        redraw = true;
    })

    canvas.addEventListener("mouseup",function(event){
        redraw = false;
    })

    canvas.addEventListener("mousemove",function(event){
        if(redraw){
            var x = 2*event.clientX/canvas.width-1-0.025;
            var y = 2*(canvas.height-event.clientY)/canvas.height-1+0.025;
            if(x==0){
                if(((0.5<y&&y<0.6)||(-0.37<y&&y<-0.32))||(-0.37<y&&y<-0.32))moveAccepted(x,y);
		        else moveRejected();
            }else if(x<0){
                if((1.64*x+0.5<y&&y<1.64*x+0.6)||(-0.37<y&&y<-0.32))moveAccepted(x,y);
		        else moveRejected();
            }else if(x>0){
                if(((-1.64)*x+0.5<y&&y<(-1.64)*x+0.6)||(-0.37<y&&y<-0.32))moveAccepted(x,y);
		        else moveRejected();
            }
            if(isWin()){
                alert("you win!");
                line=[];
                index=0;		 
	            redraw = false;
            }
        }
    })
    render();
};

function moveAccepted(x,y){
    index++;
    line.push(x,y);
}

function moveRejected(){
    alert("ouch!");
    line=[];
    index=0;        
    redraw = false;
}

function isWin(){
    if(line.length>20){
        if(Math.sqrt(Math.pow((line[0]-line[index*2-2]),2)+Math.pow((line[1]-line[index*2-1]),2))<=0.008)
            return true;
    }
    return false;
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, pointsArray, gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    gl.uniform4f(gl.getUniformLocation(program,"vColor"),1,0,0,1);
    gl.drawArrays( gl.LINES, 0, 12 );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(line), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    gl.uniform4f(gl.getUniformLocation(program,"vColor"),1,0,0,1);
    gl.drawArrays( gl.LINE_STRIP, 0, index );

    window.requestAnimationFrame(render);
}
