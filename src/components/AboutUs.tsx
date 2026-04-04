import aboutImage from "@/assets/hero-1.jpg";

const AboutUs = () => {
  return (
    <section id="about" className="bg-secondary text-secondary-foreground w-full py-8 md:py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-background/50 p-6 md:p-8 rounded-xl shadow-sm border border-border/40">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-[35%] flex justify-center">
          <div className="aspect-[3/4] relative overflow-hidden rounded-md shadow-md w-full max-w-[240px]">
            <img 
              src={aboutImage} 
              alt="Gridox About Us" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-[65%] flex flex-col justify-center text-center md:text-left space-y-3 md:space-y-4">
          <h2 className="font-heading text-lg md:text-2xl tracking-widest uppercase font-semibold text-foreground">
            About Gridox
          </h2>
          
          <div className="space-y-2.5 text-[11px] md:text-xs leading-relaxed opacity-90 text-justify md:text-left font-body font-normal">
            <p>
              Gridox is inspired by modern women who balance multiple roles effortlessly. That’s why our collections are designed to be versatile, timeless, and easy to wear, without compromising on elegance.
            </p>
            <p>
              Unlike mass-produced fashion, we focus on limited, carefully crafted pieces—ensuring uniqueness in every outfit you own. Our designs are built to last beyond passing trends and seasons.
            </p>
            <p>
              What truly sets us apart is our end-to-end in-house manufacturing. From fabric selection to final stitching, every step happens under our direct supervision. This gives us complete creative freedom and consistent quality.
            </p>
            <p className="font-medium text-foreground italic text-xs md:text-sm pt-2 tracking-wide">
              GriDox isn’t just what you wear. It’s how you feel wearing it.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
