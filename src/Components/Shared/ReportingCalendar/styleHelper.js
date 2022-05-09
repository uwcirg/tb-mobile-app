import { DateTime } from 'luxon';
import Colors from '../../../Basics/Colors';

export default class CalendarDayStyleHelper {
    modifiers = [];
    color = "white";
    leftRounding = false;
    rightRounding = false;
    isToday = false;

    constructor(report, surroundingColors) {
        this.report = report
        // this.isToday = DateTime.local().startOf('day').equals(datetime.startOf('day'));
        this.getModifiers(report);
        this.getRounding(surroundingColors);
    }

    getRounding({prevColor,currentColor,nextColor }) {
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

}