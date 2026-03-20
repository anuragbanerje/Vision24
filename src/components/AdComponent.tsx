import React, { useEffect, useRef } from 'react';

interface AdComponentProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle';
  fullWidthResponsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdComponent: React.FC<AdComponentProps> = ({ adSlot, adFormat = 'auto', fullWidthResponsive = true }) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const loadAd = () => {
      if (!adRef.current) return;
      
      // Check if the element is visible and has width
      const rect = adRef.current.getBoundingClientRect();
      if (rect.width === 0) {
        // If width is 0, wait a bit and try again
        setTimeout(loadAd, 500);
        return;
      }

      try {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          // Check if this specific element already has an ad
          if (adRef.current.getAttribute('data-adsbygoogle-status') === 'done') {
            return;
          }
          
          window.adsbygoogle.push({});
          initialized.current = true;
        }
      } catch (e: any) {
        // Only log if it's not the common "already filled" error
        if (e?.message?.includes('already have ads')) return;
        console.error('AdSense error:', e);
      }
    };

    // Small delay to ensure layout is calculated
    const timer = setTimeout(loadAd, 200);
    return () => clearTimeout(timer);
  }, [adSlot]); // Re-run if adSlot changes

  return (
    <div className="my-8 flex justify-center overflow-hidden bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 p-4 min-h-[100px]">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', minHeight: '90px' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID || "ca-pub-YOUR_CLIENT_ID"}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      ></ins>
    </div>
  );
};

export default AdComponent;
