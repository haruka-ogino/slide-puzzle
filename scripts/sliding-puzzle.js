// Don't change or delete this line! It waits until the DOM has loaded, then calls
// the start function. More info:
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', start)

const answerArr = ['00', '10', '20', '01', '11', '21', '02', '12']

function start() {
  const puzzlePieces = document.getElementsByClassName('board')[0].children
  bindEventListeners(puzzlePieces)
}

function bindEventListeners(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener('click', function (evt) {
      checkSides(i, evt)
    })
  }
}

function checkSides(index, evt) {
  console.log(index)
  const clicked = evt.srcElement.src
  const puzzlePieces = document.getElementsByClassName('board')[0].children
  const currentArr = []
  for (let i = 0; i < puzzlePieces.length; i++) {
    let image = puzzlePieces[i].src.split('/').pop()
    currentArr.push(image)
  }

  if (
    (currentArr[index - 3] === 'blank.jpg') |
    (currentArr[index - 1] === 'blank.jpg') |
    (currentArr[index + 1] === 'blank.jpg') |
    (currentArr[index + 3] === 'blank.jpg')
  ) {
    console.log('will swap')
    swapPieces(clicked)
  }
}

function swapPieces(clicked) {
  const imgName = clicked.split('/').pop()
  console.log(imgName)
  const img1 = document.querySelector(
    `img[src="../public/sliding-majo/${imgName}"]`
  )
  const img2 = document.querySelector(
    `img[src="../public/sliding-majo/blank.jpg"]`
  )

  console.log(img1, img2)
  if (img1 && img2) {
    img1.src = `../public/sliding-majo/blank.jpg`
    img2.src = `../public/sliding-majo/${imgName}`
    checkWin()
  } else {
    console.log('One or both images not found.')
  }
}

function checkWin() {
  const puzzlePieces = document.getElementsByClassName('board')[0].children
  console.log(puzzlePieces)

  let winState = true
  for (let i = 0; i < puzzlePieces.length - 1; i++) {
    let image = puzzlePieces[i].src.split('/').pop()
    let answer = image.substring(0, image.lastIndexOf('.'))
    if (answerArr[i] !== answer) {
      winState = false
      break
    }
  }

  if (winState === true) {
    const pieces = document.getElementsByClassName('piece')

    for (const piece of pieces) {
      piece.classList.add('overlay')
    }

    const imgAns = document.getElementsByClassName('hidden')[0]

    imgAns.classList.remove('hidden')

    setTimeout(() => {
      imgAns.classList.add('reveal')
    }, 5)

    console.log('YOU WINNNN')
  } else {
    console.log('not a winnnn')
  }
}
