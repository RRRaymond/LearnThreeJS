window.onload = function () {
    threeStart();
}

var renderer;
function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;
    camera.up.x = 1;
    camera.up.y = 1;
    camera.up.z = 0;
    // camera.lookAt({
    //     x : 0,
    //     y : 0,
    //     z : 0
    // });
    // camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    // camera.position.z = 5;
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
}

var cube;
function initObject() {

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( -100, 0, 100 );
    var p2 = new THREE.Vector3(  100, 0, -100 );
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push( color1, color2 );

    var line = new THREE.Line( geometry, material, THREE.LineSegments );
    scene.add(line);
    var geometry2 = new THREE.CubeGeometry(1,1,1);
    var material2 = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    cube = new THREE.Mesh(geometry2, material2);
    scene.add(cube);
}

function render()
{
    requestAnimationFrame(render);
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);
}
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();

    render();
}