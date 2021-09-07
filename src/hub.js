class Hub {
    constructor() {
        this.subs = {};
    }

    subscribe(name, callback) {
        if (!this.subs[name]) {
            this.subs[name] = {};
        }
        const id = Math.floor(Math.random() * 1000000);
        const sub = this.subs[name];
        sub[id] = callback;
        return `${name}_${id}`;
    }

    unsubscribe(subscription) {
        const [name, id] = subscription.split('_');
        delete this.subs[name][id];
    }

    publish(name, data) {
        const subs = Object.values(this.subs[name]);
        subs.forEach((callback) => {
            console.log(callback);
            callback(data);
        });
    }
}

export default new Hub();
