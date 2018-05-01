

window.onload = function () {
    threeStart();
}



var renderer;
function initThree() {
    //width = document.getElementById('canvas-frame').clientWidth;
    //height = document.getElementById('canvas-frame').clientHeight;
    width = window.innerWidth;
    height = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    //document.getElementById('canvas-frame').appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 1000;
    camera.position.y = 1000;
    camera.position.z = 1000;
    camera.lookAt(new THREE.Vector3(0,0,0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
    var axes = new THREE.AxesHelper(1000);
    scene.add(axes);
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

var geometry;
var material;
var cube;
var cube2;
function initObject() {

    geometry = new THREE.CubeGeometry(0.95,0.95,0.95);
    material = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false});
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0,1,0);
    cube2 = new THREE.Mesh(geometry,material);
    cube2.position.set(0,0,0);
    scene.add(cube);
    scene.add(cube2);
}

function render()
{
    delta = clock.getDelta();
    orbitControls.update(delta);
    requestAnimationFrame(render);
    drawLine();
    renderer.render(scene, camera);
}

function drawLine() {
    var children = scene.children;
    for(var i=3;i<children.length;i++){
        scene.remove(children[i]);
    }

    var directionVector = new THREE.Vector3(
        controls.end_x-controls.start_x,
        controls.end_y-controls.start_y,
        controls.end_z-controls.start_z
    );
    var mainDirection = Math.max(Math.abs(directionVector.x), Math.abs(directionVector.y), Math.abs(directionVector.z));
    var x = controls.start_x;
    var y = controls.start_y;
    var z = controls.start_z;
    var dx = directionVector.x/mainDirection;
    var dy = directionVector.y/mainDirection;
    var dz = directionVector.z/mainDirection;
    for(var j=0;j<mainDirection;j++){
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(Math.round(x), Math.round(y), Math.round(z));
        if(j === Math.round(mainDirection/2)){
            orbitControls.target = new THREE.Vector3(x, y, z);
        }
        x += dx;
        y += dy;
        z += dz;
        scene.add(cube);
    }

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
    orbitControls.autoRotate = true;//将自动旋转打开
    orbitControls.autoRotateSpeed = 5;
    clock = new THREE.Clock();//用于更新轨道控制器
}




var controls;
function  initGUI() {
    //存放有所有需要改变的属性的对象
    controls = new function () {
        this.rotationSpeed = 5;
        this.autoRotate = true;
        this.start_x = 211;
        this.start_y = 106;
        this.start_z = 326;
        this.end_x = 433;
        this.end_y = 985;
        this.end_z =666;
    };

    //创建dat.GUI，传递并设置属性
    var gui = new dat.GUI();
    //gui.domElement.style = 'position:absolute;top:0px;left:0px;width:180px';
    var autoRotateController =  gui.add(controls, 'autoRotate');
    var rotationSpeedController = gui.add(controls, 'rotationSpeed', 0, 20);
    var f_start = gui.addFolder("Start Point");
    f_start.add(controls, 'start_x', 0, 1000);
    f_start.add(controls, 'start_y', 0, 1000);
    f_start.add(controls, 'start_z', 0, 1000);
    f_start.open();
    var f_end = gui.addFolder("End Point");
    f_end.add(controls, 'end_x', 0, 1000);
    f_end.add(controls, 'end_y', 0, 1000);
    f_end.add(controls, 'end_z', 0, 1000);
    f_end.open();
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