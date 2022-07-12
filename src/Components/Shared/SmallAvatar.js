import { Avatar, withStyles } from "@material-ui/core";
import Colors from "../../Basics/Colors";

const SmallAvatar = withStyles({
    root: {
        width: "30px",
        height: "30px",
        fontSize: "1rem",
        backgroundColor: Colors.accentBlue
    },
})(Avatar)

export default SmallAvatar;