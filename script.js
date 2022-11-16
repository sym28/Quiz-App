document.querySelectorAll('.topic').forEach(topic => {
  topic.addEventListener('click', e => {
    results = []
    score = 0
    counter = 0
    selectedTopic = e.currentTarget.id
    populateForm()
    // document.getElementById('quiz-card').classList.add('fade-in')
    document.getElementById('quiz-card').style.visibility = 'visible'
    document.getElementById('accordionExample').style.visibility = 'hidden'

  })
})

let selectedTopic = ''
let results = []
let score = 0;
let counter = 0

const quizData = {
  jsQuiz:  [
    {
      question: 'What is the correct JavaScript syntax to change the content of this HTML element? "<p id="demo">This is a demonstration.</p>"',
      options: ['document.getElementByClassName("Hi")', '#demo.innerHTML = "Hi!"', 'document.getElement("p").innerHTML = "Hi!"', 'document.getElementById("demo").innerHTML = "Hi!"'],
      answer: 'document.getElementById("demo").innerHTML = "Hi!"',
      details: 'getElementById() method is used to select an element by id and to change the content of an element we use the innerHTML property'
    },
    {
      question: 'Where is the correct place to insert a JavaScript??',
      options: ['Inside <body>', 'Inside <head>', 'Either <body> or <head>', 'Outside <html>'],
      answer: 'Either <body> or <head>',
      details: 'script tag is usually placed at the end of the body tag or head tag'
    },
    {
      question: 'Inside which HTML element do we put the JavaScript?',
      options: ['<scripting>', '<javascript>', '<script>', '<js>'],
      answer: '<script>',
      details: 'The javascript filename is placed inside the script tag under src attribute.'
    },
    {
      question: 'How do you call a function named "myFunction"?',
      options: ['call function myFunction()', 'call myFunction()', 'run myFunction()', 'myFunction()'],
      answer: 'myFunction()',
      details: 'The name of the function followed by parenthesis is the correct way to call a function.'
    },
  ],
  
  cssQuiz: [
    {
      question: 'Which property is used to change the background color?',
      options: ['background-color', 'bg-color', 'bgColor', 'color'],
      answer: 'background-color',
      details: 'background-color property is used to set the background colour of an element.'
    },
    {
      question: 'Which CSS property controls the text size?',
      options: ['font-style', 'text-style', 'text-size', 'font-size'],
      answer: 'font-size',
      details: 'font-size property is used to change the text size using css.'
    },
    {
      question: 'Which is the correct CSS syntax?',
      options: ['body.color=black', 'body:color=black', 'body:color=black', 'body{color: black;}'],
      answer: 'body{color: black;}',
      details: 'The element is first defined followed by curly braces. color property is used to define a color.'
    },
    {
      question: 'What does CSS stand for?',
      options: ['cascading style sheets', 'colourful style sheets', 'computed style sheets', 'creative style sheets'],
      answer: 'cascading style sheets',
      details: 'CSS stands for cascading style sheets. CSS can format the document content written in HTML or other markup language.'
    },
  ],
  
  htmlQuiz: [
    {
      question: 'What tag is used for HTML5?',
      options: ['<!DOCTYPE html>', '<html5>', '<typeof HTML5>', '<html=5>'],
      answer: '<!DOCTYPE html>',
      details: 'In order to use HTML5, "html" must be included in <!DOCTYPE>'
    },
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'Hyper Transfer Makeup Language', 'Hyper Tool Markup Language', 'Home Tool Markup Language'],
      answer: 'Hyper Text Markup Language',
      details: 'HTML stands for Hyper Text Markup Language'
    },
    {
      question: 'Which heading is the largest?',
      options: ['<div>', '<h2>', '<h3>', '<h1>'],
      answer: '<h1>',
      details: '<h1> defines the most important heading and therefore the largest of all headings.'
    },
    {
      question: 'Which character is used to indicate an end tag?',
      options: ['*', '/', '^', '<'],
      answer: '/',
      details: 'End tags are prefixed with /. Note: Some elements knwon as empty elements have no content and therfore do not require end tag. E.g. <input>, <img>, <br>'
    },
  ]
}




const populateForm = (questionNumber = 0) => {
  console.log('counter: ' + counter)
  if(counter < quizData[selectedTopic].length) {
    document.querySelector('#question').innerText = quizData[selectedTopic][questionNumber].question
  
    // select all labels and change text to question
    const options = document.querySelectorAll('.form-check-label')
    options.forEach((option, i) => {
      option.firstChild.nodeValue = quizData[selectedTopic][questionNumber].options[i]
    })

  } else {
    console.log('out of questions!')
    console.log(`final score ${score} / ${quizData[selectedTopic].length}`)
    console.log(results)
    document.getElementById('quiz-card').style.visibility = 'hidden'
    // document.getElementById('quiz-card').classList.add('fade-out')

    populateAccordion(results)
  }
}


const submitAnswer = () => {
  const options = document.getElementsByName('quiz')
  let userAnswer = undefined
  options.forEach(option => {
    if(option.checked) {
      console.log('user answer: ', option.parentNode.innerText)
      if(option.parentNode.innerText === quizData[selectedTopic][counter].answer) {
        console.log('correct')
        score++
        console.log('score: ' + score)
        userAnswer = true
      } else {
        console.log('incorrect, right answer: ' + quizData[selectedTopic][counter].answer)
        userAnswer = false
      }
    }
    option.checked = false
  })
  results.push({
    userAnswer,
    question: quizData[selectedTopic][counter].question,
    details: quizData[selectedTopic][counter].details
  })
  counter++
  populateForm(counter)
}

const populateAccordion = (results) => {
  document.getElementById('accordionExample').style.visibility = 'visible'
  results.forEach((result, index) => {
    const question = document.getElementById('resultQ' + index)
    const description = document.getElementById('resultA' + index)

    const questionText = document.createTextNode(result.question)
    const reason = document.createTextNode(result.details)
    let answer = undefined
    if(result.userAnswer) {
      answer = document.createTextNode('\u2714')
    } else {
      answer = document.createTextNode('\u2716')
    }
    
    question.replaceChildren(questionText, ' ', answer)
    description.replaceChildren(reason)
    

  })

}

