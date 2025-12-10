/**
 * Student Score Predictor - Frontend Application
 * Handles dynamic form generation, API communication, and result display
 */

// Configuration
const CONFIG = {
    API_BASE_URL: 'http://localhost:8000',
    ENDPOINTS: {
        HEALTH: '/health',
        SCHEMA: '/features/schema',
        PREDICT: '/predict'
    }
};

// State Management
const state = {
    schema: null,
    isLoading: false,
    serverOnline: false
};

// DOM Elements
const elements = {
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
// Utility Functions
// =============================================================================

/**
 * Format feature name for display (snake_case to Title Case)
 */
function formatFeatureName(name) {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Get color for score category
 */
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

/**
 * Get interpretation text based on score category
 */
function getInterpretation(score, category) {
    const interpretations = {
        'Excellent': `This student is predicted to achieve an <strong>excellent score of ${score}</strong>. They demonstrate strong potential and are likely excelling in their study habits, attendance, and engagement. Consider providing advanced learning opportunities or leadership roles.`,
        'Good': `This student is predicted to achieve a <strong>good score of ${score}</strong>. They are performing above average and showing solid academic progress. Encouragement and targeted support in specific areas could help them reach the excellent tier.`,
        'Average': `This student is predicted to achieve an <strong>average score of ${score}</strong>. They are meeting baseline expectations. Consider implementing additional study strategies, tutoring sessions, or engagement activities to boost performance.`,
        'Below Average': `This student is predicted to achieve a <strong>below average score of ${score}</strong>. Early intervention is recommended. Review their study habits, attendance patterns, and consider personalized support to address any learning gaps.`,
        'Needs Improvement': `This student is predicted to achieve a <strong>score of ${score}</strong>, indicating they need significant support. Immediate intervention is strongly recommended, including one-on-one tutoring, parental involvement, and identifying any underlying challenges affecting performance.`
    };
    return interpretations[category] || `Predicted score: ${score}`;
}

/**
 * Calculate the stroke-dashoffset for the score ring
 */
function calculateRingOffset(score) {
    const circumference = 534; // 2 * π * 85
    const percentage = Math.min(Math.max(score, 0), 100) / 100;
    return circumference * (1 - percentage);
}

/**
 * Get ring color based on score
 */
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

/**
 * Check server health status
 */
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

/**
 * Fetch feature schema from API
 */
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

/**
 * Submit prediction request
 */
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
// UI Update Functions
// =============================================================================

/**
 * Update server status indicator
 */
function updateServerStatus(online, version = null) {
    const statusText = elements.serverStatus.querySelector('.status-text');
    
    if (online) {
        elements.serverStatus.classList.add('online');
        elements.serverStatus.classList.remove('offline');
        statusText.textContent = version ? `Model v${version}` : 'Online';
    } else {
        elements.serverStatus.classList.add('offline');
        elements.serverStatus.classList.remove('online');
        statusText.textContent = 'Offline';
    }
}

/**
 * Show specific results state
 */
function showResultsState(stateName) {
    const states = ['Initial', 'Loading', 'Success', 'Error'];
    states.forEach(s => {
        const element = elements[`results${s}`];
        if (element) {
            element.classList.toggle('active', s.toLowerCase() === stateName.toLowerCase());
        }
    });
}

/**
 * Display prediction results
 */
function displayResults(data) {
    const { predicted_score, score_category, model_version } = data;
    const score = Math.round(predicted_score * 10) / 10;
    
    // Update score ring
    elements.scoreRing.style.strokeDashoffset = calculateRingOffset(score);
    elements.scoreRing.style.stroke = getRingColor(score);
    
    // Animate score number
    animateNumber(elements.scoreNumber, 0, score, 1500);
    
    // Update badge
    const categoryClass = getCategoryClass(score_category);
    elements.scoreBadge.className = `score-badge ${categoryClass}`;
    elements.badgeText.textContent = score_category;
    
    // Update details
    elements.modelVersion.textContent = model_version || '1.0.0';
    elements.scoreInterpretation.innerHTML = getInterpretation(score, score_category);
    
    // Show success state
    showResultsState('success');
}

/**
 * Display error message
 */
function displayError(message) {
    elements.errorMessage.textContent = message;
    showResultsState('error');
}

/**
 * Animate number counter
 */
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
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
// Form Generation
// =============================================================================

/**
 * Build form fields from schema
 */
function buildFormFields(schema) {
    const { numerical_features = [], categorical_features = [] } = schema;
    
    let html = '';
    
    // Build numerical fields
    numerical_features.forEach((feature, index) => {
        const { name, min, max, type } = feature;
        const step = type === 'float' ? '0.1' : '1';
        
        html += `
            <div class="form-group" style="animation-delay: ${index * 50}ms">
                <label for="${name}">
                    ${formatFeatureName(name)}
                    <span class="field-type">${type === 'float' ? 'Decimal' : 'Number'}</span>
                </label>
                <input 
                    type="number" 
                    id="${name}" 
                    name="${name}" 
                    min="${min}" 
                    max="${max}" 
                    step="${step}"
                    placeholder="Enter ${formatFeatureName(name).toLowerCase()}"
                    required
                >
                <span class="form-hint">Range: ${min} - ${max}</span>
            </div>
        `;
    });
    
    // Build categorical fields
    categorical_features.forEach((feature, index) => {
        const { name, options } = feature;
        const delay = (numerical_features.length + index) * 50;
        
        let optionsHtml = `<option value="" disabled selected>Select ${formatFeatureName(name).toLowerCase()}</option>`;
        options.forEach(option => {
            optionsHtml += `<option value="${option}">${option}</option>`;
        });
        
        html += `
            <div class="form-group" style="animation-delay: ${delay}ms">
                <label for="${name}">
                    ${formatFeatureName(name)}
                    <span class="field-type">Selection</span>
                </label>
                <select id="${name}" name="${name}" required>
                    ${optionsHtml}
                </select>
            </div>
        `;
    });
    
    return html;
}

/**
 * Show fallback form when API is unavailable
 */
function showFallbackForm() {
    // Demo schema based on the project's expected features
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
    
    // Add notice that server is offline
    const notice = document.createElement('div');
    notice.className = 'form-notice';
    notice.innerHTML = `
        <p>⚠️ Backend server is offline. Form is displayed for preview only.</p>
    `;
    elements.formFields.insertAdjacentElement('beforebegin', notice);
}

// =============================================================================
// Form Handling
// =============================================================================

/**
 * Collect form data
 */
function collectFormData() {
    const formData = new FormData(elements.predictionForm);
    const features = {};
    
    if (!state.schema) return features;
    
    // Process numerical features
    state.schema.numerical_features?.forEach(feature => {
        const value = formData.get(feature.name);
        if (value !== null && value !== '') {
            features[feature.name] = parseFloat(value);
        }
    });
    
    // Process categorical features
    state.schema.categorical_features?.forEach(feature => {
        const value = formData.get(feature.name);
        if (value !== null && value !== '') {
            features[feature.name] = value;
        }
    });
    
    return features;
}

/**
 * Handle form submission
 */
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
        displayError(error.message || 'Unable to get prediction. Please try again.');
    } finally {
        state.isLoading = false;
        elements.submitBtn.classList.remove('loading');
        elements.submitBtn.disabled = false;
    }
}

/**
 * Reset form and results
 */
function resetForm() {
    elements.predictionForm.reset();
    elements.scoreRing.style.strokeDashoffset = 534;
    elements.scoreNumber.textContent = '--';
    showResultsState('initial');
}

// =============================================================================
// Initialization
// =============================================================================

/**
 * Initialize the application
 */
async function init() {
    console.log('🎓 Student Score Predictor initialized');
    
    // Set up event listeners
    elements.predictionForm.addEventListener('submit', handleSubmit);
    elements.resetBtn.addEventListener('click', resetForm);
    elements.retryBtn.addEventListener('click', () => {
        showResultsState('initial');
    });
    
    // Check server health
    const serverOnline = await checkServerHealth();
    
    if (serverOnline) {
        try {
            // Fetch schema and build form
            const schema = await fetchSchema();
            elements.formFields.innerHTML = buildFormFields(schema);
            elements.submitBtn.disabled = false;
        } catch (error) {
            console.error('Failed to load schema:', error);
            showFallbackForm();
        }
    } else {
        // Show fallback form for demo/preview
        showFallbackForm();
    }
    
    // Periodic health checks
    setInterval(async () => {
        const wasOnline = state.serverOnline;
        await checkServerHealth();
        
        // If server came online, try to load schema
        if (!wasOnline && state.serverOnline && !elements.formFields.querySelector('.form-group')) {
            try {
                const schema = await fetchSchema();
                // Remove any notice
                const notice = document.querySelector('.form-notice');
                if (notice) notice.remove();
                
                elements.formFields.innerHTML = buildFormFields(schema);
                elements.submitBtn.disabled = false;
            } catch (error) {
                console.error('Failed to load schema on reconnect:', error);
            }
        }
    }, 30000); // Check every 30 seconds
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

