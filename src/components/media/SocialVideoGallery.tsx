import React from 'react';
import { Instagram, Youtube, ExternalLink, Play } from 'lucide-react';
import socialMediaData from '../../data/socialMediaLinks.json';

type SocialLink = {
  url: string;
  title?: string;
  description?: string;
};

type MediaInfo = {
  platform: 'instagram' | 'youtube' | 'unknown';
  embedUrl: string | null;
  externalUrl: string;
};

const isPlaceholder = (url: string) =>
  /REPLACE_WITH_/i.test(url) || /example\.com/i.test(url);

function parseMediaUrl(url: string): MediaInfo {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');

    if (host === 'instagram.com' || host === 'instagr.am') {
      const reelMatch = parsed.pathname.match(/\/reel\/([^/]+)/i);
      const postMatch = parsed.pathname.match(/\/(p|tv)\/([^/]+)/i);
      const id = reelMatch?.[1] || postMatch?.[2];

      return {
        platform: 'instagram',
        embedUrl: id
          ? `https://www.instagram.com/reel/${id}/embed`
          : null,
        externalUrl: url,
      };
    }

    if (host === 'youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com') {
      let id: string | null = null;

      const shortsMatch = parsed.pathname.match(/\/shorts\/([^/]+)/i);
      const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/i);

      if (shortsMatch) id = shortsMatch[1];
      else if (embedMatch) id = embedMatch[1];
      else id = parsed.searchParams.get('v');

      return {
        platform: 'youtube',
        embedUrl: id ? `https://www.youtube-nocookie.com/embed/${id}` : null,
        externalUrl: url,
      };
    }
  } catch {
    // Invalid URLs are rendered as an external-link card rather than breaking the Gallery.
  }

  return { platform: 'unknown', embedUrl: null, externalUrl: url };
}

const PlatformIcon: React.FC<{ platform: MediaInfo['platform'] }> = ({ platform }) => {
  if (platform === 'instagram') return <Instagram size={22} />;
  if (platform === 'youtube') return <Youtube size={22} />;
  return <Play size={22} />;
};

export const SocialVideoGallery: React.FC = () => {
  const links = socialMediaData.links as SocialLink[];

  return (
    <section aria-labelledby="social-videos-heading" className="mb-16">
      <div className="mb-8">
        <h2
          id="social-videos-heading"
          className="text-3xl md:text-4xl font-black text-white mb-2"
        >
          TK Fireworks Reels & Shorts
        </h2>
        <p className="text-gray-400">
          Watch TK Fireworks celebrations, product highlights and fireworks videos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {links.filter((item) => !isPlaceholder(item.url)).map((item, index) => {
          const media = parseMediaUrl(item.url);
          const title = item.title || `TK Fireworks ${media.platform} video ${index + 1}`;

          return (
            <article
              key={`${item.url}-${index}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-xl"
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-3 text-white min-w-0">
                  <span className="shrink-0 text-pink-400" aria-hidden="true">
                    <PlatformIcon platform={media.platform} />
                  </span>
                  <h3 className="font-bold truncate">{title}</h3>
                </div>

                <a
                  href={media.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${title}`}
                  className="shrink-0 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              {media.embedUrl ? (
                <div className="relative aspect-[9/16] bg-black">
                  <iframe
                    src={media.embedUrl}
                    title={title}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-[9/16] flex items-center justify-center p-6 text-center bg-black/40">
                  <div>
                    <PlatformIcon platform={media.platform} />
                    <p className="mt-3 text-gray-300">Open this social video</p>
                    <a
                      href={media.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold"
                    >
                      View Video <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              )}

              <div className="px-5 py-4">
                <p className="text-sm text-gray-400">
                  {item.description || 'TK Fireworks social video'}
                </p>
                <a
                  href={media.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-orange-400 hover:text-orange-300"
                >
                  Watch on {media.platform === 'instagram' ? 'Instagram' : media.platform === 'youtube' ? 'YouTube' : 'source'}
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
