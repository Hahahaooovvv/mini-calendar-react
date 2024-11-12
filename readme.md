
# MiniCalendar--日期选择器  

> 启动  

`yarn dev`

> 目录  

`src/component/miniCalendar/*`：日历组件，没有根据媒体查询去做适配，使用的监听dom的大小变化，可以适配绝大部分大小场景  
`src/hooks/monthDays.ts`：处理获取当前需要展示月份的所有信息，例如开始日期、结束日期、中间相差的天数。时间的格式都是为moment  
`/src/hooks/useMoment.ts`：快速处理一个moment，使用了ahook的useUpdate来使moment更新了之后更新UI

> 描述  

弹窗可以使用proComponent的modalform快速实现，就没有一一去实现，可以参考一下青蛙todo的日历功能。
