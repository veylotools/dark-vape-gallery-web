import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  rating?: number;
  whatsappMessage?: string;
}

export const ProductCard = ({ 
  name, 
  price, 
  image, 
  description, 
  rating = 5,
  whatsappMessage 
}: ProductCardProps) => {
  
  const handleWhatsAppClick = () => {
    const message = whatsappMessage || `Hola! Me interesa el producto: ${name} - ${price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/573206609029?text=${encodedMessage}`, '_blank');
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/30">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center space-x-1">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{price}</span>
            <Button 
              variant="whatsapp" 
              onClick={handleWhatsAppClick}
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Comprar ahora
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};