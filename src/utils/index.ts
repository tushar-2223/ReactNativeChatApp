import { Colors } from "./Colors";
import { Fonts, FontSize } from "./ThemeUtils";
import { String } from "./String";
import { Images } from "./Images";
import { REGEX, height, width, GOOGLE_WEB_API_KEY, storyData } from "./Constant";


const minAgo = (date: Date) => {
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = now - time;

    if (diff < 60000) {
        return 'Just now';
    } else if (diff < 3600000) {
        return `${Math.floor(diff / 60000)}min ago`;
    }
    return `${Math.floor(diff / 3600000)}h ago`;
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