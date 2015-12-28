var http=require('http');
var url=require('url');
var items=[];

var server=http.createServer(function(req,res){
    switch(req.method){
      case 'POST':
         var item='';
         req.setEncoding('utf-8');
         req.on('data',function(chunk){
           item+=chunk;
         });   
         req.on('end',function(){
         items.push(item);
         res.end('Ok\n');
         });
      break;
      case 'GET':
         var body=items.map(function(item,i){
            return i +')'+item;
         }).join('\n');
         body+='\n';
         res.setHeader('Content-Lenght',Buffer.byteLength(body));
         res.setHeader('Content-Type','text/plain; charset="utf-8"'); 
         res.end(body);
      break;
      case 'DELETE':
         var path=url.parse(req.url).pathname;
         var i=parseInt(path.slice(1),10);

         if (isNaN(i)){
            res.status=400;
            res.end('Invalid item id');
         } else if(!items[i]){
            res.statusCode=404;
            res.end('Item not found');
         } else{
            items.splice(i,1);
            res.end('Ok\n');
         }
    }// end switch
    
});

server.listen(3000);
