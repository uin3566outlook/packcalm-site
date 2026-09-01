'use client';

import { useState } from 'react';

const items = [
  { id: 'passport', name: 'Passport', color: 'mint' },
  { id: 'phone', name: 'Phone', color: 'blue' },
  { id: 'laptop', name: 'Laptop', color: 'lilac' },
  { id: 'toothbrush', name: 'Toothbrush', color: 'coral' },
  { id: 'jacket', name: 'Jacket', color: 'yellow' },
  { id: 'headphones', name: 'Headphones', color: 'ink' },
];

export function PackingDemo() {
  const [packed, setPacked] = useState<string[]>(['passport', 'phone']);

  function toggleItem(id: string) {
    setPacked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  const progress = Math.round((packed.length / items.length) * 100);

  return (
    <div className="packing-demo">
      <div className="demo-toolbar">
        <div>
          <span className="demo-kicker">CHICAGO · TOMORROW</span>
          <strong>{packed.length} of {items.length} packed</strong>
        </div>
        <button onClick={() => setPacked([])} type="button" aria-label="Reset packing demo">
          <span aria-hidden="true">↻</span> Reset
        </button>
      </div>
      <div className="demo-progress" aria-label={`${progress}% packed`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="demo-workspace">
        <div className="demo-items">
          <p>Tap an item to pack it</p>
          <div className="demo-item-grid">
            {items.map((item) => {
              const isPacked = packed.includes(item.id);
              return (
                <button
                  aria-pressed={isPacked}
                  className={`demo-item color-${item.color}`}
                  disabled={isPacked}
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  type="button"
                >
                  <span className="demo-icon"><img src={`/assets/items/${item.id}.svg`} alt="" /></span>
                  <span>{item.name}</span>
                  <span className="demo-action">{isPacked ? 'Packed' : '+'}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="demo-suitcase" aria-label="Packed items in suitcase">
          <img className="suitcase-shell" src="/assets/suitcase-shell.png" alt="" />
          <div className="packed-items">
            {items.filter((item) => packed.includes(item.id)).map((item, index) => (
              <button
                aria-label={`Unpack ${item.name}`}
                className={`packed-tile color-${item.color} packed-position-${index}`}
                key={item.id}
                onClick={() => toggleItem(item.id)}
                type="button"
              >
                <img src={`/assets/items/${item.id}.svg`} alt="" />
              </button>
            ))}
          </div>
          {packed.length === items.length && <span className="all-packed">Ready to go ✓</span>}
        </div>
      </div>
    </div>
  );
}
