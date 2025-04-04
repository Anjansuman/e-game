import { WebSocket, WebSocketServer } from "ws";
import { checkUser } from "./UserVerification/checkUser";

const wss = new WebSocketServer({ port: 8080 });

// right now it is using a global array, but for making the app more optimal use queues.
interface User {
    userId: string,
    roomId: string[],
    ws: WebSocket
};

const users: User[] = [];


wss.on('connection', (ws, request) => {
    try {
        
        const url = request.url;
        if(!url) {
            ws.close();
            return;
        }

        const queryParams = new URLSearchParams(url.split("?")[1]);
        const token = queryParams.get("token");

        if(!token) {
            ws.close();
            return;
        }

        const userId = checkUser(token);

        if(!userId) {
            ws.close();
            return;
        }

        // pushing the user to the global array
        users.push({
            userId,
            roomId: [],
            ws
        });

        ws.on('message', async (data) => {

            // checking for the type of data
            if(typeof data === 'string') return;

            const parsedData = JSON.parse(data.toString());

            if(parsedData.type === "join_room") {
                const user = users.find((x) => x.userId === userId && x.ws === ws);
    
                if(!user) return;
    
                user.rooms.push(parsedData.roomId);
            }

        });

    } catch (error) {
        
    }
})