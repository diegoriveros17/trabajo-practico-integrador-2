import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useFetch } from "../hooks/useFetch";

export const HomePage = () => {
  const { data, isLoading, error } = useFetch("articles");
  // console.log(data);

  const arrArticles = data?.articles;

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">HomePage</h1>

        {isLoading && (
          <p className="text-blue-600 font-semibold text-lg">
            Cargando artículos...
          </p>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            Error al obtener artículos: {error}
          </div>
        )}

        {/* 3. Renderizado de Datos obtenidos */}
        {!isLoading && !error && (
          <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {arrArticles && arrArticles.length > 0 ? (
              arrArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-700 mb-4">{article.content}</p>
                  <p className="text-gray-700 mb-4">{article.excerpt}</p>
                  <p className="text-gray-700 mb-4">
                    <small>Author username: {article.author.username}</small>
                  </p>
                  <p className="text-gray-700 mb-4">
                    <small> Author email: {article.author.email}</small>
                  </p>
                </article>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-2">
                No hay artículos disponibles.
              </p>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
