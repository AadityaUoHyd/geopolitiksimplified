// components/FacebookComments.tsx
import React, { useEffect } from 'react';

interface FacebookCommentsProps {
  url: string;
}

const FacebookComments: React.FC<FacebookCommentsProps> = ({ url }) => {
  useEffect(() => {
    if ((window as any).FB) {
      (window as any).FB.XFBML.parse();
    }
  }, [url]);

  return (
    <div className="w-full mt-10">
      {/* Like Button */}
      <div className="fb-like mb-4"
        data-href={url}
        data-width=""
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-share="true"
      ></div>

      {/* Comments Section */}
      <div className="fb-comments"
        data-href={url}
        data-width="100%"
        data-numposts="5"
      ></div>
    </div>
  );
};

export default FacebookComments;
