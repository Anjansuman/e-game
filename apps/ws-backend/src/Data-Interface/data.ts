

export interface data {
    type: "join_room" | "leave_room" | "chat",
    roomId: string,
    payload?: {
        message: string,
        time: string,
        sender: string
    }
}