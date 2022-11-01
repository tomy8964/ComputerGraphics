window.onload = function init()
{
	const canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	// use click event listener
	// use once:ture to execute one time
	canvas.addEventListener("mousedown", function(event){
		var t = vec2(2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1);
		// if click play button
		if (t[0] <= 0.613 && t[0] >= 0.185 && t[1] <= -0.069 && t[1] >= -0.198)
		{
			const loader = new THREE.GLTFLoader();
			
			//scene2 load
			var ball = loader.load('./model/sugar3Text.gltf', function (gltf) {
				ball = gltf.scene;
				ball.scale.set(25, 25, 25);
				scene2.add(gltf.scene);
				render1();
			}, undefined, function (error) {
				console.error(error);
			});

			render1();
		}
		else ;
		},{once:true});

	const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);

    const scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    //camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 0;
    camera.rotation.x = -1.5;
   /* const controls = new THREE.OrbitControls(camera, renderer.domElement);*/

    hlight = new THREE.AmbientLight(0x040404, 80);
    scene2.add(hlight);


	function render1() {
        renderer.render(scene2, camera);
        requestAnimationFrame(render1);
    }

}

