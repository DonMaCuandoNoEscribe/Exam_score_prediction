/**
 * Student Score Predictor - Frontend Application
 * Handles pill navigation, dynamic form generation, API communication, and results
 */

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
    const interpretations = {
        'Excellent': `Predicted <strong>${score}</strong> — Excellent! This student shows strong potential. Consider advanced opportunities.`,
        'Good': `Predicted <strong>${score}</strong> — Good performance. Targeted support could help reach excellence.`,
        'Average': `Predicted <strong>${score}</strong> — Meeting expectations. Additional study strategies recommended.`,
        'Below Average': `Predicted <strong>${score}</strong> — Early intervention recommended. Review study habits and attendance.`,
        'Needs Improvement': `Predicted <strong>${score}</strong> — Significant support needed. One-on-one tutoring recommended.`
    };
    return interpretations[category] || `Predicted score: ${score}`;
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
    console.log('🎓 Student Score Predictor v2.0');
    
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
