import axios from "axios";

export const fetchShapes = async () => {
  try {
    const res = await axios.get("http://localhost:3002/api/v1/room/chats/cm8gxdde80001xjkjpygk6eyr", { withCredentials: true });
    
    const shapesArray = res.data.payload.shapes;

    const shapeMessage = shapesArray.map((shape) => shape.message);
    return shapeMessage;
  } catch (error) {
    console.log(error);
  }
}
