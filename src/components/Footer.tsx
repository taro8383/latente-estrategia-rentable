export const Footer = () => {
  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Latente</h3>
              <p className="text-primary-foreground/80">
                Socios estratégicos en rentabilidad
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-primary-foreground/60">
                © {new Date().getFullYear()} Latente. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
