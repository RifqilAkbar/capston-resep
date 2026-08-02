export function SearchBar({ value, onChange, placeholder = 'Cari resep, bahan, atau kategori...', onEnter, autoFocus = false }) {
  return (
    <div className="searchbar">
      <i className="fa-solid fa-magnifying-glass searchbar-icon" />
      <input
        type="text"
        className="searchbar-input"
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) onEnter() }}
      />
      {value ? (
        <button
          type="button"
          className="searchbar-clear"
          aria-label="Bersihkan pencarian"
          onClick={() => onChange('')}
        >
          <i className="fa-solid fa-xmark" />
        </button>
      ) : null}
    </div>
  )
}
