import LRUCache from "lru-cache";
import { IWrapTextResultProps } from "../types/drawer";

const fontCache: { [key: string]: LRUCache<string, number> } = {};
export const textDataCache = new LRUCache<string, IWrapTextResultProps>({
  max: 500,
});
export const getTextWidth = (
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string,
) => {
  let width: number | undefined = 0;
  if (!text || typeof text !== "string") {
    return width;
  }
  let cacheOfFont = fontCache[font];
  if (!cacheOfFont) {
    cacheOfFont = fontCache[font] = new LRUCache<string, number>({ max: 500 });
  }
  width = cacheOfFont.get(text);
  if (width == null) {
    width = ctx!.measureText(text).width;
    cacheOfFont.set(text, width);
  }

  return width;
};
