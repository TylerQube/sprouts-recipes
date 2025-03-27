import {defineField, defineType} from 'sanity'

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['breakfast', 'lunch', 'dessert', 'snack', 'other'],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'servings',
      title: 'Servings',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
				}),
			],
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'section',
              title: 'Ingredient Section',
              type: 'string',
              initialValue: 'Ingredients'
            },
            {
              name: 'subIngredients',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'quantity',
                      title: 'Quantity',
                      type: 'string',
                      validation: Rule => Rule.required().min(0)
                    },
                    {
                      name: 'unit',
                      title: 'Unit',
                      type: 'string',
                      options: {
                        list: ['g', 'kg', 'mL', 'L', 'tsp', 'tbsp', 'cup', 'oz', 'lb'],
                        layout: 'dropdown'
                      },
                      validation: Rule => Rule.required()
                    }
                  ]

                }
              ]
            },
          ]
        }
      ]
    }),
    defineField({
      name: 'instructionSections',
      title: 'Instruction Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'section',
              title: 'Section',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'instructions',
              title: 'Instructions',
              type: 'array',
              of: [ { type: 'string' }]
            }
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
