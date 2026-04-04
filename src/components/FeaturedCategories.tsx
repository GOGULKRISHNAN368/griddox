import catNewArrivals from "@/assets/cat-new-arrivals-v2.jpg";
import catBestSellers from "@/assets/cat-best-sellers-v2.jpg";
import catOnlineExclusive from "@/assets/cat-online-exclusive-v2.jpg";

const categories = [
  { name: "NEW ARRIVALS", image: catNewArrivals },
  { name: "BEST SELLERS", image: catBestSellers },
  { name: "ONLINE EXCLUSIVE", image: catOnlineExclusive },
];

const FeaturedCategories = () => {
  return (
    <section className="py-10 md:py-16 px-4 max-w-5xl mx-auto">
      <h2 className="font-heading text-2xl md:text-4xl text-center text-foreground italic mb-8 md:mb-12">
        Featured Categories
      </h2>
      <div className="grid grid-cols-3 gap-4 md:gap-8">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-full aspect-square overflow-hidden">
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
