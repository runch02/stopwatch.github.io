class Stopwatch {
    constructor(hour, minute, second, milisecond, flagSignal) {
        this.hour = hour
        this.minute = minute
        this.second = second
        this.milisecond = milisecond
        this.flagSignal = flagSignal

        Stopwatch.setStyleToDOM()
    }

    startStopWatch(clickedElement) {
        switch (clickedElement.target.innerText) {

            case "START":
                clickedElement.target.innerText = "STOP"
                clickedElement.target.id = "stop"
                this.flagSignal = true
                break;

            case "STOP":
                clickedElement.target.innerText = "START"
                clickedElement.target.id = "start"
                this.flagSignal = false
                break;
        
            default:
                break;
        }
    }

    resetWatch() {
        this.hour = 0
        this.minute = 0
        this.second = 0
        this.milisecond = 0
        this.flagSignal = false

        document.querySelector(".root .watch-section").innerHTML = `00:00:00.<span id="milisecond">00</span>`

        document.querySelector("#stop").innerText = "START"
    }

    runWatch() {
        if (this.flagSignal === true) {
            this.milisecond += 1

            if (this.milisecond === 100) {
                this.second += 1
                this.milisecond = 0
            }
    
            if (this.second === 60) {
                this.minute += 1
                this.second = 0
            }
    
            if (this.minute === 60) {
                this.hour += 1
                this.minute = 0
            }
    
            if (this.hour === 24) {
                this.second = 0
                this.minute = 0
                this.hour = 0
            }

            let updatedHour = (this.hour < 10) ? "0" + this.hour : this.hour
            let updatedMinute = (this.minute < 10) ? "0" + this.minute : this.minute
            let updatedSecond = (this.second < 10) ? "0" + this.second : this.second
            let updatedMilisecond = (this.milisecond < 10) ? "0" + this.milisecond : this.milisecond

            document.querySelector(".root .watch-section").innerHTML = `${updatedHour}:${updatedMinute}:${updatedSecond}.<span id="milisecond">${updatedMilisecond}</span>`
        }
    }

    static themeHandler(element) {
        switch (element.target.innerText) {
            case "Dark":
                element.target.innerText = "Light"
                let darkTheme = { background: "#313131", color: "gray", buttonName: "Light" }
                localStorage.setItem("theme", JSON.stringify(darkTheme))

                Stopwatch.setStyleToDOM()
                break;

            case "Light":
                element.target.innerText = "Dark"
                let lightTheme = { background: "#eee", color: "black", buttonName: "Dark"}
                localStorage.setItem("theme", JSON.stringify(lightTheme))

                Stopwatch.setStyleToDOM()
                break;

            default:
                break;
        }
    }

    static setStyleToDOM() {
        if (localStorage.getItem("theme") === null) {
            return;
        } else {
            let fetchStyleFromLocalStorage = JSON.parse(localStorage.getItem("theme"))
            document.getElementById("theme").innerText = fetchStyleFromLocalStorage.buttonName
            document.body.style.background = fetchStyleFromLocalStorage.background
            document.body.style.color = fetchStyleFromLocalStorage.color
        }
    }
}

let firstInstaceStopwatch = new Stopwatch(0, 0, 0, 0, false)

let interval = setInterval(() => {
    firstInstaceStopwatch.runWatch()
}, 10)

document.querySelector("#start").addEventListener("click", clickedElement => firstInstaceStopwatch.startStopWatch(clickedElement))

document.querySelector("#reset").addEventListener("click", () => firstInstaceStopwatch.resetWatch())

// function to handle theme status
document.getElementById("theme").addEventListener("click", element => Stopwatch.themeHandler(element))