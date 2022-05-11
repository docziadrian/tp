const images = [
    "https://imgs.search.brave.com/nz58Lc4dOVJU67Gz9Dg-VWALkqoLWrnTr100zT15dAc/rs:fit:400:400:1/g:ce/aHR0cDovL2Fzc2V0/cy5zdGlja3BuZy5j/b20vdGh1bWJzLzU4/ODUyNmZiNmYyOTNi/YmZhZTQ1MWEzYS5w/bmc",
    "https://imgs.search.brave.com/YWD0kXRKzQGCvKabbt34M3yCY-SXRpCmYY2T3Jv3E0w/rs:fit:400:400:1/g:ce/aHR0cDovL3d3dy5w/bmdtYXJ0LmNvbS9m/aWxlcy80L0dhbWlu/Zy1Db21wdXRlci1Q/TkctUGhvdG9zLnBu/Zw",
    "https://imgs.search.brave.com/Z8D5sBJYDIK8JyvNNzyCtYbcf6_C5FbxCqaJqo4b8So/rs:fit:400:400:1/g:ce/aHR0cDovL2Fzc2V0/cy5zdGlja3BuZy5j/b20vdGh1bWJzLzU4/MGI1N2ZiZDk5OTZl/MjRiYzQzYmZlMC5w/bmc"
  ];
  
  const X_CHANGE = 1000;
  const Y_CHANGE = 1000;
  const BACKGROUND_POS_PERCENT = 11.1;
  const TIMER_INTERVAL = 2250;
  const IMAGE_PIECE_COUNT = 10;
  const ROTATION = 25;
  
  let indy = 0;
  let isChanging = false;
  
  function removeImage() {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < IMAGE_PIECE_COUNT; i++) {
        const chunk = document.getElementById(`chunk${i}`);
  
        TweenMax.to(chunk, 1, {
          rotation: ROTATION,
          ease: Strong.easeInOut,
          onComplete: () => {
            TweenMax.fromTo(
              chunk,
              1,
              { x: 0, y: 0 },
              {
                y: i % 2 === 0 ? -Y_CHANGE : Y_CHANGE,
                x: i % 2 === 0 ? -X_CHANGE : X_CHANGE,
                ease: Strong.easeInOut,
                onComplete: () => {
                  chunk.parentNode.removeChild(chunk);
                  resolve(true);
                }
              }
            );
          }
        });
      }
    });
  }
  
  function displayImage(index) {
    const src = images[index];
    const image = document.getElementById("theImage");
    let pos = 0;
  
    for (let i = 0; i < IMAGE_PIECE_COUNT; i++) {
      const chunk = document.createElement("div");
  
      chunk.id = `chunk${i}`;
      chunk.style.background = `url('${src}')`;
      chunk.style.backgroundPosition = `${pos}% ${pos}%`;
      chunk.style.height = "40px";
      chunk.style.width = "400px";
      pos += BACKGROUND_POS_PERCENT;
  
      theImage.appendChild(chunk);
  
      TweenMax.fromTo(
        chunk,
        1,
        {
          x: i % 2 === 0 ? -X_CHANGE : X_CHANGE,
          y: i % 2 === 0 ? Y_CHANGE : -Y_CHANGE,
          rotation: -ROTATION
        },
        {
          y: 0,
          x: 0,
          ease: Strong.easeInOut,
          onComplete: () => {
            TweenMax.to(chunk, 1, {
              rotation: 0,
              ease: Strong.easeInOut,
              onComplete: () => isChanging = false
            });
          }
        }
      );
    }
  }
  
  function changePosition(movement) {
    //To ensure that switching does not happen if a switch is already happening
    if (!isChanging) {
      if (indy + movement < 0) {
        indy = images.length - 1;
      } else if (indy + movement > images.length - 1) {
        indy = 0;
      } else {
        indy += movement;
      }
  
      isChanging = true;
      removeImage().then(() => displayImage(indy));
    }
  }
  
  window.onload = () => {
    displayImage(indy);
  };
  