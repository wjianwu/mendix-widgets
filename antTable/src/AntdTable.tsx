import { Component, ReactNode, createElement } from "react";
import { ShowIndex } from "./components/ShowIndex";

import { AntdTableContainerProps } from "../typings/AntdTableProps";

import "./ui/AntdTable.css";
import "./ui/antd.min.css";

export default class AntdTable extends Component<AntdTableContainerProps> {
    render(): ReactNode {
        return(
            <ShowIndex 
                dataSource={this.props.dataSource} 
                columns={this.props.columns}
                pageSize={this.props.pageSize}
                rowSize={this.props.rowSize}
                border={this.props.border}
                pageTopPosition={this.props.pageTopPosition}
                pageBottomPosition={this.props.pageBottomPosition}
                showHeader={this.props.showHeader}
                fix={this.props.fixed}
                fixLength={this.props.fixedLength}
            />
        );
    }
}
