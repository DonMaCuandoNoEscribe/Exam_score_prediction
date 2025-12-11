/**
 * Student Score Predictor - Frontend Application
 * Handles pill navigation, dynamic form generation, API communication, and results
 */

// =============================================================================
// TRANSLATIONS (English / Spanish)
// =============================================================================

const translations = {
    en: {
        // Header
        'header.title': 'Student Score Predictor',
        'header.badge': 'Portfolio Project',
        
        // Navigation
        'nav.about': 'About',
        'nav.stack': 'Stack',
        'nav.deploy': 'Deploy',
        'nav.predict': 'Predict',
        
        // Hero Section
        'hero.badge': 'End-to-End Machine Learning Pipeline',
        'hero.title': 'Predict Student Performance with',
        'hero.title.gradient': 'Machine Learning',
        'hero.description': 'A full-stack ML application that helps educators predict student exam scores based on study habits, attendance patterns, and environmental factors. Built as a portfolio project demonstrating modern MLOps practices with Docker containerization and cloud deployment.',
        
        // Stats
        'stats.records': 'Training Records',
        'stats.features': 'Features Selected',
        'stats.target': 'R² Target',
        'stats.achieved': 'R² Achieved',
        
        // CTA Buttons
        'cta.predict': 'Try Prediction',
        'cta.stack': 'View Tech Stack',
        
        // Goals
        'goals.title': 'What We\'re Building',
        'goals.1.title': 'Early Intervention',
        'goals.1.desc': 'Identify at-risk students before exams through predictive analytics',
        'goals.2.title': 'Data-Driven Decisions',
        'goals.2.desc': 'Empower educators with actionable insights for personalized support',
        'goals.3.title': 'MLOps Excellence',
        'goals.3.desc': 'Demonstrate end-to-end ML pipeline with Docker & cloud deployment',
        
        // Stack Page
        'stack.title': 'Built With Modern Tools',
        'stack.subtitle': 'Production-ready architecture deployed on Render',
        
        // Architecture Cards
        'arch.ds.title': 'Data Science',
        'arch.ds.desc': 'EDA, feature engineering, model training',
        'arch.api.title': 'Backend API',
        'arch.api.desc': 'RESTful endpoints with FastAPI + Pydantic',
        'arch.ui.title': 'Frontend UI',
        'arch.ui.desc': 'Dynamic forms, real-time predictions',
        'arch.deploy.title': 'Deployment',
        'arch.deploy.desc': 'Docker container on Render',
        'arch.deploy.tag': 'Free Tier',
        
        // Deploy Page
        'deploy.title': 'Cloud Deployment',
        'deploy.subtitle': 'Deployed on Render with Docker containerization',
        'deploy.card1.title': 'Free Hosting',
        'deploy.card1.desc': 'Free tier deployment on Render',
        'deploy.card2.title': 'Docker SDK',
        'deploy.card2.desc': 'Full control with custom Dockerfile configuration',
        'deploy.card3.title': 'Auto Deploy',
        'deploy.card3.desc': 'Git push triggers automatic container rebuild',
        'deploy.card4.title': 'Port 8000',
        'deploy.card4.desc': 'Standard port 8000 for FastAPI',
        
        // Predict Page
        'predict.title': 'Make a Prediction',
        'predict.subtitle': 'Enter student information below to predict their exam score',
        'predict.form.title': 'Student Information',
        'predict.form.badge': 'Input',
        'predict.form.loading': 'Loading form fields...',
        'predict.form.submit': 'Predict Score',
        'predict.form.analyzing': 'Analyzing...',
        'predict.results.title': 'Prediction Results',
        'predict.results.badge': 'Output',
        'predict.results.ready': 'Ready for Analysis',
        'predict.results.readyDesc': 'Fill out the form and click "Predict Score"',
        'predict.results.processing': 'Processing...',
        'predict.results.analyzing': 'ML model analyzing data',
        'predict.results.predicted': 'predicted',
        'predict.results.modelVersion': 'Model Version',
        'predict.results.newPrediction': 'New Prediction',
        'predict.results.error': 'Something Went Wrong',
        'predict.results.errorDesc': 'Unable to get prediction.',
        'predict.results.retry': 'Try Again',
        
        // Score Reference
        'predict.ref.title': 'Score Categories',
        'predict.ref.excellent': 'Excellent',
        'predict.ref.good': 'Good',
        'predict.ref.average': 'Average',
        'predict.ref.belowAvg': 'Below Avg',
        'predict.ref.needsHelp': 'Needs Help',
        
        // Footer
        'footer.title': 'Student Score Predictor',
        'footer.tagline': 'A machine learning portfolio project • Docker + Render',
        'footer.dataset': 'Dataset',
        'footer.copyright': '© 2025 DonMaCuandoNoEscribe',
        
        // Interpretations
        'interp.excellent': 'Excellent! This student shows strong potential. Consider advanced opportunities.',
        'interp.good': 'Good performance. Targeted support could help reach excellence.',
        'interp.average': 'Meeting expectations. Additional study strategies recommended.',
        'interp.belowAverage': 'Early intervention recommended. Review study habits and attendance.',
        'interp.needsImprovement': 'Significant support needed. One-on-one tutoring recommended.'
    },
    es: {
        // Header
        'header.title': 'Predictor de Calificaciones',
        'header.badge': 'Proyecto de Portafolio',
        
        // Navigation
        'nav.about': 'Inicio',
        'nav.stack': 'Tech',
        'nav.deploy': 'Deploy',
        'nav.predict': 'Predecir',
        
        // Hero Section
        'hero.badge': 'Pipeline de Machine Learning End-to-End',
        'hero.title': 'Predice el Rendimiento Estudiantil con',
        'hero.title.gradient': 'Machine Learning',
        'hero.description': 'Una aplicación ML full-stack que ayuda a educadores a predecir calificaciones de exámenes basándose en hábitos de estudio, patrones de asistencia y factores ambientales. Construido como proyecto de portafolio demostrando prácticas modernas de MLOps con Docker y despliegue en la nube.',
        
        // Stats
        'stats.records': 'Registros de Entrenamiento',
        'stats.features': 'Características Seleccionadas',
        'stats.target': 'R² Objetivo',
        'stats.achieved': 'R² Logrado',
        
        // CTA Buttons
        'cta.predict': 'Probar Predicción',
        'cta.stack': 'Ver Tech Stack',
        
        // Goals
        'goals.title': 'Lo Que Estamos Construyendo',
        'goals.1.title': 'Intervención Temprana',
        'goals.1.desc': 'Identificar estudiantes en riesgo antes de los exámenes mediante análisis predictivo',
        'goals.2.title': 'Decisiones Basadas en Datos',
        'goals.2.desc': 'Empoderar educadores con información accionable para apoyo personalizado',
        'goals.3.title': 'Excelencia en MLOps',
        'goals.3.desc': 'Demostrar pipeline ML end-to-end con Docker y despliegue en la nube',
        
        // Stack Page
        'stack.title': 'Construido con Herramientas Modernas',
        'stack.subtitle': 'Arquitectura lista para producción desplegada en Render',
        
        // Architecture Cards
        'arch.ds.title': 'Ciencia de Datos',
        'arch.ds.desc': 'EDA, ingeniería de características, entrenamiento de modelos',
        'arch.api.title': 'API Backend',
        'arch.api.desc': 'Endpoints RESTful con FastAPI + Pydantic',
        'arch.ui.title': 'UI Frontend',
        'arch.ui.desc': 'Formularios dinámicos, predicciones en tiempo real',
        'arch.deploy.title': 'Despliegue',
        'arch.deploy.desc': 'Contenedor Docker en Render',
        'arch.deploy.tag': 'Tier Gratuito',
        
        // Deploy Page
        'deploy.title': 'Despliegue en la Nube',
        'deploy.subtitle': 'Desplegado en Render con contenedorización Docker',
        'deploy.card1.title': 'Hosting Gratuito',
        'deploy.card1.desc': 'Despliegue en tier gratuito de Render',
        'deploy.card2.title': 'Docker SDK',
        'deploy.card2.desc': 'Control total con configuración Dockerfile personalizada',
        'deploy.card3.title': 'Auto Despliegue',
        'deploy.card3.desc': 'Git push activa reconstrucción automática del contenedor',
        'deploy.card4.title': 'Puerto 8000',
        'deploy.card4.desc': 'Puerto estándar 8000 para FastAPI',
        
        // Predict Page
        'predict.title': 'Hacer una Predicción',
        'predict.subtitle': 'Ingresa información del estudiante para predecir su calificación',
        'predict.form.title': 'Información del Estudiante',
        'predict.form.badge': 'Entrada',
        'predict.form.loading': 'Cargando campos del formulario...',
        'predict.form.submit': 'Predecir Calificación',
        'predict.form.analyzing': 'Analizando...',
        'predict.results.title': 'Resultados de Predicción',
        'predict.results.badge': 'Salida',
        'predict.results.ready': 'Listo para Análisis',
        'predict.results.readyDesc': 'Completa el formulario y haz clic en "Predecir Calificación"',
        'predict.results.processing': 'Procesando...',
        'predict.results.analyzing': 'Modelo ML analizando datos',
        'predict.results.predicted': 'predicho',
        'predict.results.modelVersion': 'Versión del Modelo',
        'predict.results.newPrediction': 'Nueva Predicción',
        'predict.results.error': 'Algo Salió Mal',
        'predict.results.errorDesc': 'No se pudo obtener la predicción.',
        'predict.results.retry': 'Intentar de Nuevo',
        
        // Score Reference
        'predict.ref.title': 'Categorías de Calificación',
        'predict.ref.excellent': 'Excelente',
        'predict.ref.good': 'Bueno',
        'predict.ref.average': 'Promedio',
        'predict.ref.belowAvg': 'Bajo Promedio',
        'predict.ref.needsHelp': 'Necesita Ayuda',
        
        // Footer
        'footer.title': 'Predictor de Calificaciones',
        'footer.tagline': 'Un proyecto de portafolio de machine learning • Docker + Render',
        'footer.dataset': 'Dataset',
        'footer.copyright': '© 2025 Proyecto de Portafolio',
        
        // Interpretations
        'interp.excellent': '¡Excelente! Este estudiante muestra gran potencial. Considere oportunidades avanzadas.',
        'interp.good': 'Buen rendimiento. El apoyo dirigido podría ayudar a alcanzar la excelencia.',
        'interp.average': 'Cumple expectativas. Se recomiendan estrategias de estudio adicionales.',
        'interp.belowAverage': 'Se recomienda intervención temprana. Revise hábitos de estudio y asistencia.',
        'interp.needsImprovement': 'Se necesita apoyo significativo. Se recomienda tutoría individual.'
    }
};

// Current language state
let currentLang = localStorage.getItem('lang') || 'en';

// Configuration
const CONFIG = {
    // Use relative URL - works both locally and when deployed (backend serves frontend)
    API_BASE_URL: '',
    ENDPOINTS: {
        HEALTH: '/health',
        SCHEMA: '/features/schema',
        PREDICT: '/predict'
    }
};

// State
const state = {
    schema: null,
    isLoading: false,
    serverOnline: false,
    currentPage: 'about'
};

// DOM Elements
const elements = {
    pillNav: document.getElementById('pillNav'),
    pillSlider: document.getElementById('pillSlider'),
    serverStatus: document.getElementById('serverStatus'),
    formFields: document.getElementById('formFields'),
    predictionForm: document.getElementById('predictionForm'),
    submitBtn: document.getElementById('submitBtn'),
    resultsInitial: document.getElementById('resultsInitial'),
    resultsLoading: document.getElementById('resultsLoading'),
    resultsSuccess: document.getElementById('resultsSuccess'),
    resultsError: document.getElementById('resultsError'),
    scoreRing: document.getElementById('scoreRing'),
    scoreNumber: document.getElementById('scoreNumber'),
    scoreBadge: document.getElementById('scoreBadge'),
    badgeText: document.getElementById('badgeText'),
    modelVersion: document.getElementById('modelVersion'),
    scoreInterpretation: document.getElementById('scoreInterpretation'),
    errorMessage: document.getElementById('errorMessage'),
    resetBtn: document.getElementById('resetBtn'),
    retryBtn: document.getElementById('retryBtn')
};

// =============================================================================
// PILL NAVIGATION - ReactBits Inspired
// =============================================================================

/**
 * Initialize pill navigation with sliding indicator
 */
function initPillNav() {
    const pillBtns = document.querySelectorAll('.pill-btn');
    
    // Set initial slider position
    updatePillSlider(document.querySelector('.pill-btn.active'));
    
    // Add click handlers
    pillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            navigateTo(page);
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const activeBtn = document.querySelector('.pill-btn.active');
        if (activeBtn) updatePillSlider(activeBtn);
    });
}

/**
 * Navigate to a page
 */
function navigateTo(pageName) {
    // Update state
    state.currentPage = pageName;
    
    // Update pill buttons
    document.querySelectorAll('.pill-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageName);
    });
    
    // Update slider
    const activeBtn = document.querySelector(`.pill-btn[data-page="${pageName}"]`);
    if (activeBtn) updatePillSlider(activeBtn);
    
    // Update pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Update pill slider position and size
 */
function updatePillSlider(activeBtn) {
    if (!activeBtn || !elements.pillSlider) return;
    
    const navRect = elements.pillNav.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    
    const left = btnRect.left - navRect.left;
    const width = btnRect.width;
    
    elements.pillSlider.style.left = `${left}px`;
    elements.pillSlider.style.width = `${width}px`;
}

// Make navigateTo globally accessible for onclick handlers
window.navigateTo = navigateTo;

// =============================================================================
// Language Functions
// =============================================================================

/**
 * Set the application language and update all translated elements
 */
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Recalculate pill slider position after text changes
    setTimeout(() => {
        const activeBtn = document.querySelector('.pill-btn.active');
        if (activeBtn) updatePillSlider(activeBtn);
    }, 10);
}

/**
 * Initialize language toggle
 */
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-btn')) {
            const lang = e.target.dataset.lang;
            setLanguage(lang);
        }
    });
    
    // Apply saved language on load
    setLanguage(currentLang);
}

// =============================================================================
// Utility Functions
// =============================================================================

function formatFeatureName(name) {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function getCategoryClass(category) {
    const categoryMap = {
        'Excellent': 'excellent',
        'Good': 'good',
        'Average': 'average',
        'Below Average': 'below-average',
        'Needs Improvement': 'needs-improvement'
    };
    return categoryMap[category] || 'average';
}

function getInterpretation(score, category) {
    const t = translations[currentLang];
    const categoryMap = {
        'Excellent': t['interp.excellent'],
        'Good': t['interp.good'],
        'Average': t['interp.average'],
        'Below Average': t['interp.belowAverage'],
        'Needs Improvement': t['interp.needsImprovement']
    };
    const interpretation = categoryMap[category] || '';
    const predictedLabel = currentLang === 'es' ? 'Predicción' : 'Predicted';
    return `${predictedLabel} <strong>${score}</strong> — ${interpretation}`;
}

function calculateRingOffset(score) {
    const circumference = 534; // 2 * π * 85
    const percentage = Math.min(Math.max(score, 0), 100) / 100;
    return circumference * (1 - percentage);
}

function getRingColor(score) {
    if (score >= 90) return 'var(--excellent)';
    if (score >= 80) return 'var(--good)';
    if (score >= 70) return 'var(--average)';
    if (score >= 60) return 'var(--below-average)';
    return 'var(--needs-improvement)';
}

// =============================================================================
// API Functions
// =============================================================================

async function checkServerHealth() {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.HEALTH}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            const data = await response.json();
            state.serverOnline = data.model_loaded === true;
            updateServerStatus(true, data.model_version);
            return true;
        }
    } catch (error) {
        console.warn('Server health check failed:', error.message);
    }
    
    state.serverOnline = false;
    updateServerStatus(false);
    return false;
}

async function fetchSchema() {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.SCHEMA}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        state.schema = data;
        return data;
    } catch (error) {
        console.error('Failed to fetch schema:', error);
        throw error;
    }
}

async function submitPrediction(features) {
    const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.PREDICT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ features })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        const errorMsg = data.message || data.error || 'Prediction failed';
        throw new Error(errorMsg);
    }
    
    return data;
}

// =============================================================================
// UI Functions
// =============================================================================

function updateServerStatus(online, version = null) {
    const statusText = elements.serverStatus.querySelector('.status-text');
    
    if (online) {
        elements.serverStatus.classList.add('online');
        elements.serverStatus.classList.remove('offline');
        statusText.textContent = version ? `v${version}` : 'Online';
    } else {
        elements.serverStatus.classList.add('offline');
        elements.serverStatus.classList.remove('online');
        statusText.textContent = 'Offline';
    }
}

function showResultsState(stateName) {
    const states = ['Initial', 'Loading', 'Success', 'Error'];
    states.forEach(s => {
        const element = elements[`results${s}`];
        if (element) {
            element.classList.toggle('active', s.toLowerCase() === stateName.toLowerCase());
        }
    });
}

function displayResults(data) {
    const { predicted_score, score_category, model_version } = data;
    const score = Math.round(predicted_score * 10) / 10;
    
    elements.scoreRing.style.strokeDashoffset = calculateRingOffset(score);
    elements.scoreRing.style.stroke = getRingColor(score);
    
    animateNumber(elements.scoreNumber, 0, score, 1200);
    
    const categoryClass = getCategoryClass(score_category);
    elements.scoreBadge.className = `score-badge ${categoryClass}`;
    elements.badgeText.textContent = score_category;
    
    elements.modelVersion.textContent = model_version || '1.0.0';
    elements.scoreInterpretation.innerHTML = getInterpretation(score, score_category);
    
    showResultsState('success');
}

function displayError(message) {
    elements.errorMessage.textContent = message;
    showResultsState('error');
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (difference * eased);
        
        element.textContent = Math.round(current * 10) / 10;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// =============================================================================
// Form Functions
// =============================================================================

function buildFormFields(schema) {
    const { numerical_features = [], categorical_features = [] } = schema;
    
    let html = '';
    
    numerical_features.forEach((feature) => {
        const { name, min, max, type } = feature;
        const step = type === 'float' ? 'any' : '1';
        
        html += `
            <div class="form-group">
                <label for="${name}">
                    ${formatFeatureName(name)}
                    <span class="field-type">${type === 'float' ? 'decimal' : 'int'}</span>
                </label>
                <input 
                    type="number" 
                    id="${name}" 
                    name="${name}" 
                    min="${min}" 
                    max="${max}" 
                    step="${step}"
                    placeholder="${min} - ${max}"
                    required
                >
                <span class="form-hint">Range: ${min} - ${max}</span>
            </div>
        `;
    });
    
    categorical_features.forEach((feature) => {
        const { name, options } = feature;
        
        let optionsHtml = `<option value="" disabled selected>Select...</option>`;
        options.forEach(option => {
            optionsHtml += `<option value="${option}">${option}</option>`;
        });
        
        html += `
            <div class="form-group">
                <label for="${name}">
                    ${formatFeatureName(name)}
                    <span class="field-type">select</span>
                </label>
                <select id="${name}" name="${name}" required>
                    ${optionsHtml}
                </select>
            </div>
        `;
    });
    
    return html;
}

function showFallbackForm() {
    const demoSchema = {
        numerical_features: [
            { name: 'hours_studied', type: 'float', min: 0, max: 24 },
            { name: 'attendance', type: 'float', min: 0, max: 100 },
            { name: 'previous_scores', type: 'float', min: 0, max: 100 },
            { name: 'sleep_hours', type: 'float', min: 0, max: 12 },
            { name: 'tutoring_sessions', type: 'int', min: 0, max: 10 }
        ],
        categorical_features: [
            { name: 'parental_involvement', type: 'string', options: ['Low', 'Medium', 'High'] },
            { name: 'motivation_level', type: 'string', options: ['Low', 'Medium', 'High'] },
            { name: 'school_type', type: 'string', options: ['Public', 'Private'] },
            { name: 'access_to_resources', type: 'string', options: ['Low', 'Medium', 'High'] },
            { name: 'extracurricular_activities', type: 'string', options: ['Yes', 'No'] }
        ]
    };
    
    state.schema = demoSchema;
    elements.formFields.innerHTML = buildFormFields(demoSchema);
    elements.submitBtn.disabled = true;
    
    const notice = document.createElement('div');
    notice.className = 'form-notice';
    notice.innerHTML = `<p>⚠️ Backend offline. Form shown for preview only.</p>`;
    elements.formFields.insertAdjacentElement('beforebegin', notice);
}

function collectFormData() {
    const formData = new FormData(elements.predictionForm);
    const features = {};
    
    if (!state.schema) return features;
    
    state.schema.numerical_features?.forEach(feature => {
        const value = formData.get(feature.name);
        if (value !== null && value !== '') {
            features[feature.name] = parseFloat(value);
        }
    });
    
    state.schema.categorical_features?.forEach(feature => {
        const value = formData.get(feature.name);
        if (value !== null && value !== '') {
            features[feature.name] = value;
        }
    });
    
    return features;
}

async function handleSubmit(event) {
    event.preventDefault();
    
    if (state.isLoading || !state.serverOnline) return;
    
    state.isLoading = true;
    elements.submitBtn.classList.add('loading');
    elements.submitBtn.disabled = true;
    showResultsState('loading');
    
    try {
        const features = collectFormData();
        const result = await submitPrediction(features);
        displayResults(result);
    } catch (error) {
        console.error('Prediction error:', error);
        displayError(error.message || 'Unable to get prediction.');
    } finally {
        state.isLoading = false;
        elements.submitBtn.classList.remove('loading');
        elements.submitBtn.disabled = false;
    }
}

function resetForm() {
    elements.predictionForm.reset();
    elements.scoreRing.style.strokeDashoffset = 534;
    elements.scoreNumber.textContent = '--';
    showResultsState('initial');
}

// =============================================================================
// Initialization
// =============================================================================

async function init() {
    console.log('Student Score Predictor v2.0');
    
    // Initialize language toggle
    initLanguageToggle();
    
    // Initialize pill navigation
    initPillNav();
    
    // Set up form event listeners
    elements.predictionForm.addEventListener('submit', handleSubmit);
    elements.resetBtn.addEventListener('click', resetForm);
    elements.retryBtn.addEventListener('click', () => showResultsState('initial'));
    
    // Check server health
    const serverOnline = await checkServerHealth();
    
    if (serverOnline) {
        try {
            const schema = await fetchSchema();
            elements.formFields.innerHTML = buildFormFields(schema);
            elements.submitBtn.disabled = false;
        } catch (error) {
            console.error('Failed to load schema:', error);
            showFallbackForm();
        }
    } else {
        showFallbackForm();
    }
    
    // Periodic health checks
    setInterval(async () => {
        const wasOnline = state.serverOnline;
        await checkServerHealth();
        
        if (!wasOnline && state.serverOnline && !elements.formFields.querySelector('.form-group')) {
            try {
                const schema = await fetchSchema();
                const notice = document.querySelector('.form-notice');
                if (notice) notice.remove();
                
                elements.formFields.innerHTML = buildFormFields(schema);
                elements.submitBtn.disabled = false;
            } catch (error) {
                console.error('Failed to load schema on reconnect:', error);
            }
        }
    }, 30000);
}

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
