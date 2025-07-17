import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">VapeStore</h1>
              <p className="text-sm text-muted-foreground">Los mejores vapes a tu alcance</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="#productos" className="text-foreground hover:text-primary transition-colors">
              Productos
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors">
              Contacto
            </a>
            <Button 
              variant="whatsapp" 
              onClick={() => window.open('https://wa.me/573206609029', '_blank')}
            >
              Contactar
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <a 
              href="#inicio" 
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </a>
            <a 
              href="#productos" 
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </a>
            <a 
              href="#contacto" 
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>
            <Button 
              variant="whatsapp" 
              className="w-full mt-3"
              onClick={() => {
                window.open('https://wa.me/573206609029', '_blank');
                setIsMenuOpen(false);
              }}
            >
              Contactar por WhatsApp
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};