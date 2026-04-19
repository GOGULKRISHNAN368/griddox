import { useState, useEffect } from "react";

const OfferBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    minutes: 28,
    seconds: 30,
  });

  useEffect(() => {
    // A simple countdown logic for demonstration
    // Set a target date 2 hours, 28 mins, 30 secs from now
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 2);
    targetDate.setMinutes(targetDate.getMinutes() + 28);
    targetDate.setSeconds(targetDate.getSeconds() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-primary text-primary-foreground py-1 px-2 sm:px-4 flex flex-row items-center justify-center gap-1.5 sm:gap-6 w-full overflow-hidden border-b border-primary/20">
      <div className="flex flex-row items-center gap-1.5 sm:flex-col sm:items-end sm:gap-0">
        <h2 className="text-[10px] sm:text-base font-bold tracking-tight sm:tracking-wide uppercase whitespace-nowrap">Upto 70% OFF</h2>
        <span className="hidden sm:inline-block text-[10px] sm:text-xs opacity-90 font-medium">at Sitewide - Sale ends in:</span>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-3">
        {[
          { label: 'D', value: timeLeft.days, desktopLabel: 'Days' },
          { label: 'H', value: timeLeft.hours, desktopLabel: 'Hours' },
          { label: 'M', value: timeLeft.minutes, desktopLabel: 'Mins' },
          { label: 'S', value: timeLeft.seconds, desktopLabel: 'Secs' },
        ].map((item, index, array) => (
           <div key={item.label} className="flex items-center">
            <div className="flex flex-col items-center min-w-[1.2rem] sm:min-w-[2.5rem]">
              <span className="text-[11px] sm:text-lg font-bold leading-none tracking-tighter sm:tracking-normal">{formatNumber(item.value)}</span>
              <span className="text-[6px] sm:text-[9px] mt-0.5 uppercase opacity-80">
                <span className="sm:hidden">{item.label}</span>
                <span className="hidden sm:inline">{item.desktopLabel}</span>
              </span>
            </div>
            {index < array.length - 1 && (
              <span className="text-[11px] sm:text-lg font-bold pb-2 sm:pb-3 ml-0.5 sm:ml-1 opacity-70">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferBanner;
