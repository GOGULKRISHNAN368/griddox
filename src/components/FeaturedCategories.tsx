import catCoOrds from "@/assets/cat-co-ords-v2.jpg";
import catKurtaSet from "@/assets/cat-kurta-set-v2.jpg";
import catKurtas from "@/assets/cat-kurtas-v2.jpg";
import catDresses from "@/assets/cat-dresses-v2.jpg";
import catMaternity from "@/assets/cat-maternity-v2.jpg";
// For lounge wear we use churidar as a placeholder if no specific image exists
import catChuridar from "@/assets/cat-churidar-v2.jpg";
import catAnkleLeggings from "@/assets/cat-ankle-leggings-v2.jpg";

const categories = [
  { name: "PEPLUM CO-ORDS", image: catCoOrds },
  { name: "COTTON KURTI SET", image: catKurtaSet },
  { name: "PEPLUM TOPS", image: catKurtas },
  { name: "PREMIUM RAW SILK SET", image: catDresses },
  { name: "MATERNITY WEAR", image: catMaternity },
  { name: "LOUNGE WEAR", image: catChuridar },
  { name: "BOTTOM WEAR", image: catAnkleLeggings },
];

const FeaturedCategories = () => {
  return (
    <section className="py-10 md:py-16 px-4 max-w-7xl mx-auto">
      <h2 className="font-heading text-2xl md:text-4xl text-center text-foreground italic mb-8 md:mb-12">
        Featured Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-full aspect-square overflow-hidden bg-muted/10">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width={512}
                height={512}
              />
            </div>
            <span className="text-xs md:text-sm font-semibold tracking-wider text-foreground text-center whitespace-pre-line">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
