
window.onload = function init() {
    const canvas = document.getElementById("gl-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    //camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 0;
    camera.rotation.x = -1.5;
   /* const controls = new THREE.OrbitControls(camera, renderer.domElement);*/

    hlight = new THREE.AmbientLight(0x040404, 80);
    scene.add(hlight);

    const loader = new THREE.GLTFLoader();
    loader.load('./model/sugarthree.gltf', function (gltf) {
        ball = gltf.scene;
        ball.scale.set(25, 25, 25);
        scene.add(gltf.scene);
        render();
    }, undefined, function (error) {
        console.error(error);
    });
  
 

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

}

