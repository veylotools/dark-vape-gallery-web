import { ProductCard } from './ProductCard';
import vape1 from '@/assets/vape1.jpg';
import vape2 from '@/assets/vape2.jpg';
import vape3 from '@/assets/vape3.jpg';

// Datos de ejemplo - podrás modificar estos productos fácilmente
const products = [
  {
    id: '1',
    name: 'Vape Pro Max',
    price: '$89.900',
    image: vape1,
    description: 'Vaporizador premium con pantalla LED, batería de larga duración y control de temperatura preciso.',
    rating: 5,
    whatsappMessage: 'Hola! Me interesa el Vape Pro Max por $89.900. ¿Está disponible?'
  },
  {
    id: '2',
    name: 'Vape Pen Elite',
    price: '$59.900',
    image: vape2,
    description: 'Diseño compacto y elegante, perfecto para llevar a cualquier lugar. Calidad premium.',
    rating: 5,
    whatsappMessage: 'Hola! Quiero información sobre el Vape Pen Elite por $59.900'
  },
  {
    id: '3',
    name: 'Vape Mod Advanced',
    price: '$129.900',
    image: vape3,
    description: 'La mejor experiencia en vaping con tecnología avanzada y múltiples configuraciones.',
    rating: 5,
    whatsappMessage: 'Hola! Me interesa el Vape Mod Advanced por $129.900. ¿Qué incluye?'
  },
  {
    id: '4',
    name: 'Vape Starter Kit',
    price: '$39.900',
    image: vape1,
    description: 'Kit perfecto para principiantes. Incluye todo lo necesario para empezar.',
    rating: 4,
    whatsappMessage: 'Hola! Quiero el Vape Starter Kit por $39.900. ¿Qué incluye el kit?'
  },
  {
    id: '5',
    name: 'Vape Compact Pro',
    price: '$79.900',
    image: vape2,
    description: 'Potencia y calidad en un diseño ultra compacto. Ideal para uso diario.',
    rating: 5,
    whatsappMessage: 'Hola! Me interesa el Vape Compact Pro por $79.900'
  },
  {
    id: '6',
    name: 'Vape Premium Edition',
    price: '$149.900',
    image: vape3,
    description: 'Edición limitada con acabados premium y la última tecnología en vaping.',
    rating: 5,
    whatsappMessage: 'Hola! Quiero información sobre el Vape Premium Edition por $149.900'
  }
];

export const ProductGallery = () => {
  return (
    <section id="productos" className="py-16 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Productos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubre nuestra selección de vaporizadores premium con la mejor calidad y tecnología del mercado
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};