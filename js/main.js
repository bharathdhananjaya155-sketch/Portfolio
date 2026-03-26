document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);

    // Populate Hero Section
    const heroName = document.getElementById('hero-name');
    const heroRole = document.getElementById('hero-role');
    const heroIntro = document.getElementById('hero-intro');
    const resumeBtn = document.getElementById('resume-btn');
    const footerName = document.getElementById('footer-name');
    const codeContent = document.getElementById('code-content');

    heroName.textContent = APP_DATA.name;
    heroRole.textContent = APP_DATA.role;
    heroIntro.textContent = APP_DATA.introduction;
    resumeBtn.href = APP_DATA.resumeLink;
    footerName.textContent = APP_DATA.name;

    // Code Editor Typing Effect
    const codeText = `const developer = {
    name: "${APP_DATA.name}",
    role: "${APP_DATA.role}",
    skills: [
        "JavaScript", 
        "React", 
        "Node.js"
    ],
    hardWorker: true
};`;

    let i = 0;
    function typeCode() {
        if (i < codeText.length) {
            codeContent.innerHTML += codeText.charAt(i);
            i++;
            setTimeout(typeCode, 30);
        }
    }
    typeCode();

    // Populate Projects
    const projectsContainer = document.getElementById('projects-container');
    APP_DATA.projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.style.cursor = 'pointer';
        card.onclick = () => window.open(project.link, '_blank');
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div style="margin-top: 1rem; font-size: 0.9rem; color: #888;">
                    <strong>Tech:</strong> ${project.tech.join(', ')}
                </div>
            </div>
        `;
        projectsContainer.appendChild(card);
    });

    // Populate Experience
    const experienceContainer = document.getElementById('experience-container');
    APP_DATA.experience.forEach(exp => {
        const item = document.createElement('div');
        item.style.marginBottom = '1.5rem';
        const certHtml = exp.certificateLink ? `<p style="margin-top: 0.5rem;"><a href="${exp.certificateLink}" target="_blank" style="color: var(--accent-color); font-size: 0.9rem; text-decoration: none;"><i class="fa-solid fa-certificate"></i> View Certificate</a></p>` : '';
        item.innerHTML = `
            <h3>${exp.role}</h3>
            <p style="color: var(--accent-color);">${exp.company}</p>
            <p style="font-size: 0.9rem; color: #aaa;">${exp.date}</p>
            ${certHtml}
        `;
        experienceContainer.appendChild(item);
    });

    // Populate Skills
    const skillsContainer = document.getElementById('skills-container');
    APP_DATA.skills.forEach(skill => {
        const chip = document.createElement('div');
        chip.classList.add('skill-chip');
        chip.innerHTML = `<i class="${skill.icon}"></i> <span>${skill.name}</span>`;
        skillsContainer.appendChild(chip);
    });

    // Populate Contact
    const contactContainer = document.getElementById('contact-container');
    const { email, github, linkedin } = APP_DATA.socialLinks;
    contactContainer.innerHTML = `
        <p>Email: <a href="${email}" style="color: var(--accent-color);">${email.replace('mailto:', '')}</a></p>
        <p>
            <a href="${github}" target="_blank" style="color: #fff; margin-right: 10px;"><i class="fa-brands fa-github"></i> GitHub</a>
            <a href="${linkedin}" target="_blank" style="color: #fff;"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
        </p>
    `;

    // --- Animations & Interactivity ---

    // 1. Scroll Reveal Animation
    const sections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        section.classList.add('reveal');
        revealObserver.observe(section);
    });

    // 2. Active Navbar Link Highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    sections.forEach(section => {
        navObserver.observe(section);
    });
});
