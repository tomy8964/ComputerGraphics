
class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true }); // alpha는 기본값이 false
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        //renderer.setClearColor("#ff0000", 0.1); // 두번째 인자의 기본값은 1
        //scene.background = new THREE.Color("#9b59b6");
        //scene.fog = new THREE.Fog("#9b59b6", 0, 150);
        //scene.fog = new THREE.FogExp2("#9b59b6", 0.01);

        this._setupCamera();
        this._setupLight();
        this._setupBackground();
        //this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        new THREE.OrbitControls(this._camera, this._divContainer);
    }

    _setupBackground() {
        const loader = new THREE.TextureLoader();
        loader.load("./data/image.jpg", texture => {
            this._scene.background = texture;
            this.resize();

            this._setupModel();
        });
    }

    _setupModel() {
        const gltfLoader = new THREE.GLTFLoader();
        gltfLoader.load(
            './model/triangle/sugarT1.gltf', 
            (gltf) => {
                const root = gltf.scene;
                root.scale.set(30,30,30);
                this._scene.add(root);
            }
        );
        gltfLoader.load(
            './model/triangle/sugarT2.gltf', 
            (gltf) => {
                const root = gltf.scene;
                root.scale.set(30,30,30);
                this._scene.add(root);
            }
        );
        gltfLoader.load(
            './model/triangle/sugarT3.gltf', 
            (gltf) => {
                const root = gltf.scene;
                root.scale.set(30,30,30);
                this._scene.add(root);
            }
        );
        gltfLoader.load(
            './model/triangle/sugarT4.gltf', 
            (gltf) => {
                const root = gltf.scene;
                root.scale.set(30,30,30);
                this._scene.add(root);
            }
        );
        // gltfLoader.load(
        //     './model/circle/sugar_cir5.gltf', 
        //     (gltf) => {
        //         const root = gltf.scene;
        //         root.scale.set(30,30,30);
        //         this._scene.add(root);
        //     }
        // );
        // gltfLoader.load(
        //     './model/rec6.gltf', 
        //     (gltf) => {
        //         const root = gltf.scene;
        //         root.scale.set(30,30,30);
        //         this._scene.add(root);
        //     }
        // );
        // gltfLoader.load(
        //     './model/rec7.gltf', 
        //     (gltf) => {
        //         const root = gltf.scene;
        //         root.scale.set(30,30,30);
        //         this._scene.add(root);
        //     }
        // );
        // gltfLoader.load(
        //     './model/rec9.gltf', 
        //     (gltf) => {
        //         const root = gltf.scene;
        //         root.scale.set(30,30,30);
        //         this._scene.add(root);
        //     }
        // );
        // gltfLoader.load(
        //     './model/rec10.gltf', 
        //     (gltf) => {
        //         const root = gltf.scene;
        //         root.scale.set(30,30,30);
        //         this._scene.add(root);
        //     }
        // );
    }


    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        camera.position.z = 80;

        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1.0;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 1, 1);
        this._scene.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);

        const backgroundTexture = this._scene.background;
        if(backgroundTexture) {
            const divAspect = width / height;
            const img = backgroundTexture.image;
            const bgAspect = img.width / img.height;
            const aspect = bgAspect / divAspect;

            backgroundTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
            backgroundTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
            backgroundTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
            backgroundTexture.repeat.y = aspect > 1 ? 1 : aspect;
        }
    }
}

window.onload = function () {
    new App();
}