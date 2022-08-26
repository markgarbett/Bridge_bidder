// declare class for deal
class Deck
  {
    constructor()
    {
      this.deck = [];
      this.reset();
      this.shuffle();
    }

    reset()
    {
      this.deck = [];

      const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
      const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

      for (let suit in suits) 
      {
        for (let value in values) 
        {
          this.deck.push(`${values[value]} of ${suits[suit]}`);
        }
      } 
    }     

    shuffle()
    {
      const { deck } = this;
      let m = deck.length, i;

      while(m)
      {
        i = Math.floor(Math.random() * m--);

        [deck[m], deck[i]] = [deck[i], deck[m]];
      }
      return this;
    }

    deal()
    {
      this.deck.pop();
      return
    }
  }

//declare hand array
var hand = new Array(4);

for (var i = 0; i < hand.length; i++) 
{
  hand[i] = new Array(13);
}

var deck1 = new Deck();

// put deal into hands
for (var i = 0; i < 4; i++) 
{
  for(var j = 0; j < 13; j++) 
  {
    hand[i][j] = deck1.deck.pop();
  }
}

function hierarchy_of_card(opt)
{
 switch (opt) 
  {
    case "2": return 1;
    case "3": return 2;
    case "4": return 3;
    case "5": return 4;
    case "6": return 5;
    case "7": return 6;
    case "8": return 7;
    case "9": return 8;
    case "10": return 9;
    case "Jack": return 10;
    case "Queen": return 11;
    case "King": return 12;
    case "Ace": return 13;
    default: return 0;
  }    
}

// sort hands into suits
for(var i = 0; i < 4; i++) 
{
  for(var j = 0; j < 13; j++) 
  {
    for(var k = j+1; k < 13; k++)
    {
      if (hand[i][k].split(" ")[2]> hand[i][j].split(" ")[2])
      {
        const temp_string=hand[i][k]
        hand[i][k]=hand[i][j]
        hand[i][j]=temp_string
      }
    }
  }
}
//console.log(hand[0])
// sort each suit by value
for(var i = 0; i < 4; i++) 
{
  for(var j = 0; j < 13; j++) 
  {
    for(var k = j+1; k < 13; k++)
    {
      if (hand[i][k].split(" ")[2]==hand[i][j].split(" ")[2])
      {
        if (hierarchy_of_card(hand[i][k].split(" ")[0])> hierarchy_of_card(hand[i][j].split(" ")[0]))
        {
          const temp_string=hand[i][k]
          hand[i][k]=hand[i][j]
          hand[i][j]=temp_string
        }
      }
    }
  } 
}
//console.log(hand[0])

// add card graphics
const el = (tagName, attributes, children) => 
{
  const element = document.createElement(tagName);

  if (attributes) 
  {
    for (const attrName in attributes) 
    {
      element.setAttribute(attrName, attributes[attrName]);
    }
  }

  if (children) 
  {
    for (let i = 0; i < children.length; i++) 
    {
      const child = children[i];

      if (typeof child === 'string') 
      {
        element.appendChild(document.createTextNode(child));
      } 
      else 
      {
        element.appendChild(child);
      }
    }
  }

  return element;
};

const div = (a, c) => el('div', a, c);

const ranks = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
const suits = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');

const getRank = (i) => ranks[i % 13];
const getSuit = (i) => suits[i / 13 | 0];
const getColor = (i) => (i / 13 | 0) % 2 ? 'red' : 'black';

const createCard = (i) => 
{
  const rank = getRank(i);
  const suit = getSuit(i);
  const colorClass = 'card ' + getColor(i);

  return div({ class: colorClass }, 
    [
      div({ class: 'card-topleft' }, 
      [
        div({ class: 'card-corner-rank' }, 
        [
          rank
        ]),
        div({ class: 'card-corner-suit' }, 
        [
          suit
        ])
      ]),
    ]);
};

const cardsData = new Array(52);

for (let i = 0; i < cardsData.length; i++) 
{
  cardsData[i] = i;
}

const deck_graphic = div({ class: 'deck_graphic' });


// put the hand on the screen
for(var i = 0; i < 13; i++) 
{
  var card = createCard(convert_hand_to_card(hand[0][i].split(" ")[2],hand[0][i].split(" ")[0]))
  deck_graphic.appendChild(card);
}
document.body.appendChild(deck_graphic);


// calculate bid
//declare suits array  i for person j for suit
var suit_counter = new Array(4);
for (var i = 0; i < suit_counter.length; i++) 
{
  suit_counter[i] = new Array(4);
}


for (var i = 0; i < suit_counter.length; i++) 
{
  for (var j=0; j < 4; j++)
  {
    suit_counter[i][j] = 0
 //   console.log(suit_counter[i][j]);
  }
}

// high card points
var hc_points= new Array(4);
for (var i = 0; i < 4; i++) 
{
  hc_points[i] = 0
}

//populate suits array
for (var i = 0; i < 4; i++) 
{
  for (var j = 0; j < 13; j++) 
  { 
    var temp_suit=hand[i][j].split(" ")[2]
    var temp_value=hand[i][j].split(" ")[0]
    hc_points[i]=hc_points[i] + convert_value_to_hcp(temp_value)
    suit_counter[i][convert_suit_to_number_for_bidding(temp_suit)]++
  }
}
//print how many in each suit
for (var i = 0; i < 4; i++) 
{
//  console.log(suit_counter[0][i]);
} 

// declare arrays


//distribution points
var dp_points= new Array(4);
for (var i = 0; i < 4; i++) 
{
  dp_points[i] = 0
}

//total points
var total_points= new Array(4);
for (var i = 0; i < 4; i++) 
{
  total_points[i] = 0
}

//doubletons
var doubletons= new Array(4);
for (var i = 0; i < 4; i++) 
{
  doubletons[i] = 0
}

//singletons
var singletons= new Array(4);
for (var i = 0; i < 4; i++) 
{
  singletons[i] = 0
}

//voids
var voids= new Array(4);
for (var i = 0; i < 4; i++) 
{
  voids[i] = 0
}

//trick counts
var trick_counts = new Array(4);
for (var i = 0; i < 4; i++) 
{
  trick_counts[i] = new Array(4);
}

for (var i = 0; i < 4; i++) //person
{
  for (var j = 0; j < 4; j++) //suit
  {
    trick_counts[i][j] = 0
  }
}

//suit_string
var suit_string = new Array(4);

for (var i = 0; i < 4; i++) 
{
  suit_string[i] = new Array(4);
}

for (var i = 0; i < 4; i++) 
{
  for (var j = 0; j < 4; j++)
  {
    suit_string[i][j] = ""
  }
}
//trick_data
var trick_data = new Array(6);

for (var i = 0; i < 6; i++) 
{
  trick_data[i] = new Array(4);
}
trick_data[0][0]="KXX"
trick_data[0][1]="QXX"
trick_data[0][2]="zzz"
trick_data[0][3]="zzz"
trick_data[1][0]="AXX"
trick_data[1][1]="KJX"
trick_data[1][2]="QJX"
trick_data[1][3]="zzz"
trick_data[2][0]="AQX"
trick_data[2][1]="AJX"
trick_data[2][2]="KQX"
trick_data[2][3]="zzz"
trick_data[3][0]="AKX"
trick_data[3][1]="KQJ"
trick_data[3][2]="zzz"
trick_data[3][3]="zzz"
trick_data[4][0]="AKJ"
trick_data[4][1]="AQJ"
trick_data[4][2]="zzz"
trick_data[4][3]="zzz"
trick_data[5][0]="AKQ"
trick_data[5][1]="zzz"
trick_data[5][2]="zzz"
trick_data[5][3]="zzz"

//total tricks
var total_tricks= new Array(4);
for (var i = 0; i < 4; i++) 
{
  total_tricks[i] = 0
}



// iterate through the hand
for (var i = 0; i < 4; i++) // person
{
  for (var j = 0 ; j < 13 ; j++)  //card
  {
    var temp_suit=hand[i][j].split(" ")[2]  //word for suit
    temp_suit=convert_suit_to_number_for_bidding(temp_suit)  // number of suit 0 for Spades...
    var temp_value=hand[i][j].split(" ")[0]  // Ace
    temp_value=temp_value.substring(0,1);    //A or 1 for 10
    if (temp_value == 1 || temp_value == 2 || temp_value == 3 || temp_value == 4 || temp_value == 5 || temp_value == 6 || temp_value == 7 || temp_value == 8 || temp_value == 9)
    {
      temp_value="X"
    } 
 //   console.log("temp_value",temp_value);
    suit_string[i][temp_suit]=suit_string[i][temp_suit] + temp_value
  
 //   console.log("hand[i][j]",hand[i][j]);
 //   console.log("temp_suit",temp_suit);
 //   console.log("temp_value",temp_value);
 //   console.log("suit_string[i][temp_suit]",suit_string[i][temp_suit]);
  }
}
// add trick counts for each person and suit
for (var i = 0; i < 4; i++) // person
{
  for (var j = 0 ; j < 4 ; j++)  //suit
  {
//    console.log("before",suit_string[i][j]);
// if length < 3 add an X
    if (suit_string[i][j].length==0)
    {  
    suit_string[i][j]="XXX"
    }
    if (suit_string[i][j].length==1)
    {  
    suit_string[i][j]=suit_string[i][j] + "XX"
    }
    if (suit_string[i][j].length==2)
    {  
    suit_string[i][j]=suit_string[i][j] + "X"
    }

 // console.log("After",suit_string[i][j]); 
    
  //  console.log("i",i);
  //  console.log("temp_suit",temp_suit);
 //   console.log("suit_string[i][temp_suit]",suit_string[i][temp_suit]);
    
    for (i1 = 0 ; i1 < 6 ; i1++) //  holds the score
    {
      for (i2 = 0 ; i2 < 4; i2++) // one of the scoring card combinations
      {
        if ((suit_string[i][j].substr(0,3))==trick_data[i1][i2])
        {
  //        console.log("i,j",i,j);
  //        console.log("before",trick_counts[i][j]);
          
          trick_counts[i][j]=trick_counts[i][j]+(i1+1)/2

  //        console.log("after",trick_counts[i][j]);
   //       console.log("suit_string[i][j]",suit_string[i][j]);
   //       console.log("suit_string[i][j].substring(0,3)",suit_string[i][j].substring(0,3));
   //       console.log("trick_counts[i][j]",trick_counts[i][j]);
        }
        
      }
    } 
    if (suit_string[i][j].length>3)
    {
      trick_counts[i][j]=trick_counts[i][j] + suit_string[i][j].length - 3
  //    console.log("i",[i]);
    //  console.log("j",[j]);
//      console.log("suitstring after trick count",suit_string[i][j]);
   //   console.log("next one after trick count",suit_string[i][j+1]);

//console.log("Trick count for suit",[j],trick_counts[0],[j]);
      
    }
    total_tricks[i]=total_tricks[i] + trick_counts[i][j]  
  }  
}
//}

console.log("spade trick count",trick_counts[0][0])
console.log("heart trick count",trick_counts[0][1])
console.log("diamond trick count",trick_counts[0][2])
console.log("club trick count",trick_counts[0][3])



//iteration on suits for each person to calculate distribution points
for (var i = 0; i < 4; i++) // person
{
  for (var j=0 ; j<4 ; j++)  //suit
  {
    if (suit_counter[i][j]>4)
    {
      dp_points[i]=dp_points[i] + suit_counter[i][j]-4
    }
  }
  total_points[i]=hc_points[i] + dp_points[i]
}

//iteration on suits for each person to calculate number of doubletons, singletons, voids
for (var i = 0; i < 4; i++) // person
{
  for (var j=0 ; j<4 ; j++)  //suit
  {
    if (suit_counter[i][j] == 2)
    {
      doubletons[i]++
    }
    if (suit_counter[i][j] == 1)
    {
      singletons[i]++
    }
    if (suit_counter[i][j] == 0)
    {
      voids[i]++
    }
  }
}


console.log("Distribution Points",dp_points[0]);
console.log("High card points",hc_points[0]);
console.log("Total points",total_points[0]);
console.log("Doubletons",doubletons[0]);
console.log("Singletons",singletons[0]);
console.log("Voids",voids[0]);
console.log("Total tricks",total_tricks[0]);

// suit quality
//declare suit quality array i for person j for suit
var suit_quality = new Array(4);
for (var i = 0; i < suit_quality.length; i++) 
{
  suit_quality[i] = new Array(4);
}


for (var i = 0; i < suit_quality.length; i++) 
{
  for (var j=0; j < 4; j++)
  {
    suit_quality[i][j] = 0
  }
}
//iteration on suits for each person to calculate suit quality
for (var i = 0; i < 4; i++) // person
{
  for (var j = 0 ; j < 13 ; j++)  //card
  {
    var temp_suit=hand[i][j].split(" ")[2]
    var temp_value=hand[i][j].split(" ")[0]
    
    if (temp_value == "Ace" || temp_value == "King" || temp_value == "Queen")
    {
      suit_quality[i][convert_suit_to_number_for_bidding(temp_suit)]++
    }
  }
}

//iteration on suits for each person to calculate suit quality repeat to add Jack if suit quality already 1
for (var i = 0; i < 4; i++) // person
{
  for (var j = 0 ; j < 13 ; j++)  //card
  {
    var temp_suit=hand[i][j].split(" ")[2]
    var temp_value=hand[i][j].split(" ")[0]
    
    if (temp_value == "Jack")
    {
      if (suit_quality[i][convert_suit_to_number_for_bidding(temp_suit)] > 0)
      {
        suit_quality[i][convert_suit_to_number_for_bidding(temp_suit)]++
      }
    }  
  }
}

//iteration on suits for each person to get total suit quality
for (var i = 0; i < 4; i++) // person
{
  for (var j=0 ; j < 4 ; j++)  //suit
  {
   suit_quality[i][j]=suit_quality[i][j] + suit_counter[i][j]
  }
}

//console.log("Suit quality Spades", suit_quality[0][0]);
//console.log("Suit quality Hearts", suit_quality[0][1]);
//console.log("Suit quality Diamonds", suit_quality[0][2]);
//console.log("Suit quality Clubs", suit_quality[0][3]);


//declare bid array
var bid= new Array(4);
for (var i = 0; i < 4; i++) 
{
  bid[i] = "Pass"
}

//declare balanced array
var balanced= new Array(4);
for (var i = 0; i < 4; i++) 
{
  balanced[i] = "Balanced"  //or "Semi-balanced" or "Not balanced"
}

//declare Roman array
var roman= new Array(4);
for (var i = 0; i < 4; i++) 
{
  roman[i] = "No"  // or "Yes"
}

// dim variables to find longest suit and how many of this suit
var temp_max=0

var max_suit= new Array(4);
for (var i = 0; i < 4; i++) 
{
  max_suit[i] = 0  
}

var n_max_suits= new Array(4);
for (var i = 0; i < 4; i++) 
{
  n_max_suits[i] = 0  
}

 
// work out whether balanced or roman
for (var i = 0; i < 4; i++) // person
{

// find the longest suit and how many of that suit
  temp_max=0
  for (var j = 0; j < 4; j++) 
  { 
    if (suit_counter[i][j]>temp_max)
    {
      temp_max=suit_counter[i][j]
      max_suit[i]=j
    }
  }
  n_max_suits[i]=0
  for (var j = 0; j < 4; j++) 
  { 
    if (suit_counter[i][j]==temp_max)
    {
      n_max_suits[i]++
    }
  } 

//  console.log("i ",i);
//  console.log("temp_max ",temp_max);
//  console.log("max_suit",max_suit);
//  console.log("n_max_suits",n_max_suits);

// check if Roman
if (n_max_suits[i]==3)
{
  roman[i]="Yes"
// find the singleton and check if it is an Ace
singleton_suit=0
  for (var i5=0; i5 < 4; i5++)
    {
      if (suit_counter[i][i5] == 1)
      {
        singleton_suit=i5;
      }      
    }
  for (var j = 0 ; j < 13; j++)
  {
    if (hand[i][j].split(" ")[0]=="Ace" && hand[i][j].split(" ")[2]==suit_name(singleton_suit))
    {
 //     console.log("Roman check value",hand[i][j].split(" ")[0]);
 //     console.log("Roman check suit",hand[i][j].split(" ")[2]);
 //     console.log("Suit name max suit",suit_name(max_suit));
      balanced[i]="Semi-balanced"
    } 
  } 
} 

// check if balanced
  for (var j=0 ; j<4 ; j++)  //suit
  {
    if (suit_counter[i][j] == 0)
    {
      balanced[i]="Not balanced"
    }
    if (suit_counter[i][j] == 1)
    {
      if (balanced[i] != "Semi-balanced")
      {
        balanced[i]="Not balanced"
      }  
    }
  }
  if (balanced[i] != "Semi-balanced" && balanced[i] != "Not balanced")
  {
  switch (temp_max)
    {
      case 5 :
 //         console.log("temp max",temp_max);
        if (doubletons[i]==2)
        {
          balanced[i]="Semi-balanced"
        }
        else
        if (doubletons[i]==1)   
        {
//          console.log("doubletons",doubletons[i]);
//          console.log("max suit",max_suit);
          if (max_suit[i] < 2)
            {
              balanced[i]="Not balanced"
            }
            else
            {
              balanced[i]="Balanced"
            }
        }
        else
        if (doubletons[i]==0) 
        {
          balanced[i]="Not balanced"
        }  
      
      case 6 :
        if (doubletons[i]==2)
        {
          balanced[i]="Semi-balanced"
        }
    }
  }   
}
console.log("Balanced?", balanced[0]);
console.log("Roman?",roman[0]);


//work out the bid
bidloop:  for (var i = 0; i < 4; i++) 
{

  bid[i]="Nothing yet"
console.log("bid",bid[i]);
// A    2D for >22 points
  if (hc_points[i] > 22)
  {
    bid[i]="2D"
    break bidloop;
  }
// end of 2D
console.log("bid",bid[0]);
//B     2NT for 21-22
  if (hc_points[i]==21 || hc_points[i]==22)
  {
    if (balanced[i]=="Balanced" && balanced[i]=="Semi-balanced")
    {
      bid[i]="2NT"
      break bidloop;
    }  
    else
    {
      bid[i]="1"
    } 
  }
// B  end of 2NT
console.log("bid",bid[0]);
// C  20 for 2C
  if (hc_points[i]==20)
  {  
    bid[i]="2C"
    break bidloop;
  }
// C  end of 2C for 20
console.log("bid",bid[0]);
// D  2C for 8 or 9 tricks
  if (((max_suit[i]==0 || max_suit[i]==1) && total_tricks[i]>7.5) || ((max_suit[i]==2 || max_suit[i]==3) && total_tricks[i]>8.5))
  {
    bid[i]="2C"
    break bidloop;
  }
// D  end of 2C for 8 or 9 tricks
console.log("bid",bid[0]);
//E 15-19
  if (hc_points[i]==15 || hc_points[i]==16 || hc_points[i]==17 || hc_points[i]==18 || hc_points[i]==19)
  {  
    bid[i]="1"
  }
// E end of 15-19
console.log("bid",bid[0]);
console.log("HCPOINT",hc_points[0]);
console.log("balanced?",balanced[0]);
//F 12-14 1NT
  if (hc_points[i]==12 || hc_points[i]==13 || hc_points[i] == 14)
  { 
    if (balanced[i]=="Balanced")
    {  
      bid[i]="1NT"
      console.log("Balanced for a NT bid?",balanced[0]);
      console.log("1NT at 759",bid[0]);
      console.log("HC POINTS",hc_points[0]);
      break bidloop;
    }
  } 
// end of F 12-14 1NT
console.log("bid",bid[0]);
//G >11 HCP for rule of 20
  if (total_points[i]>11)
    {      
      bid[i]="1"
    }
//end of G ? 11 for rule of 20
console.log("bid",bid[0]);
//H check for a weak 2
  if (hc_points[i]>4 && hc_points[i]<12)
  {
    if (suit_counter[i][0]==6 && suit_quality[i][0]> 7)
    {
      bid[i]="2S"
      break bidloop;
    }  
    if (suit_counter[i][1]==6 && suit_quality[i][0]> 7)
    {
      bid[i]="2H"
      break bidloop;
    } 
  }  
 // end of H check for a weak 2   
 console.log("bid",bid[0]);
// I check for a preempt of 3 or higher
  if (suit_quality[i][max_suit]==9)
  {
    if (hcp[i][max_suit]<10)
    {
      bid[i]="3" & suit_name(max_suit).substring(0,1);
      break bidloop;
    }
    else
    { 
      bid[i]="1" & suit_name(max_suit).substring(0,1);
      break bidloop;
    } 
  }  
  if (suit_quality[i][max_suit]==10)
  { 
    if (hcp[i][max_suit]<10)
    {
      bid[i]="4" & suit_name(max_suit).substring(0,1);
      break bidloop;    
    }
    else
    {
      bid[i]="1" & suit_name(max_suit).substring(0,1);
      break bidloop;
    } 
  }  
  if (suit_quality[i][max_suit]>10)
  {   
    if (max_suit<2)
    {
      if (hcp[i][max_suit]<10)
      { 
        bid[i]="4" & suit_name(max_suit).substring(0,1);  
        break bidloop;   
      }
      else
      {
        bid[i]="1" & suit_name(max_suit).substring(0,1);
        break bidloop;
      } 
    } 
    else
    {
      if (hcp[i][max_suit]<10)
      { 
        bid[i]="5" & suit_name(max_suit).substring(0,1);   
        break bidloop;  
      } 
      else
      { 
        bid[i]="1" & suit_name(max_suit).substring(0,1);
        break bidloop;
      } 
    }  
  } 
  
// end of I check for 3 or higher preempt
console.log("bid",bid[0]);
// J check which 1 bid
  if (bid[i]== 1)
  {
    if (n_max_suits[i]==1)
    {
      bid[i]="1" + suit_name(max_suit[i]).substring(0,1);
      break bidloop;
    }
    if (n_max_suits[i]==2)
    {
// if 5 or 6 bid the higher
      if (suit_counter[i][max_suit[i]]==5  ||  suit_counter[i][max_suit[i]] == 6)
      { 
        for (var i5=0; i5 < 4 ; i5++)
        {
          if (suit_counter[i][i5] == suit_counter[i][max_suit[i]])
          {
      //    console.log("max suits",n_max_suits[i]);
      //    console.log("i5",i5);
      //    console.log("suit counter i i5",suit_counter[i][i5]);
      //    console.log("suit counter i max suit",suit_counter[i][max_suit[i]]);
      //    console.log("suit name",suit_name(i5));
            bid[i]="1" + suit_name(i5).substring(0,1);
            break bidloop;
          }      
        }    
      }
      else
      { 
// bid the lower of 2 4 card suits
        for (var i5=3; i5 > -1; i5--)
        {
          if (suit_counter[i][i5] == suit_counter[i][max_suit[i]])
          {
            console.log("max suits",n_max_suits[i]);
            console.log("i5",i5);
            console.log("suit counter i i5",suit_counter[i][i5]);
            console.log("suit counter i max suit",suit_counter[i][max_suit[i]]);
            console.log("suit name",suit_name(i5));
            bid[i]="1" + suit_name(i5).substring(0,1);
            break bidloop;
          }      
        }  
      }
    } 
    else
// roman
// find the singleton
    singleton_suit=0
    for (var i5=0; i5 < 4; i5++)
      {
        if (suit_counter[i][i5] == 1)
        {
          singleton_suit=i5;
        }      
      }
      if (singleton_suit==0 || singleton_suit==1 )
      {
        bid[i]="1" + "D";
        break bidloop;
      } 
      if (singleton_suit==2)
      {
        bid[i]="1"+ "C";
        break bidloop;
      } 
      if (singleton_suit==3)
      {
        bid[i]=bid[i] + "H";
        break bidloop;
      } 
    }
// end of J 1 bid.  Nothng else but pass
  bid[i]="Pass"  
  } 

console.log("Bid ",bid[0]);


set_up_button_group_for_bid_level();
set_up_button_group_for_bid_suit();
set_up_player_bid();
display_player_bid();
set_up_correct_bid();
//display_correct_bid();

set_up_verdict();
//display_verdict();

set_up_buttons();

// functions at the end
function convert_hand_to_card(i,j)
{
 switch (j) 
  {
    case "Ace": return 13*convert_suit_to_number(i)+0;
    case "2": return 13*convert_suit_to_number(i)+1;
    case "3": return 13*convert_suit_to_number(i)+2;
    case "4": return 13*convert_suit_to_number(i)+3;
    case "5": return 13*convert_suit_to_number(i)+4;
    case "6": return 13*convert_suit_to_number(i)+5;
    case "7": return 13*convert_suit_to_number(i)+6;
    case "8": return 13*convert_suit_to_number(i)+7;
    case "9": return 13*convert_suit_to_number(i)+8;
    case "10": return 13*convert_suit_to_number(i)+9;
    case "Jack": return 13*convert_suit_to_number(i)+10;
    case "Queen": return 13*convert_suit_to_number(i)+11;
    case "King": return 13*convert_suit_to_number(i)+12;
    default: return 0;
  }    
}

function convert_value_to_hcp(i)
{
  switch(i)
  {
    case "Ace": return 4;
    case "King": return 3;
    case "Queen": return 2;
    case "Jack": return 1;
    default: return 0;
  }
} 

function convert_suit_to_number(i)
{
  switch (i) 
   {
     case "Spades": return 0;
     case "Hearts": return 1;
     case "Clubs": return 2;
     case "Diamonds": return 3;     
     default: return 4;
   }    
}

function convert_suit_to_number_for_bidding(i)
{
  switch (i) 
   {
     case "Spades": return 0;
     case "Hearts": return 1;
     case "Clubs": return 3;
     case "Diamonds": return 2;     
     default: return 4;
   }    
}

function suit_name(i)
{
 // console.log("i",i);
  if (i==0)
  {
    return "Spades"
  }
  if (i==1)
  {
    return "Hearts"
  }
  if (i==2)
  {
    return "Diamonds"
  }
  if (i==3)
  {
    return "Clubs"
  }
 
}

function set_up_correct_bid()
{
  const input = document.createElement("input");
  input.setAttribute("id", "correct_bid");
  input.setAttribute("type", "text");
  input.setAttribute("size", "4");
  input.style.visibility="hidden";
  document.body.appendChild(input);
 // console.log("bid[0]",bid[0]);
 // console.log("correct bid",suit_letter_to_icon(bid[0]));

  // strip trailing space if there is one
//  var temp4=suit_letter_to_icon(bid[0])
//  var temp5=""
//  console.log("temp4",temp4);
//for (var i6=0;i6<temp4.length;i6++)
//{
  //console.log("i6",temp4.substr(i6,1));
//}


 // console.log("temp4",temp4)
 // console.log("length",temp4.length)
 // console.log("last character of temp4",temp4.substr(temp4.length-1,1));
 // if (temp4.substr(temp4.length-1,1) == "")
 // {
//    temp5=temp4.substr(0,temp4.length-1)
//  }  
//  else
//  {
//    temp5=temp4
//  } 

//console.log("temp5",temp5)
//console.log("length",temp5.length)


//console.log("bid[0]",bid[0]);
//console.log("trimmed",suit_letter_to_icon(bid[0].trim()))
//console.log("length",suit_letter_to_icon(bid[0].trim()).length)
//console.log("length",suit_letter_to_icon(bid[0].trim()).trim().length)
  document.getElementById("correct_bid").value = suit_letter_to_icon(bid[0].trim()).trim();

  const label = document.createElement("label");
  label.setAttribute("for", "correct_bid");
  label.setAttribute("id", "lbl_correct_bid");
  label.innerHTML = "Correct bid: ";
  label.style.visibility="hidden";

  var Correct_bid_Text = document.getElementById("correct_bid");

  document.body.insertBefore(label, Correct_bid_Text); 
 }

 function set_up_player_bid()
 {
  const input = document.createElement("input");
  var player_bid_string="";
  input.setAttribute("id", "player_bid");
  input.setAttribute("type", "text");
  input.setAttribute("size", "4");
  input.style.visibility="hidden";
  document.body.appendChild(input);
 
   //document.getElementById("player_bid").value = bid[0];
 
  const label = document.createElement("label");
  label.setAttribute("for", "player_bid");
  label.setAttribute("id", "lbl_player_bid");
  label.innerHTML = "Your bid: ";
  label.style.visibility="hidden";
 
  const Player_bid_Text = document.getElementById("player_bid") 
  document.body.insertBefore(label, Player_bid_Text); 
  }

function display_correct_bid()
{
 // document.getElementById("correct_bid").style.visibility = "visible";
 // document.getElementById("lbl_correct_bid").style.visibility = "visible";
  
  work_out_verdict()
}

function display_player_bid()
{
  document.getElementById("player_bid").style.visibility = "visible";
  document.getElementById("lbl_player_bid").style.visibility = "visible";
 // console.log("player bid string",player_bid_string);
//  display_correct_bid();
}

function set_up_buttons()
{
// new line
  var div = document.createElement('div');
  document.body.appendChild(div);
// create button 
  var clickBtn= document.createElement("btn_new");

  // Adding the button to the html page */
  document.body.appendChild(clickBtn);
  clickBtn.style.visibility="Hidden";
// set the class
  clickBtn.classList.add('clickBtn');
// Setting the button's text label */
  clickBtn.innerHTML = "New hand";
// Setting the button's id */
  clickBtn.id = "btn_new_hand";
//console.log("button says new hand")
  clickBtn.onclick = function () 
  {
    location.href = "index_current_version.html";
  };
}

function set_up_verdict()
{
  // new line
  var div = document.createElement('div');
  document.body.appendChild(div);
  const input = document.createElement("input");
  input.setAttribute("id", "verdict");
  input.setAttribute("type", "text");
  input.setAttribute("size", "4");
  input.style.visibility="hidden";
  document.body.appendChild(input);
  document.getElementById("verdict").value = "";
 }

function work_out_verdict()
{
  //console.log("player_bid",document.getElementById("player_bid").value);
  //console.log("player bid length",document.getElementById("player_bid").value.length);
  //console.log("correct bid length",document.getElementById("correct_bid").value.length);
  //console.log("correct bid 1",document.getElementById("correct_bid").value.substr(0,1));
  //console.log("correct bid 2",document.getElementById("correct_bid").value.substr(1,1));
  //console.log("correct bid 3",document.getElementById("correct_bid").value.substr(2,1));
  //console.log("correct bid",document.getElementById("correct_bid").value);
  //console.log("=?",document.getElementById("player_bid").value == document.getElementById("correct_bid").value);

  document.getElementById("verdict").style.color="White";
  if (document.getElementById("player_bid").value == document.getElementById("correct_bid").value)
  {
    document.getElementById("verdict").style.backgroundColor="Green";
    document.getElementById("verdict").value="Correct";
    document.getElementById("btn_new_hand").style.visibility="visible";
 //   document.getElementById("btn_new_hand").style.visibility="visible";
 
  //var elem=document.getElementById("btn_restart");
  //elem.style.position = "absolute";  
  //elem.style.top = "400px";
  //elem.style.visibility="visible";
  //elem.style.hidden="visible"
  //console.log("button visibility",elem.style.visibility);
  //console.log("button test",elem.textContent);
  //console.log("button test",elem.style.hidden);
  } 
  else
  {
    document.getElementById("verdict").style.backgroundColor="Red";
    document.getElementById("verdict").value="Incorrect";
  } 

  document.getElementById("verdict").style.visibility = "visible";
  
 }

function New_hand_action()
{
 // document.getElementById("btn_new_hand").style.visibility="visible";
  
 // console.log("You clicked me");
 // document.getElementById("btn_new_hand").innerHTML="You clicked me";
  
}

function set_up_button_group_for_bid_level()
{
  var Btn_group_for_bid_level = document.createElement("Div");
  Btn_group_for_bid_level.id = "Btn_group_ID";
  Btn_group_for_bid_level.classList.add("btn-group");

  for (var i=0;i<8;i++)
  {
    var button = document.createElement("Button");
    Btn_group_for_bid_level.appendChild(button);
    if (i==0)
    {
      button.innerText="Pass"
      button.style.background = "Green"
      button.style.color="White"
    }
    else  
    {  
    button.innerText=i
    }
    button.id="Btn" + i
    button.onclick = Bid_level_action;
 //   console.log("color",button.style.color);
 //   console.log("id",button.id);
 //   console.log("text",button.textcontent);
  }
  document.getElementsByTagName("body")[0].appendChild(Btn_group_for_bid_level);
}


function Bid_level_action()
{
  document.getElementById("player_bid").value = document.getElementById(this.id).innerText
//  console.log("this id",this.id);
  if (this.id !="Btn0")
  {
    document.getElementById("Btn_group_suit_ID").style.visibility="visible";
//    player_bid_string="Pass"
  }
  else
  {
    display_correct_bid();
//    player_bid_string=document.getElementById(this.id).innerText
  }
//  console.log("player bid string",player_bid_string);
}

function set_up_button_group_for_bid_suit()
{
  var Btn_group_for_bid_suit = document.createElement("Div");
  Btn_group_for_bid_suit.id = "Btn_group_suit_ID";
  Btn_group_for_bid_suit.classList.add("btn-group-suit");
  Btn_group_for_bid_suit.style.visibility="hidden";


  for (var i=0;i<5;i++)
  {
    var button = document.createElement("Button");
    Btn_group_for_bid_suit.appendChild(button);
    if (i==0)
    {
      button.innerText="♣"  
    }
    if (i==1)
    {
      button.innerText="♦"  
    }
    if (i==2)
    {
      button.innerText="♥"  
    }
    if (i==3)
    {
      button.innerText="♠"  
    }
    if (i==4)
    {
      button.innerText="NT"  
    }  
    button.id="Btn_suit" + i
    button.onclick = Bid_suit_action;
 //   console.log("color",button.style.color);
 //   console.log("id",button.id);
 //   console.log("text",button.textcontent);
  }
  document.getElementsByTagName("body")[0].appendChild(Btn_group_for_bid_suit);
}

function Bid_suit_action()
{
  document.getElementById("player_bid").value = document.getElementById("player_bid").value + document.getElementById(this.id).innerText
  document.getElementById("Btn_group_suit_ID").style.visibility="hidden";

  display_correct_bid();
}

function suit_letter_to_icon(s)
{
//  console.log("s",s);
//  console.log("1,1",s.substr(1,1));
  
  if (s=="Pass")
  {
  return "Pass"
  }
// if not pass strip characters after the number
  if (s.substr(1,1)=="N")
  {
    return s
  }
  var temp1
  temp1=s.substr(0,1)  
  var temp2
  temp2=s.substr(1,1)  
 // console.log("temp1",temp1);
 // console.log("temp2",temp2);
  if (temp2=="C")
  {
  return (temp1 + "♣").substring(0,2)
  }
  if (temp2=="D")
  {
  return (temp1 + "♦︎").substring(0,2)
  }
  if (temp2=="H")
  {
  return (temp1 + "♥︎").substring(0,2)
  }
  if (temp2=="S")
  {
  return (temp1 + "♠︎").substring(0,2)
  }
}
