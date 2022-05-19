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
    const light = new THREE.AmbientLight(0xFFFFFF,1); // soft white light
    scene.add(light);
}

function loadText() {
    let balloonLoader = new THREE.GLTFLoader();

    balloonLoader.load('./model/sightseekertext.gltf', (gltf) => {
        Mesh = gltf.scene;
        scene.add(Mesh);
        Mesh.position.set(0, 0, -10);
        Mesh.scale.set(0.5, 0.5, 0.5);
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

var rotX = Math.random() - 0.5;
var rotY = Math.random() - 0.5;

var rotlerpX = 0;
var rotlerpY = 0;

init();
setLight();
resize();
loadText();

animate();