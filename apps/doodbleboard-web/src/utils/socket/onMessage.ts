import toast from "react-hot-toast";

// update code to ignore user joined event and stuff
// user joined
// user left

const handleMessage = () => {
  
}

export function onMessage(event: MessageEvent<any>, exisitedShapes: string[]) {
  try {
    const parsedData = JSON.parse(event.data);
    const shapeData = {
      type: parsedData.type,
      payload: JSON.parse(parsedData.payload)
    }
    
    exisitedShapes.push(JSON.stringify(shapeData));
  } catch (error) {
    const e = error as ErrorEvent;
    console.log(e)
    toast.error("Invalid data" + event.data);
  }
}
