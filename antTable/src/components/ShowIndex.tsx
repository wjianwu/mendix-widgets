import { Component, ReactNode, createElement } from "react";

import { ListValue } from 'mendix';
import { ColumnsType, PageBottomPositionEnum, PageTopPositionEnum, RowSizeEnum } from "../../typings/AntdTableProps";

import { Table,ConfigProvider, Input, Space, Button, Tag, Tooltip } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export interface ShowIndexProps {
    dataSource?: ListValue;
    columns?:ColumnsType[];
    pageSize?:number;
    rowSize?:RowSizeEnum;
    border?:boolean;
    pageTopPosition?:PageTopPositionEnum;
    pageBottomPosition?:PageBottomPositionEnum;
    showHeader?:boolean;
    fix?:boolean;
    fixLength?:number;
}

export class ShowIndex extends Component<ShowIndexProps> {
    
    searchInput: any;

    state = {
        // 输入查询
        searchText: '',
        searchedColumn: '',
    };
    
    // 查询过滤
    getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}:any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`查询条件`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        查询
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        清空
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: string, record: { [x: string]: { toString: () => string; }; }) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text: { toString: () => string; }) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (text),
    });
    
    handleSearch = (selectedKeys: any[], confirm: () => void, dataIndex: any) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters: () => void) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    // 是否启用输入查询
    sortConfig = (index: string,flag: boolean) => flag ? this.getColumnSearchProps(index) : {};

    // tag配置
    autoTags = function(tagStr:string,tagColor:string){
        let tc = tagStr.split(':');
        if(tc.length > 1){
            return <Tag color={tc[1]} key={tc[0]}>{tc[0]}</Tag>
        }else{
            return <Tag color={tagColor?tagColor:"geekblue"} key={tc[0]}>{tc[0]}</Tag>
        }
    }

    render(): ReactNode {
        if(this.props.dataSource!=undefined || this.props.dataSource!=null){
            const columns:any[] = [];
            const datas:any[] = [];
            // 获取展示列
            (this.props.columns as ColumnsType[]).forEach(column => {
                const tmp:any = {
                    title:column.header.value,
                    dataIndex:column.attribute?.id,
                    key:column.attribute,
                    ellipsis:{showTitle: false},
                    ...this.sortConfig(column.attribute?.id, column.searchSort)
                };
                if(column.descSort){
                    tmp['sorter'] = (a:any, b:any) => a[column.attribute?.id] - b[column.attribute?.id];
                };
                // tag 样式
                if(column.tagConfig){
                    tmp['render'] = (text: string) => 
                        <span>
                            {text.split(';').map(tag => this.autoTags(tag,column.tagColor))}
                        </span>  
                }
                // 长度自动省略
                if(column.omit){
                    tmp['render'] = (text:string) =>
                        <Tooltip placement="topLeft" title={text}>
                            {text}
                        </Tooltip>
                }
                // 动作
                if(column.showAsAction){
                    tmp['render'] = (text:any) => (
                        <Space size="middle">
                            <a onClick={column.actions?.execute}>Delete{text}</a>
                        </Space>
                      )
                }
                columns.push(tmp);
            });
            // 获取数据源
            this.props.dataSource.items?.map(item=>{
                let tmp:any = {};
                columns.forEach(column => {
                    tmp[column.dataIndex] = column.key.get(item).displayValue;
                });
                datas.push(tmp);
            })
            // 分页的位置
            const topPosition:any = this.props.pageTopPosition;
            const bottomPosition:any = this.props.pageBottomPosition;
            // 固定表头
            let fixedHeader = {};
            if(this.props.showHeader && this.props.fix){
                fixedHeader = {y:this.props.fixLength}
            }
            return(
                // 中文配置
                <ConfigProvider locale={zh_CN}>
                    <Table 
                        dataSource={datas}
                        columns={columns}
                        bordered={this.props.border}
                        pagination={{position:[topPosition,bottomPosition],pageSize:this.props.pageSize}}
                        size={this.props.rowSize}
                        scroll={fixedHeader}
                        showHeader={this.props.showHeader}
                    />
                </ConfigProvider>
            );
        }
    }
}