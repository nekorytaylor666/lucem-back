/** eventsService */
export const eventService: {
    callbacks: {
        [eventName: string]: {
            [id: string]: (...args: any[]) => void;
        };
    };
    triggerEvent(eventName: string, data?: null): void;
    listenEvent(
        eventName: string,
        id: string,
        callback: (...args: any[]) => void,
    ): void;
    unlistenEvent(eventName: string, id: string): void;
} = {
    callbacks: {},

    /**
     * @param {string} eventName
     * @param {*} data
     */
    triggerEvent(eventName: string, data = null) {
        if (this.callbacks[eventName]) {
            Object.keys(this.callbacks[eventName]).forEach((id) => {
                this.callbacks[eventName][id](data);
            });
        }
    },

    /**
     * @param {string} eventName name of event
     * @param {string} id callback identifier
     * @param {Function} callback
     */
    listenEvent(
        eventName: string,
        id: string,
        callback: (...args: any[]) => void,
    ) {
        this.callbacks[eventName] = {
            id: callback,
        };
    },

    /**
     * @param {string} eventName name of event
     * @param {string} id callback identifier
     */
    unlistenEvent(eventName: string, id: string) {
        delete this.callbacks[eventName][id];
    },
};
