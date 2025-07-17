import { MessageCircle, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/573206609029', '_blank');
  };

  return (
    <footer id="contacto" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">VapeStore</h3>
            <p className="text-muted-foreground mb-4">
              Tu tienda de confianza para los mejores vaporizadores. 
              Calidad, variedad y los mejores precios del mercado.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>WhatsApp: +57 320 660 9029</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>Teléfono: +57 320 660 9029</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Colombia</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">¿Listo para comprar?</h4>
            <p className="text-muted-foreground mb-4">
              Contáctanos por WhatsApp y te ayudamos a elegir el vape perfecto para ti.
            </p>
            <Button 
              variant="whatsapp" 
              onClick={openWhatsApp}
              className="w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Chatear ahora
            </Button>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 VapeStore. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};