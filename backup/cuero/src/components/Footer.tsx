import logo from "/LoDi-logo.svg";

export const Footer = () => {
  return (
    <footer className="py-12 bg-card text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img
                  src={logo}
                  alt="LoDi Logo"
                  className="h-10 w-auto"
                />
              </div>
            </div>

            <div className="flex items-end">
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()}. Latente, socios estratégicos en rentabilidad. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
