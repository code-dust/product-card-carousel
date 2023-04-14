let productCardWrapper001 = document.querySelectorAll('.card-wrapper001');

productCardWrapper001.forEach((wrapper) =>{                      

                                                                                          /*PRODUCT SLIDER FUNCTIONALITY*/
 
let imgSelectWrapperWrap = wrapper.querySelectorAll('.img-select-wrapper .wrap');
let imgSelect = wrapper.querySelectorAll('.img-select-wrapper .wrap .img-select');
let activeImgShowCase = wrapper.querySelector('.img-showcase.active');
let imgShowCase = wrapper.querySelectorAll('.img-showcase');

// img-showcase clones
imgShowCase.forEach((imgCase) =>{
	let slideImg = imgCase.children;
	const firstImgClone = slideImg[0].cloneNode(true);
    const lastImgClone = slideImg[slideImg.length-1].cloneNode(true);
    firstImgClone.classList.add('firstImgClone');
    lastImgClone.classList.add('lastImgClone');
	imgCase.append(firstImgClone);
    imgCase.prepend(lastImgClone);
});

//img-select clones
imgSelectWrapperWrap.forEach((wrap) =>{
	let imgSelect = wrap.children;
	const firstImgSelectClone = imgSelect[0].cloneNode(true);
    const lastImgSelectClone = imgSelect[imgSelect.length-1].cloneNode(true);
    firstImgSelectClone.classList.add('firstImgSelectClone');
	lastImgSelectClone.classList.add('lastImgSelectClone');
    wrap.append(firstImgSelectClone);
	wrap.prepend(lastImgSelectClone);
	
});






//boolean to check when we are on the first or last slide 
var currentSlideIsfirstSlide=true;
var currentSlideIslastSlide=false;




let slideImg = wrapper.querySelectorAll('.img-showcase.active img');
let indexOfFirstNonCloneImage = 1 ;
let indexOfLastNonCloneImage = slideImg.length -2;//this gets us the index of the last non clone img in an active showcase




//imgShowcaseSliderCounter
let imgShowcaseSliderCounter = 1;

//default orientation of the active img-showcase slider
let slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
activeImgShowCase.style.transform = `translateX(${imgShowcaseSliderCounter * -slideImgWidth}px)`;

//default orientation of all img-showcase slider
imgShowCase.forEach((imgcase) =>{
   imgcase.style.transform = `translateX(${imgShowcaseSliderCounter * -slideImgWidth}px)`;
});



//imgSelectorSliderCounter
let imgSelectorSliderCounter = 1;

//default orientation of the img-select-wrapper-wrap slider
let slideImgSelectorWidth = wrapper.querySelector('.img-select-wrapper').clientWidth;
imgSelectWrapperWrap.forEach((wrap) =>{
	wrap.style.transform =`translateX(${imgSelectorSliderCounter * -slideImgSelectorWidth}px)`;
});
							 


var currentOrientationIndexOfActiveSlider = 1;// this variable is used by the stabilizers() function to know where to translate the img-showcases to whenever the window is resized


const firstSlideStateWatch = () =>{//watch if we are on the first slide
	   let indexOfFirstNonCloneImage = 1 ;
       let indexOfLastNonCloneImage = slideImg.length - 2;
       if(imgShowcaseSliderCounter==1){
	       currentSlideIsfirstSlide = true;//if yes , then set its check boolean to true
	   }
	   else{
	       currentSlideIsfirstSlide = false;// as soon as we are no longer on the first slide set its boolean to false
	   }
};
	
const lastSlideStateWatch = () =>{//same for last slide
	   let indexOfFirstNonCloneImage = 1 ;
       let indexOfLastNonCloneImage = slideImg.length - 2; 
       if(imgShowcaseSliderCounter==indexOfLastNonCloneImage){
	       currentSlideIslastSlide = true;
	   }
	   else{
	       currentSlideIslastSlide = false;
	   }
};
	  



const imgs = wrapper.querySelectorAll('.img-select-wrapper .wrap .img-select a');
const imgBtns = [ ... imgs];

let imgId = 1;

//img-select buttons functionality
imgBtns.forEach((imgBtn) =>{
	imgBtn.addEventListener('click',(event) => {
		event.preventDefault();
		imgId = imgBtn.dataset.id;
		slideImage();//slide the active slider(active img-showcase) when an imgBtn is clicked
		styleImgbtnOnImgBtnClick(imgBtn);//style the imgBtns when clicked
	});
});

function styleImgbtnOnImgBtnClick(imgBtn){
	imgBtnImgSelect = imgBtn.parentElement.parentElement;//selects the grandparent of the clicked imgBtn which turns out to be an : '.img-select'
	let imgItem = imgBtnImgSelect.querySelectorAll('.img-item');//selects all the img-item under the img-slect of the just clicked img-btn
	function removeActiveClassInAllImgBtn(){//removes the styling of all the img-item under the img-select of the just clicked img-btn
		imgItem.forEach((item) =>{
			item.classList.remove('active');
			
		});
	}
	function selectAnActiveImgBtn(imgBtn){//styles the img-item of the just clicked img-btn 
		selectedItem = imgBtn.parentElement;
		selectedItem.classList.add('active');
	}
	removeActiveClassInAllImgBtn();
	selectAnActiveImgBtn(imgBtn);
}

function slideImage(){
	let activeSlideImgs = wrapper.querySelectorAll('.img-showcase.active img');
	let indexOfFirstSlideClone=activeSlideImgs.length -1;
    let indexOfLastSlideClone=0;
	let indexOfFirstNonCloneImage = 1 ;
    let indexOfLastNonCloneImage = activeSlideImgs.length -2;
	
	//Slide the active img-showcase
	if((imgId==1)&&(currentSlideIslastSlide==true)){
	   imgShowcaseSliderCounter = indexOfFirstSlideClone;//(&&&1)//the 'transitioned' function for the slider needs this , it uses it to check index of an image in the slide in this case the image it will check will be the that of the firstslide clone . this is very important because since we are about to transition the slider to the position of a clone image we want the transitioned function to get its index as well so that it can run the right set of code	
	   const slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
	   wrapper.querySelector('.img-showcase.active').style.transition ='all 0.45s linear';
	   wrapper.querySelector('.img-showcase.active').style.transform = `translateX(${- (indexOfFirstSlideClone) * slideImgWidth}px)`;
	   //imgShowcaseSliderCounter = imgId; reason we cant use this is because it messes with what we have set at (&&&1), the way javascript works it doesnt pause long enough to allow the translate code above run before doing this and besides 'transitioned' function already helps us take care of this by setting 'imgShowcaseSliderCounter' to 'slideImg.length - imgShowcaseSliderCounter' which is equal to '5-4' = 1 (the same value as imgId) 
	   currentOrientationIndexOfActiveSlider = imgId;// this variable is used by the stabilizers() function to know where to translate the img-showcases to whenever the window is resized : in this case we want it to maintain the position the active-img-showcase just translated to which according to imgId is the first image
       
	   
		
	   
	}
	
	else if((imgId==indexOfLastNonCloneImage)&&(currentSlideIsfirstSlide==true)){
	   imgShowcaseSliderCounter = indexOfLastSlideClone;	
	   const slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
	   wrapper.querySelector('.img-showcase.active').style.transition ='all 0.45s linear';
	   wrapper.querySelector('.img-showcase.active').style.transform = `translateX(${- (indexOfLastSlideClone) * slideImgWidth}px)`;
	   //imgShowcaseSliderCounter = imgId;	
	   currentOrientationIndexOfActiveSlider = imgId;
	   	
		
	}
	
	
	else{
	   imgShowcaseSliderCounter = imgId;//to synchronize the working of the img-select buttons with the nextBtn & prevBtn functionalities so that the prevBtn and nextBtn continue orienting the sliders from where the orientaions made by the imgBtns are currently	
	   const slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
	   wrapper.querySelector('.img-showcase.active').style.transition ='all 0.45s linear';
	   wrapper.querySelector('.img-showcase.active').style.transform = `translateX(${- (imgId) * slideImgWidth}px)`;
	   currentOrientationIndexOfActiveSlider = imgId;
	   
	   	
}
	
	
	

	
	}

//this function orients the active img-showcase to a postion that allows it maintain its current position
function activeImgShowCaseStabilizer(){
	
	orient = currentOrientationIndexOfActiveSlider;//has the same value as 'currentOrientationIndexOfActiveSlider' 
	let slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
	wrapper.querySelector('.img-showcase.active').style.transition ='all 0.45s linear';
	wrapper.querySelector('.img-showcase.active').style.transform = `translateX(${-orient * slideImgWidth}px)`;
	
}

//this function orients the inactive img-showcase to a postion containing the first non-clone image
function unactiveImgShowCaseStabilizer(){
	//To allow the other inactive img-showcases adjust their slide orientation so that whenever they are made active their new widths will align well with a change in window size
	//[the below would only ensure that the other inactive img-showcases are translated to the position of the first non-clone image on the slide]
	//[if we want them to have their slide orientation align with their CORRESPONDING former position then : (1)get their current X-orientation(after all its still their former orientation they are still using) (2)divide it by their former slideImgWidth (3)multiply it by their new slideImgWidth . So we just need a way to get/track old/former slideImgWidth] (4)use gotten value in CSS translateX property to translate them
	const slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
	let imgShowCase = wrapper.querySelectorAll('.img-showcase');
    imgShowCase.forEach((imgcase) =>{
	  	
	  if (!(imgcase.classList.contains('active'))){
        imgcase.style.transform = `translateX(${1 * -slideImgWidth}px)`;
	  }
	});
}

//sets the active img-case to its current positions when run and the inactive ones to the position of the first non-clone image
function stabilizers(){
	var currentOrientationIndexOfActiveSlider;//both activeImgShowCaseStabilizer() & unactiveImgShowCaseStabilizer() functions need this
	activeImgShowCaseStabilizer();
	unactiveImgShowCaseStabilizer();
}

                                                                                     








                                                                                       /*PRODUCT COLOR BTNS FUNCTIONALITY*/

//
let colorBtns = wrapper.querySelectorAll('.color-item');
var currentShowcaseIsFirstShowcase = true;
var currentShowcaseIsLastShowcase = false;
let indexOfFirstNonCloneImgSelect = 1 ;
let indexOfLastNonCloneImgSelect = colorBtns.length;
var imgSetId = 1;

const firstShowcaseStateWatch = () =>{//watch if we are on the first non-clone img-select , same as watching if we are on the first showcase(slider)
	   let indexOfFirstNonCloneImgSelect = 1 ;
       let indexOfLastNonCloneImgSelect = colorBtns.length;
       if(imgSelectorSliderCounter == indexOfFirstNonCloneImgSelect){
	       currentShowcaseIsFirstShowcase = true;//if yes , then set its check boolean to true
		   }
	   else{
	       currentShowcaseIsFirstShowcase = false;// as soon as we are no longer on the first showcase(slider) set the boolean to false
		  }
};
	
const lastShowcaseStateWatch = () =>{//same for last slide
	   let indexOfFirstNonCloneImgSelect = 1 ;
       let indexOfLastNonCloneImgSelect = colorBtns.length;
       if(imgSelectorSliderCounter == indexOfLastNonCloneImgSelect){
	       currentShowcaseIsLastShowcase = true;
	   }
	   else{
	       currentShowcaseIsLastShowcase = false;
		   }
};




colorBtns.forEach(colorBtn => {
	
	colorBtn.addEventListener('click', () => {
	  event.preventDefault();	
	  imgSetId = colorBtn.dataset.id;//get the id of the bolor button clicked
	  
	  
	  
	  	
	  if(!colorBtn.classList.contains('active-color')){
		  
		  
		  imgSelectorSliderCounter= imgSetId;//'slideImageSelector()' will later use this to know what position to slide the img-selector to'
		  
	      resetActiveBtns();
		  setActiveBtn(colorBtn);
		  
		  removeActiveClassInAllImgShowCase();
		  selectAnActiveClassInImgShowCase();
		  
		  slideImageSelector();//slide the image select wrap
		  
		  //get the current orientation of the current active img-showcase so the we can use info from it to tell the 'imgShowcaseSliderCounter' where to continue from anytime a new colorBtn is selected : in our case we want the 'imgShowcaseSliderCounter' to continue from wherever the just brought in 'imgShowcaseSlider' is
		  let activeImgShowCase = wrapper.querySelector('.img-showcase.active');
		  let slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
		  var activeImgShowCaseStyle = window.getComputedStyle(activeImgShowCase);
		  var activeImgShowCaseMatrix = new WebKitCSSMatrix(activeImgShowCaseStyle.transform);
		  var activeImgShowCaseXOrientation = activeImgShowCaseMatrix.m41 ;
		  imgShowcaseSliderCounter= -(activeImgShowCaseXOrientation)/slideImgWidth;//we added a minus sign so we can make it positive cause 'imgShowcaseSliderCounter'is supposed to be positive
		  currentOrientationIndexOfActiveSlider = imgShowcaseSliderCounter;// this variable is used by the window resize function to orient the newly active slider at its current position should the window be resized 
		  
		  firstSlideStateWatch();//detect what slide we are on anytime any color btn is pressed . Its a wise choice to place it under 'imgShowcaseSliderCounter' beacuse rememer 'firstSlideStateWatch' uses 'imgShowcaseSliderCounter' to perform its operations
	      lastSlideStateWatch();  
	  }	
		
	  });
})
//select active colorBtn
function resetActiveBtns(){
	colorBtns.forEach(colorBtn => {
	   	colorBtn.classList.remove('active-color');
	});
}
function setActiveBtn(colorBtn){
	colorBtn.classList.add('active-color');
}

//select active img-showCase
function removeActiveClassInAllImgShowCase(){
	imgShowCase.forEach(imgSet => {
	           imgSet.classList.remove('active');
	});
}
function selectAnActiveClassInImgShowCase(){
	let  imgShowCaseIndex = imgSetId - 1 ;
	imgShowCase[imgShowCaseIndex].classList.add('active');
	
	//Remember that the slider 'transitioned' function sets the transition value of the slider that transitioned , to 0s , if it transitions to either the first or last clone . To undo that effect lets use this to restore the transition property for all sliders whether or not they are active 
	imgShowCase.forEach(imgSet => {
		imgSet.style.transition = 'all 0.7s linear'
	});
}


//slide image select wrap
function slideImageSelector(){
	let colorBtns = wrapper.querySelectorAll('.color-item');
	let imgSelectorId = imgSetId ;
	let slideImgSelectorWidth = wrapper.querySelector('.img-select-wrapper').clientWidth;
	let numberOfImgSelectClones = 2 ;
	let numberOfImgSelect = colorBtns.length + numberOfImgSelectClones ;
	let indexOfLastImgSelectClone = 0;
	let indexOfFirstImgSelectClone = numberOfImgSelect - 1; 
	if((imgSetId == 1)&&(currentShowcaseIsLastShowcase == true)){
		imgSelectorSliderCounter = indexOfFirstImgSelectClone ;
		wrapper.querySelector('.img-select-wrapper .wrap').style.transition ='all 0.45s linear';
	    wrapper.querySelector('.img-select-wrapper .wrap').style.transform = `translateX(${- (imgSelectorSliderCounter) * slideImgSelectorWidth}px)`;
	}
	else if((imgSetId == indexOfLastNonCloneImgSelect)&&(currentShowcaseIsFirstShowcase == true)){
		imgSelectorSliderCounter = indexOfLastImgSelectClone ;
		wrapper.querySelector('.img-select-wrapper .wrap').style.transition ='all 0.45s linear';
	    wrapper.querySelector('.img-select-wrapper .wrap').style.transform = `translateX(${- (imgSelectorSliderCounter) * slideImgSelectorWidth}px)`;
	}
	
	else{
		imgSelectorSliderCounter = imgSetId;
		wrapper.querySelector('.img-select-wrapper .wrap').style.transition ='all 0.45s linear';
		wrapper.querySelector('.img-select-wrapper .wrap').style.transform = `translateX(${- imgSelectorSliderCounter * slideImgSelectorWidth}px)`;
	}
	
}

//'transitioned' function for the image select wrap 
imgSelectWrapperWrap.forEach((wrap) =>{
	 wrap.addEventListener('transitionend',()=>{
	
	    event.preventDefault();
	    let imgSelect = wrap.children;
	    
	    const imgSelectCloneTransition = () =>{
	   	  if (imgSelect[imgSelectorSliderCounter].classList.contains('lastImgSelectClone')){
			  
		      let slideImgSelectorWidth = wrapper.querySelector('.img-select-wrapper').clientWidth;	
		      wrap.style.transition = 'none';
		      imgSelectorSliderCounter=imgSelect.length -2;
		      wrap.style.transform = `translateX(${imgSelectorSliderCounter * -slideImgSelectorWidth}px)`;
		}
	   
	    
		  else if (imgSelect[imgSelectorSliderCounter].classList.contains('firstImgSelectClone')){
			
		      let slideImgSelectorWidth = wrapper.querySelector('.img-select-wrapper').clientWidth;	
		      wrap.style.transition = 'none';
		      imgSelectorSliderCounter= 1;
		      wrap.style.transform = `translateX(${imgSelectorSliderCounter * -slideImgSelectorWidth}px)`;
		}	
			
	    };
	    imgSelectCloneTransition();
	    firstShowcaseStateWatch();
	    lastShowcaseStateWatch();
	
	 
    
   });
});






//sliderContainer functionality 
const sliderContainer = wrapper.querySelector('.slider-container');
const sliderBtn = wrapper.querySelectorAll('.sliderBtn');

const showsliderBtns = (event) =>{
	sliderBtn[0].style.opacity='1';
	sliderBtn[1].style.opacity='1';
	
}
sliderContainer.onmouseover=showsliderBtns;
const hidesliderBtns = (event) =>{
	sliderBtn[0].style.opacity='0.81';
	sliderBtn[1].style.opacity='0.81';
}
sliderContainer.onmouseleave=hidesliderBtns;






//Slider Btns
const prevBtn = wrapper.querySelector('.slide-prevBtn');
const nextBtn = wrapper.querySelector('.slide-nextBtn');


function styleImgSelectCloneImgbtnOnSliderBtnClick(){//if we are on the firstnonclone or lastnonclone img-select then style the corresponding selected img-item of the firstnonclone or lastnonclone inside the firstclone or lastclone img-select   
	let imgSelect = wrapper.querySelectorAll('.img-select-wrapper .wrap .img-select');//select all img-select
	var imgBtnImgSelectIndex = imgSetId;//the id of the img-select we are on ( we use imgSetId to determine this after all its gotten from the colorBtn we pressed)
	if(imgBtnImgSelectIndex == 1){//if we pressed the first colorBtn ( or if we are on the first nonclone img-select)
		imgBtnClonedImgSelectIndex = imgSelect.length -1; //then its corresponding clone index ( ie the firstImgSelectClone index) is this
		var imgBtnClonedImgSelect = imgSelect[imgBtnClonedImgSelectIndex];//its corresponding clone
		var clonedImgSelectItem = imgBtnClonedImgSelect.querySelectorAll('.img-item');//select all img-items under that clone ( ie firstImgSelectClone )
		
		clonedImgSelectItem.forEach((item) =>{//remove the active class in all items under that img-select clone
			item.classList.remove('active');
	     });
		
		//now we want to style an item under that cloned img-select
	    indexOfSelectedItem = imgShowcaseSliderCounter-1;//index of the cloned img-select item -here we select an active img-btn based ( ie style an img-btn ) by getting to know what slide has been transitoned to by the active show-case ( ie the active slider ) . This can be gotten by monitoring the value of the 'imgShowcaseSliderCounter' (which actually is the one that determines where the active slider slides to ) 
		clonedImgSelectSelectedItem = clonedImgSelectItem[indexOfSelectedItem];//the cloned img-select item
		clonedImgSelectSelectedItem.classList.add('active');//add 'active' class the that cloned img-select item
	}
	
	else if(imgBtnImgSelectIndex == imgSelect.length -2){//if we are the last nonclone img-select (or if we pressed the last colorBtn)
		 imgBtnClonedImgSelectIndex = 0;//the its corresponding clone's index is this ( ie the lastImgSelectClone index) 
		 var imgBtnClonedImgSelect = imgSelect[imgBtnClonedImgSelectIndex];//its corresponding clone
		 var clonedImgSelectItem = imgBtnClonedImgSelect.querySelectorAll('.img-item');//select all img-items under that clone ( ie lastImgSelectClone )
		
		 clonedImgSelectItem.forEach((item) =>{//remove the active class in all items under that img-select clone
			item.classList.remove('active');
	     });
	     
		 //now we want to style an item under that cloned img-select
	     indexOfSelectedItem = imgShowcaseSliderCounter-1;//index of the cloned img-select item 
		 clonedImgSelectSelectedItem = clonedImgSelectItem[indexOfSelectedItem];//the cloned img-select item
		 clonedImgSelectSelectedItem.classList.add('active');//add 'active' class the that cloned img-select item	
			
	}
	}

function styleImgSelectCloneImgbtnOnSliderBtnTransitionToLastImgClone(imgBtnImgSelect){//style an img-item of an img-select clone when the active img-showcase translates to its last img-clone
	let imgItem = imgBtnImgSelect.querySelectorAll('.img-item');//select all items under that img-select
	let indexOfLastImageItem = imgItem.length -1;//index of the last non clone image item
	let imgSelect = wrapper.querySelectorAll('.img-select-wrapper .wrap .img-select');//select all img-select
	var imgBtnImgSelectIndex = imgSetId;//index of the img-select of the img-btn we want to style 
	if(imgBtnImgSelectIndex == 1){//if we are on the first non-clone img-select
		imgBtnClonedImgSelectIndex = imgSelect.length -1; //this is its corresponding img-select clone index
		var imgBtnClonedImgSelect = imgSelect[imgBtnClonedImgSelectIndex];//this is its corresponding img-select clone
		var clonedImgSelectItem = imgBtnClonedImgSelect.querySelectorAll('.img-item');//select all img-items in that img-select clone
		
		clonedImgSelectItem.forEach((item) =>{//unstyle all img-items in that img-select clone
			item.classList.remove('active');
	     });
		
		
	    clonedImgSelectSelectedItem = clonedImgSelectItem[indexOfLastImageItem];//the last img-item in that img-select clone
		clonedImgSelectSelectedItem.classList.add('active');//style the last img-item in that img-select clone
	}
	else if(imgBtnImgSelectIndex == imgSelect.length -2){//if we are on the last non-clone img-select
		 imgBtnClonedImgSelectIndex = 0;//this is its corresponding img-select clone index 
		 var imgBtnClonedImgSelect = imgSelect[imgBtnClonedImgSelectIndex];//this is its corresponding img-select clone
		 var clonedImgSelectItem = imgBtnClonedImgSelect.querySelectorAll('.img-item');//select all img-items in that img-select clone
		
		 clonedImgSelectItem.forEach((item) =>{//unstyle all img-items in that img-select clone
			item.classList.remove('active');
	     });
	     clonedImgSelectSelectedItem = clonedImgSelectItem[indexOfLastImageItem];//the last img-item in that img-select clone
		 clonedImgSelectSelectedItem.classList.add('active');	
			
   }
   }

function styleImgSelectCloneImgbtnOnSliderBtnTransitionToFirstImgClone(imgBtnImgSelect){//style an img-item of an img-select clone when the active img-showcase translates to its first img-clone //NOTICE: i added 'imgBtnImgSelect' as a parameter : i did the samething whenever this function is called , because its actually called inside another function that has the variable it needs , so to pass that variable into this function we write it as a parameter in this function , that variable is 'imgBtnImgSelect' i did the same thing to the function: 'styleImgSelectCloneImgbtnOnSliderBtnTransitionToLastImgClone'
	let imgItem = imgBtnImgSelect.querySelectorAll('.img-item');//select all items under that img-select
	let indexOfFirstNonCloneImageItem = 0;//index of the first non clone image item
	let imgSelect = wrapper.querySelectorAll('.img-select-wrapper .wrap .img-select');//select all img-select
	var imgBtnImgSelectIndex = imgSetId;//index of the img-select of the img-btn we want to style
	if(imgBtnImgSelectIndex == 1){//if we are on the first non-clone img-select
		imgBtnClonedImgSelectIndex = imgSelect.length -1;//this is its corresponding img-select clone index 
		var imgBtnClonedImgSelect = imgSelect[imgBtnClonedImgSelectIndex];//this is its corresponding img-select clone
		var clonedImgSelectItem = imgBtnClonedImgSelect.querySelectorAll('.img-item');//select all img-items in that img-select clone
		
		clonedImgSelectItem.forEach((item) =>{//unstyle all img-items in that img-select clone
			item.classList.remove('active');
	     });
		clonedImgSelectSelectedItem = clonedImgSelectItem[indexOfFirstNonCloneImageItem];//the first img-item in that img-select clone
		clonedImgSelectSelectedItem.classList.add('active');
	}
	else if(imgBtnImgSelectIndex == imgSelect.length -2){//if we are on the last non-clone img-select
		 imgBtnClonedImgSelectIndex = 0;//this is its corresponding img-select clone index  
		 var imgBtnClonedImgSelect = imgSelect[imgBtnClonedImgSelectIndex];//this is its corresponding img-select clone
		 var clonedImgSelectItem = imgBtnClonedImgSelect.querySelectorAll('.img-item');//select all img-items in that img-select clone
		
		 clonedImgSelectItem.forEach((item) =>{//unstyle all img-items in that img-select clone
			item.classList.remove('active');
	     });
	     clonedImgSelectSelectedItem = clonedImgSelectItem[indexOfFirstNonCloneImageItem];//the first img-item in that img-select clone
		 clonedImgSelectSelectedItem.classList.add('active');	
	}
    }


function styleImgbtnOnSliderBtnClick(){
	let imgSelect = wrapper.querySelectorAll('.img-select-wrapper .wrap .img-select');//select all img-select
	var imgBtnImgSelectIndex = imgSetId;//the id of the img-select we are on ( we use imgSetId to determine this after all its gotten from the colorBtn we pressed)
	var imgBtnImgSelect = imgSelect[imgBtnImgSelectIndex];//the img-select widget we are on
	let imgItem = imgBtnImgSelect.querySelectorAll('.img-item');// select all img-item in the img-select widget we are on
	function removeActiveClassInAllImgBtn(){//remove the active class in all img-item in the img-select widget we are on
		imgItem.forEach((item) =>{
			item.classList.remove('active');
	    });
	    }
	function selectAnActiveImgBtn(){//here we select an active img-btn based ( ie style an img-btn ) by getting to know what slide has been transitoned to by the active show-case ( ie the active slider ) . This can be gotten by monitoring the value of the 'imgShowcaseSliderCounter' (which actually is the one that determines where the active slider slides to ) 
		indexOfSelectedItem = imgShowcaseSliderCounter-1;//smart choice to attach this to imgShowcaseSliderCounter , it helps us automatically take care of a lot of things eg when we click a new colorBtn after resizing the window : the 'imgShowcaseSliderCounter' is set to the index of the first non-clone item in the corresponding slider for the btn , and also remember clicking a colorBtn activates 'transition' in the newly activated slider(imgShowcase) hence the 'transitioned' function runs , which remember contains this function hence the function also uses 'imgShowcaseSliderCounter' which has been set to the index of the first item in the corresponding slider for the btn . Hence the img-select of the just brought in img-showcase(slider) has the first item on itself styled .
		selectedItem = imgItem[indexOfSelectedItem];//by using the 'imgShowcaseSliderCounter' we find the corresponding img-item ( ie imgBtn ) for the slide we are on
		selectedItem.classList.add('active');//then add the active class to it NB: 'styleImgbtnOnSliderBtnClick()','styleImgbtnOnSliderBtnTransitionToLastImgClone()','styleImgbtnOnSliderBtnTransitionToFirstImgClone()',styleImgbtnOnImgBtnClick(imgBtn) all work well together because before they do their job of styling they unstyle what the other has done before eg using 'removeActiveClassInAllImgBtn()' function
		styleImgSelectCloneImgbtnOnSliderBtnClick()//if we are on the firstnonclone or lastnonclone img-select then style the corresponding selected img-item of the firstnonclone or lastnonclone inside the firstclone or lastclone img-select   
	    }
    removeActiveClassInAllImgBtn();
	selectAnActiveImgBtn();
   
}

 


function styleImgbtnOnSliderBtnTransitionToLastImgClone(){//when the active slider (showcase) transitions to its lastImgClone
	let imgSelect = wrapper.querySelectorAll('.img-select-wrapper .wrap .img-select');//select all img-select
	var imgBtnImgSelectIndex = imgSetId;//the id of the img-select we are on ( we use imgSetId to determine this after all its gotten from the colorBtn we pressed)
	var imgBtnImgSelect = imgSelect[imgBtnImgSelectIndex];//the img-select widget we are on
	let imgItem = imgBtnImgSelect.querySelectorAll('.img-item');// select all img-item in the img-select widget we are on
	let indexOfLastNonCloneImageItem = imgItem.length -1;//index of the last img-item on the img-select widget we are on 
	function removeActiveClassInAllImgBtn(){//remove the active class in all img-items ie in all imgBtns
		imgItem.forEach((item) =>{
			item.classList.remove('active');
	    });
	    }
	function selectAnActiveImgBtn(){//select an active imgBtn
		selectedItem = imgItem[indexOfLastNonCloneImageItem];//since we are transitioning to a lastImgClone and then into the last Non clone img ( as the 'transitioned' function will do ) , lets make active (ie style) the last item on this img-select widget we are on
		selectedItem.classList.add('active');
		styleImgSelectCloneImgbtnOnSliderBtnTransitionToLastImgClone(imgBtnImgSelect);//lets also style the corresponding last-item in the  corrresponding img-select clone(s)
	    }
    removeActiveClassInAllImgBtn();
	selectAnActiveImgBtn();
   
}



 
function styleImgbtnOnSliderBtnTransitionToFirstImgClone(){//when the active slider (showcase) transitions to its firstImgClone
	let imgSelect = wrapper.querySelectorAll('.img-select-wrapper .wrap .img-select');//select all img-select
	var imgBtnImgSelectIndex = imgSetId;//the id of the img-select we are on ( we use imgSetId to determine this after all its gotten from the colorBtn we pressed)
	var imgBtnImgSelect = imgSelect[imgBtnImgSelectIndex];//the img-select widget we are on
	let imgItem = imgBtnImgSelect.querySelectorAll('.img-item');// select all img-item in the img-select widget we are on
	let indexOfFirstNonCloneImageItem = 0;//index of the last img-item on the img-select widget we are on
	function removeActiveClassInAllImgBtn(){//remove the active class in all img-items ie in all imgBtns
		imgItem.forEach((item) =>{
			item.classList.remove('active');
	    });
	    }
	function selectAnActiveImgBtn(){//select an active imgBtn
		styleImgSelectCloneImgbtnOnSliderBtnTransitionToFirstImgClone(imgBtnImgSelect);//lets also style the corresponding first-item in the corrresponding img-select clone(s)
		selectedItem = imgItem[indexOfFirstNonCloneImageItem];//since we are transitioning to a firstImgClone and then into the first Non clone img ( as the 'transitioned' function will do ) , lets make active (ie style) the first item on this img-select widget we are on
		selectedItem.classList.add('active');
	    }
    removeActiveClassInAllImgBtn();
	selectAnActiveImgBtn();
   
}

//prevBtn and nextBtn functions
const moveToNextSlide=()=>{
	    
	    let activeImgShowCase = wrapper.querySelector('.img-showcase.active');//we want to always ensure we are working only on the current active img-showcase
	    slideImg = activeImgShowCase.querySelectorAll('img');
	    if( imgShowcaseSliderCounter >= slideImg.length -1 ){return; };//if 'imgShowcaseSliderCounter' is greater than or number of slide imgs do nothing when the nextBtn is pressed
	    let slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
		activeImgShowCase.style.transition = 'all 0.45s linear';
	    imgShowcaseSliderCounter++;//increment the 'imgShowcaseSliderCounter'
	    activeImgShowCase.style.transform = `translateX(${imgShowcaseSliderCounter * -slideImgWidth}px)`;//translate the 'active img-showcase' forwards
	    imgId = imgShowcaseSliderCounter;//to synchronize the working of the img-select buttons with the nextBtn & prevBtn functionalities(actually we dont even need this)
	    currentOrientationIndexOfActiveSlider = imgShowcaseSliderCounter;//to synchronize the working of the sliderBtns with the 'activeImgShowCaseStabilizer()' 
	
	
}

nextBtn.addEventListener('click',()=>{
	event.preventDefault();
	moveToNextSlide();
});


const moveToPrevSlide=()=>{
	    let activeImgShowCase = wrapper.querySelector('.img-showcase.active');
	    slideImg = activeImgShowCase.querySelectorAll('img');
	    if( imgShowcaseSliderCounter <= 0 ){return; };
	    let slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
		activeImgShowCase.style.transition = 'all 0.45s linear';
	    imgShowcaseSliderCounter--;
	    activeImgShowCase.style.transform = `translateX(${imgShowcaseSliderCounter * -slideImgWidth}px)`;
	    imgId = imgShowcaseSliderCounter;//to synchronize the working of the img-select buttons with the nextBtn & prevBtn functionalities (actually we dont even need this)
	    currentOrientationIndexOfActiveSlider = imgShowcaseSliderCounter;
}

prevBtn.addEventListener('click',()=>{
	event.preventDefault();
	moveToPrevSlide();
});





//transitioned functionality for the Slider

imgShowCase.forEach((imgCase) =>{
  imgCase.addEventListener('transitionend',()=>{
	
	event.preventDefault();
	let slideImg = wrapper.querySelectorAll('.img-showcase.active img');
	  
	const cloneTransition = () =>{
	   	if (slideImg[imgShowcaseSliderCounter].classList.contains('lastImgClone')){
		   
		   let slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
		   imgCase.style.transition = 'none';//this will also affect have an side effect : In the slide image function , it needs to be able to detect a transition for its 'if' and 'else if' functions to work properly . this statement meddles with that . Anytime a color button is clicks it transitions ( eg its opacity is a transition feature ) , hence this transition function gets to detect it and work on it , but now that its transition effect is being set to zero here , after either 'if' or 'else if' statements in it run , this function will be unable to detect any 'transitioned' event from it becuae this statement turned it off . the only way this 'transitioned' function is allowed to run is if you press some button that translates the activeshowcase in way that brings back a value for the transition property that is not '0' e.g translating the active-showcase to an image thats neither the first nor the second image on the slide ( and by image i mean noe-clone images) 
		   //the disadvantage of not being able to detect 'transitioned' because of the above statement is that it makes us not able to run the firstSlideStateWatch() and lastSlideStateWatch() functions which are embedded in the 'transitioned' function and are essential in helping the 'if' and 'else if' statements in the 'slideImg' function 
		   //a fix for this is to put the firstSlideStateWatch() and lastSlideStateWatch() functions inside the colorBtn eventlistener function so that whenever and color-btn is clicked it will also detect what slide we are on as this img-case transitioned eventlistener does 
		   imgShowcaseSliderCounter=slideImg.length -2;
		   imgCase.style.transform = `translateX(${imgShowcaseSliderCounter * -slideImgWidth}px)`;
		   styleImgbtnOnSliderBtnTransitionToLastImgClone();//style imgBtns  ie img-items , on transition to lastImgClone 
		   imgId = imgShowcaseSliderCounter;//to synchronize the working of the img-select buttons with the nextBtn & prevBtn functionalities [ also kinda no longer needed since we only added it in the first place so that the window resize event listener funtion ( which formerly had to run whats now the 'else' statement under the slideImg() function ) can run well since it uses 'imgId' to translate the slider hence that 'imgId' need to be updated to synchronize with the cloneTransition() function ]
		   
		   
		
		}
	   
	
	   else if (slideImg[imgShowcaseSliderCounter].classList.contains('firstImgClone')){
		   
		   let slideImgWidth = wrapper.querySelector('.img-showcase.active img:first-child').clientWidth;
		   imgCase.style.transition = 'none';
		   imgShowcaseSliderCounter=slideImg.length - imgShowcaseSliderCounter;
		   imgCase.style.transform = `translateX(${imgShowcaseSliderCounter * -slideImgWidth}px)`;
		   styleImgbtnOnSliderBtnTransitionToFirstImgClone();
		   imgId = imgShowcaseSliderCounter;//to synchronize the working of the img-select buttons with the nextBtn & prevBtn functionalities 
		   
		  
	   }
	   else{
		   styleImgbtnOnSliderBtnClick();//style the imgBtns when any of the SliderBtns is clicked . Actually the above 'if' and 'else if' functions also style the imgBtns when any of the SliderBtns is clicked , it just this time they focus on styling the imgBtns especially when the slider strasitions to a clone slide 
	   }	
	   	
    };
	cloneTransition();
	firstSlideStateWatch();//check if we are on the first slide after transition (done by checking the value of 'imgShowcaseSliderCounter' )
	lastSlideStateWatch();//check if we are on the last slide after transition 
    
   });
});



window.addEventListener('resize', stabilizers);//9:30pm 10/6/2022 hmm this is what i needed back last year december when making a slider that uses the width of one of its slides ( using '.clientWidth' ) to set its width ( see 'slider - 7' ), the problem back them was anytime i resize the windows the width of the slides doesnt adjust hence the 'translateX' doesn't work well , it shows sometimes shows more than one slide e.g one slide and a half of another instead of just one  , the quick fix them was to get the slide width in percentage rather than in 'px'. This line of code would have made that unnecessary
//11:58am 11/6/2022 : I placed it here so its the last thing that runs

});