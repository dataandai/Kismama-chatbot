const popup = document.querySelector('.chat-popup');
const chatBubble = document.querySelector('.chat-btn');
const submitBtn = document.querySelector('.submit');
const chatArea = document.querySelector('.chat-area');
const inputElm = document.querySelector('input');
const askButton = document.querySelector('.askButton');


chatBubble.addEventListener('click', ()=>{
    popup.classList.toggle('show');
})

askButton.addEventListener('click', ()=>{
  popup.classList.toggle('show');
})

// Send message  -> (enter key not working yet) -- ()
submitBtn.addEventListener('click', ()=>{

    let userInput = inputElm.value;

    if(userInput != "")
    {
      let temp = `<div class="out-msg">
      <span class="my-msg">${userInput}</span>
      <img src="./img/robotChatface2X.png" class="avatar">
      </div>`;

  
      chatArea.insertAdjacentHTML("beforeend", temp);
      GiveAnswer();
      inputElm.value = "";
    }
   

})

function GiveAnswer() {

    let text = "Köszönöm a kérdésed";
      //ai answer
      let answer = `<div class="income-msg">
      <img src="./img/robotChatface2X.png" class="avatar" alt="">
      <span class="msg">${text}</span>
  </div>`;
  chatArea.insertAdjacentHTML("beforeend", answer);

}


//template code

text = "";
function replaceText(ents) {
    text = "";
    for (var ent of ents) {
        key = Object.keys(ent)[0];
        text += '<p><span class="tag is-info">'+ (ent[key]).toFixed(2) +'</span> ' + key + '</p>\n'
    }
    document.getElementById('box').innerHTML = text;
}


function getEntities(text) {
    const options = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ text })
    };

    ents = fetch('http://' + window.location.hostname + ':80/pred', options)
        .then(res => res.json())
        .then(entities => {
            return replaceText(entities);
        });

    return ents;
}

document.getElementById('send').addEventListener('click', (ev) => {

    text = document.getElementById("textcontent").value;
    console.log(text)
    getEntities(text);

});