'use client';
import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
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

      <main style={{ flex: 1 }}>
        <section
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h2>O que vai ser hoje?</h2>
          <SearchButton />
        </section>
      </main>

      <Footer />
    </div>
  );
}
