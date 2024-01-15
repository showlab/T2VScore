// Function that sets the active button for the prompt / drags
function setActiveButton(activeButton) {
  let otherClass = null
  const classesToCheck = ['btn-prompt', 'btn-drag', 'btn-identity', 'btn-context', 'btn-modality', 'btn-spatial', 'btn-image-var', 'btn-prompt-real'];
  for (const classToCheck of classesToCheck) {
    if (activeButton.classList.contains(classToCheck)) {
      otherClass = `.${classToCheck}`;
      break;
    }
  }
  const otherButtons = document.querySelectorAll(otherClass);
  otherButtons.forEach(function(otherButton) {
    otherButton.classList.remove('btn-active');
  });
  activeButton.classList.add('btn-active');
  // Handle Drag - Generated
  if (['.btn-prompt', '.btn-drag'].includes(otherClass)) {
    changeDynamicResult('assets/drag_synthetic/', 'dynamic-drag', 'dynamic-result', '.png', '.gif', 'btn-prompt', 'btn-drag');
  }
  // Handle Identity
  if (['.btn-identity', '.btn-context'].includes(otherClass)) {
    changeDynamicResult('assets/identity/', 'dynamic-identity', null, '.m4v', null, 'btn-identity', 'btn-context');
  }
  // Handle Spatial
  if (['.btn-modality', '.btn-spatial'].includes(otherClass)) {
    changeDynamicResult('assets/spatial/', 'dynamic-spatial', null, '.m4v', null, 'btn-modality', 'btn-spatial');
  }
  // Handle Image Var
  if (otherClass == '.btn-image-var') {
    changeDynamicResult('assets/image_var/', 'dynamic-image-var-ref', 'dynamic-image-var', '_ref.png', '_0.png', 'btn-image-var', null)
    const slider = document.getElementById("dynamicSlider");
    const dynamicSliderValue = document.getElementById("dynamicSliderValue");
    slider.value = "0";
    dynamicSliderValue.textContent = "0";
  }
  // Handle Drag - Real
  if (otherClass == '.btn-prompt-real') {
    changeDynamicResult('assets/drag_real/', 'dynamic-drag-real', 'dynamic-result-real', '.png', '.gif', 'btn-prompt-real', null)
  }
  // Dynamically change the button text
  if (otherClass == '.btn-identity') {
    changeButtonText(activeButton, '.btn-context')
  }
  if (otherClass == '.btn-modality') {
    changeButtonText(activeButton, '.btn-spatial')
  }
}

const promptDict = {
  "manIdentity": ["oil painting half body portrait of a man on a city street in copenhagen", "oil painting of a man"],
  "womanIdentity": ["photo of a female firefighter in the forest", "photo of a woman at the zoo with a seal"],
  "poseSpatial": ["a group of people playing with Frisbee's on the grass", "two men on a tennis court shaking hands over the net"],
  "depthSpatial": ["two birds standing next to each other on a branch", "a giraffe standing in a straw field next to shrubbery"],
  "edgeSpatial": ["a man riding a horse followed by a dog", "a mountain goat stands on top of a rock on a hill"],
}

function changeButtonText(activeButton, buttonClass) {
  const contextButtons = document.querySelectorAll(buttonClass);
  const promptKey = activeButton.getAttribute('prompt-key');
  const contextList = promptDict[promptKey];
  contextButtons.forEach(function (button) {
    const buttonIndex = Array.from(contextButtons).indexOf(button);
    if (buttonIndex < contextList.length) {
      button.innerText = contextList[buttonIndex];
    }
  });
}

// Function that changes the image path once the active button is chosen
function changeDynamicResult(basePath, dynamic1, dynamic2, dynamicExt1, dynamicExt2, button1, button2) {
  const dynamicElement1 = document.getElementById(dynamic1);
  let dynamicElement2 = null;
  if (dynamic2 !== null) {
    dynamicElement2 = document.getElementById(dynamic2);
  }
  const path1 = document.querySelectorAll('.btn-active.' + button1)[0].getAttribute(button1);
  let path2 = null;
  if (button2 !== null){
    path2 = document.querySelectorAll('.btn-active.' + button2)[0].getAttribute(button2);
  }
  function changeImageSource(path1, path2) {
    dynamicElement1Src = basePath + path1
    if (path2 !== null) {
      dynamicElement1Src += "_" + path2;
    }
    dynamicElement1Src += dynamicExt1;
    dynamicElement1.src = dynamicElement1Src;
    if (dynamicElement2 !== null) {
      dynamicElement2Src = basePath + path1
      if (path2 !== null) {
        dynamicElement2Src += "_" + path2;
      }
      dynamicElement2Src += dynamicExt2;
      dynamicElement2.src = dynamicElement2Src;
    }
  }
  changeImageSource(path1, path2);
}

function setSlider(slider) {
  const sliderValues = ["0", "0.1", "0.3", "0.5", "0.7", "1"];
  const dynamicSliderValue = document.getElementById("dynamicSliderValue");
  const dynamicElement = document.getElementById("dynamic-image-var");
  function changeImageSource() {
    dynamicSliderValue.textContent = slider.value;
    const oldDynamicElementSrc = dynamicElement.src.split('_');
    dynamicElementSrc = oldDynamicElementSrc.slice(0, -1).join("_") + "_" + slider.value + ".png";
    dynamicElement.src = dynamicElementSrc;
  }
  if (sliderValues.includes(slider.value)) {
    changeImageSource();
  }
}