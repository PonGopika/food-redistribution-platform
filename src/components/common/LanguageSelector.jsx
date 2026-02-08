import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const translations = {
    en: { name: 'English', flag: '🇺🇸' },
    hi: { name: 'हिंदी', flag: '🇮🇳' },
    ta: { name: 'தமிழ்', flag: '🇮🇳' }
};

function LanguageSelector() {
    const { language, changeLanguage } = useContext(AuthContext);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="form-select"
                style={{
                    paddingLeft: 'var(--space-8)',
                    minWidth: '140px'
                }}
            >
                {Object.entries(translations).map(([code, { name, flag }]) => (
                    <option key={code} value={code}>
                        {flag} {name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default LanguageSelector;
