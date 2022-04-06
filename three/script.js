// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry = new THREE.SphereGeometry(15, 32, 16);
var material = new THREE.MeshLambertMaterial({ color: "#bb3e03" } );
var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene
scene.add( cube );

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(0, 50, 0);
scene.add(light);

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.0025
  cube.rotation.y += 0.0025

  // Render the scene
  renderer.render(scene, camera);
};

render();
