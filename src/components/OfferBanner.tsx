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
    <div className="bg-primary text-primary-foreground py-1.5 px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 max-w-full overflow-hidden border-b border-primary/20">
      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
        <h2 className="text-sm sm:text-base font-bold tracking-wide uppercase">Upto 70% OFF at Sitewide</h2>
        <p className="text-[10px] sm:text-xs opacity-90 font-medium">Sale ends in:</p>
      </div>

      <div className="flex items-center space-x-1.5 sm:space-x-3">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds },
        ].map((item, index, array) => (
          <div key={item.label} className="flex items-center">
            <div className="flex flex-col items-center min-w-[2rem] sm:min-w-[2.5rem]">
              <span className="text-base sm:text-lg font-bold leading-none">{formatNumber(item.value)}</span>
              <span className="text-[8px] sm:text-[9px] mt-0.5 uppercase opacity-80">{item.label}</span>
            </div>
            {index < array.length - 1 && (
              <span className="text-base sm:text-lg font-bold pb-2.5 sm:pb-3 ml-1 sm:ml-1 opacity-70">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferBanner;
