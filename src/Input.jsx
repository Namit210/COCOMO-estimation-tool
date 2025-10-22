import { useState } from 'react';
import './Input.css';

function Input() {
    const [kloc, setKloc] = useState('');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [d, setD] = useState('');
    const [mode, setMode] = useState('organic');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Cost driver states
    const [effortMultiplier, setEffortMultiplier] = useState('');
    const [costDrivers, setCostDrivers] = useState([{ key: '', value: '' }]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            // Prepare the payload
            const payload = {
                model_type: mode,
                kloc: parseFloat(kloc),
                cost_drivers: {},
            };

            // Handle cost drivers based on mode
            if (mode === 'semi-detached' && effortMultiplier) {
                payload.cost_drivers = { "cost_driver": parseFloat(effortMultiplier) };
            } else if (mode === 'embedded') {
                // Build cost_drivers object from key-value pairs
                const costDriverObj = {};
                costDrivers.forEach(driver => {
                    if (driver.key && driver.value) {
                        costDriverObj[driver.key] = parseFloat(driver.value);
                    }
                });
                payload.cost_drivers = costDriverObj;
            }

            // Add coefficients if provided
            if (a) payload.a = parseFloat(a);
            if (b) payload.b = parseFloat(b);
            if (c) payload.c = parseFloat(c);
            if (d) payload.d = parseFloat(d);

            // Call the API
            const response = await fetch('http://localhost:5000/estimate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            
            // Calculate team size from effort and development time
            const people = data.effort_person_months / data.development_time_months;
            setResults({
                effort: data.effort_person_months.toFixed(2),
                time: data.development_time_months.toFixed(2),
                people: people.toFixed(2)
            });
        } catch (err) {
            setError(err.message || 'Failed to calculate. Please check if the API is running.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cocomo-container">
            <div className="container-fluid h-100">
                <div className="row h-100 g-0">
                    {/* Left Panel - Input Form */}
                    <div className="col-lg-6 input-panel">
                        <div className="panel-content">
                            <div className="panel-header">
                                <h2 className="panel-title">
                                    <span className="icon">📊</span>
                                    COCOMO Calculator
                                </h2>
                                <p className="panel-subtitle">Constructive Cost Model</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="cocomo-form">
                                {/* KLOC Input */}
                                <div className="form-group-custom">
                                    <label htmlFor="kloc" className="custom-label">
                                        📝 KLOC (Thousand Lines of Code)
                                    </label>
                                    <input
                                        type="number"
                                        className="custom-input"
                                        id="kloc"
                                        value={kloc}
                                        onChange={(e) => setKloc(e.target.value)}
                                        placeholder="e.g., 10"
                                        required
                                        step="0.01"
                                        min="0"
                                    />
                                </div>

                                {/* Coefficients in 2x2 Grid */}
                                <div className="coefficients-grid">
                                    <div className="form-group-custom">
                                        <label htmlFor="a" className="custom-label">Coefficient a</label>
                                        <input
                                            type="number"
                                            className="custom-input"
                                            id="a"
                                            value={a}
                                            onChange={(e) => setA(e.target.value)}
                                            placeholder="2.4"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="form-group-custom">
                                        <label htmlFor="b" className="custom-label">Coefficient b</label>
                                        <input
                                            type="number"
                                            className="custom-input"
                                            id="b"
                                            value={b}
                                            onChange={(e) => setB(e.target.value)}
                                            placeholder="1.05"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="form-group-custom">
                                        <label htmlFor="c" className="custom-label">Coefficient c</label>
                                        <input
                                            type="number"
                                            className="custom-input"
                                            id="c"
                                            value={c}
                                            onChange={(e) => setC(e.target.value)}
                                            placeholder="2.5"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="form-group-custom">
                                        <label htmlFor="d" className="custom-label">Coefficient d</label>
                                        <input
                                            type="number"
                                            className="custom-input"
                                            id="d"
                                            value={d}
                                            onChange={(e) => setD(e.target.value)}
                                            placeholder="0.38"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                {/* Mode Selection */}
                                <div className="mode-selection">
                                    <label className="custom-label mb-2">🎯 Project Mode</label>
                                    <div className="mode-options">
                                        <label className={`mode-card ${mode === 'organic' ? 'active' : ''}`}>
                                            <input
                                                type="radio"
                                                name="mode"
                                                value="organic"
                                                checked={mode === 'organic'}
                                                onChange={(e) => setMode(e.target.value)}
                                            />
                                            <span className="mode-content">
                                                <span className="mode-icon">🟢</span>
                                                <span className="mode-name">Organic</span>
                                            </span>
                                        </label>
                                        <label className={`mode-card ${mode === 'semi-detached' ? 'active' : ''}`}>
                                            <input
                                                type="radio"
                                                name="mode"
                                                value="semi-detached"
                                                checked={mode === 'semi-detached'}
                                                onChange={(e) => setMode(e.target.value)}
                                            />
                                            <span className="mode-content">
                                                <span className="mode-icon">🟡</span>
                                                <span className="mode-name">Semi-Detached</span>
                                            </span>
                                        </label>
                                        <label className={`mode-card ${mode === 'embedded' ? 'active' : ''}`}>
                                            <input
                                                type="radio"
                                                name="mode"
                                                value="embedded"
                                                checked={mode === 'embedded'}
                                                onChange={(e) => setMode(e.target.value)}
                                            />
                                            <span className="mode-content">
                                                <span className="mode-icon">🔴</span>
                                                <span className="mode-name">Embedded</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Cost Drivers - Semi-Detached & Embedded */}
                                {(mode === 'semi-detached' || mode === 'embedded') && (
                                    <>
                                        {/* Effort Multiplier for Semi-Detached */}
                                        {mode === 'semi-detached' && (
                                            <div className="form-group-custom">
                                                <label htmlFor="effortMultiplier" className="custom-label">
                                                    ⚙️ Effort Multiplier
                                                </label>
                                                <input
                                                    type="number"
                                                    className="custom-input"
                                                    id="effortMultiplier"
                                                    value={effortMultiplier}
                                                    onChange={(e) => setEffortMultiplier(e.target.value)}
                                                    placeholder="e.g., 1.2"
                                                    step="0.01"
                                                />
                                            </div>
                                        )}

                                        {/* Multiple Cost Drivers for Embedded */}
                                        {mode === 'embedded' && (
                                            <div className="cost-drivers-section">
                                                <label className="custom-label mb-2">⚙️ Cost Drivers</label>
                                                {costDrivers.map((driver, index) => (
                                                    <div key={index} className="cost-driver-row">
                                                        <input
                                                            type="text"
                                                            className="custom-input"
                                                            placeholder="Driver name"
                                                            value={driver.key}
                                                            onChange={(e) => {
                                                                const newDrivers = [...costDrivers];
                                                                newDrivers[index].key = e.target.value;
                                                                setCostDrivers(newDrivers);
                                                            }}
                                                        />
                                                        <input
                                                            type="number"
                                                            className="custom-input"
                                                            placeholder="Value"
                                                            value={driver.value}
                                                            step="0.01"
                                                            onChange={(e) => {
                                                                const newDrivers = [...costDrivers];
                                                                newDrivers[index].value = e.target.value;
                                                                setCostDrivers(newDrivers);
                                                            }}
                                                        />
                                                        {costDrivers.length > 1 && (
                                                            <button
                                                                type="button"
                                                                className="btn-remove"
                                                                onClick={() => {
                                                                    const newDrivers = costDrivers.filter((_, i) => i !== index);
                                                                    setCostDrivers(newDrivers);
                                                                }}
                                                            >
                                                                ✕
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="btn-add-driver"
                                                    onClick={() => setCostDrivers([...costDrivers, { key: '', value: '' }])}
                                                >
                                                    + Add Cost Driver
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Error Message */}
                                {error && (
                                    <div className="alert alert-danger" role="alert" style={{ fontSize: '0.85rem', padding: '0.5rem', marginTop: '0.5rem' }}>
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button type="submit" className="calculate-btn" disabled={loading}>
                                    <span>{loading ? 'Calculating...' : 'Calculate Results'}</span>
                                    {!loading && <span className="btn-icon">→</span>}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Panel - Output Results */}
                    <div className="col-lg-6 output-panel">
                        <div className="panel-content">
                            <div className="panel-header">
                                <h2 className="panel-title">
                                    <span className="icon">📈</span>
                                    Results
                                </h2>
                                {/* <p className="panel-subtitle">Estimation Metrics</p> */}
                            </div>

                            {results ? (
                                <div className="results-container">
                                    <div className="result-card">
                                        <div className="result-icon">⏱️</div>
                                        <div className="result-content">
                                            <div className="result-label">Development Time</div>
                                            <div className="result-value">{results.time}</div>
                                            <div className="result-unit">Months</div>
                                        </div>
                                    </div>

                                    <div className="result-card">
                                        <div className="result-icon">💼</div>
                                        <div className="result-content">
                                            <div className="result-label">Effort Required</div>
                                            <div className="result-value">{results.effort}</div>
                                            <div className="result-unit">Person-Months</div>
                                        </div>
                                    </div>

                                    <div className="result-card">
                                        <div className="result-icon">👥</div>
                                        <div className="result-content">
                                            <div className="result-label">Team Size</div>
                                            <div className="result-value">{results.people}</div>
                                            <div className="result-unit">Average People</div>
                                        </div>
                                    </div>

                                    <div className="formula-info">
                                        <h3>📐 Calculation Details</h3>
                                        <div className="formula">
                                            <strong>Model Type:</strong> {mode}
                                        </div>
                                        <div className="formula">
                                            <strong>KLOC:</strong> {kloc}
                                        </div>
                                        {(a || b || c || d) && (
                                            <div className="formula">
                                                <strong>Coefficients:</strong> a={a || 'default'}, b={b || 'default'}, c={c || 'default'}, d={d || 'default'}
                                            </div>
                                        )}
                                        {mode === 'semi-detached' && effortMultiplier && (
                                            <div className="formula">
                                                <strong>Cost Driver:</strong> Effort Multiplier = {effortMultiplier}
                                            </div>
                                        )}
                                        {mode === 'embedded' && costDrivers.some(d => d.key && d.value) && (
                                            <div className="formula">
                                                <strong>Cost Drivers:</strong>
                                                <div style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
                                                    {costDrivers
                                                        .filter(d => d.key && d.value)
                                                        .map((driver, idx) => (
                                                            <div key={idx} style={{ fontSize: '0.85em' }}>
                                                                • {driver.key}: {driver.value}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )}
                                        <div className="formula">
                                            <strong>Team Size:</strong> {results.effort} ÷ {results.time} = {results.people} People
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-results">
                                    <div className="no-results-icon">🎯</div>
                                    <h3>Ready to Calculate</h3>
                                    <p>Fill in the form on the left and click "Calculate Results" to see your project estimates.</p>
                                    <div className="tips">
                                        <h4>💡 Quick Tips:</h4>
                                        <ul>
                                            <li>KLOC = Lines of code ÷ 1000</li>
                                            <li>Choose the mode that matches your project type</li>
                                            <li>Standard coefficients vary by mode</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Input;
