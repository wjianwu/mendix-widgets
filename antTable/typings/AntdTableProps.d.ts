/**
 * This file was generated from AntdTable.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type AlignmentEnum = "Left" | "Right" | "Center";

export interface ColumnsType {
    attribute: ListAttributeValue<string | Big | boolean | Date>;
    header: DynamicValue<string>;
    alignment: AlignmentEnum;
    omit: boolean;
    descSort: boolean;
    searchSort: boolean;
    tagConfig: boolean;
    tagColor: string;
    showAsAction: boolean;
    actions?: ActionValue;
}

export type RowSizeEnum = "small" | "middle" | "large";

export type PageTopPositionEnum = "topLeft" | "topCenter" | "topRight" | "none";

export type PageBottomPositionEnum = "bottomLeft" | "bottomCenter" | "bottomRight" | "none";

export interface ColumnsPreviewType {
    attribute: string;
    header: string;
    alignment: AlignmentEnum;
    omit: boolean;
    descSort: boolean;
    searchSort: boolean;
    tagConfig: boolean;
    tagColor: string;
    showAsAction: boolean;
    actions: {} | null;
}

export interface AntdTableContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataSource: ListValue;
    columns: ColumnsType[];
    pageSize: number;
    rowSize: RowSizeEnum;
    border: boolean;
    pageTopPosition: PageTopPositionEnum;
    pageBottomPosition: PageBottomPositionEnum;
    showHeader: boolean;
    fixed: boolean;
    fixedLength: number;
}

export interface AntdTablePreviewProps {
    class: string;
    style: string;
    dataSource: {} | { type: string } | null;
    columns: ColumnsPreviewType[];
    pageSize: number | null;
    rowSize: RowSizeEnum;
    border: boolean;
    pageTopPosition: PageTopPositionEnum;
    pageBottomPosition: PageBottomPositionEnum;
    showHeader: boolean;
    fixed: boolean;
    fixedLength: number | null;
}
