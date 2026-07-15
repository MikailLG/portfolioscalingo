document.addEventListener('DOMContentLoaded', () => {
    
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;
    const themeKey = 'theme-preference';

    const applyTheme = (isLightMode) => {
        if (isLightMode) {
            body.classList.add('light-mode');
            toggleButton.textContent = 'Mode Sombre';
            localStorage.setItem(themeKey, 'light');
        } else {
            body.classList.remove('light-mode');
            toggleButton.textContent = 'Mode Clair';
            localStorage.setItem(themeKey, 'dark');
        }
    };

    const savedTheme = localStorage.getItem(themeKey);
    const prefersLight = savedTheme === 'light';

    if (savedTheme) {
        applyTheme(prefersLight);
    } else {
        toggleButton.textContent = 'Mode Clair';
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isCurrentlyLight = body.classList.contains('light-mode');
            applyTheme(!isCurrentlyLight);
        });
    }

    const visitCountElement = document.getElementById('visit-count');
    const visitKey = 'portfolio_visit_count';
    
    let count = localStorage.getItem(visitKey);

    if (count === null) {
        count = 1;
    } else {
        count = parseInt(count) + 1;
    }

    localStorage.setItem(visitKey, count);
    if (visitCountElement) {
        visitCountElement.textContent = count;
    }
    
    const starfield = document.getElementById('starfield');
    const numStars = 100;
    
    const randomRange = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = randomRange(0, 100);
        const y = randomRange(0, 100);
        
        const size = randomRange(1, 3);
        const duration = randomRange(10, 30);
        const opacity = randomRange(0.4, 0.9);

        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.animationDuration = `${duration}s`;
        
        starfield.appendChild(star);
    }

    const createComet = () => {
        const comet = document.createElement('div');
        comet.classList.add('comet');
        starfield.appendChild(comet);
        
        const size = randomRange(3, 8);
        const animationDuration = randomRange(10, 20);
        const delay = randomRange(0, 5);

        comet.style.width = `${size}px`;
        comet.style.height = `${size}px`;
        comet.style.animationDuration = `${animationDuration}s`;
        comet.style.animationDelay = `${delay}s`;

        comet.addEventListener('animationend', () => {
            comet.remove();
        });
    };

    setInterval(createComet, 30000); 
    createComet(); 

    const projectsData = {
        alpha: {
            title: "PROJET ALPHA",
            tech: "Technologies : React, API REST, SASS",
            desc: "Application de gestion de tâches avec authentification utilisateur complète. L'accent a été mis sur la performance et l'accessibilité.",
            link: "#"
        },
        beta: {
            title: "PROJET BETA",
            tech: "Technologies : Vue.js, Firebase",
            desc: "Création d'un tableau de bord de monitoring en temps réel pour une petite entreprise. Optimisation des connexions aux bases de données NoSQL.",
            link: "#"
        },
        gamma: {
            title: "PROJET GAMMA",
            tech: "Technologies : Node.js, Express, MongoDB",
            desc: "Développement du back-end d'une plateforme e-commerce minimaliste. Gestion des utilisateurs, des produits et des commandes.",
            link: "#"
        },
        delta: {
            title: "PROJET DELTA",
            tech: "Technologies : JavaScript pur, Canvas",
            desc: "Jeu simple de type 'Space Shooter' en JS. Exploration des logiques de collision et d'animation sans librairie externe.",
            link: "#"
        }
    };
    
    const displayWindow = document.getElementById('project-display');
    const projectButtons = document.querySelectorAll('.project-file-btn');

    const updateProjectDisplay = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        displayWindow.classList.add('fade-out');

        setTimeout(() => {
            displayWindow.innerHTML = `
                <div class="project-content">
                    <h3>${data.title}</h3>
                    <p class="tech-stack">${data.tech}</p>
                    <p>${data.desc}</p>
                    <a href="${data.link}" class="view-link">Accéder au Dossier</a>
                </div>
            `;
            
            displayWindow.classList.remove('fade-out');
            displayWindow.classList.add('fade-in');

            setTimeout(() => {
                displayWindow.classList.remove('fade-in');
            }, 500);

        }, 300);
    };

    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;

            projectButtons.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');

            updateProjectDisplay(projectId);
        });
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (inputElement, minLength = 0) => {
        const value = inputElement.value.trim();
        const errorElement = document.getElementById(inputElement.id + '-error');
        let isValid = true;
        let errorMessage = '';

        inputElement.classList.remove('is-valid', 'is-invalid');
        
        if (value.length < minLength) {
            errorMessage = `${inputElement.placeholder} doit contenir au moins ${minLength} caractères.`;
            isValid = false;
        }

        if (inputElement.type === 'email' && !emailRegex.test(value) && value.length > 0) {
            errorMessage = 'Veuillez entrer une adresse email valide.';
            isValid = false;
        }

        if (value.length === 0 && inputElement.required) {
            errorMessage = `${inputElement.placeholder} est requis.`;
            isValid = false;
        }
        
        errorElement.textContent = errorMessage;

        if (isValid && value.length > 0) {
            inputElement.classList.add('is-valid');
        } else if (!isValid) {
            inputElement.classList.add('is-invalid');
        }
        
        return isValid;
    };

    nameInput.addEventListener('blur', () => validateField(nameInput, 2));
    emailInput.addEventListener('blur', () => validateField(emailInput));
    messageTextarea.addEventListener('blur', () => validateField(messageTextarea, 10));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const isNameValid = validateField(nameInput, 2);
        const isEmailValid = validateField(emailInput);
        const isMessageValid = validateField(messageTextarea, 10);
        
        const isFormValid = isNameValid && isEmailValid && isMessageValid;

        if (isFormValid) {
            const formData = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.style.color = '#4dff4d';
                    formStatus.textContent = 'Message envoyé avec succès ! Merci.';
                    form.reset();
                    
                    [nameInput, emailInput, messageTextarea].forEach(input => {
                        input.classList.remove('is-valid', 'is-invalid');
                        document.getElementById(input.id + '-error').textContent = '';
                    });
                    
                } else {
                    formStatus.style.color = '#ff4d4d';
                    formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer plus tard.';
                }
            } catch (error) {
                formStatus.style.color = '#ff4d4d';
                formStatus.textContent = 'Erreur de connexion. Veuillez vérifier votre réseau.';
            }
        } else {
            formStatus.style.color = '#ff4d4d';
            formStatus.textContent = 'Veuillez corriger les erreurs ci-dessus.';
        }
    });
});