import z from "zod";

export const circleShapeSchema = z.object({
  type: z.literal("circle"),
  roomId: z.string(),
  payload: z.object({
    x: z.number(),
    y: z.number(),
    radiusX: z.number(),
    radiusY: z.number(),
  })
});

export type circleShape = z.infer<typeof circleShapeSchema>;

export const squareShapeSchema = z.object({
  type: z.literal("square"),
  roomId: z.string(),
  payload: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number()
  })
})

export type squareShape = z.infer<typeof squareShapeSchema>;

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

export const rhombusShapeSchema = z.object({
  type: z.literal('rhombus'),
  roomId: z.string(),
  payload: z.object({
    top: z.object({
      x: z.number(),
      y: z.number()
    }),
    right: z.object({
      x: z.number(),
      y: z.number()
    }),
    bottom: z.object({
      x: z.number(),
      y: z.number()
    }),
    left: z.object({
      x: z.number(),
      y: z.number()
    })
  })
})

export type rhombusShape = z.infer<typeof rhombusShapeSchema>;


export const arrowLineShapeSchema = z.object({
  type: z.literal('arrowLine'),
  roomId: z.string(),
  payload: z.object({
    startX: z.number(),
    startY: z.number(),
    endX: z.number(),
    endY: z.number()
  })
})

export type arrowLineShape = z.infer<typeof arrowLineShapeSchema>;

export const pencilShapeSchema = z.object({
  type: z.literal('pencil'),
  roomId: z.string(),
  payload: z.object({
    points: z.array(z.object({
      x: z.number(),
      y: z.number()
    }))
  })
})

export type pencilShape = z.infer<typeof pencilShapeSchema>;

export const ShapeSchema = z.discriminatedUnion("type", [circleShapeSchema, squareShapeSchema, textShapeSchema, lineShapeSchema, rhombusShapeSchema, arrowLineShapeSchema, pencilShapeSchema]);

export type Shape = z.infer<typeof ShapeSchema>

export const payloadDataSchema = z.object({
  authorId: z.string(),
  roomId: z.string(),
  data: z.string()
});

export type payloadData = z.infer<typeof payloadDataSchema>;