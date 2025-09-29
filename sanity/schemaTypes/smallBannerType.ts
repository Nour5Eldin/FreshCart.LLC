import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const smallBannerType = defineType({
  name: "smallBanner",
  title: "Small Banner",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "product",
      title: "Linked Product",
      type: "reference",
      to: [{ type: "product" }], 
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      linkedProduct: "product.name", 
    },
    prepare(selection) {
      const { title, media, linkedProduct } = selection;
      return {
        title: title + (linkedProduct ? ` → ${linkedProduct}` : ""),
        media,
      };
    },
  },
});

