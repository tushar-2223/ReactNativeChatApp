import { Colors } from "./Colors";
import { Fonts, FontSize } from "./ThemeUtils";
import { String } from "./String";
import { Images } from "./Images";
import { REGEX, height, width, GOOGLE_WEB_API_KEY, storyData } from "./Constant";
import moment from "moment";

const minAgo = (date: Date) => {
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = now - time;

    if (diff < 60000) {
        return String.justNow;
    } else if (diff < 3600000) {
        return `${Math.floor(diff / 60000)} min ago`;
    } else if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)} h ago`;
    } else {
        return `${Math.floor(diff / 86400000)} d ago`;
    }

    // const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    // const now = moment().format('YYYY-MM-DD HH:mm:ss');
    // const diff = moment(now).diff(moment(time));

    // if (diff < 60000) {
    //     return String.justNow;
    // } else if (diff < 3600000) {
    //     return `${Math.floor(diff / 60000)} min ago`;
    // } else if (diff < 86400000) {
    //     return `${Math.floor(diff / 3600000)} h ago`;
    // } else {
    //     return `${Math.floor(diff / 86400000)} d ago`;
    // }
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