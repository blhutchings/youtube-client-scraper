import YouTube from "./YouTube.js";
import YouTubeGotClient from "./clients/YouTubeGotClient.js";
export { YouTube, YouTubeGotClient }

const yt = new YouTube(await YouTubeGotClient.createClient());
const res = await yt.game({browseId: "UCQvWX73GQygcwXOTSf_VDVg", tab: "home"});
console.log(res)