import { useEffect, useState } from "react";
import axios from "axios";
import Scrapper from "./Scrapper/Scrapper";
import Cheerio from "cheerio";

function App() {
  const [scrape, setScrape] = useState("");
  const [toDoScrapeList, setToDoScrapeList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setToDoScrapeList((s) => [...s, { url: scrape, type: isChecked }]);

    setScrape("");
    setIsChecked(false);
  };

  // useEffect(() => {
  //   const list = [
  //     {
  //       title: "S1-E1 Enter: Naruto Uzumaki!",
  //       link: "https://toonime.co/?trembed=0&trid=2602&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/aGKZirZsUhyhnLG4nNwHGvNcuZ0.jpg",
  //     },
  //     {
  //       title: "S1-E2 My Name is Konohamaru!",
  //       link: "https://toonime.co/?trembed=0&trid=2603&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/An7cmBwndUCkLrtDEFUb9AH1IM1.jpg",
  //     },
  //     {
  //       title: "S1-E3 Sasuke and Sakura: Friends or Foes?",
  //       link: "https://toonime.co/?trembed=0&trid=2604&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/u6S0A3rWqJnYy3yIfa9Ku6ojdT8.jpg",
  //     },
  //     {
  //       title: "S1-E4 Pass or Fail: Survival Test",
  //       link: "https://toonime.co/?trembed=0&trid=2605&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/524wMSgTQYI12nLfEVprLh1LhUG.jpg",
  //     },
  //     {
  //       title: "S1-E5 You Failed! Kakashi's Final Decision",
  //       link: "https://toonime.co/?trembed=0&trid=2606&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/4TyGt6BsvFJM6JcQ8Q8Xpar2P5t.jpg",
  //     },
  //     {
  //       title: "S1-E6 A Dangerous Mission! Journey to the Land of Waves!",
  //       link: "https://toonime.co/?trembed=0&trid=2607&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/pom3t5OcbaqpOc88W1OOAZmxD2Q.jpg",
  //     },
  //     {
  //       title: "S1-E7 The Assassin of the Mist!",
  //       link: "https://toonime.co/?trembed=0&trid=2608&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/dWTdxp5PSj3xWZyY631C22gDGus.jpg",
  //     },
  //     {
  //       title: "S1-E8 The Oath of Pain",
  //       link: "https://toonime.co/?trembed=0&trid=2609&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/ur0LXfk9hIwmedBkg7MmxvcS87t.jpg",
  //     },
  //     {
  //       title: "S1-E9 Kakashi: Sharingan Warrior",
  //       link: "https://toonime.co/?trembed=0&trid=2610&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/2KRDqL0QJmf14U8Z4Ad6rKavmt.jpg",
  //     },
  //     {
  //       title: "S1-E10 The Forest of Chakra",
  //       link: "https://toonime.co/?trembed=0&trid=2611&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/xkruJON9BZ2g15LWHyICp1X4o2T.jpg",
  //     },
  //     {
  //       title: "S1-E11 The Land Where a Hero Once Lived",
  //       link: "https://toonime.co/?trembed=0&trid=2612&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/3H0QFqV4OI4CBu3H3ETlNZ3msee.jpg",
  //     },
  //     {
  //       title: "S1-E12 Battle on the Bridge! Zabuza Returns!",
  //       link: "https://toonime.co/?trembed=0&trid=2613&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/2gJKIqshW9J1geY8zjK7iasQIKD.jpg",
  //     },
  //     {
  //       title: "S1-E13 Haku's Secret Jutsu: Crystal Ice Mirrors",
  //       link: "https://toonime.co/?trembed=0&trid=2614&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/hJkcZCTPQ582HOaJcXffNch2IfT.jpg",
  //     },
  //     {
  //       title:
  //         "S1-E14 The Number One Hyperactive, Knucklehead Ninja Joins the Fight!",
  //       link: "https://toonime.co/?trembed=0&trid=2615&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/pllWSA7MdhLRk4ltvXVBZQWEAZW.jpg",
  //     },
  //     {
  //       title: "S1-E15 Zero Visibility: The Sharingan Shatters",
  //       link: "https://toonime.co/?trembed=0&trid=2616&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/wnhKYdQSvzA70eLPRRy1B2rI4XR.jpg",
  //     },
  //     {
  //       title: "S1-E16 The Broken Seal",
  //       link: "https://toonime.co/?trembed=0&trid=2617&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/zZ0KPqgdUJk0QM74NTVyuEhTWld.jpg",
  //     },
  //     {
  //       title: "S1-E17 White Past: Hidden Ambition",
  //       link: "https://toonime.co/?trembed=0&trid=2618&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/6Lo44pNhQTVOnCK6NqLs7a1rPZR.jpg",
  //     },
  //     {
  //       title: "S1-E18 The Weapons Known as Shinobi",
  //       link: "https://toonime.co/?trembed=0&trid=2619&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/fYEwBi1k6NJihvGZK6FsLSQxp3c.jpg",
  //     },
  //     {
  //       title: "S1-E19 The Demon in the Snow",
  //       link: "https://toonime.co/?trembed=0&trid=2620&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/2jNhyg4PDIdslD2c7ko8cXdRIB8.jpg",
  //     },
  //     {
  //       title: "S1-E20 A New Chapter Begins: The Chūnin Exam!",
  //       link: "https://toonime.co/?trembed=0&trid=2621&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/gMTGsTB4FswEwhNKVklF238DXrI.jpg",
  //     },
  //     {
  //       title: "S1-E21 Identify Yourself: Powerful New Rivals",
  //       link: "https://toonime.co/?trembed=0&trid=2622&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/5QhNCyrzLmUgOZi9Uw7NrJFslbO.jpg",
  //     },
  //     {
  //       title: "S1-E22 Chūnin Challenge: Rock Lee vs. Sasuke!",
  //       link: "https://toonime.co/?trembed=0&trid=2623&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/yl7G1oml4LMbaAoaHCIAOMtXy8P.jpg",
  //     },
  //     {
  //       title: "S1-E23 Genin Takedown! All Nine Rookies Face Off!",
  //       link: "https://toonime.co/?trembed=0&trid=2624&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/5BkP2BQKN164lCdQx6B2nouLh8d.jpg",
  //     },
  //     {
  //       title: "S1-E24 Start Your Engines: The Chūnin Exam Begins!",
  //       link: "https://toonime.co/?trembed=0&trid=2625&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/oFI5SNIjH4npsThiBFdcMqAWv7s.jpg",
  //     },
  //     {
  //       title: "S1-E25 The Tenth Question: All or Nothing",
  //       link: "https://toonime.co/?trembed=0&trid=2626&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/ikJ0uZtbMKvGaVADjaRZ6PU1oCe.jpg",
  //     },
  //     {
  //       title: "S1-E26 Special Report: Live from the Forest of Death!",
  //       link: "https://toonime.co/?trembed=0&trid=2627&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/5tRGoA6ViiDbMx4YVPHQquOAQSq.jpg",
  //     },
  //     {
  //       title: "S1-E27 The Chunin Exam Stage 2: The Forest of Death",
  //       link: "https://toonime.co/?trembed=0&trid=2628&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/823NjtlBXBoWhiMKs9TmQGh9iif.jpg",
  //     },
  //     {
  //       title: "S1-E28 Eat or Be Eaten: Panic In the Forest",
  //       link: "https://toonime.co/?trembed=0&trid=2629&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/zQoJ4USCGKrjNB1zBSXkXhwmt7S.jpg",
  //     },
  //     {
  //       title: "S1-E29 Naruto's Counterattack: Never Give In!",
  //       link: "https://toonime.co/?trembed=0&trid=2630&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/olz0DRpDVjN3PdPbMZ7PEpJbPQz.jpg",
  //     },
  //     {
  //       title: "S1-E30 The Sharingan Revived: Dragon Flame Jutsu!",
  //       link: "https://toonime.co/?trembed=0&trid=2631&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/kYqu3kGsli1jUWqwhb3uxD7N8ct.jpg",
  //     },
  //     {
  //       title: "S1-E31 Bushy Brow's Pledge: Undying Love and Protection",
  //       link: "https://toonime.co/?trembed=0&trid=2632&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/tKWBu3Y7tudzaCyb9nNxYvKV9xo.jpg",
  //     },
  //     {
  //       title: "S1-E32 Sakura Blossoms!",
  //       link: "https://toonime.co/?trembed=0&trid=2633&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/amFmogYOGOzUOyrxHiwgaBkLvey.jpg",
  //     },
  //     {
  //       title: "S1-E33 Battle Formation: Ino-Shika-Cho!",
  //       link: "https://toonime.co/?trembed=0&trid=2634&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/18qJv8GEXecImJ1kjQwWxRe7bnO.jpg",
  //     },
  //     {
  //       title: "S1-E34 Akamaru Trembles: Gaara's Cruel Strength!",
  //       link: "https://toonime.co/?trembed=0&trid=2635&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/8JOvkicNPGVfcxaNIfRIrEkjvP5.jpg",
  //     },
  //     {
  //       title: "S1-E35 The Scroll's Secret: No Peeking Allowed",
  //       link: "https://toonime.co/?trembed=0&trid=2636&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/swNES8ueaQRCN31j5sWpkjMNbcL.jpg",
  //     },
  //     {
  //       title: "S1-E36 Clone vs. Clone: Mine are Better than Yours!",
  //       link: "https://toonime.co/?trembed=0&trid=2637&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/rRSZkP719SdZLHWPDg7E9qfUXS6.jpg",
  //     },
  //     {
  //       title: "S1-E37 Surviving the Cut! The Rookie Nine Together Again!",
  //       link: "https://toonime.co/?trembed=0&trid=2638&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/d4OoTUTlANl6E4bXAvWpXCzspl5.jpg",
  //     },
  //     {
  //       title: "S1-E38 Narrowing the Field: Sudden Death Elimination!",
  //       link: "https://toonime.co/?trembed=0&trid=2639&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/zB7GqOH2QmeuarWagxNNufiDj2C.jpg",
  //     },
  //     {
  //       title: "S1-E39 Bushy Brow's Jealousy - Lions Barrage Unleashed!",
  //       link: "https://toonime.co/?trembed=0&trid=2640&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/mGI0kJ19cnC5fXIyYOiJEhXmwFS.jpg",
  //     },
  //     {
  //       title: "S1-E40 Kakashi and Orochimaru: Face-to-Face!",
  //       link: "https://toonime.co/?trembed=0&trid=2641&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/qRJKB3YLm8nTW8eFJ1XcAbn44m6.jpg",
  //     },
  //     {
  //       title: "S1-E41 Kunoichi Rumble: The Rivals Get Serious!",
  //       link: "https://toonime.co/?trembed=0&trid=2642&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/dhWMDZGRuIBOk3YBNqkv7GM8E44.jpg",
  //     },
  //     {
  //       title: "S1-E42 The Ultimate Battle: Cha!",
  //       link: "https://toonime.co/?trembed=0&trid=2643&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/heMYLTGlUZZoeB5seJCN33YKXwf.jpg",
  //     },
  //     {
  //       title: "S1-E43 Killer Kunoichi and a Shaky Shikamaru",
  //       link: "https://toonime.co/?trembed=0&trid=2644&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/hARqbBIZUPD7u6IC9F6Cu8g7mS0.jpg",
  //     },
  //     {
  //       title: "S1-E44 Akamaru Unleashed! Who's Top Dog Now?",
  //       link: "https://toonime.co/?trembed=0&trid=2645&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/dHUlt8NgugAdHHYPqrFZiCEWHxk.jpg",
  //     },
  //     {
  //       title: "S1-E45 Surprise Attack! Naruto's Secret Weapon!",
  //       link: "https://toonime.co/?trembed=0&trid=2646&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/viyNwCuD9XTlSfquJ4c53Iy1wg.jpg",
  //     },
  //     {
  //       title: "S1-E46 Byakugan Battle: Hinata Grows Bold!",
  //       link: "https://toonime.co/?trembed=0&trid=2647&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/x5hkt2tdBrKYPIvYBl6vXRZB4lh.jpg",
  //     },
  //     {
  //       title: "S1-E47 A Failure Stands Tall!",
  //       link: "https://toonime.co/?trembed=0&trid=2648&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/rSmAS1OrFwFkGAlX4QIqnIZQlaM.jpg",
  //     },
  //     {
  //       title: "S1-E48 Gaara vs. Rock Lee: The Power of Youth Explodes!",
  //       link: "https://toonime.co/?trembed=0&trid=2649&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/65fsaKc0mpF5jtnK2tfXTzhQJbS.jpg",
  //     },
  //     {
  //       title: "S1-E49 Lee's Hidden Strength: Forbidden Secret Jutsu!",
  //       link: "https://toonime.co/?trembed=0&trid=2650&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/6Np6fEG5LWnDtgWFgY3g8fHnuLr.jpg",
  //     },
  //     {
  //       title: "S1-E50 The Fifth Gate: A Splendid Ninja is Born",
  //       link: "https://toonime.co/?trembed=0&trid=2651&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/7g9TWSzlkyPNWxZ8FXdcB8ghvg3.jpg",
  //     },
  //     {
  //       title: "S1-E51 A Shadow in the Darkness: Danger Approaches Sasuke",
  //       link: "https://toonime.co/?trembed=0&trid=2652&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/ikjkLesJtOagkDz2TstjEOmzDz5.jpg",
  //     },
  //     {
  //       title: "S1-E52 Ebisu Returns: Naruto's Toughest Training Yet!",
  //       link: "https://toonime.co/?trembed=0&trid=2653&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/o33WNqmy81CX1QaHXpYl5oQVGE4.jpg",
  //     },
  //     {
  //       title: "S2-E53 Long Time No See: Jiraiya Returns!",
  //       link: "https://toonime.co/?trembed=0&trid=2654&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/liZQfaq7586PFWzUQOWP66uhaQa.jpg",
  //     },
  //     {
  //       title: "S2-E54 Summoning Jutsu; Wisdom of the Toad Sage!",
  //       link: "https://toonime.co/?trembed=0&trid=2655&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/tRBCtTLpqL1QM0qjFqHv9IaFf0b.jpg",
  //     },
  //     {
  //       title: "S2-E55 A Feeling of Yearning, A Flower Full of Hope",
  //       link: "https://toonime.co/?trembed=0&trid=2656&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/sjKHx6WGOSKPBaXXD37urHtM0P8.jpg",
  //     },
  //     {
  //       title: "S2-E56 Live or Die: Risk It All to Win It All!",
  //       link: "https://toonime.co/?trembed=0&trid=2657&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/976MdzMdSG4ShXSN0skbMiCjpu6.jpg",
  //     },
  //     {
  //       title: "S2-E57 He Flies! He Jumps! He Lurks! Chief Toad Appears!",
  //       link: "https://toonime.co/?trembed=0&trid=2658&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/sccDrqN8edZc0oytGk3lL1Dw42Z.jpg",
  //     },
  //     {
  //       title: "S2-E58 Hospital Besieged: The Evil Hand Revealed!",
  //       link: "https://toonime.co/?trembed=0&trid=2659&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/auqYKNw9C7TB2OLA4WsliEvzE9y.jpg",
  //     },
  //     {
  //       title: "S2-E59 The Final Rounds: Rush to the Battle Arena!",
  //       link: "https://toonime.co/?trembed=0&trid=2660&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/uevn3idCLi3L5P8v7NXGIYLKO8K.jpg",
  //     },
  //     {
  //       title: "S2-E60 Byakugan vs. Shadow Clone Jutsu!",
  //       link: "https://toonime.co/?trembed=0&trid=2661&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/5LJgiFpfg3gZZ0NF2WNfdZAOrvD.jpg",
  //     },
  //     {
  //       title: "S2-E61 Ultimate Defense: Zero Blind Spot!",
  //       link: "https://toonime.co/?trembed=0&trid=2662&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/ezO40tIm4qQockDtobxm6JkaIyc.jpg",
  //     },
  //     {
  //       title: "S2-E62 A Failure's True Power",
  //       link: "https://toonime.co/?trembed=0&trid=2663&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/uEjCr9zLwIUzltPSskxTjPyV0xP.jpg",
  //     },
  //     {
  //       title: "S2-E63 Hit It or Quit It: The Final Rounds Get Complicated!",
  //       link: "https://toonime.co/?trembed=0&trid=2664&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/eLYVyu39UzFCcVNrHlHpX6kE0Hi.jpg",
  //     },
  //     {
  //       title: "S2-E64 Zero Motivation: The Guy with Cloud Envy!",
  //       link: "https://toonime.co/?trembed=0&trid=2665&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/w2E0f8GsIB84CbGuHDcHFAOMGoK.jpg",
  //     },
  //     {
  //       title: "S2-E65 Dancing Leaf, Squirming Sand",
  //       link: "https://toonime.co/?trembed=0&trid=2666&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/a0UgCLqNtqXSW48iDKfahD0TaCX.jpg",
  //     },
  //     {
  //       title: "S2-E66 Bushy Brow's Jutsu: Sasuke Style!",
  //       link: "https://toonime.co/?trembed=0&trid=2667&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/eGKxx9qMAhYXkcuaKcJpTnZu9N0.jpg",
  //     },
  //     {
  //       title:
  //         "S2-E67 Late for the Show, But Ready to Go! The Ultimate Secret Technique is Born!",
  //       link: "https://toonime.co/?trembed=0&trid=2668&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/hDiyUmRwNNhSZTRwRpKyc1qIorg.jpg",
  //     },
  //     {
  //       title:
  //         "S2-E68 Zero Hour! The Destruction of the Hidden Leaf Village Begins!",
  //       link: "https://toonime.co/?trembed=0&trid=2669&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/3qu8jmQrWBnTLfYUyjZ9MWteJ4.jpg",
  //     },
  //     {
  //       title: "S2-E69 Village in Distress: A New A-Ranked Mission!",
  //       link: "https://toonime.co/?trembed=0&trid=2670&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/lehKhjgwcRp3RXTeojdov1HhFUp.jpg",
  //     },
  //     {
  //       title: "S2-E70 A Shirker's Call to Action: Layabout No More!",
  //       link: "https://toonime.co/?trembed=0&trid=2671&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/lDUpdL6XVkqLwKlsn7FexEwCsMp.jpg",
  //     },
  //     {
  //       title: "S2-E71 An Unrivaled Match: Hokage Battle Royale!",
  //       link: "https://toonime.co/?trembed=0&trid=2672&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/tc6lcWTEsmE7MgGLS4NY6puz1GC.jpg",
  //     },
  //     {
  //       title: "S2-E72 A Mistake from the Past: A Face Revealed!",
  //       link: "https://toonime.co/?trembed=0&trid=2673&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/8pL5Hu71BMvtT1SWgKrSmBMa3RQ.jpg",
  //     },
  //     {
  //       title: "S2-E73 Forbidden Secret Technique: Reaper Death Seal!",
  //       link: "https://toonime.co/?trembed=0&trid=2674&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/2JtOjeCL4oYjTVTAGGO57WS1zmm.jpg",
  //     },
  //     {
  //       title: "S2-E74 Astonishing Truth! Gaara's Identity Emerges!",
  //       link: "https://toonime.co/?trembed=0&trid=2675&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/jCVtmenpDZJIkibWEyLG180NB4J.jpg",
  //     },
  //     {
  //       title: "S2-E75 Sasuke's Decision: Pushed to the Edge!",
  //       link: "https://toonime.co/?trembed=0&trid=2676&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/2hh9gMO3rgso4pPEQyjncf8nVo.jpg",
  //     },
  //     {
  //       title: "S2-E76 Assassin of the Moonlit Night",
  //       link: "https://toonime.co/?trembed=0&trid=2677&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/xZMvh7I6f8YlHJuFsoHx7oCO5vd.jpg",
  //     },
  //     {
  //       title: "S2-E77 Light vs. Dark: The Two Faces of Gaara",
  //       link: "https://toonime.co/?trembed=0&trid=2678&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/tna8zEk2RxXCwC60Eo8dVmOOMbF.jpg",
  //     },
  //     {
  //       title: "S2-E78 Naruto's Ninja Handbook",
  //       link: "https://toonime.co/?trembed=0&trid=2679&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/pk5HbikgThat8I90pQbsba91rCo.jpg",
  //     },
  //     {
  //       title: "S2-E79 Beyond the Limit of Darkness and Light",
  //       link: "https://toonime.co/?trembed=0&trid=2680&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/g35MjCdgOn7uZu5kmD7wIbOlf7i.jpg",
  //     },
  //     {
  //       title: "S2-E80 The Third Hokage, Forever...",
  //       link: "https://toonime.co/?trembed=0&trid=2681&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/ccH62bJFb1vRZzkdeEhue8xr14X.jpg",
  //     },
  //     {
  //       title: "S2-E81 Return of the Morning Mist",
  //       link: "https://toonime.co/?trembed=0&trid=2682&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/eYiHWyCJ5PYONaDDOo8dFGvNd8u.jpg",
  //     },
  //     {
  //       title: "S2-E82 Eye to Eye: Sharingan vs. Sharingan!",
  //       link: "https://toonime.co/?trembed=0&trid=2683&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/zkPMcBvoOOqt9BLBxFvBKeadz2D.jpg",
  //     },
  //     {
  //       title: "S2-E83 Jiraiya: Naruto's Potential Disaster!",
  //       link: "https://toonime.co/?trembed=0&trid=2684&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/tYS5IxDUNfBY5426wa6LMmwvbDU.jpg",
  //     },
  //     {
  //       title: "S2-E84 Roar, Chidori! Brother vs. Brother!",
  //       link: "https://toonime.co/?trembed=0&trid=2685&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/ruYl7Jlzr0O3QXEeDCxhrUT6lzT.jpg",
  //     },
  //     {
  //       title: "S2-E85 Hate Among the Uchihas: The Last of the Clan",
  //       link: "https://toonime.co/?trembed=0&trid=2686&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/fkqOnWbZ5ZVKrtQSuHBPgSqvYYD.jpg",
  //     },
  //     {
  //       title: "S2-E86 A New Training Begins: I Will Be Strong",
  //       link: "https://toonime.co/?trembed=0&trid=2687&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/bFMjuyZSAirAMreg27dEGXT8rLb.jpg",
  //     },
  //     {
  //       title: "S2-E87 Keep on Training: Pop Goes the Water Balloon!",
  //       link: "https://toonime.co/?trembed=0&trid=2688&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/uPQZtV2nUxGTVDzRncGKJAcLJ5V.jpg",
  //     },
  //     {
  //       title: "S2-E88 Focal Point: The Mark of the Leaf",
  //       link: "https://toonime.co/?trembed=0&trid=2689&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/fzkz8JsgNk7CdwsHwatQzPmZMRx.jpg",
  //     },
  //     {
  //       title: "S2-E89 An Impossible Choice: The Pain Within Tsunade's Heart",
  //       link: "https://toonime.co/?trembed=0&trid=2690&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/s6FC2pErisCHEN23RZlX896IRnG.jpg",
  //     },
  //     {
  //       title: "S2-E90 Unforgivable! A Total Lack of Respect!",
  //       link: "https://toonime.co/?trembed=0&trid=2691&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/tnPay2fEbu8Q4yitWmuqKq0tJ82.jpg",
  //     },
  //     {
  //       title: "S2-E91 Inheritance! The Necklace of Death!",
  //       link: "https://toonime.co/?trembed=0&trid=2692&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/1iYSxHgCTGXRZiGuPXXZM7lgd7F.jpg",
  //     },
  //     {
  //       title: "S2-E92 A Dubious Offer! Tsunade's Choice!",
  //       link: "https://toonime.co/?trembed=0&trid=2693&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/pEgH5y7xFzOppNgmgCSvuyCcRhT.jpg",
  //     },
  //     {
  //       title: "S2-E93 Breakdown! The Deal is Off!",
  //       link: "https://toonime.co/?trembed=0&trid=2694&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/8i1309JvQIDOSNIYlHnFQ6xHgKk.jpg",
  //     },
  //     {
  //       title: "S2-E94 Attack! Fury of the Rasengan!",
  //       link: "https://toonime.co/?trembed=0&trid=2695&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/nakaRlSwWQcrhdVJT44gM3jctqe.jpg",
  //     },
  //     {
  //       title: "S2-E95 The Fifth Hokage! A Life on the Line!",
  //       link: "https://toonime.co/?trembed=0&trid=2696&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/rrD1pF8nvaWmGJ0rz9sB9HWL9QG.jpg",
  //     },
  //     {
  //       title: "S2-E96 Deadlock! Sannin Showdown!",
  //       link: "https://toonime.co/?trembed=0&trid=2697&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/78QTjNEQKzPFFLPn2PDPFwHFRvE.jpg",
  //     },
  //     {
  //       title: "S2-E97 Kidnapped! Naruto's Hot Spring Adventure!",
  //       link: "https://toonime.co/?trembed=0&trid=2698&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/8RKq7ogmJDIFHn08epFqOYgXEOt.jpg",
  //     },
  //     {
  //       title: "S2-E98 Tsunade's Warning: Ninja No More!",
  //       link: "https://toonime.co/?trembed=0&trid=2699&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/73hfH2kqz8fbiukLstre7jaLY1K.jpg",
  //     },
  //     {
  //       title: "S2-E99 The Will of Fire Still Burns!",
  //       link: "https://toonime.co/?trembed=0&trid=2700&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/xv0tiSAD6XeozNAnxaYh2z6R906.jpg",
  //     },
  //     {
  //       title: "S2-E100 Sensei and Student: The Bond of a Shinobi!",
  //       link: "https://toonime.co/?trembed=0&trid=2701&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/y235pon47SLGEs4mQhF8MFCjghF.jpg",
  //     },
  //     {
  //       title: "S2-E101 Gotta See! Gotta Know! Kakashi-Sensei's True Face!",
  //       link: "https://toonime.co/?trembed=0&trid=2702&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/e9E7EmzkqdGSqKXrJkkZD30C1oW.jpg",
  //     },
  //     {
  //       title: "S2-E102 Mission: Help an Old Friend in the Land of Tea",
  //       link: "https://toonime.co/?trembed=0&trid=2703&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/NG5sNIZnLIgFDyYPC2ZJF0UFvw.jpg",
  //     },
  //     {
  //       title: "S2-E103 The Race is On! Trouble on the High Seas!",
  //       link: "https://toonime.co/?trembed=0&trid=2704&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/go21jy2LeBC1Am2NA8sPzPg5TCs.jpg",
  //     },
  //     {
  //       title: "S2-E104 Run Idate, Run! Nagi Island Awaits!",
  //       link: "https://toonime.co/?trembed=0&trid=2705&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/t7LQfVLw2T4yXVrCx3p0JecPhQQ.jpg",
  //     },
  //     {
  //       title: "S3-E105 A Fierce Battle of Rolling Thunder!",
  //       link: "https://toonime.co/?trembed=0&trid=2706&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/sR4LUFY0P0gBAeRZGzyUvy4WCvV.jpg",
  //     },
  //     {
  //       title: "S3-E106 The Last Leg: A Final Act of Desperation",
  //       link: "https://toonime.co/?trembed=0&trid=2707&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/oQh0xD5ILEP9o5bvXSy9ffV34fV.jpg",
  //     },
  //     {
  //       title: "S3-E107 The Battle Begins: Naruto vs. Sasuke",
  //       link: "https://toonime.co/?trembed=0&trid=2708&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/zH8HPeJEOoykvVDm0ZUxryiOP7L.jpg",
  //     },
  //     {
  //       title: "S3-E108 Bitter Rivals and Broken Bonds",
  //       link: "https://toonime.co/?trembed=0&trid=2709&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/lQ1exwyGdT4HwkaE6QH4rb0EHsv.jpg",
  //     },
  //     {
  //       title: "S3-E109 An Invitation from the Sound",
  //       link: "https://toonime.co/?trembed=0&trid=2710&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/h0FjVL2jozTwJYsznTxmxOBpKWs.jpg",
  //     },
  //     {
  //       title: "S3-E110 Formation! The Sasuke Retrieval Squad",
  //       link: "https://toonime.co/?trembed=0&trid=2711&trtype=2",
  //       img: "https://image.tmdb.org/t/p/w185/6SDtR2UBREObXl5vaqB0hwEwbQo.jpg",
  //     },
  //   ];

  //   // async function test() {
  //   //   const newList = [];

  //   //   const response = await axios.get("https://toonime.co/series/naruto/");
  //   //   const scrapper = new Scrapper();
  //   //   const episodeList = await scrapper.GenerateEpisodeList(response.data);

  //   //   console.log("epi", episodeList);

  //   //   for (let i = 0; i < episodeList.length; i++) {
  //   //     newList.push({
  //   //       ...list[i],
  //   //       title: episodeList[i].title,
  //   //       episodeNumber: episodeList[i].episodeNumber,
  //   //     });
  //   //   }

  //   //   const blob = new Blob([JSON.stringify(newList)], {
  //   //     type: "application/json",
  //   //   });
  //   //   const url = URL.createObjectURL(blob);

  //   //   const link = document.createElement("a");
  //   //   link.href = url;
  //   //   link.download = "episode.json";
  //   //   document.body.appendChild(link);
  //   //   link.click();
  //   //   document.body.removeChild(link);
  //   //   // const anime = await scrapper.GetAnime(response.data);
  //   // }
  //   // test();

  //   // const html = `<div><span>not me</span> hello there</div>`;
  //   // const $ = Cheerio.load(html);

  //   // const divText = $("div")
  //   //   .clone()
  //   //   .children("span")
  //   //   .remove()
  //   //   .end()
  //   //   .text()
  //   //   .trim();

  //   // console.log(divText);
  // }, []);

  const onScrape = async () => {
    if (isloading) return;

    setIsLoading(true);
    const animeList = [];

    for (let animeLink of toDoScrapeList) {
      if (animeLink.type) {
        const response = await axios.get(animeLink?.url);
        const scrapper = new Scrapper();
        const anime = await scrapper.GetAnime(response.data);
        const episode = await scrapper.getMovieStreamLink(response.data);

        const res = await axios.get(episode.link);
        const epi = await scrapper.getMovieStreamLink(res.data);

        const animeObj = {
          ...anime,
          type: "movie",
          episodes: epi,
        };
        animeList.push(animeObj);
      } else {
        const response = await axios.get(animeLink?.url);
        const scrapper = new Scrapper();
        const anime = await scrapper.GetAnime(response.data);
        const episodeList = await scrapper.GenerateEpisodeList(response.data);
        const modifiedEpilist = [];

        if (episodeList instanceof Array) {
          for (let epi of episodeList) {
            const res = await axios.get(epi.link);
            const newEpi = await scrapper.convertEpisodeIntoStreamLink(
              res.data,
              epi
            );
            const res2 = await axios.get(newEpi.link);
            const newEpi2 = await scrapper.convertEpisodeIntoStreamLink(
              res2.data,
              epi
            );

            modifiedEpilist.push(newEpi2);
          }
        }

        const animeObj = {
          ...anime,
          type: "series",
          episodes: modifiedEpilist,
        };
        animeList.push(animeObj);
      }
    }

    const blob = new Blob([JSON.stringify(animeList)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "anime.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsLoading(false);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        border: "1px solid green",
      }}
    >
      <div
        style={{
          border: "1px solid red",
          display: "flex",
          flexDirection: "column",
          padding: "8px",
        }}
      >
        <div>
          <form onSubmit={onSubmit}>
            <label>
              Name:
              <input
                name="search"
                type="text"
                value={scrape}
                onChange={(e) => setScrape(e.target.value)}
              />
            </label>

            <label>
              Movie:
              <input
                name="movie"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button onClick={onScrape}>Scrape</button>
        </div>
      </div>
      {isloading ? "scrapping....." : ""}
      <div>
        {toDoScrapeList.map((m, i) => {
          console.log(m);
          return (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  padding: "4px 8px",
                }}
              >
                {i}
              </span>{" "}
              <span
                style={{
                  flex: 1,
                }}
              >
                {m?.url} {"("} {m?.type ? "Movie" : "series"} {")"}
              </span>
              <button
                style={{
                  padding: "4px 8px",
                }}
                onClick={() => {
                  setToDoScrapeList((s) => s.filter((f, ii) => ii !== i));
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
