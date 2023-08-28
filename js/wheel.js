let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
tg.MainButton.show()
tg.MainButton.setText("Крутить колесо"); //изменяем текст кнопки иначе
tg.MainButton.textColor = "#FFFFFF"; //изменяем цвет текста кнопки
tg.MainButton.color = "#143F6B"; //изменяем цвет бэкграунда кнопки
tg.MainButton.setParams({"color": "#143F6B"}); //так изменяются все параметры 

var content = document.getElementById("wheel");
var prize = 0;

document.addEventListener("DOMContentLoaded", () => {
  window.Telegram.WebApp.expand()

  var prizes = document.getElementsByClassName('prizes');
  prizes[0].style = "display:none";
  prizes[1].style = "display:none";
  prizes[2].style = "display:none";
  prizes[3].style = "display:none";
  prizes[4].style = "display:none";
  prizes[5].style = "display:none";
  prizes[6].style = "display:none";
  prizes[7].style = "display:none";
  prizes[8].style = "display:none";

  Telegram.WebApp.onEvent('mainButtonClicked', function(){
    tg.MainButton.disable()
  
    var cycle = 6 * 360;
    var sector = 40;
    var centersector = 20;
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://lugovskay-7ljvank33-dekol123.vercel.app/get-item");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const data = xhr.response;
        cycles = Math.ceil(sector * data) - centersector + cycle;
        content.style.transform = "rotate(" + cycles + "deg)";
        prize = data
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  });

  content.ontransitionend = function () {
    setTimeout(
      function() {
        var id = 'prize' + prize;
        var image = document.getElementById(id);
      
        fetch('https://lugovskay-7ljvank33-dekol123.vercel.app/send-response', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prize: prize, 
            image: image.src,
            initData: window.Telegram.WebApp.initData
          })
        });
      }, 2000);
  };
})