import { Request, Response } from "express";
import { AxiosService } from "./helper";
import cheerio from "cheerio";
import {
  AnimeInterface,
  EpisodeInterface,
  MirrorLinkQuality,
} from "./interface";
import puppeteer, { Page, PuppeteerNode } from "puppeteer";
const baseUrl: string = "https://otakudesu.cam";
class BaseController {
  success(res: Response, data: any) {
    return res.status(200).json({ message: "success", data });
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
      const animeList: AnimeInterface[] = [];
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

      return super.success(res, animeList);
    } catch (er) {
      return super.error(res, 500, er);
    }
  }

  async detail(req: Request, res: Response) {
    try {
      const { href } = req.params;
      const episodeList: EpisodeInterface[] = [];
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
      const mirrorLinkQuality: MirrorLinkQuality[] = [];

      // TODO: get mirror quality
      element.find(".mirrorstream > ul.m360p").each((i, v) => {
        $(v)
          .find("li")
          .each((j, val) => {
            mirrorLinkQuality.push({
              mirror: $(val).find("a").text().trim(),
              quality: "360p",
            });
          });
      });
      element.find(".mirrorstream > ul.m480p").each((i, v) => {
        $(v)
          .find("li")
          .each((j, val) => {
            mirrorLinkQuality.push({
              mirror: $(val).find("a").text().trim(),
              quality: "480p",
            });
          });
      });

      element.find(".mirrorstream > ul.m720p").each((i, v) => {
        $(v)
          .find("li")
          .each((j, val) => {
            mirrorLinkQuality.push({
              mirror: $(val).find("a").text().trim(),
              quality: "720p",
            });
          });
      });

      return super.success(res, {
        title: element.find(".venutama > h1").text().trim(),
        default_embeded_player: element
          .find(".responsive-embed-stream > iframe")
          .attr("src"),
        mirror: {
          m360p: mirrorLinkQuality.filter((v) => v.quality === "360p"),
          m480p: mirrorLinkQuality.filter((v) => v.quality === "480p"),
          m720p: mirrorLinkQuality.filter((v) => v.quality === "720p"),
        },
      });
    } catch (er) {
      console.log(er);

      return super.error(res, 500, er);
    }
  }
}

export default new Controller();
