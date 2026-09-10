export function Footer() {
  return (
    <footer className="w-full bg-bg-900 border-t border-pr-900 text-neu-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <span className="text-lg font-bold tracking-tight text-white">
            LawGates
          </span>
          <span className="text-xs text-neu-500 hidden sm:inline">|</span>
          <p className="text-xs text-neu-500 text-center sm:text-left">
            Platform Intelijen Regulasi & Hukum Indonesia Terpadu.
          </p>
        </div>

        <p className="text-xs text-neu-500">
          &copy; {new Date().getFullYear()} LawGates. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
}
