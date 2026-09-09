import { IImageOption } from "../types/drawer";
import { getEnvVariables } from "./env";

export class ImageCache {
  private imageMap: {
    [name: string]: {
      img: HTMLImageElement;
      success: boolean;
    };
  } = {};
  private imgPromises: any = [];

  loadImage(name: string, src: string, option?: IImageOption) {
    this.imgPromises.push(
      new Promise((resolve, reject) => {
        const img = new Image();
        const isSrcWithHttp = src.startsWith("http");
        img.src = isSrcWithHttp
          ? src
          : location.origin + (src.startsWith("/") ? "" : "/") + src;
        img.referrerPolicy = "no-referrer";

        if (
          !option?.crossOrigin &&
          getEnvVariables().IS_CANVAS_IMAGE_CROSS_ORIGIN
        ) {
          img.crossOrigin = "Anonymous";
        }

        this.imageMap[name] = {
          img,
          success: false,
        };

        try {
          img.onload = () => {
            this.imageMap[name] = {
              img,
              success: true,
            };

            resolve({
              name,
              img,
            });
          };
        } catch (err) {
          // code never reach
          this.imageMap[name] = {
            img,
            success: false,
          };
          reject(err);
        }
      }),
    );
  }

  loadImageMap(urlMap: { [x: string]: string }) {
    Object.keys(urlMap).forEach((key) => {
      this.loadImage(key, urlMap[key]);
    });
  }

  imageMapOnload(callback: any) {
    Promise.all(this.imgPromises).then(callback);
  }

  getImage(name: string) {
    const imgInfo = this.imageMap[name];

    if (imgInfo == null) {
      return null;
    }

    const { img, success } = imgInfo;

    if (!success) return false;
    return img;
  }
}

export const imageCache = new ImageCache();
