var canvas;
var gl;
var program;

var scene;
var renderer;
var loader = new THREE.GLTFLoader();
var camera;

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

var rectangle = [];
var mainShapeObject;

var animationObject = [];
var animationDestinationVector = [];
var animationMovingVector = [];

var alreadyIn = false;

window.onload = function init(){
	const canvas = document.getElementById( "gl-canvas" );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	renderer = new THREE.WebGLRenderer({canvas});
	renderer.setSize(canvas.width,canvas.height);
    renderer.domElement.addEventListener('click', onClick, false);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);


	camera = new THREE.PerspectiveCamera(75,canvas.width / canvas.height,0.1, 1000);
	camera.position.y = 30;
    camera.rotation.x = -1.5;

	hlight = new THREE.AmbientLight (0x404040,10);
	scene.add(hlight);
    
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    //If you want to test other shapes, you can choose the load function you want
    
    //loadPolygon();
    //loadTriangle(); need modify 
    loadSquare();

    animate();
}

function animate() {
    renderer.render(scene,camera);
    moveAnimation();
    rotateAnimation();
    fadeOutAnimation();
    if(rectangle.length == 1)finallAnimation();
    requestAnimationFrame(animate);
}

function loadSquare(){
    for(i=1; i<10; i++){
        var url = '../Graphic/model/rec*.gltf'
	        loader.load(url.replace('*',String(i)), function(gltf){
	            gltf.scene.children[0].scale.set(10,10,10);
	            scene.add(gltf.scene);
                rectangle.push(gltf.scene.children[0].id);
                mainShapeObject = gltf.scene.children[0];
	        },  undefined, function (error) {
                console.log(error);
	    });
    }
}

function loadTriangle(){
    for(i=1; i<5; i++){
        var url = '../Graphic/model/sugartri*.gltf'
	        loader.load(url.replace('*',String(i)), function(gltf){
	            gltf.scene.children[0].scale.set(10,10,10);
	            scene.add(gltf.scene);
                rectangle.push(gltf.scene.children[0].id);
                mainShapeObject = gltf.scene.children[0];
	        },  undefined, function (error) {
                console.log(error);
	    });
    }
}

function loadPolygon(){
    for(i=1; i<7; i++){
        var url = '../Graphic/model/sugarpoly*.gltf'
	        loader.load(url.replace('*',String(i)), function(gltf){
	            gltf.scene.children[0].scale.set(10,10,10);
	            scene.add(gltf.scene);
                rectangle.push(gltf.scene.children[0].id);
                console.log(i);
                mainShapeObject = gltf.scene.children[0];
	        },  undefined, function (error) {
                console.log(error);
	    });
    }
}

function onClick() {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        clickedPosition = new THREE.Vector3(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z);
        cameraPosition = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);

        vectorToMove = clickedPosition.sub(cameraPosition).normalize().multiplyScalar(20);
        objectToMove = intersects[0].object;

        animationObject.forEach((object) =>{if(objectToMove.id == object.id)alreadyIn = true;});
        if(!alreadyIn && !(objectToMove.id == mainShapeObject.id)){
            animationObject.push(objectToMove);
            animationDestinationVector.push(objectToMove.clone().position.add(vectorToMove.clone().normalize()).add(vectorToMove).ceil());
            animationMovingVector.push(vectorToMove.normalize());
        }
        alreadyIn = false;
    }
}

function moveAnimation() {
    animationObject.forEach((object,index) =>{
        if (!animationDestinationVector[index].equals(object.clone().position.ceil())) {
            object.position.add(animationMovingVector[index]);
        }else{
            animationObject[index].visible=false;
            rectangle = rectangle.filter((element) => element != animationObject[index].id);
            animationObject.splice(index,1);
            animationDestinationVector.splice(index,1);
            animationMovingVector.splice(index,1);
        }
    });
}

function rotateAnimation() {
    animationObject.forEach((object) =>{
        box = new THREE.Box3().setFromObject( object );
        offset = new THREE.Vector3();
        box.getCenter(offset);
        if(Math.abs(offset.x)>Math.abs(offset.z)){
            object.rotation.z -= 0.1;
        }else{
            object.rotation.x += 0.1;
        }
    });
}

function fadeOutAnimation() {
    animationObject.forEach((object) =>{
        object.material.transparent = true;
        object.material.opacity -= 0.03;
        object.material.format = THREE.RGBAFormat
    });
}

function finallAnimation() {
	camera.position.set(0,30,0);
    camera.rotation.set(-1.5,0,0);
    mainShapeObject.rotation.z -= 0.1;
}

