import { Button } from '@/components/ui/button';
import { ArrowDown, MessageCircle, Shield, Truck, Star } from 'lucide-react';

export const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/573206609029?text=Hola! Me gustaría conocer más sobre sus productos', '_blank');
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-gradient-dark overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Los mejores
            <span className="bg-gradient-primary bg-clip-text text-transparent"> vapes </span>
            a tu alcance
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Calidad premium, tecnología avanzada y los mejores precios. 
            Tu experiencia de vaping perfecta te está esperando.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="whatsapp" 
              size="lg" 
              onClick={openWhatsApp}
              className="text-lg px-8 py-6"
            >
              <MessageCircle className="h-5 w-5" />
              Contactar ahora
            </Button>
            <Button 
              variant="premium" 
              size="lg" 
              onClick={scrollToProducts}
              className="text-lg px-8 py-6"
            >
              Ver productos
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center p-6 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Calidad Garantizada</h3>
              <p className="text-muted-foreground text-center">
                Productos auténticos con garantía completa
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
              <Truck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Envío Rápido</h3>
              <p className="text-muted-foreground text-center">
                Entrega segura en todo el país
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
              <Star className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Mejor Precio</h3>
              <p className="text-muted-foreground text-center">
                Los precios más competitivos del mercado
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  );
};