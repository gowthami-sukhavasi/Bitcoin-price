let charts = Highcharts.chart('container', {
        
    title: {
        text: 'Bitcoin Rate'
    },
    
    subtitle: {
        text: 'Source: coindesk.com'
    },
    
    yAxis: {
        title: {
            text: 'Rate'
        }
    },
    
    xAxis: {
        type:'datetime'
    },
    
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    
    series: [{
        name: 'USD',
        data: []
    }, {
        name: 'GDP',
        data: []
    }, {
        name: 'EUR',
        data: []
    }]
});
    
setInterval(function(){
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load",function(){
    let obj = JSON.parse(this.responseText);
    let usd = obj.bpi.USD.rate_float;
    let eur = obj.bpi.EUR.rate_float;
    let gbp = obj.bpi.GBP.rate_float;
    let timestamp = +(new Date);
    charts.series[0].addPoint([timestamp,usd]);
    charts.series[1].addPoint([timestamp,gbp]);
    charts.series[2].addPoint([timestamp,eur]);
    })
    xhr.open("GET","https://api.coindesk.com/v1/bpi/currentprice.json");
    xhr.send();
},3000)  //Send http request for every 3 seconds.