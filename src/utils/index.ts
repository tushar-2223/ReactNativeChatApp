import { Colors } from "./Colors";
import { Fonts, FontSize } from "./ThemeUtils";
import { String } from "./String";
import { Images } from "./Images";
import { REGEX, height, width,GOOGLE_WEB_API_KEY,storyData } from "./Constant";


const minAgo = (date: Date) => {
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = now - time;
    const min = diff / 1000 / 60;
    return `${Math.floor(min)} min ago`;
}

export {
    Fonts,
    FontSize,
    Colors,
    String,
    Images,
    width,
    height,
    REGEX,
    GOOGLE_WEB_API_KEY,
    storyData,
    minAgo
}