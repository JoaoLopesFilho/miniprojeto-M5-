'use client';
import Header from "./components/header";
import FooterSection from "./components/footer";
import SearchButton from "./components/SearchButton";

export default function Home() {
  return (
     <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />

      <main className="flex items-center justify-center min-h-screen bg-white text-gray-800 px-4 py-10">
        <section className="w-full max-w-7xl mx-auto flex flex-col gap-16 items-center">
          <h2 className="text-3xl font-bold text-center">
            Qual o Filme escolhido de hoje?
          </h2>
          <SearchButton />
        </section>
      </main>


      <FooterSection />
    </div>
  );
}
