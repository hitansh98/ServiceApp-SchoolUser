d = new Date()
localTime = d.getTime();
localOffset = d.getTimezoneOffset()*60000;

utc=localTime+localOffset;
offset = 5.5
bombay = utc+(3600000*offset)

nd = new Date(bombay)
console.log(nd.toLocaleString());

// console.log(new Date());