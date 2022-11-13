import { IMessage } from "../types/message/message.interface";

type Callback = (e: MessageEvent<any>) => void;

enum BroadcastEvent {
    Message = 'message',
    MessageError = 'messageerror'
}

export class Broadcast {
    private channel: BroadcastChannel;
    private callback: Callback = () => { };

    constructor(channelName: string) {
        this.channel = new BroadcastChannel(channelName);
    }

    public send(message: Omit<IMessage, 'id'>): void {
        this.channel.postMessage(message);
    }

    public subscribeMessage(callback: Callback) {
        this.callback = callback;
        this.channel.addEventListener(BroadcastEvent.Message, callback);
    }

    public unsubscribeMessage() {
        this.channel.removeEventListener(BroadcastEvent.Message, this.callback);
    }
}