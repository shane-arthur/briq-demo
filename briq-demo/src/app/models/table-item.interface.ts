
export interface ITableItem {
    OBJECTID: number;
    record_id: number;
    date_opened: string;
    record_status: string;
    date_closed: string;
    address: string;
    record_type: string;
    record_type_category?: string;
    record_type_group?: string;
    record_type_subtype?: string;
    record_type_type?: string;
    record_type_4level?: string;
    record_name: string;
    description: string;
    planner_id: string;
    module: string;
}