import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Product Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      type: "blockContent",
      title: "Description",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Product Price",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      type: "number",
      title: "Stock",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
    },
    prepare(select) {
      const { title, media, subtitle } = select;
      return {
        title,
        media,
        subtitle: `$${subtitle}`,
      };
    },
  },
});
