//time inside the game 
//events behave differently at certain times
//this code was heavly helped by Ai (claude)
//time is not set intill you done with the tutoiral
//if you already done with th tutirla it will continue with the last saved time 
//the time will be saved every 1Houre (ingame)
// times.ts
class Time {
    hour = Math.floor(Math.random() * 24);    // random start hour
    minutes = Math.floor(Math.random() * 60); // random start minute
    

    // msPerGameMinute: real milliseconds per in-game minute (1000 = 1 real second)
    constructor(msPerGameMinute = 1000) {
        setInterval(() => {
            this.minutes++;
            if (this.minutes === 60) {
                this.minutes = 0;
                this.hour = (this.hour + 1) % 24;
            }
        }, msPerGameMinute);
    }

    // Always returns the current in-game time as text
    get now(): string {
        const clock = `${String(this.hour).padStart(2, "0")}:${String(this.minutes).padStart(2, "0")}`;

        if (this.hour >= 5 && this.hour < 12) return `It's ${this.hour % 12 || 12} in the morning (${clock})`;
        if (this.hour >= 12 && this.hour < 17) return `It's daytime at ${clock}`;
        if (this.hour >= 17 && this.hour < 21) return `It's evening at ${clock}`;
        if (this.hour >= 3 && this.hour < 4 ) return `it's ${clock} at night (${clock})` //secret event at 3 in the morning (ont used yet)
        return `It's nighttime at ${clock}`;
    }
}

export const time = new Time();


