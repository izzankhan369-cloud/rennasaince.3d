gsap.registerPlugin(ScrollTrigger);

let scene, camera, renderer, sphere, mouse = { x: 0, y: 0 };

function initThree() {
    const canvas = document.getElementById('canvas3d');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.IcosahedronGeometry(2, 4);
    const material = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        wireframe: false,
        roughness: 0.3,
        metalness: 0.8
    });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const light1 = new THREE.PointLight(0xffffff, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.AmbientLight(0xD2B48C, 0.5);
    scene.add(light2);

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.002;
    
    sphere.position.x += (mouse.x * 0.5 - sphere.position.x) * 0.05;
    sphere.position.y += (mouse.y * 0.5 - sphere.position.y) * 0.05;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

initThree();

const text = "Unlock the masterpiece within your child.";
let i = 0;
const typewriter = document.getElementById('typewriter');

function type() {
    if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80);
    }
}

setTimeout(type, 1000);

const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});

const links = document.querySelectorAll('a, button, .faq-question');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('expand');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('expand');
    });
});

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('fullscreenMenu');
const closeMenu = document.getElementById('closeMenu');
const menuLinks = document.querySelectorAll('.menu-links a');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

gsap.utils.toArray('.fade-up').forEach(element => {
    gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
});

const cards = document.querySelectorAll('.tilt-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

const form = document.getElementById('enrollmentForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        goals: document.getElementById('goals').value
    };
    
    try {
        const response = await fetch('YOUR_N8N_WEBHOOK_URL_HERE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            gsap.to(form, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    form.style.display = 'none';
                    successMessage.classList.add('show');
                }
            });
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again.');
    }
});

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
