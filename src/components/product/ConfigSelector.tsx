import React from 'react';
import type { ConfigOption } from '../../types';

interface ConfigSelectorProps {
  configurations: ConfigOption[];
  selectedConfigs: ConfigOption[];
  onSelectConfig: (config: ConfigOption) => void;
}

export const ConfigSelector: React.FC<ConfigSelectorProps> = ({
  configurations,
  selectedConfigs,
  onSelectConfig,
}) => {
  if (!configurations || configurations.length === 0) return null;

  // Group configurations by type (e.g. RAM, Storage, Switch Type, Color)
  const grouped = configurations.reduce((acc, opt) => {
    if (!acc[opt.type]) acc[opt.type] = [];
    acc[opt.type].push(opt);
    return acc;
  }, {} as Record<string, ConfigOption[]>);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', margin: '1.4rem 0' }}>
      {Object.entries(grouped).map(([type, options]) => {
        const selectedForType = selectedConfigs.find((c) => c.type === type) || options.find((c) => c.isDefault) || options[0];

        return (
          <div key={type}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.88rem', color: '#8b949e', fontWeight: 600 }}>{type}:</span>
              <span style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 700 }}>{selectedForType.label}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {options.map((opt) => {
                const isSelected = selectedForType.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onSelectConfig(opt)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: `2px solid ${isSelected ? '#ff9900' : '#30363d'}`,
                      backgroundColor: isSelected ? 'rgba(255, 153, 0, 0.12)' : '#161b22',
                      color: isSelected ? '#fff' : '#c9d1d9',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: '0.88rem' }}>{opt.label}</span>
                    {opt.priceDelta ? (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: opt.priceDelta > 0 ? '#ff9900' : '#2ea043',
                          fontWeight: 700,
                          marginTop: '2px',
                        }}
                      >
                        {opt.priceDelta > 0 ? `+₹${opt.priceDelta.toLocaleString('en-IN')}` : `-₹${Math.abs(opt.priceDelta).toLocaleString('en-IN')}`}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '2px' }}>Included</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
