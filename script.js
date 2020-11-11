let cardsData = [1,2,3,4,5,6,7,8,9];
let colors = ['#6F98A8','#2B8EAD','#2F454E','#2B8EAD','#2F454E','#EFEFEF','#EFEFEF','#BFBFBF','#72C3DC','#2F454E']
class Cards {  
  constructor(data,cardsContainer,colors,callbacks) {
    this.data = data.sort();
    this.dataLength = data.length;
    this.container = document.getElementById(cardsContainer);
    this.colors = colors;
    /* to make  user perform custom actions on click of buttons. 
    this will be called from event handles;
    */
    this.callbacks = callbacks; 
    // caching the sorted view in virtualUL so that we can reuse it
    // when user clicks on sort with out building it again.
    this.virtualUL =  document.createElement('ul');
  }
  createCardsView() { 
    let copyOfData = [...this.data] ;
    var ulEle =  document.createElement('ul');
     for(let i=0;i<this.dataLength;i++)     {
       let li1 = document.createElement('li');
       li1.innerHTML = '<span class="coloredspan"></span><span class="dataSpan">'+copyOfData[i]+'</span>';
        li1.style.backgroundColor = this.colors[i];
        ulEle.append(li1);
        let li2 = document.createElement('li');
       li2.innerHTML = '<span class="coloredspan"></span><span class="dataSpan">'+copyOfData[i]+'</span>';
        li2.style.backgroundColor = this.colors[i];
        this.virtualUL.append(li2);   
    }
     ulEle.setAttribute('id','cardsContainer');     
     this.container.append(ulEle);
    console.log(ulEle);
    this.createUserInteraction();
  }

  shuffleCards() {
    let tempUL = document.createElement('ul');
    let copyOfData = [...this.data] ;// using the copy of data to retain original array as it is.
    for (let i = this.dataLength - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
       [copyOfData[i], copyOfData[j]] = [copyOfData[j], copyOfData[i]];
        let li = document.createElement('li');
         li.style.backgroundColor = this.colors[i];
       li.innerHTML = '<span class="coloredspan"></span><span class="dataSpan">'+copyOfData[i]+ '</span>';
       tempUL.append(li);       
    }
    document.getElementById('cardsContainer').innerHTML = tempUL.innerHTML;
  }
  sortTheCards(){
    // reuse sorted view form cache
     document.getElementById('cardsContainer').innerHTML = this.virtualUL.innerHTML;
  }
  createUserInteraction(){
     let div=document.createElement('div')  
         div.setAttribute('id','userInteraction');
     div.innerHTML = '<button id="shuffle">Shuffle</button> <button id="sort">Sort</button>';
     this.container.append(div);
     document.getElementById('shuffle').addEventListener('click',this.shuffleCards.bind(this));
     document.getElementById('sort').addEventListener('click',this.sortTheCards.bind(this));
  }
  
}
var cards = new Cards(cardsData,"cards",colors);
cards.createCardsView();
//cards.shuffleCards();


