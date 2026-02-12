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

    public static renderLessonStartTime = (value: string) => {
        const { date_from } = this.convertAndAddMinutes(value, 0);
        return date_from;
    }

     public static renderLessonEndTime = (value: string, duration: number) => {
        const { date_to } = this.convertAndAddMinutes(value, duration);
        return date_to;
    }

    public static convertAndAddMinutes(dateTimeStr: string, minutesToAdd: number): { date_from: string, date_to: string } {

    const year = parseInt(dateTimeStr.substring(0, 4));
    const month = parseInt(dateTimeStr.substring(4, 6)) - 1; 
    const day = parseInt(dateTimeStr.substring(6, 8));
    const hour = parseInt(dateTimeStr.substring(8, 10));
    const minute = parseInt(dateTimeStr.substring(10, 12));
    
    const dateFrom = new Date(year, month, day, hour, minute);
    const dateTo = new Date(dateFrom.getTime() + minutesToAdd * 60000);
    
    const formatDate = (date: Date): string => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthStr = months[date.getMonth()];
        const dayStr = date.getDate();
        let hourStr = date.getHours();
        const minuteStr = date.getMinutes().toString().padStart(2, '0');
        const ampm = hourStr >= 12 ? 'pm' : 'am';
        
        hourStr = hourStr % 12;
        hourStr = hourStr ? hourStr : 12;
        
        return `${monthStr} ${dayStr} ${hourStr}:${minuteStr} ${ampm}`;
    };
    
    return {
        date_from: formatDate(dateFrom),
        date_to: formatDate(dateTo)
    };
    }

}