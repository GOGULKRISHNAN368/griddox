import aboutImage from "@/assets/hero-1.jpg";

const AboutUs = () => {
  return (
    <section className="bg-secondary text-secondary-foreground w-full py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-2/5">
          <div className="aspect-[4/5] relative overflow-hidden rounded-md shadow-lg max-w-sm mx-auto md:max-w-none">
            <img 
              src={aboutImage} 
              alt="Gridox About Us" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-3/5 flex flex-col justify-center text-center md:text-left space-y-4 md:space-y-6">
          <h2 className="font-heading text-xl md:text-3xl tracking-widest uppercase font-semibold text-foreground">
            About Gridox
          </h2>
          
          <div className="space-y-3 text-xs md:text-sm leading-relaxed opacity-90 text-justify md:text-left font-body font-normal">
            <p>
              Gridox is inspired by modern women who balance multiple roles effortlessly. That’s why our collections are designed to be versatile, timeless, and easy to wear, without compromising on elegance.
            </p>
            <p>
              Unlike mass-produced fashion, we focus on limited, carefully crafted pieces—ensuring uniqueness in every outfit you own. Our designs are not just trend-based; they are built to last beyond seasons.
            </p>
            <p>
              At its core, Gridox is about empowering everyday dressing—helping you feel confident whether you're stepping out, working, relaxing, or embracing new phases of life.
            </p>
            <p>
              What truly sets us apart is our end-to-end in-house manufacturing. From fabric selection to final stitching, every step happens under our direct supervision. This gives us complete creative freedom, consistent quality, and the ability to innovate faster than conventional brands.
            </p>
            <p className="font-medium text-foreground italic text-sm md:text-base pt-3 tracking-wide">
              GriDox isn’t just what you wear. It’s how you feel wearing it.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
