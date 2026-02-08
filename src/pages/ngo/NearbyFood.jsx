import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodContext } from '../../context/FoodContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function NearbyFood() {
  const navigate = useNavigate();
  const { claimFood } = useContext(FoodContext);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [reservedId, setReservedId] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  // Mock nearby food listings
  const nearbyListings = [
    {
      id: 1,
      name: 'Vegetable Biryani',
      category: 'cooked',
      quantity: 10,
      unit: 'kg',
      servings: 50,
      dietaryType: 'veg',
      distance: 1.2,
      donorName: 'Taj Restaurant',
      donorVerified: true,
      rating: 4.8,
      preparedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      bestBefore: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      allergens: ['gluten'],
      imagePreview: ''
    },
    {
      id: 2,
      name: 'Fresh Bread Loaves',
      category: 'bakery',
      quantity: 25,
      unit: 'pieces',
      servings: 25,
      dietaryType: 'veg',
      distance: 2.5,
      donorName: 'City Bakery',
      donorVerified: true,
      rating: 4.5,
      preparedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      bestBefore: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
      allergens: ['gluten', 'dairy']
    },
    {
      id: 3,
      name: 'Chicken Curry',
      category: 'cooked',
      quantity: 8,
      unit: 'kg',
      servings: 40,
      dietaryType: 'non-veg',
      distance: 3.8,
      donorName: 'Grand Hotel',
      donorVerified: false,
      rating: 4.2,
      preparedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      bestBefore: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      allergens: []
    },
    {
      id: 4,
      name: 'Mixed Fruits',
      category: 'fruits',
      quantity: 15,
      unit: 'kg',
      servings: 30,
      dietaryType: 'vegan',
      distance: 0.8,
      donorName: 'Fresh Mart',
      donorVerified: true,
      rating: 4.9,
      preparedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      bestBefore: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      allergens: []
    }
  ];

  const getTimeRemaining = (bestBefore) => {
    const now = new Date();
    const expiry = new Date(bestBefore);
    const diff = expiry - now;
    if (diff <= 0) return { expired: true, text: 'Expired' };
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return {
      expired: false,
      urgent: hours < 1,
      warning: hours < 3,
      text: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
      hours
    };
  };

  const filteredListings = nearbyListings
    .filter(f => {
      if (filter === 'all') return true;
      if (filter === 'veg') return f.dietaryType === 'veg' || f.dietaryType === 'vegan';
      if (filter === 'non-veg') return f.dietaryType === 'non-veg';
      if (filter === 'urgent') return getTimeRemaining(f.bestBefore).urgent;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'expiry') return new Date(a.bestBefore) - new Date(b.bestBefore);
      if (sortBy === 'quantity') return b.servings - a.servings;
      return 0;
    });

  const handleReserve = (id) => {
    setReservedId(id);
    // 10 minute timer would be set here
    setTimeout(() => {
      if (reservedId === id) setReservedId(null);
    }, 10 * 60 * 1000);
  };

  const handleClaim = (food) => {
    claimFood(food.id, user?.organizationName || 'My NGO');
    navigate('/ngo/accepted');
  };

  const toggleSave = (id) => {
    setSavedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Find Nearby Food</h1>
          <p className="dashboard-subtitle">Discover available food donations in your service area</p>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {[
                { value: 'all', label: 'All' },
                { value: 'veg', label: '🥬 Veg' },
                { value: 'non-veg', label: '🍖 Non-Veg' },
                { value: 'urgent', label: '🚨 Urgent' }
              ].map(f => (
                <button
                  key={f.value}
                  className={`btn ${filter === f.value ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>Sort by:</span>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="distance">📍 Distance</option>
                <option value="expiry">⏱️ Expiry Time</option>
                <option value="quantity">📦 Quantity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-500)' }}>
          Found <strong>{filteredListings.length}</strong> available donations nearby
        </div>

        {/* Listings Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
          {filteredListings.map(food => {
            const timeRemaining = getTimeRemaining(food.bestBefore);
            const isReserved = reservedId === food.id;
            const isSaved = savedItems.includes(food.id);

            return (
              <div key={food.id} className="food-card">
                {/* Image */}
                <div style={{
                  height: '140px',
                  background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--accent-100) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '56px',
                  position: 'relative'
                }}>
                  {food.category === 'cooked' ? '🍲' :
                    food.category === 'bakery' ? '🍞' :
                      food.category === 'fruits' ? '🍎' : '📦'}

                  {/* Save button */}
                  <button
                    onClick={() => toggleSave(food.id)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '18px',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {isSaved ? '❤️' : '🤍'}
                  </button>

                  {/* Urgent badge */}
                  {timeRemaining.urgent && (
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'var(--danger-500)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: '600'
                    }}>
                      🚨 URGENT
                    </span>
                  )}
                </div>

                <div className="food-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 className="food-card-title">{food.name}</h4>
                    <span className={`countdown ${timeRemaining.urgent ? 'urgent' : timeRemaining.warning ? 'warning' : ''}`}>
                      ⏱️ {timeRemaining.text}
                    </span>
                  </div>

                  {/* Donor info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                    <span style={{ fontWeight: '500' }}>{food.donorName}</span>
                    {food.donorVerified && <span className="badge badge-verified" style={{ fontSize: '10px' }}>✓</span>}
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-400)' }}>
                      ⭐ {food.rating}
                    </span>
                  </div>

                  <div className="food-card-meta">
                    <span className="badge badge-primary">{food.dietaryType}</span>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                      📦 {food.quantity} {food.unit}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                      🍽️ ~{food.servings} servings
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    color: 'var(--gray-500)',
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--space-3)'
                  }}>
                    📍 {food.distance} km away
                  </div>

                  {food.allergens.length > 0 && (
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--warning-500)', marginBottom: 'var(--space-3)' }}>
                      ⚠️ Allergens: {food.allergens.join(', ')}
                    </div>
                  )}

                  <div className="food-card-actions">
                    {isReserved ? (
                      <>
                        <button className="btn btn-success" style={{ flex: 1 }} onClick={() => handleClaim(food)}>
                          ✓ Confirm Claim
                        </button>
                        <button className="btn btn-secondary" onClick={() => setReservedId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => handleReserve(food.id)}>
                          🔒 Reserve (10 min)
                        </button>
                        <button className="btn btn-secondary btn-icon">
                          💬
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredListings.length === 0 && (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3 className="empty-state-title">No Food Found</h3>
              <p className="empty-state-text">Try adjusting your filters or check back later</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NearbyFood;
