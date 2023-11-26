import Article from "./Article";

export default function Blog() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[url('/BlogHero.jpg')] bg-cover bg-center bg-fixed sm:bg-center h-48 ">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 h-full w-full flex justify-center items-center">
          {/* Contenido principal */}
          <div className="flex justify-center items-center w-full font-poppins text-white font-extrabold tracking-tight text-5xl">
            {/* Título */}
            <h1>Blog</h1>
          </div>
        </div>
      </section>
      <div className="p-8">
        <Article />
      </div>
    </>
  );
}