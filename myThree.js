

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
    camera.position.x = 10;
    camera.position.y = 10;
    camera.position.z = 10;
    camera.lookAt(new THREE.Vector3(0,0,0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    light = new THREE.AmbientLight( "#606060" );
    light.position.set(10,10,10);
    scene.add(light);

    var pointColor = "#ff5808";
    var directionalLight = new THREE.DirectionalLight(pointColor);
    directionalLight.position.set(-40, 60, -10);
    directionalLight.castShadow = true;
    directionalLight.shadowCameraNear = 2;
    directionalLight.shadowCameraFar = 200;
    directionalLight.shadowCameraLeft = -50;
    directionalLight.shadowCameraRight = 50;
    directionalLight.shadowCameraTop = 50;
    directionalLight.shadowCameraBottom = -50;

    directionalLight.distance = 0;
    directionalLight.intensity = 0.5;
    directionalLight.shadowMapHeight = 1024;
    directionalLight.shadowMapWidth = 1024;


    scene.add(directionalLight);
}

var cube;
function initObject() {

    var geometry2 = new THREE.CubeGeometry(0.95,0.95,0.95);
    var material2 = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false});
    cube = new THREE.Mesh(geometry2, material2);
    cube.position.set(0,1,0);
    var cube2 = new THREE.Mesh(geometry2,material2);
    cube2.position.set(0,0,0);
    scene.add(cube);
    scene.add(cube2);
}

function render()
{
    delta = clock.getDelta();
    orbitControls.update(delta);
    requestAnimationFrame(render);
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;
    //camera.position.x+=0.1;
    renderer.render(scene, camera);
}
function threeStart() {
    initGUI();
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initOribitControls();


    render();
}

var orbitControls, clock, delta;

function initOribitControls() {
    //添加轨道控制器
    //新建一个轨道控制器
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点
    orbitControls.autoRotate = true;//将自动旋转关闭
    orbitControls.autoRotateSpeed = controls.rotationSpeed;
    clock = new THREE.Clock();//用于更新轨道控制器
}

var controls;
function  initGUI() {
    //存放有所有需要改变的属性的对象
    controls = new function () {
        this.rotationSpeed = 5;
        this.autoRotate = true;
        this.start_x = 0;
        this.start_y = 0;
        this.start_z = 0;
        this.end_x = 10;
        this.end_y = 15;
        this.end_z =20;
    };

    //创建dat.GUI，传递并设置属性
    var gui = new dat.GUI();
    var autoRotateController =  gui.add(controls, 'autoRotate');
    var rotationSpeedController = gui.add(controls, 'rotationSpeed', 0, 20);
    gui.add(controls, 'start_x');
    gui.add(controls, 'start_y');
    gui.add(controls, 'start_z');
    gui.add(controls, 'end_x');
    gui.add(controls, 'end_y');
    gui.add(controls, 'end_z');
    rotationSpeedController.onChange(
        function (value) {
            orbitControls.autoRotateSpeed = value;
        }
    );
    autoRotateController.onChange(
        function (value) {
            orbitControls.autoRotate = value;
        }
    );

}