import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";


const ForgotPassword = observer(({ assembly }) => (
                <div>
                    <h1>{assembly.translate("forgot_password.title")}</h1>
                    <List>
                        <li>{assembly.translate("forgot_password.step_one")}</li>
                        <li>{assembly.translate("forgot_password.step_two")}</li>
                        <li>{assembly.translate("forgot_password.step_three")}</li>
                        <li>{assembly.translate("forgot_password.step_four")}</li>
                        <li>{assembly.translate("forgot_password.step_five")}</li>
                    </List>
                    
                </div>
))

ForgotPassword.route = "/forgot_password"
export default ForgotPassword;

const List = styled.ol`

margin: 0;
padding: 0 0 0 1em;

li{
    margin-top: 1em;
    font-size: 1.25em;
}
`