import React from 'react';

const options: Record<string, string> = {
  default: '',
  dark: 'nsw-media--dark',
  light: 'nsw-media--light',
  transparent: 'nsw-media--transparent',
};

/**
 * Props for the Media component
 *
 * @param image - URL of an image to render
 * @param video - URL of an embeddable video (iframe src)
 * @param title - Alt/title text for the media
 * @param caption - Caption text for the media
 * @param style - Visual style for the caption/background: 'default'|'dark'|'light'|'transparent'
 * @param left - Left-positioned media width (one of 'none','30','40','50')
 * @param right - Right-positioned media width (one of 'none','30','40','50')
 * @param center - Centered media width (one of 'none','60','70','80','90')
 * @param transparent - legacy boolean flag (kept for parity with JS API)
 */
export interface MediaProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  image?: string;
  video?: string;
  title?: string;
  caption?: string;
  style?: 'default' | 'dark' | 'light' | 'transparent';
  left?: 'none' | '30' | '40' | '50';
  right?: 'none' | '30' | '40' | '50';
  center?: 'none' | '60' | '70' | '80' | '90';
  transparent?: boolean;
}

/**
 * Media combines visual elements with text to give context and alignment within content.
 *
 * Behaviour matches the legacy implementation:
 * - Renders either an iframe (video) or an img (image)
 * - Applies CSS classes for positioning (left/right/center) and style variants
 */
export const Media: React.FC<MediaProps> = ({
  image,
  video,
  title,
  caption,
  style = 'default',
  left,
  right,
  center,
}) => {
  const leftClass = left === undefined || left === 'none' ? '' : ` nsw-media--left-${left}`;
  const rightClass = right === undefined || right === 'none' ? '' : ` nsw-media--right-${right}`;
  const centerClass = center === undefined || center === 'none' ? '' : ` nsw-media--${center}`;
  const styleClass = options[style] || '';

  return (
    <figure className={`nsw-media${leftClass} ${styleClass} ${rightClass} ${centerClass}`.trim()}>
      {video ? (
        <div className="nsw-media__video">
          <iframe src={video} title={title} frameBorder="0" allowFullScreen />
        </div>
      ) : null}

      {image ? <img src={image} alt={title} /> : null}

      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
};

export default Media;
