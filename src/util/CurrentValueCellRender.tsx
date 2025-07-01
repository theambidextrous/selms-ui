import Badge from "../components/ui/badge/Badge"

export class CurrentValueCellRender {

    public static renderPassMark = (value: any) => {
        if(Number(value) < 50 )
            return <Badge color="warning">{value}%</Badge>
        
        if(Number(value) === 50 )
            return <Badge color="primary">{value}%</Badge>
        
        return <Badge color="success">{value}%</Badge>
    }

    public static renderFee = (value: number) => {
        return `KES ${value}`;
    }

    public static renderLocalDate = (value: string) => {
        return new Date(value).toLocaleDateString();
    }
}