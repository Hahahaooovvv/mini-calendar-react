import moment from "moment";
import { useMemo } from "react";

export interface IUserDateOptions {
    year?: number;
    month?: number;
}


const useMonthDays = (options?: IUserDateOptions) => {
    const now = moment(moment().format("YYYY-MM-DD"));
    const { year = now.year(), month = now.month() + 1 } = options || {};
    const days = useMemo(() => {
        const currentActive = moment(`${year}-${month}-01`);
        // 获取当月第一天的开始周日日期
        const start = moment(currentActive).startOf("month").startOf("week");
        // 获取当月最后一天的结束周六日起
        const end = moment(currentActive).endOf("month").endOf("week");
        return {
            now,
            start,
            end,
            year: currentActive.year(),
            month: currentActive.month() + 1,
            // 相差多少天
            diffDays: end.diff(start, "day") + 1
        }
    }, [year, month]);
    return days
};

export default useMonthDays;