import React from "react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">Projeto Horizonte &copy; {currentYear}</p>
          <p className="text-sm text-gray-400">Conectando você a filmes incríveis.</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/JoaoLopesFilho/miniprojeto-M5-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            GitHub da API
          </a>
        </div>
      </div>
    </footer>
  );
}
