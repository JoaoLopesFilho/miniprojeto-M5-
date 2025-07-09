'use client';
import { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';

export default function SearchButton() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nome: '', tipo: '', autor: '', data: '', descricao: '' });
  const [deleteId, setDeleteId] = useState('');

  const exemplos = [
  {
    nome: "Pantera Negra",
    tipo: "Filme",
    autor: "Ryan Coogler",
    data: 2018,
    descricao: "Após a morte do rei T'Chaka, seu filho T'Challa retorna à nação africana de Wakanda para assumir o trono...",
  },
  {
    nome: "Tudo em Todo Lugar ao Mesmo Tempo",
    tipo: "Filme",
    autor: "Daniel Kwan e Daniel Scheinert",
    data: 2022,
    descricao: "Uma ruptura interdimensional bagunça a realidade e uma inesperada heroína precisa salvar o multiverso.",
  },
  {
    nome: "O Menino que Descobriu o Vento",
    tipo: "Filme",
    autor: "William Kamkwamba",
    data: 2019,
    descricao: "Baseado em uma história real, um jovem do Malaui transforma sua vila com energia sustentável.",
  },
  {
    nome: "Samurai de Olhos Azuis",
    tipo: "Série",
    autor: "Amber Noizumi",
    data: 2023,
    descricao: "Uma guerreira excluída busca vingança no Japão do período Edo.",
  },
  {
    nome: "Hora de Aventura",
    tipo: "Série",
    autor: "Pendleton Ward",
    data: 2010,
    descricao: "Finn e Jake vivem aventuras na Terra de Ooo enfrentando perigos bizarros.",
  },
  {
    nome: "Sex Education",
    tipo: "Série",
    autor: "Laurie Nunn",
    data: 2019,
    descricao: "Otis e Maeve abrem uma clínica de terapia sexual na escola.",
  },
];


  const inputStyle = "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch(`https://miniprojetom4.onrender.com/filmes/filtrar?nome=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Erro ao buscar filmes.');
      const data = await response.json();
      setResults(data || []);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('https://miniprojetom4.onrender.com/filmes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.mensagem || 'Erro ao adicionar.');

      alert('Filme adicionado com sucesso!');
      setForm({ nome: '', tipo: '', autor: '', data: '', descricao: '' });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://miniprojetom4.onrender.com/filmes/${deleteId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensagem || 'Erro ao deletar.');
      alert('Filme deletado!');
      setDeleteId('');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-16 text-black">

      {/* 🔍 Seção 1: Pesquisa */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">🔍 Buscar Filme</h2>
        <div className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do filme..."
            className={`${inputStyle} pr-14`}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        {loading && <p className="text-gray-500">Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {(results.length > 0 ? results : exemplos).map((filme, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-5 shadow">
            <h3 className="text-lg font-bold text-gray-800">
              🎬 {filme.nome} <span className="text-sm text-gray-500">({filme.tipo})</span>
            </h3>
            <p className="text-sm text-gray-600">Autor: {filme.autor} — Ano: {filme.data}</p>
            <p className="text-gray-700 mt-1">{filme.descricao}</p>
          </div>
        ))}
    </div>

        </div>
      </div>

      {/* ➕ Seção 2: Adicionar */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">➕ Adicionar Filme/Série</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className={inputStyle} />
          <input type="text" placeholder="Tipo (filme/serie)" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} className={inputStyle} />
          <input type="text" placeholder="Autor" value={form.autor} onChange={e => setForm({ ...form, autor: e.target.value })} className={inputStyle} />
          <input type="number" placeholder="Ano" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} className={inputStyle} />
        </div>
        <textarea
          placeholder="Descrição"
          value={form.descricao}
          onChange={e => setForm({ ...form, descricao: e.target.value })}
          className="mt-4 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleAdd} className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Adicionar
        </button>
      </div>

      {/* 🗑 Seção 3: Deletar */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">🗑 Remover por ID</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            placeholder="ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className={inputStyle}
          />
          <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center gap-2 transition">
            <Trash2 className="w-5 h-5" /> Remover
          </button>
        </div>
      </div>
    </div>
  );
}