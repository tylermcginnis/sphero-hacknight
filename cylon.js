var Cylon = require('cylon');
 
Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-GYG-RN-SPP' },
  device: { name: 'sphero', driver: 'sphero' },
 
work: function(my) {
    var deg = 0;
    every((2).second(), function() {
      if (deg >= 360){
        deg = 0;
      }
      console.log(deg);
      my.sphero.roll(100, deg, 1);
      deg += 90;
    });
    my.sphero.setColor('blue');
    my.sphero.on('collision', function(){
      this.setColor('red');
    });
  }
});
 
// Tell Cylon we want it to spin up the API on port 4321
Cylon.api({port: '4321'})
 
// Start up Cylon API server
Cylon.start();