import report from '@report'
import {bindMethod} from '@commonMethods'
report.reportPageView=bindMethod(report.reportPageView,()=>{
    console.log('上报到了电商')
})