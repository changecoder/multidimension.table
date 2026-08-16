export function getEnvVariables() {
  return {
    IS_CANVAS_IMAGE_CROSS_ORIGIN:
      process.env.IS_CANVAS_IMAGE_CROSS_ORIGIN === "true",
  };
}
