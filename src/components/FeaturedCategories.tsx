import catNewArrivals from "@/assets/cat-new-arrivals.jpg";
import catBestSellers from "@/assets/cat-best-sellers.jpg";
import catOnlineExclusive from "@/assets/cat-online-exclusive.jpg";
import catKurtas from "@/assets/cat-kurtas.jpg";
import catCoOrds from "@/assets/cat-co-ords.jpg";

const categories = [
  { name: "NEW ARRIVALS", image: catNewArrivals },
  { name: "BEST SELLERS", image: catBestSellers },
  { name: "ONLINE EXCLUSIVE", image: catOnlineExclusive },
  { name: "KURTAS", image: catKurtas },
  { name: "CO-ORDS", image: catCoOrds },
];

const FeaturedCategories = () => {
  return (
    <section className="py-10 md:py-16 px-4">
      <h2 className="font-heading text-2xl md:text-3xl text-center text-foreground italic mb-8 md:mb-12">
        Featured Categories
      </h2>
      <div className="flex justify-center gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="flex flex-col items-center gap-3 flex-shrink-0 group"
          >
            <div className="w-20 h-24 md:w-36 md:h-44 rounded-xl overflow-hidden border-2 border-border group-hover:border-accent transition-colors">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width={512}
                height={640}
              />
            </div>
            <span className="text-[10px] md:text-xs font-semibold tracking-wider text-foreground text-center">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
