import z from "zod";

export const circleShapeSchema = z.object({
  type: z.literal("circle"),
  roomId: z.string(),
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

export const rectangleShapeSchema = z.object({
  type: z.literal("rect"),
  roomId: z.string(),
  payload: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number()
  })
})

export type rectangleShape = z.infer<typeof rectangleShapeSchema>;

export const textShapeSchema = z.object({
  type: z.literal("text"),
  roomId: z.string(),
  payload: z.object({
    text: z.string(),
    x: z.number(),
    y: z.number()
  })
})

export type textShape = z.infer<typeof textShapeSchema>;

export const lineShapeSchema = z.object({
  type: z.literal("line"),
  roomId: z.string(),
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
  data: z.string()
});

export type payloadData = z.infer<typeof payloadDataSchema>;