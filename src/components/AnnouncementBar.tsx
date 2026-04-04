const announcements = [
  "Free shipping on all Orders",
  "COD Available",
  "New Arrivals updated weekly",
  "Get flat 10% off on your app purchase Use code: APP10",
  "FREE shipping on all prepaid orders above Rs. 800 for topwear",
  "Express shipping on all Orders",
];

const AnnouncementBar = () => {
  return (
    <div className="bg-announcement text-announcement-foreground overflow-hidden py-2 text-xs md:text-sm tracking-wide">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...announcements, ...announcements].map((text, i) => (
          <span key={i} className="mx-8 inline-block">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
