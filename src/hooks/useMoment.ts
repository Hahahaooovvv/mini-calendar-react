import { useUpdate } from "ahooks";
import moment from "moment";
import { useMemo } from "react";

const useMoment = () => {
    const current = useMemo(() => moment(), []);
    const update = useUpdate();
    return {
        setMonth(month: number) {
            current.month(month)
            update();
        },
        addMonth(num: number) {
            current.add(num, "month");
            update();
        },
        addYear(num: number) {
            current.add(num, "year");
            update();
        },
        moment: current,
    }
}

export default useMoment;