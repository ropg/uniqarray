class UniqArray extends Array {
    constructor(...args) {
        super(...new Set(args));
    }
    push(...args) {
        for (const a of args) if (!this.includes(a)) super.push(a);
        return this.length;
    }
    unshift(...args) {
        for (const a of args.reverse()) if (!this.includes(a)) super.unshift(a);
        return this.length;
    }
    concat(...args) {
        let r = new UniqArray(...this);
        for (const a of args) r.push(a);
        return r;
    }
}

module.exports = UniqArray
