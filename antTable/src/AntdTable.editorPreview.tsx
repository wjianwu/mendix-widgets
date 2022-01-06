import { Component, ReactNode, createElement } from "react";
import { ShowPreview } from "./components/ShowPreview";
import { AntdTablePreviewProps } from "../typings/AntdTableProps";

declare function require(name: string): string;

export class preview extends Component<AntdTablePreviewProps> {
    render(): ReactNode {
        return <ShowPreview />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AntdTable.css");
}
