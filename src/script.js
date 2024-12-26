// #region Imports
import * as THREE from 'three'
import GUI from 'lil-gui'
import { Timer } from 'three/addons/misc/Timer.js';
import gsap from 'gsap'

// #endregion Imports

// #region Debug
const gui = new GUI({
    width: 340,
    title: 'Debug UI',
    closeFolders: true,
})

gui.close()
const debugObject = {}

window.addEventListener('keydown', (event) => {
    if(event.key === 'h') {
        gui.show(gui._hidden)
    }
})

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)
    })

// #endregion Debug

// #region Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// #endregion Cursor

// #region Scroll
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () => {
    scrollY = window.scrollY

    const newSection = Math.round(scrollY / sizes.height)

    if(newSection != currentSection) {
        currentSection = newSection
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        )
    }

})

// #endregion Scroll

// #region Initial Setup
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(2)
//scene.add(axesHelper)

const generalTweaks = gui.addFolder('General Tweaks')
generalTweaks.add(axesHelper, 'visible').name('Axes Visibility')

// #endregion Initial Setup

// #region Lights
const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

// #endregion Lights

// #region Light Helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false

// #endregion Light Helpers

// #region Textures
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    //console.log('Started loading all resources.')
}
loadingManager.onProgress = (item, loaded, total) => {
    //console.log(item, loaded, total)
}
loadingManager.onLoad = () => {
    //console.log('All resources loaded.')
}
loadingManager.onError = () => {
    //console.log('There was an error')
}

const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// #endregion Textures

// #region Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// #endregion Sizes

// #region Objects
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

// Objects
const objectsDistance = 4
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

torus.scale.setScalar(0.8)
cone.scale.setScalar(0.8)
torusKnot.scale.setScalar(0.8)

scene.add(torus, cone, torusKnot)

torus.position.y = - objectsDistance * 0
cone.position.y = - objectsDistance * 1
torusKnot.position.y = - objectsDistance * 2

torus.position.x = 1
cone.position.x = - 1
torusKnot.position.x = 1

const sectionMeshes = [torus, cone, torusKnot]

const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * (objectsDistance * 3)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const particlesMaterial = new THREE.PointsMaterial({   
    color: parameters.materialColor, 
    size: 0.05,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
})

const particles = new THREE.Points(
    particlesGeometry,
    particlesMaterial
)

scene.add(particles)

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        particlesMaterial.color.set(parameters.materialColor)
    })

// #endregion Objects

// #region Camera
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

// #endregion Camera

// #region Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// #endregion Renderer

// #region Animations
const timer = new Timer()
let previousTime = 0

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update objects
    for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12
    }

    // Update camera
    camera.position.y = (- scrollY / sizes.height ) * objectsDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 3 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 3 * deltaTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// #endregion Animations
