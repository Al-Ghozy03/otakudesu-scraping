export interface Anime {
  title: string | undefined;
  href: string | undefined;
  episode: string | undefined;
  thumbnail: string | undefined;
  date: string | undefined;
}

export interface Episode {
  title: string | undefined;
  href: string | undefined;
  date: string | undefined;
}

export interface LinkQuality {
  quality: string;
  mirror: string;
  link: string | undefined;
}

export interface Genre {
  title: string;
  href: string | undefined;
}
