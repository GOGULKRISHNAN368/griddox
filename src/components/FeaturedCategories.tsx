import catNewArrivals from "@/assets/cat-new-arrivals.jpg";
import catBestSellers from "@/assets/cat-best-sellers.jpg";
import catOnlineExclusive from "@/assets/cat-online-exclusive.jpg";
import catKurtas from "@/assets/cat-kurtas.jpg";
import catCoOrds from "@/assets/cat-co-ords.jpg";
import catDresses from "@/assets/cat-dresses.jpg";
import catMaternity from "@/assets/cat-maternity.jpg";
import catKurtaSet from "@/assets/cat-kurta-set.jpg";
import catAnkleLeggings from "@/assets/cat-ankle-leggings.jpg";
import catChuridar from "@/assets/cat-churidar.jpg";

const categories = [
  { name: "NEW ARRIVALS", image: catNewArrivals },
  { name: "BEST SELLERS", image: catBestSellers },
  { name: "ONLINE EXCLUSIVE", image: catOnlineExclusive },
  { name: "KURTAS", image: catKurtas },
  { name: "CO-ORDS", image: catCoOrds },
  { name: "DRESSES", image: catDresses },
  { name: "MATERNITY", image: catMaternity },
  { name: "KURTA SET", image: catKurtaSet },
  { name: "ANKLE LEGGINGS", image: catAnkleLeggings },
  { name: "CHURIDAR\nLEGGINGS", image: catChuridar },
];

const FeaturedCategories = () => {
  return (
    <section className="py-10 md:py-16 px-4 max-w-7xl mx-auto">
      <h2 className="font-heading text-2xl md:text-4xl text-center text-foreground italic mb-8 md:mb-12">
        Featured Categories
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width={512}
                height={640}
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
