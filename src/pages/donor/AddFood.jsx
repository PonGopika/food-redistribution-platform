import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodContext } from '../../context/FoodContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import '../../styles/AddFood.css';

function AddFood() {
  const navigate = useNavigate();
  const { addFood } = useContext(FoodContext);
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // Basic Info
    name: '',
    category: '',
    quantity: '',
    unit: 'kg',
    servings: '',

    // Time & Safety
    preparedAt: '',
    bestBefore: '',

    // Details
    description: '',
    allergens: [],
    dietaryType: 'veg',
    handlingInstructions: '',

    // Storage
    containerType: 'disposable',
    refrigerationRequired: false,
    temperature: '',

    // Image
    image: null,
    imagePreview: '',

    // Hygiene Checklist
    hygieneChecklist: {
      handWashing: false,
      cleanContainers: false,
      properTemperature: false,
      noContamination: false,
      labeledCorrectly: false
    }
  });

  const categories = [
    { value: 'cooked', label: '🍲 Cooked Food', desc: 'Ready-to-eat meals' },
    { value: 'raw', label: '🥬 Raw Vegetables', desc: 'Fresh produce' },
    { value: 'bakery', label: '🍞 Bakery Items', desc: 'Bread, pastries' },
    { value: 'dairy', label: '🥛 Dairy', desc: 'Milk, cheese, yogurt' },
    { value: 'fruits', label: '🍎 Fruits', desc: 'Fresh fruits' },
    { value: 'packaged', label: '📦 Packaged Food', desc: 'Sealed items' },
    { value: 'beverages', label: '🥤 Beverages', desc: 'Drinks, juices' }
  ];

  const allergenOptions = [
    { value: 'gluten', label: '🌾 Gluten' },
    { value: 'dairy', label: '🥛 Dairy' },
    { value: 'nuts', label: '🥜 Nuts' },
    { value: 'eggs', label: '🥚 Eggs' },
    { value: 'soy', label: '🫘 Soy' },
    { value: 'shellfish', label: '🦐 Shellfish' },
    { value: 'fish', label: '🐟 Fish' },
    { value: 'sesame', label: '🌱 Sesame' }
  ];

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAllergenToggle = (allergen) => {
    setForm(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const handleHygieneChange = (field) => {
    setForm(prev => ({
      ...prev,
      hygieneChecklist: {
        ...prev.hygieneChecklist,
        [field]: !prev.hygieneChecklist[field]
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const isHygieneComplete = Object.values(form.hygieneChecklist).every(v => v);

  const handleSubmit = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    addFood({
      ...form,
      donorId: user?.id,
      donorName: user?.organizationName || user?.name,
      location: { lat: 13.0827, lng: 80.2707 }, // Mock location
    });

    setLoading(false);
    navigate('/donor/status');
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Add Surplus Food</h1>
          <p className="dashboard-subtitle">List your surplus food to help those in need</p>
        </div>

        {/* Progress Steps */}
        <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {['Food Details', 'Safety & Time', 'Hygiene Check', 'Review'].map((label, idx) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: step > idx + 1 ? 'var(--success-500)' : step === idx + 1 ? 'var(--primary-500)' : 'var(--gray-200)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  {step > idx + 1 ? '✓' : idx + 1}
                </div>
                <span style={{ fontSize: 'var(--font-size-sm)', color: step === idx + 1 ? 'var(--gray-800)' : 'var(--gray-400)' }}>
                  {label}
                </span>
                {idx < 3 && <div style={{ width: '40px', height: '2px', background: step > idx + 1 ? 'var(--success-500)' : 'var(--gray-200)', margin: '0 var(--space-2)' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Food Details */}
        {step === 1 && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>🍲 Food Details</h3>

            <div className="form-group">
              <label className="form-label">Food Name *</label>
              <input
                type="text"
                className="form-input"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Vegetable Biryani, Fresh Bread"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--space-2)' }}>
                {categories.map(cat => (
                  <label
                    key={cat.value}
                    style={{
                      padding: 'var(--space-3)',
                      border: '2px solid',
                      borderColor: form.category === cat.value ? 'var(--primary-500)' : 'var(--gray-200)',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      background: form.category === cat.value ? 'var(--primary-50)' : 'white',
                      transition: 'all var(--transition-fast)',
                      textAlign: 'center'
                    }}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={form.category === cat.value}
                      onChange={(e) => handleChange('category', e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <div style={{ fontWeight: '500' }}>{cat.label}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>{cat.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  className="form-input"
                  value={form.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  placeholder="e.g., 10"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit</label>
                <select
                  className="form-select"
                  value={form.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                >
                  <option value="kg">Kilograms</option>
                  <option value="liters">Liters</option>
                  <option value="pieces">Pieces</option>
                  <option value="boxes">Boxes</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Servings</label>
                <input
                  type="number"
                  className="form-input"
                  value={form.servings}
                  onChange={(e) => handleChange('servings', e.target.value)}
                  placeholder="~50"
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Dietary Type *</label>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {[
                  { value: 'veg', label: '🥬 Vegetarian', color: 'var(--success-500)' },
                  { value: 'non-veg', label: '🍖 Non-Vegetarian', color: 'var(--danger-400)' },
                  { value: 'vegan', label: '🌱 Vegan', color: 'var(--primary-500)' }
                ].map(opt => (
                  <label
                    key={opt.value}
                    style={{
                      flex: 1,
                      padding: 'var(--space-3)',
                      border: '2px solid',
                      borderColor: form.dietaryType === opt.value ? opt.color : 'var(--gray-200)',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      background: form.dietaryType === opt.value ? `${opt.color}10` : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="dietaryType"
                      value={opt.value}
                      checked={form.dietaryType === opt.value}
                      onChange={(e) => handleChange('dietaryType', e.target.value)}
                      style={{ display: 'none' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Allergen Warnings</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {allergenOptions.map(a => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => handleAllergenToggle(a.value)}
                    className={`btn ${form.allergens.includes(a.value) ? 'btn-warning' : 'btn-secondary'} btn-sm`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the food (ingredients, preparation method, etc.)"
                rows={3}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary" onClick={() => navigate('/donor')}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => setStep(2)}
                disabled={!form.name || !form.category || !form.quantity}
              >
                Next: Safety & Time →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Safety & Time */}
        {step === 2 && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>⏱️ Safety Window & Storage</h3>

            <div className="alert alert-info" style={{ marginBottom: 'var(--space-4)' }}>
              <span className="alert-icon">💡</span>
              <div>Setting accurate times helps ensure food safety and builds trust with recipients.</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Time Prepared *</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={form.preparedAt}
                  onChange={(e) => handleChange('preparedAt', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Best Before *</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={form.bestBefore}
                  onChange={(e) => handleChange('bestBefore', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Container Type</label>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {[
                  { value: 'disposable', label: '📦 Disposable', desc: 'Single-use containers' },
                  { value: 'returnable', label: '♻️ Returnable', desc: 'Reusable containers' }
                ].map(opt => (
                  <label
                    key={opt.value}
                    style={{
                      flex: 1,
                      padding: 'var(--space-4)',
                      border: '2px solid',
                      borderColor: form.containerType === opt.value ? 'var(--primary-500)' : 'var(--gray-200)',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      background: form.containerType === opt.value ? 'var(--primary-50)' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="containerType"
                      value={opt.value}
                      checked={form.containerType === opt.value}
                      onChange={(e) => handleChange('containerType', e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <div style={{ fontWeight: '500' }}>{opt.label}</div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>{opt.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <label className="form-checkbox-group">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={form.refrigerationRequired}
                  onChange={(e) => handleChange('refrigerationRequired', e.target.checked)}
                />
                <span>🧊 Refrigeration Required</span>
              </label>

              {form.refrigerationRequired && (
                <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                  <input
                    type="text"
                    className="form-input"
                    value={form.temperature}
                    onChange={(e) => handleChange('temperature', e.target.value)}
                    placeholder="Current temp (e.g., 4°C)"
                    style={{ maxWidth: '200px' }}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Handling Instructions</label>
              <textarea
                className="form-textarea"
                value={form.handlingInstructions}
                onChange={(e) => handleChange('handlingInstructions', e.target.value)}
                placeholder="Any special handling or storage instructions..."
                rows={2}
              />
            </div>

            <div className="form-group">
              <label className="form-label">📷 Food Image (Optional)</label>
              {form.imagePreview ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={form.imagePreview}
                    alt="Food preview"
                    style={{ maxWidth: '200px', borderRadius: 'var(--radius-lg)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, image: null, imagePreview: '' }))}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--danger-500)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <div className="image-upload-icon">📸</div>
                  <p>Click to upload food image</p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-400)' }}>PNG, JPG up to 5MB</p>
                </label>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
              <button
                className="btn btn-primary"
                onClick={() => setStep(3)}
                disabled={!form.preparedAt || !form.bestBefore}
              >
                Next: Hygiene Check →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Hygiene Checklist */}
        {step === 3 && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>✅ Hygiene Checklist</h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
              Please confirm all safety measures have been followed
            </p>

            <div style={{
              background: 'var(--gray-50)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--space-6)'
            }}>
              {[
                { key: 'handWashing', label: 'Hands were washed before food handling', icon: '🧼' },
                { key: 'cleanContainers', label: 'Food is stored in clean, sanitized containers', icon: '📦' },
                { key: 'properTemperature', label: 'Food has been maintained at proper temperature', icon: '🌡️' },
                { key: 'noContamination', label: 'No cross-contamination has occurred', icon: '🚫' },
                { key: 'labeledCorrectly', label: 'Food is labeled with contents and date', icon: '🏷️' }
              ].map((item, idx) => (
                <label
                  key={item.key}
                  className="form-checkbox-group checklist-item"
                  style={{
                    padding: 'var(--space-4)',
                    borderBottom: idx < 4 ? '1px solid var(--gray-200)' : 'none'
                  }}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={form.hygieneChecklist[item.key]}
                    onChange={() => handleHygieneChange(item.key)}
                  />
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{
                    textDecoration: form.hygieneChecklist[item.key] ? 'line-through' : 'none',
                    color: form.hygieneChecklist[item.key] ? 'var(--gray-400)' : 'inherit'
                  }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            {!isHygieneComplete && (
              <div className="alert alert-warning" style={{ marginBottom: 'var(--space-4)' }}>
                <span className="alert-icon">⚠️</span>
                <div>Please complete all hygiene checks to proceed</div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
              <button className="btn btn-secondary" onClick={() => setStep(2)}>← Back</button>
              <button
                className="btn btn-primary"
                onClick={() => setStep(4)}
                disabled={!isHygieneComplete}
              >
                Next: Review →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>📋 Review Your Listing</h3>

            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>Food Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
                  <div><strong>Name:</strong> {form.name}</div>
                  <div><strong>Category:</strong> {categories.find(c => c.value === form.category)?.label}</div>
                  <div><strong>Quantity:</strong> {form.quantity} {form.unit}</div>
                  <div><strong>Servings:</strong> ~{form.servings || 'N/A'}</div>
                  <div><strong>Type:</strong> {form.dietaryType}</div>
                  <div><strong>Allergens:</strong> {form.allergens.length > 0 ? form.allergens.join(', ') : 'None'}</div>
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>Safety Window</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
                  <div><strong>Prepared:</strong> {new Date(form.preparedAt).toLocaleString()}</div>
                  <div><strong>Best Before:</strong> {new Date(form.bestBefore).toLocaleString()}</div>
                  <div><strong>Container:</strong> {form.containerType}</div>
                  <div><strong>Refrigeration:</strong> {form.refrigerationRequired ? 'Yes' : 'No'}</div>
                </div>
              </div>

              {form.imagePreview && (
                <div style={{ padding: 'var(--space-4)', background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)' }}>
                  <h4 style={{ marginBottom: 'var(--space-3)' }}>Food Image</h4>
                  <img src={form.imagePreview} alt="Food" style={{ maxWidth: '150px', borderRadius: 'var(--radius-md)' }} />
                </div>
              )}
            </div>

            <div className="alert alert-success" style={{ marginTop: 'var(--space-4)' }}>
              <span className="alert-icon">✓</span>
              <div>All hygiene checks completed. Your listing is ready to publish!</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              <button className="btn btn-secondary" onClick={() => setStep(3)}>← Back</button>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Publishing...' : '🚀 Publish Listing'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddFood;
