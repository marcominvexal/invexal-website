import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Invexal — Enterprise AI, Computer Vision & AIoT",
    short_name: "Invexal",
    description: "Intelligence for the physical world.",
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [{ src: "/brand/invexal-favicon.png", sizes: "270x270", type: "image/png" }],
  };
}
