//처음화면 vertices & colors
var hexagonVertices2 = [
	vec2(0.3,  -0.6), //v0
	vec2(0.4,  -0.8), //v1
	vec2(0.6,  -0.8), //v2
	vec2(0.7,  -0.6), //v3
	vec2(0.6,  -0.4), //v4
	vec2(0.4,  -0.4), //v5
	vec2(0.3,  -0.6), //v6
];

var colors = [
	vec4(1.0, 1.0, 1.0, 1.0), //v0
	vec4(1.0, 0.0, 0.0, 1.0), //v1
	vec4(0.0, 1.0, 0.0, 1.0),
	vec4(0.0, 0.0, 1.0, 1.0),
	vec4(0.0, 1.0, 0.0, 1.0),
	vec4(1.0, 0.0, 0.0, 1.0),
	vec4(1.0, 1.0, 1.0, 1.0)
];

//모양 선택화면 vertices
var squarevertices = [
	//7
	vec2(-0.8, 0.25),   
	vec2(-0.7, 0.25),    
	vec2(-0.8, 0.0), 
	
	vec2(-0.8, 0.0),   
	vec2(-0.7, 0.0),
	vec2(-0.7, 0.25),
	
	//8
	vec2(-0.325, 0.25),   
	vec2(-0.275, 0.25),    
	vec2(-0.325, 0.0), 
	
	vec2(-0.325, 0.0),   
	vec2(-0.275, 0.25),
	vec2(-0.275, 0.0) 
];

window.onload = function init()
{

	const canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	// 캔버스 초기화
	gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.3,0.2,0.7,1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);

	// 처음화면 vertex buffer ////////////////////////////////////////////////////////////
    var hexagonBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagonBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(hexagonVertices2), gl.STATIC_DRAW );

    //set color
    vColor = gl.getUniformLocation(program,"vColor");
	gl.uniform4f(vColor,1.0,0.0,0.0,1.0);

    var hexagonColorBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagonColorBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );


	var vPosition = gl.getAttribLocation( program, "vPosition" );
    // Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, hexagonBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.bindBuffer(gl.ARRAY_BUFFER, hexagonColorBufferId);
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );

	renderFirst();

	// use click event listener
	// use once:ture to execute one time
	canvas.addEventListener("mousedown", function(event){
		var t = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
		// if click play button
		if (t[0] <= 0.0 && t[0] >= -1.0 && t[1] <= 0.0 && t[1] >= -1.0)
		{
			// //
			// const loader = new THREE.GLTFLoader();
			
			// //scene1 load
			// var car = loader.load('./car/scene.gltf', function(gltf){
			// 	car = gltf.scene.children[0];
			// 	car.scale.set(50,50,50);
			// 	car.position.set(0,0,0);
			// 	scene.add(gltf.scene);
			//   }, undefined, function (error) {
			// 	  console.error(error);
			// });

			// render1();

			// //canvas.addEventListener("mousedown",secondClickEvent, false);
		}
		else if(t[0] >= 0.0 && t[0] <= 1.0 && t[1] <= 0.0 && t[1] >= -1.0)
		{
			// const loader = new THREE.GLTFLoader();
			
			// //scene2 load
			// var ironman = loader.load('./iron_man/scene.gltf', function(gltf){
			// 	ironman = gltf.scene.children[0];
			// 	ironman.scale.set(5000,5000,5000);
			// 	ironman.position.set(0,0,0);
			// 	scene.add(gltf.scene);
			// 	}, undefined, function (error) {
			// 		console.error(error);
			// });

			// render2();
		}
		else if(t[0] >= 0.0 && t[0] <= 1.0 && t[1] >= 0.0 && t[1] <= 1.0)
		{
			// square vertex buffer ////////////////////////////////////////////////////////////
			var squareBufferId = gl.createBuffer();
			gl.bindBuffer( gl.ARRAY_BUFFER, squareBufferId );
			gl.bufferData( gl.ARRAY_BUFFER, flatten(squarevertices), gl.STATIC_DRAW );
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

			//set color
			vColor = gl.getUniformLocation(program,"vColor");
			gl.uniform4f(vColor,0.6,0.2,0.0,1.0);	
			
			// Draw the independent square
			gl.enableVertexAttribArray( vPosition ); 
			gl.drawArrays(gl.TRIANGLES, 0, 12);

			canvas.addEventListener("mousedown", function(event){
				var t = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
				// if click play button
				if (t[0] <= 0.0 && t[0] >= -1.0 && t[1] >= 0.0 && t[1] <= 1.0)
				{
					const loader = new THREE.GLTFLoader();
					
					//scene1 load
					var car = loader.load('./car/scene.gltf', function(gltf){
						car = gltf.scene.children[0];
						car.scale.set(50,50,50);
						car.position.set(0,0,0);
						scene.add(gltf.scene);
					  }, undefined, function (error) {
						  console.error(error);
					});
		
					render1();
				}
				else if(t[0] >= 0.0 && t[0] <= 1.0 && t[1] <= 0.0 && t[1] >= -1.0)
				{
					const loader = new THREE.GLTFLoader();
					
					//scene2 load
					var ironman = loader.load('./iron_man/scene.gltf', function(gltf){
						ironman = gltf.scene.children[0];
						ironman.scale.set(5000,5000,5000);
						ironman.position.set(0,0,0);
						scene.add(gltf.scene);
						}, undefined, function (error) {
							console.error(error);
					});

					render2();
				}
						else ;
					},{once:true});
				
				}
				else ;
	},{once:true});

	const renderer = new THREE.WebGLRenderer({canvas});
	renderer.setSize(canvas.width,canvas.height);

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	camera = new THREE.PerspectiveCamera(75,canvas.width / canvas.height,0.1, 1000);
	camera.rotation.y = 45/180*Math.PI;
	camera.position.x = 150;
	camera.position.y = 150;
	camera.position.z = 150;

	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	hlight = new THREE.AmbientLight (0x404040,50);
	scene.add(hlight);
	light = new THREE.PointLight(0xc4c4c4,10);
	light.position.set(0,3000,5000);
	scene.add(light);

	light2 = new THREE.PointLight(0xc4c4c4,10);
	light2.position.set(5000,1000,0);
	scene.add(light2);

	light3 = new THREE.PointLight(0xc4c4c4,10);
	light3.position.set(0,1000,-5000);
	scene.add(light3);

	light4 = new THREE.PointLight(0xc4c4c4,10);
	light4.position.set(-5000,3000,5000);
	scene.add(light4);


	//처음화면 render
	function renderFirst() {
		// Draw the hexagon
		gl.enableVertexAttribArray( vPosition );
		gl.enableVertexAttribArray( vColor );
		gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);
	}
	
	//scene1 render
	function render1() {
		controls.update();
		// car.rotation.x += 0.005;		
		requestAnimationFrame(render1);
		renderer.render(scene, camera);
	}

	//scene2 render
	function render2() {
		controls.update();
		// ironman.rotation.x -= 0.005;		
		requestAnimationFrame(render2);
		renderer.render(scene, camera);
	}

}

