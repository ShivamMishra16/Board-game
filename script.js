/// store key codes and currently pressed ones
    var keys = {};
        keys.UP = 38;
        keys.LEFT = 37;
        keys.RIGHT = 39;
        keys.DOWN = 40;
        keys.W = 87;
        keys.A = 65;
        keys.D = 68;
        keys.S = 83;

    /// store reference to character's position and element
    var characterOne = {
      x: 100,
      y: 100,
      speedMultiplier: 2,
      element: document.getElementById("one")
    };
    var characterTwo = {
      x: 100,
      y: 100,
      speedMultiplier: 2,
      element: document.getElementById("two")
    };

    /// key detection (better to use addEventListener, but this will do)
    document.body.onkeyup = 
    document.body.onkeydown = function(e){
      if (e.preventDefault) { 
        e.preventDefault();
      }
      else {
        e.returnValue = false; 
      }
      var kc = e.keyCode || e.which;
      keys[kc] = e.type == 'keydown';
    };

    /// character movement update
    var moveCharacterOne = function(dx, dy){
      characterOne.x += (dx||0) * characterOne.speedMultiplier;
      characterOne.y += (dy||0) * characterOne.speedMultiplier;
      characterOne.element.style.left = characterOne.x + 'px';
      characterOne.element.style.top = characterOne.y + 'px';
    };
    var moveCharacterTwo = function(dx, dy){
      characterTwo.x += (dx||0) * characterTwo.speedMultiplier;
      characterTwo.y += (dy||0) * characterTwo.speedMultiplier;
      characterTwo.element.style.left = characterTwo.x + 'px';
      characterTwo.element.style.top = characterTwo.y + 'px';
    };


    /// character control
    var detectCharacterMovement = function(){
      if(isIntersect()){
        return;
      }
      if ( isInsideContainerL('one') && !isIntersect() && keys[keys.LEFT] ) {
        moveCharacterOne(-1, 0);
      }
      if ( isInsideContainerR('one') && !isIntersect() && keys[keys.RIGHT] ) {
        moveCharacterOne(1, 0);
      }
      if ( isInsideContainerT('one') && !isIntersect() && keys[keys.UP] ) {
        moveCharacterOne(0, -1);
      }
      if ( isInsideContainerB('one') && !isIntersect() && keys[keys.DOWN] ) {
        moveCharacterOne(0, 1);
      }
      if ( isInsideContainerL('two') && !isIntersect() && keys[keys.A] ) {
        moveCharacterTwo(-1, 0);
      }
      if ( isInsideContainerR('two') && !isIntersect() && keys[keys.D] ) {
        moveCharacterTwo(1, 0);
      }
      if ( isInsideContainerT('two') && !isIntersect() && keys[keys.W] ) {
        moveCharacterTwo(0, -1);
      }
      if ( isInsideContainerB('two') && !isIntersect() && keys[keys.S] ) {
        moveCharacterTwo(0, 1);
      }
    };

    /// update current position on screen
    moveCharacterOne();
    moveCharacterTwo();

    /// game loop
    setInterval(function(){
      if(isIntersect()){
         return;
      }
      detectCharacterMovement();
    }, 1000/24);

    function isInsideContainerL(box){
      const obj = document.getElementById(box);
      const x = obj.offsetLeft;
      const container = document.getElementById('playground');
      var left = container.offsetLeft + 10;

      if( x>left ){
        return true;
      }
      else{
        return false;
      }

    }

    function isInsideContainerR(box){
      const obj = document.getElementById(box);
      const x = obj.offsetLeft + obj.offsetWidth;
      const container = document.getElementById('playground');
      var left = container.offsetLeft;
      var right = container.offsetWidth + left - 10;

      if(x < right ){
        return true;
      }
      else{
        return false;
      }

    }

    function isInsideContainerT(box){
      const obj = document.getElementById(box);
      const y = obj.offsetTop;
      const container = document.getElementById('playground');
      var top = container.offsetTop + 10;

      if(y > top){
        return true;
      }
      else{
        return false;
      }

    }

    function isInsideContainerB(box){
      const obj = document.getElementById(box);
      const y = obj.offsetTop;
      const container = document.getElementById('playground');
      var top = container.offsetTop;
      var bottom = container.offsetHeight - top - 100;

      if( y < bottom){
        return true;
      }
      else{
        return false;
      }

    }

    function isIntersect(){
      debugger;
      var one = document.getElementById('one');
      var x1 = one.offsetLeft;
      var x2 = x1 + one.offsetWidth;
      var y1 = one.offsetTop;
      var y2 = y1 + one.offsetHeight;


      var two = document.getElementById('two');
      var a1 = two.offsetLeft;
      var a2 = a1 + two.offsetWidth;
      var b1 = two.offsetTop;
      var b2 = b1 + two.offsetHeight;

    

    if ( (y1>b2) || (y2<b1) || (x1>a2) || (x2<a1) ) {
      return false;
    }
    else {
      var status = confirm('GAME OVER ! Press OK to play again.')
      location.reload(true);
      if(status){
        return true;
      }
      return true;
    }
  }

