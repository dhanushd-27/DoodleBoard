import toast from "react-hot-toast";

// update code to ignore user joined event and stuff
// user joined
// user left

interface WebSocketMessage {
  event: string;
  type?: string;
  payload?: string;
}

const handleMessage = ({ message }: { message: string }) => {
  try {
    const parsedData = JSON.parse(message) as WebSocketMessage;
    
    switch(parsedData.event) {
      case "share": {
        return 1;
      }

      case "user_joined": {
        return 2;
      }

      case "user_left": {
        return 3;
      }

      default: {
        return 0;
      }
    }
    // return shapeData;
  } catch (error) {
    const e = error as Error;
    console.log(e.message)
    return null;
  }
}

export function onMessage(event: MessageEvent<string>, exisitedShapes: string[]) {
  try {
    const parsedData = JSON.parse(event.data) as WebSocketMessage;

    const eventType = handleMessage({ message: event.data });

    if(!eventType) {
      toast.error("Something went wrong");
      return;
    }

    switch(eventType) {
      case 1: {
        toast.success("Shape data received");
        break;
      }

      case 2: {
        toast.success("User joined");
        return;
      }

      case 3: {
        toast.success("User left");
        return;
      }
    }

    if (parsedData.type && parsedData.payload) {
      const shapeData = {
        type: parsedData.type,
        payload: JSON.parse(parsedData.payload)
      }
      
      exisitedShapes.push(JSON.stringify(shapeData));
    }
  } catch (error) {
    const e = error as Error;
    console.log(e)
  }
}
