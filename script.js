// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize Feather icons and 3D models after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (feather) feather.replace();

    // Initialize 3D Models for Interests Section with a small delay
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            console.log('Three.js loaded, initializing 3D models...');
            init3DModels();
        } else {
            console.error('Three.js not loaded');
        }
    }, 100);
});

// 3D Models Initialization
function init3DModels() {
    console.log('Starting 3D model initialization...');

    // Engineering 3D Model (Gear/Mechanical)
    createEngineeringModel();

    // AI 3D Model (Neural Network/Brain)
    createAIModel();

    // Learning 3D Model (Book/Knowledge)
    createLearningModel();

    // Sports 3D Model (Ball/Sports Equipment)
    createSportsModel();

    // Fitness 3D Model (Dumbbell/Weights)
    createFitnessModel();

    // Entertainment 3D Model (TV/Screen)
    createEntertainmentModel();
}

// Engineering 3D Model - Rotating Gear
function createEngineeringModel() {
    const container = document.getElementById('engineering-3d');
    if (!container) {
        console.error('Engineering container not found');
        return;
    }
    console.log('Creating engineering model...');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create gear geometry
    const gearGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 12);
    const gearMaterial = new THREE.MeshPhongMaterial({
        color: 0xe67e22,
        shininess: 100
    });
    const gear = new THREE.Mesh(gearGeometry, gearMaterial);

    // Add teeth to gear
    for (let i = 0; i < 12; i++) {
        const toothGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.35);
        const tooth = new THREE.Mesh(toothGeometry, gearMaterial);
        const angle = (i / 12) * Math.PI * 2;
        tooth.position.x = Math.cos(angle) * 1.3;
        tooth.position.z = Math.sin(angle) * 1.3;
        gear.add(tooth);
    }

    scene.add(gear);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 0.6));

    camera.position.z = 3;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        gear.rotation.z += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// AI 3D Model - Neural Network Nodes
function createAIModel() {
    const container = document.getElementById('ai-3d');
    if (!container) {
        console.error('AI container not found');
        return;
    }
    console.log('Creating AI model...');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create neural network nodes
    const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0xe74c3c,
        emissive: 0x330000
    });

    const nodes = [];

    // Create 3 layers of nodes
    for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < 4; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.x = (layer - 1) * 1.5;
            node.position.y = (i - 1.5) * 0.8;
            node.position.z = 0;
            nodes.push(node);
            scene.add(node);
        }
    }

    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xe74c3c, opacity: 0.6, transparent: true });

    // Connect each layer to the next layer
    for (let layer = 0; layer < 2; layer++) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const sourceIndex = layer * 4 + i;
                const targetIndex = (layer + 1) * 4 + j;

                if (sourceIndex < nodes.length && targetIndex < nodes.length) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        nodes[sourceIndex].position,
                        nodes[targetIndex].position
                    ]);
                    const line = new THREE.Line(geometry, lineMaterial);
                    scene.add(line);
                }
            }
        }
    }

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 0.6));

    camera.position.z = 4;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        nodes.forEach((node, index) => {
            node.material.emissive.setHex(Math.sin(Date.now() * 0.005 + index) > 0 ? 0x330000 : 0x000000);
        });
        renderer.render(scene, camera);
    }
    animate();
}

// Learning 3D Model - Floating Books
function createLearningModel() {
    const container = document.getElementById('learning-3d');
    if (!container) {
        console.error('Learning container not found');
        return;
    }
    console.log('Creating learning model...');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create books
    const books = [];
    const colors = [0x9b59b6, 0x3498db, 0x2ecc71];

    for (let i = 0; i < 3; i++) {
        const bookGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.15);
        const bookMaterial = new THREE.MeshPhongMaterial({ color: colors[i] });
        const book = new THREE.Mesh(bookGeometry, bookMaterial);

        book.position.x = (i - 1) * 1.2;
        book.position.y = Math.sin(i) * 0.5;
        book.rotation.y = i * 0.3;

        books.push(book);
        scene.add(book);
    }

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 0.6));

    camera.position.z = 4;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        books.forEach((book, index) => {
            book.position.y = Math.sin(Date.now() * 0.002 + index) * 0.3;
            book.rotation.y += 0.005;
        });
        renderer.render(scene, camera);
    }
    animate();
}

// Sports 3D Model - Cricket & Soccer Equipment
function createSportsModel() {
    const container = document.getElementById('sports-3d');
    if (!container) {
        console.error('Sports container not found');
        return;
    }
    console.log('Creating sports model...');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const sportsGroup = new THREE.Group();

    // Cricket Ball (red leather)
    const cricketBallGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const cricketBallMaterial = new THREE.MeshPhongMaterial({
        color: 0x8B0000,
        shininess: 60
    });
    const cricketBall = new THREE.Mesh(cricketBallGeometry, cricketBallMaterial);
    cricketBall.position.set(-2, 1, 0);

    // Cricket ball seam
    const seamGeometry = new THREE.TorusGeometry(0.41, 0.02, 8, 16);
    const seamMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const seam = new THREE.Mesh(seamGeometry, seamMaterial);
    seam.position.copy(cricketBall.position);
    seam.rotation.x = Math.PI / 2;

    // Cricket Bat
    const batGroup = new THREE.Group();

    // Bat blade
    const bladeGeometry = new THREE.BoxGeometry(0.15, 2, 0.4);
    const bladeMaterial = new THREE.MeshPhongMaterial({ color: 0xD2B48C });
    const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
    blade.position.y = -0.5;

    // Bat handle
    const handleGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.8, 8);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.y = 0.9;

    // Bat grip
    const gripGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 8);
    const gripMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.position.y = 1.15;

    batGroup.add(blade, handle, grip);
    batGroup.position.set(-1, -1, 0);
    batGroup.rotation.z = -Math.PI / 6;

    // Soccer Ball
    const soccerBallGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const soccerBallMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        shininess: 100
    });
    const soccerBall = new THREE.Mesh(soccerBallGeometry, soccerBallMaterial);
    soccerBall.position.set(1.5, 0.5, 0);

    // Soccer ball black pentagons
    for (let i = 0; i < 12; i++) {
        const pentagonGeometry = new THREE.SphereGeometry(0.08, 5, 5);
        const pentagonMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const pentagon = new THREE.Mesh(pentagonGeometry, pentagonMaterial);

        const phi = Math.acos(-1 + (2 * i) / 12);
        const theta = Math.sqrt(12 * Math.PI) * phi;

        pentagon.position.setFromSphericalCoords(0.51, phi, theta);
        pentagon.position.add(soccerBall.position);
        sportsGroup.add(pentagon);
    }

    // Goal Post
    const goalGroup = new THREE.Group();
    const postMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    // Left post
    const leftPostGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const leftPost = new THREE.Mesh(leftPostGeometry, postMaterial);
    leftPost.position.set(-0.6, 0.75, -1);

    // Right post
    const rightPost = new THREE.Mesh(leftPostGeometry, postMaterial);
    rightPost.position.set(0.6, 0.75, -1);

    // Crossbar
    const crossbarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8);
    const crossbar = new THREE.Mesh(crossbarGeometry, postMaterial);
    crossbar.position.set(0, 1.5, -1);
    crossbar.rotation.z = Math.PI / 2;

    // Goal net (simplified)
    const netGeometry = new THREE.PlaneGeometry(1.2, 1.5, 6, 8);
    const netMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const net = new THREE.Mesh(netGeometry, netMaterial);
    net.position.set(0, 0.75, -1.1);

    goalGroup.add(leftPost, rightPost, crossbar, net);
    goalGroup.position.set(2, -1, 0);
    goalGroup.scale.set(0.7, 0.7, 0.7);

    // Add all elements to sports group
    sportsGroup.add(cricketBall, seam, batGroup, soccerBall, goalGroup);
    scene.add(sportsGroup);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 0.6));

    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        // Rotate cricket ball
        cricketBall.rotation.x += 0.01;
        cricketBall.rotation.y += 0.015;
        seam.rotation.x += 0.01;
        seam.rotation.y += 0.015;

        // Rotate soccer ball
        soccerBall.rotation.x += 0.008;
        soccerBall.rotation.y += 0.012;

        // Slight rotation of the entire sports group
        sportsGroup.rotation.y += 0.003;

        renderer.render(scene, camera);
    }
    animate();
}

// Fitness 3D Model - Dumbbell
function createFitnessModel() {
    const container = document.getElementById('fitness-3d');
    if (!container) {
        console.error('Fitness container not found');
        return;
    }
    console.log('Creating fitness model...');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create dumbbell
    const dumbbellGroup = new THREE.Group();

    // Handle
    const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x34495e });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.rotation.z = Math.PI / 2;
    dumbbellGroup.add(handle);

    // Weights
    const weightGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8);
    const weightMaterial = new THREE.MeshPhongMaterial({ color: 0x3498db });

    const weight1 = new THREE.Mesh(weightGeometry, weightMaterial);
    weight1.position.x = -1.15;
    weight1.rotation.z = Math.PI / 2;
    dumbbellGroup.add(weight1);

    const weight2 = new THREE.Mesh(weightGeometry, weightMaterial);
    weight2.position.x = 1.15;
    weight2.rotation.z = Math.PI / 2;
    dumbbellGroup.add(weight2);

    scene.add(dumbbellGroup);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 0.6));

    camera.position.z = 3;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        dumbbellGroup.rotation.y += 0.01;
        dumbbellGroup.position.y = Math.sin(Date.now() * 0.003) * 0.1;
        renderer.render(scene, camera);
    }
    animate();
}

// Entertainment 3D Model - Anime & Cinema Scene
function createEntertainmentModel() {
    const container = document.getElementById('entertainment-3d');
    if (!container) {
        console.error('Entertainment container not found');
        return;
    }
    console.log('Creating entertainment model...');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const entertainmentGroup = new THREE.Group();

    // Film Reel
    const filmReelGroup = new THREE.Group();

    // Main reel disk
    const reelGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 16);
    const reelMaterial = new THREE.MeshPhongMaterial({ color: 0x2C2C2C });
    const reel = new THREE.Mesh(reelGeometry, reelMaterial);

    // Reel spokes
    for (let i = 0; i < 6; i++) {
        const spokeGeometry = new THREE.BoxGeometry(0.05, 1.4, 0.05);
        const spokeMaterial = new THREE.MeshPhongMaterial({ color: 0x404040 });
        const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
        spoke.rotation.z = (i * Math.PI) / 3;
        reel.add(spoke);
    }

    // Film strip
    const filmGeometry = new THREE.BoxGeometry(2, 0.3, 0.02);
    const filmMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const filmStrip = new THREE.Mesh(filmGeometry, filmMaterial);
    filmStrip.position.y = -1.2;

    // Film perforations
    for (let i = 0; i < 10; i++) {
        const perfGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.03);
        const perfMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const perf = new THREE.Mesh(perfGeometry, perfMaterial);
        perf.position.set(-0.9 + i * 0.2, -1.1, 0.01);
        filmStrip.add(perf);

        const perf2 = new THREE.Mesh(perfGeometry, perfMaterial);
        perf2.position.set(-0.9 + i * 0.2, -1.3, 0.01);
        filmStrip.add(perf2);
    }

    filmReelGroup.add(reel, filmStrip);
    filmReelGroup.position.set(-1.5, 0.5, 0);
    filmReelGroup.scale.set(0.7, 0.7, 0.7);

    // Cinema Screen with Anime Character (simplified)
    const screenGroup = new THREE.Group();

    // Screen frame
    const screenFrameGeometry = new THREE.BoxGeometry(1.6, 1, 0.1);
    const screenFrameMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const screenFrame = new THREE.Mesh(screenFrameGeometry, screenFrameMaterial);

    // Screen surface
    const screenSurfaceGeometry = new THREE.PlaneGeometry(1.4, 0.8);
    const screenSurfaceMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEEB });
    const screenSurface = new THREE.Mesh(screenSurfaceGeometry, screenSurfaceMaterial);
    screenSurface.position.z = 0.06;

    // Simple anime character representation (geometric shapes)
    // Character head
    const headGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xFFDBB3 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0.2, 0.2, 0.07);

    // Character eyes
    const eyeGeometry = new THREE.SphereGeometry(0.03, 6, 6);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.15, 0.23, 0.08);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 0.23, 0.08);

    // Character hair
    const hairGeometry = new THREE.SphereGeometry(0.18, 8, 8);
    const hairMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.set(0.2, 0.28, 0.065);
    hair.scale.set(1, 0.7, 1);

    // Character body
    const bodyGeometry = new THREE.BoxGeometry(0.15, 0.3, 0.1);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6B6B });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0.2, -0.1, 0.07);

    screenGroup.add(screenFrame, screenSurface, head, leftEye, rightEye, hair, body);
    screenGroup.position.set(1, 0, 0);

    // Movie Camera
    const cameraGroup = new THREE.Group();

    // Camera body
    const cameraBodyGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.8);
    const cameraBodyMaterial = new THREE.MeshPhongMaterial({ color: 0x2C2C2C });
    const cameraBody = new THREE.Mesh(cameraBodyGeometry, cameraBodyMaterial);

    // Camera lens
    const lensGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 12);
    const lensMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.rotation.x = Math.PI / 2;
    lens.position.z = 0.55;

    // Lens glass
    const lensGlassGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 12);
    const lensGlassMaterial = new THREE.MeshPhongMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.7
    });
    const lensGlass = new THREE.Mesh(lensGlassGeometry, lensGlassMaterial);
    lensGlass.rotation.x = Math.PI / 2;
    lensGlass.position.z = 0.7;

    // Camera tripod leg (simplified)
    const tripodGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 6);
    const tripodMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const tripodLeg = new THREE.Mesh(tripodGeometry, tripodMaterial);
    tripodLeg.position.y = -0.6;

    cameraGroup.add(cameraBody, lens, lensGlass, tripodLeg);
    cameraGroup.position.set(0, -1, 0);
    cameraGroup.scale.set(0.8, 0.8, 0.8);

    // Add all elements
    entertainmentGroup.add(filmReelGroup, screenGroup, cameraGroup);
    scene.add(entertainmentGroup);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(3, 3, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 0.7));

    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        // Rotate film reel
        filmReelGroup.rotation.z += 0.02;

        // Gentle rotation of the entire scene
        entertainmentGroup.rotation.y += 0.005;

        // Animate screen content (subtle glow effect)
        const time = Date.now() * 0.002;
        screenGroup.children[1].material.emissive.setHex(
            Math.floor(Math.sin(time) * 0x111111)
        );

        renderer.render(scene, camera);
    }
    animate();
}

// Handle window resize for all 3D models
window.addEventListener('resize', () => {
    const containers = [
        'engineering-3d', 'ai-3d', 'learning-3d',
        'sports-3d', 'fitness-3d', 'entertainment-3d'
    ];

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container && container.querySelector('canvas')) {
            const canvas = container.querySelector('canvas');
            const rect = container.getBoundingClientRect();
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
        }
    });
});
