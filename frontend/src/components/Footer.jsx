const Footer = () => {
  return (
    <footer className="w-full mt-10 py-6 bg-white/70 backdrop-blur-xl border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <p className="font-medium">
          © {new Date().getFullYear()} Gestione Spese — Tutti i diritti
          riservati.
        </p>

        <p className="text-gray-500">
          Creato da <span className="font-semibold">Salvatore Gianquinto</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
