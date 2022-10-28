var canvas;
var gl;
var program;

var scene;
var renderer;
var loader = new THREE.GLTFLoader();
var check =false;
var camera;

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

const dalgona=[
    loadRec(1),
    loadRec(2),
    loadRec(3),
    loadRec(4),
    loadRec(5),
    loadRec(6),
    loadRec(7),
    loadRec(9),
    loadRec(10)
];

window.onload = function init(){
	const canvas = document.getElementById( "gl-canvas" );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	renderer = new THREE.WebGLRenderer({canvas});
	renderer.setSize(canvas.width,canvas.height);
    renderer.domElement.addEventListener('click', onClick, false);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);


	camera = new THREE.PerspectiveCamera(75,canvas.width / canvas.height,0.1, 100);
	camera.position.y = 30;
    camera.rotation.x = -1.5;

	hlight = new THREE.AmbientLight (0x404040,10);
	scene.add(hlight);
    
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    animate();
}

function animate(time) {
    time *= 0.001;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

function loadRec(num){
    var url = '../Graphic/model/rec*.gltf'
	    loader.load(url.replace('*',String(num)), function(gltf){
	        gltf.scene.children[0].scale.set(10,10,10);
	        scene.add(gltf.scene);
            if(num<8)dalgona[num-1]=gltf;
            else dalgona[num-2]=gltf;
            if(num==10)check = true;
	    },  undefined, function (error) {
            console.log(error);
	});
}

function onClick() {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        console.log('Intersection:', intersects[0]);
        clicked = new THREE.Vector3(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z);
        cameraVecter = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);
        vectorToMove = clicked.sub(cameraVecter).normalize();
        objectToMove = intersects[0].object;
        objectToMove.position.add(vectorToMove);
    }
}

