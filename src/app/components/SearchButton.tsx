'use client';

export default function SearchButton() {
  const handleSearch = () => {
    alert('Buscando...');
  };

  return (
    <button
      onClick={handleSearch}
      style={{
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    
      }}
    >
      Pesquisar
    </button>
  );
}