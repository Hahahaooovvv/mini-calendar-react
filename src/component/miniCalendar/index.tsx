import useMonthDays from '@/hooks/useMonthDays';
import style from './index.less';
import { Col, Row, Space } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import _ from 'lodash';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import useMoment from '@/hooks/useMoment';
import { useSize } from 'ahooks';


const MiniCalendar = () => {
    const ref = useRef<HTMLDivElement>(null)
    const size = useSize(ref);
    /**是否小屏幕 做适配 */
    const isSmall = (size?.width || 0) < 400;
    const currentDate = useMoment();
    const monthDays = useMonthDays({
        year: currentDate.moment.year(),
        month: currentDate.moment.month() + 1
    });
    const [active, setActive] = useState(monthDays.now);
    return (
        <div ref={ref} className={style.miniCalendar} >
            <Row gutter={24} justify="center" >
                <Col>
                    <Space size="small">
                        <DoubleLeftOutlined size={12} onClick={() => { currentDate.addYear(-1) }} />
                        <LeftOutlined size={12} onClick={() => { currentDate.addMonth(-1) }} />
                    </Space>
                </Col>
                <Col>
                    {monthDays.year}年{monthDays.month}月
                </Col>
                <Col>
                    <Space size="small">
                        <RightOutlined size={12} onClick={() => { currentDate.addMonth(1) }} />
                        <DoubleRightOutlined size={12} onClick={() => { currentDate.addYear(1) }} />
                    </Space>
                </Col>
            </Row>
            <Row gutter={12} wrap={false} className={style.miniCalendarMenu} >
                {["日", "一", "二", "三", "四", "五", "六"].map(p => (
                    <Col key={p} flex={1}>{p}</Col>
                ))}
            </Row>
            {
                _.chunk([...Array(monthDays.diffDays).keys()], 7).map((p, index) => {
                    return (
                        <Row wrap={false} gutter={12} className={style.miniCalendarRow} key={index}>
                            {
                                p.map(sp => {
                                    // 当前item中的日期
                                    const date = monthDays.start.clone().add(sp, "day");
                                    // 是否是当前选中的月份
                                    const isActiveMonth = date.month() + 1 === monthDays.month;
                                    // 选中是否=当前日期
                                    const same = active.isSame(date);
                                    return (
                                        <Col onClick={() => {
                                            // 如果不是 就需要设置月份 参考antd的日历组件
                                            if (!isActiveMonth) {
                                                currentDate.setMonth(date.month())
                                            }
                                            // 设置选中的日期
                                            setActive(date);
                                        }} key={sp} flex={1}>
                                            <div className={classNames(style.miniCalendarCol, {
                                                [style.miniCalendarColActive]: same,
                                                [style.miniCalendarColHover]: !same,
                                                [style.miniCalendarColSmall]: isSmall,
                                                [style.miniCalendarColActiveSmall]: same && isSmall
                                            })}>
                                                <div className={classNames(style.miniCalendarColTitle, {
                                                    [style.miniCalendarColTitleDisable]: !isActiveMonth,
                                                    [style.miniCalendarColTitleSmall]: isSmall,
                                                })} >
                                                    {date.format("DD")}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                })
            }
            <Row justify="center" >
                <Col>
                    当前选中的日期为{active.format("YYYY年MM月DD日")}
                </Col>
            </Row>
        </div>
    )
}

export default MiniCalendar;