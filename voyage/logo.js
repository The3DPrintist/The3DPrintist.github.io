const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

let aspect = 4;
let width = 6;
let height = width / aspect;

const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 0.1, 100);
const scene = new THREE.Scene();

var Mesh;
let light;

var screenmat;
var textureVid;

var rotspeed = 0;

function init() {
    //scene.background = new THREE.Color('transparent');
    renderer.setClearColor(0x000000, 0);
    camera.position.set(0, 0, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function setLight() {
    const light = new THREE.AmbientLight(0xFFFFFF); // soft white light
    //scene.add(light);
}

function loadPD() {
    let balloonLoader = new THREE.GLTFLoader();

    balloonLoader.load('./model/logo.gltf', (gltf) => {
        Mesh = gltf.scene;
        //Mesh.scale.set(1,1,1);
        scene.add(Mesh);
        Mesh.position.set(0, 0, -10);
        Mesh.children[0].children[1].material = new THREE.MeshBasicMaterial({ color: 0xB1AEA8 }); //light
        Mesh.children[0].children[0].material = new THREE.MeshBasicMaterial({ color: 0x322F29 }); //dark
    });
}

function loadOut() {
    let balloonLoader = new THREE.GLTFLoader();

    balloonLoader.load('./model/logooutline.gltf', (gltf) => {
        Mesh2 = gltf.scene;
        //Mesh.scale.set(1,1,1);
        scene.add(Mesh2);
        Mesh2.position.set(0, 0, -20);
        Mesh2.children[0].material = new THREE.MeshBasicMaterial({ color: 0xB1AEA8 }); //light
        //Mesh.children[0].children[0].material = new THREE.MeshBasicMaterial({ color: 0x322F29 }); //dark
    });
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

function animate() {
    requestAnimationFrame(animate);
    if (Mesh && Mesh.rotation) {

        rotlerpX = lerp(rotlerpX, rotX, 0.1);
        rotlerpY = lerp(rotlerpY, rotY, 0.1);
        //0.25 default
        var rotmult = 0.25
        Mesh.children[0].rotation.y = -rotlerpX * 3.1415 * rotmult;
        Mesh.children[0].rotation.x = -rotlerpY * 3.1415 * rotmult;

        Mesh2.children[0].rotation.y = -rotlerpX * 3.1415 * rotmult;
        Mesh2.children[0].rotation.x = -rotlerpY * 3.1415 * rotmult;
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    resize();
})

function resize() {
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerWidth / aspect);
}

document.addEventListener('mousemove', (e) => {
    rotX = -(e.clientX - window.innerWidth / 2) / (window.innerWidth);
    rotY = -(e.clientY - window.innerHeight / 2) / (window.innerHeight);
});

function deviceOrientationListener(e) {
    var g = Math.abs(e.gamma) * -1;
    var b = e.beta;
    var portrait = true;
    if (portrait) {
        if (e.gamma > 0)
            rotX = -(g / 90 + 5) / Math.pow((g / 90 - 2), 2) + 1.25;
        else
            rotX = (-(g / 90 + 5) / Math.pow((g / 90 - 2), 2) + 1.25) * -1;
        rotY = (e.beta / 180) / 2 - 0.3;
    }
    else {
        rotX = e.beta / 90;
        rotY = e.gamma / 90;
    }
}
window.addEventListener("deviceorientation", deviceOrientationListener, true);

function starstart() {

}

var rotX = Math.random() - 0.5;
var rotY = Math.random() - 0.5;

var rotlerpX = 0;
var rotlerpY = 0;

init();
//out();
resize();
loadPD();
loadOut();
starstart();

animate();