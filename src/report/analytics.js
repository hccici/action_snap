function loadAnalyticsJS() {
    window['GoogleAnalyticsObject'] = 'ga';
    window['ga'] = window['ga'] || function () {
        (window['ga'].q = window['ga'].q || []).push(arguments)
    }
    window['ga'].l = 1 * new Date(); 
    var a = document.createElement('script')
    var m = document.getElementsByTagName('script')[0]; 
    a.async = 1; 
    a.src = 'https://www.google-analytics.com/analytics.js'; 
    m.parentNode.insertBefore(a, m)
}
if(window.ga){
    console.log('ga analytics exist!')
}else{
    console.log('load ga analytics!')
    loadAnalyticsJS()
}
const snapGaName='actionSnapGa'
window.ga('create',window.actionSnapECConfig.gaId,'auto',snapGaName)
export default function(){
    arguments[0]=snapGaName+'.'+arguments[0]
    window.ga(...arguments)
}