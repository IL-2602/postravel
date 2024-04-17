import { z } from 'zod'

export const createPostModalSchema = z.object({
  postPhoto: z
    .custom<File>(v => v instanceof File)
    .refine(
      file => file.size <= 20000000,
      `The photo must be less than 20Mb and have JPEG or PNG format`
    )
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
      'The photo must be less than 20Mb and have JPEG or PNG format'
    )
    .refine(async file => {
      const image = new Image()

      image.src = URL.createObjectURL(file)
      await new Promise(resolve => {
        image.onload = resolve
      })

      return image.width >= 332 && image.height >= 332 // Проверяем, что ширина не больше 800px и высота не больше 600px
    }, 'imgLarger332')
    .optional(),
})

export type createPostModalFormSchema = z.infer<typeof createPostModalSchema>