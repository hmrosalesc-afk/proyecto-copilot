// Gestión de navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Mostrar sección Inicio por defecto
    showSection('home');

    // Agregar listeners a los links de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            navigateTo(section);
        });
    });

    function showSection(sectionId) {
        // Ocultar todas las secciones
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar la sección seleccionada
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }

        // Actualizar estado de los links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });

        // Scroll al top
        window.scrollTo(0, 0);
    }

    // Función global para navegar
    window.navigateTo = function(sectionId) {
        showSection(sectionId);
    };
});

// Funcionalidad de búsqueda (para futura expansión)
function searchPosts(query) {
    const posts = document.querySelectorAll('.post-content');
    query = query.toLowerCase();

    posts.forEach(post => {
        const text = post.innerText.toLowerCase();
        const postSection = post.closest('.content-section');

        if (text.includes(query)) {
            postSection.style.display = 'block';
        } else {
            postSection.style.display = 'none';
        }
    });
}

// Funcionalidad de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            // La navegación ya se maneja en el event listener anterior
        }
    });
});

// Detectar scroll para efectos visuales
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Agregar funcionalidad de tabla de contenidos (expandible)
function generateTableOfContents(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headings = section.querySelectorAll('h3, h4');
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h4>Contenidos</h4><ul>';

    headings.forEach((heading, index) => {
        const id = `heading-${sectionId}-${index}`;
        heading.id = id;

        const level = heading.tagName === 'H3' ? 1 : 2;
        const indent = level === 1 ? '' : 'style="margin-left: 20px;"';

        toc.innerHTML += `<li ${indent}><a href="#${id}">${heading.textContent}</a></li>`;
    });

    toc.innerHTML += '</ul>';
    return toc;
}

// Funcionalidad de exportar post (puede expandirse)
function exportPost(postId) {
    const postSection = document.getElementById(postId);
    if (!postSection) return;

    const content = postSection.innerText;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${postId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Mejorar accesibilidad
document.addEventListener('keydown', function(e) {
    // Alt + Home: ir a inicio
    if (e.altKey && e.key === 'Home') {
        navigateTo('home');
    }
    // Alt + 1: ir a POST 1
    if (e.altKey && e.key === '1') {
        navigateTo('post1');
    }
    // Alt + 2: ir a POST 2
    if (e.altKey && e.key === '2') {
        navigateTo('post2');
    }
    // Alt + 3: ir a POST 3
    if (e.altKey && e.key === '3') {
        navigateTo('post3');
    }
});

// Función para copiar enlace de sección
function copyLink(sectionId) {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(function() {
        alert('Enlace copiado al portapapeles: ' + url);
    }).catch(function(err) {
        console.error('Error al copiar el enlace:', err);
    });
}

// Función para tema oscuro (para futuras implementaciones)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Cargar preferencia de tema oscuro al iniciar
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Agregar botón flotante de "Ir al inicio"
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 300) {
        if (!scrollToTopBtn) {
            createScrollToTopButton();
        }
        document.getElementById('scrollToTopBtn').style.display = 'block';
    } else {
        if (scrollToTopBtn) {
            scrollToTopBtn.style.display = 'none';
        }
    }
});

function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.innerHTML = '↑ Arriba';
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        z-index: 99;
        display: none;
        transition: all 0.3s ease;
    `;

    btn.addEventListener('click', function() {
        window.scrollTo(0, 0);
    });

    btn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#2980b9';
        this.style.transform = 'scale(1.1)';
    });

    btn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#3498db';
        this.style.transform = 'scale(1)';
    });

    document.body.appendChild(btn);
}

// Función para validar que el contenido está completamente cargado
function checkContentLoaded() {
    const posts = document.querySelectorAll('.post-content');
    return posts.length === 3; // Esperamos 3 posts
}

// Esperar a que el contenido esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Blog Técnico cargado correctamente');
        console.log('Contenido verificado:', checkContentLoaded() ? 'OK' : 'ERROR');
    });
} else {
    console.log('Blog Técnico ya está cargado');
}

// Funcionalidad de analytics simple (para tracking de vistas)
const analyticsData = {
    views: {
        home: 0,
        post1: 0,
        post2: 0,
        post3: 0,
        contacto: 0
    }
};

// Registrar vistas
const originalNavigateTo = window.navigateTo;
window.navigateTo = function(sectionId) {
    originalNavigateTo(sectionId);
    
    // Registrar vista
    if (analyticsData.views.hasOwnProperty(sectionId)) {
        analyticsData.views[sectionId]++;
    }
    
    // Guardar en localStorage
    localStorage.setItem('analyticsData', JSON.stringify(analyticsData));
    console.log('Vistas registradas:', analyticsData.views);
};

// Cargar analytics previas al iniciar
const savedAnalytics = localStorage.getItem('analyticsData');
if (savedAnalytics) {
    const parsed = JSON.parse(savedAnalytics);
    Object.assign(analyticsData.views, parsed.views);
}

// Función para mostrar estadísticas
function showAnalytics() {
    console.table(analyticsData.views);
}

// Funcionalidad de comentarios (para futuras implementaciones)
class CommentSection {
    constructor() {
        this.comments = [];
    }

    addComment(postId, author, text) {
        this.comments.push({
            id: Date.now(),
            postId: postId,
            author: author,
            text: text,
            timestamp: new Date(),
            likes: 0
        });
    }

    getComments(postId) {
        return this.comments.filter(c => c.postId === postId);
    }
}

const commentSystem = new CommentSection();

// Funcionalidad de búsqueda mejorada
function advancedSearch(query) {
    const sections = document.querySelectorAll('.content-section');
    const results = [];

    sections.forEach(section => {
        const title = section.querySelector('h2')?.textContent || '';
        const content = section.textContent;

        if (title.toLowerCase().includes(query.toLowerCase()) || 
            content.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                sectionId: section.id,
                title: title,
                matches: (content.match(new RegExp(query, 'gi')) || []).length
            });
        }
    });

    return results;
}

// Función para imprimir un post
function printPost(postId) {
    const postSection = document.getElementById(postId);
    if (!postSection) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>' + postSection.querySelector('h2').textContent + '</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
    printWindow.document.write('h2, h3, h4 { color: #2c3e50; }');
    printWindow.document.write('table { border-collapse: collapse; width: 100%; margin: 20px 0; }');
    printWindow.document.write('table th, table td { border: 1px solid #ddd; padding: 10px; text-align: left; }');
    printWindow.document.write('table th { background-color: #3498db; color: white; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(postSection.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

console.log('%cBlog Técnico - Arquitectura de Software', 'color: #3498db; font-size: 18px; font-weight: bold;');
console.log('%cAutor: Henry Mauricio Rosales Cajigas', 'color: #2c3e50; font-size: 14px;');
console.log('%cPowered by HTML, CSS, and JavaScript', 'color: #27ae60; font-size: 12px;');
