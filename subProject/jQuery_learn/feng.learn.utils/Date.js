var debugMode=true;
debugAndTrace=true;
var printf=feng.utils.printf;
var date=new Date();
printf(date);
printf(date.toDateString(), date.toGMTString(), date.toISOString());

printf(date.toLocaleDateString(), date.toLocaleString(), date.toLocaleTimeString());

printf(window.console);
