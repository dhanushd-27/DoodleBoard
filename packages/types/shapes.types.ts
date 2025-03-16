import z from "zod";

// DiscriminatedUnion
const circleShapeSchema = z.object({
  type: z.literal("circle"),
  payload: z.object({
    x: z.number(),
    y: z.number(),
    radiusX: z.number(),
    radiusY: z.number(),
    rotation: z.number(),
    startAngle: z.number(),
    endAnglie: z.number()
  })
});

export type circleShape = z.infer<typeof circleShapeSchema>;

const rectangleShapeSchema = z.object({
  type: z.literal("rect"),
  payload: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number()
  })
})

export type rectangleShape = z.infer<typeof rectangleShapeSchema>;

const textShapeSchema = z.object({
  type: z.literal("text"),
  payload: z.object({
    text: z.string(),
    x: z.number(),
    y: z.number()
  })
})

export type textShape = z.infer<typeof textShapeSchema>;

const lineShapeSchema = z.object({
  type: z.literal("line"),
  payload: z.object({
    startX: z.number(),
    startY: z.number(),
    endX: z.number(),
    endY: z.number()
  })
})

export type lineShape = z.infer<typeof lineShapeSchema>;

export const ShapeSchema = z.discriminatedUnion("type", [circleShapeSchema, rectangleShapeSchema, textShapeSchema, lineShapeSchema]);

export type Shape = z.infer<typeof ShapeSchema>

export const payloadDataSchema = z.object({
  authorId: z.string(),
  roomId: z.string(),
  data: ShapeSchema
})

export type payloadData = z.infer<typeof payloadDataSchema>;