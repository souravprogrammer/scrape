import headers from "./MyAxios";
import axios from "axios";
import Cheerio from "cheerio";
class Scrapper {
  constructor() {}

  async GetAnime(data) {
    const $ = await Cheerio.load(data);

    const catgory = [];
    $("span.categories a").each((index, el) => {
      catgory.push($(el).text());
    });

    const anime = {
      title: $("h1.entry-title").text(),
      description: $("div.entry-content p").text(),
      genres: catgory,
      duration: $("header div.entry-meta span.duration").text(),
      rating: $("header div.entry-meta span.rating span").text(),
      image: $("div.post-thumbnail img").attr("data-lazy-src"),
      airedOn: $("span.date").text(),
    };
    return anime;
  }
  async GenerateEpisodeList(data) {
    const list = [];
    const $ = await Cheerio.load(data);
    const html = $("ul.seasons-lst");

    // For Episode list
    html.each(function (i, el) {
      const li = $("li", el);

      // const divText = $("div")
      //   .clone()
      //   .children("span")
      //   .remove()
      //   .end()
      //   .text()
      //   .trim();

      li.each(function (index, Li) {
        const title = $("h3.title", Li)
          .clone()
          .children("span")
          .remove()
          .end()
          .text()
          .trim();
        list.push({
          title: title,
          number: index,
          episodeNumber: $("h3.title span", Li).text(),
          link: $("a", Li).attr("href"),
          img: $("img", Li).attr("data-lazy-src"),
        });
      });
    });
    return list;
  }
  async convertEpisodeIntoStreamLink(data, epi) {
    const $ = await Cheerio.load(data);
    const link = $("iframe").attr("src");

    return { ...epi, link: link };
  }

  async getMovieStreamLink(data) {
    const $ = await Cheerio.load(data);
    const link = $("iframe").attr("src");

    return { link: link };
  }
}

export default Scrapper;
