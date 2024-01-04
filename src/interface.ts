export interface AnimeInterface {
  title: string | undefined;
  href: string | undefined;
  episode: string | undefined;
  thumbnail: string | undefined;
  date: string | undefined;
}

export interface EpisodeInterface {
  title: string | undefined;
  href: string | undefined;
  date: string | undefined;
}

export interface MirrorLinkQuality {
  quality: "360p" | "480p" | "720p";
  mirror: string;
}
