import Colors from '../../../Basics/Colors';

export default class CalendarDayStyleHelper {
    modifiers = [];
    color = "white";
    leftRounding = false;
    rightRounding = false;
    isToday = false;

    constructor(reports, isToday) {
        this.isToday = isToday
        this.color = this.getColor(reports.current);
        this.getModifiers(reports.current);
        this.getRounding(reports);
    }

    getRounding(reports) {
        const prevColor = this.getColor(reports.previous);
        const currentColor = this.getColor(reports.current, this.isToday);
        const nextColor = this.getColor(reports.next);

        this.leftRounding = prevColor != currentColor;
        this.rightRounding = nextColor != currentColor;
    }

    getModifiers(report) {
        if(!report) return
        if (!report.medicationWasTaken) {
            this.modifiers.push("red")
        }

        if (report.symptoms && report.symptoms.length > 0) {
            this.modifiers.push("yellow")
        }
    }

    getColor(object, isToday = false) {
        if (!object) {
            return isToday ? "white" : Colors.calendarRed;
        }
        if (object.medicationWasTaken) return Colors.calendarGreen
    
    }
}