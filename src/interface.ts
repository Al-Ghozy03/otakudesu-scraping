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

export interface LinkQuality {
  quality: string;
  mirror: string;
  link: string | undefined;
}
