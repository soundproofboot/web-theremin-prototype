const Tone = window.Tone;
const buttonEl = document.querySelector('button');
const headingEl = document.querySelector('h1');
const paragraphEl = document.querySelector('paragraph');

let osc;
let playing = false;
let started = false;

buttonEl.addEventListener('click', () => {
  console.log('button clicked');
  started = true;
  headingEl.innerText = 'Now press and hold to start the oscillator';
})

buttonEl.addEventListener('touchstart', () => {
  if (!started) {
    console.log('button touched');
    buttonEl.innerText = 'Stop';
    started = true;
  }
});

window.addEventListener('touchend', () => {
  console.log('touch end fired on window')
  if (playing) {
    osc.stop();
  }
});

window.addEventListener('mouseup', () => {
  console.log('mouse up fired on window');
  if (playing) {
    osc.stop();
  }
})

window.addEventListener('mousedown', (e) => {
  if (started) {
      playing = true;
      xVal = e.clientX;
      yVal = e.clientY;

      console.log('x' + xVal, 'y' + yVal);
      osc = new Tone.Oscillator({
        type: 'sine',
        frequency: e.clientX + 30,
        volume: -15,
        partialCount: Math.floor(yVal / 100) + 2,
      }).toDestination();
      osc.start();
    }
});

window.addEventListener('touchstart', (e) => {
  if (started) {  
      playing = true;
      xVal = e.touches[0].clientX;
      yVal = e.touches[0].clientY;
  
      console.log('x' + xVal, 'y' + yVal);
      osc = new Tone.Oscillator({
        type: 'sine',
        frequency: xVal,
        volume: -15,
        partialCount: Math.floor(yVal / 100) + 2,
      }).toDestination();
      osc.start();
  }
});

window.addEventListener('mousemove', (e) => {
  if (playing) {
    xVal = e.clientX;
    yVal = e.clientY;
    osc.set({
      frequency: xVal,
      partialCount: Math.floor(yVal / 50),
    });
  }
});

window.addEventListener('touchmove', (e) => {
  console.log(e.touches[0].clientX);
  if (playing) {
    xVal = e.touches[0].clientX;
    yVal = e.touches[0].clientY;
    osc.set({
      frequency: xVal,
      partialCount: Math.floor(yVal / 50),
    });
  }
});

// code from tone generator

// const types = document.querySelectorAll('.typeOption');
// types.forEach(type => {
//   type.addEventListener('click', () => {
//     if (osc) {
//       osc.type = type.value;
//     }
//   })
// });

// const buttonEl = document.querySelector('button');
// const volumeEl = document.querySelector('#volume');
// const frequencyEl = document.querySelector('#frequency');

// volumeEl.addEventListener('change', () => {
//   let vol = volumeEl.valueAsNumber;
//   console.log(vol);
//   osc.set({
//     volume: vol
//   });
// });

// frequencyEl.addEventListener('change', () => {
//   let freq = frequencyEl.valueAsNumber;
//   console.log(freq);
//   osc.set({
//     frequency: freq
//   })
// })

// buttonEl.addEventListener('click', async (e) => {
//   if (playing) {
//     buttonEl.innerText = 'Start'
//     osc.stop();
//   } else {
//     buttonEl.innerText = 'Stop';
//     let waveType;
//     types.forEach(type => {
//       if (type.checked) {
//         waveType = type.value;
//       }
//     });
//     osc = new Tone.Oscillator({
//       type: waveType,
//       frequency: frequencyEl.valueAsNumber,
//       volume: volumeEl.valueAsNumber,
//     }).toDestination();
//     console.log(osc.get())
//     osc.start();
//   }
//   playing = !playing;
// });
