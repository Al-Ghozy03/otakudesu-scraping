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

export interface GenreAnime {
  title: string | undefined;
  studio: string | undefined;
  episode: string | undefined;
  rating: string | undefined;
  href: string | undefined;
  thumbnail: string | undefined;
}
