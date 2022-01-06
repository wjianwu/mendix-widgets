import { Component, ReactNode, createElement } from "react";

export interface ShowPreviewProps {

}

export class ShowPreview extends Component<ShowPreviewProps> {
    render(): ReactNode {
        return(
            <div style={{backgroundColor:"red"}}>Thanks You!</div>
        )
    }
}