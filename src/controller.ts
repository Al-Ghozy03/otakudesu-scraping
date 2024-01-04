import { Request, Response } from "express";
import { AxiosService } from "./helper";
import cheerio from "cheerio";
import {
  Anime,
  Episode,
  Genre,
  GenreAnime,
  LinkQuality,
  ReleaseAnime,
  ReleaseDay,
} from "./interface";

const baseUrl: string = "https://otakudesu.cam";
class BaseController {
  success(
    res: Response,
    data: any,
    current_page?: number,
    total_pages?: number
  ) {
    return res.status(200).json({
      message: "success",
      ...(current_page && { current_page }),
      ...(total_pages && { total_pages }),
      data,
    });
  }
  error(res: Response, code: number, message: any) {
    return res.status(code).json({ message });
  }
}

class Controller extends BaseController {
  async root(req: Request, res: Response) {
    return res.json({
      message: "welcome",
    });
  }
  async onGoing(req: Request, res: Response) {
    try {
      const { page } = req.query;
      const animeList: Anime[] = [];
      const response = await AxiosService(
        `${baseUrl}/ongoing-anime/page/${page ?? 1}`
      );
      const $ = cheerio.load(response.data);
      const element = $(
        "body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .rseries > .rapi > .venz > ul > li"
      );
      element.each((i, v) => {
        const data = $(v);
        const href = data.find(".detpost > .thumb > a").attr("href");
        const date = data.find(".detpost > .newnime").text().trim();
        const episode = data.find(".detpost > .epz:nth-child(1)").text().trim();
        const title = data
          .find(".detpost > .thumb > a > .thumbz > h2")
          .text()
          .trim();
        const thumbnail = data
          .find(".detpost > .thumb > a > .thumbz > img")
          .attr("src");
        animeList.push({
          href: href?.replace(`${baseUrl}/anime`, ""),
          title,
          thumbnail,
          date,
          episode,
        });
      });
      const totalPages: number[] = [0];
      const pagination = $(
        "body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .pagination > .pagenavix > a"
      );
      pagination.each((i, v) => {
        const data = $(v);
        totalPages.push(Number(data.text().trim()));
      });

      return super.success(
        res,
        animeList,
        Number(page),
        totalPages.filter((v) => !Number.isNaN(v)).reverse()[0]
      );
    } catch (er) {
      return super.error(res, 500, er);
    }
  }
  async complete(req: Request, res: Response) {
    try {
      const { page } = req.query;
      const animeList: Anime[] = [];
      const response = await AxiosService(
        `${baseUrl}/complete-anime/page/${page ?? 1}`
      );
      const $ = cheerio.load(response.data);
      const element = $(
        "body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .rseries > .rapi > .venz > ul > li"
      );
      element.each((i, v) => {
        const data = $(v);
        const href = data.find(".detpost > .thumb > a").attr("href");
        const date = data.find(".detpost > .newnime").text().trim();
        const episode = data.find(".detpost > .epz:nth-child(1)").text().trim();
        const title = data
          .find(".detpost > .thumb > a > .thumbz > h2")
          .text()
          .trim();
        const thumbnail = data
          .find(".detpost > .thumb > a > .thumbz > img")
          .attr("src");
        animeList.push({
          href: href?.replace(`${baseUrl}/anime`, ""),
          title,
          thumbnail,
          date,
          episode,
        });
      });

      const totalPages: number[] = [0];
      const pagination = $(
        "body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .pagination > .pagenavix > a"
      );
      pagination.each((i, v) => {
        const data = $(v);
        totalPages.push(Number(data.text().trim()));
      });

      return super.success(
        res,
        animeList,
        Number(page),
        totalPages.filter((v) => !Number.isNaN(v)).reverse()[0]
      );
    } catch (er) {
      return super.error(res, 500, er);
    }
  }
  async detail(req: Request, res: Response) {
    try {
      const { href } = req.params;
      const episodeList: Episode[] = [];
      const response = await AxiosService(`${baseUrl}/anime/${href}`);
      const $ = cheerio.load(response.data);
      const element = $("body > .wowmaskot > #venkonten > .venser");

      element.find(".episodelist > ul > li").each((i, v) => {
        const data = $(v);
        const title = data.find("span > a").text().trim();
        const href = data.find("span > a").attr("href");
        const date = data.find("span:nth-child(2)").text().trim();
        episodeList.push({
          title,
          href: href?.replace(`${baseUrl}/episode`, ""),
          date,
        });
      });

      return super.success(res, {
        title: element.find(".jdlrx > h1").text().trim(),
        rating: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(3)")
          .text()
          .replace("Skor:", "")
          .trim(),
        producer: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(4)")
          .text()
          .replace("Produser:", "")
          .trim(),
        type: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(5)")
          .text()
          .replace("Tipe:", "")
          .trim(),
        status: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(6)")
          .text()
          .replace("Status:", "")
          .trim(),
        total_episodes: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(7)")
          .text()
          .replace("Total Episode:", "")
          .trim(),
        duration: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(8)")
          .text()
          .replace("Durasi:", "")
          .trim(),
        release_date: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(9)")
          .text()
          .replace("Tanggal Rilis:", "")
          .trim(),
        studio: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(10)")
          .text()
          .replace("Studio:", "")
          .trim(),
        genre: element
          .find(".fotoanime > .infozin > .infozingle > p:nth-child(11)")
          .text()
          .replace("Genre:", "")
          .trim(),
        thumbnail: element.find(".fotoanime > img").attr("src"),
        episode: episodeList,
      });
    } catch (er) {
      console.log(er);

      return super.error(res, 500, er);
    }
  }
  async watch(req: Request, res: Response) {
    try {
      const { href } = req.params;
      const response = await AxiosService(`${baseUrl}/episode/${href}`);
      const $ = cheerio.load(response.data);
      const element = $("body > .wowmaskot > #venkonten > .venser");
      const downloadLinkQuality: LinkQuality[] = [];

      // TODO: get mirror quality
      element.find(".download > ul > li").each((i, v) => {
        const data = $(v);
        downloadLinkQuality.push({
          mirror: data.find("a").text().trim(),
          quality: data.find("strong").text().trim(),
          link: data.find("a").attr("href"),
        });
      });
      return super.success(res, {
        title: element.find(".venutama > h1").text().trim(),
        default_embeded_player: element
          .find(".responsive-embed-stream > iframe")
          .attr("src"),
        download_link: downloadLinkQuality,
      });
    } catch (er) {
      console.log(er);
      return super.error(res, 500, er);
    }
  }
  async genre(req: Request, res: Response) {
    try {
      const response = await AxiosService(`${baseUrl}/genre-list`);
      const $ = cheerio.load(response.data);
      const element = $("ul.genres > li > a");

      const genre: Genre[] = [];
      element.each((i, v) => {
        const data = $(v);
        genre.push({
          title: data.text().trim(),
          href: data.attr("href")?.replace("/genres", ""),
        });
      });
      return super.success(res, genre);
    } catch (er) {
      console.log(er);
      return super.error(res, 500, er);
    }
  }
  async genreDetail(req: Request, res: Response) {
    try {
      const { href } = req.params;
      const { page } = req.query;
      const animeList: GenreAnime[] = [];
      const response = await AxiosService(
        `${baseUrl}/genres/${href}/page/${page ?? 1}`
      );
      const $ = cheerio.load(response.data);
      const element = $(
        "body > .wowmaskot > #venkonten > .vezone > .venser > .page"
      );

      element.find(".col-md-4").each((i, v) => {
        const data = $(v).find(".col-anime");
        const title = data.find(".col-anime-title > a").text().trim();
        const studio = data.find(".col-anime-studio").text().trim();
        const episode = data.find(".col-anime-eps").text().trim();
        const rating = data.find(".col-anime-rating").text().trim();
        const href = data
          .find(".col-anime-title > a")
          .attr("href")
          ?.replace(`${baseUrl}/anime`, "");

        const thumbnail = data.find(".col-anime-cover > img").attr("src");
        animeList.push({ title, studio, episode, rating, href, thumbnail });
      });

      const totalPages: number[] = [0];
      const pagination = $(".pagination > .pagipagi > .pagenavix > a");
      pagination.each((i, v) => {
        const data = $(v);
        totalPages.push(Number(data.text().trim()));
      });

      return super.success(
        res,
        animeList,
        Number(page),
        totalPages.filter((v) => !Number.isNaN(v)).reverse()[0]
      );
    } catch (er) {
      console.log(er);
      return super.error(res, 500, er);
    }
  }
  async releaseSchedule(req: Request, res: Response) {
    try {
      const releaseDay: ReleaseDay[] = [];
      const anime: ReleaseAnime[] = [];
      const response = await AxiosService(`${baseUrl}/jadwal-rilis`);
      const $ = cheerio.load(response.data);
      const element = $(
        "body > .wowmaskot > #venkonten > .vezone > .venutama > .page > .kgjdwl321 > .kglist321"
      );

      element.each((i, v) => {
        const data = $(v);
        data.find("ul > li").each((j, val) => {
          const value = $(val).find("a");
          anime.push({
            day: data.find("h2").text().trim(),
            title: value.text().trim(),
            href: value.attr("href")?.replace(`${baseUrl}/anime`, ""),
          });
        });
        releaseDay.push({
          day: data.find("h2").text().trim(),
          release_anime: anime
            .filter((v) => v.day === data.find("h2").text().trim())
            .map(({ title, href }) => ({ title, href })),
        });
      });

      return super.success(res, releaseDay);
    } catch (er) {
      console.log(er);
      return super.error(res, 500, er);
    }
  }
  async search(req: Request, res: Response) {
    try {
      const { q } = req.query;
      if (!q) return super.error(res, 500, "q is required");
      const response = await AxiosService(`${baseUrl}?s=${q}&post_type=anime`);
      const $ = cheerio.load(response.data);
      const element = $(
        "body > .wowmaskot > #venkonten > .vezone > .venser > .venutama > .page > ul > li"
      );
      const animeList: Anime[] = [];
      const genreList: Genre[] = [];
      element.each((i, v) => {
        const data = $(v);
        const thumbnail = data.find("img").attr("src");
        const href = data
          .find("h2 > a")
          .attr("href")
          ?.replace(`${baseUrl}/anime`, "");
        const title = data.find("h2 > a").text().trim();
        const status = data
          .find(".set:nth-child(4)")
          .text()
          .replace("Status :", "")
          .trim();
        const rating = data
          .find(".set:nth-child(5)")
          .text()
          .replace("Rating :", "")
          .trim();

        animeList.push({
          title,
          href,
          thumbnail,
          genre: data
            .find(".set:nth-child(3)")
            .text()
            .replace("Genres : ", "")
            .trim(),
          status,
          rating,
        });
      });

      return super.success(res, animeList);
    } catch (er) {
      console.log(er);
      return super.error(res, 500, er);
    }
  }
}

export default new Controller();
