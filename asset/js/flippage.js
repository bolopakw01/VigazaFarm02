// Enhanced Bubble Animation
class BubbleAnimation {
    constructor() {
        this.bubbles = [];
        this.bubbleContainer = document.querySelector('.bubbles');
        this.setup();
        this.animate();
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setup() {
        this.bubbleContainer.innerHTML = '';
        this.bubbles = [];

        for (let i = 0; i < 25; i++) {
            this.createBubble();
        }
    }

    createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        const size = this.randomBetween(10, 40);
        const posX = this.randomBetween(0, 100);
        const duration = this.randomBetween(20, 40);
        const delay = this.randomBetween(0, 20);
        const opacity = this.randomBetween(0.4, 0.8);

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.bottom = `-${size}px`;
        bubble.style.opacity = opacity;

        const bubbleObj = {
            element: bubble,
            startTime: Date.now() - delay * 1000,
            duration: duration * 1000,
            startX: posX,
            amplitude: this.randomBetween(30, 100),
            speed: this.randomBetween(0.3, 1.2),
            size: size
        };

        this.bubbles.push(bubbleObj);
        this.bubbleContainer.appendChild(bubble);
    }

    animate() {
        const now = Date.now();
        const viewportHeight = window.innerHeight;

        this.bubbles.forEach(bubble => {
            const elapsed = (now - bubble.startTime) % bubble.duration;
            const progress = elapsed / bubble.duration;

            const verticalPos = this.easeInOutSine(progress) * (viewportHeight + bubble.size);
            const horizontalOffset = Math.sin(progress * Math.PI * 2 * bubble.speed) * bubble.amplitude;

            bubble.element.style.transform = `translateY(-${verticalPos}px) translateX(${horizontalOffset}px)`;
            bubble.element.style.opacity = 1 - progress * 0.8;

            if (progress > 0.95) {
                bubble.startTime = now;
                bubble.element.style.left = `${this.randomBetween(0, 100)}%`;
            }
        });

        requestAnimationFrame(this.animate.bind(this));
    }

    handleResize() {
        const now = Date.now();
        this.bubbles.forEach(bubble => {
            bubble.startTime = now;
        });
    }

    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    easeInOutSine(t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    }
}

// Flip animation logic
let currentFlip = 0;

function flipToRegister() {
    currentFlip += 180;
    document.getElementById('flipCard').style.transform = `rotateY(${currentFlip}deg)`;
}

function flipToLogin() {
    currentFlip += 180;
    document.getElementById('flipCard').style.transform = `rotateY(${currentFlip}deg)`;
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return Math.min(strength, 4);
}

function getStrengthColor(strength) {
    const colors = ['#dc3545', '#fd7e14', '#ffc107', '#28a745'];
    return colors[Math.min(strength, colors.length - 1)];
}

// Form validation
function validateLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Harap isi semua field');
        return false;
    }

    console.log('Login submitted');
    return true;
}

function validateRegister(e) {
    e.preventDefault();
    const password = document.getElementById('register_password').value;
    const confirm = document.getElementById('password-confirm').value;

    if (password !== confirm) {
        alert('Password tidak cocok!');
        return false;
    }

    console.log('Registration submitted');
    return true;
}

// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    new BubbleAnimation();

    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }

            input.focus();
        });
    });

    const passwordInput = document.getElementById('register_password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const strength = checkPasswordStrength(this.value);
            const meter = document.getElementById('password-strength-meter');

            if (!this.value.trim()) {
                meter.style.width = '0';
                meter.style.backgroundColor = 'transparent';
                return;
            }

            if (meter) {
                meter.style.width = `${strength * 25}%`;
                meter.style.backgroundColor = getStrengthColor(strength);
            }
        });
    }

    document.getElementById('loginForm')?.addEventListener('submit', validateLogin);
    document.getElementById('registerForm')?.addEventListener('submit', validateRegister);
});
